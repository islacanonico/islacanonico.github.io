// ig-open.js
// Creative Instagram opener: tries to open the Instagram app first, falls back to web profile.
// Uses a short toast message to inform the user.

(function(){
  function showToast(message){
    var t = document.getElementById('ig-toast');
    if(!t) return;
    t.textContent = message;
    t.setAttribute('aria-hidden', 'false');
    t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); t.setAttribute('aria-hidden','true'); }, 1700);
  }

  function openInstagram(username){
    var web = 'https://www.instagram.com/' + username + '/';
    var app = 'instagram://user?username=' + username;

    // Show quick toast
    showToast('Abrindo Instagram...');

    // Try to open the app first. On most mobile browsers this will switch to the app.
    // Use time-based fallback to web.
    var now = Date.now();
    // Attempt to change location to app link
    window.location = app;

    // After 900ms, if we're still on the page, go to web URL
    setTimeout(function(){
      if (Date.now() - now < 1200) {
        window.open(web, '_blank');
      }
    }, 900);
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest('.ig-btn');
    if(!btn) return;
    var username = btn.getAttribute('data-username') || 'islacanonico';
    e.preventDefault();
    openInstagram(username);
  }, false);
})();
