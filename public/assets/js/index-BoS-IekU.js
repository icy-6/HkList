import{d as r,r as f,J as n,c,_ as h,Z as p,e as u,R as s,a3 as N,v as _,a6 as y,S as o}from"./index-D7B0QjbI.js";/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var T=r({name:"TLayout",setup:function(){var e=f(!1),a=s(),t=n("layout"),d=c(function(){return[t.value,h({},"".concat(t.value,"--with-sider"),e.value)]});return p("layout",{hasSide:e}),function(){return u("section",{class:d.value},[a("default")])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var S={height:{type:String,default:""}};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var g=r({name:"THeader",props:S,setup:function(e){var a=n("layout__header"),t=s();return function(){return u("header",{class:a.value,style:e.height?{height:e.height}:{}},[t("default")])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var m={height:{type:String,default:""}};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var C=r({name:"TFooter",props:m,setup:function(e){var a=n("layout__footer"),t=s();return function(){return u("footer",{class:a.value,style:e.height?{height:e.height}:{}},[t("default")])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var M={width:{type:String,default:""}};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var O=r({name:"TAside",props:M,setup:function(e){var a=N("layout",Object.create(null)),t=a.hasSide,d=n("layout__sider"),l=s();if(t)return _(function(){t.value=!0}),y(function(){t.value=!1}),function(){var v=e.width?{width:e.width}:{};return u("aside",{class:d.value,style:v},[l("default")])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var E=r({name:"TContent",setup:function(){var e=n("layout__content"),a=s();return function(){return u("main",{class:e.value},[a("default")])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var J=o(O),P=o(T),w=o(g);o(C);var X=o(E);export{J as A,X as C,w as H,P as L};
