import{d as x,y as j,L as w,g as l,c as g,aK as U,N as q,C as L,aL as Q,b as W,v as tt,a2 as et,E as C,F as T,aM as rt,a0 as nt,P,M as at}from"./index-DfK_AuQa.js";import{l as M}from"./index-DfLWWs_9.js";import{o as ot}from"./omit-BSm0-P2Q.js";/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var lt={action:{type:[String,Function]},content:{type:[String,Function]},default:{type:[String,Function]}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var H=x({name:"TListItem",props:lt,setup:function(){var t=j("list-item"),e=w();return function(){var n=e("content"),s=e("default"),a=e("action");return l("li",{class:t.value},[l("div",{class:"".concat(t.value,"-main")},[s||n,a&&l("li",{class:"".concat(t.value,"__action")},[a])])])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var it={asyncLoading:{type:[String,Function]},footer:{type:[String,Function]},header:{type:[String,Function]},layout:{type:String,default:"horizontal",validator:function(t){return t?["horizontal","vertical"].includes(t):!0}},scroll:{type:Object},size:{type:String,default:"medium",validator:function(t){return t?["small","medium","large"].includes(t):!0}},split:Boolean,stripe:Boolean,onLoadMore:Function,onScroll:Function};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var N="load-more",st="loading";/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */function V(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(r,s).enumerable})),e.push.apply(e,n)}return e}function A(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?V(Object(e),!0).forEach(function(n){L(r,n,e[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):V(Object(e)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(e,n))})}return r}function ct(r,t){var e=typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=ut(r))||t){e&&(r=e);var n=0,s=function(){};return{s,n:function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}},e:function(v){throw v},f:s}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,u=!0,o=!1;return{s:function(){e=e.call(r)},n:function(){var v=e.next();return u=v.done,v},e:function(v){o=!0,a=v},f:function(){try{u||e.return==null||e.return()}finally{if(o)throw a}}}}function ut(r,t){if(r){if(typeof r=="string")return F(r,t);var e={}.toString.call(r).slice(8,-1);return e==="Object"&&r.constructor&&(e=r.constructor.name),e==="Map"||e==="Set"?Array.from(r):e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?F(r,t):void 0}}function F(r,t){(t==null||t>r.length)&&(t=r.length);for(var e=0,n=Array(t);e<t;e++)n[e]=r[e];return n}var vt=function(){var t=U(),e=g(function(){var n=[],s=t("ListItem");if(q(s)){var a=ct(s),u;try{for(a.s();!(u=a.n()).done;){var o=u.value;n.push(A(A({},o.props),{},{slots:o.children}))}}catch(i){a.e(i)}finally{a.f()}}return n});return{listItems:e}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */function D(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(r,s).enumerable})),e.push.apply(e,n)}return e}function k(r){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?D(Object(e),!0).forEach(function(n){L(r,n,e[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):D(Object(e)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(e,n))})}return r}var dt=function(t,e,n){var s=g(function(){return{data:n.value,scroll:t}}),a=Q(e,s),u=g(function(){return a.isVirtualScroll.value}),o=-1,i=function(c){var d=c.target||c.srcElement,S=d.scrollTop;o!==S?a.isVirtualScroll.value&&a.handleScroll():o=-1,o=S},v=g(function(){return{position:"absolute",width:"1px",height:"1px",transition:"transform 0.2s",transform:"translate(0, ".concat(a.scrollHeight.value,"px)"),"-ms-transform":"translate(0, ".concat(a.scrollHeight.value,"px)"),"-moz-transform":"translate(0, ".concat(a.scrollHeight.value,"px)"),"-webkit-transform":"translate(0, ".concat(a.scrollHeight.value,"px)")}}),y=g(function(){return{transform:"translate(0, ".concat(a.translateY.value,"px)"),"-ms-transform":"translate(0, ".concat(a.translateY.value,"px)"),"-moz-transform":"translate(0, ".concat(a.translateY.value,"px)"),"-webkit-transform":"translate(0, ".concat(a.translateY.value,"px)")}}),_=function(c){var d=c.index,S=c.key,p=d===0?d:d??Number(S);if(!p&&p!==0){M.error("List","scrollTo: `index` or `key` must exist.");return}if(p<0||p>=n.value.length){M.error("List","".concat(p," does not exist in data, check `index` or `key` please."));return}a.scrollToElement(k(k({},c),{},{index:p-1}))};return{virtualConfig:a,cursorStyle:v,listStyle:y,isVirtualScroll:u,onInnerVirtualScroll:i,scrollToElement:_}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var ft=x({name:"TList",props:it,setup:function(t,e){var n=e.expose,s=W(),a=tt("list"),u=a.globalConfig,o=j("list"),i=et(),v=i.SIZE,y=w(),_=vt(),I=_.listItems,c=dt(t.scroll,s,I),d=c.virtualConfig,S=c.cursorStyle,p=c.listStyle,E=c.isVirtualScroll,$=c.onInnerVirtualScroll,z=c.scrollToElement,Y=g(function(){return["".concat(o.value),v.value[t.size],L(L(L({},"".concat(o.value,"--split"),t.split),"".concat(o.value,"--stripe"),t.stripe),"".concat(o.value,"--vertical-action"),t.layout==="vertical")]}),J=function(){var m=y("header"),f=y("footer"),h=d.isVirtualScroll.value;return l(T,null,[m?l("div",{class:"".concat(o.value,"__header")},[m]):null,h?l(T,null,[l("div",{style:S.value},null),l("ul",{class:"".concat(o.value,"__inner"),style:p.value},[d.visibleData.value.map(function(O){return l(T,null,[l(H,ot(O,"slots"),O.slots)])})])]):l("ul",{class:"".concat(o.value,"__inner")},[y("default")]),f?l("div",{class:"".concat(o.value,"__footer")},[f]):null])},X=function(m){var f,h=m.target,O=h.scrollTop,Z=h.scrollHeight,G=h.clientHeight;E.value&&$(m),(f=t.onScroll)===null||f===void 0||f.call(t,{e:m,scrollTop:O,scrollBottom:Z-G-O})},B=g(function(){return C(t.asyncLoading)&&["loading","load-more"].includes(t.asyncLoading)?"".concat(o.value,"__load ").concat(o.value,"__load--").concat(t.asyncLoading):"".concat(o.value,"__load")}),K=function(){if(t.asyncLoading&&C(t.asyncLoading)){if(t.asyncLoading===st)return l("div",null,[l(rt,null,null),l("span",null,[u.value.loadingText])]);if(t.asyncLoading===N)return l("span",null,[u.value.loadingMoreText])}return y("asyncLoading")},R=function(m){var f;C(t.asyncLoading)&&t.asyncLoading!==N||(f=t.onLoadMore)===null||f===void 0||f.call(t,{e:m})};return n({scrollTo:z}),function(){var b=[J(),l("div",{class:B.value,onClick:R},[K()])];return l("div",{class:Y.value,onScroll:X,ref:s,style:E.value?"position:relative":void 0},[b])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var pt={avatar:{type:[String,Function]},description:{type:[String,Function]},image:{type:[String,Function]},title:{type:[String,Function]}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var mt=x({name:"TListItemMeta",props:pt,setup:function(t,e){var n=j("list-item__meta"),s=nt(),a=w(),u=function(){(t.avatar||e.slots.avatar)&&console.warn("`avatar` is going to be deprecated, please use `image` instead");var i=s("avatar","image");if(i)return C(i)?l("div",{class:"".concat(n.value,"-avatar")},[l("img",{src:i},null)]):l("div",{class:"".concat(n.value,"-avatar")},[i])};return function(){var o=a("title"),i=a("description"),v=[u(),l("div",{class:"".concat(n.value,"-content")},[o&&l("h3",{class:"".concat(n.value,"-title")},[o]),i&&l("p",{class:"".concat(n.value,"-description")},[i])])];return l("div",{class:n.value},[v])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var bt=P(ft),ht=P(H);P(mt);const Ot=async(r,t="复制成功")=>{try{await navigator.clipboard.writeText(r)}catch{const e=document.createElement("textarea");e.value=r,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)}at.success(t)};export{bt as L,ht as a,Ot as c};
