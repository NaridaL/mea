var x="function"==typeof Object.defineProperties?Object.defineProperty:function(b,e,d){if(d.get||d.set)throw new TypeError("ES3 does not support getters and setters.");b!=Array.prototype&&b!=Object.prototype&&(b[e]=d.value)},z="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global?global:this;function A(){A=function(){};z.Symbol||(z.Symbol=B)}var C=0;function B(b){return"jscomp_symbol_"+(b||"")+C++}
function F(){A();var b=z.Symbol.iterator;b||(b=z.Symbol.iterator=z.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&x(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return H(this)}});F=function(){}}function H(b){var e=0;return I(function(){return e<b.length?{done:!1,value:b[e++]}:{done:!0}})}function I(b){F();b={next:b};b[z.Symbol.iterator]=function(){return this};return b}function K(b){F();A();F();var e=b[Symbol.iterator];return e?e.call(b):H(b)}
function L(b,e){if(e){for(var d=z,g=b.split("."),c=0;c<g.length-1;c++){var k=g[c];k in d||(d[k]={});d=d[k]}g=g[g.length-1];c=d[g];k=e(c);k!=c&&null!=k&&x(d,g,{configurable:!0,writable:!0,value:k})}}function O(b,e){return Object.prototype.hasOwnProperty.call(b,e)}
L("WeakMap",function(b){function e(b){this.v=(k+=Math.random()+1).toString();if(b){A();F();b=K(b);for(var n;!(n=b.next()).done;)n=n.value,this.set(n[0],n[1])}}function d(b){O(b,c)||x(b,c,{value:{}})}function g(b){var n=Object[b];n&&(Object[b]=function(b){d(b);return n(b)})}if(function(){if(!b||!Object.seal)return!1;try{var c=Object.seal({}),n=Object.seal({}),d=new b([[c,2],[n,3]]);if(2!=d.get(c)||3!=d.get(n))return!1;d["delete"](c);d.set(n,4);return!d.has(c)&&4==d.get(n)}catch(u){return!1}}())return b;
var c="$jscomp_hidden_"+Math.random().toString().substring(2);g("freeze");g("preventExtensions");g("seal");var k=0;e.prototype.set=function(b,n){d(b);if(!O(b,c))throw Error("WeakMap key fail: "+b);b[c][this.v]=n;return this};e.prototype.get=function(b){return O(b,c)?b[c][this.v]:void 0};e.prototype.has=function(b){return O(b,c)&&O(b[c],this.v)};e.prototype["delete"]=function(b){return O(b,c)&&O(b[c],this.v)?delete b[c][this.v]:!1};return e});
L("Map",function(b){function e(){var b={};return b.l=b.next=b.head=b}function d(b,c){var d=b.j;return I(function(){if(d){for(;d.head!=b.j;)d=d.l;for(;d.next!=d.head;)return d=d.next,{done:!1,value:c(d)};d=null}return{done:!0,value:void 0}})}function g(b,d){var c;c=d&&typeof d;"object"==c||"function"==c?k.has(d)?c=k.get(d):(c=""+ ++p,k.set(d,c)):c="p_"+d;var g=b.u[c];if(g&&O(b.u,c))for(var e=0;e<g.length;e++){var D=g[e];if(d!==d&&D.key!==D.key||d===D.key)return{id:c,list:g,index:e,c:D}}return{id:c,
list:g,index:-1,c:void 0}}function c(b){this.u={};this.j=e();this.size=0;if(b){b=K(b);for(var d;!(d=b.next()).done;)d=d.value,this.set(d[0],d[1])}}if(function(){if(!b||!b.prototype.entries||"function"!=typeof Object.seal)return!1;try{var d=Object.seal({x:4}),c=new b(K([[d,"s"]]));if("s"!=c.get(d)||1!=c.size||c.get({x:4})||c.set({x:4},"t")!=c||2!=c.size)return!1;var g=c.entries(),e=g.next();if(e.done||e.value[0]!=d||"s"!=e.value[1])return!1;e=g.next();return e.done||4!=e.value[0].x||"t"!=e.value[1]||
!g.next().done?!1:!0}catch(k){return!1}}())return b;A();F();var k=new WeakMap;c.prototype.set=function(b,d){var c=g(this,b);c.list||(c.list=this.u[c.id]=[]);c.c?c.c.value=d:(c.c={next:this.j,l:this.j.l,head:this.j,key:b,value:d},c.list.push(c.c),this.j.l.next=c.c,this.j.l=c.c,this.size++);return this};c.prototype["delete"]=function(b){b=g(this,b);return b.c&&b.list?(b.list.splice(b.index,1),b.list.length||delete this.u[b.id],b.c.l.next=b.c.next,b.c.next.l=b.c.l,b.c.head=null,this.size--,!0):!1};c.prototype.clear=
function(){this.u={};this.j=this.j.l=e();this.size=0};c.prototype.has=function(b){return!!g(this,b).c};c.prototype.get=function(b){return(b=g(this,b).c)&&b.value};c.prototype.entries=function(){return d(this,function(b){return[b.key,b.value]})};c.prototype.keys=function(){return d(this,function(b){return b.key})};c.prototype.values=function(){return d(this,function(b){return b.value})};c.prototype.forEach=function(b,c){for(var d=this.entries(),e;!(e=d.next()).done;)e=e.value,b.call(c,e[1],e[0],this)};
c.prototype[Symbol.iterator]=c.prototype.entries;var p=0;return c});
L("Set",function(b){function e(b){this.h=new Map;if(b){b=K(b);for(var e;!(e=b.next()).done;)this.add(e.value)}this.size=this.h.size}if(function(){if(!b||!b.prototype.entries||"function"!=typeof Object.seal)return!1;try{var d=Object.seal({x:4}),e=new b(K([d]));if(!e.has(d)||1!=e.size||e.add(d)!=e||1!=e.size||e.add({x:4})!=e||2!=e.size)return!1;var c=e.entries(),k=c.next();if(k.done||k.value[0]!=d||k.value[1]!=d)return!1;k=c.next();return k.done||k.value[0]==d||4!=k.value[0].x||k.value[1]!=k.value[0]?
!1:c.next().done}catch(p){return!1}}())return b;A();F();e.prototype.add=function(b){this.h.set(b,b);this.size=this.h.size;return this};e.prototype["delete"]=function(b){b=this.h["delete"](b);this.size=this.h.size;return b};e.prototype.clear=function(){this.h.clear();this.size=0};e.prototype.has=function(b){return this.h.has(b)};e.prototype.entries=function(){return this.h.entries()};e.prototype.values=function(){return this.h.values()};e.prototype[Symbol.iterator]=e.prototype.values;e.prototype.forEach=
function(b,e){var c=this;this.h.forEach(function(k){return b.call(e,k,k,c)})};return e});L("String.prototype.includes",function(b){return b?b:function(b,d){if(null==this)throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.includes must not be a regular expression");return-1!==(this+"").indexOf(b,d||0)}});
var P=function(){function b(){a.H=M|1;a.R=M|2;var m=q(),f=q();a.w=q();a.A=q();var b=[],c=[],d,l;a.J=function(f){switch(f){case a.H:d="modelViewMatrix";l=b;break;case a.R:d="projectionMatrix";l=c;break;default:throw Error("invalid matrix mode "+f);}};a.ka=function(){q.Pa(a[d])};a.Qa=function(f){q.ga(f,a[d])};a.m=function(m){q.multiply(a[d],m,f);m=f;f=a[d];a[d]=m};a.perspective=function(f,b,h,c){a.m(q.perspective(f,b,h,c,m))};a.ja=function(f,m,b,h,c,d){a.m(q.ja(f,m,b,h,c,d))};a.ra=function(f,m,b,h,
c,d){a.m(q.ra(f,m,b,h,c,d))};a.scale=function(f,b,h){a.m(q.$a(f,b,h,m))};a.translate=function(f,b,h){void 0!==b?a.m(q.va(f,b,h,m)):a.m(q.va(f,m))};a.rotate=function(f,b,h,c){a.m(q.rotation(f,b,h,c,m))};a.la=function(f,m,b){a.m(q.la(f,m,b))};a.Ya=function(){l.push(q.ga(a[d]))};a.Va=function(){a[d]=l.pop()};a.Wa=function(f,m,b,h,c,d){h=h||a.w;c=c||a.A;d=d||a.getParameter(a.VIEWPORT);f=c.Y(h.Y(r(f,m,b)));return r(d[0]+d[2]*(.5*f.x+.5),d[1]+d[3]*(.5*f.y+.5),.5*f.z+.5)};a.hb=function(b,h,c,d,y,l){d=d||
a.w;y=y||a.A;l=l||a.getParameter(a.VIEWPORT);b=r((b-l[0])/l[2]*2-1,(h-l[1])/l[3]*2-1,2*c-1);return q.inverse(q.multiply(y,d,m),f).Y(b)};a.J(a.H)}function e(){var m=new n({coords:!0,i:!0,b:!1}),f=-1,b=[0,0,0,0],c=[1,1,1,1],d=new v("\nuniform float pointSize;\nvarying vec4 color;\nvarying vec4 coord;\nvoid main() {\n\tcolor = LGL_Color;\n\tcoord = LGL_TexCoord;\n\tgl_Position = LGL_ModelViewProjectionMatrix * LGL_Vertex;\n\tgl_PointSize = pointSize;\n}","\nuniform sampler2D texture;\nuniform float pointSize;\nuniform bool useTexture;\nvarying vec4 color;\nvarying vec4 coord;\nvoid main() {\n\tgl_FragColor = color;\n\tif (useTexture) gl_FragColor *= texture2D(texture, coord.xy);\n}");
a.sa=function(a){d.N({sa:a})};a.Da=function(a){if(-1!=f)throw Error("mismatched gl.begin() and gl.end() calls");f=a;m.i=[];m.coords=[];m.f=[]};a.color=function(a,f,m,b){c=1==arguments.length?a.G().concat(1):[a,f,m,b||1]};a.bb=function(a,f){b=1==arguments.length?a.G(2):[a,f]};a.jb=function(a,f,d){m.i.push(c);m.coords.push(b);m.f.push(1==arguments.length?a.G():[a,f,d])};a.end=function(){if(-1==f)throw Error("mismatched gl.begin() and gl.end() calls");console.log(m.toSource());m.compile();d.N({ib:!!a.getParameter(a.TEXTURE_BINDING_2D)}).ha(m,
f);f=-1}}function d(){function m(){for(var a in n)if(a in n&&n[a])return!0;return!1}function f(f){var b={},h;for(h in f)b[h]="function"==typeof f[h]?function(a){return function(){a.apply(f,arguments)}}(f[h]):f[h];b.qa=f;b.x=b.pageX;b.y=b.pageY;for(h=a.canvas;h;h=h.offsetParent)b.x-=h.offsetLeft,b.y-=h.offsetTop;G?(b.deltaX=b.x-g,b.deltaY=b.y-k):(b.deltaX=0,b.deltaY=0,G=!0);g=b.x;k=b.y;b.Ja=m();b.preventDefault=function(){};b.stopPropagation=b.qa.stopPropagation;return b}function b(m){a=l;m=f(m);if(a.onmousemove)a.onmousemove(m);
m.preventDefault()}function d(c){a=l;n[c.which]=!1;m()||(document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",d),a.canvas.addEventListener("mousemove",b),a.canvas.addEventListener("mouseup",d));c=f(c);if(a.onmouseup)a.onmouseup(c);c.preventDefault()}function e(){G=!1}var l=a,g=0,k=0,n={},G=!1;c(a.canvas,"mousedown",function(c){a=l;m()||(document.addEventListener("mousemove",b),document.addEventListener("mouseup",d),a.canvas.removeEventListener("mousemove",b),a.canvas.removeEventListener("mouseup",
d));n[c.which]=!0;c=f(c);if(a.onmousedown)a.onmousedown(c);c.preventDefault()});a.canvas.addEventListener("mousemove",b);a.canvas.addEventListener("mouseup",d);a.canvas.addEventListener("mouseover",e);a.canvas.addEventListener("mouseout",e);c(document,"contextmenu",function(){n={};G=!1})}function g(a){return{8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"}[a]||(65<=a&&90>=a?String.fromCharCode(a):null)}function c(a,f,b){a.addEventListener(f,
b)}function k(){(function(b){a.na=function(){a=b}})(a);a.Ca=function(){function b(){a=c;var d=(new Date).getTime();a.pa&&a.pa((d-h)/1E3);a.L&&a.L();f(b);h=d}var f=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(a){setTimeout(a,1E3/60)},h=(new Date).getTime(),c=a;b()};a.Oa=function(b){function f(){a.canvas.width=window.innerWidth-c-d;a.canvas.height=window.innerHeight-h-e;a.viewport(0,0,a.canvas.width,a.canvas.height);!b.Ea&&"camera"in b||
(a.J(a.R),a.ka(),a.perspective(b.Ma||45,a.canvas.width/a.canvas.height,b.Sa||.1,b.Ka||1E3),a.J(a.H));a.L&&a.L()}b=b||{};var h=b.paddingTop||0,c=b.paddingLeft||0,d=b.paddingRight||0,e=b.paddingBottom||0;if(!document.body)throw Error("document.body doesn't exist yet (call gl.fullscreen() from window.onload() or from inside the <body> tag)");document.body.appendChild(a.canvas);document.body.style.overflow="hidden";a.canvas.style.position="absolute";a.canvas.style.left=c+"px";a.canvas.style.top=h+"px";
window.addEventListener("resize",f);f()}}function p(b,f){assert(b==a.ARRAY_BUFFER||b==a.ELEMENT_ARRAY_BUFFER,"target == gl.ARRAY_BUFFER || target == gl.ELEMENT_ARRAY_BUFFER");assert(f==Float32Array||f==Uint16Array,"type == Float32Array || type == Uint16Array");this.buffer=null;this.target=b;this.type=f;this.data=[]}function n(a){a=a||{};this.D=!1;this.B={};this.F={};this.C("vertices","LGL_Vertex");a.coords&&this.C("coords","LGL_TexCoord");a.a&&this.C("normals","LGL_Normal");a.i&&this.C("colors","LGL_Color");
"triangles"in a&&!a.b||this.T("TRIANGLES");a.o&&this.T("LINES")}function E(a){return r(((a&1)<<1)-1,(a&2)-1,((a&4)>>1)-1)}function u(a,b,h){this.t=arguments.length?a:Number.MAX_VALUE}function v(b,f){function h(a){var b=document.getElementById(a);return b?b.text:a}function c(b,f){var m=a.createShader(b);a.shaderSource(m,f);a.compileShader(m);if(!a.getShaderParameter(m,a.COMPILE_STATUS))throw Error("compile error: "+a.getShaderInfoLog(m));return m}var d=this;b=h(b);f=h(f);var e="\n\tuniform mat3 LGL_NormalMatrix;\n\tuniform mat4 LGL_ModelViewMatrix;\n\tuniform mat4 LGL_ProjectionMatrix;\n\tuniform mat4 LGL_ModelViewProjectionMatrix;\n\tuniform mat4 LGL_ModelViewMatrixInverse;\n\tuniform mat4 LGL_ProjectionMatrixInverse;\n\tuniform mat4 LGL_ModelViewProjectionMatrixInverse;\n".match(/\bLGL_\w+/g);
this.g=a.createProgram();a.attachShader(this.g,c(a.VERTEX_SHADER,"\n\tuniform mat3 LGL_NormalMatrix;\n\tuniform mat4 LGL_ModelViewMatrix;\n\tuniform mat4 LGL_ProjectionMatrix;\n\tuniform mat4 LGL_ModelViewProjectionMatrix;\n\tuniform mat4 LGL_ModelViewMatrixInverse;\n\tuniform mat4 LGL_ProjectionMatrixInverse;\n\tuniform mat4 LGL_ModelViewProjectionMatrixInverse;\n\n\tattribute vec4 LGL_Vertex;\n\tattribute vec4 LGL_TexCoord;\n\tattribute vec3 LGL_Normal;\n\tattribute vec4 LGL_Color;\n\tvec4 ftransform() {\n\t\treturn LGL_ModelViewProjectionMatrix * LGL_Vertex;\n\t}\n"+
b));a.attachShader(this.g,c(a.FRAGMENT_SHADER,"  precision highp float;\n\tuniform mat3 LGL_NormalMatrix;\n\tuniform mat4 LGL_ModelViewMatrix;\n\tuniform mat4 LGL_ProjectionMatrix;\n\tuniform mat4 LGL_ModelViewProjectionMatrix;\n\tuniform mat4 LGL_ModelViewMatrixInverse;\n\tuniform mat4 LGL_ProjectionMatrixInverse;\n\tuniform mat4 LGL_ModelViewProjectionMatrixInverse;\n"+f));a.linkProgram(this.g);if(!a.getProgramParameter(this.g,a.LINK_STATUS))throw Error("link error: "+a.getProgramInfoLog(this.g));
this.attributes={};this.$={};this.V={};for(var g=a.getProgramParameter(this.g,a.ACTIVE_UNIFORMS);0<g--;){var k=a.getActiveUniform(this.g,g),n=k.type;if(a.SAMPLER_2D==n||a.SAMPLER_CUBE==n)this.V[k.name]=1}this.S={};e.forEach(function(b){a.getUniformLocation(d.g,b)&&(d.S[b]=!0)});if(NLA_DEBUG)for(this.Z={},e=a.getProgramParameter(this.g,a.ACTIVE_UNIFORMS);0<e--;)g=a.getActiveUniform(this.g,e),this.Z[g.name]=g}function R(a){return a.constructor==Array||Float32Array==a.constructor||Float64Array==a.constructor}
function D(a){a=Object.prototype.toString.call(a);return"[object Number]"==a||"[object Boolean]"==a}function t(b,f,h){h=h||{};this.id=a.createTexture();this.width=b;this.height=f;this.format=h.format||a.RGBA;this.type=h.type||a.UNSIGNED_BYTE;var c=h.filter||h.Ra||a.LINEAR,d=h.filter||h.K||a.LINEAR;if(this.type===a.FLOAT){if(!t.da())throw Error("OES_texture_float is required but not supported");if((d!==a.NEAREST||c!==a.NEAREST)&&!t.ca())throw Error("OES_texture_float_linear is required but not supported");
}else if(this.type===a.HALF_FLOAT_OES){if(!t.fa())throw Error("OES_texture_half_float is required but not supported");if((d!==a.NEAREST||c!==a.NEAREST)&&!t.ea())throw Error("OES_texture_half_float_linear is required but not supported");}a.bindTexture(a.TEXTURE_2D,this.id);a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,1);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,c);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,d);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,h.wa||h.kb||a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,
a.TEXTURE_WRAP_T,h.wa||h.lb||a.CLAMP_TO_EDGE);a.texImage2D(a.TEXTURE_2D,0,this.format,b,f,0,this.format,this.type,null)}var a,r=NLA.ba,q=NLA.aa,w={create:function(m){m=m||{};var f=m.canvas||document.createElement("canvas");m.canvas||(f.width=800,f.height=600);"alpha"in m||(m.alpha=!1);try{a=f.getContext("webgl",m)}catch(h){console.log(h)}try{a=a||f.getContext("experimental-webgl",m)}catch(h){}if(!a)throw Error("WebGL not supported");a.HALF_FLOAT_OES=36193;b();e();d();k();return a},keys:{},xa:p,s:n,
ya:u,Aa:v,Ba:t};c(document,"keydown",function(a){if(!a.altKey&&!a.ctrlKey&&!a.metaKey){var b=g(a.keyCode);b&&(w.keys[b]=!0);w.keys[a.keyCode]=!0}});c(document,"keyup",function(a){if(!a.altKey&&!a.ctrlKey&&!a.metaKey){var b=g(a.keyCode);b&&(w.keys[b]=!1);w.keys[a.keyCode]=!1}});var M=305397760;p.prototype={compile:function(b){this.buffer=this.buffer||a.createBuffer();var f;0==this.data.length&&console.warn("empty buffer "+this.name);if(0==this.data.length||this.data[0]instanceof r)f=r.La(this.data),
this.buffer.length=this.data.length,this.buffer.W=3,this.buffer.count=this.data.length;else{var h=[];for(f=0;f<this.data.length;f+=1E4)h=Array.prototype.concat.apply(h,this.data.slice(f,f+1E4));f=new this.type(h);var c=this.data.length?h.length/this.data.length:0;assert(0==c%1,"buffer "+this.name+"elements not of consistent size, average size is "+c);assert(h.every(function(a){return"number"==typeof a}),function(){return"data.every(v => 'number' == typeof v)"+h.toSource()});this.buffer.length=h.length;
NLA.O&&(this.maxValue=h.max());this.buffer.W=c;this.buffer.count=h.length/c}a.bindBuffer(this.target,this.buffer);a.bufferData(this.target,f,b||a.STATIC_DRAW)}};n.prototype={C:function(b,f){assert(!this.B[f]);assert(!this[b]);this.D=!1;assert("string"==typeof b);assert("string"==typeof f);(this.B[f]=new p(a.ARRAY_BUFFER,Float32Array)).name=b;this[b]=[]},T:function(b){this.D=!1;(this.F[b]=new p(a.ELEMENT_ARRAY_BUFFER,Uint16Array)).name=b;this[b.toLowerCase()]=[]},compile:function(){var a=Infinity,
b,c;for(c in this.B){var d=this.B[c];d.data=this[d.name];d.compile();this[d.name].length<a&&(b=c,a=this[d.name].length)}for(var e in this.F)if(c=this.F[e],c.data=this[e.toLowerCase()],c.compile(),NLA.O&&c.maxValue>=a)throw Error("max index value for buffer "+e+"\n\t\t\t\t\tis too large "+c.maxValue+" min Vbuffer size: "+a+" "+b);this.D=!0},transform:function(a){var b=new w.s({f:this.f,a:this.a});b.f=a.ua(this.f);if(this.a){var c=a.I().gb();this.a=this.a.map(function(a){return c.eb(a).oa()})}b.b=this.b;
b.compile();return b}};n.Ua=function(a){a=a||{};var b=new n(a),c=a.Ga||a.detail||1;a=a.Ha||a.detail||1;for(var d=0;d<=a;d++)for(var e=d/a,l=0;l<=c;l++){var g=l/c;b.f.push([2*g-1,2*e-1,0]);b.coords&&b.coords.push([g,e]);b.a&&b.a.push([0,0,1]);l<c&&d<a&&(g=l+d*(c+1),b.b.push([g,g+1,g+c+1]),b.b.push([g+c+1,g+1,g+c+2]))}b.compile();return b};var N=[[0,4,2,6,-1,0,0],[1,3,5,7,1,0,0],[0,1,4,5,0,-1,0],[2,6,3,7,0,1,0],[0,2,1,3,0,0,-1],[4,5,6,7,0,0,1]];n.Fa=function(a){a=new n(a);for(var b=0;b<N.length;b++){for(var c=
N[b],d=4*b,e=0;4>e;e++)a.f.push(E(c[e]).G()),a.coords&&a.coords.push([e&1,(e&2)/2]),a.a&&a.a.push(c.slice(4,7));a.b.push(d,d+1,d+2,d+2,d+1,d+3)}a.compile();return a};n.ab=function(a){function b(a,c,d,e,h,m,g,l,k,n){if(0==e)m.push([g,l,k]),g<l&&n.push(g,l),l<k&&n.push(l,k),k<g&&n.push(k,g);else{var y=a.M(c).X(1),r=c.M(d).X(1),q=d.M(a).X(1),p=h.length,t=p+1,u=p+2;h.push(y,r,q);b(y,r,q,e-1,h,m,p,t,u,n);b(a,y,q,e-1,h,m,g,p,u,n);b(c,r,y,e-1,h,m,l,t,p,n);b(d,q,r,e-1,h,m,k,u,t,n)}}var c=r(1,(1+Math.sqrt(5))/
2,0).oa(),d=c.x,c=c.y,d=[r(-d,c,0),r(d,c,0),r(-d,-c,0),r(d,-c,0),r(0,-d,c),r(0,d,c),r(0,-d,-c),r(0,d,-c),r(c,0,-d),r(c,0,d),r(-c,0,-d),r(-c,0,d)],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e=new w.s({a:!0,i:!1,o:!0});e.f.Xa(d);for(var l=0;20>l;l++){var g=K(c.slice(3*l,3*l+3)),k=g.next().value,n=g.next().value,g=g.next().value;b(d[k],d[n],d[g],a,e.f,e.b,k,n,g,e.o)}e.a=e.f;e.compile();return e};n.load=function(a,
b){b=b||{};"coords"in b||(b.coords=!!a.coords);"normals"in b||(b.a=!!a.a);"colors"in b||(b.i=!!a.i);"triangles"in b||(b.b=!!a.b);"lines"in b||(b.o=!!a.o);var c=new n(b);c.f=a.f;c.coords&&(c.coords=a.coords);c.a&&(c.a=a.a);c.i&&(c.i=a.i);c.b&&(c.b=a.b);c.o&&(c.o=a.o);c.compile();return c};u.prototype={};v.prototype={N:function(b){a.useProgram(this.g);var c={},d;for(d in b){var e=this.$[d]||a.getUniformLocation(this.g,d);assert(!!e,d);if(e){this.$[d]=e;c.value=b[d];if(NLA.O){var g=this.Z[d];assert(g.type!=
a.FLOAT||"number"==typeof c.value);assert(g.type!=a.INT||"number"==typeof c.value&&0==c.value%1);assert(g.type!=a.FLOAT_VEC3||c.value instanceof NLA.ba);assert(g.type!=a.FLOAT_MAT4||c.value instanceof NLA.aa,function(a){return function(){return a.value.toSource()}}(c));assert(g.type!=a.FLOAT_MAT3||9==c.value.length)}c.value instanceof r?c.value=c.value.G():c.value instanceof q&&(c.value=c.value.ma);if(R(c.value))switch(c.value.length){case 1:a.uniform1fv(e,new Float32Array(c.value));break;case 2:a.uniform2fv(e,
new Float32Array(c.value));break;case 3:a.uniform3fv(e,new Float32Array(c.value));break;case 4:a.uniform4fv(e,new Float32Array(c.value));break;case 9:a.uniformMatrix3fv(e,!1,new Float32Array([c.value[0],c.value[3],c.value[6],c.value[1],c.value[4],c.value[7],c.value[2],c.value[5],c.value[8]]));break;case 16:a.uniformMatrix4fv(e,!1,new Float32Array([c.value[0],c.value[4],c.value[8],c.value[12],c.value[1],c.value[5],c.value[9],c.value[13],c.value[2],c.value[6],c.value[10],c.value[14],c.value[3],c.value[7],
c.value[11],c.value[15]]));break;default:throw Error("don't know how to load uniform \""+d+'" of length '+c.value.length);}else if(D(c.value))(this.V[d]?a.uniform1i:a.uniform1f).call(a,e,c.value);else throw Error('attempted to set uniform "'+d+'" to invalid value '+c.value);c={value:c.value}}}return this},ha:function(b,c,d,e){assert(b.D,"mesh.hasBeenCompiled");c=c||"TRIANGLES";assert(w.P.includes(c),"GL.DRAW_MODES.includes(mode) "+c);this.ia(b.B,b.F[c],a[c],d,e)},ia:function(b,c,d,e,g){assert(w.P.some(function(b){return a[b]==
d}),"GL.DRAW_MODES.some(stringMode => gl[stringMode] == mode) "+d);var l=this.S,k=(l.LGL_ModelViewMatrixInverse||l.LGL_NormalMatrix)&&a.w.I(),n=l.LGL_ProjectionMatrixInverse&&a.A.I(),r=(l.LGL_ModelViewProjectionMatrix||l.LGL_ModelViewProjectionMatrixInverse)&&a.A.cb(a.w),p={};l.LGL_ModelViewMatrix&&(p.LGL_ModelViewMatrix=a.w);l.LGL_ModelViewMatrixInverse&&(p.LGL_ModelViewMatrixInverse=k);l.LGL_ProjectionMatrix&&(p.LGL_ProjectionMatrix=a.A);l.LGL_ProjectionMatrixInverse&&(p.LGL_ProjectionMatrixInverse=
n);l.LGL_ModelViewProjectionMatrix&&(p.LGL_ModelViewProjectionMatrix=r);l.LGL_ModelViewProjectionMatrixInverse&&(p.LGL_ModelViewProjectionMatrixInverse=r.I());l.LGL_NormalMatrix&&(l=k.ma,p.LGL_NormalMatrix=[l[0],l[4],l[8],l[1],l[5],l[9],l[2],l[6],l[10]]);this.N(p);var p=0,q;for(q in b)l=b[q],k=this.attributes[q]||a.getAttribLocation(this.g,q),-1!=k&&l.buffer&&(this.attributes[q]=k,a.bindBuffer(a.ARRAY_BUFFER,l.buffer),a.enableVertexAttribArray(k),a.vertexAttribPointer(k,l.buffer.W,a.FLOAT,!1,0,0),
p=l.buffer.count);for(var t in this.attributes)t in b||a.disableVertexAttribArray(this.attributes[t]);if(p&&(!c||c.buffer))if(c){if(e+g>c.buffer.length)throw Error("Buffer not long enough for passed parameters start/length/buffer length "+e+" "+g+" "+c.buffer.length);a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,c.buffer);a.drawElements(d,g||c.buffer.length,a.UNSIGNED_SHORT,2*(e||0))}else{if(e+g>p)throw Error("invalid");a.drawArrays(d,e||0,g||p)}return this}};w.P="POINTS LINES LINE_STRIP LINE_LOOP TRIANGLES TRIANGLE_STRIP TRIANGLE_FAN".split(" ");
w.za="FLOAT FLOAT_MAT2 FLOAT_MAT3 FLOAT_MAT4 FLOAT_VEC2 FLOAT_VEC3 FLOAT_VEC4 INT INT_VEC2 INT_VEC3 INT_VEC4 UNSIGNED_INT".split(" ");var J;t.prototype={bind:function(b){a.activeTexture(a.TEXTURE0+(b||0));a.bindTexture(a.TEXTURE_2D,this.id)},ta:function(a){var b;b=a.id;a.id=this.id;this.id=b;b=a.width;a.width=this.width;this.width=b;b=a.height;a.height=this.height;this.height=b}};t.U=function(b,c){c=c||{};var d=new t(b.width,b.height,c);try{a.texImage2D(a.TEXTURE_2D,0,d.format,d.format,d.type,b)}catch(e){if("file:"==
location.protocol)throw Error('image not loaded for security reasons (serve this page over "http://" instead)');throw Error("image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)");}c.K&&c.K!=a.NEAREST&&c.K!=a.LINEAR&&a.generateMipmap(a.TEXTURE_2D);return d};t.Na=function(b,c){J=J||function(){var a=document.createElement("canvas").getContext("2d");a.canvas.width=a.canvas.height=128;for(var b=0;b<a.canvas.height;b+=16)for(var c=
0;c<a.canvas.width;c+=16)a.fillStyle=(c^b)&16?"#FFF":"#DDD",a.fillRect(c,b,16,16);return a.canvas}();var d=t.U(J,c),e=new Image,g=a;e.onload=function(){g.na();t.U(e,c).ta(d)};e.src=b;return d};t.da=function(){return!!a.getExtension("OES_texture_float")};t.ca=function(){return!!a.getExtension("OES_texture_float_linear")};t.fa=function(){return!!a.getExtension("OES_texture_half_float")};t.ea=function(){return!!a.getExtension("OES_texture_half_float_linear")};return w}();
P.s.rotation=function(b,e,d,g,c,k){c=new P.s({a:!!k});for(var p=b.length,n=p*g,E=M4(),u=0;u<g;u++){M4.Za(e.anchor,e.Ia,d/g*u,E);Array.prototype.push.apply(c.f,E.ua(b));k&&Array.prototype.push.apply(c.a,E.fb(k));for(var v=0;v<p-1;v++)c.b.push([u*p+v+1,u*p+v,(u+1)*p+v].map(function(b){return b%n})),c.b.push([u*p+v+1,(u+1)*p+v,(u+1)*p+v+1].map(function(b){return b%n}))}c.compile();return c};function Q(b,e,d,g,c){b.push(e,d,g,d,c,g)}
P.s.Ta=function(b,e,d,g){assertVectors.apply(void 0,b);assertVectors(e);var c=new P.s({a:!!g});c.f=b.concat(b.map(function(b){return b.M(e)}));for(var k=0;k<b.length-1;k++)Q(c.b,k,k+1,b.length+k,b.length+k+1);d&&Q(c.b,0,b.length-1,b.length,2*b.length-1);g&&(c.a=g.concat(g));c.compile();return c};
