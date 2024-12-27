import{N as M,x as z,y as I,d as D,a2 as j,I as B,A as J,c as x,e as a,F as h,a7 as P,a1 as V,r as X,Y as Z,_ as E,Q as K,P as Q,R as L}from"./index-DxT_05GM.js";import{f as F,g as Y}from"./index-DQbFxpGN.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var k={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},size:{type:String,default:"medium",validator:function(r){return r?["small","medium","large"].includes(r):!0}},tableLayout:{type:String,default:"fixed",validator:function(r){return r?["fixed","auto"].includes(r):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var R=Symbol("TDescriptions");/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var S=function(n){return n.props="props",n.slots="slots",n}(S||{});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function A(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return M(n)?n:z(n)?n(I,r):z(n==null?void 0:n.render)?n.render(I,r):n}function O(n,r,o){var d,m=(d=n.props)===null||d===void 0?void 0:d[r];if(m)return m;var v=n.children,p=(v==null?void 0:v[r])||(v==null?void 0:v[o]);return p?p==null?void 0:p():null}function N(n,r){return n===S.props}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var q=D({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(r){var o=j(R),d=B("descriptions"),m=J("descriptions"),v=m.globalConfig,p=x(function(){return o.layout==="horizontal"}),f=x(function(){return o.itemLayout==="horizontal"}),b=function(e){var y=["".concat(d.value,"__label")],i=null,s=null;N(r.itemType)?(i=e.label,s=e.span):(i=O(e,"label"),s=e.props.span);var t=p.value?f.value?1:s:1;return a("td",P({colspan:t,class:y},{style:o.labelStyle}),[i,o.colon&&v.value.colonText])},g=function(e){var y=["".concat(d.value,"__content")],i=null,s=null;N(r.itemType)?(i=e.content,s=e.span):(i=O(e,"content","default"),s=e.props.span);var t=p.value?s>1&&f.value?s*2-1:s:1;return a("td",P({colspan:t,class:y},{style:o.contentStyle}),[i])},T=function(){return a("tr",null,[r.row.map(function(e){return a(h,null,[b(e),g(e)])})])},C=function(){return a(h,null,[a("tr",null,[r.row.map(function(e){return b(e)})]),a("tr",null,[r.row.map(function(e){return g(e)})])])},u=function(){return a(h,null,[r.row.map(function(e){return a("tr",null,[b(e),g(e)])})])},_=function(){return a(h,null,[r.row.map(function(e){return a(h,null,[a("tr",null,[b(e)]),a("tr",null,[g(e)])])})])};return function(){return a(h,null,[p.value?f.value?T():C():f.value?u():_()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var G=D({name:"TDescriptions",props:k,setup:function(r){var o=B("descriptions"),d=V(),m=d.SIZE,v=Y(),p=K(),f=X(S.props),b=function(){var u=r.column,_=r.layout,c=[];if(Q(r.items))c=r.items.map(function(t){return{label:A(t.label),content:A(t.content),span:t.span||1}}),f.value=S.props;else{var e=v("TDescriptionsItem");e.length!==0&&(c=e,f.value=S.slots)}if(_==="vertical")return[c];var y=[],i=u,s=[];return c.forEach(function(t,H){var l=1;if(N(f.value))l=F(t.span)?l:t.span,l=l>u?u:l;else{var w;t.props=t.props||{},l=F((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>u?u:l,t.props.span=l}i>=l?(y.push(t),i-=l):(s.push(y),y=[t],i=u-l),H===c.length-1&&(N(f.value)?t.span+=i:t.props.span+=i,s.push(y))}),s};Z(R,r);var g=function(){var u=["".concat(o.value,"__body"),m.value[r.size],E({},"".concat(o.value,"__body--fixed"),r.tableLayout==="fixed"),E({},"".concat(o.value,"__body--border"),r.bordered)];return a("table",{class:u},[a("tbody",null,[b().map(function(_){return a(q,{"item-type":f.value,row:_},null)})])])},T=function(){var u=p("title");return u?a("div",{class:"".concat(o.value,"__header")},[u]):""};return function(){return a("div",{class:o.value},[T(),g()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var U={content:{type:[String,Function]},default:{type:[String,Function]},label:{type:[String,Function]},span:{type:Number,default:1}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var W=D({name:"TDescriptionsItem",props:U});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var er=L(G),nr=L(W);export{nr as D,er as a};
