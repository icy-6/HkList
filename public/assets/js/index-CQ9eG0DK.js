import{d as C,J as h,a2 as P,B as k,c as w,e as c,V as x,_ as i,a4 as j,R as _,S as N}from"./index-Bp2jFwmf.js";import{c as T}from"./useResizeObserver-lH7UueVr.js";/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var I={content:{type:[String,Function]},default:{type:[String,Function]},disabled:{type:Boolean,default:void 0},download:{type:[String,Boolean]},hover:{type:String,default:"underline",validator:function(e){return e?["color","underline"].includes(e):!0}},href:{type:String,default:""},prefixIcon:{type:Function},size:{type:String,default:"medium",validator:function(e){return e?["small","medium","large"].includes(e):!0}},suffixIcon:{type:Function},target:{type:String,default:""},theme:{type:String,default:"default",validator:function(e){return e?["default","primary","danger","warning","success"].includes(e):!0}},underline:Boolean,onClick:Function};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function m(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter(function(l){return Object.getOwnPropertyDescriptor(n,l).enumerable})),t.push.apply(t,a)}return t}function D(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?m(Object(t),!0).forEach(function(a){i(n,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach(function(a){Object.defineProperty(n,a,Object.getOwnPropertyDescriptor(t,a))})}return n}var E=C({name:"TLink",props:D({},I),emits:["click"],setup:function(e,t){var a=t.emit,l=j(),s=_(),r=h("link"),d=P(),g=d.STATUS,p=d.SIZE,y=k("classPrefix"),b=y.classPrefix,u=T(),S=w(function(){return["".concat(r.value),"".concat(r.value,"--theme-").concat(e.theme),i(i(i(i({},p.value[e.size],e.size!=="medium"),g.value.disabled,u.value),"".concat(b.value,"-is-underline"),e.underline),"".concat(r.value,"--hover-").concat(e.hover),!u.value)]}),O=function(o){u.value||a("click",o)};return function(){var f=l("default","content"),o=s("prefixIcon"),v=s("suffixIcon");return c("a",{class:x(S.value),href:u.value||!e.href?void 0:e.href,target:e.target?e.target:void 0,download:e.download?e.download:void 0,onClick:O},[o?c("span",{class:"".concat(r.value,"__prefix-icon")},[o]):null,f,v?c("span",{class:"".concat(r.value,"__suffix-icon")},[v]):null])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var B=N(E);export{B as L};
