import{bH as C,ar as D,bx as N,X as x,F as T,H as O,bI as A,d as F,Q as E,c as w,U as b,h as y,aa as h,V as S,a6 as M,an as V,Y as I,Z as B,b as R,bt as W,w as X,S as $}from"./index-CbTStCTl.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var G={align:{type:String,validator:function(e){return e?["start","end","center","baseline"].includes(e):!0}},breakLine:Boolean,direction:{type:String,default:"horizontal",validator:function(e){return e?["vertical","horizontal"].includes(e):!0}},separator:{type:[String,Function]},size:{type:[String,Number,Array],default:"medium"}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function K(){var t=O();return function(e,n){var r,a;n||(n=t.slots);var v=((r=n)===null||r===void 0||(a=r.default)===null||a===void 0?void 0:a.call(r))||[];return C(v).filter(function(f){var d;return(d=f.type.name)===null||d===void 0?void 0:d.endsWith(e)})}}function H(){var t=O();return function(){var e,n=t.slots,r=(n==null||(e=n.default)===null||e===void 0?void 0:e.call(n))||[];return r.filter(function(a){return D(a.type)==="symbol"&&!a.children?!1:a.type!==N}).map(function(a){return a.children&&x(a.children)&&a.type===T?a.children:a}).flat()}}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function P(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),n.push.apply(n,r)}return n}function j(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?P(Object(n),!0).forEach(function(r){b(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}var z={small:"8px",medium:"16px",large:"24px"},J=A(),L=F({name:"TSpace",props:j(j({},G),{},{forceFlexGapPolyfill:Boolean}),setup:function(e){var n=E("space"),r=I(),a=H(),v=w(function(){return e.forceFlexGapPolyfill||J}),f=w(function(){var i="";x(e.size)?i=e.size.map(function(o){return h(o)?"".concat(o,"px"):S(o)&&z[o]||o}).join(" "):S(e.size)?i=z[e.size]||e.size:h(e.size)&&(i="".concat(e.size,"px"));var s={};if(v.value){var p=i.split(" "),m=M(p,2),l=m[0],u=m[1];s["--td-space-column-gap"]=l,s["--td-space-row-gap"]=u||l}else s.gap=i;return s});function d(){var i=a(),s=r("separator");return i.filter(function(p){return V(p)?p.type!==N:!0}).map(function(p,m){var l=m+1!==i.length&&s;return y(T,null,[y("div",{class:"".concat(n.value,"-item")},[p]),l&&y("div",{class:"".concat(n.value,"-item-separator")},[s])])})}return function(){var i=["".concat(n.value),b(b(b(b({},"".concat(n.value,"-align-").concat(e.align),e.align),"".concat(n.value,"-").concat(e.direction),e.direction),"".concat(n.value,"--break-line"),e.breakLine),"".concat(n.value,"--polyfill"),v.value)];return y("div",{class:i,style:f.value},[d()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Q=B(L);/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function Y(t,e,n,r){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"value",v=O(),f=v.emit,d=v.vnode,i=R(),s=d.props||{},p=Object.prototype.hasOwnProperty.call(s,"modelValue")||Object.prototype.hasOwnProperty.call(s,"model-value"),m=Object.prototype.hasOwnProperty.call(s,a)||Object.prototype.hasOwnProperty.call(s,W(a));return p?[e,function(l){f("update:modelValue",l);for(var u=arguments.length,o=new Array(u>1?u-1:0),c=1;c<u;c++)o[c-1]=arguments[c];r==null||r.apply(void 0,[l].concat(o))}]:m?[t,function(l){f("update:".concat(a),l);for(var u=arguments.length,o=new Array(u>1?u-1:0),c=1;c<u;c++)o[c-1]=arguments[c];r==null||r.apply(void 0,[l].concat(o))}]:(i.value=n,[i,function(l){i.value=l;for(var u=arguments.length,o=new Array(u>1?u-1:0),c=1;c<u;c++)o[c-1]=arguments[c];r==null||r.apply(void 0,[l].concat(o))}])}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var g=new Set,Z={warn:function(e,n){console.warn("TDesign ".concat(e," Warn: ").concat(n))},warnOnce:function(e,n){var r="TDesign ".concat(e," Warn: ").concat(n);g.has(r)||(g.add(r),console.warn(r))},error:function(e,n){console.error("TDesign ".concat(e," Error: ").concat(n))},errorOnce:function(e,n){var r="TDesign ".concat(e," Error: ").concat(n);g.has(r)||(g.add(r),console.error(r))},info:function(e,n){console.info("TDesign ".concat(e," Info: ").concat(n))}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function q(t,e){if(!(typeof window>"u")){var n=window&&window.ResizeObserver;if(n){var r=null,a=function(){!r||!t.value||(r.unobserve(t.value),r.disconnect(),r=null)},v=function(d){r=new ResizeObserver(e),r.observe(d)};t&&X(t,function(f){a(),f&&v(f)},{immediate:!0,flush:"post"}),$(function(){a()})}}}export{Q as S,q as a,K as b,Z as l,Y as u};
