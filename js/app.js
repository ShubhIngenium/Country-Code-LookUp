/* Lookup logic: number/code/name search, result panel, popular chips */
(function(){
var D=window.CCL_DATA;
var X=CCLMap.clear,M=CCLMap.marker,T=CCLMap.flyTo,R=CCLMap.reset;
var A=document.getElementById("a");
var B=document.getElementById("b");
var C=document.getElementById("c");
var E=document.getElementById("e");
var F=document.getElementById("f");
var O=document.getElementById("o");

var CS='<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19.3 5.9c.4-.4.9-.4 1.3 0 .4.4.4.9 0 1.3L9.7 18.1c-.4.4-.9.4-1.3 0L3.4 13.1c-.4-.4-.4-.9 0-1.3.4-.4.9-.4 1.3 0l4.3 4.3 10.3-10.2z" fill="currentColor"/></svg>';
var WS='<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 7c-.5 0-.9.4-.9.8v6.4c0 .5.4.8.9.8.5 0 .9-.4.9-.8V7.8c0-.5-.4-.8-.9-.8zm0 9.6c0 .5-.4.9-.9.9-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9.5 0 .9.4.9.9z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 3.6C13.4 1.6 10.6 1.6 9.5 3.6L1.7 17c-1.1 2 .3 4.4 2.5 4.4h15.6c2.2 0 3.6-2.4 2.5-4.4L14.5 3.6zm-3.5.9c.4-.7 1.5-.7 1.9 0l7.8 13.5c.4.7 0 1.7-.9 1.7H4.2c-.8 0-1.4-1-.9-1.7L11 4.5z" fill="currentColor"/></svg>';

/* forward (number -> code) and reverse (name -> code) lookup */
function FC(raw){
var v=raw.replace(/[\s\-().]/g,"").trim();
if(!v)return null;
var vv=v.replace(/^\+/,"");
if(/^\d+$/.test(vv)){
var m=[];
for(var i=0;i<D.length;i++){var it=D[i];if(!it.d)continue;if(vv===it.d)m.push(it);else if(vv.startsWith(it.d))m.push(it);}
if(m.length===0)return null;
m.sort(function(a,b){var ea=vv===a.d?2:vv.startsWith(a.d)?1:0;var eb=vv===b.d?2:vv.startsWith(b.d)?1:0;if(eb!==ea)return eb-ea;return b.d.length-a.d.length;});
var b=m[0];var s=m.filter(function(x){return x.d===b.d;});
return{item:b,name:s.map(function(x){return x.c;}).join(" / "),all:s,byName:false};
}
var q=v.toLowerCase();
var n=D.filter(function(it){return it.c.toLowerCase().indexOf(q)!==-1;});
if(!n.length)return null;
n.sort(function(a,b){
var ia=a.c.toLowerCase().indexOf(q),ib=b.c.toLowerCase().indexOf(q);
if(ia!==ib)return ia-ib;
return a.c.length-b.c.length;
});
return{item:n[0],name:n.map(function(x){return x.c;}).join(" / "),all:n,byName:true};
}

function U(){
var raw=A.value;
var match=FC(raw);
if(!raw.trim()){B.classList.remove("show");X();return;}
B.classList.add("show");X();
if(match){
C.className="result-header match";
C.innerHTML=CS+'<span class="result-title">'+match.name+"</span>";
if(match.byName){
E.textContent="Country code +"+match.item.d;
F.textContent=match.all.length>1?match.all.length+" matches":"Code: +"+match.item.d;
}else{
E.textContent="Country code +"+match.item.d;
var others=match.all.length>1?"Also: "+match.all.slice(1).map(function(m){return m.c;}).join(", "):"";
F.textContent=others||"Code: +"+match.item.d;
}
for(var i=0;i<match.all.length;i++){var m=match.all[i];if(m.la!==undefined&&m.lo!==undefined){M(m.la,m.lo,m.c);}}
if(match.all.length>0&&match.all[0].la!==undefined){T(match.all[0].la,match.all[0].lo,3);}
}else{
C.className="result-header nomatch";
C.innerHTML=WS+'<span class="result-title">No match found</span>';
E.textContent="Could not identify a country or code. Try +91, India, or Japan.";
F.textContent="";R();
}
}

A.addEventListener("input",U);

var pop=["1","44","91","86","49","33","81","61","27","234","254","221","971","65","82"];
var M2={};
for(var i=0;i<D.length;i++){if(!M2[D[i].d])M2[D[i].d]=[];M2[D[i].d].push(D[i]);}
for(var ci=0;ci<pop.length;ci++){
var cd=pop[ci];var it=M2[cd];if(!it)continue;
var nm=it.map(function(x){return x.c;}).join(" / ");
var ch=document.createElement("div");ch.className="cp";
ch.innerHTML='<span class="cd">+'+cd+"</span>"+nm;
ch.addEventListener("click",function(c){return function(){A.value="+"+c;U();};}(cd));
O.appendChild(ch);
}
})();
