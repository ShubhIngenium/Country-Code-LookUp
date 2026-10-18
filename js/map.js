/* SVG world map: pan, zoom, markers. Exposes window.CCLMap */
(function(){
var G=document.getElementById("g");
var H=document.getElementById("h");

var V={x:0,y:0,w:1000,h:500};
var Z=1;

function clamp(v,mn,mx){return Math.max(mn,Math.min(mx,v));}
function L(lat,lon){return{x:(lon+180)/360*1000,y:(90-lat)/180*500};}
function S(){G.setAttribute("viewBox",V.x+" "+V.y+" "+V.w+" "+V.h);}

function zoomAt(f,px,py){
var r=G.getBoundingClientRect();
var cx,cy;
if(px!==undefined){cx=V.x+(px-r.left)/r.width*V.w;cy=V.y+(py-r.top)/r.height*V.h;}
else{cx=V.x+V.w/2;cy=V.y+V.h/2;}
Z=clamp(Z*f,1,8);
V.w=1000/Z;V.h=500/Z;
V.x=clamp(cx-V.w/2,0,1000-V.w);
V.y=clamp(cy-V.h/2,0,500-V.h);
S();
}

function T(lat,lon,z){
var p=L(lat,lon);
var n=z||3;
var tw=1000/n,th=500/n;
V.x=clamp(p.x-tw/2,0,1000-tw);
V.y=clamp(p.y-th/2,0,500-th);
V.w=tw;V.h=th;Z=n;
S();
}

function R(){V={x:0,y:0,w:1000,h:500};Z=1;S();}

document.getElementById("j").onclick=function(){zoomAt(1.5);};
document.getElementById("k").onclick=function(){zoomAt(1/1.5);};
document.getElementById("l").onclick=R;

/* drag-to-pan */
var drag=null;
G.addEventListener("pointerdown",function(e){drag={x:e.clientX,y:e.clientY,vx:V.x,vy:V.y};try{G.setPointerCapture(e.pointerId);}catch(err){}});
G.addEventListener("pointermove",function(e){
if(!drag)return;
var r=G.getBoundingClientRect();
V.x=clamp(drag.vx-(e.clientX-drag.x)*V.w/r.width,0,1000-V.w);
V.y=clamp(drag.vy-(e.clientY-drag.y)*V.h/r.height,0,500-V.h);
S();
});
G.addEventListener("pointerup",function(){drag=null;});
G.addEventListener("pointercancel",function(){drag=null;});
G.addEventListener("dblclick",function(e){zoomAt(1.6,e.clientX,e.clientY);});

function X(){H.innerHTML="";}

function M(lat,lon,name){
var p=L(lat,lon);
var g=document.createElementNS("http://www.w3.org/2000/svg","g");
var u=document.createElementNS("http://www.w3.org/2000/svg","circle");
u.setAttribute("cx",p.x);u.setAttribute("cy",p.y);u.setAttribute("class","mp a");g.appendChild(u);
var d=document.createElementNS("http://www.w3.org/2000/svg","circle");
d.setAttribute("cx",p.x);d.setAttribute("cy",p.y);d.setAttribute("r","4");d.setAttribute("class","mk");g.appendChild(d);
var w=Math.max(40,name.length*6.2+12);
var lx=clamp(p.x,w/2,1000-w/2);
var ly=clamp(p.y-22,2,482);
var r=document.createElementNS("http://www.w3.org/2000/svg","rect");
r.setAttribute("x",lx-w/2);r.setAttribute("y",ly);r.setAttribute("width",w);r.setAttribute("height","16");r.setAttribute("rx","4");r.setAttribute("class","mbg");g.appendChild(r);
var t=document.createElementNS("http://www.w3.org/2000/svg","text");
t.setAttribute("x",lx);t.setAttribute("y",ly+12);t.setAttribute("class","mlb");t.textContent=name;g.appendChild(t);
H.appendChild(g);
}

window.CCLMap={marker:M,clear:X,flyTo:T,reset:R};
})();
