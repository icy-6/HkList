import{P as H,z as D,A as I,d as z,a3 as M,K as B,C as Z,c as P,f as a,F as g,a8 as x,a2 as J,r as K,Z as V,_ as E,S as X,R as k,T as L}from"./index-C5Ad9MSy.js";import{h as F,j as q}from"./index-CvhmcSF0.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var G={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},size:{type:String,default:"medium",validator:function(r){return r?["small","medium","large"].includes(r):!0}},tableLayout:{type:String,default:"fixed",validator:function(r){return r?["fixed","auto"].includes(r):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var R=Symbol("TDescriptions");/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var _=function(e){return e.props="props",e.slots="slots",e}(_||{});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function A(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return H(e)?e:D(e)?e(I,r):D(e==null?void 0:e.render)?e.render(I,r):e}function O(e,r,o){var d,m=(d=e.props)===null||d===void 0?void 0:d[r];if(m)return m;var v=e.children,p=(v==null?void 0:v[r])||(v==null?void 0:v[o]);return p?p==null?void 0:p():null}function N(e,r){return e===_.props}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Q=z({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(r){var o=M(R),d=B("descriptions"),m=Z("descriptions"),v=m.globalConfig,p=P(function(){return o.layout==="horizontal"}),f=P(function(){return o.itemLayout==="horizontal"}),b=function(n){var y=["".concat(d.value,"__label")],i=null,s=null;N(r.itemType)?(i=n.label,s=n.span):(i=O(n,"label"),s=n.props.span);var t=p.value?f.value?1:s:1;return a("td",x({colspan:t,class:y},{style:o.labelStyle}),[i,o.colon&&v.value.colonText])},h=function(n){var y=["".concat(d.value,"__content")],i=null,s=null;N(r.itemType)?(i=n.content,s=n.span):(i=O(n,"content","default"),s=n.props.span);var t=p.value?s>1&&f.value?s*2-1:s:1;return a("td",x({colspan:t,class:y},{style:o.contentStyle}),[i])},T=function(){return a("tr",null,[r.row.map(function(n){return a(g,null,[b(n),h(n)])})])},C=function(){return a(g,null,[a("tr",null,[r.row.map(function(n){return b(n)})]),a("tr",null,[r.row.map(function(n){return h(n)})])])},u=function(){return a(g,null,[r.row.map(function(n){return a("tr",null,[b(n),h(n)])})])},S=function(){return a(g,null,[r.row.map(function(n){return a(g,null,[a("tr",null,[b(n)]),a("tr",null,[h(n)])])})])};return function(){return a(g,null,[p.value?f.value?T():C():f.value?u():S()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var U=z({name:"TDescriptions",props:G,setup:function(r){var o=B("descriptions"),d=J(),m=d.SIZE,v=q(),p=X(),f=K(_.props),b=function(){var u=r.column,S=r.layout,c=[];if(k(r.items))c=r.items.map(function(t){return{label:A(t.label),content:A(t.content),span:t.span||1}}),f.value=_.props;else{var n=v("TDescriptionsItem");n.length!==0&&(c=n,f.value=_.slots)}if(S==="vertical")return[c];var y=[],i=u,s=[];return c.forEach(function(t,j){var l=1;if(N(f.value))l=F(t.span)?l:t.span,l=l>u?u:l;else{var w;t.props=t.props||{},l=F((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>u?u:l,t.props.span=l}i>=l?(y.push(t),i-=l):(s.push(y),y=[t],i=u-l),j===c.length-1&&(N(f.value)?t.span+=i:t.props.span+=i,s.push(y))}),s};V(R,r);var h=function(){var u=["".concat(o.value,"__body"),m.value[r.size],E({},"".concat(o.value,"__body--fixed"),r.tableLayout==="fixed"),E({},"".concat(o.value,"__body--border"),r.bordered)];return a("table",{class:u},[a("tbody",null,[b().map(function(S){return a(Q,{"item-type":f.value,row:S},null)})])])},T=function(){var u=p("title");return u?a("div",{class:"".concat(o.value,"__header")},[u]):""};return function(){return a("div",{class:o.value},[T(),h()])}}});/**
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
 */var nr=L(U),er=L(Y);export{er as D,nr as a};
