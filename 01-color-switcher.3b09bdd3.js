const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");let o=null;t.addEventListener("click",(function(){t.setAttribute("disabled",""),o=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.3b09bdd3.js.map
