var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,l=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,c=(e,t)=>{for(var r in t||(t={}))n.call(t,r)&&l(e,r,t[r]);if(o)for(var r of o(t))a.call(t,r)&&l(e,r,t[r]);return e};import{R as s,r as p,a as m,S as i,H as f,b as d}from"./vendor.c9518ce6.js";const u=e=>s.createElement(p.exports.Suspense,{fallback:e.fallback||null},s.createElement(m,{path:e.path,render:o=>{return e.component&&s.createElement(e.component,(n=c({},o),a={routes:e.routes},t(n,r(a))));var n,a}})),_=({routes:e})=>s.createElement(i,null,e.map((e=>s.createElement(u,c({key:e.path},e)))));let E;const h={},b=function(e,t){if(!t)return e();if(void 0===E){const e=document.createElement("link").relList;E=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in h)return;h[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":E,t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e()))},y=[{title:"chasm",path:"/rsw/chasm",component:p.exports.lazy((()=>b((()=>import("./chasm.c6f93dbb.js")),["/assets/chasm.c6f93dbb.js","/assets/vendor.c9518ce6.js"]))),exact:!0},{title:"game of life",path:"/rsw/game-of-life",component:p.exports.lazy((()=>b((()=>import("./game_of_life.5bbc4dfb.js")),["/assets/game_of_life.5bbc4dfb.js","/assets/vendor.c9518ce6.js"]))),exact:!0},{title:"ffmpeg",path:"/ffmpeg",component:p.exports.lazy((()=>b((()=>import("./ffmpeg.7241ff93.js")),["/assets/ffmpeg.7241ff93.js","/assets/vendor.c9518ce6.js"]))),exact:!0},{title:"excel read",path:"/rsw/excel-read",component:p.exports.lazy((()=>b((()=>import("./excel_read.11031c0d.js")),["/assets/excel_read.11031c0d.js","/assets/vendor.c9518ce6.js"]))),exact:!0},{path:"/",component:p.exports.lazy((()=>b((()=>import("./home.ca3a9f43.js")),["/assets/home.ca3a9f43.js","/assets/vendor.c9518ce6.js"])))}];function O(){return s.createElement(f,null,s.createElement(_,{routes:y}))}d.render(s.createElement(s.StrictMode,null,s.createElement(O,null)),document.getElementById("root"));export{y as r};