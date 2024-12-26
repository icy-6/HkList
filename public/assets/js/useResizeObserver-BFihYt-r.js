import{bD as A,A as I,r as R,I as L,q as N,a5 as _,az as M,aA as $,c as j,a2 as F,z,d as V,a1 as U,_ as b,e as E,aj as W,U as K,y as X,Q as q,a3 as G,R as J,bg as Z,w as H,K as Q}from"./index-BXtOGv6Q.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Y={block:Boolean,content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},form:{type:String,default:void 0},ghost:Boolean,href:{type:String,default:""},icon:{type:Function},loading:Boolean,loadingProps:{type:Object},shape:{type:String,default:"rectangle",validator:function(e){return e?["rectangle","square","round","circle"].includes(e):!0}},size:{type:String,default:"medium",validator:function(e){return e?["extra-small","small","medium","large"].includes(e):!0}},suffix:{type:Function},tag:{type:String,validator:function(e){return e?["button","a","div"].includes(e):!0}},theme:{type:String,validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},type:{type:String,default:"button",validator:function(e){return e?["submit","reset","button"].includes(e):!0}},variant:{type:String,default:"base",validator:function(e){return e?["base","outline","dashed","text"].includes(e):!0}},onClick:Function};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var ee=A.expand,te=A.ripple,ne=A.fade;function ae(){var t=I("animation"),e=t.globalConfig,a=function(u){var l,s,o=e.value;return o&&!((l=o.exclude)!==null&&l!==void 0&&l.includes(u))&&((s=o.include)===null||s===void 0?void 0:s.includes(u))};return{keepExpand:a(ee),keepRipple:a(te),keepFade:a(ne)}}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function k(t,e){var a=Object.keys(e);a.forEach(function(n){t.style[n]=e[n]})}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var x=200,re="rgba(0, 0, 0, 0)",oe="rgba(0, 0, 0, 0.35)",ie=function(e,a){var n;if(a)return a;if(e!=null&&(n=e.dataset)!==null&&n!==void 0&&n.ripple){var u=e.dataset.ripple;return u}var l=getComputedStyle(e).getPropertyValue("--ripple-color");return l||oe};function ue(t,e){var a=R(null),n=L(),u=ae(),l=u.keepRipple,s=function(p){var i=t.value,g=ie(i,e==null?void 0:e.value);if(!(p.button!==0||!t||!l)&&!(i.classList.contains("".concat(n.value,"-is-active"))||i.classList.contains("".concat(n.value,"-is-disabled"))||i.classList.contains("".concat(n.value,"-is-checked"))||i.classList.contains("".concat(n.value,"-is-loading")))){var m=getComputedStyle(i),d=parseInt(m.borderWidth,10),c=d>0?d:0,v=i.offsetWidth,r=i.offsetHeight;a.value.parentNode===null&&(k(a.value,{position:"absolute",left:"".concat(0-c,"px"),top:"".concat(0-c,"px"),width:"".concat(v,"px"),height:"".concat(r,"px"),borderRadius:m.borderRadius,pointerEvents:"none",overflow:"hidden"}),i.appendChild(a.value));var f=document.createElement("div");k(f,{marginTop:"0",marginLeft:"0",right:"".concat(v,"px"),width:"".concat(v+20,"px"),height:"100%",transition:"transform ".concat(x,"ms cubic-bezier(.38, 0, .24, 1), background ").concat(x*2,"ms linear"),transform:"skewX(-8deg)",pointerEvents:"none",position:"absolute",zIndex:0,backgroundColor:g,opacity:"0.9"});for(var D=new WeakMap,O=i.children.length,h=0;h<O;++h){var y=i.children[h];y.style.zIndex===""&&y!==a.value&&(y.style.zIndex="1",D.set(y,!0))}var P=i.style.position?i.style.position:getComputedStyle(i).position;(P===""||P==="static")&&(i.style.position="relative"),a.value.insertBefore(f,a.value.firstChild),setTimeout(function(){f.style.transform="translateX(".concat(v,"px)")},0);var w=function(){f.style.backgroundColor=re,t.value&&(t.value.removeEventListener("pointerup",w,!1),t.value.removeEventListener("pointerleave",w,!1),setTimeout(function(){f.remove(),a.value.children.length===0&&a.value.remove()},x*2+100))};t.value.addEventListener("pointerup",w,!1),t.value.addEventListener("pointerleave",w,!1)}};N(function(){var o=t==null?void 0:t.value;o&&(a.value=document.createElement("div"),o.addEventListener("pointerdown",s,!1))}),_(function(){var o;t==null||(o=t.value)===null||o===void 0||o.removeEventListener("pointerdown",s,!1)})}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var le=M,se=$,ce="[object Boolean]";function de(t){return t===!0||t===!1||se(t)&&le(t)==ce}var C=de;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function ve(t){var e=z(),a=j(function(){return e.props.disabled}),n=F("formDisabled",Object.create(null));return j(function(){var u,l,s;return C(t==null||(u=t.beforeDisabled)===null||u===void 0?void 0:u.value)?t.beforeDisabled.value:C(a.value)?a.value:C(t==null||(l=t.afterDisabled)===null||l===void 0?void 0:l.value)?t.afterDisabled.value:C((s=n.disabled)===null||s===void 0?void 0:s.value)?n.disabled.value:!1})}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function B(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(u){return Object.getOwnPropertyDescriptor(t,u).enumerable})),a.push.apply(a,n)}return a}function S(t){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?B(Object(a),!0).forEach(function(n){b(t,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):B(Object(a)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(a,n))})}return t}var fe=V({name:"TButton",props:Y,setup:function(e,a){var n=a.attrs,u=a.slots,l=q(),s=G(),o=L("button"),p=U(),i=p.STATUS,g=p.SIZE,m=R();ue(m);var d=ve(),c=j(function(){var r=e.theme,f=e.variant;return r||(f==="base"?"primary":"default")}),v=j(function(){return["".concat(o.value),"".concat(o.value,"--variant-").concat(e.variant),"".concat(o.value,"--theme-").concat(c.value),b(b(b(b(b(b({},g.value[e.size],e.size!=="medium"),i.value.disabled,d.value),i.value.loading,e.loading),"".concat(o.value,"--shape-").concat(e.shape),e.shape!=="rectangle"),"".concat(o.value,"--ghost"),e.ghost),g.value.block,e.block)]});return function(){var r=s("default","content"),f=e.loading?E(W,S({inheritColor:!0},e.loadingProps),null):l("icon"),D=f&&!r,O=e.suffix||u.suffix?E("span",{className:"".concat(o.value,"__suffix")},[l("suffix")]):null;r=r?E("span",{class:"".concat(o.value,"__text")},[r]):"",f&&(r=[f,r]),O&&(r=[r].concat(O));var h=function(){return!e.tag&&e.href?"a":e.tag||"button"},y={class:[].concat(K(v.value),[b({},"".concat(o.value,"--icon-only"),D)]),type:e.type,disabled:d.value||e.loading,href:e.href,tabindex:d.value?void 0:"0"};return X(h(),S(S(S({ref:m},n),y),{},{onClick:e.onClick}),[r])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var me=J(fe);/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function ge(t,e,a,n){var u=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"value",l=z(),s=l.emit,o=l.vnode,p=R(),i=o.props||{},g=Object.prototype.hasOwnProperty.call(i,"modelValue")||Object.prototype.hasOwnProperty.call(i,"model-value"),m=Object.prototype.hasOwnProperty.call(i,u)||Object.prototype.hasOwnProperty.call(i,Z(u));return g?[e,function(d){s("update:modelValue",d);for(var c=arguments.length,v=new Array(c>1?c-1:0),r=1;r<c;r++)v[r-1]=arguments[r];n==null||n.apply(void 0,[d].concat(v))}]:m?[t,function(d){s("update:".concat(u),d);for(var c=arguments.length,v=new Array(c>1?c-1:0),r=1;r<c;r++)v[r-1]=arguments[r];n==null||n.apply(void 0,[d].concat(v))}]:(p.value=a,[p,function(d){p.value=d;for(var c=arguments.length,v=new Array(c>1?c-1:0),r=1;r<c;r++)v[r-1]=arguments[r];n==null||n.apply(void 0,[d].concat(v))}])}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var T=new Set,ye={warn:function(e,a){console.warn("TDesign ".concat(e," Warn: ").concat(a))},warnOnce:function(e,a){var n="TDesign ".concat(e," Warn: ").concat(a);T.has(n)||(T.add(n),console.warn(n))},error:function(e,a){console.error("TDesign ".concat(e," Error: ").concat(a))},errorOnce:function(e,a){var n="TDesign ".concat(e," Error: ").concat(a);T.has(n)||(T.add(n),console.error(n))},info:function(e,a){console.info("TDesign ".concat(e," Info: ").concat(a))}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function he(t,e){if(!(typeof window>"u")){var a=window&&window.ResizeObserver;if(a){var n=null,u=function(){!n||!t.value||(n.unobserve(t.value),n.disconnect(),n=null)},l=function(o){n=new ResizeObserver(e),n.observe(o)};t&&H(t,function(s){u(),s&&l(s)},{immediate:!0,flush:"post"}),Q(function(){u()})}}}export{me as B,fe as T,ue as a,he as b,ve as c,C as i,ye as l,ge as u};
