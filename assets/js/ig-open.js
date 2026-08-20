// ig-open.js
// Enhanced opener: handles Instagram app fallback, mailto and tel links and general external links.
// Shows a quick toast and attempts the appropriate deep link or fallback.

(function(){
  function showToast(message){
    var t = document.getElementById('ig-toast');
    if(!t) return;
    t.textContent = message;
    t.setAttribute('aria-hidden', 'false');
    t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); t.setAttribute('aria-hidden','true'); }, 1600);
  }

  function openInstagram(username){
    var web = 'https://www.instagram.com/' + username + '/';
    var app = 'instagram://user?username=' + username;

    var now = Date.now();
    // Try app deep link first
    window.location = app;

    // Fallback to web profile after short delay if app didn't open
    setTimeout(function(){
      if (Date.now() - now < 1200) {
        window.open(web, '_blank', 'noopener');
      }
    }, 900);
  }

  function openMail(href){
    // small delay so toast is visible
    setTimeout(function(){ window.location = href; }, 220);
  }

  function openTel(href){
    setTimeout(function(){ window.location = href; }, 220);
  }

  function openExternal(href){
    setTimeout(function(){ window.open(href, '_blank', 'noopener'); }, 220);
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest('.ig-btn');
    if(!btn) return;
    e.preventDefault();

    var service = btn.getAttribute('data-service');
    var username = btn.getAttribute('data-username');
    var href = btn.getAttribute('href') || '';

    // Determine toast message
    var toastMsg = 'Abrindo...';
    if(username){
      toastMsg = 'Abrindo Instagram...';
    } else if(service === 'tiktok'){
      toastMsg = 'Abrindo TikTok...';
    } else if(href.indexOf('mailto:') === 0){
      toastMsg = 'Abrindo email...';
    } else if(href.indexOf('tel:') === 0){
      toastMsg = 'Abrindo telefone...';
    } else {
      toastMsg = 'Abrindo link...';
    }

    showToast(toastMsg);

    if(username){
      openInstagram(username);
      return;
    }

    if(href.indexOf('mailto:') === 0){
      openMail(href);
      return;
    }

    if(href.indexOf('tel:') === 0){
      openTel(href);
      return;
    }

    if(href){
      openExternal(href);
      return;
    }

    // if no href and no username, do nothing
  }, false);

  // keyboard: treat Enter/Space on focused .ig-btn as click
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Enter' && e.key !== ' ') return;
    var active = document.activeElement;
    if(active && active.classList && active.classList.contains('ig-btn')){
      e.preventDefault();
      active.click();
    }
  });
})();
