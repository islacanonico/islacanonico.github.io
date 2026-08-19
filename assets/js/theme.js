// theme.js
// Handles dark-mode toggle and remembers preference in localStorage. Also honors prefers-color-scheme.

(function(){
  var storageKey = 'theme-preference';
  var toggle = document.getElementById('theme-toggle');
  function applyDark(dark){
    if(dark){
      document.documentElement.classList.add('dark');
      if(toggle) toggle.textContent = '☀️';
    } else {
      document.documentElement.classList.remove('dark');
      if(toggle) toggle.textContent = '🌙';
    }
  }

  // detect saved preference
  var saved = localStorage.getItem(storageKey);
  if(saved === 'dark') applyDark(true);
  else if(saved === 'light') applyDark(false);
  else {
    // no saved -> use system preference
    var prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyDark(prefers);
  }

  if(toggle){
    toggle.addEventListener('click', function(){
      var isDark = document.documentElement.classList.contains('dark');
      applyDark(!isDark);
      localStorage.setItem(storageKey, !isDark ? 'dark' : 'light');
    });
  }
})();
