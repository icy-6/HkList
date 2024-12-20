import{b as O,bs as b,G as g,w as y,R as P}from"./index-oOsh6Yp-.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function T(o,e,t,r){var i=arguments.length>4&&arguments[4]!==void 0?arguments[4]:"value",v=g(),u=v.emit,p=v.vnode,d=O(),l=p.props||{},m=Object.prototype.hasOwnProperty.call(l,"modelValue")||Object.prototype.hasOwnProperty.call(l,"model-value"),w=Object.prototype.hasOwnProperty.call(l,i)||Object.prototype.hasOwnProperty.call(l,b(i));return m?[e,function(c){u("update:modelValue",c);for(var a=arguments.length,s=new Array(a>1?a-1:0),n=1;n<a;n++)s[n-1]=arguments[n];r==null||r.apply(void 0,[c].concat(s))}]:w?[o,function(c){u("update:".concat(i),c);for(var a=arguments.length,s=new Array(a>1?a-1:0),n=1;n<a;n++)s[n-1]=arguments[n];r==null||r.apply(void 0,[c].concat(s))}]:(d.value=t,[d,function(c){d.value=c;for(var a=arguments.length,s=new Array(a>1?a-1:0),n=1;n<a;n++)s[n-1]=arguments[n];r==null||r.apply(void 0,[c].concat(s))}])}/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var f=new Set,h={warn:function(e,t){console.warn("TDesign ".concat(e," Warn: ").concat(t))},warnOnce:function(e,t){var r="TDesign ".concat(e," Warn: ").concat(t);f.has(r)||(f.add(r),console.warn(r))},error:function(e,t){console.error("TDesign ".concat(e," Error: ").concat(t))},errorOnce:function(e,t){var r="TDesign ".concat(e," Error: ").concat(t);f.has(r)||(f.add(r),console.error(r))},info:function(e,t){console.info("TDesign ".concat(e," Info: ").concat(t))}};/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function j(o,e){if(!(typeof window>"u")){var t=window&&window.ResizeObserver;if(t){var r=null,i=function(){!r||!o.value||(r.unobserve(o.value),r.disconnect(),r=null)},v=function(p){r=new ResizeObserver(e),r.observe(p)};o&&y(o,function(u){i(),u&&v(u)},{immediate:!0,flush:"post"}),P(function(){i()})}}}export{j as a,h as l,T as u};
