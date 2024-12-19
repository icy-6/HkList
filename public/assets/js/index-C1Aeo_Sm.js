import{I as H,m as z,n as I,d as D,a3 as R,C as A,q as Z,c as x,f as a,F as g,a8 as E,a2 as J,r as K,Z as V,_ as F,L as X,K as q,M as B}from"./index-CXsQrBlN.js";import{h as P,j as k}from"./index-BrMISRL3.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var G={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},size:{type:String,default:"medium",validator:function(r){return r?["small","medium","large"].includes(r):!0}},tableLayout:{type:String,default:"fixed",validator:function(r){return r?["fixed","auto"].includes(r):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var M=Symbol("TDescriptions");/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var S=function(e){return e.props="props",e.slots="slots",e}(S||{});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function L(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return H(e)?e:z(e)?e(I,r):z(e==null?void 0:e.render)?e.render(I,r):e}function O(e,r,o){var d,m=(d=e.props)===null||d===void 0?void 0:d[r];if(m)return m;var v=e.children,p=(v==null?void 0:v[r])||(v==null?void 0:v[o]);return p?p==null?void 0:p():null}function N(e,r){return e===S.props}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Q=D({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(r){var o=R(M),d=A("descriptions"),m=Z("descriptions"),v=m.globalConfig,p=x(function(){return o.layout==="horizontal"}),f=x(function(){return o.itemLayout==="horizontal"}),b=function(n){var y=["".concat(d.value,"__label")],i=null,s=null;N(r.itemType)?(i=n.label,s=n.span):(i=O(n,"label"),s=n.props.span);var t=p.value?f.value?1:s:1;return a("td",E({colspan:t,class:y},{style:o.labelStyle}),[i,o.colon&&v.value.colonText])},h=function(n){var y=["".concat(d.value,"__content")],i=null,s=null;N(r.itemType)?(i=n.content,s=n.span):(i=O(n,"content","default"),s=n.props.span);var t=p.value?s>1&&f.value?s*2-1:s:1;return a("td",E({colspan:t,class:y},{style:o.contentStyle}),[i])},T=function(){return a("tr",null,[r.row.map(function(n){return a(g,null,[b(n),h(n)])})])},C=function(){return a(g,null,[a("tr",null,[r.row.map(function(n){return b(n)})]),a("tr",null,[r.row.map(function(n){return h(n)})])])},u=function(){return a(g,null,[r.row.map(function(n){return a("tr",null,[b(n),h(n)])})])},_=function(){return a(g,null,[r.row.map(function(n){return a(g,null,[a("tr",null,[b(n)]),a("tr",null,[h(n)])])})])};return function(){return a(g,null,[p.value?f.value?T():C():f.value?u():_()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var U=D({name:"TDescriptions",props:G,setup:function(r){var o=A("descriptions"),d=J(),m=d.SIZE,v=k(),p=X(),f=K(S.props),b=function(){var u=r.column,_=r.layout,c=[];if(q(r.items))c=r.items.map(function(t){return{label:L(t.label),content:L(t.content),span:t.span||1}}),f.value=S.props;else{var n=v("TDescriptionsItem");n.length!==0&&(c=n,f.value=S.slots)}if(_==="vertical")return[c];var y=[],i=u,s=[];return c.forEach(function(t,j){var l=1;if(N(f.value))l=P(t.span)?l:t.span,l=l>u?u:l;else{var w;t.props=t.props||{},l=P((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>u?u:l,t.props.span=l}i>=l?(y.push(t),i-=l):(s.push(y),y=[t],i=u-l),j===c.length-1&&(N(f.value)?t.span+=i:t.props.span+=i,s.push(y))}),s};V(M,r);var h=function(){var u=["".concat(o.value,"__body"),m.value[r.size],F({},"".concat(o.value,"__body--fixed"),r.tableLayout==="fixed"),F({},"".concat(o.value,"__body--border"),r.bordered)];return a("table",{class:u},[a("tbody",null,[b().map(function(_){return a(Q,{"item-type":f.value,row:_},null)})])])},T=function(){var u=p("title");return u?a("div",{class:"".concat(o.value,"__header")},[u]):""};return function(){return a("div",{class:o.value},[T(),h()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var W={content:{type:[String,Function]},default:{type:[String,Function]},label:{type:[String,Function]},span:{type:Number,default:1}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Y=D({name:"TDescriptionsItem",props:W});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var nr=B(U),er=B(Y);export{er as D,nr as a};
