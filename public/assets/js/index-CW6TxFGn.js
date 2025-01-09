import{O as M,y as D,z as I,d as z,a3 as j,J as A,B as J,c as x,e as a,F as h,a8 as E,a2 as Z,r as V,Z as X,_ as F,R as K,Q,S as L}from"./index-DxnYDW4g.js";import{f as O,g as k}from"./index-C1P_1hrf.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var q={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},size:{type:String,default:"medium",validator:function(r){return r?["small","medium","large"].includes(r):!0}},tableLayout:{type:String,default:"fixed",validator:function(r){return r?["fixed","auto"].includes(r):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var R=Symbol("TDescriptions");/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var _=function(n){return n.props="props",n.slots="slots",n}(_||{});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function P(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return M(n)?n:D(n)?n(I,r):D(n==null?void 0:n.render)?n.render(I,r):n}function B(n,r,o){var d,m=(d=n.props)===null||d===void 0?void 0:d[r];if(m)return m;var v=n.children,p=(v==null?void 0:v[r])||(v==null?void 0:v[o]);return p?p==null?void 0:p():null}function N(n,r){return n===_.props}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var G=z({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(r){var o=j(R),d=A("descriptions"),m=J("descriptions"),v=m.globalConfig,p=x(function(){return o.layout==="horizontal"}),f=x(function(){return o.itemLayout==="horizontal"}),b=function(e){var y=["".concat(d.value,"__label")],i=null,s=null;N(r.itemType)?(i=e.label,s=e.span):(i=B(e,"label"),s=e.props.span);var t=p.value?f.value?1:s:1;return a("td",E({colspan:t,class:y},{style:o.labelStyle}),[i,o.colon&&v.value.colonText])},g=function(e){var y=["".concat(d.value,"__content")],i=null,s=null;N(r.itemType)?(i=e.content,s=e.span):(i=B(e,"content","default"),s=e.props.span);var t=p.value?s>1&&f.value?s*2-1:s:1;return a("td",E({colspan:t,class:y},{style:o.contentStyle}),[i])},T=function(){return a("tr",null,[r.row.map(function(e){return a(h,null,[b(e),g(e)])})])},C=function(){return a(h,null,[a("tr",null,[r.row.map(function(e){return b(e)})]),a("tr",null,[r.row.map(function(e){return g(e)})])])},u=function(){return a(h,null,[r.row.map(function(e){return a("tr",null,[b(e),g(e)])})])},S=function(){return a(h,null,[r.row.map(function(e){return a(h,null,[a("tr",null,[b(e)]),a("tr",null,[g(e)])])})])};return function(){return a(h,null,[p.value?f.value?T():C():f.value?u():S()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var U=z({name:"TDescriptions",props:q,setup:function(r){var o=A("descriptions"),d=Z(),m=d.SIZE,v=k(),p=K(),f=V(_.props),b=function(){var u=r.column,S=r.layout,c=[];if(Q(r.items))c=r.items.map(function(t){return{label:P(t.label),content:P(t.content),span:t.span||1}}),f.value=_.props;else{var e=v("TDescriptionsItem");e.length!==0&&(c=e,f.value=_.slots)}if(S==="vertical")return[c];var y=[],i=u,s=[];return c.forEach(function(t,H){var l=1;if(N(f.value))l=O(t.span)?l:t.span,l=l>u?u:l;else{var w;t.props=t.props||{},l=O((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>u?u:l,t.props.span=l}i>=l?(y.push(t),i-=l):(s.push(y),y=[t],i=u-l),H===c.length-1&&(N(f.value)?t.span+=i:t.props.span+=i,s.push(y))}),s};X(R,r);var g=function(){var u=["".concat(o.value,"__body"),m.value[r.size],F({},"".concat(o.value,"__body--fixed"),r.tableLayout==="fixed"),F({},"".concat(o.value,"__body--border"),r.bordered)];return a("table",{class:u},[a("tbody",null,[b().map(function(S){return a(G,{"item-type":f.value,row:S},null)})])])},T=function(){var u=p("title");return u?a("div",{class:"".concat(o.value,"__header")},[u]):""};return function(){return a("div",{class:o.value},[T(),g()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var W={content:{type:[String,Function]},default:{type:[String,Function]},label:{type:[String,Function]},span:{type:Number,default:1}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Y=z({name:"TDescriptionsItem",props:W});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var er=L(U),nr=L(Y);export{nr as D,er as a};
