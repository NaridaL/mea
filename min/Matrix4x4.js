var $jscomp={scope:{},getGlobal:function(m){return"undefined"!=typeof window&&window===m?m:"undefined"!=typeof global?global:m}};$jscomp.global=$jscomp.getGlobal(this);$jscomp.initSymbol=function(){$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol);$jscomp.initSymbol=function(){}};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(m){return"jscomp_symbol_"+m+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();$jscomp.global.Symbol.iterator||($jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));$jscomp.initSymbolIterator=function(){}};
$jscomp.makeIterator=function(m){$jscomp.initSymbolIterator();if(m[$jscomp.global.Symbol.iterator])return m[$jscomp.global.Symbol.iterator]();if(!(m instanceof Array||"string"==typeof m||m instanceof String))throw new TypeError(m+" is not iterable");var n=0;return{next:function(){return n==m.length?{done:!0}:{done:!1,value:m[n++]}}}};$jscomp.arrayFromIterator=function(m){for(var n,f=[];!(n=m.next()).done;)f.push(n.value);return f};
$jscomp.arrayFromIterable=function(m){return m instanceof Array?m:$jscomp.arrayFromIterator($jscomp.makeIterator(m))};$jscomp.arrayFromArguments=function(m){for(var n=[],f=0;f<m.length;f++)n.push(m[f]);return n};
$jscomp.inherits=function(m,n){function f(){}f.prototype=n.prototype;m.prototype=new f;m.prototype.constructor=m;for(var q in n)if($jscomp.global.Object.defineProperties){var r=$jscomp.global.Object.getOwnPropertyDescriptor(n,q);void 0!==r&&$jscomp.global.Object.defineProperty(m,q,r)}else m[q]=n[q]};if(!NLA.Vector3)throw Error("Define NLA.V3 first");
(function(m){var n=NLA.Vector3,f=function(){var b;0==arguments.length?b=new Float64Array(16):(b=Array.prototype.concat.apply([],arguments),assert(16==b.length,"flattened.length == 16"),b=new Float64Array(b));var c=Object.create(f.prototype);Object.defineProperty(c,"m",{value:b});return c};f.prototype=Object.create(NLA.Matrix.prototype);var q={inversed:function(){return f.inverse(this)},trace:function(){return this.m[0]+this.m[5]+this.m[10]+this.m[15]},likeMatrix4x4:function(b){assert(b instanceof f,
"m4 instanceof M4");return this.m.every(function(c,a){return NLA.equals(c,b.m[a])})},transposed:function(){return f.transpose(this)},times:function(b){return f.multiply(this,b)},transformPoint:function(b){assertVectors(b);var c=this.m,a=b.x,d=b.y;b=b.z;var e=a*c[12]+d*c[13]+b*c[14]+1*c[15];return n.create((a*c[0]+d*c[1]+b*c[2]+1*c[3])/e,(a*c[4]+d*c[5]+b*c[6]+1*c[7])/e,(a*c[8]+d*c[9]+b*c[10]+1*c[11])/e)},transformVector:function(b){assertVectors(b);var c=this.m,a=b.x*c[12]+b.y*c[13]+b.z*c[14];assert(0==
a,"w != 0 needs to be true for this to make sense (w ="+a);return n.create(c[0]*b.x+c[1]*b.y+c[2]*b.z,c[4]*b.x+c[5]*b.y+c[6]*b.z,c[8]*b.x+c[9]*b.y+c[10]*b.z)},transformedPoints:function(b){var c=this;return b.map(function(a){return c.transformPoint(a)})},transformedVectors:function(b){var c=this;return b.map(function(a){return c.transformVector(a)})},plus:function(b){for(var c=f(),a=0;16>a;a++)c.m[a]=this.m[a]+b.m[a];return c},minus:function(b){for(var c=f(),a=0;16>a;a++)c.m[a]=this.m[a]-b.m[a];return c},
timesScalar:function(b){for(var c=f(),a=0;16>a;a++)c.m[a]=this.m[a]*b;return c},divScalar:function(b){for(var c=f(),a=0;16>a;a++)c.m[a]=this.m[a]/b;return c},clone:function(){return f.copy(this)},copy:function(){return f.copy(this)},isRegular:function(){return!NLA.isZero(this.determinant())},isAxisAligned:function(){var b=this.m;return 1>=!NLA.isZero(b[0])+!NLA.isZero(b[1])+!NLA.isZero(b[2])&&1>=!NLA.isZero(b[4])+!NLA.isZero(b[5])+!NLA.isZero(b[6])&&1>=!NLA.isZero(b[8])+!NLA.isZero(b[9])+!NLA.isZero(b[10])},
isOrthogonal:function(){var b=f.temp0,c=f.temp1;f.transpose(this,b);f.multiply(this,b,c);f.identity(b);return b.likeMatrix4x4(c)},determinant:function(){var b=this.m,c=b[4],a=b[5],d=b[6],e=b[7],f=b[8],g=b[9],h=b[10],k=b[11],m=b[12],n=b[13],q=b[14],r=b[15],t=h*r-k*q,u=g*r-k*n,v=g*q-h*n,k=f*r-k*m,h=f*q-h*m,f=f*n-g*m;return b[0]*(a*t-d*u+e*v)-b[1]*(c*t-d*k+e*h)+b[2]*(c*u-a*k+e*f)-b[3]*(c*v-a*h+d*f)},isMirroring:function(){return 0>this.determinant()},getTranslation:function(){var b=this.m,c=b[15];return n.create(b[3]/
c,b[7]/c,b[11]/c)},normalized:function(){var b=this.determinant();return 1==b?this:this.divScalar(Math.sqrt(Math.sqrt(b)))},is3x3:function(){var b=this.m;return NLA.equals(1,b[15])&&NLA.isZero(b[12])&&NLA.isZero(b[13])&&NLA.isZero(b[14])&&NLA.isZero(b[3])&&NLA.isZero(b[7])&&NLA.isZero(b[11])},isIdentity:function(){return this.m.every(function(b,c){return(c/4|0)==c%4?NLA.equals(1,b):NLA.isZero(b)})},toString:function(b){b=b||function(a){return a.toFixed(6).replace(/(0|\.)(?=0*$)/g," ").toString()};
assert("string"==typeof b(0),""+typeof b(0));var c=Array.prototype.slice.call(this.m).map(b),a=[0,1,2,3].map(function(a){return c.sliceStep(a,4).map(function(a){return a.length}).max()});return[0,1,2,3].map(function(b){return c.slice(4*b,4*b+4).map(function(b,c){return NLA.repeatString(a[c]-b.length," ")+b}).join(" ")}).join("\n")}},r;for(r in q)f.prototype[r]=q[r];if.inverse=function(b,c){assert(b instanceof f,"matrix instanceof M4");assert(!c||c instanceof f,"!result || result instanceof M4");assert(b!=
c,"matrix != result");c=c||f();var a=b.m,d=c.m;d[0]=a[5]*a[10]*a[15]-a[5]*a[14]*a[11]-a[6]*a[9]*a[15]+a[6]*a[13]*a[11]+a[7]*a[9]*a[14]-a[7]*a[13]*a[10];d[1]=-a[1]*a[10]*a[15]+a[1]*a[14]*a[11]+a[2]*a[9]*a[15]-a[2]*a[13]*a[11]-a[3]*a[9]*a[14]+a[3]*a[13]*a[10];d[2]=a[1]*a[6]*a[15]-a[1]*a[14]*a[7]-a[2]*a[5]*a[15]+a[2]*a[13]*a[7]+a[3]*a[5]*a[14]-a[3]*a[13]*a[6];d[3]=-a[1]*a[6]*a[11]+a[1]*a[10]*a[7]+a[2]*a[5]*a[11]-a[2]*a[9]*a[7]-a[3]*a[5]*a[10]+a[3]*a[9]*a[6];d[4]=-a[4]*a[10]*a[15]+a[4]*a[14]*a[11]+a[6]*
a[8]*a[15]-a[6]*a[12]*a[11]-a[7]*a[8]*a[14]+a[7]*a[12]*a[10];d[5]=a[0]*a[10]*a[15]-a[0]*a[14]*a[11]-a[2]*a[8]*a[15]+a[2]*a[12]*a[11]+a[3]*a[8]*a[14]-a[3]*a[12]*a[10];d[6]=-a[0]*a[6]*a[15]+a[0]*a[14]*a[7]+a[2]*a[4]*a[15]-a[2]*a[12]*a[7]-a[3]*a[4]*a[14]+a[3]*a[12]*a[6];d[7]=a[0]*a[6]*a[11]-a[0]*a[10]*a[7]-a[2]*a[4]*a[11]+a[2]*a[8]*a[7]+a[3]*a[4]*a[10]-a[3]*a[8]*a[6];d[8]=a[4]*a[9]*a[15]-a[4]*a[13]*a[11]-a[5]*a[8]*a[15]+a[5]*a[12]*a[11]+a[7]*a[8]*a[13]-a[7]*a[12]*a[9];d[9]=-a[0]*a[9]*a[15]+a[0]*a[13]*
a[11]+a[1]*a[8]*a[15]-a[1]*a[12]*a[11]-a[3]*a[8]*a[13]+a[3]*a[12]*a[9];d[10]=a[0]*a[5]*a[15]-a[0]*a[13]*a[7]-a[1]*a[4]*a[15]+a[1]*a[12]*a[7]+a[3]*a[4]*a[13]-a[3]*a[12]*a[5];d[11]=-a[0]*a[5]*a[11]+a[0]*a[9]*a[7]+a[1]*a[4]*a[11]-a[1]*a[8]*a[7]-a[3]*a[4]*a[9]+a[3]*a[8]*a[5];d[12]=-a[4]*a[9]*a[14]+a[4]*a[13]*a[10]+a[5]*a[8]*a[14]-a[5]*a[12]*a[10]-a[6]*a[8]*a[13]+a[6]*a[12]*a[9];d[13]=a[0]*a[9]*a[14]-a[0]*a[13]*a[10]-a[1]*a[8]*a[14]+a[1]*a[12]*a[10]+a[2]*a[8]*a[13]-a[2]*a[12]*a[9];d[14]=-a[0]*a[5]*a[14]+
a[0]*a[13]*a[6]+a[1]*a[4]*a[14]-a[1]*a[12]*a[6]-a[2]*a[4]*a[13]+a[2]*a[12]*a[5];d[15]=a[0]*a[5]*a[10]-a[0]*a[9]*a[6]-a[1]*a[4]*a[10]+a[1]*a[8]*a[6]+a[2]*a[4]*a[9]-a[2]*a[8]*a[5];for(var a=a[0]*d[0]+a[1]*d[4]+a[2]*d[8]+a[3]*d[12],e=16;e--;)d[e]/=a;return c};f.transpose=function(b,c){assert(b instanceof f,"matrix instanceof M4");assert(!c||c instanceof f,"!result || result instanceof M4");assert(b!=c,"matrix != result");c=c||f();var a=b.m,d=c.m;d[0]=a[0];d[1]=a[4];d[2]=a[8];d[3]=a[12];d[4]=a[1];d[5]=
a[5];d[6]=a[9];d[7]=a[13];d[8]=a[2];d[9]=a[6];d[10]=a[10];d[11]=a[14];d[12]=a[3];d[13]=a[7];d[14]=a[11];d[15]=a[15];return c};f.multiply=function(b,c,a){assert(b instanceof f,"left instanceof M4");assert(c instanceof f,"right instanceof M4");assert(!a||a instanceof f,"!result || result instanceof M4");assert(b!=a,"left != result");assert(c!=a,"right != result");a=a||f();b=b.m;c=c.m;var d=a.m;d[0]=b[0]*c[0]+b[1]*c[4]+b[2]*c[8]+b[3]*c[12];d[1]=b[0]*c[1]+b[1]*c[5]+b[2]*c[9]+b[3]*c[13];d[2]=b[0]*c[2]+
b[1]*c[6]+b[2]*c[10]+b[3]*c[14];d[3]=b[0]*c[3]+b[1]*c[7]+b[2]*c[11]+b[3]*c[15];d[4]=b[4]*c[0]+b[5]*c[4]+b[6]*c[8]+b[7]*c[12];d[5]=b[4]*c[1]+b[5]*c[5]+b[6]*c[9]+b[7]*c[13];d[6]=b[4]*c[2]+b[5]*c[6]+b[6]*c[10]+b[7]*c[14];d[7]=b[4]*c[3]+b[5]*c[7]+b[6]*c[11]+b[7]*c[15];d[8]=b[8]*c[0]+b[9]*c[4]+b[10]*c[8]+b[11]*c[12];d[9]=b[8]*c[1]+b[9]*c[5]+b[10]*c[9]+b[11]*c[13];d[10]=b[8]*c[2]+b[9]*c[6]+b[10]*c[10]+b[11]*c[14];d[11]=b[8]*c[3]+b[9]*c[7]+b[10]*c[11]+b[11]*c[15];d[12]=b[12]*c[0]+b[13]*c[4]+b[14]*c[8]+b[15]*
c[12];d[13]=b[12]*c[1]+b[13]*c[5]+b[14]*c[9]+b[15]*c[13];d[14]=b[12]*c[2]+b[13]*c[6]+b[14]*c[10]+b[15]*c[14];d[15]=b[12]*c[3]+b[13]*c[7]+b[14]*c[11]+b[15]*c[15];return a};f.copy=function(b,c){assert(b instanceof f,"src instanceof M4");assert(!c||c instanceof f,"!result || result instanceof M4");assert(c!=b,"result != src");c=c||f();for(var a=b.m,d=c.m,e=16;e--;)d[e]=a[e];return c};f.forSys=function(b,c,a,d){assert(b instanceof n,"e0 instanceof V3");assert(c instanceof n,"e1 instanceof V3");assert(!a||
a instanceof n,"!e2 || e2 instanceof V3");assert(!d||d instanceof n,"!origin || origin instanceof V3");a=a||b.cross(c);d=d||n.ZERO;return f(b.x,c.x,a.x,d.x,b.y,c.y,a.y,d.y,b.z,c.z,a.z,d.z,0,0,0,1)};f.forRows=function(b,c,a){assertVectors(b,c,a);return f(b.x,b.y,b.z,0,c.x,c.y,c.z,0,a.x,a.y,a.z,0,0,0,0,1)};f.identity=function(b){assert(!b||b instanceof f,"!result || result instanceof M4");b=b||f();var c=b.m;c[0]=c[5]=c[10]=c[15]=1;c[1]=c[2]=c[3]=c[4]=c[6]=c[7]=c[8]=c[9]=c[11]=c[12]=c[13]=c[14]=0;return b};
f.fromFunction=function(b,c){assert("function"==typeof b,'typeof f == "function"'+typeof b);assert(!c||c instanceof f,"!result || result instanceof M4");c=c||f();for(var a=c.m,d=16;d--;)a[d]=b(Math.floor(d/4),d%4,d);return c};f.perspective=function(b,c,a,d,e){assert(!e||e instanceof f,"!result || result instanceof M4");assertNumbers(b,c,a,d);b=Math.tan(b*Math.PI/360)*a;c*=b;return f.frustum(-c,c,-b,b,a,d,e)};f.frustum=function(b,c,a,d,e,l,g){assertNumbers(b,c,a,d,e,l);assert(0>e,"0 > n");assert(e<
l,"n < f");assert(!g||g instanceof f,"!result || result instanceof M4");g=g||f();var h=g.m;h[0]=2*e/(c-b);h[1]=0;h[2]=(c+b)/(c-b);h[3]=0;h[4]=0;h[5]=2*e/(d-a);h[6]=(d+a)/(d-a);h[7]=0;h[8]=0;h[9]=0;h[10]=-(l+e)/(l-e);h[11]=-2*l*e/(l-e);h[12]=0;h[13]=0;h[14]=-1;h[15]=0;return g};f.projectPlanePoint=function(b,c,a){assertVectors(b);assert(c instanceof P3);console.log("p",b.ss,c);assert(!a||a instanceof f,"!result || result instanceof M4");a=a||f();var d=a.m,e=c.normal;c=c.w;var l=e.dot(b);d[0]=b.x*e.x+
c-l;d[1]=b.x*e.y;d[2]=b.x*e.z;d[3]=-c*b.x;d[4]=b.y*e.x;d[5]=b.y*e.y+c-l;d[6]=b.y*e.z;d[7]=-c*b.y;d[8]=b.z*e.x;d[9]=b.z*e.y;d[10]=b.z*e.z+c-l;d[11]=-c*b.z;d[12]=e.x;d[13]=e.y;d[14]=e.z;d[15]=-l;console.log(d);return a};f.ortho=function(b,c,a,d,e,l,g){assertNumbers(b,c,a,d,e,l);assert(!g||g instanceof f,"!result || result instanceof M4");g=g||f();var h=g.m;h[0]=2/(c-b);h[1]=0;h[2]=0;h[3]=-(c+b)/(c-b);h[4]=0;h[5]=2/(d-a);h[6]=0;h[7]=-(d+a)/(d-a);h[8]=0;h[9]=0;h[10]=-2/(l-e);h[11]=-(l+e)/(l-e);h[12]=
0;h[13]=0;h[14]=0;h[15]=1;return g};f.scaling=function(b,c,a,d){1==arguments.length||2==arguments.length?(assert(b instanceof n,"x instanceof V3"),d=c,c=b.y,a=b.z,b=b.x):(assert(3==arguments.length||4==arguments.length,"3 == arguments.length || 4 == arguments.length"),assertNumbers(b,c,a));assert(!d||d instanceof f,"!result || result instanceof M4");d=d||f();var e=d.m;e[0]=b;e[1]=0;e[2]=0;e[3]=0;e[4]=0;e[5]=c;e[6]=0;e[7]=0;e[8]=0;e[9]=0;e[10]=a;e[11]=0;e[12]=0;e[13]=0;e[14]=0;e[15]=1;return d};f.translation=
function(b,c,a,d){1==arguments.length||2==arguments.length?(assert(b instanceof n,""+b),d=c,c=b.y,a=b.z,b=b.x):(assert(3==arguments.length||4==arguments.length,"3 == arguments.length || 4 == arguments.length"),assertNumbers(b,c,a));assert(!d||d instanceof f,"!result || result instanceof M4");d=d||f();var e=d.m;e[0]=1;e[1]=0;e[2]=0;e[3]=b;e[4]=0;e[5]=1;e[6]=0;e[7]=c;e[8]=0;e[9]=0;e[10]=1;e[11]=a;e[12]=0;e[13]=0;e[14]=0;e[15]=1;return d};f.rotation=function(b,c,a,d,e){2==arguments.length||3==arguments.length?
(assert(c instanceof n,"x instanceof V3"),assertNumbers(b),e=a,a=c.y,d=c.z,c=c.x):(assert(4==arguments.length||5==arguments.length,"4 == arguments.length || 5 == arguments.length"),assertNumbers(b,c,a,d));assert(!e||e instanceof f,"!result || result instanceof M4");assert(!n(c,a,d).isZero(),"!V3(x, y, z).isZero()");e=e||f();var l=e.m,g=Math.sqrt(c*c+a*a+d*d);c/=g;a/=g;d/=g;var g=Math.cos(b),h=Math.sin(b),k=1-g;l[0]=c*c*k+g;l[1]=c*a*k-d*h;l[2]=c*d*k+a*h;l[3]=0;l[4]=a*c*k+d*h;l[5]=a*a*k+g;l[6]=a*d*
k-c*h;l[7]=0;l[8]=d*c*k-a*h;l[9]=d*a*k+c*h;l[10]=d*d*k+g;l[11]=0;l[12]=0;l[13]=0;l[14]=0;l[15]=1;return e};f.lookAt=function(b,c,a,d){assert(3==arguments.length||4==arguments.length,"3 == arguments.length || 4 == arguments.length");NLA.assertVectors(b,c,a);assert(!d||d instanceof f,"!result || result instanceof M4");d=d||f();var e=d.m,l=b.minus(c).unit(),g=a.cross(l).unit(),h=l.cross(g).unit();e[0]=g.x;e[1]=g.y;e[2]=g.z;e[3]=-g.dot(b);e[4]=h.x;e[5]=h.y;e[6]=h.z;e[7]=-h.dot(b);e[8]=l.x;e[9]=l.y;e[10]=
l.z;e[11]=-l.dot(b);e[12]=0;e[13]=0;e[14]=0;e[15]=1;return d};f.rotationX=function(b){assertNumbers(b);var c=Math.cos(b);b=Math.sin(b);return f([1,0,0,0,0,c,-b,0,0,b,c,0,0,0,0,1])};f.rotationY=function(b){var c=Math.cos(b);b=Math.sin(b);return f([c,0,b,0,0,1,0,0,-b,0,c,0,0,0,0,1])};f.rotationZ=function(b){var c=Math.cos(b);b=Math.sin(b);return f([c,-b,0,0,b,c,0,0,0,0,1,0,0,0,0,1])};f.rotationLine=function(b,c,a,d){assert(b instanceof n,"rotationCenter instanceof V3");assert(c instanceof n,"rotationAxis instanceof V3");
assert(!d||d instanceof f,"!result || result instanceof M4");d=d||f();c=c.normalized();var e=b.x,l=b.y;b=b.z;var g=c.x,h=c.y;c=c.z;var k=d.m,m=Math.cos(a);a=Math.sin(a);k[0]=g*g+(h*h+c*c)*m;k[1]=g*h*(1-m)-c*a;k[2]=g*c*(1-m)+h*a;k[3]=(e*(h*h+c*c)-g*(l*h+b*c))*(1-m)+(l*c-b*h)*a;k[4]=g*h*(1-m)+c*a;k[5]=h*h+(g*g+c*c)*m;k[6]=h*c*(1-m)-g*a;k[7]=(l*(g*g+c*c)-h*(e*g+b*c))*(1-m)+(b*g-e*c)*a;k[8]=g*c*(1-m)-h*a;k[9]=h*c*(1-m)+g*a;k[10]=c*c+(g*g+h*h)*m;k[11]=(b*(g*g+h*h)-c*(e*g+l*h))*(1-m)+(e*h-l*g)*a;k[12]=
0;k[13]=0;k[14]=0;k[15]=1;return d};f.mirroring=function(b,c){assert(b instanceof P3,"plane instanceof P3");assert(!c||c instanceof f,"!result || result instanceof M4");var a=b.normal.x,d=b.normal.y,e=b.normal.z,l=b.w;c=c||f();var g=c.m;g[0]=1-2*a*a;g[1]=-2*d*a;g[2]=-2*e*a;g[3]=0;g[4]=-2*a*d;g[5]=1-2*d*d;g[6]=-2*e*d;g[7]=0;g[8]=-2*a*e;g[9]=-2*d*e;g[10]=1-2*e*e;g[11]=0;g[12]=2*a*l;g[13]=2*d*l;g[14]=2*e*l;g[15]=1;return c};f.projection=function(b,c,a){assert(b instanceof P3,"plane instanceof P3");assert(!c||
c instanceof n,"!dir || dir instanceof V3");assert(!a||a instanceof f,"!result || result instanceof M4");c=c||b.normal;var d=b.normal.x,e=b.normal.y,l=b.normal.z,g=c,h=g.x,k=g.y,g=g.z,m=b.w;a=a||f();var p=a.m;b=b.normal.dot(c);h/=b;k/=b;g/=b;p[0]=1-d*h;p[1]=-e*h;p[2]=-l*h;p[3]=h*m;p[4]=-d*k;p[5]=1-e*k;p[6]=-l*k;p[7]=k*m;p[8]=-d*g;p[9]=-e*g;p[10]=1-l*g;p[11]=g*m;p[12]=0;p[13]=0;p[14]=0;p[15]=1;return a};f.lineProjection=function(b,c){assert(b instanceof L3,b instanceof L3);assert(!c||c instanceof f,
"!result || result instanceof M4");var a=b.dir1.x,d=b.dir1.y,e=b.dir1.z,l=b.anchor.x,g=b.anchor.y,h=b.anchor.z;c=c||f();var k=c.m;k[0]=a*a;k[1]=a*d;k[2]=a*e;k[3]=l;k[4]=d*a;k[5]=d*d;k[6]=d*e;k[7]=g;k[8]=e*a;k[9]=e*d;k[10]=e*e;k[11]=h;k[12]=0;k[13]=0;k[14]=0;k[15]=1};f.multiplyMultiple=function(){var b=arguments;if(0==b.length)return f.identity();for(var c=f(),a=b[0].copy(),d=1;d<b.length;d++)f.multiply(a,b[d],c),a=$jscomp.makeIterator([a,c]),c=a.next().value,a=a.next().value;return a};f.pointInversion=
function(b,c){assert(b instanceof n,"p instanceof V3");assert(!c||c instanceof f,"!result || result instanceof M4");c=c||f();var a=c.m;a[0]=-1;a[1]=0;a[2]=0;a[3]=2*b.x;a[4]=0;a[5]=-1;a[6]=0;a[7]=2*b.y;a[8]=0;a[9]=0;a[10]=-1;a[11]=2*b.z;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return c};f.temp0=f();f.temp1=f();f.FOO=f(0,1,1,2,3,4,8,13,21,34,55,89,0,0,0,1);f.BAR=f.FOO.inversed();m.Matrix4x4=f})(NLA);