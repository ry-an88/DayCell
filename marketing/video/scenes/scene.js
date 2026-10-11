// Typing helper for scenes. The renderer calls window.seek(t) every frame.
// Mark an element with data-type="text to type" data-at="3.2" data-cps="22" and it types itself.
window.seek = t => {
  for (const el of document.querySelectorAll('[data-type]')) {
    const at = Number(el.dataset.at || 0), cps = Number(el.dataset.cps || 20), full = el.dataset.type;
    const n = Math.max(0, Math.min(full.length, Math.floor((t - at) * cps)));
    el.textContent = full.slice(0, n);
    const caret = el.nextElementSibling;
    if (caret && caret.classList.contains('caret')) {
      const typing = t >= at - .6 && n < full.length, done = el.dataset.until ? t < Number(el.dataset.until) : true;
      caret.style.visibility = (typing || (done && t >= at - .6 && Math.floor(t * 2) % 2 === 0)) ? 'visible' : 'hidden';
    }
  }
  for (const el of document.querySelectorAll('[data-count]')) {
    // data-count="from,to,start,end,decimals,prefix"
    const [a, b, s, e, d, pre] = el.dataset.count.split(',');
    const k = Math.max(0, Math.min(1, (t - s) / (e - s)));
    const ease = 1 - Math.pow(1 - k, 3);
    el.textContent = (pre || '') + (Number(a) + (Number(b) - Number(a)) * ease).toFixed(Number(d));
  }
  if (window.onSeek) window.onSeek(t);
};
