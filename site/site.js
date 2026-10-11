// Launch-week price. tools/build.mjs fills LAUNCH_ENDS from the Netlify environment (or leave it empty).
(function () {
  var ends = '__LAUNCH_ENDS__';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ends) || Date.now() > new Date(ends + 'T23:59:59').getTime()) return;
  document.querySelectorAll('[data-launch]').forEach(function (el) { el.hidden = false; });
  document.querySelectorAll('[data-price]').forEach(function (el) { el.textContent = '£9'; });
})();
