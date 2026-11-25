// Applies theme and retro mode before first paint so there is no flash.
// Inlined into the <head> of every page by the sharedHead plugin in vite.config.ts.
(function () {
  var root = document.documentElement;
  var theme = null;
  var retro = null;
  try {
    theme = localStorage.getItem('dy:theme');
    retro = localStorage.getItem('dy:retro');
  } catch (e) {}
  var dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) root.classList.add('dark');
  if (retro === '1') root.setAttribute('data-retro', '');
})();
