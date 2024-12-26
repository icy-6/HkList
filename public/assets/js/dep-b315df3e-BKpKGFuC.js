import{aw as C,bb as k,bl as W,bm as p,bn as G,bo as K,bp as w,bq as B,P as U,aK as D,br as q,bs as H,be as F,bt as X,bu as Y,bd as z,ao as J,bv as Q}from"./index-D3wDr3YC.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var V=/\s/;function Z(n){for(var e=n.length;e--&&V.test(n.charAt(e)););return e}var j=Z,nn=j,en=/^\s+/;function tn(n){return n&&n.slice(0,nn(n)+1).replace(en,"")}var rn=tn,an=rn,x=C,sn=k,I=NaN,fn=/^[-+]0x[0-9a-f]+$/i,on=/^0b[01]+$/i,un=/^0o[0-7]+$/i,ln=parseInt;function mn(n){if(typeof n=="number")return n;if(sn(n))return I;if(x(n)){var e=typeof n.valueOf=="function"?n.valueOf():n;n=x(e)?e+"":e}if(typeof n!="string")return n===0?n:+n;n=an(n);var t=on.test(n);return t||un.test(n)?ln(n.slice(2),t?2:8):fn.test(n)?I:+n}var cn=mn;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var dn=W,bn=function(){return dn.Date.now()},vn=bn,_n=C,y=vn,S=cn,gn="Expected a function",yn=Math.max,Tn=Math.min;function On(n,e,t){var s,i,f,o,a,l,m=0,T=!1,c=!1,v=!0;if(typeof n!="function")throw new TypeError(gn);e=S(e)||0,_n(t)&&(T=!!t.leading,c="maxWait"in t,f=c?yn(S(t.maxWait)||0,e):f,v="trailing"in t?!!t.trailing:v);function _(r){var u=s,d=i;return s=i=void 0,m=r,o=n.apply(d,u),o}function P(r){return m=r,a=setTimeout(b,e),T?_(r):o}function N(r){var u=r-l,d=r-m,h=e-u;return c?Tn(h,f-d):h}function O(r){var u=r-l,d=r-m;return l===void 0||u>=e||u<0||c&&d>=f}function b(){var r=y();if(O(r))return $(r);a=setTimeout(b,N(r))}function $(r){return a=void 0,v&&s?_(r):(s=i=void 0,o)}function R(){a!==void 0&&clearTimeout(a),m=0,s=l=i=a=void 0}function M(){return a===void 0?o:$(y())}function g(){var r=y(),u=O(r);if(s=arguments,i=this,l=r,u){if(a===void 0)return P(l);if(c)return clearTimeout(a),a=setTimeout(b,e),_(l)}return a===void 0&&(a=setTimeout(b,e)),o}return g.cancel=R,g.flush=M,g}var le=On;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function $n(n){var e=n==null?0:n.length;return e?n[e-1]:void 0}var hn=$n;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var E=p,xn=B,In=U,A=E?E.isConcatSpreadable:void 0;function Sn(n){return In(n)||xn(n)||!!(A&&n&&n[A])}var En=Sn,An=w,Cn=En;function L(n,e,t,s,i){var f=-1,o=n.length;for(t||(t=Cn),i||(i=[]);++f<o;){var a=n[f];e>0&&t(a)?e>1?L(a,e-1,t,s,i):An(i,a):s||(i[i.length]=a)}return i}var Fn=L,Ln=Fn;function Pn(n){var e=n==null?0:n.length;return e?Ln(n,1):[]}var Nn=Pn,Rn=Nn,Mn=G,kn=K;function Wn(n){return kn(Mn(n,void 0,Rn),n+"")}var pn=Wn;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Gn=z,Kn=J;function wn(n,e){return e.length<2?n:Gn(n,Kn(e,0,-1))}var Bn=wn,Un=F,Dn=hn,qn=Bn,Hn=X;function Xn(n,e){return e=Un(e,n),n=qn(n,e),n==null||delete n[Hn(Dn(e))]}var Yn=Xn,zn=Q;function Jn(n){return zn(n)?void 0:n}var Qn=Jn,Vn=D,Zn=Y,jn=Yn,ne=F,ee=q,te=Qn,re=pn,ae=H,ie=1,se=2,fe=4,oe=re(function(n,e){var t={};if(n==null)return t;var s=!1;e=Vn(e,function(f){return f=ne(f,n),s||(s=f.length>1),f}),ee(n,ae(n),t),s&&(t=Zn(t,ie|se|fe,te));for(var i=e.length;i--;)jn(t,e[i]);return t}),me=oe;export{Fn as _,pn as a,le as d,hn as l,me as o,cn as t};
