import{ax as C,bc as k,bm as p,bn as W,bo as G,bp as w,bq as B,br as K,Q as U,aL as D,bs as q,bt as H,bf as L,bu as Q,bv as X,be as Y,ap as z,bw as J}from"./index-BJG0daiy.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var V=/\s/;function Z(n){for(var e=n.length;e--&&V.test(n.charAt(e)););return e}var j=Z,nn=j,en=/^\s+/;function tn(n){return n&&n.slice(0,nn(n)+1).replace(en,"")}var rn=tn,an=rn,x=C,sn=k,I=NaN,fn=/^[-+]0x[0-9a-f]+$/i,un=/^0b[01]+$/i,on=/^0o[0-7]+$/i,ln=parseInt;function mn(n){if(typeof n=="number")return n;if(sn(n))return I;if(x(n)){var e=typeof n.valueOf=="function"?n.valueOf():n;n=x(e)?e+"":e}if(typeof n!="string")return n===0?n:+n;n=an(n);var t=un.test(n);return t||on.test(n)?ln(n.slice(2),t?2:8):fn.test(n)?I:+n}var cn=mn;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var dn=p,bn=function(){return dn.Date.now()},vn=bn,_n=C,y=vn,S=cn,gn="Expected a function",yn=Math.max,Tn=Math.min;function On(n,e,t){var s,i,f,u,a,l,m=0,T=!1,c=!1,v=!0;if(typeof n!="function")throw new TypeError(gn);e=S(e)||0,_n(t)&&(T=!!t.leading,c="maxWait"in t,f=c?yn(S(t.maxWait)||0,e):f,v="trailing"in t?!!t.trailing:v);function _(r){var o=s,d=i;return s=i=void 0,m=r,u=n.apply(d,o),u}function N(r){return m=r,a=setTimeout(b,e),T?_(r):u}function P(r){var o=r-l,d=r-m,h=e-o;return c?Tn(h,f-d):h}function O(r){var o=r-l,d=r-m;return l===void 0||o>=e||o<0||c&&d>=f}function b(){var r=y();if(O(r))return $(r);a=setTimeout(b,P(r))}function $(r){return a=void 0,v&&s?_(r):(s=i=void 0,u)}function R(){a!==void 0&&clearTimeout(a),m=0,s=l=i=a=void 0}function M(){return a===void 0?u:$(y())}function g(){var r=y(),o=O(r);if(s=arguments,i=this,l=r,o){if(a===void 0)return N(l);if(c)return clearTimeout(a),a=setTimeout(b,e),_(l)}return a===void 0&&(a=setTimeout(b,e)),u}return g.cancel=R,g.flush=M,g}var le=On;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function $n(n){var e=n==null?0:n.length;return e?n[e-1]:void 0}var hn=$n;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var E=W,xn=K,In=U,A=E?E.isConcatSpreadable:void 0;function Sn(n){return In(n)||xn(n)||!!(A&&n&&n[A])}var En=Sn,An=B,Cn=En;function F(n,e,t,s,i){var f=-1,u=n.length;for(t||(t=Cn),i||(i=[]);++f<u;){var a=n[f];e>0&&t(a)?e>1?F(a,e-1,t,s,i):An(i,a):s||(i[i.length]=a)}return i}var Ln=F,Fn=Ln;function Nn(n){var e=n==null?0:n.length;return e?Fn(n,1):[]}var Pn=Nn,Rn=Pn,Mn=G,kn=w;function pn(n){return kn(Mn(n,void 0,Rn),n+"")}var Wn=pn;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Gn=Y,wn=z;function Bn(n,e){return e.length<2?n:Gn(n,wn(e,0,-1))}var Kn=Bn,Un=L,Dn=hn,qn=Kn,Hn=Q;function Qn(n,e){return e=Un(e,n),n=qn(n,e),n==null||delete n[Hn(Dn(e))]}var Xn=Qn,Yn=J;function zn(n){return Yn(n)?void 0:n}var Jn=zn,Vn=D,Zn=X,jn=Xn,ne=L,ee=q,te=Jn,re=Wn,ae=H,ie=1,se=2,fe=4,ue=re(function(n,e){var t={};if(n==null)return t;var s=!1;e=Vn(e,function(f){return f=ne(f,n),s||(s=f.length>1),f}),ee(n,ae(n),t),s&&(t=Zn(t,ie|se|fe,te));for(var i=e.length;i--;)jn(t,e[i]);return t}),me=ue;export{Ln as _,Wn as a,le as d,hn as l,me as o,cn as t};
