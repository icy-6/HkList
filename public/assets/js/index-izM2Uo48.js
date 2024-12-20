import{d as r,b as c,P as n,c as f,T as h,a6 as p,h as u,X as s,ac as N,z as _,ag as y,Y as o}from"./index-oOsh6Yp-.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var T=r({name:"TLayout",setup:function(){var e=c(!1),a=s(),t=n("layout"),d=f(function(){return[t.value,h({},"".concat(t.value,"--with-sider"),e.value)]});return p("layout",{hasSide:e}),function(){return u("section",{class:d.value},[a("default")])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var S={height:{type:String,default:""}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var g=r({name:"THeader",props:S,setup:function(e){var a=n("layout__header"),t=s();return function(){return u("header",{class:a.value,style:e.height?{height:e.height}:{}},[t("default")])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var m={height:{type:String,default:""}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var C=r({name:"TFooter",props:m,setup:function(e){var a=n("layout__footer"),t=s();return function(){return u("footer",{class:a.value,style:e.height?{height:e.height}:{}},[t("default")])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var M={width:{type:String,default:""}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var O=r({name:"TAside",props:M,setup:function(e){var a=N("layout",Object.create(null)),t=a.hasSide,d=n("layout__sider"),l=s();if(t)return _(function(){t.value=!0}),y(function(){t.value=!1}),function(){var v=e.width?{width:e.width}:{};return u("aside",{class:d.value,style:v},[l("default")])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var E=r({name:"TContent",setup:function(){var e=n("layout__content"),a=s();return function(){return u("main",{class:e.value},[a("default")])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var P=o(O),X=o(T);o(g);o(C);var w=o(E);export{P as A,w as C,X as L};
