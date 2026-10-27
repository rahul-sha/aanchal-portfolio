/* Detailed lit studio set. Everything is built from primitives: no photographs or posters.
   buildStudioSet(THREE, scene, renderer, opts) returns {hotspots, update(t, dt), shadowCasters} */
function buildStudioSet(THREE, scene, r, opts){
  var reduced = opts.reduced, phone = opts.phone;
  var INK=0x0E0E1A, CREAM=0xF6F3EC, BLUE=0x2B4BFF, CORAL=0xFF5E4D, LIME=0xD9F55B, LILAC=0xDCCFFF, SKY=0xBFE3FF;
  var WARM=0xFFE2C4, WARM2=0xFFF6EA;
  var mats = {};
  function M(c, o){ var k = c+JSON.stringify(o||{}); if(!mats[k]){ var m = new THREE.MeshStandardMaterial({color:c, roughness:0.8, metalness:0.05}); if(o) Object.assign(m, o); mats[k]=m; } return mats[k]; }
  var METAL = M(0x8E89A8,{metalness:0.7, roughness:0.35}), DARKMETAL = M(0x2A2450,{metalness:0.5, roughness:0.45}), BLACK = M(0x100C24,{roughness:0.5}), MATTE = M(0x1A1538,{roughness:0.95});
  var WOOD = M(0xC9B48A,{roughness:0.9}), WOOD2 = M(0xB89F74,{roughness:0.9}), FABRIC = M(0x241C4F,{roughness:1});
  function B(c){ return new THREE.MeshBasicMaterial({color:c}); }
  function mesh(g, m, x, y, z, parent, shadow){ var o = new THREE.Mesh(g, m); o.position.set(x||0, y||0, z||0); if(shadow!==false){ o.castShadow = true; o.receiveShadow = true; } (parent||scene).add(o); return o; }
  function group(x,y,z,ry,parent){ var g = new THREE.Group(); g.position.set(x,y,z); if(ry) g.rotation.y = ry; (parent||scene).add(g); return g; }
  function box(w,h,d){ return new THREE.BoxGeometry(w,h,d); }
  function cyl(rt,rb,h,s){ return new THREE.CylinderGeometry(rt,rb,h,s||16); }
  var anim = []; // functions of (t, dt)

  /* ---- lighting ---- */
  r.shadowMap.enabled = !phone; r.shadowMap.type = THREE.PCFShadowMap;
  scene.fog = new THREE.FogExp2(INK, 0.042);
  scene.add(new THREE.HemisphereLight(0xFFF4E6, 0x1A1440, 0.42));
  var key = new THREE.SpotLight(WARM, 1.7, 32, 0.55, 0.6, 1.1); key.position.set(-1.4,5.6,0.6); key.target.position.set(0.4,0,-2.2); key.castShadow = true; key.shadow.mapSize.set(phone?512:1024, phone?512:1024); key.shadow.bias = -0.0006; key.shadow.camera.near = 1; key.shadow.camera.far = 20; scene.add(key, key.target);
  var fill = new THREE.PointLight(BLUE, 1.3, 16); fill.position.set(-5,3,3); scene.add(fill);
  var rim = new THREE.PointLight(CORAL, 1.1, 14); rim.position.set(5.5,2.5,-3.5); scene.add(rim);

  /* ---- room ---- */
  var floor = mesh(new THREE.PlaneGeometry(34,34), M(0x15113A,{roughness:0.45, metalness:0.1}), 0,0,0); floor.rotation.x = -Math.PI/2; floor.castShadow = false;
  var wall = mesh(new THREE.PlaneGeometry(34,9), M(0x1E1745,{roughness:0.95}), 0,4.5,-5); wall.castShadow = false;
  var skirting = mesh(box(34,0.12,0.04), M(0x2A2450), 0,0.06,-4.98);
  // acoustic foam: a field of small pyramids behind the creator spot
  (function(){ var pg = new THREE.ConeGeometry(0.11,0.12,4), fm = M(0x2B2260,{roughness:1}); var foam = group(0.9,2.7,-4.97); for(var i=0;i<10;i++) for(var j=0;j<7;j++){ var p = new THREE.Mesh(pg, fm); p.position.set((i-4.5)*0.24,(j-3)*0.24,0); p.rotation.x = Math.PI/2; p.rotation.z = Math.PI/4; foam.add(p); } var back = mesh(box(2.5,1.8,0.04), fm, 0,0,-0.06, foam, false); })();
  // tape marks on the floor (actor marks)
  [[-2.2,0.4,0],[1.2,-2.2,0.4],[-0.2,1.4,0.2]].forEach(function(p){ var x = group(p[0],0.012,p[1]); x.rotation.x=-Math.PI/2; for(var i=0;i<2;i++){ var s = new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.06), B(LIME)); s.rotation.z = Math.PI/4 + i*Math.PI/2 + p[2]; x.add(s); } });
  // cables snaking across the floor
  function cable(points, col){ var c = new THREE.CatmullRomCurve3(points.map(function(p){ return new THREE.Vector3(p[0],0.025,p[1]); })); var t = new THREE.Mesh(new THREE.TubeGeometry(c, 40, 0.022, 6, false), M(col||0x0B0918,{roughness:0.6})); t.castShadow=false; t.receiveShadow=true; scene.add(t); return t; }
  cable([[-5.2,-2.2],[-4.4,-1.2],[-3.6,-1.5],[-2.6,-0.6],[-1.4,-0.9],[-0.6,-0.2],[0.6,0.2],[1.6,-0.4]]);
  cable([[3.6,-1.6],[2.8,-0.8],[2.2,0.3],[1.2,0.8],[0.3,1.3]], 0x3B3270);
  cable([[1.8,-1.2],[2.6,-2.2],[3.4,-2.1]]);
  var strip = mesh(box(0.5,0.06,0.14), BLACK, 1.7,0.03,-0.45); for(var si=0;si<4;si++){ var sk = mesh(box(0.06,0.01,0.06), M(0xD2CCE6), 1.52+si*0.12,0.065,-0.45, null, false); } var stripLed = mesh(new THREE.SphereGeometry(0.015,6,6), B(CORAL), 1.9,0.07,-0.4, null, false);

  /* ---- overhead truss with two fresnels and their beams ---- */
  var truss = group(0,5.4,-1.2);
  mesh(cyl(0.035,0.035,15), METAL, 0,0.12,0.12, truss).rotation.z = Math.PI/2;
  mesh(cyl(0.035,0.035,15), METAL, 0,0.12,-0.12, truss).rotation.z = Math.PI/2;
  mesh(cyl(0.035,0.035,15), METAL, 0,-0.12,0, truss).rotation.z = Math.PI/2;
  for(var ti=-7;ti<=7;ti++){ var br = mesh(cyl(0.015,0.015,0.36,6), METAL, ti,0,0, truss, false); br.rotation.x = Math.PI/4; }
  function cone(h, rad, color, op){ var c = new THREE.Mesh(new THREE.ConeGeometry(rad, h, 32, 1, true), new THREE.MeshBasicMaterial({color:color, transparent:true, opacity:op, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide})); c.castShadow=false; return c; }
  function fresnel(x, aim, col){
    var g = group(x,-0.3,0,0,truss); mesh(cyl(0.05,0.05,0.3,8), METAL, 0,0.15,0, g, false);
    var head = group(0,-0.15,0,0,g); head.lookAt(new THREE.Vector3(aim[0], aim[1]-5.1, aim[2]+1.2)); head.rotateX(Math.PI/2);
    mesh(cyl(0.22,0.26,0.5,20), BLACK, 0,0,0, head);
    mesh(new THREE.CircleGeometry(0.2,20), new THREE.MeshBasicMaterial({color:col}), 0,-0.26,0, head, false).rotation.x = Math.PI/2;
    for(var k=0;k<4;k++){ var door = mesh(box(k<2?0.5:0.04, 0.04, k<2?0.04:0.5), DARKMETAL, k===0?0:k===1?0:k===2?0.25:-0.25, -0.3, k===0?0.25:k===1?-0.25:0, head, false); door.rotation[k<2?'x':'z'] = (k%2?1:-1)*0.5; }
    var from = new THREE.Vector3(x,5.1,-1.2), to = new THREE.Vector3().fromArray(aim);
    var beam = cone(6.5, 1.5, col, 0.028); scene.add(beam);
    var d = new THREE.Vector3().subVectors(to, from).normalize(); beam.position.copy(from).addScaledVector(d, 3.3); beam.quaternion.setFromUnitVectors(new THREE.Vector3(0,-1,0), d);
    return beam;
  }
  var fr1 = fresnel(-3.6, [-2.6,0,0.2], WARM2), fr2 = fresnel(3.2, [2.6,0,-2.4], LILAC);

  /* ---- seamless backdrop roll with a stool: the creator spot ---- */
  var bd = group(1.3,0,-4.0);
  mesh(cyl(0.11,0.11,3.4,20), M(0xC4B5F5,{roughness:1}), 0,4.3,0, bd).rotation.z = Math.PI/2; // the roll
  mesh(cyl(0.04,0.04,3.6,8), METAL, 0,4.3,0, bd, false).rotation.z = Math.PI/2; // crossbar
  [-1.75,1.75].forEach(function(x){ mesh(cyl(0.03,0.03,4.3,8), METAL, x,2.15,0, bd); for(var l=0;l<3;l++){ var leg = mesh(cyl(0.02,0.02,0.9,6), METAL, x+Math.sin(l*2.09)*0.3,0.3,Math.cos(l*2.09)*0.3, bd, false); leg.rotation.z = -Math.sin(l*2.09)*0.6; leg.rotation.x = Math.cos(l*2.09)*0.6; } var bag = mesh(box(0.34,0.14,0.2), M(0x3B3270), x,0.07,0.2, bd); });
  var paper = M(0xAFA0E0,{roughness:1, side:THREE.DoubleSide});
  var sheet = mesh(new THREE.PlaneGeometry(3.0,3.2), paper, 0,2.6,0.1, bd); sheet.castShadow=false;
  var sweepG = new THREE.PlaneGeometry(3.0,1,1,16); (function(){ var pa = sweepG.attributes.position; for(var i=0;i<pa.count;i++){ var v = (pa.getY(i)+0.5); var th = Math.PI + v*Math.PI/2; pa.setY(i, 1.0 + Math.sin(th)*1.0*-1); pa.setZ(i, 1.1 + Math.cos(th)*1.0); } sweepG.computeVertexNormals(); })(); var sweep = mesh(sweepG, paper, 0,0,0, bd); sweep.castShadow=false;
  var sheetFloor = mesh(new THREE.PlaneGeometry(3.0,1.6), paper, 0,0.005,1.9, bd); sheetFloor.rotation.x = -Math.PI/2; sheetFloor.castShadow=false;
  var stool = group(1.2,0,-2.4);
  mesh(cyl(0.3,0.3,0.06,24), M(0x3B3270,{roughness:0.7}), 0,0.72,0, stool);
  for(var l2=0;l2<4;l2++){ var sl = mesh(cyl(0.018,0.018,0.74,6), METAL, Math.sin(l2*1.57+0.78)*0.22,0.36,Math.cos(l2*1.57+0.78)*0.22, stool); sl.rotation.z = -Math.sin(l2*1.57+0.78)*0.12; sl.rotation.x = Math.cos(l2*1.57+0.78)*0.12; }
  mesh(new THREE.TorusGeometry(0.2,0.012,8,24), METAL, 0,0.25,0, stool, false).rotation.x = Math.PI/2;
  // ring light with a phone clamped in the middle, on a stand with a sandbag
  var ringG = group(1.8,0,-1.2);
  mesh(cyl(0.03,0.03,2.6), METAL, 0,1.3,0, ringG); for(var l3=0;l3<3;l3++){ var rl = mesh(cyl(0.02,0.02,0.9,6), METAL, Math.sin(l3*2.09)*0.3,0.3,Math.cos(l3*2.09)*0.3, ringG, false); rl.rotation.z = -Math.sin(l3*2.09)*0.6; rl.rotation.x = Math.cos(l3*2.09)*0.6; }
  var ringMat = new THREE.MeshStandardMaterial({color:0xFFF1DC, emissive:0xFFE6C7, emissiveIntensity:1.4, roughness:0.4});
  var ring = mesh(new THREE.TorusGeometry(0.75,0.08,16,48), ringMat, 0,2.6,0, ringG, false); ring.rotation.y = 0.35;
  var ringBack = mesh(new THREE.TorusGeometry(0.75,0.1,8,48), BLACK, 0,2.6,-0.03, ringG, false); ringBack.rotation.y = 0.35;
  var phone = mesh(box(0.16,0.32,0.02), BLACK, 0,2.6,0.02, ringG, false); phone.rotation.y = 0.35; mesh(new THREE.PlaneGeometry(0.14,0.28), new THREE.MeshBasicMaterial({color:0x2B2260}), 0,0,0.011, phone, false);
  var ringL = new THREE.PointLight(0xFFE6C7, 1.3, 7); ringL.position.set(1.8,2.6,-0.9); scene.add(ringL);
  var ringBeam = cone(4.6, 1.9, WARM, 0.03); ringBeam.position.set(1.6,2.4,-2.6); ringBeam.rotation.x = -0.45; ringBeam.rotation.z = 0.1; scene.add(ringBeam);
  mesh(box(0.34,0.14,0.2), M(0x3B3270), 0.2,0.07,0.25, ringG);

  /* ---- cine camera on a fluid-head tripod ---- */
  var camG = group(-2.2,0,0.4,-0.25);
  for(var i=0;i<3;i++){ var a=i/3*Math.PI*2; var leg = mesh(cyl(0.035,0.035,2.1), METAL, Math.sin(a)*0.5,1.05,Math.cos(a)*0.5, camG); leg.rotation.z = Math.sin(a)*0.4; leg.rotation.x = -Math.cos(a)*0.4; var leg2 = mesh(cyl(0.022,0.022,1.0), DARKMETAL, Math.sin(a)*0.78,0.5,Math.cos(a)*0.78, camG, false); leg2.rotation.z = Math.sin(a)*0.4; leg2.rotation.x = -Math.cos(a)*0.4; var sp2 = mesh(cyl(0.012,0.012,0.6,6), METAL, Math.sin(a+0.5)*0.3,0.35,Math.cos(a+0.5)*0.3, camG, false); sp2.rotation.z = Math.PI/2; sp2.rotation.y = -(a+0.5)+Math.PI/2; }
  mesh(cyl(0.1,0.08,0.2,16), DARKMETAL, 0,2.12,0, camG); // bowl
  var headG = group(0,2.25,0,0,camG);
  mesh(box(0.3,0.16,0.36), BLACK, 0,0,0, headG);
  var handle = mesh(cyl(0.018,0.018,0.7,8), METAL, 0.25,-0.15,-0.4, headG, false); handle.rotation.x = 0.9;
  mesh(cyl(0.03,0.03,0.14,8), M(0x1A1538), 0.25,-0.42,-0.72, headG, false).rotation.x = 0.9;
  var camBody = group(0,0.3,0,0,headG);
  mesh(box(0.62,0.42,0.52), M(0x2A2450,{roughness:0.5}), 0,0,0, camBody);
  mesh(box(0.5,0.08,0.4), BLACK, 0,0.25,0, camBody); // top plate
  mesh(box(0.2,0.1,0.22), BLACK, 0,0.33,-0.1, camBody); // top handle base
  mesh(cyl(0.025,0.025,0.5,8), METAL, 0,0.4,0.0, camBody, false).rotation.x = Math.PI/2; // top handle
  mesh(box(0.16,0.12,0.18), BLACK, -0.42,0.02,-0.1, camBody); // side grip
  var lensG = group(0,0,0.42,0,camBody);
  mesh(cyl(0.14,0.15,0.3,24), BLACK, 0,0,0, lensG).rotation.x = Math.PI/2;
  mesh(cyl(0.165,0.165,0.06,24), M(0xD9F55B,{roughness:0.6}), 0,0,-0.08, lensG, false).rotation.x = Math.PI/2; // focus ring, lime
  mesh(cyl(0.16,0.14,0.14,24), M(0x1A1538,{roughness:0.4,metalness:0.4}), 0,0,0.22, lensG, false).rotation.x = Math.PI/2;
  mesh(cyl(0.19,0.17,0.2,24,1,true), BLACK, 0,0,0.38, lensG, false).rotation.x = Math.PI/2; // hood
  mesh(new THREE.CircleGeometry(0.13,24), M(0x1B3A8A,{roughness:0.05,metalness:0.9,emissive:0x0B1A4A}), 0,0,0.3, lensG, false);
  var vf = mesh(box(0.3,0.2,0.04), BLACK, 0,0.46,-0.5, camBody, false); vf.rotation.x = -0.5; // top monitor
  var vfScreen = mesh(new THREE.PlaneGeometry(0.27,0.17), new THREE.MeshBasicMaterial({color:0xDCCFFF}), 0,0,0.021, vf, false);
  mesh(cyl(0.02,0.02,0.3,8), METAL, 0,0.33,-0.42, camBody, false);
  var rec = mesh(new THREE.SphereGeometry(0.035,8,8), B(CORAL), 0.26,0.1,-0.27, camBody, false);
  mesh(box(0.1,0.3,0.12), BLACK, 0,0.05,-0.33, camBody, false); // battery
  mesh(cyl(0.03,0.03,0.24,8), BLACK, 0.2,0.42,-0.1, camBody, false); // shotgun mic on top
  var sand = mesh(box(0.34,0.14,0.2), M(0x3B3270), 0.35,0.07,0.4, camG); sand.rotation.y=0.4;

  /* ---- phone on a gimbal on a small tripod, next to the cine camera ---- */
  var gim = group(-3.4,0,-0.6,0.4);
  for(var gi=0;gi<3;gi++){ var ga=gi/3*Math.PI*2; var gl = mesh(cyl(0.015,0.015,1.0,6), METAL, Math.sin(ga)*0.22,0.5,Math.cos(ga)*0.22, gim, false); gl.rotation.z = Math.sin(ga)*0.4; gl.rotation.x = -Math.cos(ga)*0.4; }
  mesh(cyl(0.03,0.03,0.5,8), BLACK, 0,1.2,0, gim); var gArm = mesh(box(0.05,0.3,0.05), BLACK, 0.12,1.55,0, gim, false); var gPhone = mesh(box(0.18,0.36,0.02), BLACK, 0.02,1.68,0, gim); mesh(new THREE.PlaneGeometry(0.16,0.32), new THREE.MeshBasicMaterial({color:0x2B2260}), 0,0,0.011, gPhone, false);

  /* ---- softbox key light on the left ---- */
  var sb = group(-5.2,0,-2.2,0.9);
  mesh(cyl(0.035,0.035,3.0), METAL, 0,1.5,0, sb); for(var l4=0;l4<3;l4++){ var sbl = mesh(cyl(0.02,0.02,1.0,6), METAL, Math.sin(l4*2.09)*0.35,0.35,Math.cos(l4*2.09)*0.35, sb, false); sbl.rotation.z = -Math.sin(l4*2.09)*0.6; sbl.rotation.x = Math.cos(l4*2.09)*0.6; }
  var sbHead = group(0,3.05,0.1,0,sb); sbHead.rotation.x = 0.3;
  mesh(cyl(0.12,0.12,0.3,16), BLACK, 0,0,-0.25, sbHead).rotation.x = Math.PI/2;
  var sbBox = mesh(new THREE.CylinderGeometry(0.75,0.12,0.6,4,1,true), M(0x1A1538,{roughness:0.9, side:THREE.DoubleSide}), 0,0,0.2, sbHead); sbBox.rotation.x = -Math.PI/2; sbBox.rotation.y = Math.PI/4; sbBox.castShadow = false;
  var sbFace = mesh(new THREE.PlaneGeometry(1.05,1.05), new THREE.MeshBasicMaterial({color:WARM2}), 0,0,0.5, sbHead, false);
  (function(){ var gm = new THREE.LineBasicMaterial({color:0xC9BFA8, transparent:true, opacity:0.5}); var pts = []; for(var g=-0.45;g<=0.46;g+=0.15){ pts.push(new THREE.Vector3(g,-0.52,0.505), new THREE.Vector3(g,0.52,0.505), new THREE.Vector3(-0.52,g,0.505), new THREE.Vector3(0.52,g,0.505)); } var grid = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), gm); sbHead.add(grid); })();
  var sbBeam = cone(4.8, 1.9, WARM2, 0.022); sbBeam.position.set(0.5,1.5,1.6); sbBeam.rotation.x = 0.55; sbBeam.rotation.z = -0.3; sb.add(sbBeam);
  mesh(box(0.34,0.14,0.2), M(0x3B3270), 0.3,0.07,0.2, sb);

  /* ---- LED panel with barn doors on the right, and an RGB tube leaning on the wall ---- */
  var led = group(5.0,0,-0.4,-1.2);
  mesh(cyl(0.03,0.03,2.3), METAL, 0,1.15,0, led); for(var l5=0;l5<3;l5++){ var ll = mesh(cyl(0.02,0.02,0.9,6), METAL, Math.sin(l5*2.09)*0.3,0.3,Math.cos(l5*2.09)*0.3, led, false); ll.rotation.z = -Math.sin(l5*2.09)*0.6; ll.rotation.x = Math.cos(l5*2.09)*0.6; }
  var ledHead = group(0,2.35,0,0,led); ledHead.rotation.x = 0.25;
  mesh(box(0.7,0.45,0.08), BLACK, 0,0,0, ledHead);
  var ledFace = mesh(new THREE.PlaneGeometry(0.62,0.38), new THREE.MeshBasicMaterial({color:SKY}), 0,0,0.045, ledHead, false);
  [[0,0.26,0.1,'x',-0.9,0.7,0.04],[0,-0.26,0.1,'x',0.9,0.7,0.04],[0.38,0,0.1,'z',0.9,0.04,0.5],[-0.38,0,0.1,'z',-0.9,0.04,0.5]].forEach(function(d){ var door = mesh(box(d[5],d[6],0.02), DARKMETAL, d[0],d[1],d[2], ledHead, false); door.rotation[d[3]] = d[4]; });
  mesh(box(0.34,0.14,0.2), M(0x3B3270), 0.2,0.07,0.25, led);
  var tubeMat = new THREE.MeshStandardMaterial({color:LILAC, emissive:LILAC, emissiveIntensity:1.2, roughness:0.5});
  var tube = mesh(cyl(0.035,0.035,2.4,12), tubeMat, -6.1,1.2,-4.75, null, false); tube.rotation.z = 0.14; tube.rotation.x = 0.1;

  /* ---- boom mic on a C-stand ---- */
  var cs = group(0.3,0,1.6,0);
  mesh(cyl(0.03,0.03,2.6), METAL, 0,1.3,0, cs); for(var l6=0;l6<3;l6++){ var cl = mesh(cyl(0.02,0.02,0.8,6), METAL, Math.sin(l6*2.09)*0.3,0.08+l6*0.08,Math.cos(l6*2.09)*0.3, cs, false); cl.rotation.z = -Math.sin(l6*2.09)*1.3; cl.rotation.x = Math.cos(l6*2.09)*1.3; }
  mesh(box(0.12,0.1,0.1), DARKMETAL, 0,2.6,0, cs, false);
  var tip = new THREE.Vector3(0.7,3.0,-3.6), base = new THREE.Vector3(0,2.6,0), mid = base.clone().lerp(tip,0.5);
  var boom = mesh(cyl(0.018,0.018,base.distanceTo(tip),8), METAL, mid.x,mid.y,mid.z, cs); boom.lookAt(cs.localToWorld(tip.clone())); boom.rotateX(Math.PI/2);
  mesh(box(0.34,0.14,0.2), M(0x3B3270), -0.5,2.62,0.3, cs, false); // counterweight on the short end
  var shock = group(tip.x,tip.y-0.15,tip.z,0,cs); shock.rotation.x = Math.PI/2*0.75;
  mesh(new THREE.TorusGeometry(0.08,0.012,8,24), DARKMETAL, 0,0,0, shock, false); mesh(new THREE.TorusGeometry(0.08,0.012,8,24), DARKMETAL, 0,0,0.14, shock, false);
  mesh(cyl(0.028,0.028,0.5,10), BLACK, 0,0,0.07, shock, false).rotation.x = Math.PI/2;
  mesh(cyl(0.06,0.06,0.3,10), M(0x6E6A86,{roughness:1}), 0,0,0.3, shock, false).rotation.x = Math.PI/2; // windshield
  mesh(box(0.34,0.14,0.2), M(0x3B3270), -0.25,0.07,0.2, cs);

  /* ---- edit desk ---- */
  var desk = group(3.4,0,-2.6,-0.5);
  mesh(box(2.6,0.06,1.2), M(0x3B3270,{roughness:0.5}), 0,1.1,0, desk);
  mesh(box(2.6,0.1,0.06), WOOD2, 0,1.02,0.57, desk, false);
  [[-1.1,0.45],[1.1,0.45],[-1.1,-0.45],[1.1,-0.45]].forEach(function(p){ mesh(cyl(0.025,0.025,1.1), METAL, p[0],0.55,p[1], desk); });
  mesh(box(2.2,0.04,0.9), M(0x2A2450), 0,0.3,0, desk, false); // shelf under
  mesh(box(0.5,0.3,0.4), BLACK, -0.8,0.5,0, desk); // PC tower on the shelf
  var pcLed = mesh(new THREE.PlaneGeometry(0.2,0.02), new THREE.MeshBasicMaterial({color:BLUE}), -0.8,0.6,0.201, desk, false);
  // monitor
  var monArm = mesh(cyl(0.03,0.03,0.5,8), METAL, 0,1.35,-0.3, desk, false); mesh(box(0.4,0.02,0.3), METAL, 0,1.14,-0.3, desk, false);
  var mon = group(0,1.85,-0.2,0,desk); mon.rotation.x = -0.06;
  mesh(box(1.9,1.045,0.06), M(0x100C24,{roughness:0.3}), 0,0,-0.04, mon);
  var screenCanvas = document.createElement('canvas'); screenCanvas.width = 1024; screenCanvas.height = 538; var sx = screenCanvas.getContext('2d');
  var screenTex = new THREE.CanvasTexture(screenCanvas); screenTex.minFilter = THREE.LinearFilter;
  var screen = mesh(new THREE.PlaneGeometry(1.8,0.945), new THREE.MeshBasicMaterial({map:screenTex}), 0,0,0, mon, false);
  var screenGlow = new THREE.PointLight(SKY, 1.0, 5); screenGlow.position.set(0,0,0.7); mon.add(screenGlow);
  var clips = []; for(var c=0;c<22;c++){ clips.push({track:c%4, x:(c*97)%860, w:60+((c*53)%140), col:[ '#2B4BFF','#FF5E4D','#D9F55B','#BFE3FF','#DCCFFF'][c%5]}); }
  var wave = []; for(var w=0;w<200;w++){ wave.push(0.2+Math.abs(Math.sin(w*0.3)*Math.cos(w*0.07))*0.8); }
  function drawScreen(t){
    var W=1024, H=538; sx.fillStyle = '#0E0E1A'; sx.fillRect(0,0,W,H);
    // top bar
    sx.fillStyle = '#1A1538'; sx.fillRect(0,0,W,38); sx.fillStyle = '#F6F3EC'; sx.font = '600 16px "Albert Sans", system-ui, sans-serif'; sx.fillText('regional-campaign_v6.prproj', 22, 25);
    sx.fillStyle = '#D9F55B'; sx.beginPath(); sx.arc(W-30,19,6,0,Math.PI*2); sx.fill();
    // preview window: a lilac set with a figure silhouette
    sx.fillStyle = '#1E1745'; sx.fillRect(22,56,600,270);
    var g = sx.createLinearGradient(0,56,0,326); g.addColorStop(0,'#DCCFFF'); g.addColorStop(1,'#B9A6F0'); sx.fillStyle = g; sx.fillRect(40,70,564,242);
    sx.fillStyle = '#0E0E1A'; sx.beginPath(); sx.arc(322,170,34,0,Math.PI*2); sx.fill(); sx.beginPath(); sx.moveTo(262,312); sx.quadraticCurveTo(262,215,322,212); sx.quadraticCurveTo(382,215,382,312); sx.fill();
    sx.fillStyle = 'rgba(14,14,26,.7)'; sx.fillRect(40,284,564,28); sx.fillStyle = '#F6F3EC'; sx.font = '500 13px "Albert Sans", system-ui, sans-serif'; sx.fillText('00:00:' + ('0'+Math.floor(t%60)).slice(-2) + ':' + ('0'+Math.floor((t*24)%24)).slice(-2) + '   ·   9:16   ·   1080 × 1920', 52, 303);
    // inspector
    sx.fillStyle = '#1A1538'; sx.fillRect(640,56,362,270); sx.fillStyle = '#BFE3FF'; sx.font = '600 12px "Albert Sans", system-ui, sans-serif'; sx.fillText('EFFECT CONTROLS', 660, 80);
    var rows = ['Scale','Position','Opacity','Speed','Captions','Audio gain']; rows.forEach(function(rw,i){ sx.fillStyle = '#F6F3EC'; sx.font = '400 13px "Albert Sans", system-ui, sans-serif'; sx.fillText(rw, 660, 112+i*34); sx.fillStyle = '#2E2566'; sx.fillRect(780,102+i*34,200,8); sx.fillStyle = ['#2B4BFF','#FF5E4D','#D9F55B','#BFE3FF','#DCCFFF','#F6F3EC'][i]; sx.fillRect(780,102+i*34,60+((i*71)%130),8); });
    // timeline
    sx.fillStyle = '#15113A'; sx.fillRect(22,344,980,176);
    sx.fillStyle = '#5E5B6B'; sx.font = '400 11px "Albert Sans", system-ui, sans-serif'; for(var m=0;m<10;m++){ sx.fillRect(120+m*88,350,1,8); sx.fillText('00:'+('0'+m*5).slice(-2), 112+m*88, 372); }
    sx.fillStyle = '#F6F3EC'; sx.font = '500 11px "Albert Sans", system-ui, sans-serif'; ['V2','V1','A1','A2'].forEach(function(l,i){ sx.fillText(l, 34, 400+i*32); sx.fillStyle = '#1A1538'; sx.fillRect(60,386+i*32,930,26); sx.fillStyle = '#F6F3EC'; });
    clips.forEach(function(c){ sx.fillStyle = c.col; sx.fillRect(120+c.x, 388+c.track*32, c.w, 22); });
    for(var i2=0;i2<200;i2++){ var hgt = wave[(i2+Math.floor(t*10))%200]*10; sx.fillStyle = 'rgba(14,14,26,.55)'; sx.fillRect(120+i2*4.3, 463-hgt, 2, hgt*2); sx.fillRect(120+i2*4.3, 495-hgt*0.8, 2, hgt*1.6); }
    var ph = 120 + ((t*22) % 860); sx.fillStyle = '#FF5E4D'; sx.fillRect(ph,350,2,168); sx.beginPath(); sx.moveTo(ph-6,350); sx.lineTo(ph+8,350); sx.lineTo(ph+1,360); sx.fill();
    screenTex.needsUpdate = true;
  }
  drawScreen(0);
  // laptop, keyboard, mouse, speakers, lamp, mug, notebook, headphones
  var lap = group(-0.95,1.13,0.2,0.35,desk); mesh(box(0.56,0.02,0.38), M(0xD2CCE6,{roughness:0.35,metalness:0.3}), 0,0,0, lap); var lid = mesh(box(0.56,0.36,0.015), M(0xD2CCE6,{roughness:0.35,metalness:0.3}), 0,0.17,-0.19, lap); lid.rotation.x = -0.25; mesh(new THREE.PlaneGeometry(0.5,0.3), new THREE.MeshBasicMaterial({color:0x1E1745}), 0,0,0.009, lid, false);
  mesh(box(0.7,0.025,0.22), M(0xD2CCE6,{roughness:0.5}), 0.05,1.14,0.32, desk, false); for(var kx=0;kx<10;kx++) for(var ky=0;ky<3;ky++){ mesh(box(0.05,0.012,0.05), BLACK, -0.25+kx*0.06,1.16,0.25+ky*0.06, desk, false); }
  mesh(new THREE.SphereGeometry(0.05,12,8), M(0xD2CCE6,{roughness:0.4}), 0.55,1.15,0.35, desk, false).scale.set(1,0.6,1.4);
  [-1.2,1.2].forEach(function(x){ mesh(box(0.16,0.3,0.16), BLACK, x,1.28,-0.35, desk); mesh(new THREE.CircleGeometry(0.05,16), M(0x3B3270), x,1.3,-0.27, desk, false); });
  var lamp = group(1.0,1.13,-0.3,0,desk); mesh(cyl(0.1,0.1,0.02,16), DARKMETAL, 0,0,0, lamp); var lampArm = mesh(cyl(0.012,0.012,0.6,6), METAL, 0,0.3,0, lamp, false); var lampArm2 = mesh(cyl(0.012,0.012,0.5,6), METAL, -0.15,0.7,0.1, lamp, false); lampArm2.rotation.z = 0.6; lampArm2.rotation.x = -0.4; var lampHead = mesh(cyl(0.02,0.1,0.18,16,1,true), M(0xFF5E4D,{roughness:0.6, side:THREE.DoubleSide}), -0.34,0.84,0.22, lamp, false); lampHead.rotation.z = 0.9; lampHead.rotation.x = 0.4;
  var mug = mesh(cyl(0.05,0.045,0.11,16), M(CORAL,{roughness:0.5}), 0.6,1.19,0.0, desk); mesh(new THREE.TorusGeometry(0.035,0.008,8,16), M(CORAL,{roughness:0.5}), 0.66,1.19,0, desk, false);
  var steam = mesh(new THREE.PlaneGeometry(0.08,0.14), new THREE.MeshBasicMaterial({color:0xFFF6EA, transparent:true, opacity:0.12, side:THREE.DoubleSide}), 0.6,1.32,0, desk, false);
  mesh(box(0.22,0.02,0.3), M(0xF6F3EC,{roughness:1}), -0.4,1.14,0.42, desk, false); mesh(box(0.012,0.012,0.16), M(BLUE), -0.3,1.16,0.4, desk, false);
  var hp = group(1.25,1.52,0.0,0,desk); mesh(new THREE.TorusGeometry(0.11,0.015,8,24,Math.PI), BLACK, 0,0,0, hp, false); [[-0.11,-0.02],[0.11,-0.02]].forEach(function(p){ mesh(cyl(0.05,0.05,0.04,16), BLACK, p[0],p[1],0, hp, false).rotation.z = Math.PI/2; }); mesh(cyl(0.012,0.012,0.4,6), METAL, 0,-0.1,-0.1, hp, false); // hook post is the headphone stand
  // chair
  var chair = group(3.6,0,-1.2,-0.9);
  mesh(cyl(0.03,0.03,0.42,8), METAL, 0,0.5,0, chair); for(var c5=0;c5<5;c5++){ var ca = c5/5*Math.PI*2; var arm = mesh(box(0.34,0.03,0.04), DARKMETAL, Math.sin(ca)*0.17,0.06,Math.cos(ca)*0.17, chair, false); arm.rotation.y = ca; var wheel = mesh(cyl(0.03,0.03,0.03,10), BLACK, Math.sin(ca)*0.34,0.03,Math.cos(ca)*0.34, chair, false); wheel.rotation.z = Math.PI/2; wheel.rotation.y = ca; }
  mesh(box(0.48,0.08,0.46), FABRIC, 0,0.74,0, chair); var back = mesh(box(0.46,0.56,0.07), FABRIC, 0,1.1,-0.22, chair); back.rotation.x = -0.12; [-0.26,0.26].forEach(function(x){ mesh(box(0.04,0.22,0.3), BLACK, x,0.9,0.02, chair, false); });

  /* ---- director's chair, apple boxes, clapperboard, cases, tape ---- */
  var dc = group(-4.4,0,1.0,0.7);
  [[-0.25,0.25],[0.25,0.25],[-0.25,-0.25],[0.25,-0.25]].forEach(function(p,i){ var l = mesh(box(0.04,1.1,0.04), WOOD, p[0],0.55,p[1], dc); l.rotation.z = (p[0]<0?1:-1)*0.1; }); mesh(box(0.5,0.02,0.5), M(0x0E0E1A,{roughness:1}), 0,0.7,0, dc); mesh(box(0.56,0.28,0.02), M(LIME,{roughness:1}), 0,1.25,-0.27, dc); mesh(box(0.56,0.06,0.02), M(0x0E0E1A,{roughness:1}), 0,1.25,-0.265, dc, false);
  var ab1 = mesh(box(0.9,0.35,0.6), WOOD, -0.6,0.175,-1.6); ab1.rotation.y=0.3; var ab2 = mesh(box(0.9,0.35,0.6), WOOD2, -0.6,0.525,-1.6); ab2.rotation.y=0.55;
  var clap = group(-0.6,0.72,-1.6,0.55); clap.rotation.x=-0.1; mesh(box(0.5,0.4,0.02), BLACK, 0,0,0, clap); var sticks = group(-0.25,0.2,0.012,0,clap); for(var k=0;k<5;k++){ var st = mesh(new THREE.PlaneGeometry(0.1,0.08), new THREE.MeshBasicMaterial({color:k%2?CREAM:INK}), 0.05+k*0.1,0.04,0, sticks, false); st.rotation.z=0.5; }
  [[0.08,0.14],[0.08,0.06],[0.08,-0.02]].forEach(function(p){ mesh(new THREE.PlaneGeometry(0.3,0.02), new THREE.MeshBasicMaterial({color:CREAM}), p[0],p[1]-0.1,0.012, clap, false); });
  var tape = mesh(cyl(0.07,0.07,0.05,20), M(0x1A1538), -0.95,0.725,-1.75); tape.rotation.x = Math.PI/2; var tape2 = mesh(cyl(0.07,0.07,0.05,20), M(CORAL), -0.9,0.76,-1.3);
  var cases = group(-5.6,0,0.4,-0.3); mesh(box(0.9,0.4,0.6), M(0x1A1538,{roughness:0.7}), 0,0.2,0, cases); mesh(box(0.86,0.36,0.56), M(0x241C4F,{roughness:0.7}), 0,0.58,0, cases); mesh(box(0.7,0.3,0.5), M(CORAL,{roughness:0.7}), 0.05,0.91,0.02, cases); [[-0.3,0.2],[0.3,0.2],[-0.3,0.58],[0.3,0.58]].forEach(function(p){ mesh(box(0.1,0.08,0.03), BLACK, p[0],p[1],0.31, cases, false); });
  // ladder against the wall, plant, fan
  var lad = group(6.3,0,-4.5,-0.3); lad.rotation.x = -0.18; [-0.25,0.25].forEach(function(x){ mesh(box(0.05,3.2,0.05), METAL, x,1.6,0, lad); }); for(var rg=0;rg<7;rg++){ mesh(cyl(0.018,0.018,0.5,6), METAL, 0,0.35+rg*0.42,0, lad, false).rotation.z = Math.PI/2; }
  var pot = group(5.6,0,-4.1); mesh(cyl(0.22,0.17,0.4,16), M(0xC9B48A,{roughness:1}), 0,0.2,0, pot); mesh(cyl(0.02,0.03,0.9,6), M(0x3B2F1E), 0,0.8,0, pot, false); for(var lf=0;lf<9;lf++){ var leaf = mesh(new THREE.SphereGeometry(0.16,8,6), M(0x2E6B4A,{roughness:1}), Math.sin(lf*0.7)*0.3,1.1+Math.sin(lf*1.3)*0.25,Math.cos(lf*0.7)*0.3, pot); leaf.scale.set(1,0.5,1.4); leaf.rotation.y = lf*0.7; }
  var fan = group(-3.9,0,-3.6,0.6); mesh(cyl(0.3,0.3,0.03,20), BLACK, 0,0.015,0, fan); mesh(cyl(0.025,0.025,1.0,8), METAL, 0,0.5,0, fan); var fanHead = group(0,1.05,0,0,fan); mesh(new THREE.TorusGeometry(0.32,0.02,8,32), METAL, 0,0,0, fanHead, false); var blades = group(0,0,0.02,0,fanHead); for(var bl=0;bl<3;bl++){ var b = mesh(box(0.1,0.26,0.01), M(0xD2CCE6,{roughness:0.5}), 0,0.15,0, blades, false); b.rotation.z = bl*2.09; var bb = group(0,0,0,0,blades); bb.rotation.z = bl*2.09; blades.remove(b); bb.add(b); }
  // wall: whiteboard with sticky notes and a chart, clock, shelf, neon sign
  var board = mesh(new THREE.PlaneGeometry(2.6,1.5), M(0xFBF8F1,{roughness:0.9}), -3.2,2.2,-4.95, null, false); mesh(box(2.7,1.6,0.03), M(0x8E89A8,{metalness:0.6,roughness:0.4}), -3.2,2.2,-4.97, null, false); mesh(box(2.6,0.04,0.08), M(0x8E89A8,{metalness:0.6,roughness:0.4}), -3.2,1.43,-4.92, null, false);
  (function(){ var pts = [], col = new THREE.LineBasicMaterial({color:BLUE}); for(var i=0;i<=8;i++){ pts.push(new THREE.Vector3(-4.3+i*0.26, 1.7 + Math.pow(i/8,2)*0.9 + Math.sin(i)*0.05, -4.94)); } scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), col)); var ax = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4.3,1.65,-4.94),new THREE.Vector3(-2.1,1.65,-4.94),new THREE.Vector3(-4.3,1.65,-4.94),new THREE.Vector3(-4.3,2.8,-4.94)]), new THREE.LineBasicMaterial({color:0x140F2D})); scene.add(ax); })();
  [[-2.8,2.75,LIME],[-2.5,2.6,CORAL],[-2.8,2.4,SKY],[-2.45,2.25,LILAC],[-2.3,2.7,LIME],[-2.55,1.95,CORAL]].forEach(function(n,i){ var s = mesh(new THREE.PlaneGeometry(0.22,0.22), new THREE.MeshBasicMaterial({color:n[2]}), n[0],n[1],-4.93, null, false); s.rotation.z = (i%2?1:-1)*0.08; mesh(new THREE.PlaneGeometry(0.14,0.012), new THREE.MeshBasicMaterial({color:INK}), 0,0.03,0.001, s, false); mesh(new THREE.PlaneGeometry(0.1,0.012), new THREE.MeshBasicMaterial({color:INK}), -0.02,-0.02,0.001, s, false); });
  mesh(new THREE.PlaneGeometry(0.9,0.08), new THREE.MeshBasicMaterial({color:INK}), -3.8,2.78,-4.94, null, false); mesh(new THREE.PlaneGeometry(0.6,0.05), new THREE.MeshBasicMaterial({color:CORAL}), -3.95,2.62,-4.94, null, false);
  var clock = group(5.6,3.5,-4.95); mesh(new THREE.CircleGeometry(0.3,32), M(0xFBF8F1,{roughness:0.9}), 0,0,0, clock, false); mesh(new THREE.TorusGeometry(0.3,0.02,8,32), BLACK, 0,0,0, clock, false); var hH = mesh(new THREE.PlaneGeometry(0.02,0.16), new THREE.MeshBasicMaterial({color:INK}), 0,0,0.005, clock, false); hH.geometry.translate(0,0.07,0); var hM = mesh(new THREE.PlaneGeometry(0.015,0.24), new THREE.MeshBasicMaterial({color:INK}), 0,0,0.006, clock, false); hM.geometry.translate(0,0.11,0); var hS = mesh(new THREE.PlaneGeometry(0.008,0.26), new THREE.MeshBasicMaterial({color:CORAL}), 0,0,0.007, clock, false); hS.geometry.translate(0,0.1,0);
  var shelf = group(5.0,2.2,-4.85); mesh(box(2.0,0.05,0.3), WOOD2, 0,0,0, shelf); [-0.9,0.9].forEach(function(x){ mesh(box(0.04,0.3,0.26), METAL, x,-0.17,0, shelf, false); });
  [[-0.8,0x2B4BFF,0.09,0.42],[-0.69,0xFF5E4D,0.07,0.38],[-0.6,0xDCCFFF,0.08,0.4],[-0.5,0x0E0E1A,0.06,0.36],[-0.43,0xD9F55B,0.05,0.3]].forEach(function(bk){ mesh(box(bk[2],bk[3],0.26), M(bk[1],{roughness:1}), bk[0],bk[3]/2+0.025,0, shelf); });
  mesh(box(0.34,0.26,0.24), BLACK, 0.1,0.16,0, shelf); mesh(cyl(0.08,0.08,0.18,16), BLACK, 0.5,0.12,0.02, shelf).rotation.x = Math.PI/2; mesh(cyl(0.05,0.05,0.2,16), M(0xD2CCE6,{roughness:0.3,metalness:0.4}), 0.72,0.125,0.02, shelf).rotation.x = Math.PI/2; var award = mesh(cyl(0.02,0.06,0.3,12), M(0xE3C56A,{metalness:0.8,roughness:0.3}), 0.9,0.18,0, shelf);
  function textTex(text, fg, w, h, font){ var c = document.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d'); x.fillStyle = fg; x.font = font; x.textAlign='center'; x.textBaseline='middle'; x.fillText(text, w/2, h/2); var t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter; return t; }
  var neonMat = new THREE.MeshBasicMaterial({map:textTex('on air', '#FF5E4D', 1024, 256, 'italic 300 190px "Fraunces", Georgia, serif'), transparent:true});
  var neon = mesh(new THREE.PlaneGeometry(2.2,0.55), neonMat, 3.4,3.9,-4.9, null, false);
  var neonTube = mesh(new THREE.TorusGeometry(1.25,0.018,8,48), new THREE.MeshBasicMaterial({color:CORAL}), 3.4,3.9,-4.92, null, false); neonTube.scale.set(1,0.3,1);
  // haze
  var hz = (function(n){ var g = new THREE.BufferGeometry(), p = new Float32Array(n*3); for(var i=0;i<n;i++){ p[i*3]=(Math.random()-.5)*16; p[i*3+1]=Math.random()*6; p[i*3+2]=(Math.random()-.5)*12; } g.setAttribute('position', new THREE.BufferAttribute(p,3)); var pts = new THREE.Points(g, new THREE.PointsMaterial({color:WARM, size:0.022, transparent:true, opacity:0.5, blending:THREE.AdditiveBlending, depthWrite:false})); scene.add(pts); return pts; })(phone?220:420);

  /* ---- motion ---- */
  var frame = 0;
  function update(t, dt){
    frame++;
    if(reduced) return;
    var a = hz.geometry.attributes.position; for(var i=0;i<a.count;i++){ var y = a.getY(i) + dt*0.1*(0.5+((i*7)%10)/10); if(y>6) y = 0; a.setY(i, y); a.setX(i, a.getX(i)+Math.sin(y*2+i)*dt*0.05); } a.needsUpdate = true;
    key.intensity = 1.7 + Math.sin(t*1.7)*0.06; ringMat.emissiveIntensity = 1.3 + Math.sin(t*2.3)*0.12;
    rec.material.color.setHex(Math.sin(t*4)>0?CORAL:0x5A1F19); stripLed.material.color.setHex(Math.sin(t*2.5)>0?CORAL:0x5A1F19);
    neonMat.opacity = 0.85 + (Math.sin(t*9)>0.95?-0.5:0) + Math.sin(t*1.3)*0.1; neonTube.material.opacity = neonMat.opacity;
    var hue = (t*0.03)%1; tubeMat.emissive.setHSL(0.72 + Math.sin(t*0.2)*0.08, 0.6, 0.78); 
    blades.rotation.z = t*9; fanHead.rotation.y = Math.sin(t*0.5)*0.6;
    hS.rotation.z = -(t%60)/60*Math.PI*2; hM.rotation.z = -((t/60)%60)/60*Math.PI*2; hH.rotation.z = -1.9;
    steam.position.y = 1.32 + ((t*0.15)%0.2); steam.material.opacity = 0.14 - ((t*0.15)%0.2)*0.6; steam.lookAt(opts.cam.position);
    chair.rotation.y = -0.9 + Math.sin(t*0.3)*0.05;
    gim.children[gim.children.length-1].rotation.z = Math.sin(t*0.7)*0.06;
    if(frame%(phone?12:6)===0) drawScreen(t);
  }
  var hotspots = [
    {p:[-2.2,3.0,0.4], t:'Brand films', d:'15+ campus events and NIAT brand films, produced end to end.'},
    {p:[1.8,3.6,-1.2], t:'Creator campaigns', d:'Regional creator-led campaign: 6M+ views in two months.'},
    {p:[3.4,2.8,-2.6], t:'Student Creator Program', d:'15+ creators, 200+ UGC videos, 500K+ views.'},
    {p:[1.6,3.3,-2.2], t:'On camera', d:'Hosting, interviews, and a Short that hit 2M views in a day.'},
    {p:[-3.2,3.2,-4.6], t:'Strategy', d:'L’Oréal Luxe Takami launch plan; 60+ brands in Singapore.'}
  ];
  return { hotspots: hotspots, update: update };
}

function startScenes(){
  if(!window.THREE){ return; }
  var loader = new THREE.TextureLoader();
  /* One atlas of 24 frames (6 reels x 4 moments) feeds the creator wall, so 54 tiles share a single texture. */
  var wallAtlas = loader.load('media/wall-atlas.webp'); wallAtlas.minFilter = THREE.LinearFilter;
  var ATLAS_COLS = 6, ATLAS_ROWS = 4;
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

  /* Studio hero: a detailed film set built from primitives (see buildStudioSet above). */
  (function(){
    var el = document.getElementById('top'), canvas = document.getElementById('c-studio');
    var r = makeRenderer(canvas), scene = new THREE.Scene();
    r.outputEncoding = THREE.sRGBEncoding;
    var cam = new THREE.PerspectiveCamera(40, 1, .1, 80);
    var set = buildStudioSet(THREE, scene, r, {reduced:reduced, phone:el.clientWidth < el.clientHeight, cam:cam});
    var spots = set.hotspots.map(function(h){ var m = new THREE.Mesh(new THREE.SphereGeometry(0.13,16,16), new THREE.MeshBasicMaterial({color:SUN})); m.position.fromArray(h.p); m.userData=h; scene.add(m); var halo = new THREE.Mesh(new THREE.RingGeometry(0.2,0.24,32), new THREE.MeshBasicMaterial({color:SUN, transparent:true, opacity:0.6, side:THREE.DoubleSide})); m.add(halo); m.userData.halo = halo; return m; });
    var card = document.getElementById('studio-card'), ct = document.getElementById('studio-t'), cd = document.getElementById('studio-d'), status = document.getElementById('studio-status');
    var yaw = 0.35, pitch = 0.22, ray = new THREE.Raycaster(), hover=null, t=0;
    function pick(e){ ray.setFromCamera(ndc(el,e), cam); var h = ray.intersectObjects(spots); return h.length?h[0].object:null; }
    drag(el, function(dx,dy,e,isDrag){ if(isDrag){ yaw -= dx*0.005; pitch = Math.max(0.05, Math.min(0.9, pitch + dy*0.004)); } else { hover = pick(e); el.style.cursor = hover?'pointer':'grab'; } },
      function(e){ var h = pick(e); if(h){ ct.textContent=h.userData.t; cd.textContent=h.userData.d; card.hidden=false; status.textContent = h.userData.t; } else { card.hidden=true; status.textContent='5 areas · scroll ↓'; } });
    scenes.studio = { el:el, visible:true, render:function(dt){
      fit(r, cam, el); t+=dt;
      var sy = reduced ? 0 : Math.min(1, window.scrollY/Math.max(1, el.clientHeight));
      var wide = el.clientWidth/el.clientHeight;
      var dist = wide<1 ? 13 : 10.5;
      var ry = (reduced?yaw:yaw+Math.sin(t*0.13)*0.08) + sy*0.6;
      var bob = reduced?0:Math.sin(t*0.5)*0.08;
      cam.position.set(Math.sin(ry)*dist + (wide<1?0:-3.2), 2.3+pitch*5 + sy*2.5 + bob, Math.cos(ry)*dist); cam.lookAt(wide<1?0:-2.4, wide<1?3.4:1.7, -1);
      set.update(t, dt);
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
    // one caption per reel, matched to the frame on the tile
    var creators = [
      ['Siddhant Naik','Regional creator-led campaign · comedy'],['Sahil Gaikwad','Regional creator-led campaign · lifestyle'],['Aditya Dere','Regional creator-led campaign · campus life'],
      ['Mh19_Comedian','Regional creator-led campaign · regional comedy'],['Gauravmalode5','Regional creator-led campaign · vlog'],['College ka senior','Regional creator-led campaign · campus comedy']
    ];
    var barCols = [ACCENT, SUN, 0xBFE3FF, 0xDCCFFF, 0x2B4BFF];
    var COLS = 9, ROWS = 6, GAPX = 1.55, GAPY = 2.45, wall = new THREE.Group(); scene.add(wall);
    wall.position.x = 1.6;
    // rounded phone tiles: a shape geometry with its UVs pointed at one atlas cell
    function roundedRect(w, h, rad){ var s = new THREE.Shape(), x = -w/2, y = -h/2; s.moveTo(x+rad, y); s.lineTo(x+w-rad, y); s.quadraticCurveTo(x+w, y, x+w, y+rad); s.lineTo(x+w, y+h-rad); s.quadraticCurveTo(x+w, y+h, x+w-rad, y+h); s.lineTo(x+rad, y+h); s.quadraticCurveTo(x, y+h, x, y+h-rad); s.lineTo(x, y+rad); s.quadraticCurveTo(x, y, x+rad, y); return s; }
    function tileGeom(w, h, rad, cell){ var g = new THREE.ShapeGeometry(roundedRect(w, h, rad), 6); if(cell !== undefined){ var cx = cell % ATLAS_COLS, cy = Math.floor(cell / ATLAS_COLS), uv = g.attributes.uv, pos = g.attributes.position; for(var i=0;i<uv.count;i++){ uv.setXY(i, (cx + (pos.getX(i)/w + 0.5)) / ATLAS_COLS, 1 - (cy + 1 - (pos.getY(i)/h + 0.5)) / ATLAS_ROWS); } uv.needsUpdate = true; } return g; }
    var cellGeoms = []; for(var c=0;c<ATLAS_COLS*ATLAS_ROWS;c++){ cellGeoms.push(tileGeom(1.25, 2.2, 0.2, c)); }
    var bg = tileGeom(1.37, 2.32, 0.24);
    var tints = [0xFFFFFF, 0xE9E2FF, 0xDDEBFF, 0xFFF1EC, 0xF2F7DE];
    var tiles = [], n=0;
    for(var y=0;y<ROWS;y++) for(var x=0;x<COLS;x++){
      var g = new THREE.Group();
      var b = new THREE.Mesh(bg, new THREE.MeshBasicMaterial({color:0x1F1848})); b.position.z=-0.01; g.add(b);
      var cell = (x + y*4 + Math.floor(y/2)) % (ATLAS_COLS*ATLAS_ROWS); // 24 frames over 54 tiles, no two neighbours alike
      var m = new THREE.Mesh(cellGeoms[cell], new THREE.MeshBasicMaterial({map:wallAtlas, color:tints[(x*2+y)%tints.length], transparent:true, opacity:0.55+((x+y)%3)*0.15})); g.add(m);
      var bar = new THREE.Mesh(new THREE.PlaneGeometry(0.9,0.07), new THREE.MeshBasicMaterial({color:barCols[(x+y)%barCols.length]})); bar.position.set(0,-0.95,0.01); bar.scale.x = 0.3+((x*5+y*3)%7)/10; g.add(bar);
      g.position.set((x-(COLS-1)/2)*GAPX, (y-(ROWS-1)/2)*GAPY + (x%2)*1.1, 0);
      g.userData = { base: g.position.clone(), c: creators[cell % ATLAS_COLS], mesh:m }; n++;
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
