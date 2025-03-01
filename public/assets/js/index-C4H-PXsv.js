import{J as R,p as z,q as I,d as D,a3 as j,E as A,x as J,c as x,e as a,F as h,a8 as E,a2 as Z,r as V,Z as X,_ as F,N as q,L as K,O as B}from"./index-BIaFnYUc.js";import{f as O,g as k}from"./index-D5kJdPPa.js";/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var G={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(e){return e?["horizontal","vertical"].includes(e):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(e){return e?["horizontal","vertical"].includes(e):!0}},size:{type:String,default:"medium",validator:function(e){return e?["small","medium","large"].includes(e):!0}},tableLayout:{type:String,default:"fixed",validator:function(e){return e?["fixed","auto"].includes(e):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var H=Symbol("TDescriptions");/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var S=function(r){return r.props="props",r.slots="slots",r}(S||{});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */function P(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return R(r)?r:z(r)?r(I,e):z(r==null?void 0:r.render)?r.render(I,e):r}function L(r,e,u){var d,m=(d=r.props)===null||d===void 0?void 0:d[e];if(m)return m;var p=r.children,v=(p==null?void 0:p[e])||(p==null?void 0:p[u]);return v?v==null?void 0:v():null}function N(r,e){return r===S.props}/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var Q=D({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(e){var u=j(H),d=A("descriptions"),m=J("descriptions"),p=m.globalConfig,v=x(function(){return u.layout==="horizontal"}),f=x(function(){return u.itemLayout==="horizontal"}),b=function(n){var y=["".concat(d.value,"__label")],i=null,s=null;N(e.itemType)?(i=n.label,s=n.span):(i=L(n,"label"),s=n.props.span);var t=v.value?f.value?1:s:1;return a("td",E({colspan:t,class:y},{style:u.labelStyle}),[i,u.colon&&p.value.colonText])},g=function(n){var y=["".concat(d.value,"__content")],i=null,s=null;N(e.itemType)?(i=n.content,s=n.span):(i=L(n,"content","default"),s=n.props.span);var t=v.value?s>1&&f.value?s*2-1:s:1;return a("td",E({colspan:t,class:y},{style:u.contentStyle}),[i])},T=function(){return a("tr",null,[e.row.map(function(n){return a(h,null,[b(n),g(n)])})])},C=function(){return a(h,null,[a("tr",null,[e.row.map(function(n){return b(n)})]),a("tr",null,[e.row.map(function(n){return g(n)})])])},o=function(){return a(h,null,[e.row.map(function(n){return a("tr",null,[b(n),g(n)])})])},_=function(){return a(h,null,[e.row.map(function(n){return a(h,null,[a("tr",null,[b(n)]),a("tr",null,[g(n)])])})])};return function(){return a(h,null,[v.value?f.value?T():C():f.value?o():_()])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var U=D({name:"TDescriptions",props:G,setup:function(e){var u=A("descriptions"),d=Z(),m=d.SIZE,p=k(),v=q(),f=V(S.props),b=function(){var o=e.column,_=e.layout,c=[];if(K(e.items))c=e.items.map(function(t){return{label:P(t.label),content:P(t.content),span:t.span||1}}),f.value=S.props;else{var n=p("TDescriptionsItem");n.length!==0&&(c=n,f.value=S.slots)}if(_==="vertical")return[c];var y=[],i=o,s=[];return c.forEach(function(t,M){var l=1;if(N(f.value))l=O(t.span)?l:t.span,l=l>o?o:l;else{var w;t.props=t.props||{},l=O((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>o?o:l,t.props.span=l}i>=l?(y.push(t),i-=l):(s.push(y),y=[t],i=o-l),M===c.length-1&&(N(f.value)?t.span+=i:t.props.span+=i,s.push(y))}),s};X(H,e);var g=function(){var o=["".concat(u.value,"__body"),m.value[e.size],F({},"".concat(u.value,"__body--fixed"),e.tableLayout==="fixed"),F({},"".concat(u.value,"__body--border"),e.bordered)];return a("table",{class:o},[a("tbody",null,[b().map(function(_){return a(Q,{"item-type":f.value,row:_},null)})])])},T=function(){var o=v("title");return o?a("div",{class:"".concat(u.value,"__header")},[o]):""};return function(){return a("div",{class:u.value},[T(),g()])}}});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var W={content:{type:[String,Function]},default:{type:[String,Function]},label:{type:[String,Function]},span:{type:Number,default:1}};/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var Y=D({name:"TDescriptionsItem",props:W});/**
 * tdesign v1.10.6
 * (c) 2024 tdesign
 * @license MIT
 */var ne=B(U),re=B(Y);export{re as D,ne as a};
