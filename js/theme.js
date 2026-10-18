/* Dark / light theme toggle (persists in localStorage) */
(function(){
var TB=document.getElementById("t");
function setTheme(t){
document.body.setAttribute("data-theme",t);
TB.textContent=t==="dark"?"☀️":"🌙";
try{localStorage.setItem("ccl-theme",t);}catch(e){}
}
var saved=null;
try{saved=localStorage.getItem("ccl-theme");}catch(e){}
var prefersDark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(saved||(prefersDark?"dark":"light"));
TB.onclick=function(){setTheme(document.body.getAttribute("data-theme")==="dark"?"light":"dark");};
})();
