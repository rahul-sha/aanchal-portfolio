function startScenes(){
  if(!window.THREE){ return; }
  var IMG = ['img/interview.webp','img/camera.webp','img/stage.webp','img/portrait.webp','img/screen.webp'];
  var loader = new THREE.TextureLoader();
  var textures = IMG.map(function(p){ var t = loader.load(p); t.minFilter = THREE.LinearFilter; return t; });
  var wallTex = ['media/r1-poster.webp','media/r2-poster.webp','media/r3-poster.webp','media/r4-poster.webp','media/r5-poster.webp','img/interview.webp','img/stage.webp'].map(function(p){ var t = loader.load(p); t.minFilter = THREE.LinearFilter; return t; });
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ACCENT = 0xFF5E4D, SUN = 0xD9F55B, INK = 0x0E0E1A;

  function makeRenderer(canvas){
    var r = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:false});
    r.setPixelRatio(Math.min(window.devicePixelRatio||1, 1.5));
    r.setClearColor(INK, 1);
    return r;
  }
  function fit(r, cam, el){
    var w = el.clientWidth, h = el.clientHeight; if(!w||!h) return;
    var c = r.domElement; if(c.width!==Math.floor(w*r.getPixelRatio())||c.height!==Math.floor(h*r.getPixelRatio())){ r.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); }
  }
  function drag(el, onMove, onClick){
    var down=false, moved=false, lx=0, ly=0, sx=0, sy=0;
    el.addEventListener('pointerdown', function(e){ if(e.target.closest('a,button')) return; down=true; moved=false; lx=sx=e.clientX; ly=sy=e.clientY; });
    el.addEventListener('pointermove', function(e){
      if(!down){ if(onMove) onMove(0,0,e,false); return; }
      var dx=e.clientX-lx, dy=e.clientY-ly; lx=e.clientX; ly=e.clientY;
      if(Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy)>6) moved=true;
      if(onMove) onMove(dx,dy,e,true);
    });
    function up(e){ if(!down) return; down=false; if(!moved && onClick) onClick(e); }
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up); el.addEventListener('pointerleave', function(){ down=false; });
  }
  function ndc(el, e){ var b = el.getBoundingClientRect(); return new THREE.Vector2(((e.clientX-b.left)/b.width)*2-1, -((e.clientY-b.top)/b.height)*2+1); }
  function sectionProgress(el){ var r = el.getBoundingClientRect(), vh = window.innerHeight; return (vh - r.top)/(vh + r.height); }
  var scenes = {};

  /* Studio hero */
  (function(){
    var el = document.getElementById('top'), canvas = document.getElementById('c-studio');
    var r = makeRenderer(canvas), scene = new THREE.Scene();
    scene.fog = new THREE.Fog(INK, 10, 24);
    var cam = new THREE.PerspectiveCamera(40, 1, .1, 60);
    scene.add(new THREE.HemisphereLight(0xFFF4E6, 0x1A1440, 0.95));
    var spot = new THREE.PointLight(0xFFE2C4, 1.1, 30); spot.position.set(2,5,3); scene.add(spot);
    var fill = new THREE.PointLight(0x2B4BFF, 0.9, 20); fill.position.set(-4,3,2); scene.add(fill);
    var mat = function(c){ return new THREE.MeshStandardMaterial({color:c, roughness:0.85, metalness:0.05}); };
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(16,16), mat(0x1C1640)); floor.rotation.x=-Math.PI/2; scene.add(floor);
    var wall = new THREE.Mesh(new THREE.PlaneGeometry(16,7), mat(0x241C4F)); wall.position.set(0,3.5,-5); scene.add(wall);
    var grid = new THREE.GridHelper(16, 16, 0x2E2566, 0x2E2566); grid.position.y = 0.01; scene.add(grid);
    var camG = new THREE.Group(); camG.position.set(-2.2,0,0.4); scene.add(camG);
    for(var i=0;i<3;i++){ var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,2.2), mat(0x9A95B5)); var a=i/3*Math.PI*2; leg.position.set(Math.sin(a)*0.45,1.1,Math.cos(a)*0.45); leg.rotation.z = Math.sin(a)*0.35; leg.rotation.x = -Math.cos(a)*0.35; camG.add(leg); }
    var body = new THREE.Mesh(new THREE.BoxGeometry(0.7,0.45,0.5), mat(0x2A2450)); body.position.y=2.35; camG.add(body);
    var lens = new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.2,0.5,24), mat(0x100C24)); lens.rotation.x=Math.PI/2; lens.position.set(0,2.35,0.5); camG.add(lens);
    var ring = new THREE.Mesh(new THREE.TorusGeometry(0.75,0.08,16,48), new THREE.MeshStandardMaterial({color:0xFFF1DC, emissive:0xFFE6C7, emissiveIntensity:0.9})); ring.position.set(1.8,2.6,-1.2); scene.add(ring);
    var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,2.6), mat(0x9A95B5)); pole.position.set(1.8,1.3,-1.2); scene.add(pole);
    var monG = new THREE.Group(); monG.position.set(3.4,0,-2.6); monG.rotation.y=-0.5; scene.add(monG);
    var desk = new THREE.Mesh(new THREE.BoxGeometry(2.4,0.08,1.1), mat(0x3B3270)); desk.position.y=1.1; monG.add(desk);
    var screen = new THREE.Mesh(new THREE.PlaneGeometry(1.8,0.945), new THREE.MeshBasicMaterial({map:textures[4]})); screen.position.set(0,1.85,-0.2); monG.add(screen);
    var bezel = new THREE.Mesh(new THREE.BoxGeometry(1.9,1.045,0.06), mat(0x100C24)); bezel.position.set(0,1.85,-0.24); monG.add(bezel);
    var micG = new THREE.Group(); micG.position.set(0.3,0,1.6); scene.add(micG);
    var stand = new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.025,1.5), mat(0x9A95B5)); stand.position.y=0.75; micG.add(stand);
    var micHead = new THREE.Mesh(new THREE.SphereGeometry(0.16,16,16), mat(0xD2CCE6)); micHead.position.y=1.6; micG.add(micHead);
    var board = new THREE.Mesh(new THREE.PlaneGeometry(2.6,1.5), mat(0xFBF8F1)); board.position.set(-3.2,2.4,-4.95); scene.add(board);
    var lineCols = [0x2B4BFF, ACCENT, 0xBFE3FF, 0x140F2D];
    for(var j=0;j<4;j++){ var line = new THREE.Mesh(new THREE.PlaneGeometry(1.6-j*0.3,0.1), new THREE.MeshBasicMaterial({color:lineCols[j]})); line.position.set(-3.2-(j*0.15),2.85-j*0.3,-4.94); scene.add(line); }
    var poster = new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.75), new THREE.MeshBasicMaterial({map:textures[3]})); poster.position.set(0.4,2.6,-4.95); scene.add(poster);
    var posterFrame = new THREE.Mesh(new THREE.PlaneGeometry(1.56,1.91), new THREE.MeshBasicMaterial({color:SUN})); posterFrame.position.set(0.4,2.6,-4.96); scene.add(posterFrame);
    var hs = [
      {p:[-2.2,2.9,0.4], t:'Brand films', d:'15+ campus events and NIAT brand films, produced end to end.'},
      {p:[1.8,3.5,-1.2], t:'Creator campaigns', d:'Regional creator-led campaign: 6M+ views in two months.'},
      {p:[3.4,2.7,-2.6], t:'Student Creator Program', d:'15+ creators, 200+ UGC videos, 500K+ views.'},
      {p:[0.3,2.1,1.6], t:'On camera', d:'Hosting, interviews, and a Short that hit 2M views in a day.'},
      {p:[-3.2,3.4,-4.6], t:'Strategy', d:'L’Oréal Luxe Takami launch plan; 60+ brands in Singapore.'}
    ];
    var spots = hs.map(function(h){ var m = new THREE.Mesh(new THREE.SphereGeometry(0.13,16,16), new THREE.MeshBasicMaterial({color:SUN})); m.position.fromArray(h.p); m.userData=h; scene.add(m); var halo = new THREE.Mesh(new THREE.RingGeometry(0.2,0.24,32), new THREE.MeshBasicMaterial({color:SUN, transparent:true, opacity:0.6, side:THREE.DoubleSide})); m.add(halo); m.userData.halo = halo; return m; });
    var card = document.getElementById('studio-card'), ct = document.getElementById('studio-t'), cd = document.getElementById('studio-d'), status = document.getElementById('studio-status');
    var yaw = 0.35, pitch = 0.22, ray = new THREE.Raycaster(), hover=null, t=0;
    function pick(e){ ray.setFromCamera(ndc(el,e), cam); var h = ray.intersectObjects(spots); return h.length?h[0].object:null; }
    drag(el, function(dx,dy,e,isDrag){ if(isDrag){ yaw -= dx*0.005; pitch = Math.max(0.05, Math.min(0.9, pitch + dy*0.004)); } else { hover = pick(e); el.style.cursor = hover?'pointer':'grab'; } },
      function(e){ var h = pick(e); if(h){ ct.textContent=h.userData.t; cd.textContent=h.userData.d; card.hidden=false; status.textContent = h.userData.t; } else { card.hidden=true; status.textContent='5 areas · scroll ↓'; } });
    scenes.studio = { el:el, visible:true, render:function(dt){
      fit(r, cam, el); t+=dt;
      var sy = reduced ? 0 : Math.min(1, window.scrollY/Math.max(1, el.clientHeight));
      var ry = (reduced?yaw:yaw+Math.sin(t*0.2)*0.03) + sy*0.6;
      var wide = el.clientWidth/el.clientHeight;
      var dist = wide<1 ? 13 : 10;
      cam.position.set(Math.sin(ry)*dist + (wide<1?0:-3.4), 2.2+pitch*5 + sy*2.5, Math.cos(ry)*dist); cam.lookAt(wide<1?0:-2.6, wide<1?3.6:1.6, -1);
      spots.forEach(function(s,i){ var k = 1+Math.sin(t*3+i)*0.18; s.scale.setScalar(s===hover?1.6:k); s.userData.halo.lookAt(cam.position); s.userData.halo.material.opacity = 0.35+0.35*Math.sin(t*3+i); });
      r.render(scene, cam);
    }};
  })();

  /* Creator wall: built only when its section comes near the viewport, so the hero loads first. */
  function buildWall(){
    var el = document.getElementById('creators'), canvas = document.getElementById('c-ugc');
    var r = makeRenderer(canvas), scene = new THREE.Scene();
    scene.fog = new THREE.Fog(INK, 9, 18);
    var cam = new THREE.PerspectiveCamera(42, 1, .1, 60); cam.position.set(0,0,11);
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    var creators = [
      ['Siddhant Naik','Regional creator campaign · comedy'],['Sahil Gaikwad','Regional creator campaign · lifestyle'],['Aditya Dere','Regional creator campaign · campus life'],
      ['Mh19_Comedian','Regional creator campaign · regional comedy'],['Gauravmalode5','Regional creator campaign · vlog'],['Student creator','Student Creator Program · day in the life'],
      ['Student creator','Student Creator Program · hostel tour'],['Student creator','Student Creator Program · placement story'],['Brand UGC','Singapore retention campaign · 150 purchases'],
      ['Brand UGC','Seasonal launch content, Singapore'],['Creator workshop','L’Oréal Luxe · 150+ creators briefed'],['Student creator','Student Creator Program · exam week']
    ];
    var barCols = [ACCENT, SUN, 0xBFE3FF, 0xDCCFFF, 0x2B4BFF];
    var COLS = 9, ROWS = 6, GAPX = 1.55, GAPY = 2.45, wall = new THREE.Group(); scene.add(wall);
    wall.position.x = 1.6;
    var pg = new THREE.PlaneGeometry(1.25, 2.2), bg = new THREE.PlaneGeometry(1.37, 2.32);
    var tiles = [], n=0;
    for(var y=0;y<ROWS;y++) for(var x=0;x<COLS;x++){
      var g = new THREE.Group();
      var b = new THREE.Mesh(bg, new THREE.MeshBasicMaterial({color:0x1F1848})); b.position.z=-0.01; g.add(b);
      var m = new THREE.Mesh(pg, new THREE.MeshBasicMaterial({map:wallTex[(x*3+y)%wallTex.length], transparent:true, opacity:0.55+((x+y)%3)*0.15})); g.add(m);
      var bar = new THREE.Mesh(new THREE.PlaneGeometry(0.9,0.07), new THREE.MeshBasicMaterial({color:barCols[(x+y)%barCols.length]})); bar.position.set(0,-0.95,0.01); bar.scale.x = 0.3+((x*5+y*3)%7)/10; g.add(bar);
      g.position.set((x-(COLS-1)/2)*GAPX, (y-(ROWS-1)/2)*GAPY + (x%2)*1.1, 0);
      g.userData = { base: g.position.clone(), c: creators[n%creators.length], mesh:m }; n++;
      wall.add(g); tiles.push(g);
    }
    var shade = new THREE.Mesh(new THREE.PlaneGeometry(14, 20), new THREE.MeshBasicMaterial({color:INK, transparent:true, opacity:0.55})); shade.position.set(-7.5,0,1.5); scene.add(shade);
    var card = document.getElementById('ugc-card'), ct = document.getElementById('ugc-t'), cd = document.getElementById('ugc-d');
    var tilt = new THREE.Vector2(0,0), targetTilt = new THREE.Vector2(0,0), picked=null, ray = new THREE.Raycaster(), t=0, H = ROWS*GAPY;
    drag(el, function(dx,dy,e){ var p = ndc(el,e); targetTilt.set(p.x, p.y); }, function(e){
      ray.setFromCamera(ndc(el,e), cam);
      var hits = ray.intersectObjects(tiles, true);
      if(hits.length){ var g = hits[0].object.parent; if(picked===g){ picked=null; card.hidden=true; } else { picked=g; ct.textContent=g.userData.c[0]; cd.textContent=g.userData.c[1]; card.hidden=false; } }
      else { picked=null; card.hidden=true; }
    });
    el.addEventListener('pointerleave', function(){ targetTilt.set(0,0); });
    var front = new THREE.Vector3(-1.6,0,5.2);
    scenes.ugc = { el:el, visible:false, render:function(dt){
      fit(r, cam, el); t+=dt;
      tilt.lerp(targetTilt, 0.06);
      var sp = reduced ? 0.5 : sectionProgress(el);
      wall.rotation.y = tilt.x*0.3; wall.rotation.x = -tilt.y*0.2 + (sp-0.5)*0.5;
      wall.position.y = (sp-0.5)*-3;
      var speed = reduced?0:0.35;
      tiles.forEach(function(g,i){
        var b = g.userData.base;
        var yy = b.y + ((i%COLS)%2? -1:1)*speed*t;
        yy = ((yy + H/2) % H + H) % H - H/2;
        if(g===picked){ g.position.lerp(front, 0.12); g.scale.lerp(new THREE.Vector3(1.4,1.4,1), 0.12); g.userData.mesh.material.opacity += (1-g.userData.mesh.material.opacity)*0.15; }
        else { g.position.x += (b.x-g.position.x)*0.12; g.position.z += (0-g.position.z)*0.12; g.position.y = yy; g.scale.lerp(new THREE.Vector3(1,1,1), 0.12); }
      });
      r.render(scene, cam);
    }};
  }

  var wallEl = document.getElementById('creators');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(en){ var k = en.target.getAttribute('data-scene'); if(scenes[k]) scenes[k].visible = en.isIntersecting; }); }, {rootMargin:'100px'});
    document.querySelectorAll('[data-scene]').forEach(function(s){ io.observe(s); });
    var near = new IntersectionObserver(function(es){ es.forEach(function(en){ if(!en.isIntersecting || scenes.ugc) return; near.disconnect(); buildWall(); io.unobserve(wallEl); io.observe(wallEl); }); }, {rootMargin:'600px'});
    near.observe(wallEl);
  } else { buildWall(); Object.keys(scenes).forEach(function(k){ scenes[k].visible = true; }); }
  var last = performance.now();
  function loop(now){ var dt = Math.min(0.05,(now-last)/1000); last = now; if(!document.hidden){ Object.keys(scenes).forEach(function(k){ if(scenes[k].visible) scenes[k].render(dt); }); } requestAnimationFrame(loop); }
  requestAnimationFrame(loop);
}
/* Build the WebGL scenes after the page has painted, so the hero text and first screens are not held up by shader compilation. */
function scheduleScenes(){ if('requestIdleCallback' in window){ requestIdleCallback(startScenes, {timeout: 1500}); } else { setTimeout(startScenes, 200); } }
if(document.readyState === 'complete'){ scheduleScenes(); } else { window.addEventListener('load', scheduleScenes); }
