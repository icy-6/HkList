import{Q as R,A as z,B as I,d as D,a4 as j,L,D as J,c as x,f as a,F as g,a9 as E,a3 as V,r as X,$ as Z,_ as F,T as K,S as Q,U as O}from"./index-DDOnw_dn.js";import{h as P}from"./index-CbAgUJFV.js";import{c as U}from"./useResizeObserver-qPY2ykBa.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var $={bordered:Boolean,colon:Boolean,column:{type:Number,default:2},contentStyle:{type:Object},itemLayout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},items:{type:Array},labelStyle:{type:Object},layout:{type:String,default:"horizontal",validator:function(r){return r?["horizontal","vertical"].includes(r):!0}},size:{type:String,default:"medium",validator:function(r){return r?["small","medium","large"].includes(r):!0}},tableLayout:{type:String,default:"fixed",validator:function(r){return r?["fixed","auto"].includes(r):!0}},title:{type:[String,Function]}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var H=Symbol("TDescriptions");/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var _=function(e){return e.props="props",e.slots="slots",e}(_||{});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function A(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return R(e)?e:z(e)?e(I,r):z(e==null?void 0:e.render)?e.render(I,r):e}function B(e,r,o){var d,y=(d=e.props)===null||d===void 0?void 0:d[r];if(y)return y;var v=e.children,p=(v==null?void 0:v[r])||(v==null?void 0:v[o]);return p?p==null?void 0:p():null}function N(e,r){return e===_.props}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var k=D({name:"TDescriptionsRow",props:{row:Array,itemType:String},setup:function(r){var o=j(H),d=L("descriptions"),y=J("descriptions"),v=y.globalConfig,p=x(function(){return o.layout==="horizontal"}),f=x(function(){return o.itemLayout==="horizontal"}),b=function(n){var m=["".concat(d.value,"__label")],i=null,s=null;N(r.itemType)?(i=n.label,s=n.span):(i=B(n,"label"),s=n.props.span);var t=p.value?f.value?1:s:1;return a("td",E({colspan:t,class:m},{style:o.labelStyle}),[i,o.colon&&v.value.colonText])},h=function(n){var m=["".concat(d.value,"__content")],i=null,s=null;N(r.itemType)?(i=n.content,s=n.span):(i=B(n,"content","default"),s=n.props.span);var t=p.value?s>1&&f.value?s*2-1:s:1;return a("td",E({colspan:t,class:m},{style:o.contentStyle}),[i])},T=function(){return a("tr",null,[r.row.map(function(n){return a(g,null,[b(n),h(n)])})])},C=function(){return a(g,null,[a("tr",null,[r.row.map(function(n){return b(n)})]),a("tr",null,[r.row.map(function(n){return h(n)})])])},u=function(){return a(g,null,[r.row.map(function(n){return a("tr",null,[b(n),h(n)])})])},S=function(){return a(g,null,[r.row.map(function(n){return a(g,null,[a("tr",null,[b(n)]),a("tr",null,[h(n)])])})])};return function(){return a(g,null,[p.value?f.value?T():C():f.value?u():S()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var q=D({name:"TDescriptions",props:$,setup:function(r){var o=L("descriptions"),d=V(),y=d.SIZE,v=U(),p=K(),f=X(_.props),b=function(){var u=r.column,S=r.layout,c=[];if(Q(r.items))c=r.items.map(function(t){return{label:A(t.label),content:A(t.content),span:t.span||1}}),f.value=_.props;else{var n=v("TDescriptionsItem");n.length!==0&&(c=n,f.value=_.slots)}if(S==="vertical")return[c];var m=[],i=u,s=[];return c.forEach(function(t,M){var l=1;if(N(f.value))l=P(t.span)?l:t.span,l=l>u?u:l;else{var w;t.props=t.props||{},l=P((w=t.props)===null||w===void 0?void 0:w.span)?l:t.props.span,l=l>u?u:l,t.props.span=l}i>=l?(m.push(t),i-=l):(s.push(m),m=[t],i=u-l),M===c.length-1&&(N(f.value)?t.span+=i:t.props.span+=i,s.push(m))}),s};Z(H,r);var h=function(){var u=["".concat(o.value,"__body"),y.value[r.size],F({},"".concat(o.value,"__body--fixed"),r.tableLayout==="fixed"),F({},"".concat(o.value,"__body--border"),r.bordered)];return a("table",{class:u},[a("tbody",null,[b().map(function(S){return a(k,{"item-type":f.value,row:S},null)})])])},T=function(){var u=p("title");return u?a("div",{class:"".concat(o.value,"__header")},[u]):""};return function(){return a("div",{class:o.value},[T(),h()])}}});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var G={content:{type:[String,Function]},default:{type:[String,Function]},label:{type:[String,Function]},span:{type:Number,default:1}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var W=D({name:"TDescriptionsItem",props:G});/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var er=O(q),tr=O(W);export{tr as D,er as a};
