import{V as M,E as z,G as I,d as D,ad as R,Q as B,I as V,c as E,h as a,F as h,aj as x,ab as X,b as Z,a7 as J,U as F,Y as G,X as K,Z as L}from"./index-CV3fu6i-.js";import{f as P,g as Q}from"./index-CdgF-B5O.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var U={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},size:{type:String,default:"medium",validator:function(r){return r?["small","medium","large"].includes(r):!0}},tableLayout:{type:String,default:"fixed",validator:function(r){return r?["fixed","auto"].includes(r):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var j=Symbol("TDescriptions");/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var _=function(e){return e.props="props",e.slots="slots",e}(_||{});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function O(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return M(e)?e:z(e)?e(I,r):z(e==null?void 0:e.render)?e.render(I,r):e}function A(e,r,o){var d,m=(d=e.props)===null||d===void 0?void 0:d[r];if(m)return m;var v=e.children,p=(v==null?void 0:v[r])||(v==null?void 0:v[o]);return p?p==null?void 0:p():null}function N(e,r){return e===_.props}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Y=D({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(r){var o=R(j),d=B("descriptions"),m=V("descriptions"),v=m.globalConfig,p=E(function(){return o.layout==="horizontal"}),f=E(function(){return o.itemLayout==="horizontal"}),b=function(n){var y=["".concat(d.value,"__label")],i=null,s=null;N(r.itemType)?(i=n.label,s=n.span):(i=A(n,"label"),s=n.props.span);var t=p.value?f.value?1:s:1;return a("td",x({colspan:t,class:y},{style:o.labelStyle}),[i,o.colon&&v.value.colonText])},g=function(n){var y=["".concat(d.value,"__content")],i=null,s=null;N(r.itemType)?(i=n.content,s=n.span):(i=A(n,"content","default"),s=n.props.span);var t=p.value?s>1&&f.value?s*2-1:s:1;return a("td",x({colspan:t,class:y},{style:o.contentStyle}),[i])},T=function(){return a("tr",null,[r.row.map(function(n){return a(h,null,[b(n),g(n)])})])},C=function(){return a(h,null,[a("tr",null,[r.row.map(function(n){return b(n)})]),a("tr",null,[r.row.map(function(n){return g(n)})])])},u=function(){return a(h,null,[r.row.map(function(n){return a("tr",null,[b(n),g(n)])})])},S=function(){return a(h,null,[r.row.map(function(n){return a(h,null,[a("tr",null,[b(n)]),a("tr",null,[g(n)])])})])};return function(){return a(h,null,[p.value?f.value?T():C():f.value?u():S()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var k=D({name:"TDescriptions",props:U,setup:function(r){var o=B("descriptions"),d=X(),m=d.SIZE,v=Q(),p=G(),f=Z(_.props),b=function(){var u=r.column,S=r.layout,c=[];if(K(r.items))c=r.items.map(function(t){return{label:O(t.label),content:O(t.content),span:t.span||1}}),f.value=_.props;else{var n=v("TDescriptionsItem");n.length!==0&&(c=n,f.value=_.slots)}if(S==="vertical")return[c];var y=[],i=u,s=[];return c.forEach(function(t,H){var l=1;if(N(f.value))l=P(t.span)?l:t.span,l=l>u?u:l;else{var w;t.props=t.props||{},l=P((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>u?u:l,t.props.span=l}i>=l?(y.push(t),i-=l):(s.push(y),y=[t],i=u-l),H===c.length-1&&(N(f.value)?t.span+=i:t.props.span+=i,s.push(y))}),s};J(j,r);var g=function(){var u=["".concat(o.value,"__body"),m.value[r.size],F({},"".concat(o.value,"__body--fixed"),r.tableLayout==="fixed"),F({},"".concat(o.value,"__body--border"),r.bordered)];return a("table",{class:u},[a("tbody",null,[b().map(function(S){return a(Y,{"item-type":f.value,row:S},null)})])])},T=function(){var u=p("title");return u?a("div",{class:"".concat(o.value,"__header")},[u]):""};return function(){return a("div",{class:o.value},[T(),g()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var q={content:{type:[String,Function]},default:{type:[String,Function]},label:{type:[String,Function]},span:{type:Number,default:1}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var W=D({name:"TDescriptionsItem",props:q});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var nr=L(k),er=L(W);export{er as D,nr as a};
