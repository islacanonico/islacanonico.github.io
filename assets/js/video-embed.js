(function(){
  var tiktokUrl = 'https://vt.tiktok.com/ZSVSW5G87/';
  var card = document.querySelector('.video-card');
  var openBtns = document.querySelectorAll('.open-video, .video-card');
  var modal = document.getElementById('video-modal');
  var wrap = document.getElementById('video-embed-wrap');
  var closeBtn = null;
  var backdrop = null;

  function injectEmbed(){
    if(!wrap || wrap.dataset.loaded) return;
    // Create blockquote for official embed
    var block = document.createElement('blockquote');
    block.className = 'tiktok-embed';
    block.setAttribute('cite', tiktokUrl);
    block.setAttribute('data-video-id', '');
    block.innerHTML = '<section> </section>';
    wrap.appendChild(block);

    var s = document.createElement('script');
    s.src = 'https://www.tiktok.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
    wrap.dataset.loaded = '1';
  }

  function openModal(e){
    injectEmbed();
    if(!modal) return;
    modal.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    // find elements
    closeBtn = modal.querySelector('.video-modal__close');
    backdrop = modal.querySelector('[data-close]');
    if(closeBtn) closeBtn.focus();
  }
  function closeModal(){
    if(!modal) return;
    modal.hidden = true;
    document.documentElement.style.overflow = '';
  }

  document.addEventListener('DOMContentLoaded', function(){
    openBtns.forEach(function(b){ b.addEventListener('click', openModal); b.addEventListener('keydown', function(ev){ if(ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openModal(); } }); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });
    modal = document.getElementById('video-modal');
    backdrop = modal && modal.querySelector('[data-close]');
    if(backdrop) backdrop.addEventListener('click', closeModal);
    // close button
    document.addEventListener('click', function(e){ if(e.target && e.target.classList && e.target.classList.contains('video-modal__close')) closeModal(); });
  });
})();
