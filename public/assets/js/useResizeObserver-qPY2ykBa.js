import{bA as P,D as _,r as k,L as D,y as $,a7 as W,bB as X,ag as K,bi as M,S as F,F as I,C as x,bC as U,d as G,c as j,_ as b,f as O,a2 as z,Q as A,Z as J,ad as H,T as Q,U as Z,bf as q,w as Y,O as ee}from"./index-DDOnw_dn.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var ne=P.expand,te=P.ripple,re=P.fade;function ae(){var r=_("animation"),e=r.globalConfig,n=function(a){var u,s,i=e.value;return i&&!((u=i.exclude)!==null&&u!==void 0&&u.includes(a))&&((s=i.include)===null||s===void 0?void 0:s.includes(a))};return{keepExpand:n(ne),keepRipple:n(te),keepFade:n(re)}}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function T(r,e){var n=Object.keys(e);n.forEach(function(t){r.style[t]=e[t]})}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var S=200,oe="rgba(0, 0, 0, 0)",ie="rgba(0, 0, 0, 0.35)",le=function(e,n){var t;if(n)return n;if(e!=null&&(t=e.dataset)!==null&&t!==void 0&&t.ripple){var a=e.dataset.ripple;return a}var u=getComputedStyle(e).getPropertyValue("--ripple-color");return u||ie};function fe(r,e){var n=k(null),t=D(),a=ae(),u=a.keepRipple,s=function(c){var o=r.value,f=le(o,e==null?void 0:e.value);if(!(c.button!==0||!r||!u)&&!(o.classList.contains("".concat(t.value,"-is-active"))||o.classList.contains("".concat(t.value,"-is-disabled"))||o.classList.contains("".concat(t.value,"-is-checked"))||o.classList.contains("".concat(t.value,"-is-loading")))){var m=getComputedStyle(o),v=parseInt(m.borderWidth,10),d=v>0?v:0,l=o.offsetWidth,p=o.offsetHeight;n.value.parentNode===null&&(T(n.value,{position:"absolute",left:"".concat(0-d,"px"),top:"".concat(0-d,"px"),width:"".concat(l,"px"),height:"".concat(p,"px"),borderRadius:m.borderRadius,pointerEvents:"none",overflow:"hidden"}),o.appendChild(n.value));var g=document.createElement("div");T(g,{marginTop:"0",marginLeft:"0",right:"".concat(l,"px"),width:"".concat(l+20,"px"),height:"100%",transition:"transform ".concat(S,"ms cubic-bezier(.38, 0, .24, 1), background ").concat(S*2,"ms linear"),transform:"skewX(-8deg)",pointerEvents:"none",position:"absolute",zIndex:0,backgroundColor:f,opacity:"0.9"});for(var B=new WeakMap,V=o.children.length,C=0;C<V;++C){var y=o.children[C];y.style.zIndex===""&&y!==n.value&&(y.style.zIndex="1",B.set(y,!0))}var E=o.style.position?o.style.position:getComputedStyle(o).position;(E===""||E==="static")&&(o.style.position="relative"),n.value.insertBefore(g,n.value.firstChild),setTimeout(function(){g.style.transform="translateX(".concat(l,"px)")},0);var h=function(){g.style.backgroundColor=oe,r.value&&(r.value.removeEventListener("pointerup",h,!1),r.value.removeEventListener("pointerleave",h,!1),setTimeout(function(){g.remove(),n.value.children.length===0&&n.value.remove()},S*2+100))};r.value.addEventListener("pointerup",h,!1),r.value.addEventListener("pointerleave",h,!1)}};$(function(){var i=r==null?void 0:r.value;i&&(n.value=document.createElement("div"),i.addEventListener("pointerdown",s,!1))}),W(function(){var i;r==null||(i=r.value)===null||i===void 0||i.removeEventListener("pointerdown",s,!1)})}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var ue={align:{type:String,validator:function(e){return e?["start","end","center","baseline"].includes(e):!0}},breakLine:Boolean,direction:{type:String,default:"horizontal",validator:function(e){return e?["vertical","horizontal"].includes(e):!0}},separator:{type:[String,Function]},size:{type:[String,Number,Array],default:"medium"}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function me(){var r=x();return function(e,n){var t,a;n||(n=r.slots);var u=((t=n)===null||t===void 0||(a=t.default)===null||a===void 0?void 0:a.call(t))||[];return X(u).filter(function(s){var i;return(i=s.type.name)===null||i===void 0?void 0:i.endsWith(e)})}}function se(){var r=x();return function(){var e,n=r.slots,t=(n==null||(e=n.default)===null||e===void 0?void 0:e.call(n))||[];return t.filter(function(a){return K(a.type)==="symbol"&&!a.children?!1:a.type!==M}).map(function(a){return a.children&&F(a.children)&&a.type===I?a.children:a}).flat()}}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function L(r,e){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);e&&(t=t.filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable})),n.push.apply(n,t)}return n}function R(r){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?L(Object(n),!0).forEach(function(t){b(r,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach(function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(n,t))})}return r}var N={small:"8px",medium:"16px",large:"24px"},ce=U(),ve=G({name:"TSpace",props:R(R({},ue),{},{forceFlexGapPolyfill:Boolean}),setup:function(e){var n=D("space"),t=Q(),a=se(),u=j(function(){return e.forceFlexGapPolyfill||ce}),s=j(function(){var c="";F(e.size)?c=e.size.map(function(l){return z(l)?"".concat(l,"px"):A(l)&&N[l]||l}).join(" "):A(e.size)?c=N[e.size]||e.size:z(e.size)&&(c="".concat(e.size,"px"));var o={};if(u.value){var f=c.split(" "),m=J(f,2),v=m[0],d=m[1];o["--td-space-column-gap"]=v,o["--td-space-row-gap"]=d||v}else o.gap=c;return o});function i(){var c=a(),o=t("separator");return c.filter(function(f){return H(f)?f.type!==M:!0}).map(function(f,m){var v=m+1!==c.length&&o;return O(I,null,[O("div",{class:"".concat(n.value,"-item")},[f]),v&&O("div",{class:"".concat(n.value,"-item-separator")},[o])])})}return function(){var c=["".concat(n.value),b(b(b(b({},"".concat(n.value,"-align-").concat(e.align),e.align),"".concat(n.value,"-").concat(e.direction),e.direction),"".concat(n.value,"--break-line"),e.breakLine),"".concat(n.value,"--polyfill"),u.value)];return O("div",{class:c,style:s.value},[i()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var ge=Z(ve);/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function be(r,e,n,t){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"value",u=x(),s=u.emit,i=u.vnode,c=k(),o=i.props||{},f=Object.prototype.hasOwnProperty.call(o,"modelValue")||Object.prototype.hasOwnProperty.call(o,"model-value"),m=Object.prototype.hasOwnProperty.call(o,a)||Object.prototype.hasOwnProperty.call(o,q(a));return f?[e,function(v){s("update:modelValue",v);for(var d=arguments.length,l=new Array(d>1?d-1:0),p=1;p<d;p++)l[p-1]=arguments[p];t==null||t.apply(void 0,[v].concat(l))}]:m?[r,function(v){s("update:".concat(a),v);for(var d=arguments.length,l=new Array(d>1?d-1:0),p=1;p<d;p++)l[p-1]=arguments[p];t==null||t.apply(void 0,[v].concat(l))}]:(c.value=n,[c,function(v){c.value=v;for(var d=arguments.length,l=new Array(d>1?d-1:0),p=1;p<d;p++)l[p-1]=arguments[p];t==null||t.apply(void 0,[v].concat(l))}])}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var w=new Set,ye={warn:function(e,n){console.warn("TDesign ".concat(e," Warn: ").concat(n))},warnOnce:function(e,n){var t="TDesign ".concat(e," Warn: ").concat(n);w.has(t)||(w.add(t),console.warn(t))},error:function(e,n){console.error("TDesign ".concat(e," Error: ").concat(n))},errorOnce:function(e,n){var t="TDesign ".concat(e," Error: ").concat(n);w.has(t)||(w.add(t),console.error(t))},info:function(e,n){console.info("TDesign ".concat(e," Info: ").concat(n))}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function he(r,e){if(!(typeof window>"u")){var n=window&&window.ResizeObserver;if(n){var t=null,a=function(){!t||!r.value||(t.unobserve(r.value),t.disconnect(),t=null)},u=function(i){t=new ResizeObserver(e),t.observe(i)};r&&Y(r,function(s){a(),s&&u(s)},{immediate:!0,flush:"post"}),ee(function(){a()})}}}export{ge as S,fe as a,he as b,me as c,ye as l,be as u};
