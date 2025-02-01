import{bE as A,B as I,r as B,J as L,v as N,a6 as _,aA as M,aB as V,c as j,a3 as $,A as z,d as F,a2 as W,_ as b,e as D,ak as U,V as X,z as J,R as K,a4 as G,S as Z,bh as q,w as H,L as Q}from"./index-Bp9UiBp2.js";/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var Y={block:Boolean,content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},form:{type:String,default:void 0},ghost:Boolean,href:{type:String,default:""},icon:{type:Function},loading:Boolean,loadingProps:{type:Object},shape:{type:String,default:"rectangle",validator:function(e){return e?["rectangle","square","round","circle"].includes(e):!0}},size:{type:String,default:"medium",validator:function(e){return e?["extra-small","small","medium","large"].includes(e):!0}},suffix:{type:Function},tag:{type:String,validator:function(e){return e?["button","a","div"].includes(e):!0}},theme:{type:String,validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},type:{type:String,default:"button",validator:function(e){return e?["submit","reset","button"].includes(e):!0}},variant:{type:String,default:"base",validator:function(e){return e?["base","outline","dashed","text"].includes(e):!0}},onClick:Function};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var ee=A.expand,ne=A.ripple,te=A.fade;function ae(){var n=I("animation"),e=n.globalConfig,a=function(u){var l,s,i=e.value;return i&&!((l=i.exclude)!==null&&l!==void 0&&l.includes(u))&&((s=i.include)===null||s===void 0?void 0:s.includes(u))};return{keepExpand:a(ee),keepRipple:a(ne),keepFade:a(te)}}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function k(n,e){var a=Object.keys(e);a.forEach(function(t){n.style[t]=e[t]})}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var x=200,re="rgba(0, 0, 0, 0)",ie="rgba(0, 0, 0, 0.35)",oe=function(e,a){var t;if(a)return a;if(e!=null&&(t=e.dataset)!==null&&t!==void 0&&t.ripple){var u=e.dataset.ripple;return u}var l=getComputedStyle(e).getPropertyValue("--ripple-color");return l||ie};function ue(n,e){var a=B(null),t=L(),u=ae(),l=u.keepRipple,s=function(p){var o=n.value,g=oe(o,e==null?void 0:e.value);if(!(p.button!==0||!n||!l)&&!(o.classList.contains("".concat(t.value,"-is-active"))||o.classList.contains("".concat(t.value,"-is-disabled"))||o.classList.contains("".concat(t.value,"-is-checked"))||o.classList.contains("".concat(t.value,"-is-loading")))){var m=getComputedStyle(o),d=parseInt(m.borderWidth,10),c=d>0?d:0,f=o.offsetWidth,r=o.offsetHeight;a.value.parentNode===null&&(k(a.value,{position:"absolute",left:"".concat(0-c,"px"),top:"".concat(0-c,"px"),width:"".concat(f,"px"),height:"".concat(r,"px"),borderRadius:m.borderRadius,pointerEvents:"none",overflow:"hidden"}),o.appendChild(a.value));var v=document.createElement("div");k(v,{marginTop:"0",marginLeft:"0",right:"".concat(f,"px"),width:"".concat(f+20,"px"),height:"100%",transition:"transform ".concat(x,"ms cubic-bezier(.38, 0, .24, 1), background ").concat(x*2,"ms linear"),transform:"skewX(-8deg)",pointerEvents:"none",position:"absolute",zIndex:0,backgroundColor:g,opacity:"0.9"});for(var E=new WeakMap,O=o.children.length,h=0;h<O;++h){var y=o.children[h];y.style.zIndex===""&&y!==a.value&&(y.style.zIndex="1",E.set(y,!0))}var P=o.style.position?o.style.position:getComputedStyle(o).position;(P===""||P==="static")&&(o.style.position="relative"),a.value.insertBefore(v,a.value.firstChild),setTimeout(function(){v.style.transform="translateX(".concat(f,"px)")},0);var w=function(){v.style.backgroundColor=re,n.value&&(n.value.removeEventListener("pointerup",w,!1),n.value.removeEventListener("pointerleave",w,!1),setTimeout(function(){v.remove(),a.value.children.length===0&&a.value.remove()},x*2+100))};n.value.addEventListener("pointerup",w,!1),n.value.addEventListener("pointerleave",w,!1)}};N(function(){var i=n==null?void 0:n.value;i&&(a.value=document.createElement("div"),i.addEventListener("pointerdown",s,!1))}),_(function(){var i;n==null||(i=n.value)===null||i===void 0||i.removeEventListener("pointerdown",s,!1)})}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var le=M,se=V,ce="[object Boolean]";function de(n){return n===!0||n===!1||se(n)&&le(n)==ce}var C=de;/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function fe(n){var e=z(),a=j(function(){return e.props.disabled}),t=$("formDisabled",Object.create(null));return j(function(){var u,l,s;return C(n==null||(u=n.beforeDisabled)===null||u===void 0?void 0:u.value)?n.beforeDisabled.value:C(a.value)?a.value:C(n==null||(l=n.afterDisabled)===null||l===void 0?void 0:l.value)?n.afterDisabled.value:C((s=t.disabled)===null||s===void 0?void 0:s.value)?t.disabled.value:!1})}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function R(n,e){var a=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter(function(u){return Object.getOwnPropertyDescriptor(n,u).enumerable})),a.push.apply(a,t)}return a}function S(n){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?R(Object(a),!0).forEach(function(t){b(n,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(a)):R(Object(a)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(a,t))})}return n}var ve=F({name:"TButton",props:Y,setup:function(e,a){var t=a.attrs,u=a.slots,l=K(),s=G(),i=L("button"),p=W(),o=p.STATUS,g=p.SIZE,m=B();ue(m);var d=fe(),c=j(function(){var r=e.theme,v=e.variant;return r||(v==="base"?"primary":"default")}),f=j(function(){return["".concat(i.value),"".concat(i.value,"--variant-").concat(e.variant),"".concat(i.value,"--theme-").concat(c.value),b(b(b(b(b(b({},g.value[e.size],e.size!=="medium"),o.value.disabled,d.value),o.value.loading,e.loading),"".concat(i.value,"--shape-").concat(e.shape),e.shape!=="rectangle"),"".concat(i.value,"--ghost"),e.ghost),g.value.block,e.block)]});return function(){var r=s("default","content"),v=e.loading?D(U,S({inheritColor:!0},e.loadingProps),null):l("icon"),E=v&&!r,O=e.suffix||u.suffix?D("span",{className:"".concat(i.value,"__suffix")},[l("suffix")]):null;r=r?D("span",{class:"".concat(i.value,"__text")},[r]):"",v&&(r=[v,r]),O&&(r=[r].concat(O));var h=function(){return!e.tag&&e.href?"a":e.tag||"button"},y={class:[].concat(X(f.value),[b({},"".concat(i.value,"--icon-only"),E)]),type:e.type,disabled:d.value||e.loading,href:e.href,tabindex:d.value?void 0:"0"};return J(h(),S(S(S({ref:m},t),y),{},{onClick:e.onClick}),[r])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var me=Z(ve);/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function ge(n,e,a,t){var u=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"value",l=z(),s=l.emit,i=l.vnode,p=B(),o=i.props||{},g=Object.prototype.hasOwnProperty.call(o,"modelValue")||Object.prototype.hasOwnProperty.call(o,"model-value"),m=Object.prototype.hasOwnProperty.call(o,u)||Object.prototype.hasOwnProperty.call(o,q(u));return g?[e,function(d){s("update:modelValue",d);for(var c=arguments.length,f=new Array(c>1?c-1:0),r=1;r<c;r++)f[r-1]=arguments[r];t==null||t.apply(void 0,[d].concat(f))}]:m?[n,function(d){s("update:".concat(u),d);for(var c=arguments.length,f=new Array(c>1?c-1:0),r=1;r<c;r++)f[r-1]=arguments[r];t==null||t.apply(void 0,[d].concat(f))}]:(p.value=a,[p,function(d){p.value=d;for(var c=arguments.length,f=new Array(c>1?c-1:0),r=1;r<c;r++)f[r-1]=arguments[r];t==null||t.apply(void 0,[d].concat(f))}])}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var T=new Set,ye={warn:function(e,a){console.warn("TDesign ".concat(e," Warn: ").concat(a))},warnOnce:function(e,a){var t="TDesign ".concat(e," Warn: ").concat(a);T.has(t)||(T.add(t),console.warn(t))},error:function(e,a){console.error("TDesign ".concat(e," Error: ").concat(a))},errorOnce:function(e,a){var t="TDesign ".concat(e," Error: ").concat(a);T.has(t)||(T.add(t),console.error(t))},info:function(e,a){console.info("TDesign ".concat(e," Info: ").concat(a))}};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function he(n,e){if(!(typeof window>"u")){var a=window&&window.ResizeObserver;if(a){var t=null,u=function(){!t||!n.value||(t.unobserve(n.value),t.disconnect(),t=null)},l=function(i){t=new ResizeObserver(e),t.observe(i)};n&&H(n,function(s){u(),s&&l(s)},{immediate:!0,flush:"post"}),Q(function(){u()})}}}export{me as B,ve as T,ue as a,he as b,fe as c,C as i,ye as l,ge as u};
