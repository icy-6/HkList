import{d as I,C as j,f as o,L as w,c as f,K as X,_ as S,r as B,q as K,a2 as Z,F as _,I as b,ah as q,a4 as G,M as P,R as U}from"./index-CXsQrBlN.js";import{o as Q}from"./dep-b315df3e-Bhs51j-8.js";import{j as W}from"./index-BrMISRL3.js";import{u as tt}from"./useVirtualScrollNew-XSuNWHRp.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var et={action:{type:[String,Function]},content:{type:[String,Function]},default:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var A=I({name:"TListItem",props:et,setup:function(){var t=j("list-item"),e=w();return function(){var n=e("content"),i=e("default"),a=e("action");return o("li",{class:t.value},[o("div",{class:"".concat(t.value,"-main")},[i||n,a&&o("li",{class:"".concat(t.value,"__action")},[a])])])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var rt={asyncLoading:{type:[String,Function]},footer:{type:[String,Function]},header:{type:[String,Function]},layout:{type:String,default:"horizontal",validator:function(t){return t?["horizontal","vertical"].includes(t):!0}},scroll:{type:Object},size:{type:String,default:"medium",validator:function(t){return t?["small","medium","large"].includes(t):!0}},split:Boolean,stripe:Boolean,onLoadMore:Function,onScroll:Function};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var T="load-more",nt="loading";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function N(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),e.push.apply(e,n)}return e}function V(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?N(Object(e),!0).forEach(function(n){S(r,n,e[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):N(Object(e)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(e,n))})}return r}function at(r,t){var e=typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=ot(r))||t){e&&(r=e);var n=0,i=function(){};return{s:i,n:function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}},e:function(c){throw c},f:i}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,u=!0,s=!1;return{s:function(){e=e.call(r)},n:function(){var c=e.next();return u=c.done,c},e:function(c){s=!0,a=c},f:function(){try{u||e.return==null||e.return()}finally{if(s)throw a}}}}function ot(r,t){if(r){if(typeof r=="string")return E(r,t);var e={}.toString.call(r).slice(8,-1);return e==="Object"&&r.constructor&&(e=r.constructor.name),e==="Map"||e==="Set"?Array.from(r):e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?E(r,t):void 0}}function E(r,t){(t==null||t>r.length)&&(t=r.length);for(var e=0,n=Array(t);e<t;e++)n[e]=r[e];return n}var lt=function(){var t=W(),e=f(function(){var n=[],i=t("ListItem");if(X(i)){var a=at(i),u;try{for(a.s();!(u=a.n()).done;){var s=u.value;n.push(V(V({},s.props),{},{slots:s.children}))}}catch(l){a.e(l)}finally{a.f()}}return n});return{listItems:e}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var it=function(t,e,n){var i=f(function(){return{data:n.value,scroll:t}}),a=tt(e,i),u=f(function(){return a.isVirtualScroll.value}),s=-1,l=function(m){var O=m.target||m.srcElement,h=O.scrollTop;s!==h?a.isVirtualScroll.value&&a.handleScroll():s=-1,s=h},c=f(function(){return{position:"absolute",width:"1px",height:"1px",transition:"transform 0.2s",transform:"translate(0, ".concat(a.scrollHeight.value,"px)"),"-ms-transform":"translate(0, ".concat(a.scrollHeight.value,"px)"),"-moz-transform":"translate(0, ".concat(a.scrollHeight.value,"px)"),"-webkit-transform":"translate(0, ".concat(a.scrollHeight.value,"px)")}}),C=f(function(){return{transform:"translate(0, ".concat(a.translateY.value,"px)"),"-ms-transform":"translate(0, ".concat(a.translateY.value,"px)"),"-moz-transform":"translate(0, ".concat(a.translateY.value,"px)"),"-webkit-transform":"translate(0, ".concat(a.translateY.value,"px)")}});return{virtualConfig:a,cursorStyle:c,listStyle:C,isVirtualScroll:u,onInnerVirtualScroll:l}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function x(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),e.push.apply(e,n)}return e}function st(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?x(Object(e),!0).forEach(function(n){S(r,n,e[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):x(Object(e)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(e,n))})}return r}var ct=I({name:"TList",props:st({},rt),setup:function(t){var e=B(),n=K("list"),i=n.globalConfig,a=j("list"),u=Z(),s=u.SIZE,l=w(),c=lt(),C=c.listItems,p=it(t.scroll,e,C),m=p.virtualConfig,O=p.cursorStyle,h=p.listStyle,M=p.isVirtualScroll,F=p.onInnerVirtualScroll,D=f(function(){return["".concat(a.value),s.value[t.size],S(S(S({},"".concat(a.value,"--split"),t.split),"".concat(a.value,"--stripe"),t.stripe),"".concat(a.value,"--vertical-action"),t.layout==="vertical")]}),H=function(){var d=l("header"),v=l("footer"),g=m.isVirtualScroll.value;return o(_,null,[d?o("div",{class:"".concat(a.value,"__header")},[d]):null,g?o(_,null,[o("div",{style:O.value},null),o("ul",{class:"".concat(a.value,"__inner"),style:h.value},[m.visibleData.value.map(function(y){return o(_,null,[o(A,Q(y,"slots"),y.slots)])})])]):o("ul",{class:"".concat(a.value,"__inner")},[l("default")]),v?o("div",{class:"".concat(a.value,"__footer")},[v]):null])},$=function(d){var v,g=d.target,y=g.scrollTop,Y=g.scrollHeight,J=g.clientHeight;M.value&&F(d),(v=t.onScroll)===null||v===void 0||v.call(t,{e:d,scrollTop:y,scrollBottom:Y-J-y})},k=f(function(){return b(t.asyncLoading)&&["loading","load-more"].includes(t.asyncLoading)?"".concat(a.value,"__load ").concat(a.value,"__load--").concat(t.asyncLoading):"".concat(a.value,"__load")}),z=function(){if(t.asyncLoading&&b(t.asyncLoading)){if(t.asyncLoading===nt)return o("div",null,[o(q,null,null),o("span",null,[i.value.loadingText])]);if(t.asyncLoading===T)return o("span",null,[i.value.loadingMoreText])}return l("asyncLoading")},R=function(d){var v;b(t.asyncLoading)&&t.asyncLoading!==T||(v=t.onLoadMore)===null||v===void 0||v.call(t,{e:d})};return{COMPONENT_NAME:a,listClass:D,loadingClass:k,renderLoading:z,renderContent:H,handleScroll:$,handleLoadMore:R,listRef:e,isVirtualScroll:M}},render:function(){var t=this.renderContent();return t=[t,o("div",{class:this.loadingClass,onClick:this.handleLoadMore},[this.renderLoading()])],o("div",{class:this.listClass,onScroll:this.handleScroll,ref:"listRef",style:this.isVirtualScroll?"position:relative":void 0},[t])}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var ut={avatar:{type:[String,Function]},description:{type:[String,Function]},image:{type:[String,Function]},title:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var vt=I({name:"TListItemMeta",props:ut,setup:function(t,e){var n=j("list-item__meta"),i=G(),a=w(),u=function(){(t.avatar||e.slots.avatar)&&console.warn("`avatar` is going to be deprecated, please use `image` instead");var l=i("avatar","image");if(l)return b(l)?o("div",{class:"".concat(n.value,"-avatar")},[o("img",{src:l},null)]):o("div",{class:"".concat(n.value,"-avatar")},[l])};return function(){var s=a("title"),l=a("description"),c=[u(),o("div",{class:"".concat(n.value,"-content")},[s&&o("h3",{class:"".concat(n.value,"-title")},[s]),l&&o("p",{class:"".concat(n.value,"-description")},[l])])];return o("div",{class:n.value},[c])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var gt=P(ct),yt=P(A);P(vt);const St=async(r,t="复制成功")=>{try{await navigator.clipboard.writeText(r)}catch{const e=document.createElement("textarea");e.value=r,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}U.success(t)};export{gt as L,yt as a,St as c};
