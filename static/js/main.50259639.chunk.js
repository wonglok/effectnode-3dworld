(this["webpackJsonpeffectnode-3dworld-example"]=this["webpackJsonpeffectnode-3dworld-example"]||[]).push([[0],{42:function(e,t,n){e.exports=n(56)},43:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);n(43);var o=n(6),r=n.n(o),a=n(35),i=n.n(a),c=n(12),s=n(61),l=n(64),u=n(8),v=n(14),f=n.n(v),d=n(19),m=n(2),p=n(1),g=n(10),x=n(0),y=n(63),h=n(36),w=n(37),b=n(38),z=n(62),D=n(16),T=function(){return"_"+Math.random().toString(36).substr(2,9)+Math.random().toString(36).substr(2,9)},E=function e(t){var n=this,o=t.parent,r=void 0!==o&&o;Object(p.a)(this,e),this.parent=r,this.resource=new Map,this.get=function(e){return new Promise((function(t){var o=0;o=setInterval((function(){n.parent?(n.resource.has(e)||n.parent.resource.has(e))&&(clearInterval(o),t(n.resource.get(e)||n.parent.resource.get(e))):n.resource.has(e)&&(clearInterval(o),t(n.resource.get(e)))}))}))},this.set=function(e,t){n.resource.set(e,t)},this.name="ENMini";var a=!1;this.tasks=[],this.resizeTasks=[],this.cleanTasks=[],this.onLoop=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;t>=0?n.tasks.push(e):n.tasks.unshift(e)},this.onResize=function(e){e(),n.resizeTasks.push(e)},this.onClean=function(e){n.cleanTasks.push(e)};var i=0;window.addEventListener("resize",(function(){clearTimeout(i),i=setTimeout((function(){n.resizeTasks.forEach((function(e){return e()}))}),16.8888)}));var c=!1;this.toggle=function(){c=!c},this.pause=function(){c=!0},this.play=function(){c=!1},this.clean=function(){a=!0;try{n.cleanTasks.forEach((function(e){return e()}))}catch(e){console.error(e)}},this.lastTime=window.performance.now(),this.work=function(){if(n.timeNow=window.performance.now(),a)return{name:n.name,duration:0};if(c)return{name:n.name,duration:0};var e=window.performance.now();try{var t=n.timeNow,o=n.lastTime,r=t-o;n.lastTime=t,t/=1e3,(r/=1e3)>=100&&(r=100),n.tasks.forEach((function(e){return e(t,r)}))}catch(s){console.error(s)}var i=window.performance.now()-e;return{name:n.name,duration:i}},this.ready=new Proxy({},{get:function(e,t){return n.get(t)}}),this.now=new Proxy({},{get:function(e,t){return n.parent?n.resource.get(t)||n.parent.resource.get(t):n.resource.get(t)}})};function P(){var e=Object(c.d)().get,t=Object(o.useState)((function(){return new E({})})),n=Object(g.a)(t,1)[0];return Object(o.useEffect)((function(){return function(){n.clean()}}),[]),Object(c.b)((function(){var t=e();for(var o in t)n.set(o,t[o]);n.work()})),{mini:n}}var k=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{passive:!1},r=arguments.length>3?arguments[3]:void 0;Object(o.useEffect)((function(){return(r=r||window).addEventListener(e,t,n),function(){(r=r||window).removeEventListener(e,t)}}),[])},S=function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{passive:!1};return(e=e||window).addEventListener(t,n,o),function(){(e=e||window).removeEventListener(t,n)}},M=function(){function e(t){var n=t.floor,o=t.scene;Object(p.a)(this,e),this.floor=n,this.center=new x.Vector2(0,0),this.raycaster=new x.Raycaster,this.scene=o;var r=this.makeCollider();this.collider=r,this.preview=r}return Object(m.a)(e,[{key:"makeCollider",value:function(){var e=this.scene,t=this.floor,o=n(52).BufferGeometryUtils,r=n(33).SkeletonUtils.clone(t),a=[];r.updateMatrixWorld(),r.traverse((function(e){if(e.geometry&&!e.userData.isNotFloor){var t=e.geometry.clone();for(var n in t.applyMatrix4(e.matrixWorld),t.attributes)"position"===n||"index"===n||t.deleteAttribute(n);a.push(t)}})),e.traverse((function(e){if(e&&e.userData&&e.userData.isFloor&&e.geometry){var t=e.geometry.clone();for(var n in e.updateMatrixWorld(),t.applyMatrix4(e.matrixWorld),t.attributes)"position"!==n&&t.deleteAttribute(n);a.push(t)}}));var i=o.mergeBufferGeometries(a,!1);i.boundsTree=new y.a(i);var c=new x.Mesh(i,new x.MeshBasicMaterial({color:16777215}));return c.material.wireframe=!0,c.material.opacity=.5,c.material.transparent=!0,c.updateMatrixWorld(),c}},{key:"scanCenter",value:function(e){var t=e.camera,n=e.scene,o=this.raycaster,r=this.center,a=this.collider;o.setFromCamera(r,t);var i=[],c=[];n.traverse((function(e){e.geometry&&e.userData.isHoverable&&c.push(e)})),o.intersectObjects(c,!1,i),a.geometry.boundsTree.raycastFirst(a,o,o.ray);var s=i[0];return s||!1}}]),e}(),C=function e(t){var o=t.collider,r=t.startAt,a=t.Now;Object(p.a)(this,e),a.avatarAt.copy(r),a.goingTo.copy(r),this.collider=o;var i=n(53).RoundedBoxGeometry,c=new x.Mesh(new i(1,2,1,8,1.3),new x.MeshLambertMaterial({transparent:!0,opacity:1}));c.geometry.translate(0,-1.3,0),c.castShadow=!0,c.capsuleInfo={radius:1.3,segment:new x.Line3(new x.Vector3,new x.Vector3(0,-1,0))},this.player=c,c.position.copy(r),c.position.y+=5,c.geometry.computeBoundingBox(),c.collider=(new x.Box3).copy(c.geometry.boundingBox);var s=new x.Vector3,l=new x.Vector3(0,0,0),u=new x.Vector3,v=new x.Vector3,f=new x.Box3,d=new x.Matrix4,m=new x.Line3,g=new x.Object3D;function y(e){var t=e.delta,n=e.player;l.y+=-9.8*t,n.position.addScaledVector(l,t),n.position.y<=-50&&(n.position.copy(r),a.goingTo.copy(r),a.goingTo.z+=1,l.y=0),s.copy(a.goingTo).sub(n.position),s.y=0;var i=s.length();s.normalize(),s.y=0,s.multiplyScalar(a.avatarSpeed),i>=.1?(n.position.addScaledVector(s,.04),a.avatarMode="running"):a.avatarMode="standing",n.updateMatrixWorld();var c=n.capsuleInfo;f.makeEmpty(),d.copy(o.matrixWorld).invert(),m.copy(c.segment),m.start.applyMatrix4(n.matrixWorld).applyMatrix4(d),m.end.applyMatrix4(n.matrixWorld).applyMatrix4(d),f.expandByPoint(m.start),f.expandByPoint(m.end),f.min.addScalar(-c.radius),f.max.addScalar(c.radius),o.geometry.boundsTree.shapecast(o,{intersectsBounds:function(e){return e.intersectsBox(f)},intersectsTriangle:function(e){var t=u,n=v,o=e.closestPointToSegment(m,t,n);if(o<c.radius){var r=c.radius-o,a=n.sub(t).normalize();m.start.addScaledVector(a,r),m.end.addScaledVector(a,r)}}});var p=u;p.copy(m.start).applyMatrix4(o.matrixWorld);var x=v;x.subVectors(p,n.position),n.position.copy(p),a.avatarAt.copy(n.position),g.position.copy(n.position),g.lookAt(a.goingTo.x,n.position.y,a.goingTo.z),a.avatarRot.x=g.rotation.x,a.avatarRot.y=g.rotation.y,a.avatarRot.z=g.rotation.z,x.y>Math.abs(t*l.y*.25)?l.set(0,0,0):(x.normalize(),l.addScaledVector(x,-x.dot(l)))}var h=new x.Clock;this.onSimulate=function(){var e=h.getDelta();e>=1/30&&(e=1/30);for(var t=0;t<4;t++)y({delta:e/4,player:c})}},O=function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=T(),n={exportJSON:function(){return JSON.parse(JSON.stringify(e))},getNameSpcaeID:function(){return t},onEvent:function(n,o){var r="".concat(t),a=function(){o(e[n])};return window.addEventListener("".concat(r,"-").concat(n),a),function(){window.removeEventListener("".concat(r,"-").concat(n),a)}},makeKeyReactive:function(e){var n=Object(o.useState)(0),r=Object(g.a)(n,2),a=r[0],i=r[1];Object(o.useEffect)((function(){var n="".concat(t),o=function(){i((function(e){return e+1}))};return window.addEventListener("".concat(n,"-").concat(e),o),function(){window.removeEventListener("".concat(n,"-").concat(e),o)}}),[a])},reloadKey:function(e){window.dispatchEvent(new CustomEvent("".concat(t,"-").concat(e),{detail:{}}))}},r=new Proxy(e,{get:function(e,t){return n[t]?n[t]:e[t]},set:function(e,n,o){return e[n]!==o&&(e[n]=o,"undefined"!==typeof window&&window.dispatchEvent(new CustomEvent("".concat(t,"-").concat(n),{detail:{}}))),!0}});return r}({moved:0,goingTo:new x.Vector3,camAt:new x.Vector3,avatarAt:new x.Vector3,avatarHead:new x.Vector3,avatarRot:new x.Vector3,avatarFaceLook:new x.Vector3,avatarLoading:!0,avatarMode:"standing",avatarSpeed:1,keyW:!1,keyA:!1,keyS:!1,keyD:!1,cursorPos:new x.Vector3,cursorNormal:new x.Vector3,cursorType:"hide",hoverData:!1,isDown:!1,camMode:"first",overlay:"",profile:!1,user:!1,reload:[],onlineUID:[]})},j=function(e){var t=e.children,n=e.floor,a=e.startAt,i=Object(c.d)().get,s=P().mini,l=Object(o.useRef)(),u=Object(o.useRef)(),v=Object(o.useRef)();return Object(o.useEffect)((function(){var e=l.current=new M({floor:n,scene:i().scene}),t=u.current=O(),o=v.current=new C({collider:e.collider,startAt:a,Now:t});return s.onLoop((function(){var n,r,a=i(),c=a.camera,s=a.scene,l=e.scanCenter({camera:c,scene:s});(l&&(t.cursorPos.copy(l.point),t.cursorNormal.copy(l.face.normal)),t.hoverData!==(null===l||void 0===l||null===(n=l.object)||void 0===n?void 0:n.userData))&&(t.hoverData=(null===l||void 0===l||null===(r=l.object)||void 0===r?void 0:r.userData)||null);o.onSimulate()})),function(){s.clean()}}),[]),r.a.createElement("group",null,r.a.createElement("primitive",{object:n}),u.current&&"function"===typeof t&&t({Now:u.current}))},A=function(){function e(t){var n=t.node,o=t.numberOfScans,r=void 0===o?10:o,a=t.trailSize,i=void 0===a?32:a;Object(p.a)(this,e),this.node=n,this.WIDTH=i,this.HEIGHT=r,this.COUNT=this.WIDTH*this.HEIGHT,this.v3v000=new x.Vector3(0,0,0),this.wait=this.setup({node:n})}return Object(m.a)(e,[{key:"setup",value:function(){var e=Object(d.a)(f.a.mark((function e(t){var n,o,r,a,i,c,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.node,e.next=3,n.ready.gl;case 3:for(o=e.sent,(this.gpu=new b.a(this.WIDTH,this.HEIGHT,o)).setDataType(x.HalfFloatType),r=this.gpu.createTexture(),a=this.gpu.createTexture(),this.fillPositionTexture(r),this.fillLookupTexture(a),this.positionVariable=this.gpu.addVariable("texturePosition",this.positionShader(),r),this.gpu.setVariableDependencies(this.positionVariable,[this.positionVariable]),this.positionUniforms=this.positionVariable.material.uniforms,this.positionUniforms.lookup={value:a},i=this.HEIGHT,c=0;c<i;c++)this.positionUniforms["mouse"+c]={value:new x.Vector3(0,0,0)};this.positionUniforms.time={value:0},r.wrapS=x.RepeatWrapping,r.wrapT=x.RepeatWrapping,null!==(s=this.gpu.init())&&console.error(s);case 21:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"positionShader",value:function(){var e=this;return"\n      ".concat(function(){for(var t="",n=e.HEIGHT,o=0;o<n;o++)t+="\n          uniform vec3 mouse".concat(o.toFixed(0),";\n        ");return t}(),"\n\n      uniform sampler2D lookup;\n      uniform float time;\n\n\t\t\tvoid main()\t{\n        // const float width = resolution.x;\n        // const float height = resolution.y;\n        // float xID = floor(gl_FragCoord.x);\n        // float yID = floor(gl_FragCoord.y);\n\n        vec2 uvCursor = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;\n        // vec4 positionHead = texture2D( texturePosition, uvCursor );\n\n        vec4 lookupData = texture2D(lookup, uvCursor);\n        vec2 nextUV = lookupData.xy;\n        float currentIDX = floor(gl_FragCoord.x);\n        float currentLine = floor(gl_FragCoord.y);\n\n        if (floor(currentIDX) == 0.0) {\n          ").concat(function(){for(var t="if (false) {}",n=e.HEIGHT,o=0;o<n;o++)t+="\n          else if (currentLine == ".concat(o.toFixed(0),".0) {\n            gl_FragColor = vec4(mouse").concat(o.toFixed(0),", 1.0);\n          }\n        ");return t}(),"\n        } else {\n          vec3 positionChain = texture2D( texturePosition,nextUV ).xyz;\n          gl_FragColor = vec4(positionChain, 1.0);\n        }\n\n\n\t\t\t}\n    ")}},{key:"fillPositionTexture",value:function(e){for(var t=0,n=e.image.data,o=0;o<this.HEIGHT;o++)for(var r=0;r<this.WIDTH;r++)n[t++]=0,n[t++]=0,n[t++]=0,n[t++]=0;e.needsUpdate=!0}},{key:"fillLookupTexture",value:function(e){for(var t=0,n=e.image.data,o=[],r=0;r<this.HEIGHT;r++)for(var a=0;a<this.WIDTH;a++){var i=o[o.length-1]||[0,0];n[t++]=i[0],n[t++]=i[1],n[t++]=this.WIDTH,n[t++]=this.HEIGHT,o.push([a/this.WIDTH,r/this.HEIGHT])}e.needsUpdate=!0}},{key:"render",value:function(e){var t=this,n=e.trackers;this.positionUniforms.time.value=window.performance.now()/1e3,n.forEach((function(e,n){var o=t.positionUniforms["mouse"+n];o&&o.value&&o.value.copy(e)})),this.gpu.compute()}},{key:"getTextureAfterCompute",value:function(){return{posTexture:this.gpu.getCurrentRenderTarget(this.positionVariable).texture}}}]),e}(),I=function(){function e(t){var n=t.node,o=t.sim,r=t.mounter;Object(p.a)(this,e),this.mounter=r,this.node=n,this.sim=o,this.wait=this.setup({node:n})}return Object(m.a)(e,[{key:"setup",value:function(){var e=Object(d.a)(f.a.mark((function e(t){var n,o,r,a,i,c,s,l,u,v,d,m=this;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.node,o=this.mounter,r=new R({count:this.sim.HEIGHT,numSides:4,subdivisions:2*this.sim.WIDTH,openEnded:!1}),a=r.geometry,i=r.subdivisions,c=r.count,a.instanceCount=c,s=function(e){var t=e.controlPointsResolution,n=void 0===t?20:t,o=e.lineIdx,r=void 0===o?0:o,a=e.lineCount,i=void 0===a?m.sim.HEIGHT:a,c=e.textureName,s=void 0===c?"CONTROL_POINTS":c;n=Math.floor(n);var l="".concat(Number(n).toFixed(1));return"\n      vec3 pointIDX_".concat(s,"_").concat(r.toFixed(0)," (float index) {\n        vec3 result = vec3(0.0);\n\n        vec4 color = texture2D(").concat(s,",\n          vec2(\n            index / ").concat(n.toFixed(1),",\n            ").concat(r.toFixed(1)," / ").concat(i.toFixed(1),"\n          )\n        );\n\n        result = color.rgb;\n\n        return result;\n      }\n\n      vec3 catmullRom_").concat(s,"_").concat(r," (vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t) {\n          vec3 v0 = (p2 - p0) * 0.5;\n          vec3 v1 = (p3 - p1) * 0.5;\n          float t2 = t * t;\n          float t3 = t * t * t;\n\n          return vec3((2.0 * p1 - 2.0 * p2 + v0 + v1) * t3 + (-3.0 * p1 + 3.0 * p2 - 2.0 * v0 - v1) * t2 + v0 * t + p1);\n      }\n\n      vec3 getPointAt_").concat(r.toFixed(0)," (float t) {\n        bool closed = false;\n        float ll = ").concat(l,";\n        float minusOne = 1.0;\n        if (closed) {\n          minusOne = 0.0;\n        }\n\n        float p = (ll - minusOne) * t;\n        float intPoint = floor(p);\n        float weight = p - intPoint;\n\n        float idx0 = intPoint + -1.0;\n        float idx1 = intPoint +  0.0;\n        float idx2 = intPoint +  1.0;\n        float idx3 = intPoint +  2.0;\n\n        vec3 pt0 = pointIDX_").concat(s,"_").concat(r.toFixed(0),"(idx0);\n        vec3 pt1 = pointIDX_").concat(s,"_").concat(r.toFixed(0),"(idx1);\n        vec3 pt2 = pointIDX_").concat(s,"_").concat(r.toFixed(0),"(idx2);\n        vec3 pt3 = pointIDX_").concat(s,"_").concat(r.toFixed(0),"(idx3);\n\n        vec3 pointoutput = catmullRom_").concat(s,"_").concat(r,"(pt0, pt1, pt2, pt3, weight);\n\n        return pointoutput;\n      }\n      ")},l=function(){for(var e="\n          if (false) {}",t=0;t<m.sim.HEIGHT;t++)e+="\n          else if (lineIDXER == ".concat(t.toFixed(1),") {\n            pt += getPointAt_").concat(t.toFixed(0),"(t);\n          }\n        ");return e},u=function(){for(var e="",t=0;t<m.sim.HEIGHT;t++)e+=s({lineIdx:t,lineCount:m.sim.HEIGHT,controlPointsResolution:i,textureName:"posTexture"})+"\n";return e},v=new x.ShaderMaterial({uniforms:{time:{value:0},matcap:{value:null},posTexture:{value:null}},vertexShader:"\n        // #include <common>\n        #define lengthSegments ".concat(i.toFixed(1),"\n\n        attribute float angle;\n        attribute float newPosition;\n        attribute float tubeInfo;\n\n        // varying vec2 vUv;\n        varying vec3 vNormal;\n        attribute vec4 offset;\n\n        uniform sampler2D posTexture;\n        // uniform sampler2D handTexture;\n\n        uniform float time;\n\n        mat4 rotationX( in float angle ) {\n          return mat4(\t1.0,\t\t0,\t\t\t0,\t\t\t0,\n                  0, \tcos(angle),\t-sin(angle),\t\t0,\n                  0, \tsin(angle),\t cos(angle),\t\t0,\n                  0, \t\t\t0,\t\t\t  0, \t\t1);\n        }\n\n        mat4 rotationY( in float angle ) {\n          return mat4(\tcos(angle),\t\t0,\t\tsin(angle),\t0,\n                      0,\t\t1.0,\t\t\t 0,\t0,\n                  -sin(angle),\t0,\t\tcos(angle),\t0,\n                      0, \t\t0,\t\t\t\t0,\t1);\n        }\n\n        mat4 rotationZ( in float angle ) {\n          return mat4(\tcos(angle),\t\t-sin(angle),\t0,\t0,\n                  sin(angle),\t\tcos(angle),\t\t0,\t0,\n                      0,\t\t\t\t0,\t\t1,\t0,\n                      0,\t\t\t\t0,\t\t0,\t1);\n        }\n\n        mat4 rotationMatrix (vec3 axis, float angle) {\n            axis = normalize(axis);\n            float s = sin(angle);\n            float c = cos(angle);\n            float oc = 1.0 - c;\n\n            return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n                        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n                        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n                        0.0,                                0.0,                                0.0,                                1.0);\n        }\n\n        ").concat(u(),"\n\n        vec3 sampleFnc (float t) {\n          vec3 pt = (offset.xyz + 0.5) * 0.0;\n\n          // pt = vec4(vec4(pt, 1.0) * rotationY(t * 0.1 + time * 0.1)).xyz;\n          // if (lineIDXER == 0.0) {\n          //   pt += getPointAt_0(t);\n          // }\n\n          float lineIDXER = offset.w;\n          // pt += getPointAt_0(t);\n\n          ").concat(l(),"\n\n          // pt = getPointAt_2(t);\n\n          return pt;\n        }\n\n        void createTube (float t, vec2 volume, out vec3 pos, out vec3 normal) {\n          // find next sample along curve\n          float nextT = t + (1.0 / lengthSegments);\n\n          // sample the curve in two places\n          vec3 cur = sampleFnc(t);\n          vec3 next = sampleFnc(nextT);\n\n          // compute the Frenet-Serret frame\n          vec3 T = normalize(next - cur);\n          vec3 B = normalize(cross(T, next + cur));\n          vec3 N = -normalize(cross(B, T));\n\n          // extrude outward to create a tube\n          float tubeAngle = angle;\n          float circX = cos(tubeAngle);\n          float circY = sin(tubeAngle);\n\n          // compute position and normal\n          normal.xyz = normalize(B * circX + N * circY);\n          pos.xyz = cur + B * volume.x * circX + N * volume.y * circY;\n        }\n\n        varying float vT;\n        varying vec3 vViewPosition;\n\n        void main (void) {\n          vec3 transformed;\n          vec3 objectNormal;\n\n          float t = tubeInfo + 0.5;\n\n          vT = t;\n\n          vec2 volume = vec2(0.0333, 0.0333);\n          createTube(t, volume, transformed, objectNormal);\n\n          vec3 transformedNormal = normalMatrix * objectNormal;\n          vNormal = normalize(transformedNormal);\n\n          // vUv = uv.yx;\n\n          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);\n          gl_Position = projectionMatrix * mvPosition;\n          vViewPosition = -mvPosition.xyz;\n        }\n      "),fragmentShader:"\n        varying float vT;\n        // varying vec2 vUv;\n        varying vec3 vNormal;\n        varying vec3 vViewPosition;\n        uniform sampler2D matcap;\n        void main (void) {\n\n          vec3 viewDir = normalize( vViewPosition );\n          vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n          vec3 y = cross( viewDir, x );\n          vec2 uv = vec2( dot( x, vNormal ), dot( y, vNormal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\n          vec4 matcapColor = texture2D( matcap, uv );\n\n          gl_FragColor = vec4(vec3(1.0, 1.0, 1.0), (1.0 - vT));\n        }\n      ",transparent:!0,blending:x.AdditiveBlending,depthTest:!1}),(d=new x.Mesh(a,v)).frustumCulled=!1,d.userData.enableBloom=!0,o.add(d),n.onClean((function(){o.remove(d)})),this.sim.wait.then((function(){n.onLoop((function(){var e=m.sim.getTextureAfterCompute();v.uniforms.posTexture.value=e.posTexture,v.uniforms.time.value=window.performance.now()/1e3}))}));case 14:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),R=function e(t){Object(p.a)(this,e);var n=t.count,o=void 0===n?20:n,r=t.numSides,a=void 0===r?4:r,i=t.subdivisions,c=void 0===i?50:i,s=t.openEnded,l=void 0===s||s,v=new x.CylinderBufferGeometry(1,1,1,a,c,l),f=new w.a;(f=f.fromBufferGeometry(v)).rotateZ(Math.PI/2);var d=new x.Vector2,m=[],y=[],h=[],b=f.vertices,z=f.faceVertexUvs[0],D=[];f.faces.forEach((function(e,t){var n=e.a,o=e.b,r=e.c,a=[b[n],b[o],b[r]],i=z[t];a.forEach((function(e,t){d.set(e.y,e.z).normalize();var n=Math.atan2(d.y,d.x);y.push(n),m.push(e.x),D.push(e.x,e.y,e.z),h.push(i[t].toArray())}))}));for(var T=new Float32Array(m),E=new Float32Array(y),P=new Float32Array(2*h.length),k=new Float32Array(D),S=0;S<T.length;S++){var M=Object(g.a)(h[S],2),C=M[0],O=M[1];P[2*S+0]=C,P[2*S+1]=O}var j=new x.InstancedBufferGeometry;j.instanceCount=o,j.setAttribute("position",new x.BufferAttribute(k,3)),j.setAttribute("tubeInfo",new x.BufferAttribute(T,1)),j.setAttribute("angle",new x.BufferAttribute(E,1)),j.setAttribute("uv",new x.BufferAttribute(P,2));for(var A=[],I=Math.floor(Math.pow(o,1/3)),R=0,F=0;F<I;F++)for(var _=0;_<I;_++)for(var V=0;V<I;V++)A.push(0,0,0,R),R++;return j.setAttribute("offset",new x.InstancedBufferAttribute(new Float32Array(A),4)),Object(u.a)(Object(u.a)({},t),{},{dataLength:T.length,geometry:j})},F=function e(t){var n=t.mini,o=t.mounter,r=t.cursor;Object(p.a)(this,e);var a=n,i=new A({node:a,mounter:o,numberOfScans:8,trailSize:64}),c=new I({node:a,sim:i,mounter:o});this.display=c;for(var s=[],l=function(e){!function(e){var t=e.update,o=e.setup,i=new x.Object3D;r.add(i),n.onClean((function(){r.remove(i)}));var c=new x.Object3D;i.add(c);var l=new x.Object3D;c.add(l);var u=new x.Vector3,v=new x.Vector3;o({origin:c,orbit:l}),a.onLoop((function(){var e;t({origin:c,orbit:l}),null!==(e=n.now)&&void 0!==e&&e.camera&&i.lookAt(n.now.camera.position),l.getWorldPosition(u),v.lerp(u,.3)})),s.push(v)}({setup:function(t){var n=t.origin;t.orbit;n.rotation.z+=2*Math.PI/7*e},update:function(e){var t=e.origin,n=e.orbit;t.rotation.z+=.1,n.position.y=2*Math.sin(window.performance.now()/1e3)}})},u=0;u<7;u++)l(u);i.wait.then((function(){a.onLoop((function(){i.render({trackers:s})}))}))};function _(e){var t=e.Now,a=e.avatarSpeed,i=void 0===a?2:a,l=e.higherCamera,u=void 0===l?1.5:l,v=Object(c.d)(),f=v.get,d=v.gl,m=Object(o.useRef)({});return k("touchstart",(function(e){e.preventDefault()}),{passive:!1}),k("touchmove",(function(e){e.preventDefault()}),{passive:!1}),k("touchend",(function(e){e.preventDefault()}),{passive:!1}),Object(o.useEffect)((function(){var e=t.camMode;return t.camMode="first",t.avatarSpeed=i,function(){t.avatarSpeed=1,t.camMode=e}})),k("keydown",(function(e){"w"===e.key&&(t.keyW=!0),"a"===e.key&&(t.keyA=!0),"s"===e.key&&(t.keyS=!0),"d"===e.key&&(t.keyD=!0)})),k("keyup",(function(e){"w"===e.key&&(t.keyW=!1),"a"===e.key&&(t.keyA=!1),"s"===e.key&&(t.keyS=!1),"d"===e.key&&(t.keyD=!1)})),Object(o.useEffect)((function(){var e=f().camera;e.near=.1,e.far=1e4,e.fov=45,e.updateProjectionMatrix();var o=new x.Camera;o.position.z=5;var r=new h.a(o,d.domElement);r.enableRotate=!0,r.enablePan=!1,r.enableZoom=!1,r.enableDamping=!0,r.rotateSpeed=.5;var a=document.createElement("div");document.body.appendChild(a),a.style.cssText="\n      position: absolute;\n      bottom: 30px;\n      left: 30px;\n      width: 80px;\n      height: 80px;\n      color: white;\n      user-select: none;\n      z-index: 20;\n    ";var i=document.createElement("div");document.body.appendChild(i),i.style.cssText="\n      position: absolute;\n      bottom: 50px;\n      left: 50px;\n      width: 80px;\n      height: 80px;\n      color: white;\n      user-select: none;\n      z-index: 10;\n      text-align: center;\n      opacity: 0.4;\n    ",i.innerHTML="Walk Around JoyStick";var c=n(54).create({zone:a,color:"white",mode:"static",position:{left:"60px",bottom:"60px"}}),s=new x.Vector3(0,0,0),l=new x.Vector3(0,1,0),v=0,p=!1,g=0;c.on("start move dir plain",(function(e,t){var n,o;null!==t&&void 0!==t&&null!==(n=t.angle)&&void 0!==n&&n.radian&&(g=null===t||void 0===t||null===(o=t.angle)||void 0===o?void 0:o.radian,r.enableRotate=!1,p=!0,clearTimeout(v),v=setTimeout((function(){p=!1}),100))})),c.on("end",(function(){g=0,m.current.endForward=function(){s.multiplyScalar(.8)},r.enableRotate=!0,p=!1}));var y=S(d.domElement.parentElement,"touchend",(function(e){p||(r.enableRotate=!0)}),{passive:!1}),w=S(d.domElement.parentElement,"touchstart",(function(e){p||(r.enableRotate=!0)}),{passive:!1}),b=new x.Vector3(0,0,1),z=.3;return m.current.ctrl2=function(){p&&(s.set(0,0,-1),s.applyAxisAngle(l,r.getAzimuthalAngle()+g-.5*Math.PI||0)),z=t.keyW||t.keyA||t.keyS||t.keyD?x.MathUtils.lerp(z,.3,.1):x.MathUtils.lerp(z,0,.1),t.keyW?(b.set(0,0,-1*z),b.applyEuler(e.rotation),b.y=0,t.avatarAt.add(b).multiplyScalar(1)):t.keyA?(b.set(-1*z,0,0),b.applyEuler(e.rotation),b.y=0,t.avatarAt.add(b).multiplyScalar(1)):t.keyS?(b.set(0,0,1*z),b.applyEuler(e.rotation),b.y=0,t.avatarAt.add(b).multiplyScalar(1)):t.keyD&&(b.set(1*z,0,0),b.applyEuler(e.rotation),b.y=0,t.avatarAt.add(b).multiplyScalar(1)),t.goingTo.copy(t.avatarAt)},m.current.ctrl3=function(){"floor"!==t.cursorType&&(t.cursorType="floor")},m.current.ctrl=function(){r.update(),t.goingTo.add(s),e.position.x=t.avatarAt.x,e.position.y=t.avatarAt.y+u,e.position.z=t.avatarAt.z,e.rotation.copy(o.rotation)},t.enableFloorCursor=!1,function(){t.enableFloorCursor=!0,c.off("start move end dir plain"),c.destroy(),document.body.removeChild(a),a.remove(),i.remove(),y(),w()}}),[]),Object(c.b)((function(){Object.values(m.current).forEach((function(e){return e()}))})),r.a.createElement("group",null,r.a.createElement(s.a,{fov:45,near:.1,far:1e4,position:[0,20,20],"rotation-x":-.25*Math.PI,makeDefault:!0}))}function V(e){var t=e.Now,n=P().mini,a=Object(o.useRef)();return Object(o.useEffect)((function(){var e=a.current;console.log(123),e&&n.ready.scene.then((function(t){return new F({mini:n,cursor:e,mounter:t})}))}),[]),Object(c.b)((function(e,n){if(a.current){var o=a.current;o.position.lerp(t.cursorPos,.4),o.lookAt(e.camera.position)}})),r.a.createElement("group",{ref:a})}var H=function e(t){var o=t.mini;Object(p.a)(this,e);var r=o.now.get,a=new x.Vector2;a.copy({x:r().gl.domElement.width,y:r().gl.domElement.height}),a.multiplyScalar(.35);var i=n(57).EffectComposer,c=n(55).RenderPass,s=n(58).UnrealBloomPass,l=new i(r().gl);o.onResize((function(){l.setPixelRatio(r().gl.getPixelRatio())}));var u=new c(r().scene,r().camera);o.onResize((function(){a.copy({x:r().gl.domElement.width,y:r().gl.domElement.height}),a.multiplyScalar(.35),u.setSize(a.x,a.y)})),l.addPass(u);var v=new s(a,2,1,.1);o.onResize((function(){a.copy({x:r().gl.domElement.width,y:r().gl.domElement.height}),a.multiplyScalar(.35),v.setSize(a.x,a.y)})),l.addPass(v),l.renderToScreen=!1;var f=new x.Color("#000000"),d=new x.MeshBasicMaterial({color:0,skinning:!0}),m=new x.Layers;m.disableAll(),m.enable(0);var g=new x.Layers;g.disableAll(),g.enable(1);var y=new x.Layers;y.disableAll(),y.enable(2);var h=function(e){e.text||(e.material=d,d.needsUpdate=!0)};this.renderTexture=function(){var e=r(),t=(e.scene,e.gl);t.shadowMap.enabled=!1,r().scene.traverse((function(e){var t,n,o;e.material&&(e.userData.originalMaterial=e.material,e.userData.originalRoughness=e.material.roughness,e.userData.originalMetalness=e.material.metalness,e.userData.originalColor=e.material.color||new x.Color("#ffffff"),null!==(t=e.material)&&void 0!==t&&null!==(n=t.uniforms)&&void 0!==n&&null!==(o=n.color)&&void 0!==o&&o.value&&(e.userData.originalUniformColor=e.material.uniforms.color.value))})),r().scene.traverse((function(e){var t;if(e.isLight&&(e.visible=!1),null!==e&&void 0!==e&&null!==(t=e.userData)&&void 0!==t&&t.discard&&(e.visible=!1),e.material){var n,o;if(null!==e&&void 0!==e&&null!==(n=e.userData)&&void 0!==n&&n.enableDarken)return void h(e);null!==e&&void 0!==e&&null!==(o=e.userData)&&void 0!==o&&o.enableBloom?e.material=e.userData.originalMaterial:y.test(e.layers)||!g.test(e.layers)?h(e):e.material=e.userData.originalMaterial}})),function(){var e=r(),t=e.scene,n=e.clock.getDelta(),o=t.background;t.background=f,l.render(n),t.background=o}(),r().scene.traverse((function(e){var t,n,o,r,a,i,c;!e.text&&e.material&&e.userData.originalMaterial&&(e.material=e.userData.originalMaterial,null!==e&&void 0!==e&&null!==(n=e.material)&&void 0!==n&&n.color&&null!==e&&void 0!==e&&null!==(o=e.userData)&&void 0!==o&&o.originalColor&&(e.material.color=e.userData.originalColor),null!==e&&void 0!==e&&null!==(r=e.userData)&&void 0!==r&&r.originalRoughness&&(e.material.roughness=e.userData.originalRoughness,e.material.metalness=e.userData.originalMetalness),null!==(a=e.material)&&void 0!==a&&null!==(i=a.uniforms)&&void 0!==i&&null!==(c=i.color)&&void 0!==c&&c.value&&(e.material.uniforms.color.value=e.userData.originalUniformColor)),e.isLight&&(e.visible=!0),null!==e&&void 0!==e&&null!==(t=e.userData)&&void 0!==t&&t.discard&&(e.visible=!0)})),t.shadowMap.enabled=!0},this.getTex=function(){return l.readBuffer.texture}},N=function e(t){var n=this,o=t.mini;Object(p.a)(this,e);var r=o.now,a=r.size,i=r.gl,c=r.get,s=new x.Vector2;s.copy({x:a.width,y:a.height}),s.multiplyScalar(i.getPixelRatio()),this.rtt=new x.WebGLRenderTarget(s.width,s.height,{encoding:x.sRGBEncoding,generateMipmaps:!1}),o.onClean((function(){n.rtt.dispose()})),o.onResize((function(){s.copy({x:c().gl.domElement.width,y:c().gl.domElement.height}),s.multiplyScalar(i.getPixelRatio()),n.rtt=new x.WebGLRenderTarget(s.width,s.height,{encoding:x.sRGBEncoding,generateMipmaps:!1})})),this.renderTexture=function(){var e=c(),t=e.gl,o=e.camera,r=e.scene,a=t.getRenderTarget();t.setRenderTarget(n.rtt),t.render(r,o),t.setRenderTarget(a)},this.getTex=function(){return n.rtt.texture}},B=function e(t){var n=t.mini;Object(p.a)(this,e);var o=new x.ShaderMaterial({uniforms:{bloomDiffuse:{value:null},baseDiffuse:{value:null}},vertexShader:"\n        varying vec2 vUv;\n        void main (void) {\n          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n          vUv = uv;\n        }\n      ",fragmentShader:"\n        uniform sampler2D baseDiffuse;\n        uniform sampler2D bloomDiffuse;\n\n        varying vec2 vUv;\n          void main (void) {\n            vec4 baseDiffuseColor = texture2D(baseDiffuse, vUv);\n            vec4 bloomDiffuseColor = texture2D(bloomDiffuse, vUv);\n\n            gl_FragColor = vec4(baseDiffuseColor.rgb * 1.0,  baseDiffuseColor.a);\n\n            gl_FragColor.r += 0.45 * pow(bloomDiffuseColor.r, 0.75);\n            gl_FragColor.g += 0.45 * pow(bloomDiffuseColor.g, 0.75);\n            gl_FragColor.b += 0.45 * pow(bloomDiffuseColor.b, 0.75);\n          }\n        "}),r=new D.a(o);this.render=function(e){var t=e.baseTex,a=e.bloomTex,i=n.now.gl;i&&(o.uniforms.bloomDiffuse.value=a,o.uniforms.baseDiffuse.value=t,r.render(i))}};function L(){var e=P().mini,t=Object(o.useRef)((function(){}));return Object(o.useEffect)((function(){e.ready.get.then((function(){var n=new N({mini:e}),o=new H({mini:e}),r=new B({mini:e});t.current=function(){n.renderTexture(),o.renderTexture(),r.render({baseTex:n.getTex(),bloomTex:o.getTex()})}}))}),[]),Object(c.b)((function(){t.current()}),1e3),null}function U(){var e={vertexShader:"\n    varying vec3 vPos;\n    varying vec3 vUv3;\n\n    void main() {\n      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n      gl_Position = projectionMatrix * mvPosition;\n      vPos = position;\n      vUv3 = uv.xyx;\n    }\n    ",fragmentShader:"\n      precision highp float;\n\n      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\n      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n      vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}\n\n      float cnoise(vec3 P){\n        vec3 Pi0 = floor(P); // Integer part for indexing\n        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n        Pi0 = mod(Pi0, 289.0);\n        Pi1 = mod(Pi1, 289.0);\n        vec3 Pf0 = fract(P); // Fractional part for interpolation\n        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n        vec4 iy = vec4(Pi0.yy, Pi1.yy);\n        vec4 iz0 = Pi0.zzzz;\n        vec4 iz1 = Pi1.zzzz;\n\n        vec4 ixy = permute(permute(ix) + iy);\n        vec4 ixy0 = permute(ixy + iz0);\n        vec4 ixy1 = permute(ixy + iz1);\n\n        vec4 gx0 = ixy0 / 7.0;\n        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\n        gx0 = fract(gx0);\n        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n        vec4 sz0 = step(gz0, vec4(0.0));\n        gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n        gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n        vec4 gx1 = ixy1 / 7.0;\n        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\n        gx1 = fract(gx1);\n        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n        vec4 sz1 = step(gz1, vec4(0.0));\n        gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n        gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n        g000 *= norm0.x;\n        g010 *= norm0.y;\n        g100 *= norm0.z;\n        g110 *= norm0.w;\n        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n        g001 *= norm1.x;\n        g011 *= norm1.y;\n        g101 *= norm1.z;\n        g111 *= norm1.w;\n\n        float n000 = dot(g000, Pf0);\n        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n        float n111 = dot(g111, Pf1);\n\n        vec3 fade_xyz = fade(Pf0);\n        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n        return 2.2 * n_xyz;\n      }\n\n      varying vec3 vPos;\n      uniform float time;\n      varying vec3 vUv3;\n\n      void main() {\n        float speed = time / 3.5;\n        vec3 pp = vUv3 * 600.0;\n        // pp = vPos * 0.25 + speed;\n        float noise = clamp(cnoise(speed + pp / 250.0 + 0.0 ), 0.0, 1.0);\n\n        vec3 colorA = vec3(81.0, 135.0, 228.0) * 0.2 / 255.0;\n        vec3 colorB = vec3(0.0, 150.0, 136.0) * 0.2 / 255.0;\n\n        vec4 backgroundColor = vec4(mix(colorA, colorB, noise), 1.0);\n\n        gl_FragColor = backgroundColor;\n\n        float starNoise = (noise) * pow(cnoise(speed + pp * 2.0) * 0.5 + 0.5, 15.5) * 30.0;\n\n        gl_FragColor.rgb += vec3(pow(starNoise, 1.3)) * 1.5;\n      }\n      "},t=Object(o.useRef)();Object(o.useEffect)((function(){t.current&&(t.current.needsUpdate=!0)}),[e,e.fragmentShader,e.vertexShader]);var n=Object(o.useRef)({time:{value:0}});return Object(c.b)((function(){n.current.time.value+=1/60})),r.a.createElement(z.a,{frustumCulled:!1,userData:{enableBloom:!0},scale:1,args:[800,20,20]},r.a.createElement("shaderMaterial",{ref:t,uniforms:n.current,fragmentShader:e.fragmentShader,vertexShader:e.vertexShader,side:x.DoubleSide}))}function W(e){var t=e.imageURL,n=Object(c.d)(),r=n.scene,a=n.gl;return Object(o.useEffect)((function(){var e=new x.PMREMGenerator(a);return e.compileEquirectangularShader(),(new x.TextureLoader).load(t,(function(t){var n=e.fromEquirectangular(t).texture;n.encoding=x.sRGBEncoding,r.environment=n})),function(){r.environment=null,r.background=null}}),[t]),null}var G=n(33),X="https://wonglok.github.io/effectnode-3dworld/";function J(){var e=Object(l.a)("".concat(X,"map/demo-map-000.glb")),t=Object(o.useMemo)((function(){var t=G.SkeletonUtils.clone(e.scene);return t.traverse((function(e){e&&(e.material&&(e.material=e.material.clone()),e.geometry&&(e.userData.isFloor=!0))})),t}),[e]);return r.a.createElement("group",null,t&&r.a.createElement(j,{floor:t,startAt:{x:0,y:0,z:0}},(function(e){var t=e.Now;return r.a.createElement("group",null,r.a.createElement(_,{higherCamera:1.5,avatarSpeed:2,Now:t}),r.a.createElement(V,{Now:t}))})),r.a.createElement("primitive",{object:t}),r.a.createElement("directionalLight",{position:[10,10,10]}),r.a.createElement(W,{imageURL:"".concat(X,"image/sky.png")}),r.a.createElement(U,null),r.a.createElement(L,null))}var q=function(){return r.a.createElement(c.a,{style:{width:"100%",height:"100%"}},r.a.createElement(o.Suspense,{fallback:r.a.createElement("group",null,r.a.createElement("group",{"rotation-x":0*Math.PI},r.a.createElement("gridHelper",{args:[150,50,2302755,11184810]})),r.a.createElement(s.a,{position:[0,20,20],"rotation-x":-.25*Math.PI,makeDefault:!0}))},r.a.createElement(J,null)))};i.a.render(r.a.createElement(q,null),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.50259639.chunk.js.map