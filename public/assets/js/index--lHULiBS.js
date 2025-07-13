import{E as R,ac as z,ad as I,d as D,a4 as j,y as A,v as J,c as E,g as a,F as h,ae as P,a2 as K,b as V,C as x,L as X,N as Z,aK as k,a1 as q,P as B}from"./index-DfK_AuQa.js";import{i as F}from"./index-jWhfq8_6.js";/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var G={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},size:{type:String,default:"medium",validator:function(r){return r?["small","medium","large"].includes(r):!0}},tableLayout:{type:String,default:"fixed",validator:function(r){return r?["fixed","auto"].includes(r):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var H=Symbol("TDescriptions");/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var C=function(n){return n.props="props",n.slots="slots",n}(C||{});function L(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return R(n)?n:z(n)?n(I,r):z(n==null?void 0:n.render)?n.render(I,r):n}function O(n,r,o){var d,m=(d=n.props)===null||d===void 0?void 0:d[r];if(m)return m;var v=n.children,p=(v==null?void 0:v[r])||(v==null?void 0:v[o]);return p?p==null?void 0:p():null}function _(n,r){return n===C.props}/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var Q=D({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(r){var o=j(H),d=A("descriptions"),m=J("descriptions"),v=m.globalConfig,p=E(function(){return o.layout==="horizontal"}),f=E(function(){return o.itemLayout==="horizontal"}),b=function(e){var y=["".concat(d.value,"__label")],i=null,s=null;_(r.itemType)?(i=e.label,s=e.span):(i=O(e,"label"),s=e.props.span);var t=p.value?f.value?1:s:1;return a("td",P({colspan:t,class:y},{style:o.labelStyle}),[i,o.colon&&v.value.colonText])},g=function(e){var y=["".concat(d.value,"__content")],i=null,s=null;_(r.itemType)?(i=e.content,s=e.span):(i=O(e,"content","default"),s=e.props.span);var t=p.value?s>1&&f.value?s*2-1:s:1;return a("td",P({colspan:t,class:y},{style:o.contentStyle}),[i])},T=function(){return a("tr",null,[r.row.map(function(e){return a(h,null,[b(e),g(e)])})])},N=function(){return a(h,null,[a("tr",null,[r.row.map(function(e){return b(e)})]),a("tr",null,[r.row.map(function(e){return g(e)})])])},u=function(){return a(h,null,[r.row.map(function(e){return a("tr",null,[b(e),g(e)])})])},S=function(){return a(h,null,[r.row.map(function(e){return a(h,null,[a("tr",null,[b(e)]),a("tr",null,[g(e)])])})])};return function(){return a(h,null,[p.value?f.value?T():N():f.value?u():S()])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var U=D({name:"TDescriptions",props:G,setup:function(r){var o=A("descriptions"),d=K(),m=d.SIZE,v=k(),p=X(),f=V(C.props),b=function(){var u=r.column,S=r.layout,c=[];if(Z(r.items))c=r.items.map(function(t){return{label:L(t.label),content:L(t.content),span:t.span||1}}),f.value=C.props;else{var e=v("TDescriptionsItem");e.length!==0&&(c=e,f.value=C.slots)}if(S==="vertical")return[c];var y=[],i=u,s=[];return c.forEach(function(t,M){var l=1;if(_(f.value))l=F(t.span)?l:t.span,l=l>u?u:l;else{var w;t.props=t.props||{},l=F((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>u?u:l,t.props.span=l}i>=l?(y.push(t),i-=l):(s.push(y),y=[t],i=u-l),M===c.length-1&&(_(f.value)?t.span+=i:t.props.span+=i,s.push(y))}),s};q(H,r);var g=function(){var u=["".concat(o.value,"__body"),m.value[r.size],x({},"".concat(o.value,"__body--fixed"),r.tableLayout==="fixed"),x({},"".concat(o.value,"__body--border"),r.bordered)];return a("table",{class:u},[a("tbody",null,[b().map(function(S){return a(Q,{"item-type":f.value,row:S},null)})])])},T=function(){var u=p("title");return u?a("div",{class:"".concat(o.value,"__header")},[u]):""};return function(){return a("div",{class:o.value},[T(),g()])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var W={content:{type:[String,Function]},default:{type:[String,Function]},label:{type:[String,Function]},span:{type:Number,default:1}};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var Y=D({name:"TDescriptionsItem",props:W});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var er=B(U),nr=B(Y);export{nr as D,er as a};
