import{d as r,b as c,y as n,c as f,C as p,g as u,L as i,a1 as h,a4 as y,n as N,ao as _,a0 as T,P as s}from"./index-DfK_AuQa.js";/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var g=r({name:"TLayout",setup:function(){var e=c(!1),a=i(),t=n("layout"),d=f(function(){return[t.value,p({},"".concat(t.value,"--with-sider"),e.value)]});return h("layout",{hasSide:e}),function(){return u("section",{class:d.value},[a("default")])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var C={height:{type:String,default:""}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var S=r({name:"THeader",props:C,setup:function(e){var a=n("layout__header"),t=i();return function(){return u("header",{class:a.value,style:e.height?{height:e.height}:{}},[t("default")])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var m={height:{type:String,default:""}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var M=r({name:"TFooter",props:m,setup:function(e){var a=n("layout__footer"),t=i();return function(){return u("footer",{class:a.value,style:e.height?{height:e.height}:{}},[t("default")])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var O={width:{type:String,default:""}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var E=r({name:"TAside",props:O,setup:function(e){var a=y("layout",Object.create(null)),t=a.hasSide,d=n("layout__sider"),l=i();if(t)return N(function(){t.value=!0}),_(function(){t.value=!1}),function(){var v=e.width?{width:e.width}:{};return u("aside",{class:d.value,style:v},[l("default")])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var A={content:{type:[String,Function]},default:{type:[String,Function]}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var P=r({name:"TContent",props:A,setup:function(){var e=n("layout__content"),a=T();return function(){return u("main",{class:e.value},[a("default","content")])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var J=s(E),L=s(g),X=s(S);s(M);var F=s(P);export{J as A,F as C,X as H,L};
