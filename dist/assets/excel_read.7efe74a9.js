const n={};import{r as e}from"./vendor.77fab89d.js";let t,r=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});r.decode();let o=null;function _(){return null!==o&&o.buffer===t.memory.buffer||(o=new Uint8Array(t.memory.buffer)),o}function i(n,e){return r.decode(_().subarray(n,n+e))}const c=new Array(32).fill(void 0);c.push(void 0,null,!0,!1);let a=c.length;function u(n){a===c.length&&c.push(c.length+1);const e=a;return a=c[e],c[e]=n,e}function f(n){return c[n]}function s(n){const e=f(n);return function(n){n<36||(c[n]=a,a=n)}(n),e}let l=0,b=new TextEncoder("utf-8");const g="function"==typeof b.encodeInto?function(n,e){return b.encodeInto(n,e)}:function(n,e){const t=b.encode(n);return e.set(t),{read:n.length,written:t.length}};function w(n,e,t){if(void 0===t){const t=b.encode(n),r=e(t.length);return _().subarray(r,r+t.length).set(t),l=t.length,r}let r=n.length,o=e(r);const i=_();let c=0;for(;c<r;c++){const e=n.charCodeAt(c);if(e>127)break;i[o+c]=e}if(c!==r){0!==c&&(n=n.slice(c)),o=t(o,r,r=c+3*n.length);const e=_().subarray(o+c,o+r);c+=g(n,e).written}return l=c,o}let d=null;function y(){return null!==d&&d.buffer===t.memory.buffer||(d=new Int32Array(t.memory.buffer)),d}function m(n,e,r){t._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcd8a63704665c6ba(n,e,u(r))}function h(n){return function(){try{return n.apply(this,arguments)}catch(e){t.__wbindgen_exn_store(u(e))}}}async function p(e){void 0===e&&(e=new URL("rsw~excel-read_bg.wasm",n.url));const r={wbg:{}};r.wbg.__wbindgen_string_new=function(n,e){return u(i(n,e))},r.wbg.__wbindgen_object_drop_ref=function(n){s(n)},r.wbg.__wbindgen_json_parse=function(n,e){return u(JSON.parse(i(n,e)))},r.wbg.__wbindgen_json_serialize=function(n,e){const r=f(e);var o=w(JSON.stringify(void 0===r?null:r),t.__wbindgen_malloc,t.__wbindgen_realloc),_=l;y()[n/4+1]=_,y()[n/4+0]=o},r.wbg.__wbg_log_068a3c36564bf7c3=function(n){console.log(s(n))},r.wbg.__wbg_alert_c3d55e19ff74a766=function(n,e){alert(i(n,e))},r.wbg.__wbg_name_8c2d827253d2d645=function(n,e){var r=w(f(e).name,t.__wbindgen_malloc,t.__wbindgen_realloc),o=l;y()[n/4+1]=o,y()[n/4+0]=r},r.wbg.__wbg_arrayBuffer_6f7692f98cd5a19f=function(n){return u(f(n).arrayBuffer())},r.wbg.__wbg_slice_aa7157d53165612d=h((function(n){return u(f(n).slice())})),r.wbg.__wbindgen_cb_drop=function(n){const e=s(n).original;if(1==e.cnt--)return e.a=0,!0;return!1},r.wbg.__wbg_call_f5e0576f61ee7461=h((function(n,e,t){return u(f(n).call(f(e),f(t)))})),r.wbg.__wbg_new_3ea8490cd276c848=function(n,e){try{var r={a:n,b:e},o=new Promise(((n,e)=>{const o=r.a;r.a=0;try{return function(n,e,r,o){t.wasm_bindgen__convert__closures__invoke2_mut__he8bd654e12b4ee40(n,e,u(r),u(o))}(o,r.b,n,e)}finally{r.a=o}}));return u(o)}finally{r.a=r.b=0}},r.wbg.__wbg_resolve_778af3f90b8e2b59=function(n){return u(Promise.resolve(f(n)))},r.wbg.__wbg_then_367b3e718069cfb9=function(n,e){return u(f(n).then(f(e)))},r.wbg.__wbg_then_ac66ca61394bfd21=function(n,e,t){return u(f(n).then(f(e),f(t)))},r.wbg.__wbg_buffer_ebc6c8e75510eae3=function(n){return u(f(n).buffer)},r.wbg.__wbg_new_135e963dedf67b22=function(n){return u(new Uint8Array(f(n)))},r.wbg.__wbg_set_4a5072a31008e0cb=function(n,e,t){f(n).set(f(e),t>>>0)},r.wbg.__wbg_length_317f0dd77f7a6673=function(n){return f(n).length},r.wbg.__wbindgen_string_get=function(n,e){const r=f(e);var o="string"==typeof r?r:void 0,_=null==o?0:w(o,t.__wbindgen_malloc,t.__wbindgen_realloc),i=l;y()[n/4+1]=i,y()[n/4+0]=_},r.wbg.__wbindgen_throw=function(n,e){throw new Error(i(n,e))},r.wbg.__wbindgen_memory=function(){return u(t.memory)},r.wbg.__wbindgen_closure_wrapper202=function(n,e,r){return u(function(n,e,r,o){const _={a:n,b:e,cnt:1,dtor:r},i=(...n)=>{_.cnt++;const e=_.a;_.a=0;try{return o(e,_.b,...n)}finally{0==--_.cnt?t.__wbindgen_export_2.get(_.dtor)(e,_.b):_.a=e}};return i.original=_,i}(n,e,62,m))},("string"==typeof e||"function"==typeof Request&&e instanceof Request||"function"==typeof URL&&e instanceof URL)&&(e=fetch(e));const{instance:o,module:_}=await async function(n,e){if("function"==typeof Response&&n instanceof Response){if("function"==typeof WebAssembly.instantiateStreaming)try{return await WebAssembly.instantiateStreaming(n,e)}catch(t){if("application/wasm"==n.headers.get("Content-Type"))throw t;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",t)}const r=await n.arrayBuffer();return await WebAssembly.instantiate(r,e)}{const t=await WebAssembly.instantiate(n,e);return t instanceof WebAssembly.Instance?{instance:t,module:n}:t}}(await e,r);return t=o.exports,p.__wbindgen_wasm_module=_,t.__wbindgen_start(),t}function v(){const[n,r]=e.useState({});e.useEffect((()=>{p()}));return e.createElement("div",{className:"excel-read"},e.createElement("input",{type:"file",onChange:async n=>{(function(n,e,r,o){return s(t.read_excel_file(u(n),u(e),u(r),u(o)))})(n.target.files[0],[1],[],"").then((n=>{r(n)})).catch((n=>{console.error(n)}))}}),e.createElement("pre",null,JSON.stringify(n,null,2)))}export default v;