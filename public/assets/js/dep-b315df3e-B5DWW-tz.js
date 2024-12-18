import{ak as C,b4 as M,be as W,bf as G,bg as p,bh as B,bi as K,bj as U,L as w,aC as D,bk as H,bl as X,b7 as L,bm as Y,bn as j,b6 as q,ac as z,bo as J}from"./index-BrogXIyH.js";/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var Q=/\s/;function V(n){for(var e=n.length;e--&&Q.test(n.charAt(e)););return e}var Z=V,nn=Z,en=/^\s+/;function tn(n){return n&&n.slice(0,nn(n)+1).replace(en,"")}var rn=tn,an=rn,x=C,sn=M,I=NaN,fn=/^[-+]0x[0-9a-f]+$/i,ln=/^0b[01]+$/i,on=/^0o[0-7]+$/i,un=parseInt;function mn(n){if(typeof n=="number")return n;if(sn(n))return I;if(x(n)){var e=typeof n.valueOf=="function"?n.valueOf():n;n=x(e)?e+"":e}if(typeof n!="string")return n===0?n:+n;n=an(n);var t=ln.test(n);return t||on.test(n)?un(n.slice(2),t?2:8):fn.test(n)?I:+n}var cn=mn;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var dn=W,bn=function(){return dn.Date.now()},vn=bn,_n=C,y=vn,S=cn,gn="Expected a function",yn=Math.max,Tn=Math.min;function hn(n,e,t){var s,i,f,l,a,u,m=0,T=!1,c=!1,v=!0;if(typeof n!="function")throw new TypeError(gn);e=S(e)||0,_n(t)&&(T=!!t.leading,c="maxWait"in t,f=c?yn(S(t.maxWait)||0,e):f,v="trailing"in t?!!t.trailing:v);function _(r){var o=s,d=i;return s=i=void 0,m=r,l=n.apply(d,o),l}function N(r){return m=r,a=setTimeout(b,e),T?_(r):l}function P(r){var o=r-u,d=r-m,$=e-o;return c?Tn($,f-d):$}function h(r){var o=r-u,d=r-m;return u===void 0||o>=e||o<0||c&&d>=f}function b(){var r=y();if(h(r))return O(r);a=setTimeout(b,P(r))}function O(r){return a=void 0,v&&s?_(r):(s=i=void 0,l)}function k(){a!==void 0&&clearTimeout(a),m=0,s=u=i=a=void 0}function R(){return a===void 0?l:O(y())}function g(){var r=y(),o=h(r);if(s=arguments,i=this,u=r,o){if(a===void 0)return N(u);if(c)return clearTimeout(a),a=setTimeout(b,e),_(u)}return a===void 0&&(a=setTimeout(b,e)),l}return g.cancel=k,g.flush=R,g}var ue=hn;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */function On(n){var e=n==null?0:n.length;return e?n[e-1]:void 0}var $n=On;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var E=G,xn=U,In=w,A=E?E.isConcatSpreadable:void 0;function Sn(n){return In(n)||xn(n)||!!(A&&n&&n[A])}var En=Sn,An=K,Cn=En;function F(n,e,t,s,i){var f=-1,l=n.length;for(t||(t=Cn),i||(i=[]);++f<l;){var a=n[f];e>0&&t(a)?e>1?F(a,e-1,t,s,i):An(i,a):s||(i[i.length]=a)}return i}var Ln=F,Fn=Ln;function Nn(n){var e=n==null?0:n.length;return e?Fn(n,1):[]}var Pn=Nn,kn=Pn,Rn=p,Mn=B;function Wn(n){return Mn(Rn(n,void 0,kn),n+"")}var Gn=Wn;/**
 * tdesign v1.10.4
 * (c) 2024 tdesign
 * @license MIT
 */var pn=q,Bn=z;function Kn(n,e){return e.length<2?n:pn(n,Bn(e,0,-1))}var Un=Kn,wn=L,Dn=$n,Hn=Un,Xn=Y;function Yn(n,e){return e=wn(e,n),n=Hn(n,e),n==null||delete n[Xn(Dn(e))]}var jn=Yn,qn=J;function zn(n){return qn(n)?void 0:n}var Jn=zn,Qn=D,Vn=j,Zn=jn,ne=L,ee=H,te=Jn,re=Gn,ae=X,ie=1,se=2,fe=4,le=re(function(n,e){var t={};if(n==null)return t;var s=!1;e=Qn(e,function(f){return f=ne(f,n),s||(s=f.length>1),f}),ee(n,ae(n),t),s&&(t=Vn(t,ie|se|fe,te));for(var i=e.length;i--;)Zn(t,e[i]);return t}),me=le;export{Ln as _,Gn as a,ue as d,$n as l,me as o,cn as t};
