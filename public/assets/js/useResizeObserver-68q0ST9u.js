import{bB as C,q as P,r as R,C as T,D as S,a6 as z,be as I,p as k,w as D,G as M}from"./index-CXsQrBlN.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var j=C.expand,B=C.ripple,V=C.fade;function W(){var r=P("animation"),t=r.globalConfig,n=function(u){var c,l,i=t.value;return i&&!((c=i.exclude)!==null&&c!==void 0&&c.includes(u))&&((l=i.include)===null||l===void 0?void 0:l.includes(u))};return{keepExpand:n(j),keepRipple:n(B),keepFade:n(V)}}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function E(r,t){var n=Object.keys(t);n.forEach(function(e){r.style[e]=t[e]})}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var O=200,$="rgba(0, 0, 0, 0)",K="rgba(0, 0, 0, 0.35)",N=function(t,n){var e;if(n)return n;if(t!=null&&(e=t.dataset)!==null&&e!==void 0&&e.ripple){var u=t.dataset.ripple;return u}var c=getComputedStyle(t).getPropertyValue("--ripple-color");return c||K};function q(r,t){var n=R(null),e=T(),u=W(),c=u.keepRipple,l=function(d){var a=r.value,w=N(a,t==null?void 0:t.value);if(!(d.button!==0||!r||!c)&&!(a.classList.contains("".concat(e.value,"-is-active"))||a.classList.contains("".concat(e.value,"-is-disabled"))||a.classList.contains("".concat(e.value,"-is-checked"))||a.classList.contains("".concat(e.value,"-is-loading")))){var m=getComputedStyle(a),p=parseInt(m.borderWidth,10),s=p>0?p:0,v=a.offsetWidth,o=a.offsetHeight;n.value.parentNode===null&&(E(n.value,{position:"absolute",left:"".concat(0-s,"px"),top:"".concat(0-s,"px"),width:"".concat(v,"px"),height:"".concat(o,"px"),borderRadius:m.borderRadius,pointerEvents:"none",overflow:"hidden"}),a.appendChild(n.value));var f=document.createElement("div");E(f,{marginTop:"0",marginLeft:"0",right:"".concat(v,"px"),width:"".concat(v+20,"px"),height:"100%",transition:"transform ".concat(O,"ms cubic-bezier(.38, 0, .24, 1), background ").concat(O*2,"ms linear"),transform:"skewX(-8deg)",pointerEvents:"none",position:"absolute",zIndex:0,backgroundColor:w,opacity:"0.9"});for(var L=new WeakMap,A=a.children.length,y=0;y<A;++y){var g=a.children[y];g.style.zIndex===""&&g!==n.value&&(g.style.zIndex="1",L.set(g,!0))}var x=a.style.position?a.style.position:getComputedStyle(a).position;(x===""||x==="static")&&(a.style.position="relative"),n.value.insertBefore(f,n.value.firstChild),setTimeout(function(){f.style.transform="translateX(".concat(v,"px)")},0);var b=function(){f.style.backgroundColor=$,r.value&&(r.value.removeEventListener("pointerup",b,!1),r.value.removeEventListener("pointerleave",b,!1),setTimeout(function(){f.remove(),n.value.children.length===0&&n.value.remove()},O*2+100))};r.value.addEventListener("pointerup",b,!1),r.value.addEventListener("pointerleave",b,!1)}};S(function(){var i=r==null?void 0:r.value;i&&(n.value=document.createElement("div"),i.addEventListener("pointerdown",l,!1))}),z(function(){var i;r==null||(i=r.value)===null||i===void 0||i.removeEventListener("pointerdown",l,!1)})}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function F(r,t,n,e){var u=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"value",c=k(),l=c.emit,i=c.vnode,d=R(),a=i.props||{},w=Object.prototype.hasOwnProperty.call(a,"modelValue")||Object.prototype.hasOwnProperty.call(a,"model-value"),m=Object.prototype.hasOwnProperty.call(a,u)||Object.prototype.hasOwnProperty.call(a,I(u));return w?[t,function(p){l("update:modelValue",p);for(var s=arguments.length,v=new Array(s>1?s-1:0),o=1;o<s;o++)v[o-1]=arguments[o];e==null||e.apply(void 0,[p].concat(v))}]:m?[r,function(p){l("update:".concat(u),p);for(var s=arguments.length,v=new Array(s>1?s-1:0),o=1;o<s;o++)v[o-1]=arguments[o];e==null||e.apply(void 0,[p].concat(v))}]:(d.value=n,[d,function(p){d.value=p;for(var s=arguments.length,v=new Array(s>1?s-1:0),o=1;o<s;o++)v[o-1]=arguments[o];e==null||e.apply(void 0,[p].concat(v))}])}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var h=new Set,G={warn:function(t,n){console.warn("TDesign ".concat(t," Warn: ").concat(n))},warnOnce:function(t,n){var e="TDesign ".concat(t," Warn: ").concat(n);h.has(e)||(h.add(e),console.warn(e))},error:function(t,n){console.error("TDesign ".concat(t," Error: ").concat(n))},errorOnce:function(t,n){var e="TDesign ".concat(t," Error: ").concat(n);h.has(e)||(h.add(e),console.error(e))},info:function(t,n){console.info("TDesign ".concat(t," Info: ").concat(n))}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function H(r,t){if(!(typeof window>"u")){var n=window&&window.ResizeObserver;if(n){var e=null,u=function(){!e||!r.value||(e.unobserve(r.value),e.disconnect(),e=null)},c=function(i){e=new ResizeObserver(t),e.observe(i)};r&&D(r,function(l){u(),l&&c(l)},{immediate:!0,flush:"post"}),M(function(){u()})}}}export{q as a,H as b,G as l,F as u};
