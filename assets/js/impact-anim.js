// impact-anim.js
// Adds a slide+fade animation to each .impact-line when the .impact-block enters the viewport.

(function(){
  if(!('IntersectionObserver' in window)){
    // Fallback: just add in-view immediately
    document.querySelectorAll('.impact-line').forEach(function(el){ el.classList.add('in-view'); });
    return;
  }

  function animateLines(block){
    var lines = block.querySelectorAll('.impact-line');
    lines.forEach(function(line, i){
      var delay = i * 80; // ms stagger
      line.style.transition = 'transform 560ms cubic-bezier(.2,.9,.2,1) ' + delay + 'ms, opacity 560ms ' + delay + 'ms';
      line.classList.add('in-view');
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var block = document.querySelector('.impact-block');
    if(!block) return;
    var observer = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animateLines(block);
          obs.disconnect();
        }
      });
    }, {threshold: 0.18});
    observer.observe(block);
  });
})();
