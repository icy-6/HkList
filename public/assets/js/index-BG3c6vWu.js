import{d as F,aE as k,y as I,a2 as O,W as x,X as R,Y as U,c as t,C as i,w as Z,ac as C,ad as S,E as y,N as D,g as c,aM as J,P as L}from"./index-DfK_AuQa.js";/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var W={beforeChange:{type:Function},customValue:{type:Array},disabled:{type:Boolean,default:void 0},label:{type:[Array,Function],default:function(){return[]}},loading:Boolean,size:{type:String,default:"medium",validator:function(e){return e?["small","medium","large"].includes(e):!0}},value:{type:[String,Number,Boolean],default:void 0},modelValue:{type:[String,Number,Boolean],default:void 0},defaultValue:{type:[String,Number,Boolean]},onChange:Function};/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var X=F({name:"TSwitch",props:W,setup:function(e,w){var d=w.slots,o=k(),s=I("switch"),f=O(),u=f.STATUS,m=f.SIZE,g=x(e),_=g.value,N=g.modelValue,E=R(_,N,e.defaultValue,e.onChange),h=U(E,2),n=h[0],T=h[1],r=t(function(){return e.customValue&&e.customValue.length>0?e.customValue[0]:!0}),A=t(function(){return e.customValue&&e.customValue.length>1?e.customValue[1]:!1});function V(a){var l=n.value===r.value?A.value:r.value;T(l,{e:a})}function M(a){if(!(o.value||e.loading)){if(!e.beforeChange){V(a);return}Promise.resolve(e.beforeChange()).then(function(l){l&&V(a)}).catch(function(l){throw new Error("Switch: some error occurred: ".concat(l))})}}var B=t(function(){return["".concat(s.value),m.value[e.size],i(i(i({},u.value.disabled,o.value),u.value.loading,e.loading),u.value.checked,n.value===r.value||e.modelValue===r.value)]}),P=t(function(){return["".concat(s.value,"__handle"),i(i({},u.value.disabled,o.value),u.value.loading,e.loading)]}),z=t(function(){return["".concat(s.value,"__content"),m.value[e.size],i({},u.value.disabled,o.value)]});Z(n,function(a){if(e.customValue&&e.customValue.length&&!e.customValue.includes(a))throw new Error("value is ".concat(a," not in ").concat(JSON.stringify(e.customValue)))},{immediate:!0});var b=t(function(){if(C(e.label))return e.label(S,{value:n.value});if(y(e.label))return e.label;if(D(e.label)&&e.label.length){var a=n.value===r.value?e.label[0]:e.label[1];if(!a)return;if(y(a))return a;if(C(a))return a(S)}return d.label?d.label({value:n.value}):null});return function(){var a,l;return e.loading?l=c(J,{size:"small"},null):b.value&&(a=b.value),c("div",{class:B.value,onClick:M},[c("span",{class:P.value},[l]),c("div",{class:z.value},[a])])}}});/**
 * tdesign v1.13.2
 * (c) 2025 tdesign
 * @license MIT
 */var j=L(X);export{j as S};
