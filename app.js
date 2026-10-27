(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var h1 = document.getElementById('hero-h1');
  if(h1 && !reduced){
    var html = '';
    Array.prototype.forEach.call(h1.childNodes, function(n){
      if(n.nodeType===3){ n.textContent.split(/\s+/).filter(Boolean).forEach(function(w){ html += '<span class="w"><span>'+w+'</span></span> '; }); }
      else { html += '<span class="w"><span class="'+n.className+'">'+n.textContent+'</span></span> '; }
    });
    h1.innerHTML = html;
    Array.prototype.forEach.call(h1.querySelectorAll('.w span'), function(s,i){ s.style.animationDelay = (0.2 + i*0.1)+'s'; });
  }
  var items = document.querySelectorAll('[data-rv]');
  if('IntersectionObserver' in window && !reduced){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:0.12});
    items.forEach(function(el){ io.observe(el); });
  } else { items.forEach(function(el){ el.classList.add('in'); }); }
  var counters = document.querySelectorAll('[data-count]');
  function fmt(n, comma){ n = Math.round(n); return comma ? n.toLocaleString('en-IN') : String(n); }
  if('IntersectionObserver' in window && !reduced){
    var co = new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return; co.unobserve(e.target);
      var el = e.target, end = parseFloat(el.getAttribute('data-count')), comma = el.hasAttribute('data-comma'), t0 = null;
      function step(ts){ if(!t0) t0 = ts; var p = Math.min(1,(ts-t0)/1500); p = 1-Math.pow(1-p,3); el.textContent = fmt(end*p, comma); if(p<1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }); }, {threshold:0.5});
    counters.forEach(function(c){ co.observe(c); });
  } else { counters.forEach(function(c){ c.textContent = fmt(parseFloat(c.getAttribute('data-count')), c.hasAttribute('data-comma')); }); }

  /* the deck: sticky offsets for tall panels, depth effect as the next panel covers */
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var veils = panels.map(function(p){ return p.querySelector('.veil'); });
  var bar = document.getElementById('progress'), hero = document.getElementById('hero-text');
  var pxImgs = Array.prototype.slice.call(document.querySelectorAll('[data-px]'));
  function layout(){
    var vh = window.innerHeight;
    panels.forEach(function(p){ var h = p.offsetHeight; p.style.top = (h > vh ? (vh - h) : 0) + 'px'; });
  }
  var ticking = false;
  function onScroll(){
    var y = window.scrollY, vh = window.innerHeight, H = document.documentElement.scrollHeight - vh;
    if(bar) bar.style.width = (H>0 ? (y/H*100) : 0) + '%';
    if(!reduced){
      for(var i=0;i<panels.length-1;i++){
        var nextTop = panels[i+1].getBoundingClientRect().top;
        var p = Math.min(1, Math.max(0, (vh - nextTop)/vh));
        var e = p*p;
        panels[i].style.transform = p>0 ? 'translateY('+(-e*60)+'px) scale('+(1-e*0.07)+')' : '';
        if(veils[i]) veils[i].style.opacity = String(e*0.55);
      }
      if(hero){ var k = Math.min(1, y/(vh*0.9)); hero.style.transform = 'translateY('+(y*0.18)+'px)'; hero.style.opacity = String(1 - k*0.85); }
      pxImgs.forEach(function(img){ var r = img.parentElement.getBoundingClientRect(); var c = (r.top + r.height/2 - vh/2)/vh; img.style.transform = 'translateY('+(c*-28)+'px)'; });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function(){ if(!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
  window.addEventListener('resize', function(){ layout(); onScroll(); });
  layout(); onScroll();
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  window.addEventListener('load', layout);

  /* project dialogs */
  document.querySelectorAll('[data-open]').forEach(function(b){ b.addEventListener('click', function(){ var d = document.getElementById(b.getAttribute('data-open')); if(!d) return; if(d.showModal) d.showModal(); else d.setAttribute('open','');
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    d.querySelectorAll('video[data-src]').forEach(function(v){ if(!v.getAttribute('src')){ v.src = v.getAttribute('data-src'); } if(!still){ v.play().catch(function(){}); } }); }); });
  document.querySelectorAll('.reel video').forEach(function(v){ v.addEventListener('click', function(){ if(v.paused){ v.play().catch(function(){}); } else { v.pause(); } }); });
  document.querySelectorAll('dialog.proj').forEach(function(d){
    d.querySelectorAll('[data-close]').forEach(function(c){ c.addEventListener('click', function(){ d.close(); }); });
    d.addEventListener('click', function(e){ if(e.target===d) d.close(); });
    d.addEventListener('close', function(){ d.querySelectorAll('video').forEach(function(v){ v.pause(); }); });
  });
})();
