// Launch-week price. tools/build.mjs fills LAUNCH_ENDS from the Netlify environment (or leave it empty).
(function () {
  var ends = '__LAUNCH_ENDS__';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ends)) return;
  // ends at 23:59:59 UK time on that day, wherever the visitor is
  var t = Date.parse(ends + 'T23:59:59Z');
  try {
    var p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hourCycle: 'h23', year: 'numeric', month: '2-digit',
      day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(t).forEach(function (x) { p[x.type] = x.value; });
    t -= Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - t;
  } catch (e) {}
  if (Date.now() > t) return;
  document.querySelectorAll('[data-launch]').forEach(function (el) { el.hidden = false; });
  document.querySelectorAll('[data-price]').forEach(function (el) { el.textContent = '£9'; });
})();
