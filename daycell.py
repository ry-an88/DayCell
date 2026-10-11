"""Daycell local server.

Serves daycell.html and reads/writes .md journals in the "Journals" folder next to this script.

Run:  python daycell.py         this computer only (http://localhost:8765)
      python daycell.py --lan   also lets your iPad/tablet/phone on the same Wi-Fi open it,
                                protected by a secret key (scan the QR code shown in the app)
"""
import http.cookies
import json
import os
import secrets
import socket
import sys
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent
JOURNALS = ROOT / "Journals"
JOURNALS.mkdir(exist_ok=True)
PORT = int(next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--port=")), os.environ.get("DAYCELL_PORT", "8765")))
LAN = "--lan" in sys.argv
STATIC = {"/daycell.html"}  # the only file served besides the API
COOKIE = "daycell_key"
OLD_COOKIE = "daybook_key"  # set by pairings made before the rename


def lan_ip():
    """Best guess at this PC's address on the local network (no traffic is sent)."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()


def load_key():
    """A secret that other devices must present. Kept in a file so bookmarks survive restarts."""
    path = ROOT / ".daycell-key"
    old = ROOT / ".daybook-key"  # name before the rename; keep already-paired devices working
    if old.exists() and not path.exists():
        old.replace(path)
    if path.exists() and path.read_text().strip():
        return path.read_text().strip()
    key = secrets.token_urlsafe(9)
    path.write_text(key)
    return key


IP = lan_ip() if LAN else "127.0.0.1"
KEY = load_key() if LAN else None
ALLOWED_HOSTS = {f"localhost:{PORT}", f"127.0.0.1:{PORT}"} | ({f"{IP}:{PORT}"} if LAN else set())


def journal_path(name):
    name = Path(name or "daycell.md").name.strip() or "daycell.md"
    if not name.lower().endswith(".md"):
        name += ".md"
    return JOURNALS / name


def version(path):
    return str(path.stat().st_mtime_ns) if path.exists() else "0"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *args):
        pass

    def send_json(self, code, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def is_local(self):
        return self.client_address[0] in ("127.0.0.1", "::1")

    def allowed(self):
        if self.headers.get("Host") not in ALLOWED_HOSTS:
            self.send_json(403, {"error": "forbidden host"})
            return False
        if self.is_local():
            return True
        cookie = http.cookies.SimpleCookie(self.headers.get("Cookie", ""))
        if KEY and any(c in cookie and secrets.compare_digest(cookie[c].value, KEY) for c in (COOKIE, OLD_COOKIE)):
            return True
        if self.path.startswith("/api/"):
            self.send_json(401, {"error": "this device isn't paired - scan the QR code in Daycell on your PC"})
        else:
            page = (
                "<!doctype html><meta name=viewport content='width=device-width,initial-scale=1'><title>Daycell</title>"
                "<body style='font:16px/1.6 system-ui;max-width:420px;margin:15vh auto;padding:0 20px;color:#1c2128'>"
                "<h2 style='font-family:monospace'>d/ not paired yet</h2>"
                "<p>On your PC, open Daycell, click the <b>folder icon</b> on the left and scan the QR code "
                "with this device's camera.</p><p style='color:#667085'>This keeps your journal private to your devices.</p>"
            ).encode()
            self.send_response(401)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(page)))
            self.end_headers()
            self.wfile.write(page)
        return False

    def do_GET(self):
        url = urlparse(self.path)
        query = parse_qs(url.query)
        # pairing: /?key=SECRET sets a long-lived cookie, then drops the key from the address bar
        if LAN and "key" in query and not self.is_local():
            if self.headers.get("Host") in ALLOWED_HOSTS and secrets.compare_digest(query["key"][0], KEY):
                self.send_response(302)
                self.send_header("Set-Cookie", f"{COOKIE}={KEY}; Max-Age=31536000; Path=/; HttpOnly; SameSite=Strict")
                self.send_header("Location", "/daycell.html")
                self.end_headers()
                return
        if not self.allowed():
            return
        if url.path == "/":
            self.send_response(302)
            self.send_header("Location", "/daycell.html")
            self.end_headers()
        elif url.path == "/api/files":
            info = {"dir": str(JOURNALS), "files": sorted(p.name for p in JOURNALS.glob("*.md")), "remote": not self.is_local()}
            if LAN and self.is_local():
                info["lan"] = {"url": f"http://{IP}:{PORT}/?key={KEY}", "address": f"http://{IP}:{PORT}"}
            self.send_json(200, info)
        elif url.path == "/api/file":
            path = journal_path(query.get("name", [None])[0])
            text = path.read_text(encoding="utf-8") if path.exists() else ""
            self.send_json(200, {"name": path.name, "exists": path.exists(), "text": text, "version": version(path)})
        elif url.path in STATIC:
            super().do_GET()
        else:
            self.send_json(404, {"error": "not found"})

    def do_PUT(self):
        if not self.allowed():
            return
        url = urlparse(self.path)
        if url.path != "/api/file":
            return self.send_json(404, {"error": "not found"})
        path = journal_path(parse_qs(url.query).get("name", [None])[0])
        data = self.rfile.read(int(self.headers.get("Content-Length", 0))).decode("utf-8")
        with WRITE_LOCK:
            # another device saved since this one last read: hand back the latest so it can merge
            base = self.headers.get("X-Base-Version")
            if base and base != version(path):
                text = path.read_text(encoding="utf-8") if path.exists() else ""
                return self.send_json(409, {"error": "conflict", "text": text, "version": version(path)})
            tmp = path.with_name(path.name + ".tmp")
            tmp.write_text(data, encoding="utf-8", newline="\n")
            os.replace(tmp, path)  # atomic: never leaves a half-written journal
            self.send_json(200, {"name": path.name, "bytes": len(data.encode("utf-8")), "version": version(path)})


WRITE_LOCK = threading.Lock()

if __name__ == "__main__":
    url = f"http://localhost:{PORT}/"
    try:
        server = ThreadingHTTPServer(("0.0.0.0" if LAN else "127.0.0.1", PORT), Handler)
    except OSError:
        print(f"Daycell already seems to be running - opening {url}")
        if LAN:
            print("To use it on your iPad/tablet, close the other Daycell window first, then run this again.")
        webbrowser.open(url)
        raise SystemExit
    print(f"Daycell running at {url}")
    print(f"Journals are saved in: {JOURNALS}")
    if LAN:
        print()
        print("iPad / tablet / phone access is ON (same Wi-Fi only).")
        print("Open the folder icon in Daycell and scan the QR code, or visit:")
        print(f"  http://{IP}:{PORT}/?key={KEY}")
        print("If Windows asks about the firewall, allow access on PRIVATE networks only.")
    print()
    print("Close this window (or press Ctrl+C) to stop.")
    if "--no-browser" not in sys.argv:
        threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
