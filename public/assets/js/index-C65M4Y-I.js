import{a1 as M,T as D,U as I,d as z,O as R,n as j,q as J,c as x,b as a,F as g,W as E,p as V,j as X,H as Z,_ as F,y as q,L as K,z as A}from"./index-BrogXIyH.js";import{h as O,j as U}from"./form-model-CALRRR2O.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var W={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},size:{type:String,default:"medium",validator:function(r){return r?["small","medium","large"].includes(r):!0}},tableLayout:{type:String,default:"fixed",validator:function(r){return r?["fixed","auto"].includes(r):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var B=Symbol("TDescriptions");/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var S=function(e){return e.props="props",e.slots="slots",e}(S||{});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function P(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return M(e)?e:D(e)?e(I,r):D(e==null?void 0:e.render)?e.render(I,r):e}function L(e,r,o){var d,m=(d=e.props)===null||d===void 0?void 0:d[r];if(m)return m;var v=e.children,p=(v==null?void 0:v[r])||(v==null?void 0:v[o]);return p?p==null?void 0:p():null}function N(e,r){return e===S.props}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var k=z({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(r){var o=R(B),d=j("descriptions"),m=J("descriptions"),v=m.globalConfig,p=x(function(){return o.layout==="horizontal"}),f=x(function(){return o.itemLayout==="horizontal"}),b=function(n){var y=["".concat(d.value,"__label")],i=null,s=null;N(r.itemType)?(i=n.label,s=n.span):(i=L(n,"label"),s=n.props.span);var t=p.value?f.value?1:s:1;return a("td",E({colspan:t,class:y},{style:o.labelStyle}),[i,o.colon&&v.value.colonText])},h=function(n){var y=["".concat(d.value,"__content")],i=null,s=null;N(r.itemType)?(i=n.content,s=n.span):(i=L(n,"content","default"),s=n.props.span);var t=p.value?s>1&&f.value?s*2-1:s:1;return a("td",E({colspan:t,class:y},{style:o.contentStyle}),[i])},T=function(){return a("tr",null,[r.row.map(function(n){return a(g,null,[b(n),h(n)])})])},C=function(){return a(g,null,[a("tr",null,[r.row.map(function(n){return b(n)})]),a("tr",null,[r.row.map(function(n){return h(n)})])])},u=function(){return a(g,null,[r.row.map(function(n){return a("tr",null,[b(n),h(n)])})])},_=function(){return a(g,null,[r.row.map(function(n){return a(g,null,[a("tr",null,[b(n)]),a("tr",null,[h(n)])])})])};return function(){return a(g,null,[p.value?f.value?T():C():f.value?u():_()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var G=z({name:"TDescriptions",props:W,setup:function(r){var o=j("descriptions"),d=V(),m=d.SIZE,v=U(),p=q(),f=X(S.props),b=function(){var u=r.column,_=r.layout,c=[];if(K(r.items))c=r.items.map(function(t){return{label:P(t.label),content:P(t.content),span:t.span||1}}),f.value=S.props;else{var n=v("TDescriptionsItem");n.length!==0&&(c=n,f.value=S.slots)}if(_==="vertical")return[c];var y=[],i=u,s=[];return c.forEach(function(t,H){var l=1;if(N(f.value))l=O(t.span)?l:t.span,l=l>u?u:l;else{var w;t.props=t.props||{},l=O((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>u?u:l,t.props.span=l}i>=l?(y.push(t),i-=l):(s.push(y),y=[t],i=u-l),H===c.length-1&&(N(f.value)?t.span+=i:t.props.span+=i,s.push(y))}),s};Z(B,r);var h=function(){var u=["".concat(o.value,"__body"),m.value[r.size],F({},"".concat(o.value,"__body--fixed"),r.tableLayout==="fixed"),F({},"".concat(o.value,"__body--border"),r.bordered)];return a("table",{class:u},[a("tbody",null,[b().map(function(_){return a(k,{"item-type":f.value,row:_},null)})])])},T=function(){var u=p("title");return u?a("div",{class:"".concat(o.value,"__header")},[u]):""};return function(){return a("div",{class:o.value},[T(),h()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Q={content:{type:[String,Function]},default:{type:[String,Function]},label:{type:[String,Function]},span:{type:Number,default:1}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Y=z({name:"TDescriptionsItem",props:Q});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var nr=A(G),er=A(Y);export{er as D,nr as a};
