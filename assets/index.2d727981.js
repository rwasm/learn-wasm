var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,r=Object.getOwnPropertySymbols,o=Object.prototype.propertyIsEnumerable,n=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o,a=(e,a)=>{for(var l in a||(a={}))t.call(a,l)&&n(e,l,a[l]);if(r)for(var l of r(a))o.call(a,l)&&n(e,l,a[l]);return e};import{r as l,R as c,S as s,H as m,a as p}from"./vendor.77fae5f1.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(r){const o=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((r,a)=>{const l=new URL(e,o);if(self[t].moduleMap[l])return r(self[t].moduleMap[l]);const c=new Blob([`import * as m from '${l}';`,`${t}.moduleMap['${l}']=m;`],{type:"text/javascript"}),s=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){a(new Error(`Failed to import: ${e}`)),n(s)},onload(){r(self[t].moduleMap[l]),n(s)}});document.head.appendChild(s)})),self[t].moduleMap={}}}("/assets/");const i=e=>l.createElement(l.Suspense,{fallback:e.fallback||null},l.createElement(c,{path:e.path,render:t=>e.component&&l.createElement(e.component,a(a({},t),{routes:e.routes}))})),u=({routes:e})=>l.createElement(s,null,e.map((e=>l.createElement(i,a({key:e.path},e)))));let d;const f={},_=function(e,t){if(!t)return e();if(void 0===d){const e=document.createElement("link").relList;d=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in f)return;f[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":d,t||(o.as="script",o.crossOrigin=""),o.href=e,document.head.appendChild(o),t?new Promise(((e,t)=>{o.addEventListener("load",e),o.addEventListener("error",t)})):void 0}))).then((()=>e()))},E=[{title:"chasm",path:"/rsw/chasm",component:l.lazy((()=>_((()=>__import__("./chasm.38e73bce.js")),["/assets/chasm.38e73bce.js","/assets/vendor.77fae5f1.js"]))),exact:!0},{title:"game of life",path:"/rsw/game-of-life",component:l.lazy((()=>_((()=>__import__("./game_of_life.f77293d0.js")),["/assets/game_of_life.f77293d0.js","/assets/vendor.77fae5f1.js"]))),exact:!0},{title:"ffmpeg",path:"/ffmpeg",component:l.lazy((()=>_((()=>__import__("./ffmpeg.030ac5f6.js")),["/assets/ffmpeg.030ac5f6.js","/assets/vendor.77fae5f1.js"]))),exact:!0},{title:"excel read",path:"/rsw/excel-read",component:l.lazy((()=>_((()=>__import__("./excel_read.5463b2d7.js")),["/assets/excel_read.5463b2d7.js","/assets/vendor.77fae5f1.js"]))),exact:!0},{path:"/",component:l.lazy((()=>_((()=>__import__("./home.4fa0696f.js")),["/assets/home.4fa0696f.js","/assets/vendor.77fae5f1.js"])))}];function h(){return l.createElement(m,null,l.createElement(u,{routes:E}))}p.render(l.createElement(l.StrictMode,null,l.createElement(h,null)),document.getElementById("root"));export{E as r};
