(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{233:function(t,n,r){"use strict";var e=r(8),a=r(22),i=r(40),c=r(136),s=r(88),o=r(17),u=r(135).f,l=r(89).f,p=r(14).f,f=r(235).trim,v=e.Number,d=v,h=v.prototype,g="Number"==i(r(57)(h)),w="trim"in String.prototype,b=function(t){var n=s(t,!1);if("string"==typeof n&&n.length>2){var r,e,a,i=(n=w?n.trim():f(n,3)).charCodeAt(0);if(43===i||45===i){if(88===(r=n.charCodeAt(2))||120===r)return NaN}else if(48===i){switch(n.charCodeAt(1)){case 66:case 98:e=2,a=49;break;case 79:case 111:e=8,a=55;break;default:return+n}for(var c,o=n.slice(2),u=0,l=o.length;u<l;u++)if((c=o.charCodeAt(u))<48||c>a)return NaN;return parseInt(o,e)}}return+n};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(t){var n=arguments.length<1?0:t,r=this;return r instanceof v&&(g?o(function(){h.valueOf.call(r)}):"Number"!=i(r))?c(new d(b(n)),r,v):b(n)};for(var N,m=r(13)?u(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),_=0;m.length>_;_++)a(d,N=m[_])&&!a(v,N)&&p(v,N,l(d,N));v.prototype=h,h.constructor=v,r(21)(e,"Number",v)}},235:function(t,n,r){var e=r(2),a=r(27),i=r(17),c=r(236),s="["+c+"]",o=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),l=function(t,n,r){var a={},s=i(function(){return!!c[t]()||"​"!="​"[t]()}),o=a[t]=s?n(p):c[t];r&&(a[r]=o),e(e.P+e.F*s,"String",a)},p=l.trim=function(t,n){return t=String(a(t)),1&n&&(t=t.replace(o,"")),2&n&&(t=t.replace(u,"")),t};t.exports=l},236:function(t,n){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},239:function(t,n,r){},240:function(t,n,r){},254:function(t,n,r){"use strict";var e=r(239);r.n(e).a},255:function(t,n,r){"use strict";var e=r(240);r.n(e).a},257:function(t,n,r){"use strict";r(39),r(233);var e={left:"v-row-align-left",center:"v-row-align-center",right:"v-row-align-right"},a={name:"VRow",props:{gutter:{type:[Number,String]},align:{type:String,validator:function(t){return void 0!==e[t]}}},mounted:function(){var t=this.gutter;t&&this.$children.forEach(function(n){n.gutter=t})},computed:{rowStyle:function(t){var n=t.gutter;if(n){var r=n/2;return{marginLeft:"-".concat(r,"px"),marginRight:"-".concat(r,"px")}}},rowClass:function(t){var n=t.align,r=e[n];return r||""}}},i=(r(254),r(38)),c=Object(i.a)(a,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"v-row",class:this.rowClass,style:this.rowStyle},[this._t("default")],2)},[],!1,null,"7a55ef56",null);n.a=c.exports},258:function(t,n,r){"use strict";var e=r(43),a=(r(233),r(137),r(138),r(39),r(91),function(t){var n=Object.keys(t);if(0===n.length)return!1;var r=!0;return n.forEach(function(t){["span","offset"].includes(t)||(r=!1)}),r}),i=function(t,n){if(!t)return[];var r=[],e=t.span,a=t.offset;return e&&r.push("".concat(n).concat(e)),a&&r.push("".concat(n,"offset-").concat(a)),r},c={name:"VCol",props:{span:{type:[Number,String]},offset:{type:[Number,String]},ipad:{type:Object,validator:a},narrowPc:{type:Object,validator:a},widePc:{type:Object,validator:a}},data:function(){return{gutter:0}},computed:{colClasses:function(t){var n=t.span,r=t.offset,a=t.ipad,c=t.narrowPc,s=t.widePc;return[].concat(Object(e.a)(i({span:n,offset:r},"v-col-")),Object(e.a)(i(a,"v-col-ipad-")),Object(e.a)(i(c,"v-col-narrow-pc-")),Object(e.a)(i(s,"v-col-wide-pc-")))},colStyle:function(t){var n=t.gutter;if(n){var r=n/2;return{paddingLeft:"".concat(r,"px"),paddingRight:"".concat(r,"px")}}}}},s=(r(255),r(38)),o=Object(s.a)(c,function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"v-col",class:this.colClasses,style:this.colStyle},[this._t("default")],2)},[],!1,null,"3937934c",null);n.a=o.exports},310:function(t,n,r){},412:function(t,n,r){"use strict";var e=r(310);r.n(e).a},483:function(t,n,r){"use strict";r.r(n);var e=r(257),a=r(258),i={name:"LayoutResponsive",components:{"v-row":e.a,"v-col":a.a}},c=(r(412),r(38)),s=Object(c.a)(i,function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"layout"},[n("br"),this._v(" "),n("v-row",{attrs:{gutter:10}},[n("v-col",{attrs:{span:6,ipad:{span:8},"narrow-pc":{span:6},"wide-pc":{span:4}}},[n("div",{staticClass:"content dark"})]),this._v(" "),n("v-col",{attrs:{span:6,ipad:{span:4},"narrow-pc":{span:6},"wide-pc":{span:8}}},[n("div",{staticClass:"content light"})]),this._v(" "),n("v-col",{attrs:{span:6,ipad:{span:4},"narrow-pc":{span:6},"wide-pc":{span:8}}},[n("div",{staticClass:"content dark"})]),this._v(" "),n("v-col",{attrs:{span:6,ipad:{span:8},"narrow-pc":{span:6},"wide-pc":{span:4}}},[n("div",{staticClass:"content light"})])],1),this._v(" "),n("br")],1)},[],!1,null,null,null);n.default=s.exports}}]);