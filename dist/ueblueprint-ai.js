/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$5=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;class n$2{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$8=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$5)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$7,defineProperty:e$4,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$1}=Object,a$2=globalThis,c$1=a$2.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$6=a$2.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$2={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$2=(t,s)=>!i$7(t,s),b={attribute:!0,type:String,converter:u$2,reflect:!1,useDefault:!1,hasChanged:f$2};Symbol.metadata??=Symbol("metadata"),a$2.litPropertyMetadata??=new WeakMap;class y$1 extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$4(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$2).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$2;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$2)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}}y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$6?.({ReactiveElement:y$1}),(a$2.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$6=t$1.trustedTypes,s$1=i$6?i$6.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$3="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n=`<${o$2}>`,r=document,l=()=>r.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a$1=Array.isArray,u$1=t=>a$1(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p$5=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T$1=Symbol.for("lit-noChange"),E$1=Symbol.for("lit-nothing"),A$1=new WeakMap,C=r.createTreeWalker(r,129);function P(t,i){if(!a$1(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V$1=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f$1;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f$1?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f$1,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p$5):c===g||c===p$5?c=m:c===v||c===_?c=f$1:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f$1?s+n:d>=0?(o.push(a),s.slice(0,d)+e$3+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V$1(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$3)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L$1:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$6?i$6.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T$1)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z$1(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E$1||null==t||""===t?(this._$AH!==E$1&&this._$AR(),this._$AH=E$1):t!==this._$AH&&t!==T$1&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u$1(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E$1&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A$1.get(t.strings);return void 0===i&&A$1.set(t.strings,i=new N(t)),i}k(t){a$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E$1;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T$1,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T$1&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E$1?t=E$1:t!==E$1&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E$1?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E$1);}}class L$1 extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E$1)===T$1)return;const s=this._$AH,e=t===E$1&&s!==E$1||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E$1&&(s===E$1||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z$1{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$1.litHtmlPolyfillSupport;j?.(N,R),(t$1.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i$5 extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T$1}}i$5._$litElement$=!0,i$5["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i$5});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$5});(s.litElementVersions??=[]).push("4.2.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$2=t=>(...e)=>({_$litDirective$:t,values:e});class i$4{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e$1 extends i$4{constructor(i){if(super(i),this.it=E$1,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===E$1||null==r)return this._t=void 0,this.it=r;if(r===T$1)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e$1.directiveName="unsafeHTML",e$1.resultType=1;const o=e$2(e$1);

/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || from);
}

var Bounds = /** @class */ (function () {
    function Bounds(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    Bounds.prototype.add = function (x, y, w, h) {
        return new Bounds(this.left + x, this.top + y, this.width + w, this.height + h);
    };
    Bounds.fromClientRect = function (context, clientRect) {
        return new Bounds(clientRect.left + context.windowBounds.left, clientRect.top + context.windowBounds.top, clientRect.width, clientRect.height);
    };
    Bounds.fromDOMRectList = function (context, domRectList) {
        var domRect = Array.from(domRectList).find(function (rect) { return rect.width !== 0; });
        return domRect
            ? new Bounds(domRect.left + context.windowBounds.left, domRect.top + context.windowBounds.top, domRect.width, domRect.height)
            : Bounds.EMPTY;
    };
    Bounds.EMPTY = new Bounds(0, 0, 0, 0);
    return Bounds;
}());
var parseBounds = function (context, node) {
    return Bounds.fromClientRect(context, node.getBoundingClientRect());
};
var parseDocumentSize = function (document) {
    var body = document.body;
    var documentElement = document.documentElement;
    if (!body || !documentElement) {
        throw new Error("Unable to get document size");
    }
    var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
    var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
    return new Bounds(0, 0, width, height);
};

/*
 * css-line-break 2.1.0 <https://github.com/niklasvh/css-line-break#readme>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var toCodePoints$1 = function (str) {
    var codePoints = [];
    var i = 0;
    var length = str.length;
    while (i < length) {
        var value = str.charCodeAt(i++);
        if (value >= 0xd800 && value <= 0xdbff && i < length) {
            var extra = str.charCodeAt(i++);
            if ((extra & 0xfc00) === 0xdc00) {
                codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
            }
            else {
                codePoints.push(value);
                i--;
            }
        }
        else {
            codePoints.push(value);
        }
    }
    return codePoints;
};
var fromCodePoint$1 = function () {
    var codePoints = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        codePoints[_i] = arguments[_i];
    }
    if (String.fromCodePoint) {
        return String.fromCodePoint.apply(String, codePoints);
    }
    var length = codePoints.length;
    if (!length) {
        return '';
    }
    var codeUnits = [];
    var index = -1;
    var result = '';
    while (++index < length) {
        var codePoint = codePoints[index];
        if (codePoint <= 0xffff) {
            codeUnits.push(codePoint);
        }
        else {
            codePoint -= 0x10000;
            codeUnits.push((codePoint >> 10) + 0xd800, (codePoint % 0x400) + 0xdc00);
        }
        if (index + 1 === length || codeUnits.length > 0x4000) {
            result += String.fromCharCode.apply(String, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};
var chars$2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup$2 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i$2 = 0; i$2 < chars$2.length; i$2++) {
    lookup$2[chars$2.charCodeAt(i$2)] = i$2;
}

/*
 * utrie 1.0.2 <https://github.com/niklasvh/utrie>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars$1$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup$1$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i$1$1 = 0; i$1$1 < chars$1$1.length; i$1$1++) {
    lookup$1$1[chars$1$1.charCodeAt(i$1$1)] = i$1$1;
}
var decode$1 = function (base64) {
    var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    var buffer = typeof ArrayBuffer !== 'undefined' &&
        typeof Uint8Array !== 'undefined' &&
        typeof Uint8Array.prototype.slice !== 'undefined'
        ? new ArrayBuffer(bufferLength)
        : new Array(bufferLength);
    var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup$1$1[base64.charCodeAt(i)];
        encoded2 = lookup$1$1[base64.charCodeAt(i + 1)];
        encoded3 = lookup$1$1[base64.charCodeAt(i + 2)];
        encoded4 = lookup$1$1[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return buffer;
};
var polyUint16Array$1 = function (buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i = 0; i < length; i += 2) {
        bytes.push((buffer[i + 1] << 8) | buffer[i]);
    }
    return bytes;
};
var polyUint32Array$1 = function (buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i = 0; i < length; i += 4) {
        bytes.push((buffer[i + 3] << 24) | (buffer[i + 2] << 16) | (buffer[i + 1] << 8) | buffer[i]);
    }
    return bytes;
};

/** Shift size for getting the index-2 table offset. */
var UTRIE2_SHIFT_2$1 = 5;
/** Shift size for getting the index-1 table offset. */
var UTRIE2_SHIFT_1$1 = 6 + 5;
/**
 * Shift size for shifting left the index array values.
 * Increases possible data size with 16-bit index values at the cost
 * of compactability.
 * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
 */
var UTRIE2_INDEX_SHIFT$1 = 2;
/**
 * Difference between the two shift sizes,
 * for getting an index-1 offset from an index-2 offset. 6=11-5
 */
var UTRIE2_SHIFT_1_2$1 = UTRIE2_SHIFT_1$1 - UTRIE2_SHIFT_2$1;
/**
 * The part of the index-2 table for U+D800..U+DBFF stores values for
 * lead surrogate code _units_ not code _points_.
 * Values for lead surrogate code _points_ are indexed with this portion of the table.
 * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
 */
var UTRIE2_LSCP_INDEX_2_OFFSET$1 = 0x10000 >> UTRIE2_SHIFT_2$1;
/** Number of entries in a data block. 32=0x20 */
var UTRIE2_DATA_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_2$1;
/** Mask for getting the lower bits for the in-data-block offset. */
var UTRIE2_DATA_MASK$1 = UTRIE2_DATA_BLOCK_LENGTH$1 - 1;
var UTRIE2_LSCP_INDEX_2_LENGTH$1 = 0x400 >> UTRIE2_SHIFT_2$1;
/** Count the lengths of both BMP pieces. 2080=0x820 */
var UTRIE2_INDEX_2_BMP_LENGTH$1 = UTRIE2_LSCP_INDEX_2_OFFSET$1 + UTRIE2_LSCP_INDEX_2_LENGTH$1;
/**
 * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
 * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
 */
var UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 = UTRIE2_INDEX_2_BMP_LENGTH$1;
var UTRIE2_UTF8_2B_INDEX_2_LENGTH$1 = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
/**
 * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
 * Variable length, for code points up to highStart, where the last single-value range starts.
 * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
 * (For 0x100000 supplementary code points U+10000..U+10ffff.)
 *
 * The part of the index-2 table for supplementary code points starts
 * after this index-1 table.
 *
 * Both the index-1 table and the following part of the index-2 table
 * are omitted completely if there is only BMP data.
 */
var UTRIE2_INDEX_1_OFFSET$1 = UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 + UTRIE2_UTF8_2B_INDEX_2_LENGTH$1;
/**
 * Number of index-1 entries for the BMP. 32=0x20
 * This part of the index-1 table is omitted from the serialized form.
 */
var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 = 0x10000 >> UTRIE2_SHIFT_1$1;
/** Number of entries in an index-2 block. 64=0x40 */
var UTRIE2_INDEX_2_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_1_2$1;
/** Mask for getting the lower bits for the in-index-2-block offset. */
var UTRIE2_INDEX_2_MASK$1 = UTRIE2_INDEX_2_BLOCK_LENGTH$1 - 1;
var slice16$1 = function (view, start, end) {
    if (view.slice) {
        return view.slice(start, end);
    }
    return new Uint16Array(Array.prototype.slice.call(view, start, end));
};
var slice32$1 = function (view, start, end) {
    if (view.slice) {
        return view.slice(start, end);
    }
    return new Uint32Array(Array.prototype.slice.call(view, start, end));
};
var createTrieFromBase64$1 = function (base64, _byteLength) {
    var buffer = decode$1(base64);
    var view32 = Array.isArray(buffer) ? polyUint32Array$1(buffer) : new Uint32Array(buffer);
    var view16 = Array.isArray(buffer) ? polyUint16Array$1(buffer) : new Uint16Array(buffer);
    var headerLength = 24;
    var index = slice16$1(view16, headerLength / 2, view32[4] / 2);
    var data = view32[5] === 2
        ? slice16$1(view16, (headerLength + view32[4]) / 2)
        : slice32$1(view32, Math.ceil((headerLength + view32[4]) / 4));
    return new Trie$1(view32[0], view32[1], view32[2], view32[3], index, data);
};
var Trie$1 = /** @class */ (function () {
    function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index;
        this.data = data;
    }
    /**
     * Get the value for a code point as stored in the Trie.
     *
     * @param codePoint the code point
     * @return the value
     */
    Trie.prototype.get = function (codePoint) {
        var ix;
        if (codePoint >= 0) {
            if (codePoint < 0x0d800 || (codePoint > 0x0dbff && codePoint <= 0x0ffff)) {
                // Ordinary BMP code point, excluding leading surrogates.
                // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                // 16 bit data is stored in the index array itself.
                ix = this.index[codePoint >> UTRIE2_SHIFT_2$1];
                ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                return this.data[ix];
            }
            if (codePoint <= 0xffff) {
                // Lead Surrogate Code Point.  A Separate index section is stored for
                // lead surrogate code units and code points.
                //   The main index has the code unit data.
                //   For this function, we need the code point data.
                // Note: this expression could be refactored for slightly improved efficiency, but
                //       surrogate code points will be so rare in practice that it's not worth it.
                ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET$1 + ((codePoint - 0xd800) >> UTRIE2_SHIFT_2$1)];
                ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                return this.data[ix];
            }
            if (codePoint < this.highStart) {
                // Supplemental code point, use two-level lookup.
                ix = UTRIE2_INDEX_1_OFFSET$1 - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 + (codePoint >> UTRIE2_SHIFT_1$1);
                ix = this.index[ix];
                ix += (codePoint >> UTRIE2_SHIFT_2$1) & UTRIE2_INDEX_2_MASK$1;
                ix = this.index[ix];
                ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                return this.data[ix];
            }
            if (codePoint <= 0x10ffff) {
                return this.data[this.highValueIndex];
            }
        }
        // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
        return this.errorValue;
    };
    return Trie;
}());

/*
 * base64-arraybuffer 1.0.2 <https://github.com/niklasvh/base64-arraybuffer>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars$3 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup$3 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i$3 = 0; i$3 < chars$3.length; i$3++) {
    lookup$3[chars$3.charCodeAt(i$3)] = i$3;
}

var base64$1 = 'KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==';

var LETTER_NUMBER_MODIFIER = 50;
// Non-tailorable Line Breaking Classes
var BK = 1; //  Cause a line break (after)
var CR$1 = 2; //  Cause a line break (after), except between CR and LF
var LF$1 = 3; //  Cause a line break (after)
var CM = 4; //  Prohibit a line break between the character and the preceding character
var NL = 5; //  Cause a line break (after)
var WJ = 7; //  Prohibit line breaks before and after
var ZW = 8; //  Provide a break opportunity
var GL = 9; //  Prohibit line breaks before and after
var SP = 10; // Enable indirect line breaks
var ZWJ$1 = 11; // Prohibit line breaks within joiner sequences
// Break Opportunities
var B2 = 12; //  Provide a line break opportunity before and after the character
var BA = 13; //  Generally provide a line break opportunity after the character
var BB = 14; //  Generally provide a line break opportunity before the character
var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
var CB = 16; //   Provide a line break opportunity contingent on additional information
// Characters Prohibiting Certain Breaks
var CL = 17; //  Prohibit line breaks before
var CP = 18; //  Prohibit line breaks before
var EX = 19; //  Prohibit line breaks before
var IN = 20; //  Allow only indirect line breaks between pairs
var NS = 21; //  Allow only indirect line breaks before
var OP = 22; //  Prohibit line breaks after
var QU = 23; //  Act like they are both opening and closing
// Numeric Context
var IS = 24; //  Prevent breaks after any and before numeric
var NU = 25; //  Form numeric expressions for line breaking purposes
var PO = 26; //  Do not break following a numeric expression
var PR = 27; //  Do not break in front of a numeric expression
var SY = 28; //  Prevent a break before; and allow a break after
// Other Characters
var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
var EB = 32; //  Do not break from following Emoji Modifier
var EM = 33; //  Do not break from preceding Emoji Base
var H2 = 34; //  Form Korean syllable blocks
var H3 = 35; //  Form Korean syllable blocks
var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
var ID = 37; //  Break before or after; except in some numeric context
var JL = 38; //  Form Korean syllable blocks
var JV = 39; //  Form Korean syllable blocks
var JT = 40; //  Form Korean syllable blocks
var RI$1 = 41; //  Keep pairs together. For pairs; break before and after other classes
var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions
var ea_OP = [0x2329, 0xff08];
var BREAK_MANDATORY = '!';
var BREAK_NOT_ALLOWED$1 = '×';
var BREAK_ALLOWED$1 = '÷';
var UnicodeTrie$1 = createTrieFromBase64$1(base64$1);
var ALPHABETICS = [AL, HL];
var HARD_LINE_BREAKS = [BK, CR$1, LF$1, NL];
var SPACE$1 = [SP, ZW];
var PREFIX_POSTFIX = [PR, PO];
var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE$1);
var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
var HYPHEN = [HY, BA];
var codePointsToCharacterClasses = function (codePoints, lineBreak) {
    if (lineBreak === void 0) { lineBreak = 'strict'; }
    var types = [];
    var indices = [];
    var categories = [];
    codePoints.forEach(function (codePoint, index) {
        var classType = UnicodeTrie$1.get(codePoint);
        if (classType > LETTER_NUMBER_MODIFIER) {
            categories.push(true);
            classType -= LETTER_NUMBER_MODIFIER;
        }
        else {
            categories.push(false);
        }
        if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
            // U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
            if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
                indices.push(index);
                return types.push(CB);
            }
        }
        if (classType === CM || classType === ZWJ$1) {
            // LB10 Treat any remaining combining mark or ZWJ as AL.
            if (index === 0) {
                indices.push(index);
                return types.push(AL);
            }
            // LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
            // the base character in all of the following rules. Treat ZWJ as if it were CM.
            var prev = types[index - 1];
            if (LINE_BREAKS.indexOf(prev) === -1) {
                indices.push(indices[index - 1]);
                return types.push(prev);
            }
            indices.push(index);
            return types.push(AL);
        }
        indices.push(index);
        if (classType === CJ) {
            return types.push(lineBreak === 'strict' ? NS : ID);
        }
        if (classType === SA) {
            return types.push(AL);
        }
        if (classType === AI) {
            return types.push(AL);
        }
        // For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
        // and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
        // to take into account the actual line breaking properties for these characters.
        if (classType === XX) {
            if ((codePoint >= 0x20000 && codePoint <= 0x2fffd) || (codePoint >= 0x30000 && codePoint <= 0x3fffd)) {
                return types.push(ID);
            }
            else {
                return types.push(AL);
            }
        }
        types.push(classType);
    });
    return [indices, types, categories];
};
var isAdjacentWithSpaceIgnored = function (a, b, currentIndex, classTypes) {
    var current = classTypes[currentIndex];
    if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
        var i = currentIndex;
        while (i <= classTypes.length) {
            i++;
            var next = classTypes[i];
            if (next === b) {
                return true;
            }
            if (next !== SP) {
                break;
            }
        }
    }
    if (current === SP) {
        var i = currentIndex;
        while (i > 0) {
            i--;
            var prev = classTypes[i];
            if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
                var n = currentIndex;
                while (n <= classTypes.length) {
                    n++;
                    var next = classTypes[n];
                    if (next === b) {
                        return true;
                    }
                    if (next !== SP) {
                        break;
                    }
                }
            }
            if (prev !== SP) {
                break;
            }
        }
    }
    return false;
};
var previousNonSpaceClassType = function (currentIndex, classTypes) {
    var i = currentIndex;
    while (i >= 0) {
        var type = classTypes[i];
        if (type === SP) {
            i--;
        }
        else {
            return type;
        }
    }
    return 0;
};
var _lineBreakAtIndex = function (codePoints, classTypes, indicies, index, forbiddenBreaks) {
    if (indicies[index] === 0) {
        return BREAK_NOT_ALLOWED$1;
    }
    var currentIndex = index - 1;
    if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
        return BREAK_NOT_ALLOWED$1;
    }
    var beforeIndex = currentIndex - 1;
    var afterIndex = currentIndex + 1;
    var current = classTypes[currentIndex];
    // LB4 Always break after hard line breaks.
    // LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
    var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
    var next = classTypes[afterIndex];
    if (current === CR$1 && next === LF$1) {
        return BREAK_NOT_ALLOWED$1;
    }
    if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
        return BREAK_MANDATORY;
    }
    // LB6 Do not break before hard line breaks.
    if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB7 Do not break before spaces or zero width space.
    if (SPACE$1.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
    if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
        return BREAK_ALLOWED$1;
    }
    // LB8a Do not break after a zero width joiner.
    if (UnicodeTrie$1.get(codePoints[currentIndex]) === ZWJ$1) {
        return BREAK_NOT_ALLOWED$1;
    }
    // zwj emojis
    if ((current === EB || current === EM) && UnicodeTrie$1.get(codePoints[afterIndex]) === ZWJ$1) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB11 Do not break before or after Word joiner and related characters.
    if (current === WJ || next === WJ) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB12 Do not break after NBSP and related characters.
    if (current === GL) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
    if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
    if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB14 Do not break after ‘[’, even after spaces.
    if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB15 Do not break within ‘”[’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
    if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB17 Do not break within ‘——’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB18 Break after spaces.
    if (current === SP) {
        return BREAK_ALLOWED$1;
    }
    // LB19 Do not break before or after quotation marks, such as ‘ ” ’.
    if (current === QU || next === QU) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB20 Break before and after unresolved CB.
    if (next === CB || current === CB) {
        return BREAK_ALLOWED$1;
    }
    // LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
    if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB21a Don't break after Hebrew + Hyphen.
    if (before === HL && HYPHEN.indexOf(current) !== -1) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB21b Don’t break between Solidus and Hebrew letters.
    if (current === SY && next === HL) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB22 Do not break before ellipsis.
    if (next === IN) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB23 Do not break between digits and letters.
    if ((ALPHABETICS.indexOf(next) !== -1 && current === NU) || (ALPHABETICS.indexOf(current) !== -1 && next === NU)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
    if ((current === PR && [ID, EB, EM].indexOf(next) !== -1) ||
        ([ID, EB, EM].indexOf(current) !== -1 && next === PO)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
    if ((ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1) ||
        (PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB25 Do not break between the following pairs of classes relevant to numbers:
    if (
    // (PR | PO) × ( OP | HY )? NU
    ([PR, PO].indexOf(current) !== -1 &&
        (next === NU || ([OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU))) ||
        // ( OP | HY ) × NU
        ([OP, HY].indexOf(current) !== -1 && next === NU) ||
        // NU ×	(NU | SY | IS)
        (current === NU && [NU, SY, IS].indexOf(next) !== -1)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
    if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
        var prevIndex = currentIndex;
        while (prevIndex >= 0) {
            var type = classTypes[prevIndex];
            if (type === NU) {
                return BREAK_NOT_ALLOWED$1;
            }
            else if ([SY, IS].indexOf(type) !== -1) {
                prevIndex--;
            }
            else {
                break;
            }
        }
    }
    // NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
    if ([PR, PO].indexOf(next) !== -1) {
        var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
        while (prevIndex >= 0) {
            var type = classTypes[prevIndex];
            if (type === NU) {
                return BREAK_NOT_ALLOWED$1;
            }
            else if ([SY, IS].indexOf(type) !== -1) {
                prevIndex--;
            }
            else {
                break;
            }
        }
    }
    // LB26 Do not break a Korean syllable.
    if ((JL === current && [JL, JV, H2, H3].indexOf(next) !== -1) ||
        ([JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1) ||
        ([JT, H3].indexOf(current) !== -1 && next === JT)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB27 Treat a Korean Syllable Block the same as ID.
    if ((KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1) ||
        (KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB28 Do not break between alphabetics (“at”).
    if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
    if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
    if ((ALPHABETICS.concat(NU).indexOf(current) !== -1 &&
        next === OP &&
        ea_OP.indexOf(codePoints[afterIndex]) === -1) ||
        (ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP)) {
        return BREAK_NOT_ALLOWED$1;
    }
    // LB30a Break between two regional indicator symbols if and only if there are an even number of regional
    // indicators preceding the position of the break.
    if (current === RI$1 && next === RI$1) {
        var i = indicies[currentIndex];
        var count = 1;
        while (i > 0) {
            i--;
            if (classTypes[i] === RI$1) {
                count++;
            }
            else {
                break;
            }
        }
        if (count % 2 !== 0) {
            return BREAK_NOT_ALLOWED$1;
        }
    }
    // LB30b Do not break between an emoji base and an emoji modifier.
    if (current === EB && next === EM) {
        return BREAK_NOT_ALLOWED$1;
    }
    return BREAK_ALLOWED$1;
};
var cssFormattedClasses = function (codePoints, options) {
    if (!options) {
        options = { lineBreak: 'normal', wordBreak: 'normal' };
    }
    var _a = codePointsToCharacterClasses(codePoints, options.lineBreak), indicies = _a[0], classTypes = _a[1], isLetterNumber = _a[2];
    if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
        classTypes = classTypes.map(function (type) { return ([NU, AL, SA].indexOf(type) !== -1 ? ID : type); });
    }
    var forbiddenBreakpoints = options.wordBreak === 'keep-all'
        ? isLetterNumber.map(function (letterNumber, i) {
            return letterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
        })
        : undefined;
    return [indicies, classTypes, forbiddenBreakpoints];
};
var Break = /** @class */ (function () {
    function Break(codePoints, lineBreak, start, end) {
        this.codePoints = codePoints;
        this.required = lineBreak === BREAK_MANDATORY;
        this.start = start;
        this.end = end;
    }
    Break.prototype.slice = function () {
        return fromCodePoint$1.apply(void 0, this.codePoints.slice(this.start, this.end));
    };
    return Break;
}());
var LineBreaker = function (str, options) {
    var codePoints = toCodePoints$1(str);
    var _a = cssFormattedClasses(codePoints, options), indicies = _a[0], classTypes = _a[1], forbiddenBreakpoints = _a[2];
    var length = codePoints.length;
    var lastEnd = 0;
    var nextIndex = 0;
    return {
        next: function () {
            if (nextIndex >= length) {
                return { done: true, value: null };
            }
            var lineBreak = BREAK_NOT_ALLOWED$1;
            while (nextIndex < length &&
                (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) ===
                    BREAK_NOT_ALLOWED$1) { }
            if (lineBreak !== BREAK_NOT_ALLOWED$1 || nextIndex === length) {
                var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
                lastEnd = nextIndex;
                return { value: value, done: false };
            }
            return { done: true, value: null };
        },
    };
};

// https://www.w3.org/TR/css-syntax-3
var FLAG_UNRESTRICTED = 1 << 0;
var FLAG_ID = 1 << 1;
var FLAG_INTEGER = 1 << 2;
var FLAG_NUMBER = 1 << 3;
var LINE_FEED = 0x000a;
var SOLIDUS = 0x002f;
var REVERSE_SOLIDUS = 0x005c;
var CHARACTER_TABULATION = 0x0009;
var SPACE = 0x0020;
var QUOTATION_MARK = 0x0022;
var EQUALS_SIGN = 0x003d;
var NUMBER_SIGN = 0x0023;
var DOLLAR_SIGN = 0x0024;
var PERCENTAGE_SIGN = 0x0025;
var APOSTROPHE = 0x0027;
var LEFT_PARENTHESIS = 0x0028;
var RIGHT_PARENTHESIS = 0x0029;
var LOW_LINE = 0x005f;
var HYPHEN_MINUS = 0x002d;
var EXCLAMATION_MARK = 0x0021;
var LESS_THAN_SIGN = 0x003c;
var GREATER_THAN_SIGN = 0x003e;
var COMMERCIAL_AT = 0x0040;
var LEFT_SQUARE_BRACKET = 0x005b;
var RIGHT_SQUARE_BRACKET = 0x005d;
var CIRCUMFLEX_ACCENT = 0x003d;
var LEFT_CURLY_BRACKET = 0x007b;
var QUESTION_MARK = 0x003f;
var RIGHT_CURLY_BRACKET = 0x007d;
var VERTICAL_LINE = 0x007c;
var TILDE = 0x007e;
var CONTROL = 0x0080;
var REPLACEMENT_CHARACTER = 0xfffd;
var ASTERISK = 0x002a;
var PLUS_SIGN = 0x002b;
var COMMA = 0x002c;
var COLON = 0x003a;
var SEMICOLON = 0x003b;
var FULL_STOP = 0x002e;
var NULL = 0x0000;
var BACKSPACE = 0x0008;
var LINE_TABULATION = 0x000b;
var SHIFT_OUT = 0x000e;
var INFORMATION_SEPARATOR_ONE = 0x001f;
var DELETE = 0x007f;
var EOF = -1;
var ZERO = 0x0030;
var a = 0x0061;
var e = 0x0065;
var f = 0x0066;
var u = 0x0075;
var z = 0x007a;
var A = 0x0041;
var E = 0x0045;
var F = 0x0046;
var U = 0x0055;
var Z = 0x005a;
var isDigit = function (codePoint) { return codePoint >= ZERO && codePoint <= 0x0039; };
var isSurrogateCodePoint = function (codePoint) { return codePoint >= 0xd800 && codePoint <= 0xdfff; };
var isHex = function (codePoint) {
    return isDigit(codePoint) || (codePoint >= A && codePoint <= F) || (codePoint >= a && codePoint <= f);
};
var isLowerCaseLetter = function (codePoint) { return codePoint >= a && codePoint <= z; };
var isUpperCaseLetter = function (codePoint) { return codePoint >= A && codePoint <= Z; };
var isLetter = function (codePoint) { return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint); };
var isNonASCIICodePoint = function (codePoint) { return codePoint >= CONTROL; };
var isWhiteSpace = function (codePoint) {
    return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE;
};
var isNameStartCodePoint = function (codePoint) {
    return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
};
var isNameCodePoint = function (codePoint) {
    return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
};
var isNonPrintableCodePoint = function (codePoint) {
    return ((codePoint >= NULL && codePoint <= BACKSPACE) ||
        codePoint === LINE_TABULATION ||
        (codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE) ||
        codePoint === DELETE);
};
var isValidEscape = function (c1, c2) {
    if (c1 !== REVERSE_SOLIDUS) {
        return false;
    }
    return c2 !== LINE_FEED;
};
var isIdentifierStart = function (c1, c2, c3) {
    if (c1 === HYPHEN_MINUS) {
        return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
    }
    else if (isNameStartCodePoint(c1)) {
        return true;
    }
    else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
        return true;
    }
    return false;
};
var isNumberStart = function (c1, c2, c3) {
    if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
        if (isDigit(c2)) {
            return true;
        }
        return c2 === FULL_STOP && isDigit(c3);
    }
    if (c1 === FULL_STOP) {
        return isDigit(c2);
    }
    return isDigit(c1);
};
var stringToNumber = function (codePoints) {
    var c = 0;
    var sign = 1;
    if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
        if (codePoints[c] === HYPHEN_MINUS) {
            sign = -1;
        }
        c++;
    }
    var integers = [];
    while (isDigit(codePoints[c])) {
        integers.push(codePoints[c++]);
    }
    var int = integers.length ? parseInt(fromCodePoint$1.apply(void 0, integers), 10) : 0;
    if (codePoints[c] === FULL_STOP) {
        c++;
    }
    var fraction = [];
    while (isDigit(codePoints[c])) {
        fraction.push(codePoints[c++]);
    }
    var fracd = fraction.length;
    var frac = fracd ? parseInt(fromCodePoint$1.apply(void 0, fraction), 10) : 0;
    if (codePoints[c] === E || codePoints[c] === e) {
        c++;
    }
    var expsign = 1;
    if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
        if (codePoints[c] === HYPHEN_MINUS) {
            expsign = -1;
        }
        c++;
    }
    var exponent = [];
    while (isDigit(codePoints[c])) {
        exponent.push(codePoints[c++]);
    }
    var exp = exponent.length ? parseInt(fromCodePoint$1.apply(void 0, exponent), 10) : 0;
    return sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
};
var LEFT_PARENTHESIS_TOKEN = {
    type: 2 /* LEFT_PARENTHESIS_TOKEN */
};
var RIGHT_PARENTHESIS_TOKEN = {
    type: 3 /* RIGHT_PARENTHESIS_TOKEN */
};
var COMMA_TOKEN = { type: 4 /* COMMA_TOKEN */ };
var SUFFIX_MATCH_TOKEN = { type: 13 /* SUFFIX_MATCH_TOKEN */ };
var PREFIX_MATCH_TOKEN = { type: 8 /* PREFIX_MATCH_TOKEN */ };
var COLUMN_TOKEN = { type: 21 /* COLUMN_TOKEN */ };
var DASH_MATCH_TOKEN = { type: 9 /* DASH_MATCH_TOKEN */ };
var INCLUDE_MATCH_TOKEN = { type: 10 /* INCLUDE_MATCH_TOKEN */ };
var LEFT_CURLY_BRACKET_TOKEN = {
    type: 11 /* LEFT_CURLY_BRACKET_TOKEN */
};
var RIGHT_CURLY_BRACKET_TOKEN = {
    type: 12 /* RIGHT_CURLY_BRACKET_TOKEN */
};
var SUBSTRING_MATCH_TOKEN = { type: 14 /* SUBSTRING_MATCH_TOKEN */ };
var BAD_URL_TOKEN = { type: 23 /* BAD_URL_TOKEN */ };
var BAD_STRING_TOKEN = { type: 1 /* BAD_STRING_TOKEN */ };
var CDO_TOKEN = { type: 25 /* CDO_TOKEN */ };
var CDC_TOKEN = { type: 24 /* CDC_TOKEN */ };
var COLON_TOKEN = { type: 26 /* COLON_TOKEN */ };
var SEMICOLON_TOKEN = { type: 27 /* SEMICOLON_TOKEN */ };
var LEFT_SQUARE_BRACKET_TOKEN = {
    type: 28 /* LEFT_SQUARE_BRACKET_TOKEN */
};
var RIGHT_SQUARE_BRACKET_TOKEN = {
    type: 29 /* RIGHT_SQUARE_BRACKET_TOKEN */
};
var WHITESPACE_TOKEN = { type: 31 /* WHITESPACE_TOKEN */ };
var EOF_TOKEN = { type: 32 /* EOF_TOKEN */ };
var Tokenizer = /** @class */ (function () {
    function Tokenizer() {
        this._value = [];
    }
    Tokenizer.prototype.write = function (chunk) {
        this._value = this._value.concat(toCodePoints$1(chunk));
    };
    Tokenizer.prototype.read = function () {
        var tokens = [];
        var token = this.consumeToken();
        while (token !== EOF_TOKEN) {
            tokens.push(token);
            token = this.consumeToken();
        }
        return tokens;
    };
    Tokenizer.prototype.consumeToken = function () {
        var codePoint = this.consumeCodePoint();
        switch (codePoint) {
            case QUOTATION_MARK:
                return this.consumeStringToken(QUOTATION_MARK);
            case NUMBER_SIGN:
                var c1 = this.peekCodePoint(0);
                var c2 = this.peekCodePoint(1);
                var c3 = this.peekCodePoint(2);
                if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
                    var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
                    var value = this.consumeName();
                    return { type: 5 /* HASH_TOKEN */, value: value, flags: flags };
                }
                break;
            case DOLLAR_SIGN:
                if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return SUFFIX_MATCH_TOKEN;
                }
                break;
            case APOSTROPHE:
                return this.consumeStringToken(APOSTROPHE);
            case LEFT_PARENTHESIS:
                return LEFT_PARENTHESIS_TOKEN;
            case RIGHT_PARENTHESIS:
                return RIGHT_PARENTHESIS_TOKEN;
            case ASTERISK:
                if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return SUBSTRING_MATCH_TOKEN;
                }
                break;
            case PLUS_SIGN:
                if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeNumericToken();
                }
                break;
            case COMMA:
                return COMMA_TOKEN;
            case HYPHEN_MINUS:
                var e1 = codePoint;
                var e2 = this.peekCodePoint(0);
                var e3 = this.peekCodePoint(1);
                if (isNumberStart(e1, e2, e3)) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeNumericToken();
                }
                if (isIdentifierStart(e1, e2, e3)) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeIdentLikeToken();
                }
                if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
                    this.consumeCodePoint();
                    this.consumeCodePoint();
                    return CDC_TOKEN;
                }
                break;
            case FULL_STOP:
                if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeNumericToken();
                }
                break;
            case SOLIDUS:
                if (this.peekCodePoint(0) === ASTERISK) {
                    this.consumeCodePoint();
                    while (true) {
                        var c = this.consumeCodePoint();
                        if (c === ASTERISK) {
                            c = this.consumeCodePoint();
                            if (c === SOLIDUS) {
                                return this.consumeToken();
                            }
                        }
                        if (c === EOF) {
                            return this.consumeToken();
                        }
                    }
                }
                break;
            case COLON:
                return COLON_TOKEN;
            case SEMICOLON:
                return SEMICOLON_TOKEN;
            case LESS_THAN_SIGN:
                if (this.peekCodePoint(0) === EXCLAMATION_MARK &&
                    this.peekCodePoint(1) === HYPHEN_MINUS &&
                    this.peekCodePoint(2) === HYPHEN_MINUS) {
                    this.consumeCodePoint();
                    this.consumeCodePoint();
                    return CDO_TOKEN;
                }
                break;
            case COMMERCIAL_AT:
                var a1 = this.peekCodePoint(0);
                var a2 = this.peekCodePoint(1);
                var a3 = this.peekCodePoint(2);
                if (isIdentifierStart(a1, a2, a3)) {
                    var value = this.consumeName();
                    return { type: 7 /* AT_KEYWORD_TOKEN */, value: value };
                }
                break;
            case LEFT_SQUARE_BRACKET:
                return LEFT_SQUARE_BRACKET_TOKEN;
            case REVERSE_SOLIDUS:
                if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeIdentLikeToken();
                }
                break;
            case RIGHT_SQUARE_BRACKET:
                return RIGHT_SQUARE_BRACKET_TOKEN;
            case CIRCUMFLEX_ACCENT:
                if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return PREFIX_MATCH_TOKEN;
                }
                break;
            case LEFT_CURLY_BRACKET:
                return LEFT_CURLY_BRACKET_TOKEN;
            case RIGHT_CURLY_BRACKET:
                return RIGHT_CURLY_BRACKET_TOKEN;
            case u:
            case U:
                var u1 = this.peekCodePoint(0);
                var u2 = this.peekCodePoint(1);
                if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
                    this.consumeCodePoint();
                    this.consumeUnicodeRangeToken();
                }
                this.reconsumeCodePoint(codePoint);
                return this.consumeIdentLikeToken();
            case VERTICAL_LINE:
                if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return DASH_MATCH_TOKEN;
                }
                if (this.peekCodePoint(0) === VERTICAL_LINE) {
                    this.consumeCodePoint();
                    return COLUMN_TOKEN;
                }
                break;
            case TILDE:
                if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return INCLUDE_MATCH_TOKEN;
                }
                break;
            case EOF:
                return EOF_TOKEN;
        }
        if (isWhiteSpace(codePoint)) {
            this.consumeWhiteSpace();
            return WHITESPACE_TOKEN;
        }
        if (isDigit(codePoint)) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeNumericToken();
        }
        if (isNameStartCodePoint(codePoint)) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeIdentLikeToken();
        }
        return { type: 6 /* DELIM_TOKEN */, value: fromCodePoint$1(codePoint) };
    };
    Tokenizer.prototype.consumeCodePoint = function () {
        var value = this._value.shift();
        return typeof value === 'undefined' ? -1 : value;
    };
    Tokenizer.prototype.reconsumeCodePoint = function (codePoint) {
        this._value.unshift(codePoint);
    };
    Tokenizer.prototype.peekCodePoint = function (delta) {
        if (delta >= this._value.length) {
            return -1;
        }
        return this._value[delta];
    };
    Tokenizer.prototype.consumeUnicodeRangeToken = function () {
        var digits = [];
        var codePoint = this.consumeCodePoint();
        while (isHex(codePoint) && digits.length < 6) {
            digits.push(codePoint);
            codePoint = this.consumeCodePoint();
        }
        var questionMarks = false;
        while (codePoint === QUESTION_MARK && digits.length < 6) {
            digits.push(codePoint);
            codePoint = this.consumeCodePoint();
            questionMarks = true;
        }
        if (questionMarks) {
            var start_1 = parseInt(fromCodePoint$1.apply(void 0, digits.map(function (digit) { return (digit === QUESTION_MARK ? ZERO : digit); })), 16);
            var end = parseInt(fromCodePoint$1.apply(void 0, digits.map(function (digit) { return (digit === QUESTION_MARK ? F : digit); })), 16);
            return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start_1, end: end };
        }
        var start = parseInt(fromCodePoint$1.apply(void 0, digits), 16);
        if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
            this.consumeCodePoint();
            codePoint = this.consumeCodePoint();
            var endDigits = [];
            while (isHex(codePoint) && endDigits.length < 6) {
                endDigits.push(codePoint);
                codePoint = this.consumeCodePoint();
            }
            var end = parseInt(fromCodePoint$1.apply(void 0, endDigits), 16);
            return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start, end: end };
        }
        else {
            return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start, end: start };
        }
    };
    Tokenizer.prototype.consumeIdentLikeToken = function () {
        var value = this.consumeName();
        if (value.toLowerCase() === 'url' && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
            this.consumeCodePoint();
            return this.consumeUrlToken();
        }
        else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
            this.consumeCodePoint();
            return { type: 19 /* FUNCTION_TOKEN */, value: value };
        }
        return { type: 20 /* IDENT_TOKEN */, value: value };
    };
    Tokenizer.prototype.consumeUrlToken = function () {
        var value = [];
        this.consumeWhiteSpace();
        if (this.peekCodePoint(0) === EOF) {
            return { type: 22 /* URL_TOKEN */, value: '' };
        }
        var next = this.peekCodePoint(0);
        if (next === APOSTROPHE || next === QUOTATION_MARK) {
            var stringToken = this.consumeStringToken(this.consumeCodePoint());
            if (stringToken.type === 0 /* STRING_TOKEN */) {
                this.consumeWhiteSpace();
                if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                    this.consumeCodePoint();
                    return { type: 22 /* URL_TOKEN */, value: stringToken.value };
                }
            }
            this.consumeBadUrlRemnants();
            return BAD_URL_TOKEN;
        }
        while (true) {
            var codePoint = this.consumeCodePoint();
            if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
                return { type: 22 /* URL_TOKEN */, value: fromCodePoint$1.apply(void 0, value) };
            }
            else if (isWhiteSpace(codePoint)) {
                this.consumeWhiteSpace();
                if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                    this.consumeCodePoint();
                    return { type: 22 /* URL_TOKEN */, value: fromCodePoint$1.apply(void 0, value) };
                }
                this.consumeBadUrlRemnants();
                return BAD_URL_TOKEN;
            }
            else if (codePoint === QUOTATION_MARK ||
                codePoint === APOSTROPHE ||
                codePoint === LEFT_PARENTHESIS ||
                isNonPrintableCodePoint(codePoint)) {
                this.consumeBadUrlRemnants();
                return BAD_URL_TOKEN;
            }
            else if (codePoint === REVERSE_SOLIDUS) {
                if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                    value.push(this.consumeEscapedCodePoint());
                }
                else {
                    this.consumeBadUrlRemnants();
                    return BAD_URL_TOKEN;
                }
            }
            else {
                value.push(codePoint);
            }
        }
    };
    Tokenizer.prototype.consumeWhiteSpace = function () {
        while (isWhiteSpace(this.peekCodePoint(0))) {
            this.consumeCodePoint();
        }
    };
    Tokenizer.prototype.consumeBadUrlRemnants = function () {
        while (true) {
            var codePoint = this.consumeCodePoint();
            if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
                return;
            }
            if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                this.consumeEscapedCodePoint();
            }
        }
    };
    Tokenizer.prototype.consumeStringSlice = function (count) {
        var SLICE_STACK_SIZE = 50000;
        var value = '';
        while (count > 0) {
            var amount = Math.min(SLICE_STACK_SIZE, count);
            value += fromCodePoint$1.apply(void 0, this._value.splice(0, amount));
            count -= amount;
        }
        this._value.shift();
        return value;
    };
    Tokenizer.prototype.consumeStringToken = function (endingCodePoint) {
        var value = '';
        var i = 0;
        do {
            var codePoint = this._value[i];
            if (codePoint === EOF || codePoint === undefined || codePoint === endingCodePoint) {
                value += this.consumeStringSlice(i);
                return { type: 0 /* STRING_TOKEN */, value: value };
            }
            if (codePoint === LINE_FEED) {
                this._value.splice(0, i);
                return BAD_STRING_TOKEN;
            }
            if (codePoint === REVERSE_SOLIDUS) {
                var next = this._value[i + 1];
                if (next !== EOF && next !== undefined) {
                    if (next === LINE_FEED) {
                        value += this.consumeStringSlice(i);
                        i = -1;
                        this._value.shift();
                    }
                    else if (isValidEscape(codePoint, next)) {
                        value += this.consumeStringSlice(i);
                        value += fromCodePoint$1(this.consumeEscapedCodePoint());
                        i = -1;
                    }
                }
            }
            i++;
        } while (true);
    };
    Tokenizer.prototype.consumeNumber = function () {
        var repr = [];
        var type = FLAG_INTEGER;
        var c1 = this.peekCodePoint(0);
        if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
            repr.push(this.consumeCodePoint());
        }
        while (isDigit(this.peekCodePoint(0))) {
            repr.push(this.consumeCodePoint());
        }
        c1 = this.peekCodePoint(0);
        var c2 = this.peekCodePoint(1);
        if (c1 === FULL_STOP && isDigit(c2)) {
            repr.push(this.consumeCodePoint(), this.consumeCodePoint());
            type = FLAG_NUMBER;
            while (isDigit(this.peekCodePoint(0))) {
                repr.push(this.consumeCodePoint());
            }
        }
        c1 = this.peekCodePoint(0);
        c2 = this.peekCodePoint(1);
        var c3 = this.peekCodePoint(2);
        if ((c1 === E || c1 === e) && (((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3)) || isDigit(c2))) {
            repr.push(this.consumeCodePoint(), this.consumeCodePoint());
            type = FLAG_NUMBER;
            while (isDigit(this.peekCodePoint(0))) {
                repr.push(this.consumeCodePoint());
            }
        }
        return [stringToNumber(repr), type];
    };
    Tokenizer.prototype.consumeNumericToken = function () {
        var _a = this.consumeNumber(), number = _a[0], flags = _a[1];
        var c1 = this.peekCodePoint(0);
        var c2 = this.peekCodePoint(1);
        var c3 = this.peekCodePoint(2);
        if (isIdentifierStart(c1, c2, c3)) {
            var unit = this.consumeName();
            return { type: 15 /* DIMENSION_TOKEN */, number: number, flags: flags, unit: unit };
        }
        if (c1 === PERCENTAGE_SIGN) {
            this.consumeCodePoint();
            return { type: 16 /* PERCENTAGE_TOKEN */, number: number, flags: flags };
        }
        return { type: 17 /* NUMBER_TOKEN */, number: number, flags: flags };
    };
    Tokenizer.prototype.consumeEscapedCodePoint = function () {
        var codePoint = this.consumeCodePoint();
        if (isHex(codePoint)) {
            var hex = fromCodePoint$1(codePoint);
            while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
                hex += fromCodePoint$1(this.consumeCodePoint());
            }
            if (isWhiteSpace(this.peekCodePoint(0))) {
                this.consumeCodePoint();
            }
            var hexCodePoint = parseInt(hex, 16);
            if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 0x10ffff) {
                return REPLACEMENT_CHARACTER;
            }
            return hexCodePoint;
        }
        if (codePoint === EOF) {
            return REPLACEMENT_CHARACTER;
        }
        return codePoint;
    };
    Tokenizer.prototype.consumeName = function () {
        var result = '';
        while (true) {
            var codePoint = this.consumeCodePoint();
            if (isNameCodePoint(codePoint)) {
                result += fromCodePoint$1(codePoint);
            }
            else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                result += fromCodePoint$1(this.consumeEscapedCodePoint());
            }
            else {
                this.reconsumeCodePoint(codePoint);
                return result;
            }
        }
    };
    return Tokenizer;
}());

var Parser$1 = /** @class */ (function () {
    function Parser(tokens) {
        this._tokens = tokens;
    }
    Parser.create = function (value) {
        var tokenizer = new Tokenizer();
        tokenizer.write(value);
        return new Parser(tokenizer.read());
    };
    Parser.parseValue = function (value) {
        return Parser.create(value).parseComponentValue();
    };
    Parser.parseValues = function (value) {
        return Parser.create(value).parseComponentValues();
    };
    Parser.prototype.parseComponentValue = function () {
        var token = this.consumeToken();
        while (token.type === 31 /* WHITESPACE_TOKEN */) {
            token = this.consumeToken();
        }
        if (token.type === 32 /* EOF_TOKEN */) {
            throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
        }
        this.reconsumeToken(token);
        var value = this.consumeComponentValue();
        do {
            token = this.consumeToken();
        } while (token.type === 31 /* WHITESPACE_TOKEN */);
        if (token.type === 32 /* EOF_TOKEN */) {
            return value;
        }
        throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
    };
    Parser.prototype.parseComponentValues = function () {
        var values = [];
        while (true) {
            var value = this.consumeComponentValue();
            if (value.type === 32 /* EOF_TOKEN */) {
                return values;
            }
            values.push(value);
            values.push();
        }
    };
    Parser.prototype.consumeComponentValue = function () {
        var token = this.consumeToken();
        switch (token.type) {
            case 11 /* LEFT_CURLY_BRACKET_TOKEN */:
            case 28 /* LEFT_SQUARE_BRACKET_TOKEN */:
            case 2 /* LEFT_PARENTHESIS_TOKEN */:
                return this.consumeSimpleBlock(token.type);
            case 19 /* FUNCTION_TOKEN */:
                return this.consumeFunction(token);
        }
        return token;
    };
    Parser.prototype.consumeSimpleBlock = function (type) {
        var block = { type: type, values: [] };
        var token = this.consumeToken();
        while (true) {
            if (token.type === 32 /* EOF_TOKEN */ || isEndingTokenFor(token, type)) {
                return block;
            }
            this.reconsumeToken(token);
            block.values.push(this.consumeComponentValue());
            token = this.consumeToken();
        }
    };
    Parser.prototype.consumeFunction = function (functionToken) {
        var cssFunction = {
            name: functionToken.value,
            values: [],
            type: 18 /* FUNCTION */
        };
        while (true) {
            var token = this.consumeToken();
            if (token.type === 32 /* EOF_TOKEN */ || token.type === 3 /* RIGHT_PARENTHESIS_TOKEN */) {
                return cssFunction;
            }
            this.reconsumeToken(token);
            cssFunction.values.push(this.consumeComponentValue());
        }
    };
    Parser.prototype.consumeToken = function () {
        var token = this._tokens.shift();
        return typeof token === 'undefined' ? EOF_TOKEN : token;
    };
    Parser.prototype.reconsumeToken = function (token) {
        this._tokens.unshift(token);
    };
    return Parser;
}());
var isDimensionToken = function (token) { return token.type === 15 /* DIMENSION_TOKEN */; };
var isNumberToken = function (token) { return token.type === 17 /* NUMBER_TOKEN */; };
var isIdentToken = function (token) { return token.type === 20 /* IDENT_TOKEN */; };
var isStringToken = function (token) { return token.type === 0 /* STRING_TOKEN */; };
var isIdentWithValue = function (token, value) {
    return isIdentToken(token) && token.value === value;
};
var nonWhiteSpace = function (token) { return token.type !== 31 /* WHITESPACE_TOKEN */; };
var nonFunctionArgSeparator = function (token) {
    return token.type !== 31 /* WHITESPACE_TOKEN */ && token.type !== 4 /* COMMA_TOKEN */;
};
var parseFunctionArgs = function (tokens) {
    var args = [];
    var arg = [];
    tokens.forEach(function (token) {
        if (token.type === 4 /* COMMA_TOKEN */) {
            if (arg.length === 0) {
                throw new Error("Error parsing function args, zero tokens for arg");
            }
            args.push(arg);
            arg = [];
            return;
        }
        if (token.type !== 31 /* WHITESPACE_TOKEN */) {
            arg.push(token);
        }
    });
    if (arg.length) {
        args.push(arg);
    }
    return args;
};
var isEndingTokenFor = function (token, type) {
    if (type === 11 /* LEFT_CURLY_BRACKET_TOKEN */ && token.type === 12 /* RIGHT_CURLY_BRACKET_TOKEN */) {
        return true;
    }
    if (type === 28 /* LEFT_SQUARE_BRACKET_TOKEN */ && token.type === 29 /* RIGHT_SQUARE_BRACKET_TOKEN */) {
        return true;
    }
    return type === 2 /* LEFT_PARENTHESIS_TOKEN */ && token.type === 3 /* RIGHT_PARENTHESIS_TOKEN */;
};

var isLength = function (token) {
    return token.type === 17 /* NUMBER_TOKEN */ || token.type === 15 /* DIMENSION_TOKEN */;
};

var isLengthPercentage = function (token) {
    return token.type === 16 /* PERCENTAGE_TOKEN */ || isLength(token);
};
var parseLengthPercentageTuple = function (tokens) {
    return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
};
var ZERO_LENGTH = {
    type: 17 /* NUMBER_TOKEN */,
    number: 0,
    flags: FLAG_INTEGER
};
var FIFTY_PERCENT = {
    type: 16 /* PERCENTAGE_TOKEN */,
    number: 50,
    flags: FLAG_INTEGER
};
var HUNDRED_PERCENT = {
    type: 16 /* PERCENTAGE_TOKEN */,
    number: 100,
    flags: FLAG_INTEGER
};
var getAbsoluteValueForTuple = function (tuple, width, height) {
    var x = tuple[0], y = tuple[1];
    return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== 'undefined' ? y : x, height)];
};
var getAbsoluteValue = function (token, parent) {
    if (token.type === 16 /* PERCENTAGE_TOKEN */) {
        return (token.number / 100) * parent;
    }
    if (isDimensionToken(token)) {
        switch (token.unit) {
            case 'rem':
            case 'em':
                return 16 * token.number; // TODO use correct font-size
            case 'px':
            default:
                return token.number;
        }
    }
    return token.number;
};

var DEG = 'deg';
var GRAD = 'grad';
var RAD = 'rad';
var TURN = 'turn';
var angle = {
    name: 'angle',
    parse: function (_context, value) {
        if (value.type === 15 /* DIMENSION_TOKEN */) {
            switch (value.unit) {
                case DEG:
                    return (Math.PI * value.number) / 180;
                case GRAD:
                    return (Math.PI / 200) * value.number;
                case RAD:
                    return value.number;
                case TURN:
                    return Math.PI * 2 * value.number;
            }
        }
        throw new Error("Unsupported angle type");
    }
};
var isAngle = function (value) {
    if (value.type === 15 /* DIMENSION_TOKEN */) {
        if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
            return true;
        }
    }
    return false;
};
var parseNamedSide = function (tokens) {
    var sideOrCorner = tokens
        .filter(isIdentToken)
        .map(function (ident) { return ident.value; })
        .join(' ');
    switch (sideOrCorner) {
        case 'to bottom right':
        case 'to right bottom':
        case 'left top':
        case 'top left':
            return [ZERO_LENGTH, ZERO_LENGTH];
        case 'to top':
        case 'bottom':
            return deg(0);
        case 'to bottom left':
        case 'to left bottom':
        case 'right top':
        case 'top right':
            return [ZERO_LENGTH, HUNDRED_PERCENT];
        case 'to right':
        case 'left':
            return deg(90);
        case 'to top left':
        case 'to left top':
        case 'right bottom':
        case 'bottom right':
            return [HUNDRED_PERCENT, HUNDRED_PERCENT];
        case 'to bottom':
        case 'top':
            return deg(180);
        case 'to top right':
        case 'to right top':
        case 'left bottom':
        case 'bottom left':
            return [HUNDRED_PERCENT, ZERO_LENGTH];
        case 'to left':
        case 'right':
            return deg(270);
    }
    return 0;
};
var deg = function (deg) { return (Math.PI * deg) / 180; };

var color$1 = {
    name: 'color',
    parse: function (context, value) {
        if (value.type === 18 /* FUNCTION */) {
            var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
            if (typeof colorFunction === 'undefined') {
                throw new Error("Attempting to parse an unsupported color function \"" + value.name + "\"");
            }
            return colorFunction(context, value.values);
        }
        if (value.type === 5 /* HASH_TOKEN */) {
            if (value.value.length === 3) {
                var r = value.value.substring(0, 1);
                var g = value.value.substring(1, 2);
                var b = value.value.substring(2, 3);
                return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
            }
            if (value.value.length === 4) {
                var r = value.value.substring(0, 1);
                var g = value.value.substring(1, 2);
                var b = value.value.substring(2, 3);
                var a = value.value.substring(3, 4);
                return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a + a, 16) / 255);
            }
            if (value.value.length === 6) {
                var r = value.value.substring(0, 2);
                var g = value.value.substring(2, 4);
                var b = value.value.substring(4, 6);
                return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
            }
            if (value.value.length === 8) {
                var r = value.value.substring(0, 2);
                var g = value.value.substring(2, 4);
                var b = value.value.substring(4, 6);
                var a = value.value.substring(6, 8);
                return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16) / 255);
            }
        }
        if (value.type === 20 /* IDENT_TOKEN */) {
            var namedColor = COLORS[value.value.toUpperCase()];
            if (typeof namedColor !== 'undefined') {
                return namedColor;
            }
        }
        return COLORS.TRANSPARENT;
    }
};
var isTransparent = function (color) { return (0xff & color) === 0; };
var asString = function (color) {
    var alpha = 0xff & color;
    var blue = 0xff & (color >> 8);
    var green = 0xff & (color >> 16);
    var red = 0xff & (color >> 24);
    return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
};
var pack = function (r, g, b, a) {
    return ((r << 24) | (g << 16) | (b << 8) | (Math.round(a * 255) << 0)) >>> 0;
};
var getTokenColorValue = function (token, i) {
    if (token.type === 17 /* NUMBER_TOKEN */) {
        return token.number;
    }
    if (token.type === 16 /* PERCENTAGE_TOKEN */) {
        var max = i === 3 ? 1 : 255;
        return i === 3 ? (token.number / 100) * max : Math.round((token.number / 100) * max);
    }
    return 0;
};
var rgb = function (_context, args) {
    var tokens = args.filter(nonFunctionArgSeparator);
    if (tokens.length === 3) {
        var _a = tokens.map(getTokenColorValue), r = _a[0], g = _a[1], b = _a[2];
        return pack(r, g, b, 1);
    }
    if (tokens.length === 4) {
        var _b = tokens.map(getTokenColorValue), r = _b[0], g = _b[1], b = _b[2], a = _b[3];
        return pack(r, g, b, a);
    }
    return 0;
};
function hue2rgb(t1, t2, hue) {
    if (hue < 0) {
        hue += 1;
    }
    if (hue >= 1) {
        hue -= 1;
    }
    if (hue < 1 / 6) {
        return (t2 - t1) * hue * 6 + t1;
    }
    else if (hue < 1 / 2) {
        return t2;
    }
    else if (hue < 2 / 3) {
        return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
    }
    else {
        return t1;
    }
}
var hsl = function (context, args) {
    var tokens = args.filter(nonFunctionArgSeparator);
    var hue = tokens[0], saturation = tokens[1], lightness = tokens[2], alpha = tokens[3];
    var h = (hue.type === 17 /* NUMBER_TOKEN */ ? deg(hue.number) : angle.parse(context, hue)) / (Math.PI * 2);
    var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
    var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
    var a = typeof alpha !== 'undefined' && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
    if (s === 0) {
        return pack(l * 255, l * 255, l * 255, 1);
    }
    var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var t1 = l * 2 - t2;
    var r = hue2rgb(t1, t2, h + 1 / 3);
    var g = hue2rgb(t1, t2, h);
    var b = hue2rgb(t1, t2, h - 1 / 3);
    return pack(r * 255, g * 255, b * 255, a);
};
var SUPPORTED_COLOR_FUNCTIONS = {
    hsl: hsl,
    hsla: hsl,
    rgb: rgb,
    rgba: rgb
};
var parseColor = function (context, value) {
    return color$1.parse(context, Parser$1.create(value).parseComponentValue());
};
var COLORS = {
    ALICEBLUE: 0xf0f8ffff,
    ANTIQUEWHITE: 0xfaebd7ff,
    AQUA: 0x00ffffff,
    AQUAMARINE: 0x7fffd4ff,
    AZURE: 0xf0ffffff,
    BEIGE: 0xf5f5dcff,
    BISQUE: 0xffe4c4ff,
    BLACK: 0x000000ff,
    BLANCHEDALMOND: 0xffebcdff,
    BLUE: 0x0000ffff,
    BLUEVIOLET: 0x8a2be2ff,
    BROWN: 0xa52a2aff,
    BURLYWOOD: 0xdeb887ff,
    CADETBLUE: 0x5f9ea0ff,
    CHARTREUSE: 0x7fff00ff,
    CHOCOLATE: 0xd2691eff,
    CORAL: 0xff7f50ff,
    CORNFLOWERBLUE: 0x6495edff,
    CORNSILK: 0xfff8dcff,
    CRIMSON: 0xdc143cff,
    CYAN: 0x00ffffff,
    DARKBLUE: 0x00008bff,
    DARKCYAN: 0x008b8bff,
    DARKGOLDENROD: 0xb886bbff,
    DARKGRAY: 0xa9a9a9ff,
    DARKGREEN: 0x006400ff,
    DARKGREY: 0xa9a9a9ff,
    DARKKHAKI: 0xbdb76bff,
    DARKMAGENTA: 0x8b008bff,
    DARKOLIVEGREEN: 0x556b2fff,
    DARKORANGE: 0xff8c00ff,
    DARKORCHID: 0x9932ccff,
    DARKRED: 0x8b0000ff,
    DARKSALMON: 0xe9967aff,
    DARKSEAGREEN: 0x8fbc8fff,
    DARKSLATEBLUE: 0x483d8bff,
    DARKSLATEGRAY: 0x2f4f4fff,
    DARKSLATEGREY: 0x2f4f4fff,
    DARKTURQUOISE: 0x00ced1ff,
    DARKVIOLET: 0x9400d3ff,
    DEEPPINK: 0xff1493ff,
    DEEPSKYBLUE: 0x00bfffff,
    DIMGRAY: 0x696969ff,
    DIMGREY: 0x696969ff,
    DODGERBLUE: 0x1e90ffff,
    FIREBRICK: 0xb22222ff,
    FLORALWHITE: 0xfffaf0ff,
    FORESTGREEN: 0x228b22ff,
    FUCHSIA: 0xff00ffff,
    GAINSBORO: 0xdcdcdcff,
    GHOSTWHITE: 0xf8f8ffff,
    GOLD: 0xffd700ff,
    GOLDENROD: 0xdaa520ff,
    GRAY: 0x808080ff,
    GREEN: 0x008000ff,
    GREENYELLOW: 0xadff2fff,
    GREY: 0x808080ff,
    HONEYDEW: 0xf0fff0ff,
    HOTPINK: 0xff69b4ff,
    INDIANRED: 0xcd5c5cff,
    INDIGO: 0x4b0082ff,
    IVORY: 0xfffff0ff,
    KHAKI: 0xf0e68cff,
    LAVENDER: 0xe6e6faff,
    LAVENDERBLUSH: 0xfff0f5ff,
    LAWNGREEN: 0x7cfc00ff,
    LEMONCHIFFON: 0xfffacdff,
    LIGHTBLUE: 0xadd8e6ff,
    LIGHTCORAL: 0xf08080ff,
    LIGHTCYAN: 0xe0ffffff,
    LIGHTGOLDENRODYELLOW: 0xfafad2ff,
    LIGHTGRAY: 0xd3d3d3ff,
    LIGHTGREEN: 0x90ee90ff,
    LIGHTGREY: 0xd3d3d3ff,
    LIGHTPINK: 0xffb6c1ff,
    LIGHTSALMON: 0xffa07aff,
    LIGHTSEAGREEN: 0x20b2aaff,
    LIGHTSKYBLUE: 0x87cefaff,
    LIGHTSLATEGRAY: 0x778899ff,
    LIGHTSLATEGREY: 0x778899ff,
    LIGHTSTEELBLUE: 0xb0c4deff,
    LIGHTYELLOW: 0xffffe0ff,
    LIME: 0x00ff00ff,
    LIMEGREEN: 0x32cd32ff,
    LINEN: 0xfaf0e6ff,
    MAGENTA: 0xff00ffff,
    MAROON: 0x800000ff,
    MEDIUMAQUAMARINE: 0x66cdaaff,
    MEDIUMBLUE: 0x0000cdff,
    MEDIUMORCHID: 0xba55d3ff,
    MEDIUMPURPLE: 0x9370dbff,
    MEDIUMSEAGREEN: 0x3cb371ff,
    MEDIUMSLATEBLUE: 0x7b68eeff,
    MEDIUMSPRINGGREEN: 0x00fa9aff,
    MEDIUMTURQUOISE: 0x48d1ccff,
    MEDIUMVIOLETRED: 0xc71585ff,
    MIDNIGHTBLUE: 0x191970ff,
    MINTCREAM: 0xf5fffaff,
    MISTYROSE: 0xffe4e1ff,
    MOCCASIN: 0xffe4b5ff,
    NAVAJOWHITE: 0xffdeadff,
    NAVY: 0x000080ff,
    OLDLACE: 0xfdf5e6ff,
    OLIVE: 0x808000ff,
    OLIVEDRAB: 0x6b8e23ff,
    ORANGE: 0xffa500ff,
    ORANGERED: 0xff4500ff,
    ORCHID: 0xda70d6ff,
    PALEGOLDENROD: 0xeee8aaff,
    PALEGREEN: 0x98fb98ff,
    PALETURQUOISE: 0xafeeeeff,
    PALEVIOLETRED: 0xdb7093ff,
    PAPAYAWHIP: 0xffefd5ff,
    PEACHPUFF: 0xffdab9ff,
    PERU: 0xcd853fff,
    PINK: 0xffc0cbff,
    PLUM: 0xdda0ddff,
    POWDERBLUE: 0xb0e0e6ff,
    PURPLE: 0x800080ff,
    REBECCAPURPLE: 0x663399ff,
    RED: 0xff0000ff,
    ROSYBROWN: 0xbc8f8fff,
    ROYALBLUE: 0x4169e1ff,
    SADDLEBROWN: 0x8b4513ff,
    SALMON: 0xfa8072ff,
    SANDYBROWN: 0xf4a460ff,
    SEAGREEN: 0x2e8b57ff,
    SEASHELL: 0xfff5eeff,
    SIENNA: 0xa0522dff,
    SILVER: 0xc0c0c0ff,
    SKYBLUE: 0x87ceebff,
    SLATEBLUE: 0x6a5acdff,
    SLATEGRAY: 0x708090ff,
    SLATEGREY: 0x708090ff,
    SNOW: 0xfffafaff,
    SPRINGGREEN: 0x00ff7fff,
    STEELBLUE: 0x4682b4ff,
    TAN: 0xd2b48cff,
    TEAL: 0x008080ff,
    THISTLE: 0xd8bfd8ff,
    TOMATO: 0xff6347ff,
    TRANSPARENT: 0x00000000,
    TURQUOISE: 0x40e0d0ff,
    VIOLET: 0xee82eeff,
    WHEAT: 0xf5deb3ff,
    WHITE: 0xffffffff,
    WHITESMOKE: 0xf5f5f5ff,
    YELLOW: 0xffff00ff,
    YELLOWGREEN: 0x9acd32ff
};

var backgroundClip = {
    name: 'background-clip',
    initialValue: 'border-box',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        return tokens.map(function (token) {
            if (isIdentToken(token)) {
                switch (token.value) {
                    case 'padding-box':
                        return 1 /* PADDING_BOX */;
                    case 'content-box':
                        return 2 /* CONTENT_BOX */;
                }
            }
            return 0 /* BORDER_BOX */;
        });
    }
};

var backgroundColor = {
    name: "background-color",
    initialValue: 'transparent',
    prefix: false,
    type: 3 /* TYPE_VALUE */,
    format: 'color'
};

var parseColorStop = function (context, args) {
    var color = color$1.parse(context, args[0]);
    var stop = args[1];
    return stop && isLengthPercentage(stop) ? { color: color, stop: stop } : { color: color, stop: null };
};
var processColorStops = function (stops, lineLength) {
    var first = stops[0];
    var last = stops[stops.length - 1];
    if (first.stop === null) {
        first.stop = ZERO_LENGTH;
    }
    if (last.stop === null) {
        last.stop = HUNDRED_PERCENT;
    }
    var processStops = [];
    var previous = 0;
    for (var i = 0; i < stops.length; i++) {
        var stop_1 = stops[i].stop;
        if (stop_1 !== null) {
            var absoluteValue = getAbsoluteValue(stop_1, lineLength);
            if (absoluteValue > previous) {
                processStops.push(absoluteValue);
            }
            else {
                processStops.push(previous);
            }
            previous = absoluteValue;
        }
        else {
            processStops.push(null);
        }
    }
    var gapBegin = null;
    for (var i = 0; i < processStops.length; i++) {
        var stop_2 = processStops[i];
        if (stop_2 === null) {
            if (gapBegin === null) {
                gapBegin = i;
            }
        }
        else if (gapBegin !== null) {
            var gapLength = i - gapBegin;
            var beforeGap = processStops[gapBegin - 1];
            var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
            for (var g = 1; g <= gapLength; g++) {
                processStops[gapBegin + g - 1] = gapValue * g;
            }
            gapBegin = null;
        }
    }
    return stops.map(function (_a, i) {
        var color = _a.color;
        return { color: color, stop: Math.max(Math.min(1, processStops[i] / lineLength), 0) };
    });
};
var getAngleFromCorner = function (corner, width, height) {
    var centerX = width / 2;
    var centerY = height / 2;
    var x = getAbsoluteValue(corner[0], width) - centerX;
    var y = centerY - getAbsoluteValue(corner[1], height);
    return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
};
var calculateGradientDirection = function (angle, width, height) {
    var radian = typeof angle === 'number' ? angle : getAngleFromCorner(angle, width, height);
    var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var halfLineLength = lineLength / 2;
    var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
    var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
    return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
};
var distance = function (a, b) { return Math.sqrt(a * a + b * b); };
var findCorner = function (width, height, x, y, closest) {
    var corners = [
        [0, 0],
        [0, height],
        [width, 0],
        [width, height]
    ];
    return corners.reduce(function (stat, corner) {
        var cx = corner[0], cy = corner[1];
        var d = distance(x - cx, y - cy);
        if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
            return {
                optimumCorner: corner,
                optimumDistance: d
            };
        }
        return stat;
    }, {
        optimumDistance: closest ? Infinity : -Infinity,
        optimumCorner: null
    }).optimumCorner;
};
var calculateRadius = function (gradient, x, y, width, height) {
    var rx = 0;
    var ry = 0;
    switch (gradient.size) {
        case 0 /* CLOSEST_SIDE */:
            // The ending shape is sized so that that it exactly meets the side of the gradient box closest to the gradient’s center.
            // If the shape is an ellipse, it exactly meets the closest side in each dimension.
            if (gradient.shape === 0 /* CIRCLE */) {
                rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
            }
            else if (gradient.shape === 1 /* ELLIPSE */) {
                rx = Math.min(Math.abs(x), Math.abs(x - width));
                ry = Math.min(Math.abs(y), Math.abs(y - height));
            }
            break;
        case 2 /* CLOSEST_CORNER */:
            // The ending shape is sized so that that it passes through the corner of the gradient box closest to the gradient’s center.
            // If the shape is an ellipse, the ending shape is given the same aspect-ratio it would have if closest-side were specified.
            if (gradient.shape === 0 /* CIRCLE */) {
                rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
            }
            else if (gradient.shape === 1 /* ELLIPSE */) {
                // Compute the ratio ry/rx (which is to be the same as for "closest-side")
                var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
                var _a = findCorner(width, height, x, y, true), cx = _a[0], cy = _a[1];
                rx = distance(cx - x, (cy - y) / c);
                ry = c * rx;
            }
            break;
        case 1 /* FARTHEST_SIDE */:
            // Same as closest-side, except the ending shape is sized based on the farthest side(s)
            if (gradient.shape === 0 /* CIRCLE */) {
                rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
            }
            else if (gradient.shape === 1 /* ELLIPSE */) {
                rx = Math.max(Math.abs(x), Math.abs(x - width));
                ry = Math.max(Math.abs(y), Math.abs(y - height));
            }
            break;
        case 3 /* FARTHEST_CORNER */:
            // Same as closest-corner, except the ending shape is sized based on the farthest corner.
            // If the shape is an ellipse, the ending shape is given the same aspect ratio it would have if farthest-side were specified.
            if (gradient.shape === 0 /* CIRCLE */) {
                rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
            }
            else if (gradient.shape === 1 /* ELLIPSE */) {
                // Compute the ratio ry/rx (which is to be the same as for "farthest-side")
                var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
                var _b = findCorner(width, height, x, y, false), cx = _b[0], cy = _b[1];
                rx = distance(cx - x, (cy - y) / c);
                ry = c * rx;
            }
            break;
    }
    if (Array.isArray(gradient.size)) {
        rx = getAbsoluteValue(gradient.size[0], width);
        ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
    }
    return [rx, ry];
};

var linearGradient = function (context, tokens) {
    var angle$1 = deg(180);
    var stops = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
        if (i === 0) {
            var firstToken = arg[0];
            if (firstToken.type === 20 /* IDENT_TOKEN */ && firstToken.value === 'to') {
                angle$1 = parseNamedSide(arg);
                return;
            }
            else if (isAngle(firstToken)) {
                angle$1 = angle.parse(context, firstToken);
                return;
            }
        }
        var colorStop = parseColorStop(context, arg);
        stops.push(colorStop);
    });
    return { angle: angle$1, stops: stops, type: 1 /* LINEAR_GRADIENT */ };
};

var prefixLinearGradient = function (context, tokens) {
    var angle$1 = deg(180);
    var stops = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
        if (i === 0) {
            var firstToken = arg[0];
            if (firstToken.type === 20 /* IDENT_TOKEN */ &&
                ['top', 'left', 'right', 'bottom'].indexOf(firstToken.value) !== -1) {
                angle$1 = parseNamedSide(arg);
                return;
            }
            else if (isAngle(firstToken)) {
                angle$1 = (angle.parse(context, firstToken) + deg(270)) % deg(360);
                return;
            }
        }
        var colorStop = parseColorStop(context, arg);
        stops.push(colorStop);
    });
    return {
        angle: angle$1,
        stops: stops,
        type: 1 /* LINEAR_GRADIENT */
    };
};

var webkitGradient = function (context, tokens) {
    var angle = deg(180);
    var stops = [];
    var type = 1 /* LINEAR_GRADIENT */;
    var shape = 0 /* CIRCLE */;
    var size = 3 /* FARTHEST_CORNER */;
    var position = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
        var firstToken = arg[0];
        if (i === 0) {
            if (isIdentToken(firstToken) && firstToken.value === 'linear') {
                type = 1 /* LINEAR_GRADIENT */;
                return;
            }
            else if (isIdentToken(firstToken) && firstToken.value === 'radial') {
                type = 2 /* RADIAL_GRADIENT */;
                return;
            }
        }
        if (firstToken.type === 18 /* FUNCTION */) {
            if (firstToken.name === 'from') {
                var color = color$1.parse(context, firstToken.values[0]);
                stops.push({ stop: ZERO_LENGTH, color: color });
            }
            else if (firstToken.name === 'to') {
                var color = color$1.parse(context, firstToken.values[0]);
                stops.push({ stop: HUNDRED_PERCENT, color: color });
            }
            else if (firstToken.name === 'color-stop') {
                var values = firstToken.values.filter(nonFunctionArgSeparator);
                if (values.length === 2) {
                    var color = color$1.parse(context, values[1]);
                    var stop_1 = values[0];
                    if (isNumberToken(stop_1)) {
                        stops.push({
                            stop: { type: 16 /* PERCENTAGE_TOKEN */, number: stop_1.number * 100, flags: stop_1.flags },
                            color: color
                        });
                    }
                }
            }
        }
    });
    return type === 1 /* LINEAR_GRADIENT */
        ? {
            angle: (angle + deg(180)) % deg(360),
            stops: stops,
            type: type
        }
        : { size: size, shape: shape, stops: stops, position: position, type: type };
};

var CLOSEST_SIDE = 'closest-side';
var FARTHEST_SIDE = 'farthest-side';
var CLOSEST_CORNER = 'closest-corner';
var FARTHEST_CORNER = 'farthest-corner';
var CIRCLE = 'circle';
var ELLIPSE = 'ellipse';
var COVER = 'cover';
var CONTAIN = 'contain';
var radialGradient = function (context, tokens) {
    var shape = 0 /* CIRCLE */;
    var size = 3 /* FARTHEST_CORNER */;
    var stops = [];
    var position = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
        var isColorStop = true;
        if (i === 0) {
            var isAtPosition_1 = false;
            isColorStop = arg.reduce(function (acc, token) {
                if (isAtPosition_1) {
                    if (isIdentToken(token)) {
                        switch (token.value) {
                            case 'center':
                                position.push(FIFTY_PERCENT);
                                return acc;
                            case 'top':
                            case 'left':
                                position.push(ZERO_LENGTH);
                                return acc;
                            case 'right':
                            case 'bottom':
                                position.push(HUNDRED_PERCENT);
                                return acc;
                        }
                    }
                    else if (isLengthPercentage(token) || isLength(token)) {
                        position.push(token);
                    }
                }
                else if (isIdentToken(token)) {
                    switch (token.value) {
                        case CIRCLE:
                            shape = 0 /* CIRCLE */;
                            return false;
                        case ELLIPSE:
                            shape = 1 /* ELLIPSE */;
                            return false;
                        case 'at':
                            isAtPosition_1 = true;
                            return false;
                        case CLOSEST_SIDE:
                            size = 0 /* CLOSEST_SIDE */;
                            return false;
                        case COVER:
                        case FARTHEST_SIDE:
                            size = 1 /* FARTHEST_SIDE */;
                            return false;
                        case CONTAIN:
                        case CLOSEST_CORNER:
                            size = 2 /* CLOSEST_CORNER */;
                            return false;
                        case FARTHEST_CORNER:
                            size = 3 /* FARTHEST_CORNER */;
                            return false;
                    }
                }
                else if (isLength(token) || isLengthPercentage(token)) {
                    if (!Array.isArray(size)) {
                        size = [];
                    }
                    size.push(token);
                    return false;
                }
                return acc;
            }, isColorStop);
        }
        if (isColorStop) {
            var colorStop = parseColorStop(context, arg);
            stops.push(colorStop);
        }
    });
    return { size: size, shape: shape, stops: stops, position: position, type: 2 /* RADIAL_GRADIENT */ };
};

var prefixRadialGradient = function (context, tokens) {
    var shape = 0 /* CIRCLE */;
    var size = 3 /* FARTHEST_CORNER */;
    var stops = [];
    var position = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
        var isColorStop = true;
        if (i === 0) {
            isColorStop = arg.reduce(function (acc, token) {
                if (isIdentToken(token)) {
                    switch (token.value) {
                        case 'center':
                            position.push(FIFTY_PERCENT);
                            return false;
                        case 'top':
                        case 'left':
                            position.push(ZERO_LENGTH);
                            return false;
                        case 'right':
                        case 'bottom':
                            position.push(HUNDRED_PERCENT);
                            return false;
                    }
                }
                else if (isLengthPercentage(token) || isLength(token)) {
                    position.push(token);
                    return false;
                }
                return acc;
            }, isColorStop);
        }
        else if (i === 1) {
            isColorStop = arg.reduce(function (acc, token) {
                if (isIdentToken(token)) {
                    switch (token.value) {
                        case CIRCLE:
                            shape = 0 /* CIRCLE */;
                            return false;
                        case ELLIPSE:
                            shape = 1 /* ELLIPSE */;
                            return false;
                        case CONTAIN:
                        case CLOSEST_SIDE:
                            size = 0 /* CLOSEST_SIDE */;
                            return false;
                        case FARTHEST_SIDE:
                            size = 1 /* FARTHEST_SIDE */;
                            return false;
                        case CLOSEST_CORNER:
                            size = 2 /* CLOSEST_CORNER */;
                            return false;
                        case COVER:
                        case FARTHEST_CORNER:
                            size = 3 /* FARTHEST_CORNER */;
                            return false;
                    }
                }
                else if (isLength(token) || isLengthPercentage(token)) {
                    if (!Array.isArray(size)) {
                        size = [];
                    }
                    size.push(token);
                    return false;
                }
                return acc;
            }, isColorStop);
        }
        if (isColorStop) {
            var colorStop = parseColorStop(context, arg);
            stops.push(colorStop);
        }
    });
    return { size: size, shape: shape, stops: stops, position: position, type: 2 /* RADIAL_GRADIENT */ };
};

var isLinearGradient = function (background) {
    return background.type === 1 /* LINEAR_GRADIENT */;
};
var isRadialGradient = function (background) {
    return background.type === 2 /* RADIAL_GRADIENT */;
};
var image = {
    name: 'image',
    parse: function (context, value) {
        if (value.type === 22 /* URL_TOKEN */) {
            var image_1 = { url: value.value, type: 0 /* URL */ };
            context.cache.addImage(value.value);
            return image_1;
        }
        if (value.type === 18 /* FUNCTION */) {
            var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
            if (typeof imageFunction === 'undefined') {
                throw new Error("Attempting to parse an unsupported image function \"" + value.name + "\"");
            }
            return imageFunction(context, value.values);
        }
        throw new Error("Unsupported image type " + value.type);
    }
};
function isSupportedImage(value) {
    return (!(value.type === 20 /* IDENT_TOKEN */ && value.value === 'none') &&
        (value.type !== 18 /* FUNCTION */ || !!SUPPORTED_IMAGE_FUNCTIONS[value.name]));
}
var SUPPORTED_IMAGE_FUNCTIONS = {
    'linear-gradient': linearGradient,
    '-moz-linear-gradient': prefixLinearGradient,
    '-ms-linear-gradient': prefixLinearGradient,
    '-o-linear-gradient': prefixLinearGradient,
    '-webkit-linear-gradient': prefixLinearGradient,
    'radial-gradient': radialGradient,
    '-moz-radial-gradient': prefixRadialGradient,
    '-ms-radial-gradient': prefixRadialGradient,
    '-o-radial-gradient': prefixRadialGradient,
    '-webkit-radial-gradient': prefixRadialGradient,
    '-webkit-gradient': webkitGradient
};

var backgroundImage = {
    name: 'background-image',
    initialValue: 'none',
    type: 1 /* LIST */,
    prefix: false,
    parse: function (context, tokens) {
        if (tokens.length === 0) {
            return [];
        }
        var first = tokens[0];
        if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
            return [];
        }
        return tokens
            .filter(function (value) { return nonFunctionArgSeparator(value) && isSupportedImage(value); })
            .map(function (value) { return image.parse(context, value); });
    }
};

var backgroundOrigin = {
    name: 'background-origin',
    initialValue: 'border-box',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        return tokens.map(function (token) {
            if (isIdentToken(token)) {
                switch (token.value) {
                    case 'padding-box':
                        return 1 /* PADDING_BOX */;
                    case 'content-box':
                        return 2 /* CONTENT_BOX */;
                }
            }
            return 0 /* BORDER_BOX */;
        });
    }
};

var backgroundPosition = {
    name: 'background-position',
    initialValue: '0% 0%',
    type: 1 /* LIST */,
    prefix: false,
    parse: function (_context, tokens) {
        return parseFunctionArgs(tokens)
            .map(function (values) { return values.filter(isLengthPercentage); })
            .map(parseLengthPercentageTuple);
    }
};

var backgroundRepeat = {
    name: 'background-repeat',
    initialValue: 'repeat',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        return parseFunctionArgs(tokens)
            .map(function (values) {
            return values
                .filter(isIdentToken)
                .map(function (token) { return token.value; })
                .join(' ');
        })
            .map(parseBackgroundRepeat);
    }
};
var parseBackgroundRepeat = function (value) {
    switch (value) {
        case 'no-repeat':
            return 1 /* NO_REPEAT */;
        case 'repeat-x':
        case 'repeat no-repeat':
            return 2 /* REPEAT_X */;
        case 'repeat-y':
        case 'no-repeat repeat':
            return 3 /* REPEAT_Y */;
        case 'repeat':
        default:
            return 0 /* REPEAT */;
    }
};

var BACKGROUND_SIZE;
(function (BACKGROUND_SIZE) {
    BACKGROUND_SIZE["AUTO"] = "auto";
    BACKGROUND_SIZE["CONTAIN"] = "contain";
    BACKGROUND_SIZE["COVER"] = "cover";
})(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
var backgroundSize = {
    name: 'background-size',
    initialValue: '0',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        return parseFunctionArgs(tokens).map(function (values) { return values.filter(isBackgroundSizeInfoToken); });
    }
};
var isBackgroundSizeInfoToken = function (value) {
    return isIdentToken(value) || isLengthPercentage(value);
};

var borderColorForSide = function (side) { return ({
    name: "border-" + side + "-color",
    initialValue: 'transparent',
    prefix: false,
    type: 3 /* TYPE_VALUE */,
    format: 'color'
}); };
var borderTopColor = borderColorForSide('top');
var borderRightColor = borderColorForSide('right');
var borderBottomColor = borderColorForSide('bottom');
var borderLeftColor = borderColorForSide('left');

var borderRadiusForSide = function (side) { return ({
    name: "border-radius-" + side,
    initialValue: '0 0',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));
    }
}); };
var borderTopLeftRadius = borderRadiusForSide('top-left');
var borderTopRightRadius = borderRadiusForSide('top-right');
var borderBottomRightRadius = borderRadiusForSide('bottom-right');
var borderBottomLeftRadius = borderRadiusForSide('bottom-left');

var borderStyleForSide = function (side) { return ({
    name: "border-" + side + "-style",
    initialValue: 'solid',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, style) {
        switch (style) {
            case 'none':
                return 0 /* NONE */;
            case 'dashed':
                return 2 /* DASHED */;
            case 'dotted':
                return 3 /* DOTTED */;
            case 'double':
                return 4 /* DOUBLE */;
        }
        return 1 /* SOLID */;
    }
}); };
var borderTopStyle = borderStyleForSide('top');
var borderRightStyle = borderStyleForSide('right');
var borderBottomStyle = borderStyleForSide('bottom');
var borderLeftStyle = borderStyleForSide('left');

var borderWidthForSide = function (side) { return ({
    name: "border-" + side + "-width",
    initialValue: '0',
    type: 0 /* VALUE */,
    prefix: false,
    parse: function (_context, token) {
        if (isDimensionToken(token)) {
            return token.number;
        }
        return 0;
    }
}); };
var borderTopWidth = borderWidthForSide('top');
var borderRightWidth = borderWidthForSide('right');
var borderBottomWidth = borderWidthForSide('bottom');
var borderLeftWidth = borderWidthForSide('left');

var color = {
    name: "color",
    initialValue: 'transparent',
    prefix: false,
    type: 3 /* TYPE_VALUE */,
    format: 'color'
};

var direction = {
    name: 'direction',
    initialValue: 'ltr',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, direction) {
        switch (direction) {
            case 'rtl':
                return 1 /* RTL */;
            case 'ltr':
            default:
                return 0 /* LTR */;
        }
    }
};

var display = {
    name: 'display',
    initialValue: 'inline-block',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        return tokens.filter(isIdentToken).reduce(function (bit, token) {
            return bit | parseDisplayValue(token.value);
        }, 0 /* NONE */);
    }
};
var parseDisplayValue = function (display) {
    switch (display) {
        case 'block':
        case '-webkit-box':
            return 2 /* BLOCK */;
        case 'inline':
            return 4 /* INLINE */;
        case 'run-in':
            return 8 /* RUN_IN */;
        case 'flow':
            return 16 /* FLOW */;
        case 'flow-root':
            return 32 /* FLOW_ROOT */;
        case 'table':
            return 64 /* TABLE */;
        case 'flex':
        case '-webkit-flex':
            return 128 /* FLEX */;
        case 'grid':
        case '-ms-grid':
            return 256 /* GRID */;
        case 'ruby':
            return 512 /* RUBY */;
        case 'subgrid':
            return 1024 /* SUBGRID */;
        case 'list-item':
            return 2048 /* LIST_ITEM */;
        case 'table-row-group':
            return 4096 /* TABLE_ROW_GROUP */;
        case 'table-header-group':
            return 8192 /* TABLE_HEADER_GROUP */;
        case 'table-footer-group':
            return 16384 /* TABLE_FOOTER_GROUP */;
        case 'table-row':
            return 32768 /* TABLE_ROW */;
        case 'table-cell':
            return 65536 /* TABLE_CELL */;
        case 'table-column-group':
            return 131072 /* TABLE_COLUMN_GROUP */;
        case 'table-column':
            return 262144 /* TABLE_COLUMN */;
        case 'table-caption':
            return 524288 /* TABLE_CAPTION */;
        case 'ruby-base':
            return 1048576 /* RUBY_BASE */;
        case 'ruby-text':
            return 2097152 /* RUBY_TEXT */;
        case 'ruby-base-container':
            return 4194304 /* RUBY_BASE_CONTAINER */;
        case 'ruby-text-container':
            return 8388608 /* RUBY_TEXT_CONTAINER */;
        case 'contents':
            return 16777216 /* CONTENTS */;
        case 'inline-block':
            return 33554432 /* INLINE_BLOCK */;
        case 'inline-list-item':
            return 67108864 /* INLINE_LIST_ITEM */;
        case 'inline-table':
            return 134217728 /* INLINE_TABLE */;
        case 'inline-flex':
            return 268435456 /* INLINE_FLEX */;
        case 'inline-grid':
            return 536870912 /* INLINE_GRID */;
    }
    return 0 /* NONE */;
};

var float = {
    name: 'float',
    initialValue: 'none',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, float) {
        switch (float) {
            case 'left':
                return 1 /* LEFT */;
            case 'right':
                return 2 /* RIGHT */;
            case 'inline-start':
                return 3 /* INLINE_START */;
            case 'inline-end':
                return 4 /* INLINE_END */;
        }
        return 0 /* NONE */;
    }
};

var letterSpacing = {
    name: 'letter-spacing',
    initialValue: '0',
    prefix: false,
    type: 0 /* VALUE */,
    parse: function (_context, token) {
        if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'normal') {
            return 0;
        }
        if (token.type === 17 /* NUMBER_TOKEN */) {
            return token.number;
        }
        if (token.type === 15 /* DIMENSION_TOKEN */) {
            return token.number;
        }
        return 0;
    }
};

var LINE_BREAK;
(function (LINE_BREAK) {
    LINE_BREAK["NORMAL"] = "normal";
    LINE_BREAK["STRICT"] = "strict";
})(LINE_BREAK || (LINE_BREAK = {}));
var lineBreak = {
    name: 'line-break',
    initialValue: 'normal',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, lineBreak) {
        switch (lineBreak) {
            case 'strict':
                return LINE_BREAK.STRICT;
            case 'normal':
            default:
                return LINE_BREAK.NORMAL;
        }
    }
};

var lineHeight = {
    name: 'line-height',
    initialValue: 'normal',
    prefix: false,
    type: 4 /* TOKEN_VALUE */
};
var computeLineHeight = function (token, fontSize) {
    if (isIdentToken(token) && token.value === 'normal') {
        return 1.2 * fontSize;
    }
    else if (token.type === 17 /* NUMBER_TOKEN */) {
        return fontSize * token.number;
    }
    else if (isLengthPercentage(token)) {
        return getAbsoluteValue(token, fontSize);
    }
    return fontSize;
};

var listStyleImage = {
    name: 'list-style-image',
    initialValue: 'none',
    type: 0 /* VALUE */,
    prefix: false,
    parse: function (context, token) {
        if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'none') {
            return null;
        }
        return image.parse(context, token);
    }
};

var listStylePosition = {
    name: 'list-style-position',
    initialValue: 'outside',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, position) {
        switch (position) {
            case 'inside':
                return 0 /* INSIDE */;
            case 'outside':
            default:
                return 1 /* OUTSIDE */;
        }
    }
};

var listStyleType = {
    name: 'list-style-type',
    initialValue: 'none',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, type) {
        switch (type) {
            case 'disc':
                return 0 /* DISC */;
            case 'circle':
                return 1 /* CIRCLE */;
            case 'square':
                return 2 /* SQUARE */;
            case 'decimal':
                return 3 /* DECIMAL */;
            case 'cjk-decimal':
                return 4 /* CJK_DECIMAL */;
            case 'decimal-leading-zero':
                return 5 /* DECIMAL_LEADING_ZERO */;
            case 'lower-roman':
                return 6 /* LOWER_ROMAN */;
            case 'upper-roman':
                return 7 /* UPPER_ROMAN */;
            case 'lower-greek':
                return 8 /* LOWER_GREEK */;
            case 'lower-alpha':
                return 9 /* LOWER_ALPHA */;
            case 'upper-alpha':
                return 10 /* UPPER_ALPHA */;
            case 'arabic-indic':
                return 11 /* ARABIC_INDIC */;
            case 'armenian':
                return 12 /* ARMENIAN */;
            case 'bengali':
                return 13 /* BENGALI */;
            case 'cambodian':
                return 14 /* CAMBODIAN */;
            case 'cjk-earthly-branch':
                return 15 /* CJK_EARTHLY_BRANCH */;
            case 'cjk-heavenly-stem':
                return 16 /* CJK_HEAVENLY_STEM */;
            case 'cjk-ideographic':
                return 17 /* CJK_IDEOGRAPHIC */;
            case 'devanagari':
                return 18 /* DEVANAGARI */;
            case 'ethiopic-numeric':
                return 19 /* ETHIOPIC_NUMERIC */;
            case 'georgian':
                return 20 /* GEORGIAN */;
            case 'gujarati':
                return 21 /* GUJARATI */;
            case 'gurmukhi':
                return 22 /* GURMUKHI */;
            case 'hebrew':
                return 22 /* HEBREW */;
            case 'hiragana':
                return 23 /* HIRAGANA */;
            case 'hiragana-iroha':
                return 24 /* HIRAGANA_IROHA */;
            case 'japanese-formal':
                return 25 /* JAPANESE_FORMAL */;
            case 'japanese-informal':
                return 26 /* JAPANESE_INFORMAL */;
            case 'kannada':
                return 27 /* KANNADA */;
            case 'katakana':
                return 28 /* KATAKANA */;
            case 'katakana-iroha':
                return 29 /* KATAKANA_IROHA */;
            case 'khmer':
                return 30 /* KHMER */;
            case 'korean-hangul-formal':
                return 31 /* KOREAN_HANGUL_FORMAL */;
            case 'korean-hanja-formal':
                return 32 /* KOREAN_HANJA_FORMAL */;
            case 'korean-hanja-informal':
                return 33 /* KOREAN_HANJA_INFORMAL */;
            case 'lao':
                return 34 /* LAO */;
            case 'lower-armenian':
                return 35 /* LOWER_ARMENIAN */;
            case 'malayalam':
                return 36 /* MALAYALAM */;
            case 'mongolian':
                return 37 /* MONGOLIAN */;
            case 'myanmar':
                return 38 /* MYANMAR */;
            case 'oriya':
                return 39 /* ORIYA */;
            case 'persian':
                return 40 /* PERSIAN */;
            case 'simp-chinese-formal':
                return 41 /* SIMP_CHINESE_FORMAL */;
            case 'simp-chinese-informal':
                return 42 /* SIMP_CHINESE_INFORMAL */;
            case 'tamil':
                return 43 /* TAMIL */;
            case 'telugu':
                return 44 /* TELUGU */;
            case 'thai':
                return 45 /* THAI */;
            case 'tibetan':
                return 46 /* TIBETAN */;
            case 'trad-chinese-formal':
                return 47 /* TRAD_CHINESE_FORMAL */;
            case 'trad-chinese-informal':
                return 48 /* TRAD_CHINESE_INFORMAL */;
            case 'upper-armenian':
                return 49 /* UPPER_ARMENIAN */;
            case 'disclosure-open':
                return 50 /* DISCLOSURE_OPEN */;
            case 'disclosure-closed':
                return 51 /* DISCLOSURE_CLOSED */;
            case 'none':
            default:
                return -1 /* NONE */;
        }
    }
};

var marginForSide = function (side) { return ({
    name: "margin-" + side,
    initialValue: '0',
    prefix: false,
    type: 4 /* TOKEN_VALUE */
}); };
var marginTop = marginForSide('top');
var marginRight = marginForSide('right');
var marginBottom = marginForSide('bottom');
var marginLeft = marginForSide('left');

var overflow = {
    name: 'overflow',
    initialValue: 'visible',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        return tokens.filter(isIdentToken).map(function (overflow) {
            switch (overflow.value) {
                case 'hidden':
                    return 1 /* HIDDEN */;
                case 'scroll':
                    return 2 /* SCROLL */;
                case 'clip':
                    return 3 /* CLIP */;
                case 'auto':
                    return 4 /* AUTO */;
                case 'visible':
                default:
                    return 0 /* VISIBLE */;
            }
        });
    }
};

var overflowWrap = {
    name: 'overflow-wrap',
    initialValue: 'normal',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, overflow) {
        switch (overflow) {
            case 'break-word':
                return "break-word" /* BREAK_WORD */;
            case 'normal':
            default:
                return "normal" /* NORMAL */;
        }
    }
};

var paddingForSide = function (side) { return ({
    name: "padding-" + side,
    initialValue: '0',
    prefix: false,
    type: 3 /* TYPE_VALUE */,
    format: 'length-percentage'
}); };
var paddingTop = paddingForSide('top');
var paddingRight = paddingForSide('right');
var paddingBottom = paddingForSide('bottom');
var paddingLeft = paddingForSide('left');

var textAlign = {
    name: 'text-align',
    initialValue: 'left',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, textAlign) {
        switch (textAlign) {
            case 'right':
                return 2 /* RIGHT */;
            case 'center':
            case 'justify':
                return 1 /* CENTER */;
            case 'left':
            default:
                return 0 /* LEFT */;
        }
    }
};

var position = {
    name: 'position',
    initialValue: 'static',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, position) {
        switch (position) {
            case 'relative':
                return 1 /* RELATIVE */;
            case 'absolute':
                return 2 /* ABSOLUTE */;
            case 'fixed':
                return 3 /* FIXED */;
            case 'sticky':
                return 4 /* STICKY */;
        }
        return 0 /* STATIC */;
    }
};

var textShadow = {
    name: 'text-shadow',
    initialValue: 'none',
    type: 1 /* LIST */,
    prefix: false,
    parse: function (context, tokens) {
        if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
            return [];
        }
        return parseFunctionArgs(tokens).map(function (values) {
            var shadow = {
                color: COLORS.TRANSPARENT,
                offsetX: ZERO_LENGTH,
                offsetY: ZERO_LENGTH,
                blur: ZERO_LENGTH
            };
            var c = 0;
            for (var i = 0; i < values.length; i++) {
                var token = values[i];
                if (isLength(token)) {
                    if (c === 0) {
                        shadow.offsetX = token;
                    }
                    else if (c === 1) {
                        shadow.offsetY = token;
                    }
                    else {
                        shadow.blur = token;
                    }
                    c++;
                }
                else {
                    shadow.color = color$1.parse(context, token);
                }
            }
            return shadow;
        });
    }
};

var textTransform = {
    name: 'text-transform',
    initialValue: 'none',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, textTransform) {
        switch (textTransform) {
            case 'uppercase':
                return 2 /* UPPERCASE */;
            case 'lowercase':
                return 1 /* LOWERCASE */;
            case 'capitalize':
                return 3 /* CAPITALIZE */;
        }
        return 0 /* NONE */;
    }
};

var transform$1 = {
    name: 'transform',
    initialValue: 'none',
    prefix: true,
    type: 0 /* VALUE */,
    parse: function (_context, token) {
        if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'none') {
            return null;
        }
        if (token.type === 18 /* FUNCTION */) {
            var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
            if (typeof transformFunction === 'undefined') {
                throw new Error("Attempting to parse an unsupported transform function \"" + token.name + "\"");
            }
            return transformFunction(token.values);
        }
        return null;
    }
};
var matrix = function (args) {
    var values = args.filter(function (arg) { return arg.type === 17 /* NUMBER_TOKEN */; }).map(function (arg) { return arg.number; });
    return values.length === 6 ? values : null;
};
// doesn't support 3D transforms at the moment
var matrix3d = function (args) {
    var values = args.filter(function (arg) { return arg.type === 17 /* NUMBER_TOKEN */; }).map(function (arg) { return arg.number; });
    var a1 = values[0], b1 = values[1]; values[2]; values[3]; var a2 = values[4], b2 = values[5]; values[6]; values[7]; values[8]; values[9]; values[10]; values[11]; var a4 = values[12], b4 = values[13]; values[14]; values[15];
    return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
};
var SUPPORTED_TRANSFORM_FUNCTIONS = {
    matrix: matrix,
    matrix3d: matrix3d
};

var DEFAULT_VALUE = {
    type: 16 /* PERCENTAGE_TOKEN */,
    number: 50,
    flags: FLAG_INTEGER
};
var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
var transformOrigin = {
    name: 'transform-origin',
    initialValue: '50% 50%',
    prefix: true,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        var origins = tokens.filter(isLengthPercentage);
        if (origins.length !== 2) {
            return DEFAULT;
        }
        return [origins[0], origins[1]];
    }
};

var visibility = {
    name: 'visible',
    initialValue: 'none',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, visibility) {
        switch (visibility) {
            case 'hidden':
                return 1 /* HIDDEN */;
            case 'collapse':
                return 2 /* COLLAPSE */;
            case 'visible':
            default:
                return 0 /* VISIBLE */;
        }
    }
};

var WORD_BREAK;
(function (WORD_BREAK) {
    WORD_BREAK["NORMAL"] = "normal";
    WORD_BREAK["BREAK_ALL"] = "break-all";
    WORD_BREAK["KEEP_ALL"] = "keep-all";
})(WORD_BREAK || (WORD_BREAK = {}));
var wordBreak = {
    name: 'word-break',
    initialValue: 'normal',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, wordBreak) {
        switch (wordBreak) {
            case 'break-all':
                return WORD_BREAK.BREAK_ALL;
            case 'keep-all':
                return WORD_BREAK.KEEP_ALL;
            case 'normal':
            default:
                return WORD_BREAK.NORMAL;
        }
    }
};

var zIndex = {
    name: 'z-index',
    initialValue: 'auto',
    prefix: false,
    type: 0 /* VALUE */,
    parse: function (_context, token) {
        if (token.type === 20 /* IDENT_TOKEN */) {
            return { auto: true, order: 0 };
        }
        if (isNumberToken(token)) {
            return { auto: false, order: token.number };
        }
        throw new Error("Invalid z-index number parsed");
    }
};

var time = {
    name: 'time',
    parse: function (_context, value) {
        if (value.type === 15 /* DIMENSION_TOKEN */) {
            switch (value.unit.toLowerCase()) {
                case 's':
                    return 1000 * value.number;
                case 'ms':
                    return value.number;
            }
        }
        throw new Error("Unsupported time type");
    }
};

var opacity = {
    name: 'opacity',
    initialValue: '1',
    type: 0 /* VALUE */,
    prefix: false,
    parse: function (_context, token) {
        if (isNumberToken(token)) {
            return token.number;
        }
        return 1;
    }
};

var textDecorationColor = {
    name: "text-decoration-color",
    initialValue: 'transparent',
    prefix: false,
    type: 3 /* TYPE_VALUE */,
    format: 'color'
};

var textDecorationLine = {
    name: 'text-decoration-line',
    initialValue: 'none',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        return tokens
            .filter(isIdentToken)
            .map(function (token) {
            switch (token.value) {
                case 'underline':
                    return 1 /* UNDERLINE */;
                case 'overline':
                    return 2 /* OVERLINE */;
                case 'line-through':
                    return 3 /* LINE_THROUGH */;
                case 'none':
                    return 4 /* BLINK */;
            }
            return 0 /* NONE */;
        })
            .filter(function (line) { return line !== 0 /* NONE */; });
    }
};

var fontFamily = {
    name: "font-family",
    initialValue: '',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        var accumulator = [];
        var results = [];
        tokens.forEach(function (token) {
            switch (token.type) {
                case 20 /* IDENT_TOKEN */:
                case 0 /* STRING_TOKEN */:
                    accumulator.push(token.value);
                    break;
                case 17 /* NUMBER_TOKEN */:
                    accumulator.push(token.number.toString());
                    break;
                case 4 /* COMMA_TOKEN */:
                    results.push(accumulator.join(' '));
                    accumulator.length = 0;
                    break;
            }
        });
        if (accumulator.length) {
            results.push(accumulator.join(' '));
        }
        return results.map(function (result) { return (result.indexOf(' ') === -1 ? result : "'" + result + "'"); });
    }
};

var fontSize = {
    name: "font-size",
    initialValue: '0',
    prefix: false,
    type: 3 /* TYPE_VALUE */,
    format: 'length'
};

var fontWeight = {
    name: 'font-weight',
    initialValue: 'normal',
    type: 0 /* VALUE */,
    prefix: false,
    parse: function (_context, token) {
        if (isNumberToken(token)) {
            return token.number;
        }
        if (isIdentToken(token)) {
            switch (token.value) {
                case 'bold':
                    return 700;
                case 'normal':
                default:
                    return 400;
            }
        }
        return 400;
    }
};

var fontVariant = {
    name: 'font-variant',
    initialValue: 'none',
    type: 1 /* LIST */,
    prefix: false,
    parse: function (_context, tokens) {
        return tokens.filter(isIdentToken).map(function (token) { return token.value; });
    }
};

var fontStyle = {
    name: 'font-style',
    initialValue: 'normal',
    prefix: false,
    type: 2 /* IDENT_VALUE */,
    parse: function (_context, overflow) {
        switch (overflow) {
            case 'oblique':
                return "oblique" /* OBLIQUE */;
            case 'italic':
                return "italic" /* ITALIC */;
            case 'normal':
            default:
                return "normal" /* NORMAL */;
        }
    }
};

var contains = function (bit, value) { return (bit & value) !== 0; };

var content = {
    name: 'content',
    initialValue: 'none',
    type: 1 /* LIST */,
    prefix: false,
    parse: function (_context, tokens) {
        if (tokens.length === 0) {
            return [];
        }
        var first = tokens[0];
        if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
            return [];
        }
        return tokens;
    }
};

var counterIncrement = {
    name: 'counter-increment',
    initialValue: 'none',
    prefix: true,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        if (tokens.length === 0) {
            return null;
        }
        var first = tokens[0];
        if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
            return null;
        }
        var increments = [];
        var filtered = tokens.filter(nonWhiteSpace);
        for (var i = 0; i < filtered.length; i++) {
            var counter = filtered[i];
            var next = filtered[i + 1];
            if (counter.type === 20 /* IDENT_TOKEN */) {
                var increment = next && isNumberToken(next) ? next.number : 1;
                increments.push({ counter: counter.value, increment: increment });
            }
        }
        return increments;
    }
};

var counterReset = {
    name: 'counter-reset',
    initialValue: 'none',
    prefix: true,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        if (tokens.length === 0) {
            return [];
        }
        var resets = [];
        var filtered = tokens.filter(nonWhiteSpace);
        for (var i = 0; i < filtered.length; i++) {
            var counter = filtered[i];
            var next = filtered[i + 1];
            if (isIdentToken(counter) && counter.value !== 'none') {
                var reset = next && isNumberToken(next) ? next.number : 0;
                resets.push({ counter: counter.value, reset: reset });
            }
        }
        return resets;
    }
};

var duration = {
    name: 'duration',
    initialValue: '0s',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (context, tokens) {
        return tokens.filter(isDimensionToken).map(function (token) { return time.parse(context, token); });
    }
};

var quotes = {
    name: 'quotes',
    initialValue: 'none',
    prefix: true,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        if (tokens.length === 0) {
            return null;
        }
        var first = tokens[0];
        if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
            return null;
        }
        var quotes = [];
        var filtered = tokens.filter(isStringToken);
        if (filtered.length % 2 !== 0) {
            return null;
        }
        for (var i = 0; i < filtered.length; i += 2) {
            var open_1 = filtered[i].value;
            var close_1 = filtered[i + 1].value;
            quotes.push({ open: open_1, close: close_1 });
        }
        return quotes;
    }
};
var getQuote = function (quotes, depth, open) {
    if (!quotes) {
        return '';
    }
    var quote = quotes[Math.min(depth, quotes.length - 1)];
    if (!quote) {
        return '';
    }
    return open ? quote.open : quote.close;
};

var boxShadow = {
    name: 'box-shadow',
    initialValue: 'none',
    type: 1 /* LIST */,
    prefix: false,
    parse: function (context, tokens) {
        if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
            return [];
        }
        return parseFunctionArgs(tokens).map(function (values) {
            var shadow = {
                color: 0x000000ff,
                offsetX: ZERO_LENGTH,
                offsetY: ZERO_LENGTH,
                blur: ZERO_LENGTH,
                spread: ZERO_LENGTH,
                inset: false
            };
            var c = 0;
            for (var i = 0; i < values.length; i++) {
                var token = values[i];
                if (isIdentWithValue(token, 'inset')) {
                    shadow.inset = true;
                }
                else if (isLength(token)) {
                    if (c === 0) {
                        shadow.offsetX = token;
                    }
                    else if (c === 1) {
                        shadow.offsetY = token;
                    }
                    else if (c === 2) {
                        shadow.blur = token;
                    }
                    else {
                        shadow.spread = token;
                    }
                    c++;
                }
                else {
                    shadow.color = color$1.parse(context, token);
                }
            }
            return shadow;
        });
    }
};

var paintOrder = {
    name: 'paint-order',
    initialValue: 'normal',
    prefix: false,
    type: 1 /* LIST */,
    parse: function (_context, tokens) {
        var DEFAULT_VALUE = [0 /* FILL */, 1 /* STROKE */, 2 /* MARKERS */];
        var layers = [];
        tokens.filter(isIdentToken).forEach(function (token) {
            switch (token.value) {
                case 'stroke':
                    layers.push(1 /* STROKE */);
                    break;
                case 'fill':
                    layers.push(0 /* FILL */);
                    break;
                case 'markers':
                    layers.push(2 /* MARKERS */);
                    break;
            }
        });
        DEFAULT_VALUE.forEach(function (value) {
            if (layers.indexOf(value) === -1) {
                layers.push(value);
            }
        });
        return layers;
    }
};

var webkitTextStrokeColor = {
    name: "-webkit-text-stroke-color",
    initialValue: 'currentcolor',
    prefix: false,
    type: 3 /* TYPE_VALUE */,
    format: 'color'
};

var webkitTextStrokeWidth = {
    name: "-webkit-text-stroke-width",
    initialValue: '0',
    type: 0 /* VALUE */,
    prefix: false,
    parse: function (_context, token) {
        if (isDimensionToken(token)) {
            return token.number;
        }
        return 0;
    }
};

var CSSParsedDeclaration = /** @class */ (function () {
    function CSSParsedDeclaration(context, declaration) {
        var _a, _b;
        this.animationDuration = parse(context, duration, declaration.animationDuration);
        this.backgroundClip = parse(context, backgroundClip, declaration.backgroundClip);
        this.backgroundColor = parse(context, backgroundColor, declaration.backgroundColor);
        this.backgroundImage = parse(context, backgroundImage, declaration.backgroundImage);
        this.backgroundOrigin = parse(context, backgroundOrigin, declaration.backgroundOrigin);
        this.backgroundPosition = parse(context, backgroundPosition, declaration.backgroundPosition);
        this.backgroundRepeat = parse(context, backgroundRepeat, declaration.backgroundRepeat);
        this.backgroundSize = parse(context, backgroundSize, declaration.backgroundSize);
        this.borderTopColor = parse(context, borderTopColor, declaration.borderTopColor);
        this.borderRightColor = parse(context, borderRightColor, declaration.borderRightColor);
        this.borderBottomColor = parse(context, borderBottomColor, declaration.borderBottomColor);
        this.borderLeftColor = parse(context, borderLeftColor, declaration.borderLeftColor);
        this.borderTopLeftRadius = parse(context, borderTopLeftRadius, declaration.borderTopLeftRadius);
        this.borderTopRightRadius = parse(context, borderTopRightRadius, declaration.borderTopRightRadius);
        this.borderBottomRightRadius = parse(context, borderBottomRightRadius, declaration.borderBottomRightRadius);
        this.borderBottomLeftRadius = parse(context, borderBottomLeftRadius, declaration.borderBottomLeftRadius);
        this.borderTopStyle = parse(context, borderTopStyle, declaration.borderTopStyle);
        this.borderRightStyle = parse(context, borderRightStyle, declaration.borderRightStyle);
        this.borderBottomStyle = parse(context, borderBottomStyle, declaration.borderBottomStyle);
        this.borderLeftStyle = parse(context, borderLeftStyle, declaration.borderLeftStyle);
        this.borderTopWidth = parse(context, borderTopWidth, declaration.borderTopWidth);
        this.borderRightWidth = parse(context, borderRightWidth, declaration.borderRightWidth);
        this.borderBottomWidth = parse(context, borderBottomWidth, declaration.borderBottomWidth);
        this.borderLeftWidth = parse(context, borderLeftWidth, declaration.borderLeftWidth);
        this.boxShadow = parse(context, boxShadow, declaration.boxShadow);
        this.color = parse(context, color, declaration.color);
        this.direction = parse(context, direction, declaration.direction);
        this.display = parse(context, display, declaration.display);
        this.float = parse(context, float, declaration.cssFloat);
        this.fontFamily = parse(context, fontFamily, declaration.fontFamily);
        this.fontSize = parse(context, fontSize, declaration.fontSize);
        this.fontStyle = parse(context, fontStyle, declaration.fontStyle);
        this.fontVariant = parse(context, fontVariant, declaration.fontVariant);
        this.fontWeight = parse(context, fontWeight, declaration.fontWeight);
        this.letterSpacing = parse(context, letterSpacing, declaration.letterSpacing);
        this.lineBreak = parse(context, lineBreak, declaration.lineBreak);
        this.lineHeight = parse(context, lineHeight, declaration.lineHeight);
        this.listStyleImage = parse(context, listStyleImage, declaration.listStyleImage);
        this.listStylePosition = parse(context, listStylePosition, declaration.listStylePosition);
        this.listStyleType = parse(context, listStyleType, declaration.listStyleType);
        this.marginTop = parse(context, marginTop, declaration.marginTop);
        this.marginRight = parse(context, marginRight, declaration.marginRight);
        this.marginBottom = parse(context, marginBottom, declaration.marginBottom);
        this.marginLeft = parse(context, marginLeft, declaration.marginLeft);
        this.opacity = parse(context, opacity, declaration.opacity);
        var overflowTuple = parse(context, overflow, declaration.overflow);
        this.overflowX = overflowTuple[0];
        this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
        this.overflowWrap = parse(context, overflowWrap, declaration.overflowWrap);
        this.paddingTop = parse(context, paddingTop, declaration.paddingTop);
        this.paddingRight = parse(context, paddingRight, declaration.paddingRight);
        this.paddingBottom = parse(context, paddingBottom, declaration.paddingBottom);
        this.paddingLeft = parse(context, paddingLeft, declaration.paddingLeft);
        this.paintOrder = parse(context, paintOrder, declaration.paintOrder);
        this.position = parse(context, position, declaration.position);
        this.textAlign = parse(context, textAlign, declaration.textAlign);
        this.textDecorationColor = parse(context, textDecorationColor, (_a = declaration.textDecorationColor) !== null && _a !== void 0 ? _a : declaration.color);
        this.textDecorationLine = parse(context, textDecorationLine, (_b = declaration.textDecorationLine) !== null && _b !== void 0 ? _b : declaration.textDecoration);
        this.textShadow = parse(context, textShadow, declaration.textShadow);
        this.textTransform = parse(context, textTransform, declaration.textTransform);
        this.transform = parse(context, transform$1, declaration.transform);
        this.transformOrigin = parse(context, transformOrigin, declaration.transformOrigin);
        this.visibility = parse(context, visibility, declaration.visibility);
        this.webkitTextStrokeColor = parse(context, webkitTextStrokeColor, declaration.webkitTextStrokeColor);
        this.webkitTextStrokeWidth = parse(context, webkitTextStrokeWidth, declaration.webkitTextStrokeWidth);
        this.wordBreak = parse(context, wordBreak, declaration.wordBreak);
        this.zIndex = parse(context, zIndex, declaration.zIndex);
    }
    CSSParsedDeclaration.prototype.isVisible = function () {
        return this.display > 0 && this.opacity > 0 && this.visibility === 0 /* VISIBLE */;
    };
    CSSParsedDeclaration.prototype.isTransparent = function () {
        return isTransparent(this.backgroundColor);
    };
    CSSParsedDeclaration.prototype.isTransformed = function () {
        return this.transform !== null;
    };
    CSSParsedDeclaration.prototype.isPositioned = function () {
        return this.position !== 0 /* STATIC */;
    };
    CSSParsedDeclaration.prototype.isPositionedWithZIndex = function () {
        return this.isPositioned() && !this.zIndex.auto;
    };
    CSSParsedDeclaration.prototype.isFloating = function () {
        return this.float !== 0 /* NONE */;
    };
    CSSParsedDeclaration.prototype.isInlineLevel = function () {
        return (contains(this.display, 4 /* INLINE */) ||
            contains(this.display, 33554432 /* INLINE_BLOCK */) ||
            contains(this.display, 268435456 /* INLINE_FLEX */) ||
            contains(this.display, 536870912 /* INLINE_GRID */) ||
            contains(this.display, 67108864 /* INLINE_LIST_ITEM */) ||
            contains(this.display, 134217728 /* INLINE_TABLE */));
    };
    return CSSParsedDeclaration;
}());
var CSSParsedPseudoDeclaration = /** @class */ (function () {
    function CSSParsedPseudoDeclaration(context, declaration) {
        this.content = parse(context, content, declaration.content);
        this.quotes = parse(context, quotes, declaration.quotes);
    }
    return CSSParsedPseudoDeclaration;
}());
var CSSParsedCounterDeclaration = /** @class */ (function () {
    function CSSParsedCounterDeclaration(context, declaration) {
        this.counterIncrement = parse(context, counterIncrement, declaration.counterIncrement);
        this.counterReset = parse(context, counterReset, declaration.counterReset);
    }
    return CSSParsedCounterDeclaration;
}());
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var parse = function (context, descriptor, style) {
    var tokenizer = new Tokenizer();
    var value = style !== null && typeof style !== 'undefined' ? style.toString() : descriptor.initialValue;
    tokenizer.write(value);
    var parser = new Parser$1(tokenizer.read());
    switch (descriptor.type) {
        case 2 /* IDENT_VALUE */:
            var token = parser.parseComponentValue();
            return descriptor.parse(context, isIdentToken(token) ? token.value : descriptor.initialValue);
        case 0 /* VALUE */:
            return descriptor.parse(context, parser.parseComponentValue());
        case 1 /* LIST */:
            return descriptor.parse(context, parser.parseComponentValues());
        case 4 /* TOKEN_VALUE */:
            return parser.parseComponentValue();
        case 3 /* TYPE_VALUE */:
            switch (descriptor.format) {
                case 'angle':
                    return angle.parse(context, parser.parseComponentValue());
                case 'color':
                    return color$1.parse(context, parser.parseComponentValue());
                case 'image':
                    return image.parse(context, parser.parseComponentValue());
                case 'length':
                    var length_1 = parser.parseComponentValue();
                    return isLength(length_1) ? length_1 : ZERO_LENGTH;
                case 'length-percentage':
                    var value_1 = parser.parseComponentValue();
                    return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
                case 'time':
                    return time.parse(context, parser.parseComponentValue());
            }
            break;
    }
};

var elementDebuggerAttribute = 'data-html2canvas-debug';
var getElementDebugType = function (element) {
    var attribute = element.getAttribute(elementDebuggerAttribute);
    switch (attribute) {
        case 'all':
            return 1 /* ALL */;
        case 'clone':
            return 2 /* CLONE */;
        case 'parse':
            return 3 /* PARSE */;
        case 'render':
            return 4 /* RENDER */;
        default:
            return 0 /* NONE */;
    }
};
var isDebugging = function (element, type) {
    var elementType = getElementDebugType(element);
    return elementType === 1 /* ALL */ || type === elementType;
};

var ElementContainer = /** @class */ (function () {
    function ElementContainer(context, element) {
        this.context = context;
        this.textNodes = [];
        this.elements = [];
        this.flags = 0;
        if (isDebugging(element, 3 /* PARSE */)) {
            debugger;
        }
        this.styles = new CSSParsedDeclaration(context, window.getComputedStyle(element, null));
        if (isHTMLElementNode(element)) {
            if (this.styles.animationDuration.some(function (duration) { return duration > 0; })) {
                element.style.animationDuration = '0s';
            }
            if (this.styles.transform !== null) {
                // getBoundingClientRect takes transforms into account
                element.style.transform = 'none';
            }
        }
        this.bounds = parseBounds(this.context, element);
        if (isDebugging(element, 4 /* RENDER */)) {
            this.flags |= 16 /* DEBUG_RENDER */;
        }
    }
    return ElementContainer;
}());

/*
 * text-segmentation 1.0.3 <https://github.com/niklasvh/text-segmentation>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var base64 = 'AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=';

/*
 * utrie 1.0.2 <https://github.com/niklasvh/utrie>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i$1 = 0; i$1 < chars$1.length; i$1++) {
    lookup$1[chars$1.charCodeAt(i$1)] = i$1;
}
var decode = function (base64) {
    var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    var buffer = typeof ArrayBuffer !== 'undefined' &&
        typeof Uint8Array !== 'undefined' &&
        typeof Uint8Array.prototype.slice !== 'undefined'
        ? new ArrayBuffer(bufferLength)
        : new Array(bufferLength);
    var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup$1[base64.charCodeAt(i)];
        encoded2 = lookup$1[base64.charCodeAt(i + 1)];
        encoded3 = lookup$1[base64.charCodeAt(i + 2)];
        encoded4 = lookup$1[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return buffer;
};
var polyUint16Array = function (buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i = 0; i < length; i += 2) {
        bytes.push((buffer[i + 1] << 8) | buffer[i]);
    }
    return bytes;
};
var polyUint32Array = function (buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i = 0; i < length; i += 4) {
        bytes.push((buffer[i + 3] << 24) | (buffer[i + 2] << 16) | (buffer[i + 1] << 8) | buffer[i]);
    }
    return bytes;
};

/** Shift size for getting the index-2 table offset. */
var UTRIE2_SHIFT_2 = 5;
/** Shift size for getting the index-1 table offset. */
var UTRIE2_SHIFT_1 = 6 + 5;
/**
 * Shift size for shifting left the index array values.
 * Increases possible data size with 16-bit index values at the cost
 * of compactability.
 * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
 */
var UTRIE2_INDEX_SHIFT = 2;
/**
 * Difference between the two shift sizes,
 * for getting an index-1 offset from an index-2 offset. 6=11-5
 */
var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
/**
 * The part of the index-2 table for U+D800..U+DBFF stores values for
 * lead surrogate code _units_ not code _points_.
 * Values for lead surrogate code _points_ are indexed with this portion of the table.
 * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
 */
var UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;
/** Number of entries in a data block. 32=0x20 */
var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
/** Mask for getting the lower bits for the in-data-block offset. */
var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
var UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
/** Count the lengths of both BMP pieces. 2080=0x820 */
var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
/**
 * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
 * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
 */
var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
/**
 * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
 * Variable length, for code points up to highStart, where the last single-value range starts.
 * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
 * (For 0x100000 supplementary code points U+10000..U+10ffff.)
 *
 * The part of the index-2 table for supplementary code points starts
 * after this index-1 table.
 *
 * Both the index-1 table and the following part of the index-2 table
 * are omitted completely if there is only BMP data.
 */
var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
/**
 * Number of index-1 entries for the BMP. 32=0x20
 * This part of the index-1 table is omitted from the serialized form.
 */
var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;
/** Number of entries in an index-2 block. 64=0x40 */
var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
/** Mask for getting the lower bits for the in-index-2-block offset. */
var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
var slice16 = function (view, start, end) {
    if (view.slice) {
        return view.slice(start, end);
    }
    return new Uint16Array(Array.prototype.slice.call(view, start, end));
};
var slice32 = function (view, start, end) {
    if (view.slice) {
        return view.slice(start, end);
    }
    return new Uint32Array(Array.prototype.slice.call(view, start, end));
};
var createTrieFromBase64 = function (base64, _byteLength) {
    var buffer = decode(base64);
    var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
    var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
    var headerLength = 24;
    var index = slice16(view16, headerLength / 2, view32[4] / 2);
    var data = view32[5] === 2
        ? slice16(view16, (headerLength + view32[4]) / 2)
        : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
    return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
};
var Trie = /** @class */ (function () {
    function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
        this.initialValue = initialValue;
        this.errorValue = errorValue;
        this.highStart = highStart;
        this.highValueIndex = highValueIndex;
        this.index = index;
        this.data = data;
    }
    /**
     * Get the value for a code point as stored in the Trie.
     *
     * @param codePoint the code point
     * @return the value
     */
    Trie.prototype.get = function (codePoint) {
        var ix;
        if (codePoint >= 0) {
            if (codePoint < 0x0d800 || (codePoint > 0x0dbff && codePoint <= 0x0ffff)) {
                // Ordinary BMP code point, excluding leading surrogates.
                // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                // 16 bit data is stored in the index array itself.
                ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                return this.data[ix];
            }
            if (codePoint <= 0xffff) {
                // Lead Surrogate Code Point.  A Separate index section is stored for
                // lead surrogate code units and code points.
                //   The main index has the code unit data.
                //   For this function, we need the code point data.
                // Note: this expression could be refactored for slightly improved efficiency, but
                //       surrogate code points will be so rare in practice that it's not worth it.
                ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + ((codePoint - 0xd800) >> UTRIE2_SHIFT_2)];
                ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                return this.data[ix];
            }
            if (codePoint < this.highStart) {
                // Supplemental code point, use two-level lookup.
                ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                ix = this.index[ix];
                ix += (codePoint >> UTRIE2_SHIFT_2) & UTRIE2_INDEX_2_MASK;
                ix = this.index[ix];
                ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                return this.data[ix];
            }
            if (codePoint <= 0x10ffff) {
                return this.data[this.highValueIndex];
            }
        }
        // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
        return this.errorValue;
    };
    return Trie;
}());

/*
 * base64-arraybuffer 1.0.2 <https://github.com/niklasvh/base64-arraybuffer>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}

var Prepend = 1;
var CR = 2;
var LF = 3;
var Control = 4;
var Extend = 5;
var SpacingMark = 7;
var L = 8;
var V = 9;
var T = 10;
var LV = 11;
var LVT = 12;
var ZWJ = 13;
var Extended_Pictographic = 14;
var RI = 15;
var toCodePoints = function (str) {
    var codePoints = [];
    var i = 0;
    var length = str.length;
    while (i < length) {
        var value = str.charCodeAt(i++);
        if (value >= 0xd800 && value <= 0xdbff && i < length) {
            var extra = str.charCodeAt(i++);
            if ((extra & 0xfc00) === 0xdc00) {
                codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
            }
            else {
                codePoints.push(value);
                i--;
            }
        }
        else {
            codePoints.push(value);
        }
    }
    return codePoints;
};
var fromCodePoint = function () {
    var codePoints = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        codePoints[_i] = arguments[_i];
    }
    if (String.fromCodePoint) {
        return String.fromCodePoint.apply(String, codePoints);
    }
    var length = codePoints.length;
    if (!length) {
        return '';
    }
    var codeUnits = [];
    var index = -1;
    var result = '';
    while (++index < length) {
        var codePoint = codePoints[index];
        if (codePoint <= 0xffff) {
            codeUnits.push(codePoint);
        }
        else {
            codePoint -= 0x10000;
            codeUnits.push((codePoint >> 10) + 0xd800, (codePoint % 0x400) + 0xdc00);
        }
        if (index + 1 === length || codeUnits.length > 0x4000) {
            result += String.fromCharCode.apply(String, codeUnits);
            codeUnits.length = 0;
        }
    }
    return result;
};
var UnicodeTrie = createTrieFromBase64(base64);
var BREAK_NOT_ALLOWED = '×';
var BREAK_ALLOWED = '÷';
var codePointToClass = function (codePoint) { return UnicodeTrie.get(codePoint); };
var _graphemeBreakAtIndex = function (_codePoints, classTypes, index) {
    var prevIndex = index - 2;
    var prev = classTypes[prevIndex];
    var current = classTypes[index - 1];
    var next = classTypes[index];
    // GB3 Do not break between a CR and LF
    if (current === CR && next === LF) {
        return BREAK_NOT_ALLOWED;
    }
    // GB4 Otherwise, break before and after controls.
    if (current === CR || current === LF || current === Control) {
        return BREAK_ALLOWED;
    }
    // GB5
    if (next === CR || next === LF || next === Control) {
        return BREAK_ALLOWED;
    }
    // Do not break Hangul syllable sequences.
    // GB6
    if (current === L && [L, V, LV, LVT].indexOf(next) !== -1) {
        return BREAK_NOT_ALLOWED;
    }
    // GB7
    if ((current === LV || current === V) && (next === V || next === T)) {
        return BREAK_NOT_ALLOWED;
    }
    // GB8
    if ((current === LVT || current === T) && next === T) {
        return BREAK_NOT_ALLOWED;
    }
    // GB9 Do not break before extending characters or ZWJ.
    if (next === ZWJ || next === Extend) {
        return BREAK_NOT_ALLOWED;
    }
    // Do not break before SpacingMarks, or after Prepend characters.
    // GB9a
    if (next === SpacingMark) {
        return BREAK_NOT_ALLOWED;
    }
    // GB9a
    if (current === Prepend) {
        return BREAK_NOT_ALLOWED;
    }
    // GB11 Do not break within emoji modifier sequences or emoji zwj sequences.
    if (current === ZWJ && next === Extended_Pictographic) {
        while (prev === Extend) {
            prev = classTypes[--prevIndex];
        }
        if (prev === Extended_Pictographic) {
            return BREAK_NOT_ALLOWED;
        }
    }
    // GB12 Do not break within emoji flag sequences.
    // That is, do not break between regional indicator (RI) symbols
    // if there is an odd number of RI characters before the break point.
    if (current === RI && next === RI) {
        var countRI = 0;
        while (prev === RI) {
            countRI++;
            prev = classTypes[--prevIndex];
        }
        if (countRI % 2 === 0) {
            return BREAK_NOT_ALLOWED;
        }
    }
    return BREAK_ALLOWED;
};
var GraphemeBreaker = function (str) {
    var codePoints = toCodePoints(str);
    var length = codePoints.length;
    var index = 0;
    var lastEnd = 0;
    var classTypes = codePoints.map(codePointToClass);
    return {
        next: function () {
            if (index >= length) {
                return { done: true, value: null };
            }
            var graphemeBreak = BREAK_NOT_ALLOWED;
            while (index < length &&
                (graphemeBreak = _graphemeBreakAtIndex(codePoints, classTypes, ++index)) === BREAK_NOT_ALLOWED) { }
            if (graphemeBreak !== BREAK_NOT_ALLOWED || index === length) {
                var value = fromCodePoint.apply(null, codePoints.slice(lastEnd, index));
                lastEnd = index;
                return { value: value, done: false };
            }
            return { done: true, value: null };
        },
    };
};
var splitGraphemes = function (str) {
    var breaker = GraphemeBreaker(str);
    var graphemes = [];
    var bk;
    while (!(bk = breaker.next()).done) {
        if (bk.value) {
            graphemes.push(bk.value.slice());
        }
    }
    return graphemes;
};

var testRangeBounds = function (document) {
    var TEST_HEIGHT = 123;
    if (document.createRange) {
        var range = document.createRange();
        if (range.getBoundingClientRect) {
            var testElement = document.createElement('boundtest');
            testElement.style.height = TEST_HEIGHT + "px";
            testElement.style.display = 'block';
            document.body.appendChild(testElement);
            range.selectNode(testElement);
            var rangeBounds = range.getBoundingClientRect();
            var rangeHeight = Math.round(rangeBounds.height);
            document.body.removeChild(testElement);
            if (rangeHeight === TEST_HEIGHT) {
                return true;
            }
        }
    }
    return false;
};
var testIOSLineBreak = function (document) {
    var testElement = document.createElement('boundtest');
    testElement.style.width = '50px';
    testElement.style.display = 'block';
    testElement.style.fontSize = '12px';
    testElement.style.letterSpacing = '0px';
    testElement.style.wordSpacing = '0px';
    document.body.appendChild(testElement);
    var range = document.createRange();
    testElement.innerHTML = typeof ''.repeat === 'function' ? '&#128104;'.repeat(10) : '';
    var node = testElement.firstChild;
    var textList = toCodePoints$1(node.data).map(function (i) { return fromCodePoint$1(i); });
    var offset = 0;
    var prev = {};
    // ios 13 does not handle range getBoundingClientRect line changes correctly #2177
    var supports = textList.every(function (text, i) {
        range.setStart(node, offset);
        range.setEnd(node, offset + text.length);
        var rect = range.getBoundingClientRect();
        offset += text.length;
        var boundAhead = rect.x > prev.x || rect.y > prev.y;
        prev = rect;
        if (i === 0) {
            return true;
        }
        return boundAhead;
    });
    document.body.removeChild(testElement);
    return supports;
};
var testCORS = function () { return typeof new Image().crossOrigin !== 'undefined'; };
var testResponseType = function () { return typeof new XMLHttpRequest().responseType === 'string'; };
var testSVG = function (document) {
    var img = new Image();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return false;
    }
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    try {
        ctx.drawImage(img, 0, 0);
        canvas.toDataURL();
    }
    catch (e) {
        return false;
    }
    return true;
};
var isGreenPixel = function (data) {
    return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
};
var testForeignObject = function (document) {
    var canvas = document.createElement('canvas');
    var size = 100;
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return Promise.reject(false);
    }
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.fillRect(0, 0, size, size);
    var img = new Image();
    var greenImageSrc = canvas.toDataURL();
    img.src = greenImageSrc;
    var svg = createForeignObjectSVG(size, size, 0, 0, img);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, size, size);
    return loadSerializedSVG$1(svg)
        .then(function (img) {
        ctx.drawImage(img, 0, 0);
        var data = ctx.getImageData(0, 0, size, size).data;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, size, size);
        var node = document.createElement('div');
        node.style.backgroundImage = "url(" + greenImageSrc + ")";
        node.style.height = size + "px";
        // Firefox 55 does not render inline <img /> tags
        return isGreenPixel(data)
            ? loadSerializedSVG$1(createForeignObjectSVG(size, size, 0, 0, node))
            : Promise.reject(false);
    })
        .then(function (img) {
        ctx.drawImage(img, 0, 0);
        // Edge does not render background-images
        return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
    })
        .catch(function () { return false; });
};
var createForeignObjectSVG = function (width, height, x, y, node) {
    var xmlns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(xmlns, 'svg');
    var foreignObject = document.createElementNS(xmlns, 'foreignObject');
    svg.setAttributeNS(null, 'width', width.toString());
    svg.setAttributeNS(null, 'height', height.toString());
    foreignObject.setAttributeNS(null, 'width', '100%');
    foreignObject.setAttributeNS(null, 'height', '100%');
    foreignObject.setAttributeNS(null, 'x', x.toString());
    foreignObject.setAttributeNS(null, 'y', y.toString());
    foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true');
    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    return svg;
};
var loadSerializedSVG$1 = function (svg) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () { return resolve(img); };
        img.onerror = reject;
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    });
};
var FEATURES = {
    get SUPPORT_RANGE_BOUNDS() {
        var value = testRangeBounds(document);
        Object.defineProperty(FEATURES, 'SUPPORT_RANGE_BOUNDS', { value: value });
        return value;
    },
    get SUPPORT_WORD_BREAKING() {
        var value = FEATURES.SUPPORT_RANGE_BOUNDS && testIOSLineBreak(document);
        Object.defineProperty(FEATURES, 'SUPPORT_WORD_BREAKING', { value: value });
        return value;
    },
    get SUPPORT_SVG_DRAWING() {
        var value = testSVG(document);
        Object.defineProperty(FEATURES, 'SUPPORT_SVG_DRAWING', { value: value });
        return value;
    },
    get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var value = typeof Array.from === 'function' && typeof window.fetch === 'function'
            ? testForeignObject(document)
            : Promise.resolve(false);
        Object.defineProperty(FEATURES, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: value });
        return value;
    },
    get SUPPORT_CORS_IMAGES() {
        var value = testCORS();
        Object.defineProperty(FEATURES, 'SUPPORT_CORS_IMAGES', { value: value });
        return value;
    },
    get SUPPORT_RESPONSE_TYPE() {
        var value = testResponseType();
        Object.defineProperty(FEATURES, 'SUPPORT_RESPONSE_TYPE', { value: value });
        return value;
    },
    get SUPPORT_CORS_XHR() {
        var value = 'withCredentials' in new XMLHttpRequest();
        Object.defineProperty(FEATURES, 'SUPPORT_CORS_XHR', { value: value });
        return value;
    },
    get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var value = !!(typeof Intl !== 'undefined' && Intl.Segmenter);
        Object.defineProperty(FEATURES, 'SUPPORT_NATIVE_TEXT_SEGMENTATION', { value: value });
        return value;
    }
};

var TextBounds = /** @class */ (function () {
    function TextBounds(text, bounds) {
        this.text = text;
        this.bounds = bounds;
    }
    return TextBounds;
}());
var parseTextBounds = function (context, value, styles, node) {
    var textList = breakText(value, styles);
    var textBounds = [];
    var offset = 0;
    textList.forEach(function (text) {
        if (styles.textDecorationLine.length || text.trim().length > 0) {
            if (FEATURES.SUPPORT_RANGE_BOUNDS) {
                var clientRects = createRange(node, offset, text.length).getClientRects();
                if (clientRects.length > 1) {
                    var subSegments = segmentGraphemes(text);
                    var subOffset_1 = 0;
                    subSegments.forEach(function (subSegment) {
                        textBounds.push(new TextBounds(subSegment, Bounds.fromDOMRectList(context, createRange(node, subOffset_1 + offset, subSegment.length).getClientRects())));
                        subOffset_1 += subSegment.length;
                    });
                }
                else {
                    textBounds.push(new TextBounds(text, Bounds.fromDOMRectList(context, clientRects)));
                }
            }
            else {
                var replacementNode = node.splitText(text.length);
                textBounds.push(new TextBounds(text, getWrapperBounds(context, node)));
                node = replacementNode;
            }
        }
        else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
            node = node.splitText(text.length);
        }
        offset += text.length;
    });
    return textBounds;
};
var getWrapperBounds = function (context, node) {
    var ownerDocument = node.ownerDocument;
    if (ownerDocument) {
        var wrapper = ownerDocument.createElement('html2canvaswrapper');
        wrapper.appendChild(node.cloneNode(true));
        var parentNode = node.parentNode;
        if (parentNode) {
            parentNode.replaceChild(wrapper, node);
            var bounds = parseBounds(context, wrapper);
            if (wrapper.firstChild) {
                parentNode.replaceChild(wrapper.firstChild, wrapper);
            }
            return bounds;
        }
    }
    return Bounds.EMPTY;
};
var createRange = function (node, offset, length) {
    var ownerDocument = node.ownerDocument;
    if (!ownerDocument) {
        throw new Error('Node has no owner document');
    }
    var range = ownerDocument.createRange();
    range.setStart(node, offset);
    range.setEnd(node, offset + length);
    return range;
};
var segmentGraphemes = function (value) {
    if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var segmenter = new Intl.Segmenter(void 0, { granularity: 'grapheme' });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Array.from(segmenter.segment(value)).map(function (segment) { return segment.segment; });
    }
    return splitGraphemes(value);
};
var segmentWords = function (value, styles) {
    if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var segmenter = new Intl.Segmenter(void 0, {
            granularity: 'word'
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Array.from(segmenter.segment(value)).map(function (segment) { return segment.segment; });
    }
    return breakWords(value, styles);
};
var breakText = function (value, styles) {
    return styles.letterSpacing !== 0 ? segmentGraphemes(value) : segmentWords(value, styles);
};
// https://drafts.csswg.org/css-text/#word-separator
var wordSeparators = [0x0020, 0x00a0, 0x1361, 0x10100, 0x10101, 0x1039, 0x1091];
var breakWords = function (str, styles) {
    var breaker = LineBreaker(str, {
        lineBreak: styles.lineBreak,
        wordBreak: styles.overflowWrap === "break-word" /* BREAK_WORD */ ? 'break-word' : styles.wordBreak
    });
    var words = [];
    var bk;
    var _loop_1 = function () {
        if (bk.value) {
            var value = bk.value.slice();
            var codePoints = toCodePoints$1(value);
            var word_1 = '';
            codePoints.forEach(function (codePoint) {
                if (wordSeparators.indexOf(codePoint) === -1) {
                    word_1 += fromCodePoint$1(codePoint);
                }
                else {
                    if (word_1.length) {
                        words.push(word_1);
                    }
                    words.push(fromCodePoint$1(codePoint));
                    word_1 = '';
                }
            });
            if (word_1.length) {
                words.push(word_1);
            }
        }
    };
    while (!(bk = breaker.next()).done) {
        _loop_1();
    }
    return words;
};

var TextContainer = /** @class */ (function () {
    function TextContainer(context, node, styles) {
        this.text = transform(node.data, styles.textTransform);
        this.textBounds = parseTextBounds(context, this.text, styles, node);
    }
    return TextContainer;
}());
var transform = function (text, transform) {
    switch (transform) {
        case 1 /* LOWERCASE */:
            return text.toLowerCase();
        case 3 /* CAPITALIZE */:
            return text.replace(CAPITALIZE, capitalize);
        case 2 /* UPPERCASE */:
            return text.toUpperCase();
        default:
            return text;
    }
};
var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
var capitalize = function (m, p1, p2) {
    if (m.length > 0) {
        return p1 + p2.toUpperCase();
    }
    return m;
};

var ImageElementContainer = /** @class */ (function (_super) {
    __extends(ImageElementContainer, _super);
    function ImageElementContainer(context, img) {
        var _this = _super.call(this, context, img) || this;
        _this.src = img.currentSrc || img.src;
        _this.intrinsicWidth = img.naturalWidth;
        _this.intrinsicHeight = img.naturalHeight;
        _this.context.cache.addImage(_this.src);
        return _this;
    }
    return ImageElementContainer;
}(ElementContainer));

var CanvasElementContainer = /** @class */ (function (_super) {
    __extends(CanvasElementContainer, _super);
    function CanvasElementContainer(context, canvas) {
        var _this = _super.call(this, context, canvas) || this;
        _this.canvas = canvas;
        _this.intrinsicWidth = canvas.width;
        _this.intrinsicHeight = canvas.height;
        return _this;
    }
    return CanvasElementContainer;
}(ElementContainer));

var SVGElementContainer = /** @class */ (function (_super) {
    __extends(SVGElementContainer, _super);
    function SVGElementContainer(context, img) {
        var _this = _super.call(this, context, img) || this;
        var s = new XMLSerializer();
        var bounds = parseBounds(context, img);
        img.setAttribute('width', bounds.width + "px");
        img.setAttribute('height', bounds.height + "px");
        _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
        _this.intrinsicWidth = img.width.baseVal.value;
        _this.intrinsicHeight = img.height.baseVal.value;
        _this.context.cache.addImage(_this.svg);
        return _this;
    }
    return SVGElementContainer;
}(ElementContainer));

var LIElementContainer = /** @class */ (function (_super) {
    __extends(LIElementContainer, _super);
    function LIElementContainer(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.value = element.value;
        return _this;
    }
    return LIElementContainer;
}(ElementContainer));

var OLElementContainer = /** @class */ (function (_super) {
    __extends(OLElementContainer, _super);
    function OLElementContainer(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.start = element.start;
        _this.reversed = typeof element.reversed === 'boolean' && element.reversed === true;
        return _this;
    }
    return OLElementContainer;
}(ElementContainer));

var CHECKBOX_BORDER_RADIUS = [
    {
        type: 15 /* DIMENSION_TOKEN */,
        flags: 0,
        unit: 'px',
        number: 3
    }
];
var RADIO_BORDER_RADIUS = [
    {
        type: 16 /* PERCENTAGE_TOKEN */,
        flags: 0,
        number: 50
    }
];
var reformatInputBounds = function (bounds) {
    if (bounds.width > bounds.height) {
        return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
    }
    else if (bounds.width < bounds.height) {
        return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
    }
    return bounds;
};
var getInputValue = function (node) {
    var value = node.type === PASSWORD ? new Array(node.value.length + 1).join('\u2022') : node.value;
    return value.length === 0 ? node.placeholder || '' : value;
};
var CHECKBOX = 'checkbox';
var RADIO = 'radio';
var PASSWORD = 'password';
var INPUT_COLOR = 0x2a2a2aff;
var InputElementContainer = /** @class */ (function (_super) {
    __extends(InputElementContainer, _super);
    function InputElementContainer(context, input) {
        var _this = _super.call(this, context, input) || this;
        _this.type = input.type.toLowerCase();
        _this.checked = input.checked;
        _this.value = getInputValue(input);
        if (_this.type === CHECKBOX || _this.type === RADIO) {
            _this.styles.backgroundColor = 0xdededeff;
            _this.styles.borderTopColor =
                _this.styles.borderRightColor =
                    _this.styles.borderBottomColor =
                        _this.styles.borderLeftColor =
                            0xa5a5a5ff;
            _this.styles.borderTopWidth =
                _this.styles.borderRightWidth =
                    _this.styles.borderBottomWidth =
                        _this.styles.borderLeftWidth =
                            1;
            _this.styles.borderTopStyle =
                _this.styles.borderRightStyle =
                    _this.styles.borderBottomStyle =
                        _this.styles.borderLeftStyle =
                            1 /* SOLID */;
            _this.styles.backgroundClip = [0 /* BORDER_BOX */];
            _this.styles.backgroundOrigin = [0 /* BORDER_BOX */];
            _this.bounds = reformatInputBounds(_this.bounds);
        }
        switch (_this.type) {
            case CHECKBOX:
                _this.styles.borderTopRightRadius =
                    _this.styles.borderTopLeftRadius =
                        _this.styles.borderBottomRightRadius =
                            _this.styles.borderBottomLeftRadius =
                                CHECKBOX_BORDER_RADIUS;
                break;
            case RADIO:
                _this.styles.borderTopRightRadius =
                    _this.styles.borderTopLeftRadius =
                        _this.styles.borderBottomRightRadius =
                            _this.styles.borderBottomLeftRadius =
                                RADIO_BORDER_RADIUS;
                break;
        }
        return _this;
    }
    return InputElementContainer;
}(ElementContainer));

var SelectElementContainer = /** @class */ (function (_super) {
    __extends(SelectElementContainer, _super);
    function SelectElementContainer(context, element) {
        var _this = _super.call(this, context, element) || this;
        var option = element.options[element.selectedIndex || 0];
        _this.value = option ? option.text || '' : '';
        return _this;
    }
    return SelectElementContainer;
}(ElementContainer));

var TextareaElementContainer = /** @class */ (function (_super) {
    __extends(TextareaElementContainer, _super);
    function TextareaElementContainer(context, element) {
        var _this = _super.call(this, context, element) || this;
        _this.value = element.value;
        return _this;
    }
    return TextareaElementContainer;
}(ElementContainer));

var IFrameElementContainer = /** @class */ (function (_super) {
    __extends(IFrameElementContainer, _super);
    function IFrameElementContainer(context, iframe) {
        var _this = _super.call(this, context, iframe) || this;
        _this.src = iframe.src;
        _this.width = parseInt(iframe.width, 10) || 0;
        _this.height = parseInt(iframe.height, 10) || 0;
        _this.backgroundColor = _this.styles.backgroundColor;
        try {
            if (iframe.contentWindow &&
                iframe.contentWindow.document &&
                iframe.contentWindow.document.documentElement) {
                _this.tree = parseTree(context, iframe.contentWindow.document.documentElement);
                // http://www.w3.org/TR/css3-background/#special-backgrounds
                var documentBackgroundColor = iframe.contentWindow.document.documentElement
                    ? parseColor(context, getComputedStyle(iframe.contentWindow.document.documentElement).backgroundColor)
                    : COLORS.TRANSPARENT;
                var bodyBackgroundColor = iframe.contentWindow.document.body
                    ? parseColor(context, getComputedStyle(iframe.contentWindow.document.body).backgroundColor)
                    : COLORS.TRANSPARENT;
                _this.backgroundColor = isTransparent(documentBackgroundColor)
                    ? isTransparent(bodyBackgroundColor)
                        ? _this.styles.backgroundColor
                        : bodyBackgroundColor
                    : documentBackgroundColor;
            }
        }
        catch (e) { }
        return _this;
    }
    return IFrameElementContainer;
}(ElementContainer));

var LIST_OWNERS = ['OL', 'UL', 'MENU'];
var parseNodeTree = function (context, node, parent, root) {
    for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
        nextNode = childNode.nextSibling;
        if (isTextNode(childNode) && childNode.data.trim().length > 0) {
            parent.textNodes.push(new TextContainer(context, childNode, parent.styles));
        }
        else if (isElementNode(childNode)) {
            if (isSlotElement(childNode) && childNode.assignedNodes) {
                childNode.assignedNodes().forEach(function (childNode) { return parseNodeTree(context, childNode, parent, root); });
            }
            else {
                var container = createContainer(context, childNode);
                if (container.styles.isVisible()) {
                    if (createsRealStackingContext(childNode, container, root)) {
                        container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
                    }
                    else if (createsStackingContext(container.styles)) {
                        container.flags |= 2 /* CREATES_STACKING_CONTEXT */;
                    }
                    if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
                        container.flags |= 8 /* IS_LIST_OWNER */;
                    }
                    parent.elements.push(container);
                    childNode.slot;
                    if (childNode.shadowRoot) {
                        parseNodeTree(context, childNode.shadowRoot, container, root);
                    }
                    else if (!isTextareaElement(childNode) &&
                        !isSVGElement(childNode) &&
                        !isSelectElement(childNode)) {
                        parseNodeTree(context, childNode, container, root);
                    }
                }
            }
        }
    }
};
var createContainer = function (context, element) {
    if (isImageElement(element)) {
        return new ImageElementContainer(context, element);
    }
    if (isCanvasElement(element)) {
        return new CanvasElementContainer(context, element);
    }
    if (isSVGElement(element)) {
        return new SVGElementContainer(context, element);
    }
    if (isLIElement(element)) {
        return new LIElementContainer(context, element);
    }
    if (isOLElement(element)) {
        return new OLElementContainer(context, element);
    }
    if (isInputElement(element)) {
        return new InputElementContainer(context, element);
    }
    if (isSelectElement(element)) {
        return new SelectElementContainer(context, element);
    }
    if (isTextareaElement(element)) {
        return new TextareaElementContainer(context, element);
    }
    if (isIFrameElement(element)) {
        return new IFrameElementContainer(context, element);
    }
    return new ElementContainer(context, element);
};
var parseTree = function (context, element) {
    var container = createContainer(context, element);
    container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
    parseNodeTree(context, element, container, container);
    return container;
};
var createsRealStackingContext = function (node, container, root) {
    return (container.styles.isPositionedWithZIndex() ||
        container.styles.opacity < 1 ||
        container.styles.isTransformed() ||
        (isBodyElement(node) && root.styles.isTransparent()));
};
var createsStackingContext = function (styles) { return styles.isPositioned() || styles.isFloating(); };
var isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
var isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
var isHTMLElementNode = function (node) {
    return isElementNode(node) && typeof node.style !== 'undefined' && !isSVGElementNode(node);
};
var isSVGElementNode = function (element) {
    return typeof element.className === 'object';
};
var isLIElement = function (node) { return node.tagName === 'LI'; };
var isOLElement = function (node) { return node.tagName === 'OL'; };
var isInputElement = function (node) { return node.tagName === 'INPUT'; };
var isHTMLElement = function (node) { return node.tagName === 'HTML'; };
var isSVGElement = function (node) { return node.tagName === 'svg'; };
var isBodyElement = function (node) { return node.tagName === 'BODY'; };
var isCanvasElement = function (node) { return node.tagName === 'CANVAS'; };
var isVideoElement = function (node) { return node.tagName === 'VIDEO'; };
var isImageElement = function (node) { return node.tagName === 'IMG'; };
var isIFrameElement = function (node) { return node.tagName === 'IFRAME'; };
var isStyleElement = function (node) { return node.tagName === 'STYLE'; };
var isScriptElement = function (node) { return node.tagName === 'SCRIPT'; };
var isTextareaElement = function (node) { return node.tagName === 'TEXTAREA'; };
var isSelectElement = function (node) { return node.tagName === 'SELECT'; };
var isSlotElement = function (node) { return node.tagName === 'SLOT'; };
// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
var isCustomElement = function (node) { return node.tagName.indexOf('-') > 0; };

var CounterState = /** @class */ (function () {
    function CounterState() {
        this.counters = {};
    }
    CounterState.prototype.getCounterValue = function (name) {
        var counter = this.counters[name];
        if (counter && counter.length) {
            return counter[counter.length - 1];
        }
        return 1;
    };
    CounterState.prototype.getCounterValues = function (name) {
        var counter = this.counters[name];
        return counter ? counter : [];
    };
    CounterState.prototype.pop = function (counters) {
        var _this = this;
        counters.forEach(function (counter) { return _this.counters[counter].pop(); });
    };
    CounterState.prototype.parse = function (style) {
        var _this = this;
        var counterIncrement = style.counterIncrement;
        var counterReset = style.counterReset;
        var canReset = true;
        if (counterIncrement !== null) {
            counterIncrement.forEach(function (entry) {
                var counter = _this.counters[entry.counter];
                if (counter && entry.increment !== 0) {
                    canReset = false;
                    if (!counter.length) {
                        counter.push(1);
                    }
                    counter[Math.max(0, counter.length - 1)] += entry.increment;
                }
            });
        }
        var counterNames = [];
        if (canReset) {
            counterReset.forEach(function (entry) {
                var counter = _this.counters[entry.counter];
                counterNames.push(entry.counter);
                if (!counter) {
                    counter = _this.counters[entry.counter] = [];
                }
                counter.push(entry.reset);
            });
        }
        return counterNames;
    };
    return CounterState;
}());
var ROMAN_UPPER = {
    integers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    values: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
};
var ARMENIAN = {
    integers: [
        9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70,
        60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
    ],
    values: [
        'Ք',
        'Փ',
        'Ւ',
        'Ց',
        'Ր',
        'Տ',
        'Վ',
        'Ս',
        'Ռ',
        'Ջ',
        'Պ',
        'Չ',
        'Ո',
        'Շ',
        'Ն',
        'Յ',
        'Մ',
        'Ճ',
        'Ղ',
        'Ձ',
        'Հ',
        'Կ',
        'Ծ',
        'Խ',
        'Լ',
        'Ի',
        'Ժ',
        'Թ',
        'Ը',
        'Է',
        'Զ',
        'Ե',
        'Դ',
        'Գ',
        'Բ',
        'Ա'
    ]
};
var HEBREW = {
    integers: [
        10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20,
        19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
    ],
    values: [
        'י׳',
        'ט׳',
        'ח׳',
        'ז׳',
        'ו׳',
        'ה׳',
        'ד׳',
        'ג׳',
        'ב׳',
        'א׳',
        'ת',
        'ש',
        'ר',
        'ק',
        'צ',
        'פ',
        'ע',
        'ס',
        'נ',
        'מ',
        'ל',
        'כ',
        'יט',
        'יח',
        'יז',
        'טז',
        'טו',
        'י',
        'ט',
        'ח',
        'ז',
        'ו',
        'ה',
        'ד',
        'ג',
        'ב',
        'א'
    ]
};
var GEORGIAN = {
    integers: [
        10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90,
        80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
    ],
    values: [
        'ჵ',
        'ჰ',
        'ჯ',
        'ჴ',
        'ხ',
        'ჭ',
        'წ',
        'ძ',
        'ც',
        'ჩ',
        'შ',
        'ყ',
        'ღ',
        'ქ',
        'ფ',
        'ჳ',
        'ტ',
        'ს',
        'რ',
        'ჟ',
        'პ',
        'ო',
        'ჲ',
        'ნ',
        'მ',
        'ლ',
        'კ',
        'ი',
        'თ',
        'ჱ',
        'ზ',
        'ვ',
        'ე',
        'დ',
        'გ',
        'ბ',
        'ა'
    ]
};
var createAdditiveCounter = function (value, min, max, symbols, fallback, suffix) {
    if (value < min || value > max) {
        return createCounterText(value, fallback, suffix.length > 0);
    }
    return (symbols.integers.reduce(function (string, integer, index) {
        while (value >= integer) {
            value -= integer;
            string += symbols.values[index];
        }
        return string;
    }, '') + suffix);
};
var createCounterStyleWithSymbolResolver = function (value, codePointRangeLength, isNumeric, resolver) {
    var string = '';
    do {
        if (!isNumeric) {
            value--;
        }
        string = resolver(value) + string;
        value /= codePointRangeLength;
    } while (value * codePointRangeLength >= codePointRangeLength);
    return string;
};
var createCounterStyleFromRange = function (value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
    var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
    return ((value < 0 ? '-' : '') +
        (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function (codePoint) {
            return fromCodePoint$1(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
        }) +
            suffix));
};
var createCounterStyleFromSymbols = function (value, symbols, suffix) {
    if (suffix === void 0) { suffix = '. '; }
    var codePointRangeLength = symbols.length;
    return (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function (codePoint) { return symbols[Math.floor(codePoint % codePointRangeLength)]; }) + suffix);
};
var CJK_ZEROS = 1 << 0;
var CJK_TEN_COEFFICIENTS = 1 << 1;
var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
var createCJKCounter = function (value, numbers, multipliers, negativeSign, suffix, flags) {
    if (value < -9999 || value > 9999) {
        return createCounterText(value, 4 /* CJK_DECIMAL */, suffix.length > 0);
    }
    var tmp = Math.abs(value);
    var string = suffix;
    if (tmp === 0) {
        return numbers[0] + string;
    }
    for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
        var coefficient = tmp % 10;
        if (coefficient === 0 && contains(flags, CJK_ZEROS) && string !== '') {
            string = numbers[coefficient] + string;
        }
        else if (coefficient > 1 ||
            (coefficient === 1 && digit === 0) ||
            (coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_COEFFICIENTS)) ||
            (coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100) ||
            (coefficient === 1 && digit > 1 && contains(flags, CJK_HUNDRED_COEFFICIENTS))) {
            string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : '') + string;
        }
        else if (coefficient === 1 && digit > 0) {
            string = multipliers[digit - 1] + string;
        }
        tmp = Math.floor(tmp / 10);
    }
    return (value < 0 ? negativeSign : '') + string;
};
var CHINESE_INFORMAL_MULTIPLIERS = '十百千萬';
var CHINESE_FORMAL_MULTIPLIERS = '拾佰仟萬';
var JAPANESE_NEGATIVE = 'マイナス';
var KOREAN_NEGATIVE = '마이너스';
var createCounterText = function (value, type, appendSuffix) {
    var defaultSuffix = appendSuffix ? '. ' : '';
    var cjkSuffix = appendSuffix ? '、' : '';
    var koreanSuffix = appendSuffix ? ', ' : '';
    var spaceSuffix = appendSuffix ? ' ' : '';
    switch (type) {
        case 0 /* DISC */:
            return '•' + spaceSuffix;
        case 1 /* CIRCLE */:
            return '◦' + spaceSuffix;
        case 2 /* SQUARE */:
            return '◾' + spaceSuffix;
        case 5 /* DECIMAL_LEADING_ZERO */:
            var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
            return string.length < 4 ? "0" + string : string;
        case 4 /* CJK_DECIMAL */:
            return createCounterStyleFromSymbols(value, '〇一二三四五六七八九', cjkSuffix);
        case 6 /* LOWER_ROMAN */:
            return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3 /* DECIMAL */, defaultSuffix).toLowerCase();
        case 7 /* UPPER_ROMAN */:
            return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3 /* DECIMAL */, defaultSuffix);
        case 8 /* LOWER_GREEK */:
            return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
        case 9 /* LOWER_ALPHA */:
            return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
        case 10 /* UPPER_ALPHA */:
            return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
        case 11 /* ARABIC_INDIC */:
            return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
        case 12 /* ARMENIAN */:
        case 49 /* UPPER_ARMENIAN */:
            return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3 /* DECIMAL */, defaultSuffix);
        case 35 /* LOWER_ARMENIAN */:
            return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3 /* DECIMAL */, defaultSuffix).toLowerCase();
        case 13 /* BENGALI */:
            return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
        case 14 /* CAMBODIAN */:
        case 30 /* KHMER */:
            return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
        case 15 /* CJK_EARTHLY_BRANCH */:
            return createCounterStyleFromSymbols(value, '子丑寅卯辰巳午未申酉戌亥', cjkSuffix);
        case 16 /* CJK_HEAVENLY_STEM */:
            return createCounterStyleFromSymbols(value, '甲乙丙丁戊己庚辛壬癸', cjkSuffix);
        case 17 /* CJK_IDEOGRAPHIC */:
        case 48 /* TRAD_CHINESE_INFORMAL */:
            return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
        case 47 /* TRAD_CHINESE_FORMAL */:
            return createCJKCounter(value, '零壹貳參肆伍陸柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
        case 42 /* SIMP_CHINESE_INFORMAL */:
            return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
        case 41 /* SIMP_CHINESE_FORMAL */:
            return createCJKCounter(value, '零壹贰叁肆伍陆柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
        case 26 /* JAPANESE_INFORMAL */:
            return createCJKCounter(value, '〇一二三四五六七八九', '十百千万', JAPANESE_NEGATIVE, cjkSuffix, 0);
        case 25 /* JAPANESE_FORMAL */:
            return createCJKCounter(value, '零壱弐参四伍六七八九', '拾百千万', JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
        case 31 /* KOREAN_HANGUL_FORMAL */:
            return createCJKCounter(value, '영일이삼사오육칠팔구', '십백천만', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
        case 33 /* KOREAN_HANJA_INFORMAL */:
            return createCJKCounter(value, '零一二三四五六七八九', '十百千萬', KOREAN_NEGATIVE, koreanSuffix, 0);
        case 32 /* KOREAN_HANJA_FORMAL */:
            return createCJKCounter(value, '零壹貳參四五六七八九', '拾百千', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
        case 18 /* DEVANAGARI */:
            return createCounterStyleFromRange(value, 0x966, 0x96f, true, defaultSuffix);
        case 20 /* GEORGIAN */:
            return createAdditiveCounter(value, 1, 19999, GEORGIAN, 3 /* DECIMAL */, defaultSuffix);
        case 21 /* GUJARATI */:
            return createCounterStyleFromRange(value, 0xae6, 0xaef, true, defaultSuffix);
        case 22 /* GURMUKHI */:
            return createCounterStyleFromRange(value, 0xa66, 0xa6f, true, defaultSuffix);
        case 22 /* HEBREW */:
            return createAdditiveCounter(value, 1, 10999, HEBREW, 3 /* DECIMAL */, defaultSuffix);
        case 23 /* HIRAGANA */:
            return createCounterStyleFromSymbols(value, 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん');
        case 24 /* HIRAGANA_IROHA */:
            return createCounterStyleFromSymbols(value, 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす');
        case 27 /* KANNADA */:
            return createCounterStyleFromRange(value, 0xce6, 0xcef, true, defaultSuffix);
        case 28 /* KATAKANA */:
            return createCounterStyleFromSymbols(value, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン', cjkSuffix);
        case 29 /* KATAKANA_IROHA */:
            return createCounterStyleFromSymbols(value, 'イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス', cjkSuffix);
        case 34 /* LAO */:
            return createCounterStyleFromRange(value, 0xed0, 0xed9, true, defaultSuffix);
        case 37 /* MONGOLIAN */:
            return createCounterStyleFromRange(value, 0x1810, 0x1819, true, defaultSuffix);
        case 38 /* MYANMAR */:
            return createCounterStyleFromRange(value, 0x1040, 0x1049, true, defaultSuffix);
        case 39 /* ORIYA */:
            return createCounterStyleFromRange(value, 0xb66, 0xb6f, true, defaultSuffix);
        case 40 /* PERSIAN */:
            return createCounterStyleFromRange(value, 0x6f0, 0x6f9, true, defaultSuffix);
        case 43 /* TAMIL */:
            return createCounterStyleFromRange(value, 0xbe6, 0xbef, true, defaultSuffix);
        case 44 /* TELUGU */:
            return createCounterStyleFromRange(value, 0xc66, 0xc6f, true, defaultSuffix);
        case 45 /* THAI */:
            return createCounterStyleFromRange(value, 0xe50, 0xe59, true, defaultSuffix);
        case 46 /* TIBETAN */:
            return createCounterStyleFromRange(value, 0xf20, 0xf29, true, defaultSuffix);
        case 3 /* DECIMAL */:
        default:
            return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
    }
};

var IGNORE_ATTRIBUTE = 'data-html2canvas-ignore';
var DocumentCloner = /** @class */ (function () {
    function DocumentCloner(context, element, options) {
        this.context = context;
        this.options = options;
        this.scrolledElements = [];
        this.referenceElement = element;
        this.counters = new CounterState();
        this.quoteDepth = 0;
        if (!element.ownerDocument) {
            throw new Error('Cloned element does not have an owner document');
        }
        this.documentElement = this.cloneNode(element.ownerDocument.documentElement, false);
    }
    DocumentCloner.prototype.toIFrame = function (ownerDocument, windowSize) {
        var _this = this;
        var iframe = createIFrameContainer(ownerDocument, windowSize);
        if (!iframe.contentWindow) {
            return Promise.reject("Unable to find iframe window");
        }
        var scrollX = ownerDocument.defaultView.pageXOffset;
        var scrollY = ownerDocument.defaultView.pageYOffset;
        var cloneWindow = iframe.contentWindow;
        var documentClone = cloneWindow.document;
        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
         if window url is about:blank, we can assign the url to current by writing onto the document
         */
        var iframeLoad = iframeLoader(iframe).then(function () { return __awaiter(_this, void 0, void 0, function () {
            var onclone, referenceElement;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.scrolledElements.forEach(restoreNodeScroll);
                        if (cloneWindow) {
                            cloneWindow.scrollTo(windowSize.left, windowSize.top);
                            if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) &&
                                (cloneWindow.scrollY !== windowSize.top || cloneWindow.scrollX !== windowSize.left)) {
                                this.context.logger.warn('Unable to restore scroll position for cloned document');
                                this.context.windowBounds = this.context.windowBounds.add(cloneWindow.scrollX - windowSize.left, cloneWindow.scrollY - windowSize.top, 0, 0);
                            }
                        }
                        onclone = this.options.onclone;
                        referenceElement = this.clonedReferenceElement;
                        if (typeof referenceElement === 'undefined') {
                            return [2 /*return*/, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")];
                        }
                        if (!(documentClone.fonts && documentClone.fonts.ready)) return [3 /*break*/, 2];
                        return [4 /*yield*/, documentClone.fonts.ready];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!/(AppleWebKit)/g.test(navigator.userAgent)) return [3 /*break*/, 4];
                        return [4 /*yield*/, imagesReady(documentClone)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (typeof onclone === 'function') {
                            return [2 /*return*/, Promise.resolve()
                                    .then(function () { return onclone(documentClone, referenceElement); })
                                    .then(function () { return iframe; })];
                        }
                        return [2 /*return*/, iframe];
                }
            });
        }); });
        documentClone.open();
        documentClone.write(serializeDoctype(document.doctype) + "<html></html>");
        // Chrome scrolls the parent document for some reason after the write to the cloned window???
        restoreOwnerScroll(this.referenceElement.ownerDocument, scrollX, scrollY);
        documentClone.replaceChild(documentClone.adoptNode(this.documentElement), documentClone.documentElement);
        documentClone.close();
        return iframeLoad;
    };
    DocumentCloner.prototype.createElementClone = function (node) {
        if (isDebugging(node, 2 /* CLONE */)) {
            debugger;
        }
        if (isCanvasElement(node)) {
            return this.createCanvasClone(node);
        }
        if (isVideoElement(node)) {
            return this.createVideoClone(node);
        }
        if (isStyleElement(node)) {
            return this.createStyleClone(node);
        }
        var clone = node.cloneNode(false);
        if (isImageElement(clone)) {
            if (isImageElement(node) && node.currentSrc && node.currentSrc !== node.src) {
                clone.src = node.currentSrc;
                clone.srcset = '';
            }
            if (clone.loading === 'lazy') {
                clone.loading = 'eager';
            }
        }
        if (isCustomElement(clone)) {
            return this.createCustomElementClone(clone);
        }
        return clone;
    };
    DocumentCloner.prototype.createCustomElementClone = function (node) {
        var clone = document.createElement('html2canvascustomelement');
        copyCSSStyles(node.style, clone);
        return clone;
    };
    DocumentCloner.prototype.createStyleClone = function (node) {
        try {
            var sheet = node.sheet;
            if (sheet && sheet.cssRules) {
                var css = [].slice.call(sheet.cssRules, 0).reduce(function (css, rule) {
                    if (rule && typeof rule.cssText === 'string') {
                        return css + rule.cssText;
                    }
                    return css;
                }, '');
                var style = node.cloneNode(false);
                style.textContent = css;
                return style;
            }
        }
        catch (e) {
            // accessing node.sheet.cssRules throws a DOMException
            this.context.logger.error('Unable to access cssRules property', e);
            if (e.name !== 'SecurityError') {
                throw e;
            }
        }
        return node.cloneNode(false);
    };
    DocumentCloner.prototype.createCanvasClone = function (canvas) {
        var _a;
        if (this.options.inlineImages && canvas.ownerDocument) {
            var img = canvas.ownerDocument.createElement('img');
            try {
                img.src = canvas.toDataURL();
                return img;
            }
            catch (e) {
                this.context.logger.info("Unable to inline canvas contents, canvas is tainted", canvas);
            }
        }
        var clonedCanvas = canvas.cloneNode(false);
        try {
            clonedCanvas.width = canvas.width;
            clonedCanvas.height = canvas.height;
            var ctx = canvas.getContext('2d');
            var clonedCtx = clonedCanvas.getContext('2d');
            if (clonedCtx) {
                if (!this.options.allowTaint && ctx) {
                    clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                }
                else {
                    var gl = (_a = canvas.getContext('webgl2')) !== null && _a !== void 0 ? _a : canvas.getContext('webgl');
                    if (gl) {
                        var attribs = gl.getContextAttributes();
                        if ((attribs === null || attribs === void 0 ? void 0 : attribs.preserveDrawingBuffer) === false) {
                            this.context.logger.warn('Unable to clone WebGL context as it has preserveDrawingBuffer=false', canvas);
                        }
                    }
                    clonedCtx.drawImage(canvas, 0, 0);
                }
            }
            return clonedCanvas;
        }
        catch (e) {
            this.context.logger.info("Unable to clone canvas as it is tainted", canvas);
        }
        return clonedCanvas;
    };
    DocumentCloner.prototype.createVideoClone = function (video) {
        var canvas = video.ownerDocument.createElement('canvas');
        canvas.width = video.offsetWidth;
        canvas.height = video.offsetHeight;
        var ctx = canvas.getContext('2d');
        try {
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                if (!this.options.allowTaint) {
                    ctx.getImageData(0, 0, canvas.width, canvas.height);
                }
            }
            return canvas;
        }
        catch (e) {
            this.context.logger.info("Unable to clone video as it is tainted", video);
        }
        var blankCanvas = video.ownerDocument.createElement('canvas');
        blankCanvas.width = video.offsetWidth;
        blankCanvas.height = video.offsetHeight;
        return blankCanvas;
    };
    DocumentCloner.prototype.appendChildNode = function (clone, child, copyStyles) {
        if (!isElementNode(child) ||
            (!isScriptElement(child) &&
                !child.hasAttribute(IGNORE_ATTRIBUTE) &&
                (typeof this.options.ignoreElements !== 'function' || !this.options.ignoreElements(child)))) {
            if (!this.options.copyStyles || !isElementNode(child) || !isStyleElement(child)) {
                clone.appendChild(this.cloneNode(child, copyStyles));
            }
        }
    };
    DocumentCloner.prototype.cloneChildNodes = function (node, clone, copyStyles) {
        var _this = this;
        for (var child = node.shadowRoot ? node.shadowRoot.firstChild : node.firstChild; child; child = child.nextSibling) {
            if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === 'function') {
                var assignedNodes = child.assignedNodes();
                if (assignedNodes.length) {
                    assignedNodes.forEach(function (assignedNode) { return _this.appendChildNode(clone, assignedNode, copyStyles); });
                }
            }
            else {
                this.appendChildNode(clone, child, copyStyles);
            }
        }
    };
    DocumentCloner.prototype.cloneNode = function (node, copyStyles) {
        if (isTextNode(node)) {
            return document.createTextNode(node.data);
        }
        if (!node.ownerDocument) {
            return node.cloneNode(false);
        }
        var window = node.ownerDocument.defaultView;
        if (window && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
            var clone = this.createElementClone(node);
            clone.style.transitionProperty = 'none';
            var style = window.getComputedStyle(node);
            var styleBefore = window.getComputedStyle(node, ':before');
            var styleAfter = window.getComputedStyle(node, ':after');
            if (this.referenceElement === node && isHTMLElementNode(clone)) {
                this.clonedReferenceElement = clone;
            }
            if (isBodyElement(clone)) {
                createPseudoHideStyles(clone);
            }
            var counters = this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
            var before = this.resolvePseudoContent(node, clone, styleBefore, PseudoElementType.BEFORE);
            if (isCustomElement(node)) {
                copyStyles = true;
            }
            if (!isVideoElement(node)) {
                this.cloneChildNodes(node, clone, copyStyles);
            }
            if (before) {
                clone.insertBefore(before, clone.firstChild);
            }
            var after = this.resolvePseudoContent(node, clone, styleAfter, PseudoElementType.AFTER);
            if (after) {
                clone.appendChild(after);
            }
            this.counters.pop(counters);
            if ((style && (this.options.copyStyles || isSVGElementNode(node)) && !isIFrameElement(node)) ||
                copyStyles) {
                copyCSSStyles(style, clone);
            }
            if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
                this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
            }
            if ((isTextareaElement(node) || isSelectElement(node)) &&
                (isTextareaElement(clone) || isSelectElement(clone))) {
                clone.value = node.value;
            }
            return clone;
        }
        return node.cloneNode(false);
    };
    DocumentCloner.prototype.resolvePseudoContent = function (node, clone, style, pseudoElt) {
        var _this = this;
        if (!style) {
            return;
        }
        var value = style.content;
        var document = clone.ownerDocument;
        if (!document || !value || value === 'none' || value === '-moz-alt-content' || style.display === 'none') {
            return;
        }
        this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
        var declaration = new CSSParsedPseudoDeclaration(this.context, style);
        var anonymousReplacedElement = document.createElement('html2canvaspseudoelement');
        copyCSSStyles(style, anonymousReplacedElement);
        declaration.content.forEach(function (token) {
            if (token.type === 0 /* STRING_TOKEN */) {
                anonymousReplacedElement.appendChild(document.createTextNode(token.value));
            }
            else if (token.type === 22 /* URL_TOKEN */) {
                var img = document.createElement('img');
                img.src = token.value;
                img.style.opacity = '1';
                anonymousReplacedElement.appendChild(img);
            }
            else if (token.type === 18 /* FUNCTION */) {
                if (token.name === 'attr') {
                    var attr = token.values.filter(isIdentToken);
                    if (attr.length) {
                        anonymousReplacedElement.appendChild(document.createTextNode(node.getAttribute(attr[0].value) || ''));
                    }
                }
                else if (token.name === 'counter') {
                    var _a = token.values.filter(nonFunctionArgSeparator), counter = _a[0], counterStyle = _a[1];
                    if (counter && isIdentToken(counter)) {
                        var counterState = _this.counters.getCounterValue(counter.value);
                        var counterType = counterStyle && isIdentToken(counterStyle)
                            ? listStyleType.parse(_this.context, counterStyle.value)
                            : 3 /* DECIMAL */;
                        anonymousReplacedElement.appendChild(document.createTextNode(createCounterText(counterState, counterType, false)));
                    }
                }
                else if (token.name === 'counters') {
                    var _b = token.values.filter(nonFunctionArgSeparator), counter = _b[0], delim = _b[1], counterStyle = _b[2];
                    if (counter && isIdentToken(counter)) {
                        var counterStates = _this.counters.getCounterValues(counter.value);
                        var counterType_1 = counterStyle && isIdentToken(counterStyle)
                            ? listStyleType.parse(_this.context, counterStyle.value)
                            : 3 /* DECIMAL */;
                        var separator = delim && delim.type === 0 /* STRING_TOKEN */ ? delim.value : '';
                        var text = counterStates
                            .map(function (value) { return createCounterText(value, counterType_1, false); })
                            .join(separator);
                        anonymousReplacedElement.appendChild(document.createTextNode(text));
                    }
                }
                else ;
            }
            else if (token.type === 20 /* IDENT_TOKEN */) {
                switch (token.value) {
                    case 'open-quote':
                        anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, _this.quoteDepth++, true)));
                        break;
                    case 'close-quote':
                        anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, --_this.quoteDepth, false)));
                        break;
                    default:
                        // safari doesn't parse string tokens correctly because of lack of quotes
                        anonymousReplacedElement.appendChild(document.createTextNode(token.value));
                }
            }
        });
        anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
        var newClassName = pseudoElt === PseudoElementType.BEFORE
            ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE
            : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
        if (isSVGElementNode(clone)) {
            clone.className.baseValue += newClassName;
        }
        else {
            clone.className += newClassName;
        }
        return anonymousReplacedElement;
    };
    DocumentCloner.destroy = function (container) {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
            return true;
        }
        return false;
    };
    return DocumentCloner;
}());
var PseudoElementType;
(function (PseudoElementType) {
    PseudoElementType[PseudoElementType["BEFORE"] = 0] = "BEFORE";
    PseudoElementType[PseudoElementType["AFTER"] = 1] = "AFTER";
})(PseudoElementType || (PseudoElementType = {}));
var createIFrameContainer = function (ownerDocument, bounds) {
    var cloneIframeContainer = ownerDocument.createElement('iframe');
    cloneIframeContainer.className = 'html2canvas-container';
    cloneIframeContainer.style.visibility = 'hidden';
    cloneIframeContainer.style.position = 'fixed';
    cloneIframeContainer.style.left = '-10000px';
    cloneIframeContainer.style.top = '0px';
    cloneIframeContainer.style.border = '0';
    cloneIframeContainer.width = bounds.width.toString();
    cloneIframeContainer.height = bounds.height.toString();
    cloneIframeContainer.scrolling = 'no'; // ios won't scroll without it
    cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, 'true');
    ownerDocument.body.appendChild(cloneIframeContainer);
    return cloneIframeContainer;
};
var imageReady = function (img) {
    return new Promise(function (resolve) {
        if (img.complete) {
            resolve();
            return;
        }
        if (!img.src) {
            resolve();
            return;
        }
        img.onload = resolve;
        img.onerror = resolve;
    });
};
var imagesReady = function (document) {
    return Promise.all([].slice.call(document.images, 0).map(imageReady));
};
var iframeLoader = function (iframe) {
    return new Promise(function (resolve, reject) {
        var cloneWindow = iframe.contentWindow;
        if (!cloneWindow) {
            return reject("No window assigned for iframe");
        }
        var documentClone = cloneWindow.document;
        cloneWindow.onload = iframe.onload = function () {
            cloneWindow.onload = iframe.onload = null;
            var interval = setInterval(function () {
                if (documentClone.body.childNodes.length > 0 && documentClone.readyState === 'complete') {
                    clearInterval(interval);
                    resolve(iframe);
                }
            }, 50);
        };
    });
};
var ignoredStyleProperties = [
    'all',
    'd',
    'content' // Safari shows pseudoelements if content is set
];
var copyCSSStyles = function (style, target) {
    // Edge does not provide value for cssText
    for (var i = style.length - 1; i >= 0; i--) {
        var property = style.item(i);
        if (ignoredStyleProperties.indexOf(property) === -1) {
            target.style.setProperty(property, style.getPropertyValue(property));
        }
    }
    return target;
};
var serializeDoctype = function (doctype) {
    var str = '';
    if (doctype) {
        str += '<!DOCTYPE ';
        if (doctype.name) {
            str += doctype.name;
        }
        if (doctype.internalSubset) {
            str += doctype.internalSubset;
        }
        if (doctype.publicId) {
            str += "\"" + doctype.publicId + "\"";
        }
        if (doctype.systemId) {
            str += "\"" + doctype.systemId + "\"";
        }
        str += '>';
    }
    return str;
};
var restoreOwnerScroll = function (ownerDocument, x, y) {
    if (ownerDocument &&
        ownerDocument.defaultView &&
        (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
        ownerDocument.defaultView.scrollTo(x, y);
    }
};
var restoreNodeScroll = function (_a) {
    var element = _a[0], x = _a[1], y = _a[2];
    element.scrollLeft = x;
    element.scrollTop = y;
};
var PSEUDO_BEFORE = ':before';
var PSEUDO_AFTER = ':after';
var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = '___html2canvas___pseudoelement_before';
var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = '___html2canvas___pseudoelement_after';
var PSEUDO_HIDE_ELEMENT_STYLE = "{\n    content: \"\" !important;\n    display: none !important;\n}";
var createPseudoHideStyles = function (body) {
    createStyles(body, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
};
var createStyles = function (body, styles) {
    var document = body.ownerDocument;
    if (document) {
        var style = document.createElement('style');
        style.textContent = styles;
        body.appendChild(style);
    }
};

var CacheStorage = /** @class */ (function () {
    function CacheStorage() {
    }
    CacheStorage.getOrigin = function (url) {
        var link = CacheStorage._link;
        if (!link) {
            return 'about:blank';
        }
        link.href = url;
        link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
        return link.protocol + link.hostname + link.port;
    };
    CacheStorage.isSameOrigin = function (src) {
        return CacheStorage.getOrigin(src) === CacheStorage._origin;
    };
    CacheStorage.setContext = function (window) {
        CacheStorage._link = window.document.createElement('a');
        CacheStorage._origin = CacheStorage.getOrigin(window.location.href);
    };
    CacheStorage._origin = 'about:blank';
    return CacheStorage;
}());
var Cache = /** @class */ (function () {
    function Cache(context, _options) {
        this.context = context;
        this._options = _options;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._cache = {};
    }
    Cache.prototype.addImage = function (src) {
        var result = Promise.resolve();
        if (this.has(src)) {
            return result;
        }
        if (isBlobImage(src) || isRenderable(src)) {
            (this._cache[src] = this.loadImage(src)).catch(function () {
                // prevent unhandled rejection
            });
            return result;
        }
        return result;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cache.prototype.match = function (src) {
        return this._cache[src];
    };
    Cache.prototype.loadImage = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var isSameOrigin, useCORS, useProxy, src;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isSameOrigin = CacheStorage.isSameOrigin(key);
                        useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
                        useProxy = !isInlineImage(key) &&
                            !isSameOrigin &&
                            !isBlobImage(key) &&
                            typeof this._options.proxy === 'string' &&
                            FEATURES.SUPPORT_CORS_XHR &&
                            !useCORS;
                        if (!isSameOrigin &&
                            this._options.allowTaint === false &&
                            !isInlineImage(key) &&
                            !isBlobImage(key) &&
                            !useProxy &&
                            !useCORS) {
                            return [2 /*return*/];
                        }
                        src = key;
                        if (!useProxy) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.proxy(src)];
                    case 1:
                        src = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.context.logger.debug("Added image " + key.substring(0, 256));
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var img = new Image();
                                img.onload = function () { return resolve(img); };
                                img.onerror = reject;
                                //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
                                if (isInlineBase64Image(src) || useCORS) {
                                    img.crossOrigin = 'anonymous';
                                }
                                img.src = src;
                                if (img.complete === true) {
                                    // Inline XML images may fail to parse, throwing an Error later on
                                    setTimeout(function () { return resolve(img); }, 500);
                                }
                                if (_this._options.imageTimeout > 0) {
                                    setTimeout(function () { return reject("Timed out (" + _this._options.imageTimeout + "ms) loading image"); }, _this._options.imageTimeout);
                                }
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Cache.prototype.has = function (key) {
        return typeof this._cache[key] !== 'undefined';
    };
    Cache.prototype.keys = function () {
        return Promise.resolve(Object.keys(this._cache));
    };
    Cache.prototype.proxy = function (src) {
        var _this = this;
        var proxy = this._options.proxy;
        if (!proxy) {
            throw new Error('No proxy defined');
        }
        var key = src.substring(0, 256);
        return new Promise(function (resolve, reject) {
            var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status === 200) {
                    if (responseType === 'text') {
                        resolve(xhr.response);
                    }
                    else {
                        var reader_1 = new FileReader();
                        reader_1.addEventListener('load', function () { return resolve(reader_1.result); }, false);
                        reader_1.addEventListener('error', function (e) { return reject(e); }, false);
                        reader_1.readAsDataURL(xhr.response);
                    }
                }
                else {
                    reject("Failed to proxy resource " + key + " with status code " + xhr.status);
                }
            };
            xhr.onerror = reject;
            var queryString = proxy.indexOf('?') > -1 ? '&' : '?';
            xhr.open('GET', "" + proxy + queryString + "url=" + encodeURIComponent(src) + "&responseType=" + responseType);
            if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
                xhr.responseType = responseType;
            }
            if (_this._options.imageTimeout) {
                var timeout_1 = _this._options.imageTimeout;
                xhr.timeout = timeout_1;
                xhr.ontimeout = function () { return reject("Timed out (" + timeout_1 + "ms) proxying " + key); };
            }
            xhr.send();
        });
    };
    return Cache;
}());
var INLINE_SVG = /^data:image\/svg\+xml/i;
var INLINE_BASE64 = /^data:image\/.*;base64,/i;
var INLINE_IMG = /^data:image\/.*/i;
var isRenderable = function (src) { return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src); };
var isInlineImage = function (src) { return INLINE_IMG.test(src); };
var isInlineBase64Image = function (src) { return INLINE_BASE64.test(src); };
var isBlobImage = function (src) { return src.substr(0, 4) === 'blob'; };
var isSVG = function (src) { return src.substr(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src); };

var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.type = 0 /* VECTOR */;
        this.x = x;
        this.y = y;
    }
    Vector.prototype.add = function (deltaX, deltaY) {
        return new Vector(this.x + deltaX, this.y + deltaY);
    };
    return Vector;
}());

var lerp = function (a, b, t) {
    return new Vector(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
};
var BezierCurve = /** @class */ (function () {
    function BezierCurve(start, startControl, endControl, end) {
        this.type = 1 /* BEZIER_CURVE */;
        this.start = start;
        this.startControl = startControl;
        this.endControl = endControl;
        this.end = end;
    }
    BezierCurve.prototype.subdivide = function (t, firstHalf) {
        var ab = lerp(this.start, this.startControl, t);
        var bc = lerp(this.startControl, this.endControl, t);
        var cd = lerp(this.endControl, this.end, t);
        var abbc = lerp(ab, bc, t);
        var bccd = lerp(bc, cd, t);
        var dest = lerp(abbc, bccd, t);
        return firstHalf ? new BezierCurve(this.start, ab, abbc, dest) : new BezierCurve(dest, bccd, cd, this.end);
    };
    BezierCurve.prototype.add = function (deltaX, deltaY) {
        return new BezierCurve(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
    };
    BezierCurve.prototype.reverse = function () {
        return new BezierCurve(this.end, this.endControl, this.startControl, this.start);
    };
    return BezierCurve;
}());
var isBezierCurve = function (path) { return path.type === 1 /* BEZIER_CURVE */; };

var BoundCurves = /** @class */ (function () {
    function BoundCurves(element) {
        var styles = element.styles;
        var bounds = element.bounds;
        var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height), tlh = _a[0], tlv = _a[1];
        var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height), trh = _b[0], trv = _b[1];
        var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height), brh = _c[0], brv = _c[1];
        var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height), blh = _d[0], blv = _d[1];
        var factors = [];
        factors.push((tlh + trh) / bounds.width);
        factors.push((blh + brh) / bounds.width);
        factors.push((tlv + blv) / bounds.height);
        factors.push((trv + brv) / bounds.height);
        var maxFactor = Math.max.apply(Math, factors);
        if (maxFactor > 1) {
            tlh /= maxFactor;
            tlv /= maxFactor;
            trh /= maxFactor;
            trv /= maxFactor;
            brh /= maxFactor;
            brv /= maxFactor;
            blh /= maxFactor;
            blv /= maxFactor;
        }
        var topWidth = bounds.width - trh;
        var rightHeight = bounds.height - brv;
        var bottomWidth = bounds.width - brh;
        var leftHeight = bounds.height - blv;
        var borderTopWidth = styles.borderTopWidth;
        var borderRightWidth = styles.borderRightWidth;
        var borderBottomWidth = styles.borderBottomWidth;
        var borderLeftWidth = styles.borderLeftWidth;
        var paddingTop = getAbsoluteValue(styles.paddingTop, element.bounds.width);
        var paddingRight = getAbsoluteValue(styles.paddingRight, element.bounds.width);
        var paddingBottom = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
        var paddingLeft = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
        this.topLeftBorderDoubleOuterBox =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left + borderLeftWidth / 3, bounds.top + borderTopWidth / 3, tlh - borderLeftWidth / 3, tlv - borderTopWidth / 3, CORNER.TOP_LEFT)
                : new Vector(bounds.left + borderLeftWidth / 3, bounds.top + borderTopWidth / 3);
        this.topRightBorderDoubleOuterBox =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth / 3, trh - borderRightWidth / 3, trv - borderTopWidth / 3, CORNER.TOP_RIGHT)
                : new Vector(bounds.left + bounds.width - borderRightWidth / 3, bounds.top + borderTopWidth / 3);
        this.bottomRightBorderDoubleOuterBox =
            brh > 0 || brv > 0
                ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth / 3, brv - borderBottomWidth / 3, CORNER.BOTTOM_RIGHT)
                : new Vector(bounds.left + bounds.width - borderRightWidth / 3, bounds.top + bounds.height - borderBottomWidth / 3);
        this.bottomLeftBorderDoubleOuterBox =
            blh > 0 || blv > 0
                ? getCurvePoints(bounds.left + borderLeftWidth / 3, bounds.top + leftHeight, blh - borderLeftWidth / 3, blv - borderBottomWidth / 3, CORNER.BOTTOM_LEFT)
                : new Vector(bounds.left + borderLeftWidth / 3, bounds.top + bounds.height - borderBottomWidth / 3);
        this.topLeftBorderDoubleInnerBox =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3, tlh - (borderLeftWidth * 2) / 3, tlv - (borderTopWidth * 2) / 3, CORNER.TOP_LEFT)
                : new Vector(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3);
        this.topRightBorderDoubleInnerBox =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left + topWidth, bounds.top + (borderTopWidth * 2) / 3, trh - (borderRightWidth * 2) / 3, trv - (borderTopWidth * 2) / 3, CORNER.TOP_RIGHT)
                : new Vector(bounds.left + bounds.width - (borderRightWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3);
        this.bottomRightBorderDoubleInnerBox =
            brh > 0 || brv > 0
                ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - (borderRightWidth * 2) / 3, brv - (borderBottomWidth * 2) / 3, CORNER.BOTTOM_RIGHT)
                : new Vector(bounds.left + bounds.width - (borderRightWidth * 2) / 3, bounds.top + bounds.height - (borderBottomWidth * 2) / 3);
        this.bottomLeftBorderDoubleInnerBox =
            blh > 0 || blv > 0
                ? getCurvePoints(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + leftHeight, blh - (borderLeftWidth * 2) / 3, blv - (borderBottomWidth * 2) / 3, CORNER.BOTTOM_LEFT)
                : new Vector(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + bounds.height - (borderBottomWidth * 2) / 3);
        this.topLeftBorderStroke =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left + borderLeftWidth / 2, bounds.top + borderTopWidth / 2, tlh - borderLeftWidth / 2, tlv - borderTopWidth / 2, CORNER.TOP_LEFT)
                : new Vector(bounds.left + borderLeftWidth / 2, bounds.top + borderTopWidth / 2);
        this.topRightBorderStroke =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth / 2, trh - borderRightWidth / 2, trv - borderTopWidth / 2, CORNER.TOP_RIGHT)
                : new Vector(bounds.left + bounds.width - borderRightWidth / 2, bounds.top + borderTopWidth / 2);
        this.bottomRightBorderStroke =
            brh > 0 || brv > 0
                ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth / 2, brv - borderBottomWidth / 2, CORNER.BOTTOM_RIGHT)
                : new Vector(bounds.left + bounds.width - borderRightWidth / 2, bounds.top + bounds.height - borderBottomWidth / 2);
        this.bottomLeftBorderStroke =
            blh > 0 || blv > 0
                ? getCurvePoints(bounds.left + borderLeftWidth / 2, bounds.top + leftHeight, blh - borderLeftWidth / 2, blv - borderBottomWidth / 2, CORNER.BOTTOM_LEFT)
                : new Vector(bounds.left + borderLeftWidth / 2, bounds.top + bounds.height - borderBottomWidth / 2);
        this.topLeftBorderBox =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT)
                : new Vector(bounds.left, bounds.top);
        this.topRightBorderBox =
            trh > 0 || trv > 0
                ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT)
                : new Vector(bounds.left + bounds.width, bounds.top);
        this.bottomRightBorderBox =
            brh > 0 || brv > 0
                ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT)
                : new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
        this.bottomLeftBorderBox =
            blh > 0 || blv > 0
                ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT)
                : new Vector(bounds.left, bounds.top + bounds.height);
        this.topLeftPaddingBox =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left + borderLeftWidth, bounds.top + borderTopWidth, Math.max(0, tlh - borderLeftWidth), Math.max(0, tlv - borderTopWidth), CORNER.TOP_LEFT)
                : new Vector(bounds.left + borderLeftWidth, bounds.top + borderTopWidth);
        this.topRightPaddingBox =
            trh > 0 || trv > 0
                ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width - borderRightWidth), bounds.top + borderTopWidth, topWidth > bounds.width + borderRightWidth ? 0 : Math.max(0, trh - borderRightWidth), Math.max(0, trv - borderTopWidth), CORNER.TOP_RIGHT)
                : new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + borderTopWidth);
        this.bottomRightPaddingBox =
            brh > 0 || brv > 0
                ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth), bounds.top + Math.min(rightHeight, bounds.height - borderBottomWidth), Math.max(0, brh - borderRightWidth), Math.max(0, brv - borderBottomWidth), CORNER.BOTTOM_RIGHT)
                : new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + bounds.height - borderBottomWidth);
        this.bottomLeftPaddingBox =
            blh > 0 || blv > 0
                ? getCurvePoints(bounds.left + borderLeftWidth, bounds.top + Math.min(leftHeight, bounds.height - borderBottomWidth), Math.max(0, blh - borderLeftWidth), Math.max(0, blv - borderBottomWidth), CORNER.BOTTOM_LEFT)
                : new Vector(bounds.left + borderLeftWidth, bounds.top + bounds.height - borderBottomWidth);
        this.topLeftContentBox =
            tlh > 0 || tlv > 0
                ? getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop, Math.max(0, tlh - (borderLeftWidth + paddingLeft)), Math.max(0, tlv - (borderTopWidth + paddingTop)), CORNER.TOP_LEFT)
                : new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop);
        this.topRightContentBox =
            trh > 0 || trv > 0
                ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth + paddingLeft), bounds.top + borderTopWidth + paddingTop, topWidth > bounds.width + borderLeftWidth + paddingLeft ? 0 : trh - borderLeftWidth + paddingLeft, trv - (borderTopWidth + paddingTop), CORNER.TOP_RIGHT)
                : new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + borderTopWidth + paddingTop);
        this.bottomRightContentBox =
            brh > 0 || brv > 0
                ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth + paddingLeft)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth + paddingTop), Math.max(0, brh - (borderRightWidth + paddingRight)), brv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_RIGHT)
                : new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
        this.bottomLeftContentBox =
            blh > 0 || blv > 0
                ? getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth + paddingLeft)), blv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_LEFT)
                : new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
    }
    return BoundCurves;
}());
var CORNER;
(function (CORNER) {
    CORNER[CORNER["TOP_LEFT"] = 0] = "TOP_LEFT";
    CORNER[CORNER["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    CORNER[CORNER["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    CORNER[CORNER["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
})(CORNER || (CORNER = {}));
var getCurvePoints = function (x, y, r1, r2, position) {
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    var ox = r1 * kappa; // control point offset horizontal
    var oy = r2 * kappa; // control point offset vertical
    var xm = x + r1; // x-middle
    var ym = y + r2; // y-middle
    switch (position) {
        case CORNER.TOP_LEFT:
            return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
        case CORNER.TOP_RIGHT:
            return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
        case CORNER.BOTTOM_RIGHT:
            return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
        case CORNER.BOTTOM_LEFT:
        default:
            return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));
    }
};
var calculateBorderBoxPath = function (curves) {
    return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
};
var calculateContentBoxPath = function (curves) {
    return [
        curves.topLeftContentBox,
        curves.topRightContentBox,
        curves.bottomRightContentBox,
        curves.bottomLeftContentBox
    ];
};
var calculatePaddingBoxPath = function (curves) {
    return [
        curves.topLeftPaddingBox,
        curves.topRightPaddingBox,
        curves.bottomRightPaddingBox,
        curves.bottomLeftPaddingBox
    ];
};

var TransformEffect = /** @class */ (function () {
    function TransformEffect(offsetX, offsetY, matrix) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.matrix = matrix;
        this.type = 0 /* TRANSFORM */;
        this.target = 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */;
    }
    return TransformEffect;
}());
var ClipEffect = /** @class */ (function () {
    function ClipEffect(path, target) {
        this.path = path;
        this.target = target;
        this.type = 1 /* CLIP */;
    }
    return ClipEffect;
}());
var OpacityEffect = /** @class */ (function () {
    function OpacityEffect(opacity) {
        this.opacity = opacity;
        this.type = 2 /* OPACITY */;
        this.target = 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */;
    }
    return OpacityEffect;
}());
var isTransformEffect = function (effect) {
    return effect.type === 0 /* TRANSFORM */;
};
var isClipEffect = function (effect) { return effect.type === 1 /* CLIP */; };
var isOpacityEffect = function (effect) { return effect.type === 2 /* OPACITY */; };

var equalPath = function (a, b) {
    if (a.length === b.length) {
        return a.some(function (v, i) { return v === b[i]; });
    }
    return false;
};
var transformPath = function (path, deltaX, deltaY, deltaW, deltaH) {
    return path.map(function (point, index) {
        switch (index) {
            case 0:
                return point.add(deltaX, deltaY);
            case 1:
                return point.add(deltaX + deltaW, deltaY);
            case 2:
                return point.add(deltaX + deltaW, deltaY + deltaH);
            case 3:
                return point.add(deltaX, deltaY + deltaH);
        }
        return point;
    });
};

var StackingContext = /** @class */ (function () {
    function StackingContext(container) {
        this.element = container;
        this.inlineLevel = [];
        this.nonInlineLevel = [];
        this.negativeZIndex = [];
        this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
        this.positiveZIndex = [];
        this.nonPositionedFloats = [];
        this.nonPositionedInlineLevel = [];
    }
    return StackingContext;
}());
var ElementPaint = /** @class */ (function () {
    function ElementPaint(container, parent) {
        this.container = container;
        this.parent = parent;
        this.effects = [];
        this.curves = new BoundCurves(this.container);
        if (this.container.styles.opacity < 1) {
            this.effects.push(new OpacityEffect(this.container.styles.opacity));
        }
        if (this.container.styles.transform !== null) {
            var offsetX = this.container.bounds.left + this.container.styles.transformOrigin[0].number;
            var offsetY = this.container.bounds.top + this.container.styles.transformOrigin[1].number;
            var matrix = this.container.styles.transform;
            this.effects.push(new TransformEffect(offsetX, offsetY, matrix));
        }
        if (this.container.styles.overflowX !== 0 /* VISIBLE */) {
            var borderBox = calculateBorderBoxPath(this.curves);
            var paddingBox = calculatePaddingBoxPath(this.curves);
            if (equalPath(borderBox, paddingBox)) {
                this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
            }
            else {
                this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */));
                this.effects.push(new ClipEffect(paddingBox, 4 /* CONTENT */));
            }
        }
    }
    ElementPaint.prototype.getEffects = function (target) {
        var inFlow = [2 /* ABSOLUTE */, 3 /* FIXED */].indexOf(this.container.styles.position) === -1;
        var parent = this.parent;
        var effects = this.effects.slice(0);
        while (parent) {
            var croplessEffects = parent.effects.filter(function (effect) { return !isClipEffect(effect); });
            if (inFlow || parent.container.styles.position !== 0 /* STATIC */ || !parent.parent) {
                effects.unshift.apply(effects, croplessEffects);
                inFlow = [2 /* ABSOLUTE */, 3 /* FIXED */].indexOf(parent.container.styles.position) === -1;
                if (parent.container.styles.overflowX !== 0 /* VISIBLE */) {
                    var borderBox = calculateBorderBoxPath(parent.curves);
                    var paddingBox = calculatePaddingBoxPath(parent.curves);
                    if (!equalPath(borderBox, paddingBox)) {
                        effects.unshift(new ClipEffect(paddingBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
                    }
                }
            }
            else {
                effects.unshift.apply(effects, croplessEffects);
            }
            parent = parent.parent;
        }
        return effects.filter(function (effect) { return contains(effect.target, target); });
    };
    return ElementPaint;
}());
var parseStackTree = function (parent, stackingContext, realStackingContext, listItems) {
    parent.container.elements.forEach(function (child) {
        var treatAsRealStackingContext = contains(child.flags, 4 /* CREATES_REAL_STACKING_CONTEXT */);
        var createsStackingContext = contains(child.flags, 2 /* CREATES_STACKING_CONTEXT */);
        var paintContainer = new ElementPaint(child, parent);
        if (contains(child.styles.display, 2048 /* LIST_ITEM */)) {
            listItems.push(paintContainer);
        }
        var listOwnerItems = contains(child.flags, 8 /* IS_LIST_OWNER */) ? [] : listItems;
        if (treatAsRealStackingContext || createsStackingContext) {
            var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
            var stack = new StackingContext(paintContainer);
            if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
                var order_1 = child.styles.zIndex.order;
                if (order_1 < 0) {
                    var index_1 = 0;
                    parentStack.negativeZIndex.some(function (current, i) {
                        if (order_1 > current.element.container.styles.zIndex.order) {
                            index_1 = i;
                            return false;
                        }
                        else if (index_1 > 0) {
                            return true;
                        }
                        return false;
                    });
                    parentStack.negativeZIndex.splice(index_1, 0, stack);
                }
                else if (order_1 > 0) {
                    var index_2 = 0;
                    parentStack.positiveZIndex.some(function (current, i) {
                        if (order_1 >= current.element.container.styles.zIndex.order) {
                            index_2 = i + 1;
                            return false;
                        }
                        else if (index_2 > 0) {
                            return true;
                        }
                        return false;
                    });
                    parentStack.positiveZIndex.splice(index_2, 0, stack);
                }
                else {
                    parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
                }
            }
            else {
                if (child.styles.isFloating()) {
                    parentStack.nonPositionedFloats.push(stack);
                }
                else {
                    parentStack.nonPositionedInlineLevel.push(stack);
                }
            }
            parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
        }
        else {
            if (child.styles.isInlineLevel()) {
                stackingContext.inlineLevel.push(paintContainer);
            }
            else {
                stackingContext.nonInlineLevel.push(paintContainer);
            }
            parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
        }
        if (contains(child.flags, 8 /* IS_LIST_OWNER */)) {
            processListItems(child, listOwnerItems);
        }
    });
};
var processListItems = function (owner, elements) {
    var numbering = owner instanceof OLElementContainer ? owner.start : 1;
    var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
    for (var i = 0; i < elements.length; i++) {
        var item = elements[i];
        if (item.container instanceof LIElementContainer &&
            typeof item.container.value === 'number' &&
            item.container.value !== 0) {
            numbering = item.container.value;
        }
        item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
        numbering += reversed ? -1 : 1;
    }
};
var parseStackingContexts = function (container) {
    var paintContainer = new ElementPaint(container, null);
    var root = new StackingContext(paintContainer);
    var listItems = [];
    parseStackTree(paintContainer, root, root, listItems);
    processListItems(paintContainer.container, listItems);
    return root;
};

var parsePathForBorder = function (curves, borderSide) {
    switch (borderSide) {
        case 0:
            return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
        case 1:
            return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
        case 2:
            return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
        case 3:
        default:
            return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
    }
};
var parsePathForBorderDoubleOuter = function (curves, borderSide) {
    switch (borderSide) {
        case 0:
            return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox, curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox);
        case 1:
            return createPathFromCurves(curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox, curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox);
        case 2:
            return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox, curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox);
        case 3:
        default:
            return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox, curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox);
    }
};
var parsePathForBorderDoubleInner = function (curves, borderSide) {
    switch (borderSide) {
        case 0:
            return createPathFromCurves(curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox, curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox);
        case 1:
            return createPathFromCurves(curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox, curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox);
        case 2:
            return createPathFromCurves(curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox);
        case 3:
        default:
            return createPathFromCurves(curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox, curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox);
    }
};
var parsePathForBorderStroke = function (curves, borderSide) {
    switch (borderSide) {
        case 0:
            return createStrokePathFromCurves(curves.topLeftBorderStroke, curves.topRightBorderStroke);
        case 1:
            return createStrokePathFromCurves(curves.topRightBorderStroke, curves.bottomRightBorderStroke);
        case 2:
            return createStrokePathFromCurves(curves.bottomRightBorderStroke, curves.bottomLeftBorderStroke);
        case 3:
        default:
            return createStrokePathFromCurves(curves.bottomLeftBorderStroke, curves.topLeftBorderStroke);
    }
};
var createStrokePathFromCurves = function (outer1, outer2) {
    var path = [];
    if (isBezierCurve(outer1)) {
        path.push(outer1.subdivide(0.5, false));
    }
    else {
        path.push(outer1);
    }
    if (isBezierCurve(outer2)) {
        path.push(outer2.subdivide(0.5, true));
    }
    else {
        path.push(outer2);
    }
    return path;
};
var createPathFromCurves = function (outer1, inner1, outer2, inner2) {
    var path = [];
    if (isBezierCurve(outer1)) {
        path.push(outer1.subdivide(0.5, false));
    }
    else {
        path.push(outer1);
    }
    if (isBezierCurve(outer2)) {
        path.push(outer2.subdivide(0.5, true));
    }
    else {
        path.push(outer2);
    }
    if (isBezierCurve(inner2)) {
        path.push(inner2.subdivide(0.5, true).reverse());
    }
    else {
        path.push(inner2);
    }
    if (isBezierCurve(inner1)) {
        path.push(inner1.subdivide(0.5, false).reverse());
    }
    else {
        path.push(inner1);
    }
    return path;
};

var paddingBox = function (element) {
    var bounds = element.bounds;
    var styles = element.styles;
    return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
};
var contentBox = function (element) {
    var styles = element.styles;
    var bounds = element.bounds;
    var paddingLeft = getAbsoluteValue(styles.paddingLeft, bounds.width);
    var paddingRight = getAbsoluteValue(styles.paddingRight, bounds.width);
    var paddingTop = getAbsoluteValue(styles.paddingTop, bounds.width);
    var paddingBottom = getAbsoluteValue(styles.paddingBottom, bounds.width);
    return bounds.add(paddingLeft + styles.borderLeftWidth, paddingTop + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft + paddingRight), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop + paddingBottom));
};

var calculateBackgroundPositioningArea = function (backgroundOrigin, element) {
    if (backgroundOrigin === 0 /* BORDER_BOX */) {
        return element.bounds;
    }
    if (backgroundOrigin === 2 /* CONTENT_BOX */) {
        return contentBox(element);
    }
    return paddingBox(element);
};
var calculateBackgroundPaintingArea = function (backgroundClip, element) {
    if (backgroundClip === 0 /* BORDER_BOX */) {
        return element.bounds;
    }
    if (backgroundClip === 2 /* CONTENT_BOX */) {
        return contentBox(element);
    }
    return paddingBox(element);
};
var calculateBackgroundRendering = function (container, index, intrinsicSize) {
    var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index), container);
    var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index), container);
    var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index), intrinsicSize, backgroundPositioningArea);
    var sizeWidth = backgroundImageSize[0], sizeHeight = backgroundImageSize[1];
    var position = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
    var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index), position, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
    var offsetX = Math.round(backgroundPositioningArea.left + position[0]);
    var offsetY = Math.round(backgroundPositioningArea.top + position[1]);
    return [path, offsetX, offsetY, sizeWidth, sizeHeight];
};
var isAuto = function (token) { return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO; };
var hasIntrinsicValue = function (value) { return typeof value === 'number'; };
var calculateBackgroundSize = function (size, _a, bounds) {
    var intrinsicWidth = _a[0], intrinsicHeight = _a[1], intrinsicProportion = _a[2];
    var first = size[0], second = size[1];
    if (!first) {
        return [0, 0];
    }
    if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
        return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
    }
    var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
    if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
        if (hasIntrinsicValue(intrinsicProportion)) {
            var targetRatio = bounds.width / bounds.height;
            return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER)
                ? [bounds.width, bounds.width / intrinsicProportion]
                : [bounds.height * intrinsicProportion, bounds.height];
        }
        return [bounds.width, bounds.height];
    }
    var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
    var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
    var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
    // If the background-size is auto or auto auto:
    if (isAuto(first) && (!second || isAuto(second))) {
        // If the image has both horizontal and vertical intrinsic dimensions, it's rendered at that size.
        if (hasIntrinsicWidth && hasIntrinsicHeight) {
            return [intrinsicWidth, intrinsicHeight];
        }
        // If the image has no intrinsic dimensions and has no intrinsic proportions,
        // it's rendered at the size of the background positioning area.
        if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
            return [bounds.width, bounds.height];
        }
        // TODO If the image has no intrinsic dimensions but has intrinsic proportions, it's rendered as if contain had been specified instead.
        // If the image has only one intrinsic dimension and has intrinsic proportions, it's rendered at the size corresponding to that one dimension.
        // The other dimension is computed using the specified dimension and the intrinsic proportions.
        if (hasIntrinsicDimensions && hasIntrinsicProportion) {
            var width_1 = hasIntrinsicWidth
                ? intrinsicWidth
                : intrinsicHeight * intrinsicProportion;
            var height_1 = hasIntrinsicHeight
                ? intrinsicHeight
                : intrinsicWidth / intrinsicProportion;
            return [width_1, height_1];
        }
        // If the image has only one intrinsic dimension but has no intrinsic proportions,
        // it's rendered using the specified dimension and the other dimension of the background positioning area.
        var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
        var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
        return [width_2, height_2];
    }
    // If the image has intrinsic proportions, it's stretched to the specified dimension.
    // The unspecified dimension is computed using the specified dimension and the intrinsic proportions.
    if (hasIntrinsicProportion) {
        var width_3 = 0;
        var height_3 = 0;
        if (isLengthPercentage(first)) {
            width_3 = getAbsoluteValue(first, bounds.width);
        }
        else if (isLengthPercentage(second)) {
            height_3 = getAbsoluteValue(second, bounds.height);
        }
        if (isAuto(first)) {
            width_3 = height_3 * intrinsicProportion;
        }
        else if (!second || isAuto(second)) {
            height_3 = width_3 / intrinsicProportion;
        }
        return [width_3, height_3];
    }
    // If the image has no intrinsic proportions, it's stretched to the specified dimension.
    // The unspecified dimension is computed using the image's corresponding intrinsic dimension,
    // if there is one. If there is no such intrinsic dimension,
    // it becomes the corresponding dimension of the background positioning area.
    var width = null;
    var height = null;
    if (isLengthPercentage(first)) {
        width = getAbsoluteValue(first, bounds.width);
    }
    else if (second && isLengthPercentage(second)) {
        height = getAbsoluteValue(second, bounds.height);
    }
    if (width !== null && (!second || isAuto(second))) {
        height =
            hasIntrinsicWidth && hasIntrinsicHeight
                ? (width / intrinsicWidth) * intrinsicHeight
                : bounds.height;
    }
    if (height !== null && isAuto(first)) {
        width =
            hasIntrinsicWidth && hasIntrinsicHeight
                ? (height / intrinsicHeight) * intrinsicWidth
                : bounds.width;
    }
    if (width !== null && height !== null) {
        return [width, height];
    }
    throw new Error("Unable to calculate background-size for element");
};
var getBackgroundValueForIndex = function (values, index) {
    var value = values[index];
    if (typeof value === 'undefined') {
        return values[0];
    }
    return value;
};
var calculateBackgroundRepeatPath = function (repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
    var x = _a[0], y = _a[1];
    var width = _b[0], height = _b[1];
    switch (repeat) {
        case 2 /* REPEAT_X */:
            return [
                new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))
            ];
        case 3 /* REPEAT_Y */:
            return [
                new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
                new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
                new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
                new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))
            ];
        case 1 /* NO_REPEAT */:
            return [
                new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
                new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))
            ];
        default:
            return [
                new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
                new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
                new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
                new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))
            ];
    }
};

var SMALL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

var SAMPLE_TEXT = 'Hidden Text';
var FontMetrics = /** @class */ (function () {
    function FontMetrics(document) {
        this._data = {};
        this._document = document;
    }
    FontMetrics.prototype.parseMetrics = function (fontFamily, fontSize) {
        var container = this._document.createElement('div');
        var img = this._document.createElement('img');
        var span = this._document.createElement('span');
        var body = this._document.body;
        container.style.visibility = 'hidden';
        container.style.fontFamily = fontFamily;
        container.style.fontSize = fontSize;
        container.style.margin = '0';
        container.style.padding = '0';
        container.style.whiteSpace = 'nowrap';
        body.appendChild(container);
        img.src = SMALL_IMAGE;
        img.width = 1;
        img.height = 1;
        img.style.margin = '0';
        img.style.padding = '0';
        img.style.verticalAlign = 'baseline';
        span.style.fontFamily = fontFamily;
        span.style.fontSize = fontSize;
        span.style.margin = '0';
        span.style.padding = '0';
        span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
        container.appendChild(span);
        container.appendChild(img);
        var baseline = img.offsetTop - span.offsetTop + 2;
        container.removeChild(span);
        container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
        container.style.lineHeight = 'normal';
        img.style.verticalAlign = 'super';
        var middle = img.offsetTop - container.offsetTop + 2;
        body.removeChild(container);
        return { baseline: baseline, middle: middle };
    };
    FontMetrics.prototype.getMetrics = function (fontFamily, fontSize) {
        var key = fontFamily + " " + fontSize;
        if (typeof this._data[key] === 'undefined') {
            this._data[key] = this.parseMetrics(fontFamily, fontSize);
        }
        return this._data[key];
    };
    return FontMetrics;
}());

var Renderer = /** @class */ (function () {
    function Renderer(context, options) {
        this.context = context;
        this.options = options;
    }
    return Renderer;
}());

var MASK_OFFSET = 10000;
var CanvasRenderer = /** @class */ (function (_super) {
    __extends(CanvasRenderer, _super);
    function CanvasRenderer(context, options) {
        var _this = _super.call(this, context, options) || this;
        _this._activeEffects = [];
        _this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
        _this.ctx = _this.canvas.getContext('2d');
        if (!options.canvas) {
            _this.canvas.width = Math.floor(options.width * options.scale);
            _this.canvas.height = Math.floor(options.height * options.scale);
            _this.canvas.style.width = options.width + "px";
            _this.canvas.style.height = options.height + "px";
        }
        _this.fontMetrics = new FontMetrics(document);
        _this.ctx.scale(_this.options.scale, _this.options.scale);
        _this.ctx.translate(-options.x, -options.y);
        _this.ctx.textBaseline = 'bottom';
        _this._activeEffects = [];
        _this.context.logger.debug("Canvas renderer initialized (" + options.width + "x" + options.height + ") with scale " + options.scale);
        return _this;
    }
    CanvasRenderer.prototype.applyEffects = function (effects) {
        var _this = this;
        while (this._activeEffects.length) {
            this.popEffect();
        }
        effects.forEach(function (effect) { return _this.applyEffect(effect); });
    };
    CanvasRenderer.prototype.applyEffect = function (effect) {
        this.ctx.save();
        if (isOpacityEffect(effect)) {
            this.ctx.globalAlpha = effect.opacity;
        }
        if (isTransformEffect(effect)) {
            this.ctx.translate(effect.offsetX, effect.offsetY);
            this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
            this.ctx.translate(-effect.offsetX, -effect.offsetY);
        }
        if (isClipEffect(effect)) {
            this.path(effect.path);
            this.ctx.clip();
        }
        this._activeEffects.push(effect);
    };
    CanvasRenderer.prototype.popEffect = function () {
        this._activeEffects.pop();
        this.ctx.restore();
    };
    CanvasRenderer.prototype.renderStack = function (stack) {
        return __awaiter(this, void 0, void 0, function () {
            var styles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        styles = stack.element.container.styles;
                        if (!styles.isVisible()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.renderStackContent(stack)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CanvasRenderer.prototype.renderNode = function (paint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (contains(paint.container.flags, 16 /* DEBUG_RENDER */)) {
                            debugger;
                        }
                        if (!paint.container.styles.isVisible()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.renderNodeBackgroundAndBorders(paint)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.renderNodeContent(paint)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CanvasRenderer.prototype.renderTextWithLetterSpacing = function (text, letterSpacing, baseline) {
        var _this = this;
        if (letterSpacing === 0) {
            this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + baseline);
        }
        else {
            var letters = segmentGraphemes(text.text);
            letters.reduce(function (left, letter) {
                _this.ctx.fillText(letter, left, text.bounds.top + baseline);
                return left + _this.ctx.measureText(letter).width;
            }, text.bounds.left);
        }
    };
    CanvasRenderer.prototype.createFontStyle = function (styles) {
        var fontVariant = styles.fontVariant
            .filter(function (variant) { return variant === 'normal' || variant === 'small-caps'; })
            .join('');
        var fontFamily = fixIOSSystemFonts(styles.fontFamily).join(', ');
        var fontSize = isDimensionToken(styles.fontSize)
            ? "" + styles.fontSize.number + styles.fontSize.unit
            : styles.fontSize.number + "px";
        return [
            [styles.fontStyle, fontVariant, styles.fontWeight, fontSize, fontFamily].join(' '),
            fontFamily,
            fontSize
        ];
    };
    CanvasRenderer.prototype.renderTextNode = function (text, styles) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, font, fontFamily, fontSize, _b, baseline, middle, paintOrder;
            var _this = this;
            return __generator(this, function (_c) {
                _a = this.createFontStyle(styles), font = _a[0], fontFamily = _a[1], fontSize = _a[2];
                this.ctx.font = font;
                this.ctx.direction = styles.direction === 1 /* RTL */ ? 'rtl' : 'ltr';
                this.ctx.textAlign = 'left';
                this.ctx.textBaseline = 'alphabetic';
                _b = this.fontMetrics.getMetrics(fontFamily, fontSize), baseline = _b.baseline, middle = _b.middle;
                paintOrder = styles.paintOrder;
                text.textBounds.forEach(function (text) {
                    paintOrder.forEach(function (paintOrderLayer) {
                        switch (paintOrderLayer) {
                            case 0 /* FILL */:
                                _this.ctx.fillStyle = asString(styles.color);
                                _this.renderTextWithLetterSpacing(text, styles.letterSpacing, baseline);
                                var textShadows = styles.textShadow;
                                if (textShadows.length && text.text.trim().length) {
                                    textShadows
                                        .slice(0)
                                        .reverse()
                                        .forEach(function (textShadow) {
                                        _this.ctx.shadowColor = asString(textShadow.color);
                                        _this.ctx.shadowOffsetX = textShadow.offsetX.number * _this.options.scale;
                                        _this.ctx.shadowOffsetY = textShadow.offsetY.number * _this.options.scale;
                                        _this.ctx.shadowBlur = textShadow.blur.number;
                                        _this.renderTextWithLetterSpacing(text, styles.letterSpacing, baseline);
                                    });
                                    _this.ctx.shadowColor = '';
                                    _this.ctx.shadowOffsetX = 0;
                                    _this.ctx.shadowOffsetY = 0;
                                    _this.ctx.shadowBlur = 0;
                                }
                                if (styles.textDecorationLine.length) {
                                    _this.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
                                    styles.textDecorationLine.forEach(function (textDecorationLine) {
                                        switch (textDecorationLine) {
                                            case 1 /* UNDERLINE */:
                                                // Draws a line at the baseline of the font
                                                // TODO As some browsers display the line as more than 1px if the font-size is big,
                                                // need to take that into account both in position and size
                                                _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top + baseline), text.bounds.width, 1);
                                                break;
                                            case 2 /* OVERLINE */:
                                                _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top), text.bounds.width, 1);
                                                break;
                                            case 3 /* LINE_THROUGH */:
                                                // TODO try and find exact position for line-through
                                                _this.ctx.fillRect(text.bounds.left, Math.ceil(text.bounds.top + middle), text.bounds.width, 1);
                                                break;
                                        }
                                    });
                                }
                                break;
                            case 1 /* STROKE */:
                                if (styles.webkitTextStrokeWidth && text.text.trim().length) {
                                    _this.ctx.strokeStyle = asString(styles.webkitTextStrokeColor);
                                    _this.ctx.lineWidth = styles.webkitTextStrokeWidth;
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    _this.ctx.lineJoin = !!window.chrome ? 'miter' : 'round';
                                    _this.ctx.strokeText(text.text, text.bounds.left, text.bounds.top + baseline);
                                }
                                _this.ctx.strokeStyle = '';
                                _this.ctx.lineWidth = 0;
                                _this.ctx.lineJoin = 'miter';
                                break;
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    CanvasRenderer.prototype.renderReplacedElement = function (container, curves, image) {
        if (image && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
            var box = contentBox(container);
            var path = calculatePaddingBoxPath(curves);
            this.path(path);
            this.ctx.save();
            this.ctx.clip();
            this.ctx.drawImage(image, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
            this.ctx.restore();
        }
    };
    CanvasRenderer.prototype.renderNodeContent = function (paint) {
        return __awaiter(this, void 0, void 0, function () {
            var container, curves, styles, _i, _a, child, image, image, iframeRenderer, canvas, size, _b, fontFamily, fontSize, baseline, bounds, x, textBounds, img, image, url, fontFamily, bounds;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.applyEffects(paint.getEffects(4 /* CONTENT */));
                        container = paint.container;
                        curves = paint.curves;
                        styles = container.styles;
                        _i = 0, _a = container.textNodes;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        child = _a[_i];
                        return [4 /*yield*/, this.renderTextNode(child, styles)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!(container instanceof ImageElementContainer)) return [3 /*break*/, 8];
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.context.cache.match(container.src)];
                    case 6:
                        image = _c.sent();
                        this.renderReplacedElement(container, curves, image);
                        return [3 /*break*/, 8];
                    case 7:
                        _c.sent();
                        this.context.logger.error("Error loading image " + container.src);
                        return [3 /*break*/, 8];
                    case 8:
                        if (container instanceof CanvasElementContainer) {
                            this.renderReplacedElement(container, curves, container.canvas);
                        }
                        if (!(container instanceof SVGElementContainer)) return [3 /*break*/, 12];
                        _c.label = 9;
                    case 9:
                        _c.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.context.cache.match(container.svg)];
                    case 10:
                        image = _c.sent();
                        this.renderReplacedElement(container, curves, image);
                        return [3 /*break*/, 12];
                    case 11:
                        _c.sent();
                        this.context.logger.error("Error loading svg " + container.svg.substring(0, 255));
                        return [3 /*break*/, 12];
                    case 12:
                        if (!(container instanceof IFrameElementContainer && container.tree)) return [3 /*break*/, 14];
                        iframeRenderer = new CanvasRenderer(this.context, {
                            scale: this.options.scale,
                            backgroundColor: container.backgroundColor,
                            x: 0,
                            y: 0,
                            width: container.width,
                            height: container.height
                        });
                        return [4 /*yield*/, iframeRenderer.render(container.tree)];
                    case 13:
                        canvas = _c.sent();
                        if (container.width && container.height) {
                            this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
                        }
                        _c.label = 14;
                    case 14:
                        if (container instanceof InputElementContainer) {
                            size = Math.min(container.bounds.width, container.bounds.height);
                            if (container.type === CHECKBOX) {
                                if (container.checked) {
                                    this.ctx.save();
                                    this.path([
                                        new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                                        new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                                        new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                                        new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                                        new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                                        new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                                        new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)
                                    ]);
                                    this.ctx.fillStyle = asString(INPUT_COLOR);
                                    this.ctx.fill();
                                    this.ctx.restore();
                                }
                            }
                            else if (container.type === RADIO) {
                                if (container.checked) {
                                    this.ctx.save();
                                    this.ctx.beginPath();
                                    this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                                    this.ctx.fillStyle = asString(INPUT_COLOR);
                                    this.ctx.fill();
                                    this.ctx.restore();
                                }
                            }
                        }
                        if (isTextInputElement(container) && container.value.length) {
                            _b = this.createFontStyle(styles), fontFamily = _b[0], fontSize = _b[1];
                            baseline = this.fontMetrics.getMetrics(fontFamily, fontSize).baseline;
                            this.ctx.font = fontFamily;
                            this.ctx.fillStyle = asString(styles.color);
                            this.ctx.textBaseline = 'alphabetic';
                            this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                            bounds = contentBox(container);
                            x = 0;
                            switch (container.styles.textAlign) {
                                case 1 /* CENTER */:
                                    x += bounds.width / 2;
                                    break;
                                case 2 /* RIGHT */:
                                    x += bounds.width;
                                    break;
                            }
                            textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                            this.ctx.save();
                            this.path([
                                new Vector(bounds.left, bounds.top),
                                new Vector(bounds.left + bounds.width, bounds.top),
                                new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                                new Vector(bounds.left, bounds.top + bounds.height)
                            ]);
                            this.ctx.clip();
                            this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing, baseline);
                            this.ctx.restore();
                            this.ctx.textBaseline = 'alphabetic';
                            this.ctx.textAlign = 'left';
                        }
                        if (!contains(container.styles.display, 2048 /* LIST_ITEM */)) return [3 /*break*/, 20];
                        if (!(container.styles.listStyleImage !== null)) return [3 /*break*/, 19];
                        img = container.styles.listStyleImage;
                        if (!(img.type === 0 /* URL */)) return [3 /*break*/, 18];
                        image = void 0;
                        url = img.url;
                        _c.label = 15;
                    case 15:
                        _c.trys.push([15, 17, , 18]);
                        return [4 /*yield*/, this.context.cache.match(url)];
                    case 16:
                        image = _c.sent();
                        this.ctx.drawImage(image, container.bounds.left - (image.width + 10), container.bounds.top);
                        return [3 /*break*/, 18];
                    case 17:
                        _c.sent();
                        this.context.logger.error("Error loading list-style-image " + url);
                        return [3 /*break*/, 18];
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        if (paint.listValue && container.styles.listStyleType !== -1 /* NONE */) {
                            fontFamily = this.createFontStyle(styles)[0];
                            this.ctx.font = fontFamily;
                            this.ctx.fillStyle = asString(styles.color);
                            this.ctx.textBaseline = 'middle';
                            this.ctx.textAlign = 'right';
                            bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                            this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 2);
                            this.ctx.textBaseline = 'bottom';
                            this.ctx.textAlign = 'left';
                        }
                        _c.label = 20;
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    CanvasRenderer.prototype.renderStackContent = function (stack) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        if (contains(stack.element.container.flags, 16 /* DEBUG_RENDER */)) {
                            debugger;
                        }
                        // https://www.w3.org/TR/css-position-3/#painting-order
                        // 1. the background and borders of the element forming the stacking context.
                        return [4 /*yield*/, this.renderNodeBackgroundAndBorders(stack.element)];
                    case 1:
                        // https://www.w3.org/TR/css-position-3/#painting-order
                        // 1. the background and borders of the element forming the stacking context.
                        _p.sent();
                        _i = 0, _a = stack.negativeZIndex;
                        _p.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        child = _a[_i];
                        return [4 /*yield*/, this.renderStack(child)];
                    case 3:
                        _p.sent();
                        _p.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
                    return [4 /*yield*/, this.renderNodeContent(stack.element)];
                    case 6:
                        // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
                        _p.sent();
                        _b = 0, _c = stack.nonInlineLevel;
                        _p.label = 7;
                    case 7:
                        if (!(_b < _c.length)) return [3 /*break*/, 10];
                        child = _c[_b];
                        return [4 /*yield*/, this.renderNode(child)];
                    case 8:
                        _p.sent();
                        _p.label = 9;
                    case 9:
                        _b++;
                        return [3 /*break*/, 7];
                    case 10:
                        _d = 0, _e = stack.nonPositionedFloats;
                        _p.label = 11;
                    case 11:
                        if (!(_d < _e.length)) return [3 /*break*/, 14];
                        child = _e[_d];
                        return [4 /*yield*/, this.renderStack(child)];
                    case 12:
                        _p.sent();
                        _p.label = 13;
                    case 13:
                        _d++;
                        return [3 /*break*/, 11];
                    case 14:
                        _f = 0, _g = stack.nonPositionedInlineLevel;
                        _p.label = 15;
                    case 15:
                        if (!(_f < _g.length)) return [3 /*break*/, 18];
                        child = _g[_f];
                        return [4 /*yield*/, this.renderStack(child)];
                    case 16:
                        _p.sent();
                        _p.label = 17;
                    case 17:
                        _f++;
                        return [3 /*break*/, 15];
                    case 18:
                        _h = 0, _j = stack.inlineLevel;
                        _p.label = 19;
                    case 19:
                        if (!(_h < _j.length)) return [3 /*break*/, 22];
                        child = _j[_h];
                        return [4 /*yield*/, this.renderNode(child)];
                    case 20:
                        _p.sent();
                        _p.label = 21;
                    case 21:
                        _h++;
                        return [3 /*break*/, 19];
                    case 22:
                        _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
                        _p.label = 23;
                    case 23:
                        if (!(_k < _l.length)) return [3 /*break*/, 26];
                        child = _l[_k];
                        return [4 /*yield*/, this.renderStack(child)];
                    case 24:
                        _p.sent();
                        _p.label = 25;
                    case 25:
                        _k++;
                        return [3 /*break*/, 23];
                    case 26:
                        _m = 0, _o = stack.positiveZIndex;
                        _p.label = 27;
                    case 27:
                        if (!(_m < _o.length)) return [3 /*break*/, 30];
                        child = _o[_m];
                        return [4 /*yield*/, this.renderStack(child)];
                    case 28:
                        _p.sent();
                        _p.label = 29;
                    case 29:
                        _m++;
                        return [3 /*break*/, 27];
                    case 30: return [2 /*return*/];
                }
            });
        });
    };
    CanvasRenderer.prototype.mask = function (paths) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.canvas.width, 0);
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.lineTo(0, 0);
        this.formatPath(paths.slice(0).reverse());
        this.ctx.closePath();
    };
    CanvasRenderer.prototype.path = function (paths) {
        this.ctx.beginPath();
        this.formatPath(paths);
        this.ctx.closePath();
    };
    CanvasRenderer.prototype.formatPath = function (paths) {
        var _this = this;
        paths.forEach(function (point, index) {
            var start = isBezierCurve(point) ? point.start : point;
            if (index === 0) {
                _this.ctx.moveTo(start.x, start.y);
            }
            else {
                _this.ctx.lineTo(start.x, start.y);
            }
            if (isBezierCurve(point)) {
                _this.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
            }
        });
    };
    CanvasRenderer.prototype.renderRepeat = function (path, pattern, offsetX, offsetY) {
        this.path(path);
        this.ctx.fillStyle = pattern;
        this.ctx.translate(offsetX, offsetY);
        this.ctx.fill();
        this.ctx.translate(-offsetX, -offsetY);
    };
    CanvasRenderer.prototype.resizeImage = function (image, width, height) {
        var _a;
        if (image.width === width && image.height === height) {
            return image;
        }
        var ownerDocument = (_a = this.canvas.ownerDocument) !== null && _a !== void 0 ? _a : document;
        var canvas = ownerDocument.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
        return canvas;
    };
    CanvasRenderer.prototype.renderBackgroundImage = function (container) {
        return __awaiter(this, void 0, void 0, function () {
            var index, _loop_1, this_1, _i, _a, backgroundImage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = container.styles.backgroundImage.length - 1;
                        _loop_1 = function (backgroundImage) {
                            var image, url, _c, path, x, y, width, height, pattern, _d, path, x, y, width, height, _e, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _f, path, left, top_1, width, height, position, x, y, _g, rx, ry, radialGradient_1, midX, midY, f, invF;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        if (!(backgroundImage.type === 0 /* URL */)) return [3 /*break*/, 5];
                                        image = void 0;
                                        url = backgroundImage.url;
                                        _h.label = 1;
                                    case 1:
                                        _h.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this_1.context.cache.match(url)];
                                    case 2:
                                        image = _h.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _h.sent();
                                        this_1.context.logger.error("Error loading background-image " + url);
                                        return [3 /*break*/, 4];
                                    case 4:
                                        if (image) {
                                            _c = calculateBackgroundRendering(container, index, [
                                                image.width,
                                                image.height,
                                                image.width / image.height
                                            ]), path = _c[0], x = _c[1], y = _c[2], width = _c[3], height = _c[4];
                                            pattern = this_1.ctx.createPattern(this_1.resizeImage(image, width, height), 'repeat');
                                            this_1.renderRepeat(path, pattern, x, y);
                                        }
                                        return [3 /*break*/, 6];
                                    case 5:
                                        if (isLinearGradient(backgroundImage)) {
                                            _d = calculateBackgroundRendering(container, index, [null, null, null]), path = _d[0], x = _d[1], y = _d[2], width = _d[3], height = _d[4];
                                            _e = calculateGradientDirection(backgroundImage.angle, width, height), lineLength = _e[0], x0 = _e[1], x1 = _e[2], y0 = _e[3], y1 = _e[4];
                                            canvas = document.createElement('canvas');
                                            canvas.width = width;
                                            canvas.height = height;
                                            ctx = canvas.getContext('2d');
                                            gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                                            processColorStops(backgroundImage.stops, lineLength).forEach(function (colorStop) {
                                                return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                            });
                                            ctx.fillStyle = gradient_1;
                                            ctx.fillRect(0, 0, width, height);
                                            if (width > 0 && height > 0) {
                                                pattern = this_1.ctx.createPattern(canvas, 'repeat');
                                                this_1.renderRepeat(path, pattern, x, y);
                                            }
                                        }
                                        else if (isRadialGradient(backgroundImage)) {
                                            _f = calculateBackgroundRendering(container, index, [
                                                null,
                                                null,
                                                null
                                            ]), path = _f[0], left = _f[1], top_1 = _f[2], width = _f[3], height = _f[4];
                                            position = backgroundImage.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage.position;
                                            x = getAbsoluteValue(position[0], width);
                                            y = getAbsoluteValue(position[position.length - 1], height);
                                            _g = calculateRadius(backgroundImage, x, y, width, height), rx = _g[0], ry = _g[1];
                                            if (rx > 0 && ry > 0) {
                                                radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                                                processColorStops(backgroundImage.stops, rx * 2).forEach(function (colorStop) {
                                                    return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                                });
                                                this_1.path(path);
                                                this_1.ctx.fillStyle = radialGradient_1;
                                                if (rx !== ry) {
                                                    midX = container.bounds.left + 0.5 * container.bounds.width;
                                                    midY = container.bounds.top + 0.5 * container.bounds.height;
                                                    f = ry / rx;
                                                    invF = 1 / f;
                                                    this_1.ctx.save();
                                                    this_1.ctx.translate(midX, midY);
                                                    this_1.ctx.transform(1, 0, 0, f, 0, 0);
                                                    this_1.ctx.translate(-midX, -midY);
                                                    this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                                                    this_1.ctx.restore();
                                                }
                                                else {
                                                    this_1.ctx.fill();
                                                }
                                            }
                                        }
                                        _h.label = 6;
                                    case 6:
                                        index--;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        backgroundImage = _a[_i];
                        return [5 /*yield**/, _loop_1(backgroundImage)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CanvasRenderer.prototype.renderSolidBorder = function (color, side, curvePoints) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.path(parsePathForBorder(curvePoints, side));
                this.ctx.fillStyle = asString(color);
                this.ctx.fill();
                return [2 /*return*/];
            });
        });
    };
    CanvasRenderer.prototype.renderDoubleBorder = function (color, width, side, curvePoints) {
        return __awaiter(this, void 0, void 0, function () {
            var outerPaths, innerPaths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(width < 3)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.renderSolidBorder(color, side, curvePoints)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        outerPaths = parsePathForBorderDoubleOuter(curvePoints, side);
                        this.path(outerPaths);
                        this.ctx.fillStyle = asString(color);
                        this.ctx.fill();
                        innerPaths = parsePathForBorderDoubleInner(curvePoints, side);
                        this.path(innerPaths);
                        this.ctx.fill();
                        return [2 /*return*/];
                }
            });
        });
    };
    CanvasRenderer.prototype.renderNodeBackgroundAndBorders = function (paint) {
        return __awaiter(this, void 0, void 0, function () {
            var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.applyEffects(paint.getEffects(2 /* BACKGROUND_BORDERS */));
                        styles = paint.container.styles;
                        hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
                        borders = [
                            { style: styles.borderTopStyle, color: styles.borderTopColor, width: styles.borderTopWidth },
                            { style: styles.borderRightStyle, color: styles.borderRightColor, width: styles.borderRightWidth },
                            { style: styles.borderBottomStyle, color: styles.borderBottomColor, width: styles.borderBottomWidth },
                            { style: styles.borderLeftStyle, color: styles.borderLeftColor, width: styles.borderLeftWidth }
                        ];
                        backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
                        if (!(hasBackground || styles.boxShadow.length)) return [3 /*break*/, 2];
                        this.ctx.save();
                        this.path(backgroundPaintingArea);
                        this.ctx.clip();
                        if (!isTransparent(styles.backgroundColor)) {
                            this.ctx.fillStyle = asString(styles.backgroundColor);
                            this.ctx.fill();
                        }
                        return [4 /*yield*/, this.renderBackgroundImage(paint.container)];
                    case 1:
                        _a.sent();
                        this.ctx.restore();
                        styles.boxShadow
                            .slice(0)
                            .reverse()
                            .forEach(function (shadow) {
                            _this.ctx.save();
                            var borderBoxArea = calculateBorderBoxPath(paint.curves);
                            var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                            var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                            if (shadow.inset) {
                                _this.path(borderBoxArea);
                                _this.ctx.clip();
                                _this.mask(shadowPaintingArea);
                            }
                            else {
                                _this.mask(borderBoxArea);
                                _this.ctx.clip();
                                _this.path(shadowPaintingArea);
                            }
                            _this.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                            _this.ctx.shadowOffsetY = shadow.offsetY.number;
                            _this.ctx.shadowColor = asString(shadow.color);
                            _this.ctx.shadowBlur = shadow.blur.number;
                            _this.ctx.fillStyle = shadow.inset ? asString(shadow.color) : 'rgba(0,0,0,1)';
                            _this.ctx.fill();
                            _this.ctx.restore();
                        });
                        _a.label = 2;
                    case 2:
                        side = 0;
                        _i = 0, borders_1 = borders;
                        _a.label = 3;
                    case 3:
                        if (!(_i < borders_1.length)) return [3 /*break*/, 13];
                        border = borders_1[_i];
                        if (!(border.style !== 0 /* NONE */ && !isTransparent(border.color) && border.width > 0)) return [3 /*break*/, 11];
                        if (!(border.style === 2 /* DASHED */)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.renderDashedDottedBorder(border.color, border.width, side, paint.curves, 2 /* DASHED */)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 5:
                        if (!(border.style === 3 /* DOTTED */)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.renderDashedDottedBorder(border.color, border.width, side, paint.curves, 3 /* DOTTED */)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(border.style === 4 /* DOUBLE */)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.renderDoubleBorder(border.color, border.width, side, paint.curves)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.renderSolidBorder(border.color, side, paint.curves)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        side++;
                        _a.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 3];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    CanvasRenderer.prototype.renderDashedDottedBorder = function (color, width, side, curvePoints, style) {
        return __awaiter(this, void 0, void 0, function () {
            var strokePaths, boxPaths, startX, startY, endX, endY, length, dashLength, spaceLength, useLineDash, multiplier, numberOfDashes, minSpace, maxSpace, path1, path2, path1, path2;
            return __generator(this, function (_a) {
                this.ctx.save();
                strokePaths = parsePathForBorderStroke(curvePoints, side);
                boxPaths = parsePathForBorder(curvePoints, side);
                if (style === 2 /* DASHED */) {
                    this.path(boxPaths);
                    this.ctx.clip();
                }
                if (isBezierCurve(boxPaths[0])) {
                    startX = boxPaths[0].start.x;
                    startY = boxPaths[0].start.y;
                }
                else {
                    startX = boxPaths[0].x;
                    startY = boxPaths[0].y;
                }
                if (isBezierCurve(boxPaths[1])) {
                    endX = boxPaths[1].end.x;
                    endY = boxPaths[1].end.y;
                }
                else {
                    endX = boxPaths[1].x;
                    endY = boxPaths[1].y;
                }
                if (side === 0 || side === 2) {
                    length = Math.abs(startX - endX);
                }
                else {
                    length = Math.abs(startY - endY);
                }
                this.ctx.beginPath();
                if (style === 3 /* DOTTED */) {
                    this.formatPath(strokePaths);
                }
                else {
                    this.formatPath(boxPaths.slice(0, 2));
                }
                dashLength = width < 3 ? width * 3 : width * 2;
                spaceLength = width < 3 ? width * 2 : width;
                if (style === 3 /* DOTTED */) {
                    dashLength = width;
                    spaceLength = width;
                }
                useLineDash = true;
                if (length <= dashLength * 2) {
                    useLineDash = false;
                }
                else if (length <= dashLength * 2 + spaceLength) {
                    multiplier = length / (2 * dashLength + spaceLength);
                    dashLength *= multiplier;
                    spaceLength *= multiplier;
                }
                else {
                    numberOfDashes = Math.floor((length + spaceLength) / (dashLength + spaceLength));
                    minSpace = (length - numberOfDashes * dashLength) / (numberOfDashes - 1);
                    maxSpace = (length - (numberOfDashes + 1) * dashLength) / numberOfDashes;
                    spaceLength =
                        maxSpace <= 0 || Math.abs(spaceLength - minSpace) < Math.abs(spaceLength - maxSpace)
                            ? minSpace
                            : maxSpace;
                }
                if (useLineDash) {
                    if (style === 3 /* DOTTED */) {
                        this.ctx.setLineDash([0, dashLength + spaceLength]);
                    }
                    else {
                        this.ctx.setLineDash([dashLength, spaceLength]);
                    }
                }
                if (style === 3 /* DOTTED */) {
                    this.ctx.lineCap = 'round';
                    this.ctx.lineWidth = width;
                }
                else {
                    this.ctx.lineWidth = width * 2 + 1.1;
                }
                this.ctx.strokeStyle = asString(color);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                // dashed round edge gap
                if (style === 2 /* DASHED */) {
                    if (isBezierCurve(boxPaths[0])) {
                        path1 = boxPaths[3];
                        path2 = boxPaths[0];
                        this.ctx.beginPath();
                        this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
                        this.ctx.stroke();
                    }
                    if (isBezierCurve(boxPaths[1])) {
                        path1 = boxPaths[1];
                        path2 = boxPaths[2];
                        this.ctx.beginPath();
                        this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
                        this.ctx.stroke();
                    }
                }
                this.ctx.restore();
                return [2 /*return*/];
            });
        });
    };
    CanvasRenderer.prototype.render = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var stack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.options.backgroundColor) {
                            this.ctx.fillStyle = asString(this.options.backgroundColor);
                            this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height);
                        }
                        stack = parseStackingContexts(element);
                        return [4 /*yield*/, this.renderStack(stack)];
                    case 1:
                        _a.sent();
                        this.applyEffects([]);
                        return [2 /*return*/, this.canvas];
                }
            });
        });
    };
    return CanvasRenderer;
}(Renderer));
var isTextInputElement = function (container) {
    if (container instanceof TextareaElementContainer) {
        return true;
    }
    else if (container instanceof SelectElementContainer) {
        return true;
    }
    else if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
        return true;
    }
    return false;
};
var calculateBackgroundCurvedPaintingArea = function (clip, curves) {
    switch (clip) {
        case 0 /* BORDER_BOX */:
            return calculateBorderBoxPath(curves);
        case 2 /* CONTENT_BOX */:
            return calculateContentBoxPath(curves);
        case 1 /* PADDING_BOX */:
        default:
            return calculatePaddingBoxPath(curves);
    }
};
var canvasTextAlign = function (textAlign) {
    switch (textAlign) {
        case 1 /* CENTER */:
            return 'center';
        case 2 /* RIGHT */:
            return 'right';
        case 0 /* LEFT */:
        default:
            return 'left';
    }
};
// see https://github.com/niklasvh/html2canvas/pull/2645
var iOSBrokenFonts = ['-apple-system', 'system-ui'];
var fixIOSSystemFonts = function (fontFamilies) {
    return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
        ? fontFamilies.filter(function (fontFamily) { return iOSBrokenFonts.indexOf(fontFamily) === -1; })
        : fontFamilies;
};

var ForeignObjectRenderer = /** @class */ (function (_super) {
    __extends(ForeignObjectRenderer, _super);
    function ForeignObjectRenderer(context, options) {
        var _this = _super.call(this, context, options) || this;
        _this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
        _this.ctx = _this.canvas.getContext('2d');
        _this.options = options;
        _this.canvas.width = Math.floor(options.width * options.scale);
        _this.canvas.height = Math.floor(options.height * options.scale);
        _this.canvas.style.width = options.width + "px";
        _this.canvas.style.height = options.height + "px";
        _this.ctx.scale(_this.options.scale, _this.options.scale);
        _this.ctx.translate(-options.x, -options.y);
        _this.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
        return _this;
    }
    ForeignObjectRenderer.prototype.render = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var svg, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        svg = createForeignObjectSVG(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, element);
                        return [4 /*yield*/, loadSerializedSVG(svg)];
                    case 1:
                        img = _a.sent();
                        if (this.options.backgroundColor) {
                            this.ctx.fillStyle = asString(this.options.backgroundColor);
                            this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
                        }
                        this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
                        return [2 /*return*/, this.canvas];
                }
            });
        });
    };
    return ForeignObjectRenderer;
}(Renderer));
var loadSerializedSVG = function (svg) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            resolve(img);
        };
        img.onerror = reject;
        img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    });
};

var Logger = /** @class */ (function () {
    function Logger(_a) {
        var id = _a.id, enabled = _a.enabled;
        this.id = id;
        this.enabled = enabled;
        this.start = Date.now();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.enabled) {
            // eslint-disable-next-line no-console
            if (typeof window !== 'undefined' && window.console && typeof console.debug === 'function') {
                // eslint-disable-next-line no-console
                console.debug.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
            }
            else {
                this.info.apply(this, args);
            }
        }
    };
    Logger.prototype.getTime = function () {
        return Date.now() - this.start;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.enabled) {
            // eslint-disable-next-line no-console
            if (typeof window !== 'undefined' && window.console && typeof console.info === 'function') {
                // eslint-disable-next-line no-console
                console.info.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.enabled) {
            // eslint-disable-next-line no-console
            if (typeof window !== 'undefined' && window.console && typeof console.warn === 'function') {
                // eslint-disable-next-line no-console
                console.warn.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
            }
            else {
                this.info.apply(this, args);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.enabled) {
            // eslint-disable-next-line no-console
            if (typeof window !== 'undefined' && window.console && typeof console.error === 'function') {
                // eslint-disable-next-line no-console
                console.error.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
            }
            else {
                this.info.apply(this, args);
            }
        }
    };
    Logger.instances = {};
    return Logger;
}());

var Context = /** @class */ (function () {
    function Context(options, windowBounds) {
        var _a;
        this.windowBounds = windowBounds;
        this.instanceName = "#" + Context.instanceCount++;
        this.logger = new Logger({ id: this.instanceName, enabled: options.logging });
        this.cache = (_a = options.cache) !== null && _a !== void 0 ? _a : new Cache(this, options);
    }
    Context.instanceCount = 1;
    return Context;
}());

var html2canvas = function (element, options) {
    if (options === void 0) { options = {}; }
    return renderElement(element, options);
};
if (typeof window !== 'undefined') {
    CacheStorage.setContext(window);
}
var renderElement = function (element, opts) { return __awaiter(void 0, void 0, void 0, function () {
    var ownerDocument, defaultView, resourceOptions, contextOptions, windowOptions, windowBounds, context, foreignObjectRendering, cloneOptions, documentCloner, clonedElement, container, _a, width, height, left, top, backgroundColor, renderOptions, canvas, renderer, root, renderer;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    return __generator(this, function (_u) {
        switch (_u.label) {
            case 0:
                if (!element || typeof element !== 'object') {
                    return [2 /*return*/, Promise.reject('Invalid element provided as first argument')];
                }
                ownerDocument = element.ownerDocument;
                if (!ownerDocument) {
                    throw new Error("Element is not attached to a Document");
                }
                defaultView = ownerDocument.defaultView;
                if (!defaultView) {
                    throw new Error("Document is not attached to a Window");
                }
                resourceOptions = {
                    allowTaint: (_b = opts.allowTaint) !== null && _b !== void 0 ? _b : false,
                    imageTimeout: (_c = opts.imageTimeout) !== null && _c !== void 0 ? _c : 15000,
                    proxy: opts.proxy,
                    useCORS: (_d = opts.useCORS) !== null && _d !== void 0 ? _d : false
                };
                contextOptions = __assign({ logging: (_e = opts.logging) !== null && _e !== void 0 ? _e : true, cache: opts.cache }, resourceOptions);
                windowOptions = {
                    windowWidth: (_f = opts.windowWidth) !== null && _f !== void 0 ? _f : defaultView.innerWidth,
                    windowHeight: (_g = opts.windowHeight) !== null && _g !== void 0 ? _g : defaultView.innerHeight,
                    scrollX: (_h = opts.scrollX) !== null && _h !== void 0 ? _h : defaultView.pageXOffset,
                    scrollY: (_j = opts.scrollY) !== null && _j !== void 0 ? _j : defaultView.pageYOffset
                };
                windowBounds = new Bounds(windowOptions.scrollX, windowOptions.scrollY, windowOptions.windowWidth, windowOptions.windowHeight);
                context = new Context(contextOptions, windowBounds);
                foreignObjectRendering = (_k = opts.foreignObjectRendering) !== null && _k !== void 0 ? _k : false;
                cloneOptions = {
                    allowTaint: (_l = opts.allowTaint) !== null && _l !== void 0 ? _l : false,
                    onclone: opts.onclone,
                    ignoreElements: opts.ignoreElements,
                    inlineImages: foreignObjectRendering,
                    copyStyles: foreignObjectRendering
                };
                context.logger.debug("Starting document clone with size " + windowBounds.width + "x" + windowBounds.height + " scrolled to " + -windowBounds.left + "," + -windowBounds.top);
                documentCloner = new DocumentCloner(context, element, cloneOptions);
                clonedElement = documentCloner.clonedReferenceElement;
                if (!clonedElement) {
                    return [2 /*return*/, Promise.reject("Unable to find element in cloned iframe")];
                }
                return [4 /*yield*/, documentCloner.toIFrame(ownerDocument, windowBounds)];
            case 1:
                container = _u.sent();
                _a = isBodyElement(clonedElement) || isHTMLElement(clonedElement)
                    ? parseDocumentSize(clonedElement.ownerDocument)
                    : parseBounds(context, clonedElement), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
                backgroundColor = parseBackgroundColor(context, clonedElement, opts.backgroundColor);
                renderOptions = {
                    canvas: opts.canvas,
                    backgroundColor: backgroundColor,
                    scale: (_o = (_m = opts.scale) !== null && _m !== void 0 ? _m : defaultView.devicePixelRatio) !== null && _o !== void 0 ? _o : 1,
                    x: ((_p = opts.x) !== null && _p !== void 0 ? _p : 0) + left,
                    y: ((_q = opts.y) !== null && _q !== void 0 ? _q : 0) + top,
                    width: (_r = opts.width) !== null && _r !== void 0 ? _r : Math.ceil(width),
                    height: (_s = opts.height) !== null && _s !== void 0 ? _s : Math.ceil(height)
                };
                if (!foreignObjectRendering) return [3 /*break*/, 3];
                context.logger.debug("Document cloned, using foreign object rendering");
                renderer = new ForeignObjectRenderer(context, renderOptions);
                return [4 /*yield*/, renderer.render(clonedElement)];
            case 2:
                canvas = _u.sent();
                return [3 /*break*/, 5];
            case 3:
                context.logger.debug("Document cloned, element located at " + left + "," + top + " with size " + width + "x" + height + " using computed rendering");
                context.logger.debug("Starting DOM parsing");
                root = parseTree(context, clonedElement);
                if (backgroundColor === root.styles.backgroundColor) {
                    root.styles.backgroundColor = COLORS.TRANSPARENT;
                }
                context.logger.debug("Starting renderer for element at " + renderOptions.x + "," + renderOptions.y + " with size " + renderOptions.width + "x" + renderOptions.height);
                renderer = new CanvasRenderer(context, renderOptions);
                return [4 /*yield*/, renderer.render(root)];
            case 4:
                canvas = _u.sent();
                _u.label = 5;
            case 5:
                if ((_t = opts.removeContainer) !== null && _t !== void 0 ? _t : true) {
                    if (!DocumentCloner.destroy(container)) {
                        context.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore");
                    }
                }
                context.logger.debug("Finished rendering");
                return [2 /*return*/, canvas];
        }
    });
}); };
var parseBackgroundColor = function (context, element, backgroundColorOverride) {
    var ownerDocument = element.ownerDocument;
    // http://www.w3.org/TR/css3-background/#special-backgrounds
    var documentBackgroundColor = ownerDocument.documentElement
        ? parseColor(context, getComputedStyle(ownerDocument.documentElement).backgroundColor)
        : COLORS.TRANSPARENT;
    var bodyBackgroundColor = ownerDocument.body
        ? parseColor(context, getComputedStyle(ownerDocument.body).backgroundColor)
        : COLORS.TRANSPARENT;
    var defaultBackgroundColor = typeof backgroundColorOverride === 'string'
        ? parseColor(context, backgroundColorOverride)
        : backgroundColorOverride === null
            ? COLORS.TRANSPARENT
            : 0xffffffff;
    return element === ownerDocument.documentElement
        ? isTransparent(documentBackgroundColor)
            ? isTransparent(bodyBackgroundColor)
                ? defaultBackgroundColor
                : bodyBackgroundColor
            : documentBackgroundColor
        : defaultBackgroundColor;
};

const BLUEPRINT_SYSTEM_PROMPT = `
You are an expert Unreal Engine 5 Blueprint developer.
Your goal is to generate valid T3D format text for UE5 Blueprint nodes based on the user's request.

CRITICAL RULES:
1. OUTPUT ONLY THE T3D TEXT. No markdown, no explanations, no code blocks.
2. Start directly with "Begin Object", do NOT include "Begin Map" or "End Map".
3. Each Node MUST have a unique "NodeGuid" - EXACTLY 32 characters using ONLY 0-9 and A-F (uppercase hex).
   - VALID: "A1B2C3D4E5F6789012345678ABCDEF01"
   - INVALID: "V1000..." (V is not hex), "HHHH..." (H is not hex)
4. Each Pin MUST have a unique "PinId" - EXACTLY 32 characters using ONLY 0-9 and A-F.
5. "NodePosX" and "NodePosY" should be set to avoid overlap. Use increments of ~300 for X (left-to-right flow).
6. Strings and names must be properly quoted.
7. Ensure all braces/parentheses are balanced.

PIN CONNECTION FORMAT:
- To connect pins between nodes, use "LinkedTo=(TargetNodeName TargetPinId,)" in the output pin.
- Format: LinkedTo=(K2Node_XXX_N PINID32HEXDIGITS,)
- Example: LinkedTo=(K2Node_CallFunction_1 AE2D76AC152348E290EE202FE4386D4D,)
- Multiple connections: LinkedTo=(Node1 PinId1,Node2 PinId2,)

COMMON NODE TYPES:
- Function Call: Class=/Script/BlueprintGraph.K2Node_CallFunction
  - PrintString: FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",MemberName="PrintString")
  - Delay: FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",MemberName="Delay")
  - SpawnActor: FunctionReference=(MemberName="BeginDeferredActorSpawnFromClass",MemberParent="/Script/CoreUObject.Class'/Script/Engine.GameplayStatics'")
  - GetActorLocation: FunctionReference=(MemberName="K2_GetActorLocation",bSelfContext=True)
  - SetActorLocation: FunctionReference=(MemberName="K2_SetActorLocation",bSelfContext=True)
- Events:
  - BeginPlay: Class=/Script/BlueprintGraph.K2Node_Event (EventReference MemberName="ReceiveBeginPlay")
  - Tick: Class=/Script/BlueprintGraph.K2Node_Event (EventReference MemberName="ReceiveTick")
  - Custom Event: Class=/Script/BlueprintGraph.K2Node_CustomEvent (CustomFunctionName="YourEventName")
- Flow Control:
  - Branch: Class=/Script/BlueprintGraph.K2Node_IfThenElse
  - Sequence: Class=/Script/BlueprintGraph.K2Node_ExecutionSequence
  - ForEachLoop: Class=/Script/BlueprintGraph.K2Node_CallFunction (MemberName="ForEachLoop")
  - DoOnce: Class=/Script/BlueprintGraph.K2Node_CallFunction (MemberName="DoOnce")
  - Delay: Class=/Script/BlueprintGraph.K2Node_CallFunction (MemberName="Delay")
- Variables:
  - Get: Class=/Script/BlueprintGraph.K2Node_VariableGet
  - Set: Class=/Script/BlueprintGraph.K2Node_VariableSet
- Math:
  - Add/Subtract/Multiply/Divide: Class=/Script/BlueprintGraph.K2Node_CallFunction with KismetMathLibrary
  - MakeVector: FunctionReference=(MemberName="MakeVector",MemberParent="/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'")

PIN CATEGORIES:
- Execution: PinType.PinCategory="exec"
- Boolean: PinType.PinCategory="bool"
- Integer: PinType.PinCategory="int"
- Float: PinType.PinCategory="real",PinType.PinSubCategory="float" (UE5) or PinType.PinCategory="float" (UE4)
- String: PinType.PinCategory="string"
- Object: PinType.PinCategory="object"
- Struct (Vector, Rotator, etc.): PinType.PinCategory="struct",PinType.PinSubCategoryObject=/Script/CoreUObject.ScriptStruct'"/Script/CoreUObject.Vector"'

COMPLETE EXAMPLE - PrintString connected to BeginPlay:
Begin Object Class=/Script/BlueprintGraph.K2Node_Event Name="K2Node_Event_0"
    EventReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.Actor'",MemberName="ReceiveBeginPlay")
    bOverrideFunction=True
    NodePosX=0
    NodePosY=0
    NodeGuid=A1B2C3D4E5F6789012345678ABCDEF01
    CustomProperties Pin (PinId=11111111111111111111111111111111,PinName="OutputDelegate",Direction="EGPD_Output",PinType.PinCategory="delegate",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.Actor'",MemberName="ReceiveBeginPlay"),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=22222222222222222222222222222222,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_CallFunction_0 33333333333333333333333333333333,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
End Object
Begin Object Class=/Script/BlueprintGraph.K2Node_CallFunction Name="K2Node_CallFunction_0"
    FunctionReference=(MemberParent="/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",MemberName="PrintString")
    NodePosX=300
    NodePosY=0
    NodeGuid=B2C3D4E5F6789012345678ABCDEF0123
    CustomProperties Pin (PinId=33333333333333333333333333333333,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Event_0 22222222222222222222222222222222,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=44444444444444444444444444444444,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=55555555555555555555555555555555,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node", "Target", "Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultObject="/Script/Engine.Default__KismetSystemLibrary",PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=66666666666666666666666666666666,PinName="WorldContextObject",PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject="/Script/CoreUObject.Class'/Script/CoreUObject.Object'",PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=True,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=77777777777777777777777777777777,PinName="InString",PinType.PinCategory="string",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="Hello World",AutogeneratedDefaultValue="Hello",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
End Object
`;

const MATERIAL_SYSTEM_PROMPT = `
You are an expert Unreal Engine 5 Material Editor developer.
Your goal is to generate valid T3D format text for UE5 Material nodes based on the user's request.

CRITICAL RULES:
1. OUTPUT ONLY THE T3D TEXT. No markdown, no explanations.
2. Use "MaterialGraphNode" as the wrapper object for expressions.
3. Inside "MaterialGraphNode", you MUST define the MaterialExpression with a nested Begin Object structure.
4. Each Node MUST have a unique "NodeGuid" (32-digit uppercase hex).
5. Each Pin MUST have a unique "PinId" (32-digit uppercase hex).
6. "NodePosX" and "NodePosY" must be set. Use increments of ~200 for X spacing.
7. DO NOT include "Begin Map". Start directly with "Begin Object".
8. MUST include "CustomProperties Pin" definitions for each input/output.

PIN CONNECTION FORMAT FOR MATERIALS:
- For MaterialExpression inputs, use expression references inside the MaterialExpression definition.
- Example: A=(Expression=MaterialExpressionConstant3Vector'"MaterialExpressionConstant3Vector_0"',OutputIndex=0,Mask=1,MaskR=1,MaskG=1,MaskB=1)
- OutputIndex=0 means first output, OutputIndex=1 means second output, etc.

COMMON MATERIAL NODES:
- Constant: MaterialExpressionConstant (R=value)
- Constant3Vector: MaterialExpressionConstant3Vector (Constant=(R=,G=,B=,A=))
- Add: MaterialExpressionAdd (A=expr, B=expr)
- Multiply: MaterialExpressionMultiply (A=expr, B=expr)
- Lerp: MaterialExpressionLinearInterpolate (A=expr, B=expr, Alpha=expr)
- Time: MaterialExpressionTime
- Sine: MaterialExpressionSine
- Desaturation: MaterialExpressionDesaturation
- TextureSample: MaterialExpressionTextureSample
- TexCoord: MaterialExpressionTextureCoordinate
- ScalarParameter: MaterialExpressionScalarParameter (ParameterName="Name",DefaultValue=0.0)

COMPLETE EXAMPLE - Constant3Vector with proper Pin definitions:
Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_0"
    Begin Object Class=/Script/Engine.MaterialExpressionConstant3Vector Name="MaterialExpressionConstant3Vector_0"
    End Object
    Begin Object Name="MaterialExpressionConstant3Vector_0"
        Constant=(R=1.0,G=0.5,B=0.2,A=0.0)
        MaterialExpressionEditorX=-400
        MaterialExpressionEditorY=-200
        MaterialExpressionGuid=A1B2C3D4E5F6789012345678ABCDEF01
    End Object
    MaterialExpression=/Script/Engine.MaterialExpressionConstant3Vector'"MaterialExpressionConstant3Vector_0"'
    NodePosX=-400
    NodePosY=-200
    NodeGuid=AAAA1111BBBB2222CCCC3333DDDD4444
    CustomProperties Pin (PinId=11111111111111111111111111111111,PinName="Constant",PinType.PinCategory="optional",PinType.PinSubCategory="rgb",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="1.0,0.5,0.2",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=True,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=22222222222222222222222222222222,PinName="Output",PinFriendlyName=" ",Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
End Object

EXAMPLE - LinearInterpolate connecting two colors:
Begin Object Class=/Script/UnrealEd.MaterialGraphNode Name="MaterialGraphNode_1"
    Begin Object Class=/Script/Engine.MaterialExpressionLinearInterpolate Name="MaterialExpressionLinearInterpolate_0"
    End Object
    Begin Object Name="MaterialExpressionLinearInterpolate_0"
        A=(Expression=MaterialExpressionConstant3Vector'"MaterialExpressionConstant3Vector_0"',OutputIndex=0,Mask=1,MaskR=1,MaskG=1,MaskB=1)
        B=(Expression=MaterialExpressionConstant3Vector'"MaterialExpressionConstant3Vector_1"',OutputIndex=0,Mask=1,MaskR=1,MaskG=1,MaskB=1)
        Alpha=(Expression=MaterialExpressionScalarParameter'"MaterialExpressionScalarParameter_0"',OutputIndex=0)
        MaterialExpressionEditorX=-200
        MaterialExpressionEditorY=-200
        MaterialExpressionGuid=B2C3D4E5F6789012345678ABCDEF0123
    End Object
    MaterialExpression=/Script/Engine.MaterialExpressionLinearInterpolate'"MaterialExpressionLinearInterpolate_0"'
    NodePosX=-200
    NodePosY=-200
    NodeGuid=BBBB2222CCCC3333DDDD4444EEEE5555
    CustomProperties Pin (PinId=33333333333333333333333333333333,PinName="A",PinType.PinCategory="optional",PinType.PinSubCategory="rgb",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=44444444444444444444444444444444,PinName="B",PinType.PinCategory="optional",PinType.PinSubCategory="rgb",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=55555555555555555555555555555555,PinName="Alpha",PinType.PinCategory="optional",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=66666666666666666666666666666666,PinName="Output",PinFriendlyName=" ",Direction="EGPD_Output",PinType.PinCategory="mask",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
End Object
`;

/**
 * Default customizable system prompt template
 */
const DEFAULT_PROMPT_TEMPLATE = `You are a helper for {{MODE}}.
The following context contains {{MODE_TYPE}} node data (simplified).
{{CONTEXT}}
Answer the user's question based on the provided context if relevant.
Use concise language.`;

// Keep backward compatibility
const SYSTEM_PROMPT = BLUEPRINT_SYSTEM_PROMPT;

/**
 * LLM Service - Handles API communication
 */

class LLMService {
    
    constructor(config = {}) {
        this.config = config;
    }

    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }

    setDebug(enabled) {
        this.debug = enabled;
    }

    /**
     * Generate T3D from prompt
     * @param {string} userPrompt
     * @param {AbortSignal} [signal] Optional abort signal
     * @param {string} [systemPrompt] Optional system prompt override
     * @returns {Promise<string>} T3D text
     */
    /**
     * Generate T3D from prompt
     * @param {string} userPrompt
     * @param {AbortSignal} [signal] Optional abort signal
     * @param {string} [systemPrompt] Optional system prompt override
     * @returns {Promise<string>} T3D text
     */
    async generate(userPrompt, signal, systemPrompt = SYSTEM_PROMPT) {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure it in settings.")
        }

        const rawBaseUrl = this.config.baseUrl || "https://api.openai.com/v1";
        const baseUrl = rawBaseUrl.replace(/\/+$/, '');
        const model = this.config.model || "gpt-4o";
        const temperature = this.config.temperature ?? 0.5;
        const provider = this.config.provider || "openai";

        try {
            let requestBody = {};
            let fetchUrl = "";
            let fetchHeaders = {
                "Content-Type": "application/json"
            };

            if (provider === "gemini") {
                // Gemini REST API
                fetchUrl = `${baseUrl}/models/${model}:generateContent?key=${this.config.apiKey}`;
                // Gemini supports system instructions in a specific way or via prompt concatenation
                // The modern API has systemInstruction field
                requestBody = {
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: userPrompt }]
                        }
                    ],
                    systemInstruction: {
                        parts: [{ text: systemPrompt }]
                    },
                    generationConfig: {
                        temperature: temperature
                    }
                };
            } else {
                // OpenAI / Standard Format
                fetchUrl = `${baseUrl}/chat/completions`;
                fetchHeaders["Authorization"] = `Bearer ${this.config.apiKey}`;
                requestBody = {
                    model: model,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: temperature,
                    stream: false
                };
            }

            // Debug logging
            if (this.debug) {
                console.group('%c[LLM Debug] Generate Request', 'color: #4CAF50; font-weight: bold');
                console.log('%cProvider:', 'color: #2196F3', provider);
                console.log('%cEndpoint:', 'color: #2196F3', fetchUrl);
                console.log('%cModel:', 'color: #2196F3', model);
                console.log('%cFull Payload:', 'color: #9C27B0', JSON.stringify(requestBody, null, 2));
                console.groupEnd();
            }

            const response = await fetch(fetchUrl, {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify(requestBody),
                signal: signal
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMsg = `API Error ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    if (errorJson.error?.message) {
                        errorMsg += `: ${errorJson.error.message}`;
                    }
                } catch (e) {
                    errorMsg += `: ${errorText.substring(0, 100)}`;
                }
                throw new Error(errorMsg)
            }

            const data = await response.json();
            let content = "";

            if (provider === "gemini") {
                content = data.candidates?.[0]?.content?.parts?.[0]?.text;
            } else {
                content = data.choices?.[0]?.message?.content;
            }

            if (!content) {
                throw new Error("No content received from LLM")
            }

            // Simple cleanup: remove markdown code blocks if present
            const cleanContent = content.replace(/^```\w*\n?/, "").replace(/\n?```$/, "").trim();
            
            return cleanContent

        } catch (error) {
            console.error("LLM Service Error:", error);
            throw error
        }
    }

    /**
     * Chat with messages array (supports multi-turn and images)
     * @param {Array} messages - OpenAI format messages [{ role, content }]
     *        content can be string or array for vision: [{ type: "text", text }, { type: "image_url", image_url: { url } }]
     * @param {AbortSignal} [signal] - Optional abort signal
     * @returns {Promise<string>} Response text
     */
    async chat(messages, signal) {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure it in settings.")
        }

        const rawBaseUrl = this.config.baseUrl || "https://api.openai.com/v1";
        const baseUrl = rawBaseUrl.replace(/\/+$/, '');
        const model = this.config.model || "gpt-4o";
        const temperature = this.config.temperature ?? 0.7;
        const provider = this.config.provider || "openai";

        try {
            let requestBody = {};
            let fetchUrl = "";
            let fetchHeaders = {
                "Content-Type": "application/json"
            };

            if (provider === "gemini") {
                fetchUrl = `${baseUrl}/models/${model}:generateContent?key=${this.config.apiKey}`;
                
                // Convert OpenAI messages to Gemini contents
                // OpenAI: [{ role: 'system'|'user'|'assistant', content: ... }]
                // Gemini: contents: [{ role: 'user'|'model', parts: [{ text: ... }] }]
                // System instructions are separate in Gemini
                
                const geminiContents = [];
                let systemInstruction = null;

                for (const msg of messages) {
                    if (msg.role === 'system') {
                        systemInstruction = { parts: [{ text: msg.content }] };
                        continue
                    }
                    
                    const role = msg.role === 'assistant' ? 'model' : 'user';
                    const parts = [];
                    
                    if (Array.isArray(msg.content)) {
                        // Handle multimodal (text + images)
                        for (const part of msg.content) {
                            if (part.type === 'text') {
                                parts.push({ text: part.text });
                            } else if (part.type === 'image_url') {
                                // Extract base64 from data URL if possible, or use logic for URI
                                // Assuming part.image_url.url is a data URL (data:image/png;base64,...)
                                // Gemini expects inlineData
                                const dataUrl = part.image_url.url;
                                if (dataUrl.startsWith('data:')) {
                                    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
                                    if (match) {
                                        parts.push({
                                            inlineData: {
                                                mimeType: match[1],
                                                data: match[2]
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    } else {
                        parts.push({ text: msg.content });
                    }
                    
                    geminiContents.push({ role, parts });
                }

                requestBody = {
                    contents: geminiContents,
                    generationConfig: {
                        temperature: temperature
                    }
                };
                
                if (systemInstruction) {
                    requestBody.systemInstruction = systemInstruction;
                }

            } else {
                fetchUrl = `${baseUrl}/chat/completions`;
                fetchHeaders["Authorization"] = `Bearer ${this.config.apiKey}`;
                requestBody = {
                    model: model,
                    messages: messages,
                    temperature: temperature,
                    stream: false
                };
            }

            // Debug logging
            if (this.debug) {
                console.group('%c[LLM Debug] Chat Request', 'color: #4CAF50; font-weight: bold');
                console.log('%cProvider:', 'color: #2196F3', provider);
                console.log('%cFull Payload:', 'color: #9C27B0', JSON.stringify(requestBody, null, 2));
                console.groupEnd();
            }

            const response = await fetch(fetchUrl, {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify(requestBody),
                signal: signal
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMsg = `API Error ${response.status}`;
                try {
                    const errorJson = JSON.parse(errorText);
                    if (errorJson.error?.message) {
                        errorMsg += `: ${errorJson.error.message}`;
                    }
                } catch (e) {
                    errorMsg += `: ${errorText.substring(0, 100)}`;
                }
                throw new Error(errorMsg)
            }

            const data = await response.json();
            let content = "";

            if (provider === "gemini") {
                content = data.candidates?.[0]?.content?.parts?.[0]?.text;
            } else {
                content = data.choices?.[0]?.message?.content;
            }

            if (!content) {
                throw new Error("No content received from LLM")
            }

            return content.trim()

        } catch (error) {
            console.error("LLM Chat Error:", error);
            throw error
        }
    }
}

/**
 * Layout Engine for UE Blueprint Nodes
 * Arranges nodes automatically based on their connection topology
 */
class LayoutEngine {

    /**
     * Process and arrange a set of nodes
     * @param {NodeElement[]} nodes - Array of NodeElement instances
     */
    static process(nodes) {
        if (!nodes || nodes.length === 0) return

        // 1. Build Graph
        const graph = this._buildGraph(nodes);
        
        // 2. Calculate Layers (Topological Sort / BFS)
        const layers = this._calculateLayers(graph);

        // 3. Apply Coordinates
        this._applyCoordinates(layers, nodes[0].blueprint); // Use blueprint from first node reference
    }

    /**
     * Build adjacency list and in-degree map
     */
    static _buildGraph(nodes) {
        const adj = new Map(); // NodeGUID -> [TargetNodeGUID]
        const inDegree = new Map(); // NodeGUID -> Number
        const nodeMap = new Map(); // NodeGUID -> NodeElement

        // Initialize maps
        nodes.forEach(node => {
            const guid = node.entity.NodeGuid.toString();
            adj.set(guid, []);
            inDegree.set(guid, 0);
            nodeMap.set(guid, node);
        });

        // Populate connections
        nodes.forEach(node => {
            const guid = node.entity.NodeGuid.toString();
            const pins = node.getPinEntities();

            pins.forEach(pin => {
                if (pin.isOutput() && pin.LinkedTo && pin.LinkedTo.values) {
                    pin.LinkedTo.values.forEach(link => {
                        const targetNodeName = link.objectName 
                            ? link.objectName.toString() 
                            : link.toString().split(" ")[0];
                        // Note: LinkedTo usually stores NodeName + PinId. 
                        // But we need NodeGuid to map back to our node instances securely.
                        // However, generated T3D might rely on Names. 
                        // Let's try to match by Name since T3D uses Names for linking.
                        
                        // Find target node by Name in our current set
                        const targetNode = nodes.find(n => n.entity.getObjectName() === targetNodeName);
                        
                        if (targetNode) {
                            const targetGuid = targetNode.entity.NodeGuid.toString();
                            
                            // Avoid self-loops
                            if (guid !== targetGuid) {
                                adj.get(guid).push(targetGuid);
                                inDegree.set(targetGuid, (inDegree.get(targetGuid) || 0) + 1);
                            }
                        }
                    });
                }
            });
        });

        return { adj, inDegree, nodeMap }
    }

    /**
     * Calculate layers using BFS
     */
    static _calculateLayers({ adj, inDegree, nodeMap }) {
        const layers = [];
        const visited = new Set();
        let queue = [];

        // Find initial roots (in-degree 0)
        // If all nodes have dependencies (cycles), pick one arbitrarily or use specific heuristics
        for (const [guid, degree] of inDegree) {
            if (degree === 0) {
                queue.push(guid);
                visited.add(guid);
            }
        }

        // Cycle handling: if no roots found but nodes exist, pick the first one
        if (queue.length === 0 && nodeMap.size > 0) {
            const first = nodeMap.keys().next().value;
            queue.push(first);
            visited.add(first);
        }

        while (queue.length > 0) {
            const currentLayer = [];
            const nextQueue = [];

            for (const guid of queue) {
                currentLayer.push(nodeMap.get(guid));
                
                const neighbors = adj.get(guid) || [];
                for (const neighborGuid of neighbors) {
                    // Simple cycle breaking: only visit if not visited
                    if (!visited.has(neighborGuid)) {
                        /* 
                           Strict topological sort requires reducing in-degree.
                           For simple visualization, visiting once is enough. 
                           For better layering, we might want to wait until all deps are processed,
                           but here we use simple BFS level traversal.
                        */
                        inDegree.set(neighborGuid, inDegree.get(neighborGuid) - 1);
                        if (inDegree.get(neighborGuid) <= 0 || !visited.has(neighborGuid)) {
                             // Only add if not scheduled for this layer (dedup handling)
                             if (!nextQueue.includes(neighborGuid) ) {
                                 nextQueue.push(neighborGuid);
                                 visited.add(neighborGuid);
                             }
                        }
                    }
                }
            }

            layers.push(currentLayer);
            queue = nextQueue;
        }
        
        // Handle disconnected components (orphaned nodes not reached by Main BFS)
        if (visited.size < nodeMap.size) {
            const orphanLayer = [];
            for (const [guid, node] of nodeMap) {
                if (!visited.has(guid)) {
                    orphanLayer.push(node);
                }
            }
            if (orphanLayer.length > 0) {
                layers.push(orphanLayer);
            }
        }

        return layers
    }

    /**
     * Apply coordinates to nodes
     */
    /**
     * Apply coordinates to nodes
     */
    static _applyCoordinates(layers, blueprint) {
        const SPACING_X = 120;
        const SPACING_Y = 150;
        
        let initialX = 0;
        let initialY = 0;

        if (blueprint) {
            const processedNodes = new Set();
            layers.flat().forEach(n => processedNodes.add(n));

            // 1. Determine Reference Nodes
            // Prioritize selected nodes that are NOT part of the new batch
            let referenceNodes = blueprint.getNodes(true).filter(n => !processedNodes.has(n));
            
            if (referenceNodes.length === 0) {
                // No selection, use all existing nodes (excluding new ones)
                referenceNodes = blueprint.getNodes().filter(n => !processedNodes.has(n));
            }

            // 2. Calculate Bounding Box of reference nodes
            if (referenceNodes.length > 0) {
                let minX = Infinity;
                let maxY = -Infinity;

                referenceNodes.forEach(node => {
                    const x = node.entity.getNodePosX();
                    const y = node.entity.getNodePosY();
                    // Use approximated height if sizeY not ready (e.g. 120 default)
                    const h = node.sizeY > 0 ? node.sizeY : 120;

                    if (x < minX) minX = x;
                    if ((y + h) > maxY) maxY = y + h;
                });

                if (minX !== Infinity) initialX = minX;
                if (maxY !== -Infinity) initialY = maxY + 200; // Vertical Padding
            }
        }

        let currentX = initialX;

        layers.forEach(layer => {
            let currentY = initialY;
            let maxLayerWidth = 0;

            layer.forEach(node => {
                // Set Location
                node.setLocation(currentX, currentY);

                // Update Y
                // Use a default height estimate if sizeY is 0 (not rendered yet)
                const nodeHeight = node.sizeY > 0 ? node.sizeY : 120; 
                const nodeWidth = node.sizeX > 0 ? node.sizeX : 200;
                
                currentY += nodeHeight + SPACING_Y;
                maxLayerWidth = Math.max(maxLayerWidth, nodeWidth);
            });

            // Advance X
            currentX += maxLayerWidth + SPACING_X;
        });
    }
}

/**
 * Slim IR System Prompts
 * 
 * Simplified prompts that instruct the LLM to generate compact Slim IR JSON
 * instead of full T3D text. These prompts are significantly smaller than
 * the original T3D-based prompts (~2KB vs ~17KB).
 */

// ============================================================================
// Blueprint Slim IR Prompt
// ============================================================================

const SLIM_BLUEPRINT_PROMPT = `You are a UE5 Blueprint expert. Generate nodes in Slim IR JSON format.

OUTPUT FORMAT:
{"nodes":[...],"connections":[...]}

NODE STRUCTURE:
{"type":"NodeType","id":"UniqueId","pos":[X,Y],"inputs":{...},"field":"value"}

SUPPORTED TYPES:
- Event: event="ReceiveBeginPlay"|"ReceiveTick"
- CallFunction: function="PrintString"|"Delay"|"GetActorLocation"|"SetActorLocation"|"MakeVector"|"Multiply"|"Add"|"Subtract"|"Divide"|"Sin"|"Cos"|"Abs"|"GetGameTimeInSeconds"|"SetCustomPrimitiveDataFloat"
- Branch: (has Condition input, Then/Else outputs)
- Sequence: (multiple then outputs)
- CustomEvent: eventName="YourName"
- VariableGet: variableName="VarName" (reads variable, output pin is the value)
- VariableSet: variableName="VarName", inputs.value (writes variable, has Execute/Then)

COMMON FUNCTIONS:
- PrintString: inputs.InString="text"
- Delay: inputs.Duration=2.0
- MakeVector: inputs.X,Y,Z
- Sin, Abs, Multiply: use "A" (and "B") as input pin names.
- SetCustomPrimitiveDataFloat: inputs.Target (mesh), inputs.DataIndex (int), inputs.Value (float)
- Conv_FloatToString: inputs.InFloat=float, returns string. USE THIS before PrintString for floats.
- Conv_IntToString: inputs.InInt=int, returns string.
- Conv_VectorToString: inputs.InVec=vector, returns string.

NOTE: UE requires explicit conversion nodes (e.g. Conv_FloatToString) before connecting a float/int to PrintString's InString.

PIN NAMES:
- Execution: execute (in), then (out)
- Branch: Condition (in), true/false (out)

CONNECTIONS:
["sourceNodeId.pinName","targetNodeId.pinName"]

EXAMPLE - Print on BeginPlay:
{"nodes":[{"type":"Event","event":"ReceiveBeginPlay","id":"E0","pos":[0,0]},{"type":"CallFunction","function":"PrintString","id":"P0","pos":[300,0],"inputs":{"InString":"Hello!"}}],"connections":[["E0.then","P0.execute"]]}

EXAMPLE - Branch:
{"nodes":[{"type":"Event","event":"ReceiveBeginPlay","id":"E0","pos":[0,0]},{"type":"Branch","id":"B0","pos":[300,0]},{"type":"CallFunction","function":"PrintString","id":"T0","pos":[600,-100],"inputs":{"InString":"True"}},{"type":"CallFunction","function":"PrintString","id":"F0","pos":[600,100],"inputs":{"InString":"False"}}],"connections":[["E0.then","B0.execute"],["B0.true","T0.execute"],["B0.false","F0.execute"]]}

OUTPUT ONLY THE JSON. No explanations, no markdown.`;

// ============================================================================
// Material Slim IR Prompt
// ============================================================================

const SLIM_MATERIAL_PROMPT = `You are a UE5 Material expert. Generate nodes in Slim IR JSON format.

OUTPUT FORMAT:
{"nodes":[...],"connections":[...]}

NODE STRUCTURE:
{"type":"NodeType","id":"UniqueId","pos":[X,Y],"value":[...],"inputs":{...}}

SUPPORTED TYPES:
- Constant: value=1.0
- Constant3Vector: value=[R,G,B] (0.0-1.0)
- Multiply: (A,B inputs)
- Add: (A,B inputs)
- Lerp: (A,B,Alpha inputs)
- TextureSample: (UVs input)
- TexCoord: (no inputs)
- ScalarParameter: inputs.ParameterName,DefaultValue
- VectorParameter: inputs.ParameterName,DefaultValue
- Time: (no inputs)
- Sine: (Input)

PIN NAMES:
- Binary ops: A, B (in), out (out)
- Lerp: A, B, Alpha (in)
- Color: out, R, G, B, A (out)

EXAMPLE - Red color:
{"nodes":[{"type":"Constant3Vector","id":"C0","pos":[-400,0],"value":[1.0,0.0,0.0]}],"connections":[]}

EXAMPLE - Lerp two colors:
{"nodes":[{"type":"Constant3Vector","id":"A","pos":[-400,-100],"value":[1,0,0]},{"type":"Constant3Vector","id":"B","pos":[-400,100],"value":[0,0,1]},{"type":"ScalarParameter","id":"Blend","pos":[-400,0],"inputs":{"ParameterName":"BlendAmount","DefaultValue":0.5}},{"type":"Lerp","id":"Mix","pos":[-100,0]}],"connections":[["A.out","Mix.A"],["B.out","Mix.B"],["Blend.out","Mix.Alpha"]]}

OUTPUT ONLY THE JSON. No explanations, no markdown.`;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the appropriate Slim IR prompt based on graph mode
 * @param {string} graphMode - 'blueprint' or 'material'
 * @returns {string}
 */
function getSlimPrompt(graphMode) {
    return graphMode === 'material' ? SLIM_MATERIAL_PROMPT : SLIM_BLUEPRINT_PROMPT
}

/**
 * Slim IR Schema - Type definitions and validation
 * 
 * This module defines the Slim IR format specification and provides
 * validation utilities for ensuring IR correctness before conversion.
 */

// ============================================================================
// Blueprint Node Type Definitions
// ============================================================================

/**
 * Blueprint node type configurations
 * Each entry defines the UE class, default pins, and any special handling
 */
const BLUEPRINT_NODE_TYPES = {
    // Events
    Event: {
        class: '/Script/BlueprintGraph.K2Node_Event',
        pins: {
            output: ['then']
        },
        requiredFields: ['event'],
        eventMap: {
            'ReceiveBeginPlay': { memberParent: "/Script/CoreUObject.Class'/Script/Engine.Actor'", memberName: 'ReceiveBeginPlay' },
            'ReceiveTick': { memberParent: "/Script/CoreUObject.Class'/Script/Engine.Actor'", memberName: 'ReceiveTick' },
            'ReceiveDestroyed': { memberParent: "/Script/CoreUObject.Class'/Script/Engine.Actor'", memberName: 'ReceiveDestroyed' },
        }
    },
    
    CustomEvent: {
        class: '/Script/BlueprintGraph.K2Node_CustomEvent',
        pins: {
            output: ['then']
        },
        requiredFields: ['eventName']
    },
    
    // Function Calls
    CallFunction: {
        class: '/Script/BlueprintGraph.K2Node_CallFunction',
        pins: {
            input: ['execute'],
            output: ['then']
        },
        requiredFields: ['function'],
        functionMap: {
            'PrintString': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",
                memberName: 'PrintString',
                extraPins: {
                    input: [
                        { name: 'InString', type: 'string', default: 'Hello' },
                        { name: 'bPrintToScreen', type: 'bool', default: 'true', hidden: true },
                        { name: 'bPrintToLog', type: 'bool', default: 'true', hidden: true },
                        { name: 'TextColor', type: 'linearcolor', default: '(R=0.0,G=0.66,B=1.0,A=1.0)', hidden: true },
                        { name: 'Duration', type: 'float', default: '2.0', hidden: true }
                    ]
                }
            },
            'Delay': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",
                memberName: 'Delay',
                extraPins: {
                    input: [
                        { name: 'Duration', type: 'float', default: '0.2' }
                    ]
                }
            },
            'GetActorLocation': {
                memberName: 'K2_GetActorLocation',
                bSelfContext: true,
                extraPins: {
                    output: [
                        { name: 'ReturnValue', type: 'vector' }
                    ]
                }
            },
            'SetActorLocation': {
                memberName: 'K2_SetActorLocation',
                bSelfContext: true,
                extraPins: {
                    input: [
                        { name: 'NewLocation', type: 'vector' },
                        { name: 'bSweep', type: 'bool', default: 'false' },
                        { name: 'bTeleport', type: 'bool', default: 'false' }
                    ],
                    output: [
                        { name: 'ReturnValue', type: 'bool' }
                    ]
                }
            },
            'SpawnActor': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.GameplayStatics'",
                memberName: 'BeginDeferredActorSpawnFromClass',
                extraPins: {
                    input: [
                        { name: 'ActorClass', type: 'class' },
                        { name: 'SpawnTransform', type: 'transform' }
                    ],
                    output: [
                        { name: 'ReturnValue', type: 'object' }
                    ]
                }
            },
            'MakeVector': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'MakeVector',
                isPure: true,
                extraPins: {
                    input: [
                        { name: 'X', type: 'float', default: '0' },
                        { name: 'Y', type: 'float', default: '0' },
                        { name: 'Z', type: 'float', default: '0' }
                    ],
                    output: [
                        { name: 'ReturnValue', type: 'vector' }
                    ]
                }
            },
            'Conv_FloatToString': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetStringLibrary'",
                memberName: 'Conv_FloatToString',
                isPure: true,
                extraPins: {
                    input: [{ name: 'InFloat', type: 'float' }],
                    output: [{ name: 'ReturnValue', type: 'string' }]
                }
            },
            'Conv_IntToString': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetStringLibrary'",
                memberName: 'Conv_IntToString',
                isPure: true,
                extraPins: {
                    input: [{ name: 'InInt', type: 'int' }],
                    output: [{ name: 'ReturnValue', type: 'string' }]
                }
            },
            'Conv_BoolToString': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetStringLibrary'",
                memberName: 'Conv_BoolToString',
                isPure: true,
                extraPins: {
                    input: [{ name: 'InBool', type: 'bool' }],
                    output: [{ name: 'ReturnValue', type: 'string' }]
                }
            },
            'Conv_VectorToString': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetStringLibrary'",
                memberName: 'Conv_VectorToString',
                isPure: true,
                extraPins: {
                    input: [{ name: 'InVec', type: 'vector' }],
                    output: [{ name: 'ReturnValue', type: 'string' }]
                }
            },
            // Math Functions
            'Multiply': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'Multiply_DoubleDouble',
                isPure: true,
                extraPins: {
                    input: [{ name: 'A', type: 'double' }, { name: 'B', type: 'double' }],
                    output: [{ name: 'ReturnValue', type: 'double' }]
                }
            },
            'Add': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'Add_DoubleDouble',
                isPure: true,
                extraPins: {
                    input: [{ name: 'A', type: 'double' }, { name: 'B', type: 'double' }],
                    output: [{ name: 'ReturnValue', type: 'double' }]
                }
            },
            'Subtract': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'Subtract_DoubleDouble',
                isPure: true,
                extraPins: {
                    input: [{ name: 'A', type: 'double' }, { name: 'B', type: 'double' }],
                    output: [{ name: 'ReturnValue', type: 'double' }]
                }
            },
            'Divide': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'Divide_DoubleDouble',
                isPure: true,
                extraPins: {
                    input: [{ name: 'A', type: 'double' }, { name: 'B', type: 'double' }],
                    output: [{ name: 'ReturnValue', type: 'double' }]
                }
            },
            'Sin': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'Sin',
                isPure: true,
                extraPins: {
                    input: [{ name: 'A', type: 'double', default: '0.0' }],
                    output: [{ name: 'ReturnValue', type: 'double' }]
                }
            },
            'Cos': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'Cos',
                isPure: true,
                extraPins: {
                    input: [{ name: 'A', type: 'double', default: '0.0' }],
                    output: [{ name: 'ReturnValue', type: 'double' }]
                }
            },
            'Abs': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetMathLibrary'",
                memberName: 'Abs',
                isPure: true,
                extraPins: {
                    input: [{ name: 'A', type: 'double', default: '0.0' }],
                    output: [{ name: 'ReturnValue', type: 'double' }]
                }
            },
            'GetGameTimeInSeconds': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.KismetSystemLibrary'",
                memberName: 'GetGameTimeInSeconds',
                isPure: true,
                extraPins: {
                    input: [{ name: 'WorldContextObject', type: 'object', hidden: true }],
                    output: [{ name: 'ReturnValue', type: 'double' }]
                }
            },
            'SetCustomPrimitiveDataFloat': {
                memberParent: "/Script/CoreUObject.Class'/Script/Engine.PrimitiveComponent'",
                memberName: 'SetCustomPrimitiveDataFloat',
                extraPins: {
                    input: [
                        { name: 'Target', type: 'object' },
                        { name: 'DataIndex', type: 'int', default: '0' },
                        { name: 'Value', type: 'float', default: '0.0' }
                    ]
                }
            }
        }
    },
    
    // Flow Control
    Branch: {
        class: '/Script/BlueprintGraph.K2Node_IfThenElse',
        pins: {
            input: ['execute', 'Condition'],
            output: ['Then', 'Else']
        }
    },
    
    Sequence: {
        class: '/Script/BlueprintGraph.K2Node_ExecutionSequence',
        pins: {
            input: ['execute'],
            output: ['then 0', 'then 1']  // Dynamic, can have more
        }
    },
    
    DoOnce: {
        class: '/Script/BlueprintGraph.K2Node_MacroInstance',
        macroGraph: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:DoOnce",
        pins: {
            input: ['execute', 'Reset', 'Start Closed'],
            output: ['Completed']
        }
    },
    
    FlipFlop: {
        class: '/Script/BlueprintGraph.K2Node_MacroInstance',
        macroGraph: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:FlipFlop",
        pins: {
            input: ['execute'],
            output: ['A', 'B', 'IsA']
        }
    },
    
    ForEachLoop: {
        class: '/Script/BlueprintGraph.K2Node_MacroInstance',
        macroGraph: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoop",
        pins: {
            input: ['Exec', 'Array'],
            output: ['LoopBody', 'Array Element', 'Array Index', 'Completed']
        }
    },
    
    // Variables
    VariableGet: {
        class: '/Script/BlueprintGraph.K2Node_VariableGet',
        requiredFields: ['variableName'],
        pins: {
            output: ['value']
        }
    },
    
    VariableSet: {
        class: '/Script/BlueprintGraph.K2Node_VariableSet',
        requiredFields: ['variableName'],
        pins: {
            input: ['execute', 'value'],
            output: ['then']
        }
    },
    
    // Alias: LLM 可能会使用 'Variable' 而不是 'VariableGet'
    Variable: {
        class: '/Script/BlueprintGraph.K2Node_VariableGet',
        requiredFields: ['variableName'],
        pins: {
            output: ['value']
        },
        isAlias: true,  // 标记为别名，方便调试
        aliasOf: 'VariableGet'
    }
};

// ============================================================================
// Material Node Type Definitions
// ============================================================================

const MATERIAL_NODE_TYPES = {
    Constant: {
        class: '/Script/Engine.MaterialExpressionConstant',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        },
        properties: ['R']
    },
    
    Constant3Vector: {
        class: '/Script/Engine.MaterialExpressionConstant3Vector',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        },
        properties: ['Constant']  // (R=,G=,B=,A=)
    },
    
    Constant4Vector: {
        class: '/Script/Engine.MaterialExpressionConstant4Vector',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        },
        properties: ['Constant']
    },
    
    Add: {
        class: '/Script/Engine.MaterialExpressionAdd',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['A', 'B'],
            output: ['Output']
        }
    },
    
    Multiply: {
        class: '/Script/Engine.MaterialExpressionMultiply',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['A', 'B'],
            output: ['Output']
        }
    },
    
    Lerp: {
        class: '/Script/Engine.MaterialExpressionLinearInterpolate',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['A', 'B', 'Alpha'],
            output: ['Output']
        }
    },
    
    TextureSample: {
        class: '/Script/Engine.MaterialExpressionTextureSample',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['UVs'],
            output: ['RGB', 'R', 'G', 'B', 'A']
        }
    },
    
    TexCoord: {
        class: '/Script/Engine.MaterialExpressionTextureCoordinate',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        }
    },
    
    ScalarParameter: {
        class: '/Script/Engine.MaterialExpressionScalarParameter',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        requiredFields: ['parameterName'],
        pins: {
            output: ['Output']
        },
        properties: ['ParameterName', 'DefaultValue']
    },
    
    VectorParameter: {
        class: '/Script/Engine.MaterialExpressionVectorParameter',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        requiredFields: ['parameterName'],
        pins: {
            output: ['Output']
        },
        properties: ['ParameterName', 'DefaultValue']
    },
    
    Time: {
        class: '/Script/Engine.MaterialExpressionTime',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            output: ['Output']
        }
    },
    
    Sine: {
        class: '/Script/Engine.MaterialExpressionSine',
        wrapperClass: '/Script/UnrealEd.MaterialGraphNode',
        pins: {
            input: ['Input'],
            output: ['Output']
        }
    }
};

// ============================================================================
// Pin Type Definitions
// ============================================================================

const PIN_TYPES = {
    exec: {
        category: 'exec',
        subCategory: '',
        subCategoryObject: 'None'
    },
    bool: {
        category: 'bool',
        subCategory: '',
        subCategoryObject: 'None'
    },
    int: {
        category: 'int',
        subCategory: '',
        subCategoryObject: 'None'
    },
    float: {
        category: 'real',
        subCategory: 'float',
        subCategoryObject: 'None'
    },
    double: {
        category: 'real',
        subCategory: 'double',
        subCategoryObject: 'None'
    },
    string: {
        category: 'string',
        subCategory: '',
        subCategoryObject: 'None'
    },
    vector: {
        category: 'struct',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Vector'"
    },
    rotator: {
        category: 'struct',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Rotator'"
    },
    transform: {
        category: 'struct',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.Transform'"
    },
    object: {
        category: 'object',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.Class'/Script/CoreUObject.Object'"
    },
    class: {
        category: 'class',
        subCategory: '',
        subCategoryObject: 'None'
    },
    linearcolor: {
        category: 'struct',
        subCategory: '',
        subCategoryObject: "/Script/CoreUObject.ScriptStruct'/Script/CoreUObject.LinearColor'"
    }
};

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate a Slim IR object
 * @param {Object} ir - The Slim IR to validate
 * @param {string} graphMode - 'blueprint' or 'material'
 * @returns {{valid: boolean, errors: string[]}}
 */
function validateSlimIR(ir, graphMode = 'blueprint') {
    const errors = [];
    
    // Check top-level structure
    if (!ir || typeof ir !== 'object') {
        return { valid: false, errors: ['IR must be an object'] }
    }
    
    if (!Array.isArray(ir.nodes)) {
        errors.push('IR.nodes must be an array');
    }
    
    if (!Array.isArray(ir.connections)) {
        errors.push('IR.connections must be an array');
    }
    
    if (errors.length > 0) {
        return { valid: false, errors }
    }
    
    const nodeTypes = graphMode === 'material' ? MATERIAL_NODE_TYPES : BLUEPRINT_NODE_TYPES;
    const nodeIds = new Set();
    
    // Validate each node
    for (let i = 0; i < ir.nodes.length; i++) {
        const node = ir.nodes[i];
        const prefix = `nodes[${i}]`;
        
        // Required fields
        if (!node.type) {
            errors.push(`${prefix}: missing 'type'`);
        } else if (!nodeTypes[node.type]) {
            errors.push(`${prefix}: unknown type '${node.type}'`);
        }
        
        if (!node.id) {
            errors.push(`${prefix}: missing 'id'`);
        } else if (nodeIds.has(node.id)) {
            errors.push(`${prefix}: duplicate id '${node.id}'`);
        } else {
            nodeIds.add(node.id);
        }
        
        if (!Array.isArray(node.pos) || node.pos.length !== 2) {
            errors.push(`${prefix}: 'pos' must be [x, y] array`);
        }
        
        // Type-specific required fields
        if (node.type && nodeTypes[node.type]?.requiredFields) {
            for (const field of nodeTypes[node.type].requiredFields) {
                if (node[field] === undefined && (!node.inputs || node.inputs[field] === undefined)) {
                    errors.push(`${prefix}: missing required field '${field}' for type '${node.type}'`);
                }
            }
        }
    }
    
    // Validate connections
    for (let i = 0; i < ir.connections.length; i++) {
        const conn = ir.connections[i];
        const prefix = `connections[${i}]`;
        
        if (!Array.isArray(conn) || conn.length !== 2) {
            errors.push(`${prefix}: must be [source, target] array`);
            continue
        }
        
        const [source, target] = conn;
        
        // Validate format "nodeId.pinName"
        for (const [label, pinRef] of [['source', source], ['target', target]]) {
            if (typeof pinRef !== 'string' || !pinRef.includes('.')) {
                errors.push(`${prefix}: ${label} must be "nodeId.pinName" format`);
            } else {
                const [nodeId] = pinRef.split('.');
                if (!nodeIds.has(nodeId)) {
                    errors.push(`${prefix}: ${label} references unknown node '${nodeId}'`);
                }
            }
        }
    }
    
    return { valid: errors.length === 0, errors }
}

/**
 * Get function configuration for CallFunction nodes
 * @param {string} functionName - Function name
 * @returns {Object|null}
 */
function getFunctionConfig(functionName) {
    return BLUEPRINT_NODE_TYPES.CallFunction.functionMap[functionName] || null
}

/**
 * Slim IR to T3D Converter
 * 
 * Converts compact Slim IR JSON format to full Unreal Engine T3D text.
 * This is the core transformation engine for the Slim IR system.
 */

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate a random 32-character uppercase hex GUID
 * @returns {string}
 */
function generateGUID() {
    const chars = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += chars[Math.floor(Math.random() * 16)];
    }
    return result
}

/**
 * Build a complete CustomProperties Pin definition
 * @param {Object} options - Pin options
 * @returns {string}
 */
function buildPin(options) {
    const {
        pinId,
        pinName,
        type = 'exec',
        isOutput = false,
        defaultValue = null,
        linkedTo = null,
        hidden = false,
        friendlyName = null
    } = options;
    
    const typeConfig = PIN_TYPES[type] || PIN_TYPES.exec;
    
    // Build the pin string piece by piece (no trailing commas until the end)
    let pin = `PinId=${pinId},PinName="${pinName}"`;
    
    if (friendlyName) {
        pin += `,PinFriendlyName="${friendlyName}"`;
    }
    
    // Direction (only for output pins)
    if (isOutput) {
        pin += `,Direction="EGPD_Output"`;
    }
    
    // PinType fields
    pin += `,PinType.PinCategory="${typeConfig.category}"`;
    pin += `,PinType.PinSubCategory="${typeConfig.subCategory}"`;
    pin += `,PinType.PinSubCategoryObject=${typeConfig.subCategoryObject}`;
    pin += `,PinType.PinSubCategoryMemberReference=()`;
    pin += `,PinType.PinValueType=()`;
    pin += `,PinType.ContainerType=None`;
    pin += `,PinType.bIsReference=False`;
    pin += `,PinType.bIsConst=False`;
    pin += `,PinType.bIsWeakPointer=False`;
    pin += `,PinType.bIsUObjectWrapper=False`;
    pin += `,PinType.bSerializeAsSinglePrecisionFloat=False`;
    
    // LinkedTo (before PersistentGuid, matching UE format)
    if (linkedTo && linkedTo.length > 0) {
        pin += `,LinkedTo=(${linkedTo.join(',')},)`;
    }
    
    // Default value
    if (defaultValue !== null && defaultValue !== undefined) {
        pin += `,DefaultValue="${defaultValue}"`;
    }
    
    // Standard flags
    pin += `,PersistentGuid=00000000000000000000000000000000`;
    pin += `,bHidden=${hidden ? 'True' : 'False'}`;
    pin += `,bNotConnectable=False`;
    pin += `,bDefaultValueIsReadOnly=False`;
    pin += `,bDefaultValueIsIgnored=False`;
    pin += `,bAdvancedView=False`;
    pin += `,bOrphanedPin=False`;
    
    // Trailing comma before closing paren (UE format)
    // result should NOT end with a comma if we want a clean injection later, 
    // but UE usually has one. Let's stick to UE format.
    pin += `,`;
    
    return `CustomProperties Pin (${pin})`
}

// ============================================================================
// Node Context for Conversion
// ============================================================================

/**
 * Conversion context - tracks nodes, pins, and connections
 */
class ConversionContext {
    constructor(graphMode) {
        this.graphMode = graphMode;
        this.nodeMap = new Map();      // id -> { t3dName, config }
        this.pinMap = new Map();       // "nodeId.pinName" -> { nodeName, pinId }
        this.connectionMap = new Map(); // "nodeId.pinName" (target) -> [{nodeName, pinId}] (sources)
        this.nodeCounter = {
            Event: 0,
            CallFunction: 0,
            Branch: 0,
            Sequence: 0,
            MacroInstance: 0,
            VariableGet: 0,
            VariableSet: 0,
            // Material
            GraphNode: 0
        };
    }
    
    /**
     * Get next T3D node name for a type
     * @param {string} nodeClass - UE node class
     * @returns {string}
     */
    getNextNodeName(nodeClass) {
        // Extract simple class name
        const className = nodeClass.split('.').pop();
        const count = this.nodeCounter[className] || 0;
        this.nodeCounter[className] = count + 1;
        return `${className}_${count}`
    }
    
    /**
     * Register a pin for connection lookup
     * @param {string} nodeId - Slim IR node id
     * @param {string} pinName - Pin name
     * @param {string} t3dNodeName - T3D node name
     * @param {string} pinId - Generated pin GUID
     */
    registerPin(nodeId, pinName, t3dNodeName, pinId) {
        const key = `${nodeId}.${pinName}`;
        this.pinMap.set(key, { nodeName: t3dNodeName, pinId });
    }
    
    /**
     * Get pin info by key
     * @param {string} key - "nodeId.pinName"
     * @returns {Object|null}
     */
    getPin(key) {
        return this.pinMap.get(key) || null
    }
    
    /**
     * Process connections and build connectionMap
     * @param {Array} connections - IR connections array
     */
    processConnections(connections) {
        for (const [source, target] of connections) {
            const sourcePin = this.pinMap.get(source);
            const targetPin = this.pinMap.get(target);
            
            if (sourcePin && targetPin) {
                // Bidirectional connections
                // 1. Source -> Target (Output side)
                if (!this.connectionMap.has(source)) {
                    this.connectionMap.set(source, []);
                }
                this.connectionMap.get(source).push({
                    nodeName: targetPin.nodeName,
                    pinId: targetPin.pinId
                });

                // 2. Target -> Source (Input side)
                if (!this.connectionMap.has(target)) {
                    this.connectionMap.set(target, []);
                }
                this.connectionMap.get(target).push({
                    nodeName: sourcePin.nodeName,
                    pinId: sourcePin.pinId
                });
            }
        }
    }
    
    /**
     * Get LinkedTo string for a pin
     * @param {string} key - "nodeId.pinName"
     * @returns {string[]|null}
     */
    getLinkedTo(key) {
        const connections = this.connectionMap.get(key);
        if (!connections || connections.length === 0) return null
        return connections.map(c => `${c.nodeName} ${c.pinId}`)
    }
}

// ============================================================================
// Blueprint Node Converters
// ============================================================================

/**
 * Convert Event node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertEventNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.Event;
    const eventConfig = config.eventMap[node.event] || {
        memberParent: "/Script/CoreUObject.Class'/Script/Engine.Actor'",
        memberName: node.event
    };
    
    const nodeName = ctx.getNextNodeName('K2Node_Event');
    const nodeGuid = generateGUID();
    const thenPinId = generateGUID();
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config });
    ctx.registerPin(node.id, 'Then', nodeName, thenPinId);
    ctx.registerPin(node.id, 'then', nodeName, thenPinId); // Alias
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    EventReference=(MemberParent="${eventConfig.memberParent}",MemberName="${eventConfig.memberName}")`,
        `    bOverrideFunction=True`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: thenPinId, pinName: 'Then', type: 'exec', isOutput: true })}`,
        `End Object`
    ];
    
    return lines.join('\n')
}

/**
 * Convert CallFunction node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertCallFunctionNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.CallFunction;
    const funcConfig = getFunctionConfig(node.function) || {
        memberName: node.function
    };
    
    const nodeName = ctx.getNextNodeName('K2Node_CallFunction');
    const nodeGuid = generateGUID();
    const executePinId = generateGUID();
    const thenPinId = generateGUID();
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config });
    ctx.registerPin(node.id, 'Execute', nodeName, executePinId);
    ctx.registerPin(node.id, 'execute', nodeName, executePinId); // Alias
    ctx.registerPin(node.id, 'then', nodeName, thenPinId);
    
    // Build FunctionReference
    let funcRef;
    if (funcConfig.bSelfContext) {
        funcRef = `FunctionReference=(MemberName="${funcConfig.memberName}",bSelfContext=True)`;
    } else if (funcConfig.memberParent) {
        funcRef = `FunctionReference=(MemberParent="${funcConfig.memberParent}",MemberName="${funcConfig.memberName}")`;
    } else {
        funcRef = `FunctionReference=(MemberName="${funcConfig.memberName}")`;
    }
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    ${funcRef}`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`
    ];
    
    // Add isPure if applicable
    if (funcConfig.isPure) {
        lines.splice(2, 0, `    bIsPureFunc=True`);
    }
    
    // Add Execute pin (only for non-pure functions)
    if (!funcConfig.isPure) {
        lines.push(`    ${buildPin({ pinId: executePinId, pinName: 'Execute', type: 'exec' })}`);
        lines.push(`    ${buildPin({ pinId: thenPinId, pinName: 'then', type: 'exec', isOutput: true })}`);
    }
    
    // Add extra input pins
    if (funcConfig.extraPins?.input) {
        for (const pin of funcConfig.extraPins.input) {
            const pinId = generateGUID();
            const inputValue = node.inputs?.[pin.name] ?? pin.default;
            ctx.registerPin(node.id, pin.name, nodeName, pinId);
            
            lines.push(`    ${buildPin({
                pinId,
                pinName: pin.name,
                type: pin.type,
                defaultValue: inputValue,
                hidden: pin.hidden
            })}`);
        }
    }
    
    // Add extra output pins
    if (funcConfig.extraPins?.output) {
        for (const pin of funcConfig.extraPins.output) {
            const pinId = generateGUID();
            ctx.registerPin(node.id, pin.name, nodeName, pinId);
            
            lines.push(`    ${buildPin({
                pinId,
                pinName: pin.name,
                type: pin.type,
                isOutput: true
            })}`);
        }
    }
    
    lines.push(`End Object`);
    return lines.join('\n')
}

/**
 * Convert Branch node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertBranchNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.Branch;
    const nodeName = ctx.getNextNodeName('K2Node_IfThenElse');
    const nodeGuid = generateGUID();
    
    const executePinId = generateGUID();
    const conditionPinId = generateGUID();
    const thenPinId = generateGUID();
    const elsePinId = generateGUID();
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config });
    ctx.registerPin(node.id, 'Execute', nodeName, executePinId);
    ctx.registerPin(node.id, 'execute', nodeName, executePinId); // Alias
    ctx.registerPin(node.id, 'Condition', nodeName, conditionPinId);
    ctx.registerPin(node.id, 'Then', nodeName, thenPinId);
    ctx.registerPin(node.id, 'true', nodeName, thenPinId);  // Alias
    ctx.registerPin(node.id, 'Else', nodeName, elsePinId);
    ctx.registerPin(node.id, 'false', nodeName, elsePinId);  // Alias
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: executePinId, pinName: 'Execute', type: 'exec' })}`,
        `    ${buildPin({ pinId: conditionPinId, pinName: 'Condition', type: 'bool' })}`,
        `    ${buildPin({ pinId: thenPinId, pinName: 'Then', type: 'exec', isOutput: true })}`,
        `    ${buildPin({ pinId: elsePinId, pinName: 'Else', type: 'exec', isOutput: true })}`,
        `End Object`
    ];
    
    return lines.join('\n')
}

/**
 * Convert Sequence node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertSequenceNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.Sequence;
    const nodeName = ctx.getNextNodeName('K2Node_ExecutionSequence');
    const nodeGuid = generateGUID();
    
    const executePinId = generateGUID();
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config });
    ctx.registerPin(node.id, 'Execute', nodeName, executePinId);
    ctx.registerPin(node.id, 'execute', nodeName, executePinId); // Alias
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: executePinId, pinName: 'Execute', type: 'exec' })}`
    ];
    
    // Add output pins (default 2, can be more based on connections)
    const numOutputs = node.outputs || 2;
    for (let i = 0; i < numOutputs; i++) {
        const pinId = generateGUID();
        const pinName = `then ${i}`;
        ctx.registerPin(node.id, pinName, nodeName, pinId);
        lines.push(`    ${buildPin({ pinId, pinName, type: 'exec', isOutput: true })}`);
    }
    
    lines.push(`End Object`);
    return lines.join('\n')
}

/**
 * Convert CustomEvent node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertCustomEventNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.CustomEvent;
    const nodeName = ctx.getNextNodeName('K2Node_CustomEvent');
    const nodeGuid = generateGUID();
    const thenPinId = generateGUID();
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config });
    ctx.registerPin(node.id, 'Then', nodeName, thenPinId);
    ctx.registerPin(node.id, 'then', nodeName, thenPinId); // Alias
    
    const eventName = node.eventName || node.inputs?.eventName || 'CustomEvent';
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    CustomFunctionName="${eventName}"`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: thenPinId, pinName: 'then', type: 'exec', isOutput: true })}`,
        `End Object`
    ];
    
    return lines.join('\n')
}

// ============================================================================
// Variable Node Converters
// ============================================================================

/**
 * Convert VariableGet node to T3D
 * 将 VariableGet 节点转换为 T3D 格式
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertVariableGetNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.VariableGet;
    const nodeName = ctx.getNextNodeName('K2Node_VariableGet');
    const nodeGuid = generateGUID();
    const valuePinId = generateGUID();
    const selfPinId = generateGUID();
    
    // 变量名可以来自 variableName 字段或 inputs.variableName
    const variableName = node.variableName || node.inputs?.variableName || 'NewVar';
    // 变量类型，默认为 float
    const variableType = node.variableType || node.inputs?.variableType || 'float';
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config });
    ctx.registerPin(node.id, variableName, nodeName, valuePinId);
    ctx.registerPin(node.id, 'value', nodeName, valuePinId); // Alias
    ctx.registerPin(node.id, 'out', nodeName, valuePinId);   // Alias
    ctx.registerPin(node.id, 'Output', nodeName, valuePinId); // Alias
    
    // 构建 VariableReference
    generateGUID();
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    VariableReference=(MemberName="${variableName}",bSelfContext=True)`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: selfPinId, pinName: 'self', type: 'object', hidden: true })}`,
        `    ${buildPin({ pinId: valuePinId, pinName: variableName, type: variableType, isOutput: true })}`,
        `End Object`
    ];
    
    return lines.join('\n')
}

/**
 * Convert VariableSet node to T3D
 * 将 VariableSet 节点转换为 T3D 格式
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertVariableSetNode(node, ctx) {
    const config = BLUEPRINT_NODE_TYPES.VariableSet;
    const nodeName = ctx.getNextNodeName('K2Node_VariableSet');
    const nodeGuid = generateGUID();
    const executePinId = generateGUID();
    const thenPinId = generateGUID();
    const valuePinId = generateGUID();
    const outputPinId = generateGUID();
    const selfPinId = generateGUID();
    
    // 变量名可以来自 variableName 字段或 inputs.variableName
    const variableName = node.variableName || node.inputs?.variableName || 'NewVar';
    // 变量类型，默认为 float
    const variableType = node.variableType || node.inputs?.variableType || 'float';
    // 默认值
    const defaultValue = node.inputs?.value ?? node.value ?? '';
    
    ctx.nodeMap.set(node.id, { t3dName: nodeName, config });
    ctx.registerPin(node.id, 'Execute', nodeName, executePinId);
    ctx.registerPin(node.id, 'execute', nodeName, executePinId); // Alias
    ctx.registerPin(node.id, 'then', nodeName, thenPinId);
    ctx.registerPin(node.id, 'value', nodeName, valuePinId);
    ctx.registerPin(node.id, variableName, nodeName, valuePinId);  // 用变量名作为 pin 名的别名
    ctx.registerPin(node.id, 'out', nodeName, outputPinId);  // 输出 pin
    
    // 构建 VariableReference
    generateGUID();
    
    const lines = [
        `Begin Object Class=${config.class} Name="${nodeName}"`,
        `    VariableReference=(MemberName="${variableName}",bSelfContext=True)`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: executePinId, pinName: 'Execute', type: 'exec' })}`,
        `    ${buildPin({ pinId: thenPinId, pinName: 'Then', type: 'exec', isOutput: true })}`,
        `    ${buildPin({ pinId: selfPinId, pinName: 'self', type: 'object', hidden: true })}`,
        `    ${buildPin({ pinId: valuePinId, pinName: variableName, type: variableType, defaultValue: defaultValue })}`,
        `    ${buildPin({ pinId: outputPinId, pinName: variableName, type: variableType, isOutput: true })}`,
        `End Object`
    ];
    
    return lines.join('\n')
}

// ============================================================================
// Material Node Converters
// ============================================================================

/**
 * Convert Material Constant3Vector node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertConstant3VectorNode(node, ctx) {
    const config = MATERIAL_NODE_TYPES.Constant3Vector;
    const wrapperName = `MaterialGraphNode_${ctx.nodeCounter.GraphNode++}`;
    const exprName = `MaterialExpressionConstant3Vector_${ctx.nodeCounter.GraphNode}`;
    const nodeGuid = generateGUID();
    const exprGuid = generateGUID();
    const outputPinId = generateGUID();
    
    ctx.nodeMap.set(node.id, { t3dName: wrapperName, exprName });
    ctx.registerPin(node.id, 'out', wrapperName, outputPinId);
    ctx.registerPin(node.id, 'Output', wrapperName, outputPinId);
    
    const value = node.value || [1, 1, 1];
    const [r, g, b] = value;
    
    const lines = [
        `Begin Object Class=${config.wrapperClass} Name="${wrapperName}"`,
        `    Begin Object Class=${config.class} Name="${exprName}"`,
        `    End Object`,
        `    Begin Object Name="${exprName}"`,
        `        Constant=(R=${r},G=${g},B=${b},A=0.0)`,
        `        MaterialExpressionEditorX=${node.pos[0]}`,
        `        MaterialExpressionEditorY=${node.pos[1]}`,
        `        MaterialExpressionGuid=${exprGuid}`,
        `    End Object`,
        `    MaterialExpression=${config.class}'"${exprName}"'`,
        `    NodePosX=${node.pos[0]}`,
        `    NodePosY=${node.pos[1]}`,
        `    NodeGuid=${nodeGuid}`,
        `    ${buildPin({ pinId: outputPinId, pinName: 'Output', type: 'mask', isOutput: true })}`,
        `End Object`
    ];
    
    return lines.join('\n')
}

// ============================================================================
// Main Converter
// ============================================================================

/**
 * Convert a Slim IR node to T3D
 * @param {Object} node - Slim IR node
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function convertNode(node, ctx) {
    if (ctx.graphMode === 'material') {
        switch (node.type) {
            case 'Constant3Vector': return convertConstant3VectorNode(node, ctx)
            // Add more material node converters here
            default:
                console.warn(`[SlimIRToT3D] Unknown material node type: ${node.type}`);
                return ''
        }
    } else {
        switch (node.type) {
            case 'Event': return convertEventNode(node, ctx)
            case 'CallFunction': return convertCallFunctionNode(node, ctx)
            case 'Branch': return convertBranchNode(node, ctx)
            case 'Sequence': return convertSequenceNode(node, ctx)
            case 'CustomEvent': return convertCustomEventNode(node, ctx)
            case 'Variable':      // LLM 可能使用的别名
            case 'VariableGet': return convertVariableGetNode(node, ctx)
            case 'VariableSet': return convertVariableSetNode(node, ctx)
            // Add more blueprint node converters here
            default:
                console.warn(`[SlimIRToT3D] Unknown blueprint node type: ${node.type}`);
                return ''
        }
    }
}

/**
 * Inject LinkedTo connections into T3D
 * @param {string} t3d - Generated T3D
 * @param {ConversionContext} ctx - Conversion context
 * @returns {string}
 */
function injectConnections(t3d, ctx) {
    let result = t3d;
    
    for (const [pinKey, connections] of ctx.connectionMap) {
        const pinInfo = ctx.pinMap.get(pinKey);
        if (!pinInfo || connections.length === 0) continue
        
        const linkedToStr = `LinkedTo=(${connections.map(c => `${c.nodeName} ${c.pinId}`).join(',')},)`;
        
        // Find the pin by its PinId and inject LinkedTo before bOrphanedPin=False
        // Use string search instead of regex to avoid issues with nested parentheses
        const pinIdMarker = `PinId=${pinInfo.pinId}`;
        const pinStart = result.indexOf(pinIdMarker);
        
        if (pinStart === -1) {
            console.warn(`[SlimIRToT3D] Could not find pin ${pinInfo.pinId} for connection injection`);
            continue
        }
        
        // Find the bOrphanedPin=False after this pin's start
        const orphanMarker = ',bOrphanedPin=False';
        const orphanPos = result.indexOf(orphanMarker, pinStart);
        
        if (orphanPos === -1) {
            console.warn(`[SlimIRToT3D] Could not find bOrphanedPin for pin ${pinInfo.pinId}`);
            continue
        }
        
        // Insert LinkedTo before bOrphanedPin
        // Note: buildPin adds a trailing comma, so we should too before LinkedTo
        result = result.substring(0, orphanPos) + ',' + linkedToStr + result.substring(orphanPos);
    }
    
    return result
}

/**
 * Main conversion function: Slim IR → T3D
 * @param {Object} ir - Slim IR object
 * @param {string} graphMode - 'blueprint' or 'material'
 * @returns {{success: boolean, t3d?: string, errors?: string[]}}
 */
function convertSlimIRToT3D(ir, graphMode = 'blueprint') {
    // Validate first
    const validation = validateSlimIR(ir, graphMode);
    if (!validation.valid) {
        return { success: false, errors: validation.errors }
    }
    
    const ctx = new ConversionContext(graphMode);
    
    // Phase 1: Convert all nodes (this also registers pins)
    const nodeT3Ds = [];
    for (const node of ir.nodes) {
        const t3d = convertNode(node, ctx);
        if (t3d) {
            nodeT3Ds.push(t3d);
        }
    }
    
    // Phase 2: Process connections
    ctx.processConnections(ir.connections);
    
    // Phase 3: Combine and inject connections
    let t3d = nodeT3Ds.join('\n');
    t3d = injectConnections(t3d, ctx);
    
    return { success: true, t3d }
}

/**
 * Node Example Service
 * Provides dynamic few-shot example injection based on user prompts
 */

/**
 * Chinese to English keyword mapping for UE Blueprint/Material nodes
 * Supports single word → single/multiple English keywords
 */
const ZH_KEYWORD_MAP = {
    // === Flow Control ===
    '分支': 'branch',
    '条件': 'branch',
    '判断': 'branch',
    '如果': 'branch',
    '延迟': 'delay',
    '等待': 'delay',
    '延时': 'delay',
    '序列': 'sequence',
    '顺序': 'sequence',
    '循环': ['foreach', 'loop', 'while'],
    '遍历': 'foreach',
    '迭代': 'foreach',
    '多路': 'multigate',
    '选择器': 'switch',
    '切换': 'switch',
    '触发一次': 'doonce',
    '单次': 'doonce',
    '翻转': 'flipflop',
    '时间线': 'timeline',
    
    // === Events ===
    '事件': 'event',
    '开始': ['begin', 'start'],
    '开始播放': 'beginplay',
    '游戏开始': 'beginplay',
    '结束': ['end', 'finish', 'stop'],
    '构造': 'construction',
    '重叠': 'overlap',
    '碰撞': ['hit', 'collision'],
    '点击': 'click',
    '按键': ['key', 'input'],
    '鼠标': 'mouse',
    '触摸': 'touch',
    
    // === Math ===
    '加': 'add',
    '加法': 'add',
    '减': 'subtract',
    '减法': 'subtract',
    '乘': 'multiply',
    '乘法': 'multiply',
    '除': 'divide',
    '除法': 'divide',
    '数学': ['add', 'subtract', 'multiply', 'divide', 'math'],
    '绝对值': 'abs',
    '正弦': 'sin',
    '余弦': 'cos',
    '平方根': 'sqrt',
    '对数': 'log',
    '比较': ['equal', 'greater', 'less', 'compare'],
    '等于': 'equal',
    '大于': 'greater',
    '小于': 'less',
    '与': 'and',
    '或': 'or',
    '非': 'not',
    '异或': 'xor',
    '位运算': ['bitwise', 'and', 'or', 'xor', 'not'],
    
    // === Variables & Debug ===
    '打印': 'print',
    '输出': 'print',
    '调试': ['debug', 'print'],
    '日志': ['log', 'print'],
    '获取': 'get',
    '设置': 'set',
    '变量': 'variable',
    '自身': 'self',
    '有效': 'valid',
    '检查': 'valid',
    
    // === Actor & Transform ===
    '生成': 'spawn',
    '创建': ['spawn', 'create'],
    '销毁': 'destroy',
    '移动': 'move',
    '旋转': 'rotation',
    '缩放': 'scale',
    '位置': ['location', 'position', 'transform'],
    '变换': 'transform',
    '转换': ['convert', 'transform'],
    '跳跃': 'jump',
    '角色': 'character',
    '演员': 'actor',
    
    // === Trace & Collision ===
    '射线': ['trace', 'line'],
    '射线检测': 'linetrace',
    '检测': 'trace',
    '碰撞检测': ['trace', 'collision'],
    
    // === Material ===
    '材质': 'material',
    '纹理': 'texture',
    '采样': 'sample',
    '颜色': ['color', 'vector'],
    '向量': 'vector',
    '常量': 'constant',
    '注释': 'comment',
    
    // === Common Actions ===
    '绑定': 'bind',
    '解绑': 'unbind',
    '委托': 'delegate',
    '函数': 'function',
    '调用': 'call',
};

/**
 * Translate Chinese keywords to English
 * @param {string[]} keywords - Array of keywords (may contain Chinese)
 * @returns {string[]} Translated keywords (all English)
 */
function translateKeywords(keywords) {
    const result = [];
    
    for (const keyword of keywords) {
        // Check if it's a Chinese keyword
        const translation = ZH_KEYWORD_MAP[keyword];
        if (translation) {
            if (Array.isArray(translation)) {
                result.push(...translation);
            } else {
                result.push(translation);
            }
        } else {
            // Keep original if no translation (might be English or unknown)
            result.push(keyword);
        }
    }
    
    // Also try to extract Chinese phrases and translate individual characters
    for (const keyword of keywords) {
        // Check for partial matches in the keyword
        for (const [zh, en] of Object.entries(ZH_KEYWORD_MAP)) {
            if (keyword.includes(zh) && !result.includes(Array.isArray(en) ? en[0] : en)) {
                if (Array.isArray(en)) {
                    result.push(...en);
                } else {
                    result.push(en);
                }
            }
        }
    }
    
    return [...new Set(result)] // Remove duplicates
}

// Cache for loaded templates
let nodeTemplatesCache = null;

/**
 * Load node templates (cached after first load)
 * @returns {Promise<Object>} Node templates data
 */
async function loadNodeTemplates() {
    if (nodeTemplatesCache) {
        return nodeTemplatesCache
    }
    
    try {
        // Use absolute path from site root since compiled code runs from /dist
        const response = await fetch('/js/ai/nodeTemplates.json');
        if (!response.ok) {
            console.warn('Failed to load node templates:', response.status);
            return { templates: [] }
        }
        nodeTemplatesCache = await response.json();
        return nodeTemplatesCache
    } catch (error) {
        console.warn('Failed to load node templates:', error);
        return { templates: [] }
    }
}

/**
 * Search for relevant node examples based on user prompt
 * @param {string} userPrompt - The user's generation request
 * @param {string} graphType - 'blueprint' or 'material'
 * @param {number} maxExamples - Maximum number of examples to return
 * @returns {Promise<Array<{name: string, functionName: string|null, t3d: string}>>} Matching examples
 */
async function findRelevantExamples(userPrompt, graphType = 'blueprint', maxExamples = 2) {
    const nodeTemplates = await loadNodeTemplates();
    const prompt = userPrompt.toLowerCase();
    
    // Extract keywords from prompt (preserve Chinese characters)
    // Step 1: Extract English words
    const englishKeywords = prompt
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2);
    
    // Step 2: Extract Chinese phrases (continuous Chinese character sequences)
    const chineseMatches = userPrompt.match(/[\u4e00-\u9fa5]+/g) || [];
    
    // Step 3: Translate Chinese keywords to English
    const translatedKeywords = translateKeywords(chineseMatches);
    
    // Step 4: Combine all keywords
    const keywords = [...new Set([...englishKeywords, ...translatedKeywords])];
    
    // Filter templates by type
    const candidates = nodeTemplates.templates.filter(t => t.type === graphType);
    
    // Score each template based on keyword matches
    const scored = candidates.map(template => {
        let score = 0;
        const name = template.name.toLowerCase();
        const funcName = (template.functionName || '').toLowerCase();
        
        for (const keyword of keywords) {
            // Exact name match - highest priority
            if (name === keyword) {
                score += 100;
            }
            // Name contains keyword
            else if (name.includes(keyword)) {
                score += 10;
            }
            // Function name contains keyword
            else if (funcName.includes(keyword)) {
                score += 8;
            }
        }
        
        // Prioritize common useful nodes
        const commonNodes = ['branch', 'delay', 'print', 'sequence', 'foreach', 'doonce', 'event'];
        if (commonNodes.some(cn => name.includes(cn))) {
            score += 2;
        }
        
        return { template, score }
    });
    
    // Sort by score and return top matches
    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxExamples)
        .map(s => ({
            name: s.template.name,
            functionName: s.template.functionName,
            t3d: s.template.t3d
        }))
}

/**
 * Format examples for injection into system prompt
 * @param {Array<{name: string, functionName: string|null, t3d: string}>} examples 
 * @returns {string} Formatted examples section
 */
function formatExamplesForPrompt(examples) {
    if (!examples || examples.length === 0) {
        return ''
    }
    
    const formattedExamples = examples.map(ex => {
        // Clean up the T3D - remove excessive whitespace but keep structure
        const cleanT3d = ex.t3d
            .replace(/\r\n/g, '\n')
            .replace(/^\s+/gm, '')  // Remove leading whitespace from each line
            .trim();
        
        return `// Example: ${ex.name}${ex.functionName ? ` (${ex.functionName})` : ''}\n${cleanT3d}`
    }).join('\n\n');
    
    return `\nRELEVANT T3D EXAMPLES (use these as reference for structure and format):\n${formattedExamples}`
}

/**
 * Get enhanced system prompt with relevant examples injected
 * @param {string} basePrompt - Original system prompt
 * @param {string} userPrompt - User's request
 * @param {string} graphType - 'blueprint' or 'material'
 * @returns {Promise<string>} Enhanced system prompt with examples
 */
async function enhancePromptWithExamples(basePrompt, userPrompt, graphType = 'blueprint') {
    const examples = await findRelevantExamples(userPrompt, graphType, 2);
    
    if (examples.length === 0) {
        return basePrompt
    }
    
    const examplesSection = formatExamplesForPrompt(examples);
    return basePrompt + examplesSection
}

/**
 * NodeClassIndex - Build and format a node class index for LLM prompts
 * P1 Optimization: Helps LLM know which node types are available
 */

let cachedIndex = null;

/**
 * Build a deduplicated index of node classes from templates
 * @param {Array} templates - Node templates array from nodeTemplates.json
 * @returns {Array} - Array of unique node class entries
 */
function buildClassIndex(templates) {
    const index = new Map();
    
    for (const t of templates) {
        // Use functionName if available, otherwise use class
        const key = t.functionName || t.class;
        if (!key) continue
        
        if (!index.has(key)) {
            index.set(key, {
                class: t.class,
                functionName: t.functionName,
                name: t.name,
                type: t.type
            });
        }
    }
    
    return Array.from(index.values())
}

/**
 * Format the class index for injection into prompts
 * @param {Array} index - Class index array
 * @param {string} mode - 'blueprint' or 'material'
 * @returns {string} - Formatted text for prompt injection
 */
function formatClassIndexForPrompt(index, mode = 'blueprint') {
    // Filter by mode
    const filtered = index.filter(n => n.type === mode);
    
    if (filtered.length === 0) return ''
    
    // Group by class for better organization
    const byClass = new Map();
    for (const n of filtered) {
        const baseClass = n.class?.split('.').pop() || 'Unknown';
        if (!byClass.has(baseClass)) {
            byClass.set(baseClass, []);
        }
        if (n.functionName) {
            byClass.get(baseClass).push(n.functionName);
        }
    }
    
    // Format output
    let result = 'AVAILABLE NODE TYPES:\n';
    for (const [cls, funcs] of byClass) {
        if (funcs.length > 0) {
            result += `- ${cls}: ${funcs.slice(0, 10).join(', ')}${funcs.length > 10 ? '...' : ''}\n`;
        } else {
            result += `- ${cls}\n`;
        }
    }
    
    return result
}

/**
 * Load and cache the node class index
 * @returns {Promise<Array>} - Cached class index
 */
async function getClassIndex() {
    if (cachedIndex) return cachedIndex
    
    try {
        const response = await fetch('./js/ai/nodeTemplates.json');
        if (!response.ok) {
            console.warn('Failed to load nodeTemplates.json for class index');
            return []
        }
        const data = await response.json();
        cachedIndex = buildClassIndex(data.templates || []);
        return cachedIndex
    } catch (e) {
        console.warn('Error loading node class index:', e);
        return []
    }
}

/**
 * Get formatted class index text for a specific mode
 * @param {string} mode - 'blueprint' or 'material'
 * @returns {Promise<string>} - Formatted index text
 */
async function getClassIndexText(mode = 'blueprint') {
    const index = await getClassIndex();
    return formatClassIndexForPrompt(index, mode)
}

/**
 * Lightweight Markdown parser for chat messages
 * Supports: bold, italic, code, code blocks, lists, headers, links
 */

/**
 * Convert markdown text to HTML
 * @param {string} text - Markdown text
 * @returns {string} HTML string
 */
function parseMarkdown(text) {
    if (!text) return ''
    
    // Escape HTML first to prevent XSS
    let html = escapeHtml(text);
    
    // Code blocks (``` ... ```) - must be done before inline code
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code class="lang-${lang || 'text'}">${code.trim()}</code></pre>`
    });
    
    // Inline code (`...`)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Headers (## ...)
    html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');
    
    // Bold (**...**) and (__...__)
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Italic (*...*) and (_..._) - but not inside words
    html = html.replace(/(?<![*\w])\*(?!\*)(.+?)(?<!\*)\*(?![*\w])/g, '<em>$1</em>');
    html = html.replace(/(?<![_\w])_(?!_)(.+?)(?<!_)_(?![_\w])/g, '<em>$1</em>');
    
    // Strikethrough (~~...~~)
    html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
    
    // Unordered lists (- item or * item)
    html = html.replace(/^(\s*)[-*] (.+)$/gm, '$1<li>$2</li>');
    
    // Ordered lists (1. item)
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    
    // Wrap consecutive <li> elements in <ul>
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    
    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    
    // Line breaks - convert double newlines to paragraphs, single to <br>
    html = html.replace(/\n\n+/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    
    // Wrap in paragraph if not already structured
    if (!html.startsWith('<')) {
        html = `<p>${html}</p>`;
    }
    
    return html
}

/**
 * Escape HTML special characters
 * @param {string} text 
 * @returns {string}
 */
function escapeHtml(text) {
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return text.replace(/[&<>"']/g, char => escapeMap[char])
}

class Reply {

    /**
     * @template T
     * @param {Number} position
     * @param {T} value
     * @param {PathNode} bestPath
     * @returns {Result<T>}
     */
    static makeSuccess(position, value, bestPath = null, bestPosition = 0) {
        return {
            status: true,
            value: value,
            position: position,
            bestParser: bestPath,
            bestPosition: bestPosition,
        }
    }

    /**
     * @param {PathNode} bestPath
     * @returns {Result<null>}
     */
    static makeFailure(position = 0, bestPath = null, bestPosition = 0) {
        return {
            status: false,
            value: null,
            position,
            bestParser: bestPath,
            bestPosition: bestPosition,
        }
    }

    /** @param {Parsernostrum<any>} parsernostrum */
    static makeContext(parsernostrum = null, input = "") {
        return /** @type {Context} */({
            parsernostrum,
            input,
            highlighted: null,
        })
    }

    static makePathNode(parser, index = 0, previous = null) {
        return /** @type {PathNode} */({
            parent: previous,
            current: parser,
            index,
        })
    }
}

/** @template T */
class Parser {

    static indentation = "    "
    static highlight = "Last valid parser"

    /** @type {(new (...args: any) => Parser) & typeof Parser} */
    Self

    /** @param {String} value */
    static frame(value, label = "", indentation = "") {
        label = value ? "[ " + label + " ]" : "";
        let rows = value.split("\n");
        const width = Math.max(...rows.map(r => r.length));
        const rightPadding = width < label.length ? " ".repeat(label.length - width) : "";
        for (let i = 0; i < rows.length; ++i) {
            rows[i] =
                indentation
                + "| "
                + rows[i]
                + " ".repeat(width - rows[i].length)
                + rightPadding
                + " |";
        }
        if (label.length < width) {
            label = label + "─".repeat(width - label.length);
        }
        const rowA = "┌─" + label + "─┐";
        const rowB = indentation + "└─" + "─".repeat(label.length) + "─┘";
        rows = [rowA, ...rows, rowB];
        return rows.join("\n")
    }

    /**
     * @param {PathNode} path
     * @param {Number} index
     * @returns {PathNode}
     */
    makePath(path, index) {
        return { current: this, parent: path, index }
    }

    /**
     * @param {Context} context
     * @param {PathNode} path
     */
    isHighlighted(context, path) {
        if (context.highlighted instanceof Parser) {
            return context.highlighted === this
        }
        if (!context.highlighted || !path?.current) {
            return false
        }
        let a, b;
        for (
            a = path,
            b = /** @type {PathNode} */(context.highlighted);
            a.current && b.current;
            a = a.parent,
            b = b.parent
        ) {
            if (a.current !== b.current || a.index !== b.index) {
                return false
            }
        }
        return !a.current && !b.current
    }

    /** @param {PathNode?} path */
    isVisited(path) {
        if (!path) {
            return false
        }
        for (path = path.parent; path != null; path = path.parent) {
            if (path.current === this) {
                return true
            }
        }
        return false
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<T>}
     */
    parse(context, position, path, index) {
        return null
    }

    /** @param {PathNode} path */
    toString(context = Reply.makeContext(null, ""), indentation = "", path = null, index = 0) {
        path = this.makePath(path, index);
        if (this.isVisited(path)) {
            return "<...>"
        }
        const isVisited = this.isVisited(path);
        const isHighlighted = this.isHighlighted(context, path);
        let result = isVisited ? "<...>" : this.doToString(context, isHighlighted ? "" : indentation, path, index);
        if (isHighlighted) {
            /** @type {String[]} */
            result = Parser.frame(result, Parser.highlight, indentation);
        }
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        return `${this.constructor.name} does not implement toString()`
    }
}

/** @template {String} T */
class StringParser extends Parser {

    #value
    get value() {
        return this.#value
    }

    /** @param {T} value */
    constructor(value) {
        super();
        this.#value = value;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<String>}
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        const end = position + this.#value.length;
        const value = context.input.substring(position, end);
        const result = this.#value === value
            ? Reply.makeSuccess(end, this.#value, path, end)
            : Reply.makeFailure();
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        return `"${this.value.replaceAll("\n", "\\n").replaceAll('"', '\\"')}"`
    }
}

/** @extends Parser<""> */
class SuccessParser extends Parser {

    static instance = new SuccessParser()

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<"">}
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        return Reply.makeSuccess(position, "", path, 0)
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        return "<SUCCESS>"
    }
}

/**
 * @template {any[]} T
 * @typedef {T extends [infer A] ? A
 *     : T extends [infer A, ...infer B] ? A | Union<B>
 *     : never
 * } Union
 */

/**
 * @template {any[]} T
 * @extends Parser<Union<T>>
 */
class AlternativeParser extends Parser {

    #parsers
    get parsers() {
        return this.#parsers
    }

    /** @param {Parser[]} parsers */
    constructor(...parsers) {
        super();
        this.#parsers = parsers;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        const result = /** @type {Result<Union<T>>} */(Reply.makeSuccess(0, ""));
        for (let i = 0; i < this.#parsers.length; ++i) {
            const outcome = this.#parsers[i].parse(context, position, path, i);
            if (outcome.bestPosition > result.bestPosition) {
                result.bestParser = outcome.bestParser;
                result.bestPosition = outcome.bestPosition;
            }
            if (outcome.status) {
                result.value = outcome.value;
                result.position = outcome.position;
                return result
            }
        }
        result.status = false;
        result.value = null;
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        // Short syntax for optional parser
        if (this.#parsers.length === 2 && this.#parsers[1] instanceof SuccessParser) {
            let result = this.#parsers[0].toString(context, indentation, path, 0);
            if (!(this.#parsers[0] instanceof StringParser)) {
                result = "<" + result + ">";
            }
            result += "?";
            return result
        }
        const deeperIndentation = indentation + Parser.indentation;
        let result = "ALT<\n"
            + deeperIndentation
            + this.#parsers
                .map((parser, i) => parser.toString(
                    context,
                    deeperIndentation + " ".repeat(i === 0 ? 0 : Parser.indentation.length - 2),
                    path,
                    i,
                ))
                .join("\n" + deeperIndentation + "| ")
            + "\n" + indentation + ">";
        return result
    }
}

/**
 * @template S
 * @template T
 * @extends Parser<T>
 */
class ChainedParser extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #fn

    /**
     * @param {Parser<S>} parser
     * @param {(v: S, input: String, position: Number) => Parsernostrum<T>} chained
     */
    constructor(parser, chained) {
        super();
        this.#parser = parser;
        this.#fn = chained;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<T>}
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        const outcome = this.#parser.parse(context, position, path, 0);
        if (!outcome.status) {
            // @ts-expect-error
            return outcome
        }
        const result = this.#fn(outcome.value, context.input, outcome.position)
            .getParser()
            .parse(context, outcome.position, path, 0);
        if (outcome.bestPosition > result.bestPosition) {
            result.bestParser = outcome.bestParser;
            result.bestPosition = outcome.bestPosition;
        }
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        const result = this.#parser.toString(context, indentation, path, 0) + " => chained<f()>";
        return result
    }
}

/** @extends Parser<null> */
class FailureParser extends Parser {

    static instance = new FailureParser()

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     */
    parse(context, position, path, index) {
        return Reply.makeFailure()
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        return "<FAILURE>"
    }
}

/**
 * @template T
 * @extends Parser<T>
 */
class Label extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #label = ""

    /**
     * @param {Parser<T>} parser
     * @param {String} label
     */
    constructor(parser, label) {
        super();
        this.#parser = parser;
        this.#label = label;
    }

    /**
     * @param {PathNode} path
     * @param {Number} index
     */
    makePath(path, index) {
        return path // Label does not alter the path
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     */
    parse(context, position, path, index) {
        this.parse = this.#parser.parse.bind(this.#parser);
        return this.parse(context, position, path, index)
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        let result = this.#parser.toString(context, "", path, index);
        result = Parser.frame(result, this.#label, indentation);
        return result
    }
}

/**
 * @template T
 * @extends Parser<T>
 */
class LazyParser extends Parser {

    #parser

    /** @type {Parser<T>} */
    #resolvedPraser

    /** @param {() => Parsernostrum<T>} parser */
    constructor(parser) {
        super();
        this.#parser = parser;
    }

    /**
     * @param {PathNode} path
     * @param {Number} index
     */
    makePath(path, index) {
        return path
    }

    /**
     * @param {Context} context
     * @param {PathNode} path
     */
    isHighlighted(context, path) {
        if (super.isHighlighted(context, path)) {
            // If LazyParser is highlighted, then highlight its child
            const childrenPath = { parent: path, parser: this.#resolvedPraser, index: 0 };
            context.highlighted = context.highlighted instanceof Parser ? this.#resolvedPraser : childrenPath;
        }
        return false
    }

    resolve() {
        if (!this.#resolvedPraser) {
            this.#resolvedPraser = this.#parser().getParser();
        }
        return this.#resolvedPraser
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<T>}
     */
    parse(context, position, path, index) {
        this.resolve();
        this.parse = this.#resolvedPraser.parse.bind(this.#resolvedPraser);
        return this.parse(context, position, path, index)
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        this.resolve();
        this.doToString = this.#resolvedPraser.toString.bind(this.#resolvedPraser);
        return this.doToString(context, indentation, path, index)
    }
}

/** @extends Parser<""> */
class Lookahead extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #type
    get type() {
        return this.#type
    }

    /**
     * @readonly
     * @enum {String}
     */
    static Type = {
        NEGATIVE_AHEAD: "?!",
        NEGATIVE_BEHIND: "?<!",
        POSITIVE_AHEAD: "?=",
        POSITIVE_BEHIND: "?<=",
    }

    /**
     * @param {Parser} parser
     * @param {Type} type
     */
    constructor(parser, type) {
        super();
        this.#parser = parser;
        this.#type = type;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<"">}
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        let result = this.#parser.parse(context, position, path, 0);
        result = result.status == (this.#type === Lookahead.Type.POSITIVE_AHEAD)
            ? Reply.makeSuccess(position, "", path, position)
            : Reply.makeFailure();
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        return "(" + this.#type + this.#parser.toString(context, indentation, path, 0) + ")"
    }
}

/**
 * @template T
 * @extends Parser<T>
 */
class RegExpParser extends Parser {

    /** @type {RegExp} */
    #regexp
    get regexp() {
        return this.#regexp
    }
    /** @type {RegExp} */
    #anchoredRegexp
    #matchMapper

    static #createEscapeable = character => String.raw`[^${character}\\]*(?:\\.[^${character}\\]*)*`
    static #numberRegex = /[-\+]?(?:\d*\.)?\d+/
    static common = {
        number: new RegExp(this.#numberRegex.source + String.raw`(?!\.)`),
        numberInteger: /[\-\+]?\d+(?!\.\d)/,
        numberNatural: /\d+/,
        numberExponential: new RegExp(this.#numberRegex.source + String.raw`(?:[eE][\+\-]?\d+)?(?!\.)`),
        numberUnit: /\+?(?:0(?:\.\d+)?|1(?:\.0+)?)(?![\.\d])/,
        numberByte: /0*(?:25[0-5]|2[0-4]\d|1?\d?\d)(?!\d|\.)/,
        whitespace: /\s+/,
        whitespaceOpt: /\s*/,
        whitespaceInline: /[^\S\n]+/,
        whitespaceInlineOpt: /[^\S\n]*/,
        whitespaceMultiline: /\s*?\n\s*/,
        doubleQuotedString: new RegExp(`"(${this.#createEscapeable('"')})"`),
        singleQuotedString: new RegExp(`'(${this.#createEscapeable("'")})'`),
        backtickQuotedString: new RegExp("`(" + this.#createEscapeable("`") + ")`"),
    }

    /**
     * @param {RegExp} regexp
     * @param {(match: RegExpExecArray) => T} matchMapper
     */
    constructor(regexp, matchMapper) {
        super();
        this.#regexp = regexp;
        this.#anchoredRegexp = new RegExp(`^(?:${regexp.source})`, regexp.flags);
        this.#matchMapper = matchMapper;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<T>}
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        const match = this.#anchoredRegexp.exec(context.input.substring(position));
        if (match) {
            position += match[0].length;
        }
        const result = match
            ? Reply.makeSuccess(position, this.#matchMapper(match), path, position)
            : Reply.makeFailure();
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        let result = "/" + this.#regexp.source + "/";
        const shortname = Object.entries(RegExpParser.common).find(([k, v]) => v.source === this.#regexp.source)?.[0];
        if (shortname) {
            result = "P." + shortname;
        }
        return result
    }
}

/**
 * @template S
 * @template T
 * @extends Parser<T>
 */
class MapParser extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #mapper
    get mapper() {
        return this.#mapper
    }

    /**
     * @param {Parser<S>} parser
     * @param {(v: S) => T} mapper
     */
    constructor(parser, mapper) {
        super();
        this.#parser = parser;
        this.#mapper = mapper;
    }

    /**
     * @param {Context} context
     * @param {PathNode} path
     */
    isHighlighted(context, path) {
        if (super.isHighlighted(context, path)) {
            // If MapParser is highlighted, then highlight its child
            const childrenPath = { parent: path, parser: this.#parser, index: 0 };
            context.highlighted = context.highlighted instanceof Parser ? this.#parser : childrenPath;
        }
        return false
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<T>}
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        // @ts-expect-error
        const result = /** @type {Result<T>} */(this.#parser.parse(context, position, path, 0));
        if (result.status) {
            // @ts-expect-error
            result.value = this.#mapper(result.value);
        }
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        let result = this.#parser.toString(context, indentation, path, 0);
        if (this.#parser instanceof RegExpParser) {
            if (Object.values(RegExpParser.common).includes(this.#parser.regexp)) {
                if (
                    this.#parser.regexp === RegExpParser.common.numberInteger
                    && this.#mapper === /** @type {(v: any) => BigInt} */(BigInt)
                ) {
                    return "P.numberBigInteger"
                }
                return result
            }
        }
        let serializedMapper = this.#mapper.toString();
        if (serializedMapper.length > 60 || serializedMapper.includes("\n")) {
            serializedMapper = "(...) => { ... }";
        }
        result += ` -> map<${serializedMapper}>`;
        return result
    }
}

/** @extends {RegExpParser<RegExpExecArray>} */
class RegExpArrayParser extends RegExpParser {

    /** @param {RegExpExecArray} match */
    static #mapper = match => match

    /** @param {RegExp} regexp */
    constructor(regexp) {
        super(regexp, RegExpArrayParser.#mapper);
    }
}

/** @extends {RegExpParser<String>} */
class RegExpValueParser extends RegExpParser {

    /** @param {RegExp} regexp */
    constructor(regexp, group = 0) {
        super(regexp, match => match[group]);
    }
}

/**
 * @template {any[]} T
 * @extends Parser<T>
 */
class SequenceParser extends Parser {

    #parsers
    get parsers() {
        return this.#parsers
    }

    /** @param {Parser[]} parsers */
    constructor(...parsers) {
        super();
        this.#parsers = parsers;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<T>}
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        const value = /** @type {ParserValue<T>} */(new Array(this.#parsers.length));
        const result = Reply.makeSuccess(position, value);
        for (let i = 0; i < this.#parsers.length; ++i) {
            const outcome = this.#parsers[i].parse(context, result.position, path, i);
            if (outcome.bestPosition > result.bestPosition) {
                result.bestParser = outcome.bestParser;
                result.bestPosition = outcome.bestPosition;
            }
            if (!outcome.status) {
                result.status = false;
                result.value = null;
                break
            }
            result.value[i] = outcome.value;
            result.position = outcome.position;
        }
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        const deeperIndentation = indentation + Parser.indentation;
        const result = "SEQ<\n"
            + deeperIndentation
            + this.#parsers
                .map((parser, index) => parser.toString(context, deeperIndentation, path, index))
                .join("\n" + deeperIndentation)
            + "\n" + indentation + ">";
        return result
    }
}

/**
 * @template T
 * @extends Parser<T[]>
 */
class TimesParser extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #min
    get min() {
        return this.#min
    }

    #max
    get max() {
        return this.#max
    }

    /** @param {Parser<T>} parser */
    constructor(parser, min = 0, max = Number.POSITIVE_INFINITY) {
        super();
        if (min > max) {
            throw new Error("Min is greater than max")
        }
        this.#parser = parser;
        this.#min = min;
        this.#max = max;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @param {Number} index
     * @returns {Result<T[]>}
     */
    parse(context, position, path, index) {
        path = this.makePath(path, index);
        const value = /** @type {ParserValue<T>[]} */([]);
        const result = Reply.makeSuccess(position, value, path);
        for (let i = 0; i < this.#max; ++i) {
            const outcome = this.#parser.parse(context, result.position, path, 0);
            if (outcome.bestPosition > result.bestPosition) {
                result.bestParser = outcome.bestParser;
                result.bestPosition = outcome.bestPosition;
            }
            if (!outcome.status) {
                if (i < this.#min) {
                    result.status = false;
                    result.value = null;
                }
                break
            }
            // @ts-expect-error
            result.value.push(outcome.value);
            result.position = outcome.position;
        }
        // @ts-expect-error
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {String} indentation
     * @param {PathNode} path
     * @param {Number} index
     */
    doToString(context, indentation, path, index) {
        let result = this.parser.toString(context, indentation, path, 0);
        const serialized =
            this.#min === 0 && this.#max === 1 ? "?"
                : this.#min === 0 && this.#max === Number.POSITIVE_INFINITY ? "*"
                    : this.#min === 1 && this.#max === Number.POSITIVE_INFINITY ? "+"
                        : "{"
                        + this.#min
                        + (this.#min !== this.#max ? "," + this.#max : "")
                        + "}";
        result += serialized;
        return result
    }
}

/** @template T */
class Parsernostrum {

    #parser

    /** @type {(new (parser: Parser) => Parsernostrum<T>) & typeof Parsernostrum} */
    Self

    static lineColumnFromOffset(string, offset) {
        const lines = string.substring(0, offset).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        return { line, column }
    }
    /** @param {[any, ...any] | RegExpExecArray} param0 */
    static #firstElementGetter = ([v, _]) => v
    /** @param {[any, any, ...any] | RegExpExecArray} param0 */
    static #secondElementGetter = ([_, v]) => v
    static #arrayFlatter = ([first, rest]) => [first, ...rest]
    /**
     * @template T
     * @param {T} v
     * @returns {T extends Array ? String : T}
     */
    // @ts-expect-error
    static #joiner = v => v instanceof Array ? v.join("") : v

    // Prefedined parsers

    /** Parser accepting any valid decimal, possibly signed number */
    static number = this.reg(RegExpParser.common.number).map(Number)

    /** Parser accepting any digits only number */
    static numberInteger = this.reg(RegExpParser.common.numberInteger).map(Number)

    /** Parser accepting any digits only number and returns a BigInt */
    // @ts-expect-error
    static numberBigInteger = this.reg(this.numberInteger.getParser().parser.regexp).map(BigInt)

    /** Parser accepting any digits only number */
    static numberNatural = this.reg(RegExpParser.common.numberNatural).map(Number)

    /** Parser accepting any valid decimal, possibly signed, possibly in the exponential form number */
    static numberExponential = this.reg(RegExpParser.common.numberExponential).map(Number)

    /** Parser accepting any valid decimal number between 0 and 1 */
    static numberUnit = this.reg(RegExpParser.common.numberUnit).map(Number)

    /** Parser accepting any integer between 0 and 255 */
    static numberByte = this.reg(RegExpParser.common.numberByte).map(Number)

    /** Parser accepting whitespace */
    static whitespace = this.reg(RegExpParser.common.whitespace)

    /** Parser accepting whitespace */
    static whitespaceOpt = this.reg(RegExpParser.common.whitespaceOpt)

    /** Parser accepting whitespace that spans on a single line */
    static whitespaceInline = this.reg(RegExpParser.common.whitespaceInline)

    /** Parser accepting whitespace that spans on a single line */
    static whitespaceInlineOpt = this.reg(RegExpParser.common.whitespaceInlineOpt)

    /** Parser accepting whitespace that contains a list a newline */
    static whitespaceMultiline = this.reg(RegExpParser.common.whitespaceMultiline)

    /** Parser accepting a double quoted string and returns the content */
    static doubleQuotedString = this.reg(RegExpParser.common.doubleQuotedString, 1)

    /** Parser accepting a single quoted string and returns the content */
    static singleQuotedString = this.reg(RegExpParser.common.singleQuotedString, 1)

    /** Parser accepting a backtick quoted string and returns the content */
    static backtickQuotedString = this.reg(RegExpParser.common.backtickQuotedString, 1)

    /** @param {Parser<T>} parser */
    constructor(parser, optimized = false) {
        this.#parser = parser;
    }

    /** @param {PathNode} path */
    static #simplifyPath(path) {
        /** @type {PathNode[]} */
        const array = [];
        while (path) {
            array.push(path);
            path = path.parent;
        }
        array.reverse();
        /** @type {Map<Parser, Number>} */
        let visited = new Map();
        for (let i = 1; i < array.length; ++i) {
            const existing = visited.get(array[i].current);
            if (existing !== undefined) {
                if (array[i + 1]) {
                    array[i + 1].parent = array[existing];
                }
                visited = new Map([...visited.entries()].filter(([parser, index]) => index <= existing || index > i));
                visited.set(array[i].current, existing);
                array.splice(existing + 1, i - existing);
                i = existing;
            } else {
                visited.set(array[i].current, i);
            }
        }
        return array[array.length - 1]
    }

    getParser() {
        return this.#parser
    }

    /** @param {String} input */
    run(input) {
        const result = this.#parser.parse(Reply.makeContext(this, input), 0, Reply.makePathNode(), 0);
        if (result.position !== input.length) {
            result.status = false;
        }
        return /** @type {Result<T>} */(result)
    }

    /**
     * @param {String} input
     * @throws {Error} when the parser fails to match
     */
    parse(input, printParser = true) {
        const result = this.run(input);
        if (result.status) {
            return result.value
        }
        const chunkLength = 60;
        const chunkRange = /** @type {[Number, Number]} */(
            [Math.ceil(chunkLength / 2), Math.floor(chunkLength / 2)]
        );
        const position = Parsernostrum.lineColumnFromOffset(input, result.bestPosition);
        let bestPosition = result.bestPosition;
        const inlineInput = input.replaceAll(
            /^(\s)+|\s{6,}|\s*?\n\s*/g,
            (m, startingSpace, offset) => {
                let replaced = startingSpace ? "..." : " ... ";
                if (offset <= result.bestPosition) {
                    if (result.bestPosition < offset + m.length) {
                        bestPosition -= result.bestPosition - offset;
                    } else {
                        bestPosition -= m.length - replaced.length;
                    }
                }
                return replaced
            }
        );
        const string = inlineInput.substring(0, chunkLength).trimEnd();
        const leadingWhitespaceLength = Math.min(
            input.substring(result.bestPosition - chunkRange[0]).match(/^\s*/)[0].length,
            chunkRange[0] - 1,
        );
        let offset = Math.min(bestPosition, chunkRange[0] - leadingWhitespaceLength);
        chunkRange[0] = Math.max(0, bestPosition - chunkRange[0]) + leadingWhitespaceLength;
        chunkRange[1] = Math.min(input.length, chunkRange[0] + chunkLength);
        let segment = inlineInput.substring(...chunkRange);
        if (chunkRange[0] > 0) {
            segment = "..." + segment;
            offset += 3;
        }
        if (chunkRange[1] < inlineInput.length - 1) {
            segment = segment + "...";
        }
        const bestParser = this.toString(Parser.indentation, true, Parsernostrum.#simplifyPath(result.bestParser));
        throw new Error(
            `Could not parse: ${string}\n\n`
            + `Input: ${segment}\n`
            + "       " + " ".repeat(offset)
            + `^ From here (line: ${position.line}, `
            + `column: ${position.column}, `
            + `offset: ${result.bestPosition})${result.bestPosition === input.length ? ", end of string" : ""}\n`
            + (printParser
                ? "\n"
                + (result.bestParser ? "Last valid parser matched:" : "No parser matched:")
                + bestParser
                + "\n"
                : ""
            )
        )
    }

    // Parsers

    /**
     * @template {String} S
     * @param {S} value
     */
    static str(value) {
        return new this(new StringParser(value))
    }

    /** @param {RegExp} value */
    static reg(value, group = 0) {
        return new this(new RegExpValueParser(value, group))
    }

    /** @param {RegExp} value */
    static regArray(value) {
        return new this(new RegExpArrayParser(value))
    }

    static success() {
        return new this(SuccessParser.instance)
    }

    static failure() {
        return new this(FailureParser.instance)
    }

    // Combinators

    /**
     * @template {Parsernostrum[]} P
     * @param {P} parsers
     * @returns {Parsernostrum<ParserValue<P>>}
     */
    static seq(...parsers) {
        return new this(new SequenceParser(...parsers.map(p => p.getParser())))
    }

    /**
     * @template {Parsernostrum[]} P
     * @param {P} parsers
     * @returns {Parsernostrum<UnionFromArray<ParserValue<P>>>}
     */
    static alt(...parsers) {
        return new this(new AlternativeParser(...parsers.map(p => p.getParser())))
    }

    /**
     * @template {Parsernostrum} P
     * @param {P} parser
     */
    static lookahead(parser) {
        return new this(new Lookahead(parser.getParser(), Lookahead.Type.POSITIVE_AHEAD))
    }

    /**
     * @template {Parsernostrum} P
     * @param {() => P} parser
     * @returns {Parsernostrum<ParserValue<P>>}
     */
    static lazy(parser) {
        return new this(new LazyParser(parser))
    }

    /** @param {Number} min */
    times(min, max = min) {
        return new Parsernostrum(new TimesParser(this.#parser, min, max))
    }

    many() {
        return this.times(0, Number.POSITIVE_INFINITY)
    }

    /** @param {Number} n */
    atLeast(n) {
        return this.times(n, Number.POSITIVE_INFINITY)
    }

    /** @param {Number} n */
    atMost(n) {
        return this.times(0, n)
    }

    /**
     * @param {any} emptyResult
     * @returns {Parsernostrum<T?>}
     */
    opt(emptyResult = "") {
        let success = Parsernostrum.success();
        if (emptyResult !== "") {
            success = success.map(() => emptyResult);
        }
        // @ts-expect-error
        return Parsernostrum.alt(this, success)
    }

    /**
     * @template {Parsernostrum} P
     * @param {P} separator
     */
    sepBy(separator, atLeast = 1, allowTrailing = false) {
        let result = Parsernostrum.seq(
            this,
            Parsernostrum.seq(separator, this).map(Parsernostrum.#secondElementGetter).atLeast(atLeast - 1),
            ...(allowTrailing ? [separator.opt([])] : [])
        ).map(Parsernostrum.#arrayFlatter);
        if (atLeast === 0) {
            result = result.opt([]);
        }
        return result
    }

    skipSpace() {
        return Parsernostrum.seq(this, Parsernostrum.whitespaceOpt).map(Parsernostrum.#firstElementGetter)
    }

    /**
     * @template R
     * @param {(v: T) => R} fn
     * @returns {Parsernostrum<R>}
     */
    map(fn) {
        return new Parsernostrum(new MapParser(this.#parser, fn))
    }

    /**
     * @template {Parsernostrum} P
     * @param {(v: T, input: String, position: Number) => P} fn
     * @returns {P}
     */
    chain(fn) {
        // @ts-expect-error
        return new Parsernostrum(new ChainedParser(this.#parser, fn))
    }

    /**
     * @param {(v: T, input: String, position: Number) => boolean} fn
     * @return {Parsernostrum<T>}
     */
    assert(fn) {
        return this.chain((v, input, position) => fn(v, input, position)
            ? Parsernostrum.success().map(() => v)
            : Parsernostrum.failure()
        )
    }

    join(value = "") {
        return this.map(Parsernostrum.#joiner)
    }

    /** @return {Parsernostrum<T>} */
    label(value = "") {
        return new Parsernostrum(new Label(this.#parser, value))
    }

    /** @param {Parsernostrum | Parser | PathNode} highlight */
    toString(indentation = "", newline = false, highlight = null) {
        if (highlight instanceof Parsernostrum) {
            highlight = highlight.getParser();
        }
        const context = Reply.makeContext(this, "");
        context.highlighted = highlight;
        const path = Reply.makePathNode();
        return (newline ? "\n" + indentation : "") + this.#parser.toString(context, indentation, path)
    }
}

class Configuration {
    static VERSION = "0.2.11"
    static nodeColors = {
        black: i$8`20, 20, 20`,
        blue: i$8`84, 122, 156`,
        darkBlue: i$8`32, 80, 128`,
        darkerBlue: i$8`18, 18, 130`,
        darkTurquoise: i$8`19, 100, 137`,
        gray: i$8`150,150,150`,
        green: i$8`95, 129, 90`,
        intenseGreen: i$8`42, 140, 42`,
        lime: i$8`150, 160, 30`,
        red: i$8`151, 33, 32`,
        turquoise: i$8`46, 104, 106`,
        violet: i$8`126, 28, 150`,
        yellow: i$8`148, 116, 24`,
    }
    static alphaPattern = "repeating-conic-gradient(#7c8184 0% 25%, #c2c3c4 0% 50%) 50% / 10px 10px"
    static colorDragEventName = "ueb-color-drag"
    static colorPickEventName = "ueb-color-pick"
    static colorWindowEventName = "ueb-color-window"
    static colorWindowName = "Color Picker"
    static defaultCommentHeight = 96
    static defaultCommentWidth = 400
    static distanceThreshold = 20 // px
    static dragEventName = "ueb-drag"
    static dragGeneralEventName = "ueb-drag-general"
    static edgeScrollThreshold = 50
    static editTextEventName = {
        begin: "ueb-edit-text-begin",
        end: "ueb-edit-text-end",
    }
    static expandGridSize = 400
    static focusEventName = {
        begin: "blueprint-focus",
        end: "blueprint-unfocus",
    }
    static fontSize = i$8`13px`
    static gridExpandThreshold = 0.25 // remaining size factor threshold to cause an expansion event
    static gridLineWidth = 1 // px
    static gridSet = 8
    static gridShrinkThreshold = 4 // exceding size factor threshold to cause a shrink event
    static gridSize = 16 // px
    static hexColorRegex = /^\s*#(?<r>[0-9a-fA-F]{2})(?<g>[0-9a-fA-F]{2})(?<b>[0-9a-fA-F]{2})([0-9a-fA-F]{2})?|#(?<rs>[0-9a-fA-F])(?<gs>[0-9a-fA-F])(?<bs>[0-9a-fA-F])\s*$/
    static indentation = "   "
    static keysSeparator = /[\.\(\)]/
    static knotOffset = [-Configuration.gridSize, -0.5 * Configuration.gridSize]
    static lineTracePattern = /LineTrace(Single|Multi)(\w*)/
    static linkCurveHeight = 15 // px
    static linkCurveWidth = 80 // px
    static linkMinWidth = 100 // px
    static nameRegexSpaceReplacement = new RegExp(
        // Leading K2_ or K2Node_ is removed
        "^K2(?:[Nn]ode)?_"
        // End of a word (lower case followed by either upper case or number): "AlphaBravo" => "Alpha Bravo"
        + "|(?<=[a-z])(?=[A-Z0-9])"
        // End of upper case word (upper case followed by either word or number)
        + "|(?<=[A-Z])"
        + /* Except "UVs" */ "(?<!U(?=Vs(?![a-z])))"
        + /* Except V2, V3 */ "(?<!V(?=[23](?![0-9])))"
        + /* Except T2d */ "(?<!T(?=2d(?![a-z])))"
        + /* Except BT */ "(?<!BT)"
        + "(?=[A-Z][a-z]|[0-9])"
        // Number followed by a letter
        + "|(?<=[0-9])"
        + /* Except 2D, 3D */ "(?<![23](?=[dD](?![a-z])))"
        + "(?=[a-zA-Z])"
        // "Alpha__Bravo" => "Alpha Bravo"
        + "|\\s*_+\\s*"
        + "|\\s{2,}",
        "g"
    )
    /**
     * @param {Number} start
     * @param {Number} c1
     * @param {Number} c2
     */
    static linkRightSVGPath = (start, c1, c2, arc = false) => {
        const end = 100 - start;
        const mid = arc
            ? 50 + (c2 - start)
            : 50;
        const fin = arc ? end + c1 - start : end - c1 + start;
        return `M ${start} 0 C ${c1.toFixed(2)} 0, ${c2.toFixed(2)} 0, ${mid.toFixed(2)} 50 S ${fin.toFixed(2)} 100, `
            + `${end.toFixed(3)} 100`
    }
    static maxZoom = 7
    static minZoom = -12
    static mouseClickButton = 0
    static mouseRightClickButton = 2
    static mouseWheelZoomThreshold = 80
    static nodeDragEventName = "ueb-node-drag"
    static nodeDragGeneralEventName = "ueb-node-drag-general"
    static nodeRadius = 8 // px
    static nodeTitle = (name, counter) => `${name}_${counter}`
    static nodeUpdateEventName = "ueb-node-update"
    static paths = {
        actorBoundEvent: "/Script/BlueprintGraph.K2Node_ActorBoundEvent",
        addDelegate: "/Script/BlueprintGraph.K2Node_AddDelegate",
        ambientSound: "/Script/Engine.AmbientSound",
        asyncAction: "/Script/BlueprintGraph.K2Node_AsyncAction",
        blueprint: "/Script/Engine.Blueprint",
        blueprintGameplayTagLibrary: "/Script/GameplayTags.BlueprintGameplayTagLibrary",
        blueprintMapLibrary: "/Script/Engine.BlueprintMapLibrary",
        blueprintSetLibrary: "/Script/Engine.BlueprintSetLibrary",
        callArrayFunction: "/Script/BlueprintGraph.K2Node_CallArrayFunction",
        callDelegate: "/Script/BlueprintGraph.K2Node_CallDelegate",
        callFunction: "/Script/BlueprintGraph.K2Node_CallFunction",
        clearDelegate: "/Script/BlueprintGraph.K2Node_ClearDelegate",
        comment: "/Script/UnrealEd.EdGraphNode_Comment",
        commutativeAssociativeBinaryOperator: "/Script/BlueprintGraph.K2Node_CommutativeAssociativeBinaryOperator",
        componentBoundEvent: "/Script/BlueprintGraph.K2Node_ComponentBoundEvent",
        createDelegate: "/Script/BlueprintGraph.K2Node_CreateDelegate",
        customEvent: "/Script/BlueprintGraph.K2Node_CustomEvent",
        doN: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N",
        doOnce: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:DoOnce",
        dynamicCast: "/Script/BlueprintGraph.K2Node_DynamicCast",
        eAttachmentRule: "/Script/Engine.EAttachmentRule",
        edGraph: "/Script/Engine.EdGraph",
        eDrawDebugTrace: "/Script/Engine.EDrawDebugTrace",
        eMaterialSamplerType: "/Script/Engine.EMaterialSamplerType",
        eNiagara_Float4Channel: "/Niagara/Enums/ENiagara_Float4Channel.ENiagara_Float4Channel",
        enum: "/Script/CoreUObject.Enum",
        enumLiteral: "/Script/BlueprintGraph.K2Node_EnumLiteral",
        eSamplerSourceMode: "/Script/Engine.ESamplerSourceMode",
        eSearchCase: "/Script/CoreUObject.ESearchCase",
        eSearchDir: "/Script/CoreUObject.ESearchDir",
        eSpawnActorCollisionHandlingMethod: "/Script/Engine.ESpawnActorCollisionHandlingMethod",
        eTextureMipValueMode: "/Script/Engine.ETextureMipValueMode",
        eTraceTypeQuery: "/Script/Engine.ETraceTypeQuery",
        event: "/Script/BlueprintGraph.K2Node_Event",
        eWorldPositionIncludedOffsets: "/Script/Engine.EWorldPositionIncludedOffsets",
        executionSequence: "/Script/BlueprintGraph.K2Node_ExecutionSequence",
        flipflop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:FlipFlop",
        forEachElementInEnum: "/Script/BlueprintGraph.K2Node_ForEachElementInEnum",
        forEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoop",
        forEachLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoopWithBreak",
        forLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoop",
        forLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoopWithBreak",
        functionEntry: "/Script/BlueprintGraph.K2Node_FunctionEntry",
        functionResult: "/Script/BlueprintGraph.K2Node_FunctionResult",
        gameplayTag: "/Script/GameplayTags.GameplayTag",
        getInputAxisKeyValue: "/Script/BlueprintGraph.K2Node_GetInputAxisKeyValue",
        ifThenElse: "/Script/BlueprintGraph.K2Node_IfThenElse",
        inputAxisKeyEvent: "/Script/BlueprintGraph.K2Node_InputAxisKeyEvent",
        inputDebugKey: "/Script/InputBlueprintNodes.K2Node_InputDebugKey",
        inputKey: "/Script/BlueprintGraph.K2Node_InputKey",
        inputVectorAxisEvent: "/Script/BlueprintGraph.K2Node_InputVectorAxisEvent",
        isValid: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:IsValid",
        kismetArrayLibrary: "/Script/Engine.KismetArrayLibrary",
        kismetMathLibrary: "/Script/Engine.KismetMathLibrary",
        kismetStringLibrary: "/Script/Engine.KismetStringLibrary",
        knot: "/Script/BlueprintGraph.K2Node_Knot",
        linearColor: "/Script/CoreUObject.LinearColor",
        literal: "/Script/BlueprintGraph.K2Node_Literal",
        macro: "/Script/BlueprintGraph.K2Node_MacroInstance",
        makeArray: "/Script/BlueprintGraph.K2Node_MakeArray",
        makeMap: "/Script/BlueprintGraph.K2Node_MakeMap",
        makeSet: "/Script/BlueprintGraph.K2Node_MakeSet",
        makeStruct: "/Script/BlueprintGraph.K2Node_MakeStruct",
        materialExpressionComponentMask: "/Script/Engine.MaterialExpressionComponentMask",
        materialExpressionConstant: "/Script/Engine.MaterialExpressionConstant",
        materialExpressionConstant2Vector: "/Script/Engine.MaterialExpressionConstant2Vector",
        materialExpressionConstant3Vector: "/Script/Engine.MaterialExpressionConstant3Vector",
        materialExpressionConstant4Vector: "/Script/Engine.MaterialExpressionConstant4Vector",
        materialExpressionFunctionInput: "/Script/Engine.MaterialExpressionFunctionInput",
        materialExpressionLogarithm: "/Script/InterchangeImport.MaterialExpressionLogarithm",
        materialExpressionLogarithm10: "/Script/Engine.MaterialExpressionLogarithm10",
        materialExpressionLogarithm2: "/Script/Engine.MaterialExpressionLogarithm2",
        materialExpressionMaterialFunctionCall: "/Script/Engine.MaterialExpressionMaterialFunctionCall",
        materialExpressionSquareRoot: "/Script/Engine.MaterialExpressionSquareRoot",
        materialExpressionSubtract: "/Script/Engine.MaterialExpressionSubtract",
        materialExpressionTextureCoordinate: "/Script/Engine.MaterialExpressionTextureCoordinate",
        materialExpressionTextureSample: "/Script/Engine.MaterialExpressionTextureSample",
        materialExpressionWorldPosition: "/Script/Engine.MaterialExpressionWorldPosition",
        materialGraphNode: "/Script/UnrealEd.MaterialGraphNode",
        materialGraphNodeComment: "/Script/UnrealEd.MaterialGraphNode_Comment",
        metasoundEditorGraphExternalNode: "/Script/MetasoundEditor.MetasoundEditorGraphExternalNode",
        multiGate: "/Script/BlueprintGraph.K2Node_MultiGate",
        niagaraBool: "/Script/Niagara.NiagaraBool",
        niagaraClipboardContent: "/Script/NiagaraEditor.NiagaraClipboardContent",
        niagaraDataInterfaceCollisionQuery: "/Script/Niagara.NiagaraDataInterfaceCollisionQuery",
        niagaraDataInterfaceCurlNoise: "/Script/Niagara.NiagaraDataInterfaceCurlNoise",
        niagaraDataInterfaceVolumeTexture: "/Script/Niagara.NiagaraDataInterfaceVolumeTexture",
        niagaraFloat: "/Script/Niagara.NiagaraFloat",
        niagaraInt32: "/Script/Niagara.NiagaraInt32",
        niagaraNodeConvert: "/Script/NiagaraEditor.NiagaraNodeConvert",
        niagaraNodeFunctionCall: "/Script/NiagaraEditor.NiagaraNodeFunctionCall",
        niagaraNodeInput: "/Script/NiagaraEditor.NiagaraNodeInput",
        niagaraNodeOp: "/Script/NiagaraEditor.NiagaraNodeOp",
        niagaraParameterMap: "/Script/Niagara.NiagaraParameterMap",
        niagaraPosition: "/Script/Niagara.NiagaraPosition",
        pawn: "/Script/Engine.Pawn",
        pcgEditorGraphNode: "/Script/PCGEditor.PCGEditorGraphNode",
        pcgEditorGraphNodeInput: "/Script/PCGEditor.PCGEditorGraphNodeInput",
        pcgEditorGraphNodeOutput: "/Script/PCGEditor.PCGEditorGraphNodeOutput",
        pcgHiGenGridSizeSettings: "/Script/PCG.PCGHiGenGridSizeSettings",
        pcgSubgraphSettings: "/Script/PCG.PCGSubgraphSettings",
        promotableOperator: "/Script/BlueprintGraph.K2Node_PromotableOperator",
        quat4f: "/Script/CoreUObject.Quat4f",
        removeDelegate: "/Script/BlueprintGraph.K2Node_RemoveDelegate",
        reverseForEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ReverseForEachLoop",
        rotator: "/Script/CoreUObject.Rotator",
        select: "/Script/BlueprintGraph.K2Node_Select",
        self: "/Script/BlueprintGraph.K2Node_Self",
        slateBlueprintLibrary: "/Script/UMG.SlateBlueprintLibrary",
        soundCueGraphNode: "/Script/AudioEditor.SoundCueGraphNode",
        soundNodeWavePlayer: "/Script/Engine.SoundNodeWavePlayer",
        spawnActorFromClass: "/Script/BlueprintGraph.K2Node_SpawnActorFromClass",
        switchEnum: "/Script/BlueprintGraph.K2Node_SwitchEnum",
        switchGameplayTag: "/Script/GameplayTagsEditor.GameplayTagsK2Node_SwitchGameplayTag",
        switchInteger: "/Script/BlueprintGraph.K2Node_SwitchInteger",
        switchName: "/Script/BlueprintGraph.K2Node_SwitchName",
        switchString: "/Script/BlueprintGraph.K2Node_SwitchString",
        timeline: "/Script/BlueprintGraph.K2Node_Timeline",
        timeManagementBlueprintLibrary: "/Script/TimeManagement.TimeManagementBlueprintLibrary",
        transform: "/Script/CoreUObject.Transform",
        typedElementHandleLibrary: "/Script/TypedElementFramework.TypedElementHandleLibrary",
        userDefinedEnum: "/Script/Engine.UserDefinedEnum",
        variableGet: "/Script/BlueprintGraph.K2Node_VariableGet",
        variableSet: "/Script/BlueprintGraph.K2Node_VariableSet",
        vector: "/Script/CoreUObject.Vector",
        vector2D: "/Script/CoreUObject.Vector2D",
        vector2f: "/Script/CoreUObject.Vector2f",
        vector3f: "/Script/CoreUObject.Vector3f",
        vector4f: "/Script/CoreUObject.Vector4f",
        whileLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:WhileLoop",
    }
    static pinInputWrapWidth = 145 // px
    static pinUpdateEventName = "ueb-pin-update"
    static removeEventName = "ueb-element-delete"
    static scale = {
        [-12]: 0.133333,
        [-11]: 0.166666,
        [-10]: 0.2,
        [-9]: 0.233333,
        [-8]: 0.266666,
        [-7]: 0.3,
        [-6]: 0.333333,
        [-5]: 0.375,
        [-4]: 0.5,
        [-3]: 0.675,
        [-2]: 0.75,
        [-1]: 0.875,
        0: 1,
        1: 1.25,
        2: 1.375,
        3: 1.5,
        4: 1.675,
        5: 1.75,
        6: 1.875,
        7: 2,
    }
    static smoothScrollTime = 1000 // ms
    static stringEscapedCharacters = /["\\]/g // Try to remove
    static subObjectAttributeNamePrefix = "#SubObject"
    /** @param {ObjectEntity} objectEntity */
    static subObjectAttributeNameFromEntity = (objectEntity, nameOnly = false) =>
        this.subObjectAttributeNamePrefix + (!nameOnly && objectEntity.Class ? `_${objectEntity.Class.type}` : "")
        + "_" + objectEntity.Name
    /** @param {ObjectReferenceEntity} objectReferenceEntity */
    static subObjectAttributeNameFromReference = (objectReferenceEntity, nameOnly = false) =>
        this.subObjectAttributeNamePrefix + (!nameOnly ? "_" + objectReferenceEntity.type : "")
        + "_" + objectReferenceEntity.path
    static subObjectAttributeNameFromName = name => this.subObjectAttributeNamePrefix + "_" + name
    static switchTargetPattern = /\/Script\/[\w\.\/\:]+K2Node_Switch([A-Z]\w+)+/
    static trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end",
    }
    static unescapedBackslash = /(?<=(?:[^\\]|^)(?:\\\\)*)\\(?!\\)/ // Try to remove
    static windowApplyEventName = "ueb-window-apply"
    static windowApplyButtonText = "OK"
    static windowCancelEventName = "ueb-window-cancel"
    static windowCancelButtonText = "Cancel"
    static windowCloseEventName = "ueb-window-close"
    static CommonEnums = {
        [this.paths.eAttachmentRule]: [
            "KeepRelative",
            "KeepWorld",
            "SnapToTarget",
        ],
        [this.paths.eDrawDebugTrace]: ["None", "ForOneFrame", "ForDuration", "Persistent"],
        [this.paths.eMaterialSamplerType]: [
            "Color",
            "Grayscale",
            "Alpha",
            "Normal",
            "Masks",
            "Distance Field Font",
            "Linear Color",
            "Linear Grayscale",
            "Data",
            "External",
            "Virtual Color",
            "Virtual Grayscale",
            "Virtual Alpha",
            "Virtual Normal",
            "Virtual Mask",
            "Virtual Linear Color",
            "Virtual Linear Grayscal",
        ],
        [this.paths.eNiagara_Float4Channel]: [
            ["NewEnumerator0", "R"],
            ["NewEnumerator1", "G"],
            ["NewEnumerator2", "B"],
            ["NewEnumerator3", "A"],
        ],
        [this.paths.eSamplerSourceMode]: ["From texture asset", "Shared: Wrap", "Shared: Clamp", "Hidden"],
        [this.paths.eSearchCase]: ["CaseSensitive", "IgnoreCase"],
        [this.paths.eWorldPositionIncludedOffsets]: [
            "Absolute World Position (Including Material Shader Offsets)",
            "Absolute World Position (Excluding Material Shader Offsets)",
            "Camera Relative World Position (Including Material Shader Offsets)",
            "Camera Relative World Position (Excluding Material Shader Offsets)",
        ],
        [this.paths.eSearchDir]: ["FromStart", "FromEnd"],
        [this.paths.eSpawnActorCollisionHandlingMethod]: [
            ["Undefined", "Default"],
            ["AlwaysSpawn", "Always Spawn, Ignore Collisions"],
            ["AdjustIfPossibleButAlwaysSpawn", "Try To Adjust Location, But Always Spawn"],
            ["AdjustIfPossibleButDontSpawnIfColliding", "Try To Adjust Location, Don't Spawn If Still Colliding"],
            ["DontSpawnIfColliding", "Do Not Spawn"],
        ],
        [this.paths.eTextureMipValueMode]: [
            "None (use computed mip level)",
            "MipLevel (absolute, 0 is full resolution)",
            "MipBias (relative to the computed mip level)",
            "Derivative (explicit derivative to compute mip level)",
        ],
        [this.paths.eTraceTypeQuery]: [["TraceTypeQuery1", "Visibility"], ["TraceTypeQuery2", "Camera"]]
    }
    static ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta",
    ]
    static rgba = ["R", "G", "B", "A"]
    static Keys = {
        /* UE name: JS name */
        "Backspace": "Backspace",
        "Tab": "Tab",
        "LeftControl": "ControlLeft",
        "RightControl": "ControlRight",
        "LeftShift": "ShiftLeft",
        "RightShift": "ShiftRight",
        "LeftAlt": "AltLeft",
        "RightAlt": "AltRight",
        "Enter": "Enter",
        "Pause": "Pause",
        "CapsLock": "CapsLock",
        "Escape": "Escape",
        "Space": "Space",
        "PageUp": "PageUp",
        "PageDown": "PageDown",
        "End": "End",
        "Home": "Home",
        "ArrowLeft": "ArrowLeft",
        "ArrowUp": "ArrowUp",
        "ArrowRight": "ArrowRight",
        "ArrowDown": "ArrowDown",
        "PrintScreen": "PrintScreen",
        "Insert": "Insert",
        "Delete": "Delete",
        "Zero": "Digit0",
        "One": "Digit1",
        "Two": "Digit2",
        "Three": "Digit3",
        "Four": "Digit4",
        "Five": "Digit5",
        "Six": "Digit6",
        "Seven": "Digit7",
        "Eight": "Digit8",
        "Nine": "Digit9",
        "A": "KeyA",
        "B": "KeyB",
        "C": "KeyC",
        "D": "KeyD",
        "E": "KeyE",
        "F": "KeyF",
        "G": "KeyG",
        "H": "KeyH",
        "I": "KeyI",
        "K": "KeyK",
        "L": "KeyL",
        "M": "KeyM",
        "N": "KeyN",
        "O": "KeyO",
        "P": "KeyP",
        "Q": "KeyQ",
        "R": "KeyR",
        "S": "KeyS",
        "T": "KeyT",
        "U": "KeyU",
        "V": "KeyV",
        "W": "KeyW",
        "X": "KeyX",
        "Y": "KeyY",
        "Z": "KeyZ",
        "NumPadZero": "Numpad0",
        "NumPadOne": "Numpad1",
        "NumPadTwo": "Numpad2",
        "NumPadThree": "Numpad3",
        "NumPadFour": "Numpad4",
        "NumPadFive": "Numpad5",
        "NumPadSix": "Numpad6",
        "NumPadSeven": "Numpad7",
        "NumPadEight": "Numpad8",
        "NumPadNine": "Numpad9",
        "Multiply": "NumpadMultiply",
        "Add": "NumpadAdd",
        "Subtract": "NumpadSubtract",
        "Decimal": "NumpadDecimal",
        "Divide": "NumpadDivide",
        "F1": "F1",
        "F2": "F2",
        "F3": "F3",
        "F4": "F4",
        "F5": "F5",
        "F6": "F6",
        "F7": "F7",
        "F8": "F8",
        "F9": "F9",
        "F10": "F10",
        "F11": "F11",
        "F12": "F12",
        "NumLock": "NumLock",
        "ScrollLock": "ScrollLock",
    }
}

class Utility {

    /** @param {Number} value */
    static clamp(value, min = -Infinity, max = Infinity) {
        return Math.min(Math.max(value, min), max)
    }

    /** @param {HTMLElement} element */
    static getScale(element) {
        // @ts-expect-error
        const scale = element.blueprint?.getScale() ?? getComputedStyle(element).getPropertyValue("--ueb-scale");
        return scale != "" ? parseFloat(scale) : 1
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static minDecimals(num, decimals = 1, epsilon = 1e-8) {
        if (typeof num === "string") {
            num = Number(num);
        }
        if (isNaN(num) || num === null || num === undefined) {
            return "0"
        }
        const powered = num * 10 ** decimals;
        if (Math.abs(powered % 1) > epsilon) {
            // More decimal digits than required
            return num.toString()
        }
        return num.toFixed(decimals)
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static roundDecimals(num, decimals = 1) {
        const power = 10 ** decimals;
        return Math.round(num * power) / power
    }

    /** @param {Number} num */
    static printExponential(num) {
        if (num == Number.POSITIVE_INFINITY) {
            return "inf"
        } else if (num == Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        const int = Math.round(num);
        if (int >= 1000) {
            const exp = Math.floor(Math.log10(int));
            const dec = Math.round(num / 10 ** (exp - 2)) / 100;
            // Not using num.toExponential() because of the omitted leading 0 on the exponential
            return `${dec}e+${exp < 10 ? "0" : ""}${exp}`
        }
        const intPart = Math.floor(num);
        if (intPart == 0) {
            return num.toString()
        }
        return this.roundDecimals(num, Math.max(0, 3 - Math.floor(num).toString().length)).toString()
    }

    /**
     * @param {Number} a
     * @param {Number} b
     */
    static approximatelyEqual(a, b, epsilon = 1e-8) {
        return !(Math.abs(a - b) > epsilon)
    }

    /**
     * @param {Coordinates} viewportLocation
     * @param {HTMLElement} movementElement
     */
    static convertLocation(viewportLocation, movementElement, ignoreScale = false) {
        const scaleCorrection = ignoreScale ? 1 : 1 / Utility.getScale(movementElement);
        const bounding = movementElement.getBoundingClientRect();
        const location = /** @type {Coordinates} */([
            Math.round((viewportLocation[0] - bounding.x) * scaleCorrection),
            Math.round((viewportLocation[1] - bounding.y) * scaleCorrection)
        ]);
        return location
    }

    /**
     * @param {IEntity} entity
     * @param {String} key
     * @returns {Boolean}
     */
    static isSerialized(entity, key) {
        return entity["attributes"]?.[key]?.serialized
            ?? entity.constructor["attributes"]?.[key]?.serialized
            ?? false
    }

    /** @param {String[]} keys */
    static objectGet(target, keys, defaultValue = undefined) {
        if (target === undefined) {
            return undefined
        }
        if (!(keys instanceof Array)) {
            throw new TypeError("UEBlueprint: Expected keys to be an array")
        }
        if (keys.length == 0 || !(keys[0] in target) || target[keys[0]] === undefined) {
            return defaultValue
        }
        if (keys.length == 1) {
            return target[keys[0]]
        }
        return Utility.objectGet(target[keys[0]], keys.slice(1), defaultValue)
    }

    /**
     * @param {String[]} keys
     * @returns {Boolean}
     */
    static objectSet(target, keys, value, defaultDictType = Object) {
        if (!(keys instanceof Array)) {
            throw new TypeError("Expected keys to be an array.")
        }
        if (keys.length == 1) {
            if (keys[0] in target || target[keys[0]] === undefined) {
                target[keys[0]] = value;
                return true
            }
        } else if (keys.length > 0) {
            if (!(target[keys[0]] instanceof Object)) {
                target[keys[0]] = new defaultDictType();
            }
            return Utility.objectSet(target[keys[0]], keys.slice(1), value, defaultDictType)
        }
        return false
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} gridSize
     * @returns {Coordinates}
     */
    static snapToGrid(x, y, gridSize) {
        if (gridSize === 1) {
            return [x, y]
        }
        return [
            gridSize * Math.floor(x / gridSize),
            gridSize * Math.floor(y / gridSize)
        ]
    }

    /**
     * @template T
     * @param {T[]} reference
     * @param {T[]} additional
     * @param {(v: T) => void} adding - Process added element
     * @param {(l: T, r: T) => Boolean} predicate
     * @returns {T[]}
     */
    static mergeArrays(reference = [], additional = [], predicate = (l, r) => l == r, adding = v => { }) {
        let result = [];
        reference = [...reference];
        additional = [...additional];
        restart:
        while (true) {
            for (let j = 0; j < additional.length; ++j) {
                for (let i = 0; i < reference.length; ++i) {
                    if (predicate(reference[i], additional[j])) {
                        // Found an element in common in the two arrays
                        result.push(
                            // Take and append all the elements skipped from a
                            ...reference.splice(0, i),
                            // Take and append all the elements skippend from b
                            ...additional.splice(0, j).map(v => (adding(v), v)),
                            // Take and append the element in common
                            ...reference.splice(0, 1)
                        );
                        additional.shift(); // Remove the same element from b
                        continue restart
                    }
                }
            }
            break restart
        }
        // Append remaining the elements in the arrays and make it unique
        result.push(...reference);
        result.push(
            ...additional
                .filter(vb => !result.some(vr => predicate(vr, vb)))
                .map((v, k) => (adding(v), v))
        );
        return result
    }

    /** @param {String} value */
    static escapeNewlines(value) {
        return value
            .replaceAll("\n", "\\n") // Replace newline with \n
            .replaceAll("\t", "\\t") // Replace tab with \t
    }

    /** @param {String} value */
    static escapeString(value, inline = true) {
        let result = value.replaceAll(new RegExp(`(${Configuration.stringEscapedCharacters.source})`, "g"), '\\$1');
        if (inline) {
            result = result
                .replaceAll("\n", "\\n") // Replace newline with \n
                .replaceAll("\t", "\\t"); // Replace tab with \t
        }
        return result
    }

    /** @param {String} value */
    static unescapeString(value) {
        return value
            .replaceAll(new RegExp(Configuration.unescapedBackslash.source + "t", "g"), "\t") // Replace tab with \t
            .replaceAll(new RegExp(Configuration.unescapedBackslash.source + "n", "g"), "\n") // Replace newline with \n
            .replaceAll(new RegExp(`\\\\(${Configuration.stringEscapedCharacters.source})`, "g"), "$1")
    }

    /** @param {String} value */
    static clearHTMLWhitespace(value) {
        return value
            .replaceAll("&nbsp;", "\u00A0") // whitespace
            .replaceAll(/<br\s*\/>|<br>/g, "\n") // newlines
            .replaceAll(/(\<!--.*?\-->)/g, "") // html comments
    }

    /** @param {String} value */
    static encodeHTMLWhitespace(value) {
        return value.replaceAll(" ", "\u00A0")
    }

    /** @param {String} value */
    static capitalFirstLetter(value) {
        if (value.length === 0) {
            return value
        }
        return value.charAt(0).toUpperCase() + value.slice(1)
    }

    /** @param {String} value */
    static formatStringName(value = "") {
        return value
            // Remove leading b (for boolean values) or newlines
            .replace(/^\s*b(?=[A-Z])/, "")
            // Insert a space where needed, possibly removing unnecessary elading characters
            .replaceAll(Configuration.nameRegexSpaceReplacement, " ")
            .trim()
            .split(" ")
            .map(v => Utility.capitalFirstLetter(v))
            .join(" ")
    }

    /** @param {String} value */
    static getIdFromReference(value) {
        return value
            .replace(/(?:.+\.)?([^\.]+)$/, "$1")
            .replaceAll(/(?<=[a-z\d])(?=[A-Z])|(?<=[a-zA-Z])(?=\d)|(?<=[A-Z]{2})(?=[A-Z][a-z])/g, "-")
            .toLowerCase()
    }

    /** @param {String} pathValue */
    static getNameFromPath(pathValue, dropCounter = false) {
        // From end to the first "/" or "."
        const regex = dropCounter ? /([^\.\/]+?)(?:_\d+)$/ : /([^\.\/]+)$/;
        return pathValue.match(regex)?.[1] ?? ""
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Coordinates}
     */
    static getPolarCoordinates(x, y, positiveTheta = false) {
        let theta = Math.atan2(y, x);
        if (positiveTheta && theta < 0) {
            theta = 2 * Math.PI + theta;
        }
        return [
            Math.sqrt(x * x + y * y),
            theta,
        ]
    }

    /**
     * @param {Number} r
     * @param {Number} theta
     * @returns {Coordinates}
     */
    static getCartesianCoordinates(r, theta) {
        return [
            r * Math.cos(theta),
            r * Math.sin(theta)
        ]
    }

    /**
     * @param {Number} begin
     * @param {Number} end
     */
    static range(begin = 0, end = 0, step = end >= begin ? 1 : -1) {
        return Array.from({ length: Math.ceil((end - begin) / step) }, (_, i) => begin + (i * step))
    }

    /** @param {String[]} words */
    static getFirstWordOrder(words) {
        return new RegExp(/\s*/.source + words.join(/[^\n]+\n\s*/.source) + /\s*/.source)
    }

    /**
     * @param {HTMLElement} element
     * @param {String} value
     */
    static paste(element, value) {
        const event = new ClipboardEvent("paste", {
            bubbles: true,
            cancelable: true,
            clipboardData: new DataTransfer(),
        });
        event.clipboardData.setData("text", value);
        element.dispatchEvent(event);
    }

    /** @param {Blueprint} blueprint */
    static async copy(blueprint) {
        const event = new ClipboardEvent("copy", {
            bubbles: true,
            cancelable: true,
            clipboardData: new DataTransfer(),
        });
        blueprint.dispatchEvent(event);
    }

    static animate(
        from,
        to,
        intervalSeconds,
        callback,
        acknowledgeRequestAnimationId = id => { },
        timingFunction = x => {
            const v = x ** 3.5;
            return v / (v + ((1 - x) ** 3.5))
        }
    ) {
        let startTimestamp;
        const doAnimation = currentTimestamp => {
            if (startTimestamp === undefined) {
                startTimestamp = currentTimestamp;
            }
            let delta = (currentTimestamp - startTimestamp) / intervalSeconds;
            if (Utility.approximatelyEqual(delta, 1) || delta > 1) {
                delta = 1;
            } else {
                acknowledgeRequestAnimationId(requestAnimationFrame(doAnimation));
            }
            const currentValue = from + (to - from) * timingFunction(delta);
            callback(currentValue);
        };
        acknowledgeRequestAnimationId(requestAnimationFrame(doAnimation));
    }
}

/** @abstract */
class IEntity {

    /** @type {(v: String) => String} */
    static same = v => v
    /** @type {(entity: IEntity, serialized: String) => String} */
    static notWrapped = (entity, serialized) => serialized
    /** @type {(entity: IEntity, serialized: String) => String} */
    static defaultWrapped = (entity, serialized) => `${entity.#lookbehind}(${serialized})`
    static wrap = this.defaultWrapped
    static attributeSeparator = ","
    static keySeparator = "="
    /** @type {(k: String) => String} */
    static printKey = k => k
    static grammar = Parsernostrum.lazy(() => this.createGrammar())
    /** @type {P<IEntity>} */
    static unknownEntityGrammar
    static unknownEntity
    /** @type {{ [key: String]: typeof IEntity }} */
    static attributes = {}
    /** @type {String | String[]} */
    static lookbehind = ""
    /** @type {(type: typeof IEntity) => InstanceType<typeof IEntity>} */
    static default
    static nullable = false
    static ignored = false // Never serialize or deserialize
    static serialized = false // Value is written and read as string
    static expected = false // Must be there
    static inlined = false // The key is a subobject or array and printed as inlined (A.B=123, A(0)=123)
    /** @type {Boolean} */
    static quoted // Key is serialized with quotes
    static silent = false // Do not serialize if default
    static trailing = false // Add attribute separator after the last attribute when serializing

    /** @type {String[]} */
    #keys
    get keys() {
        return this.#keys ?? Object.keys(this)
    }
    set keys(value) {
        this.#keys = [... new Set(value)];
    }

    // @ts-expect-error
    #lookbehind = /** @type {String} */(this.constructor.lookbehind)
    get lookbehind() {
        return this.#lookbehind.trim()
    }
    set lookbehind(value) {
        this.#lookbehind = value;
    }

    #ignored = /** @type {typeof IEntity} */(this.constructor).ignored
    get ignored() {
        return this.#ignored
    }
    set ignored(value) {
        this.#ignored = value;
    }

    #inlined = /** @type {typeof IEntity} */(this.constructor).inlined
    get inlined() {
        return this.#inlined
    }
    set inlined(value) {
        this.#inlined = value;
    }

    #quoted
    get quoted() {
        return this.#quoted ?? /** @type {typeof IEntity} */(this.constructor).quoted ?? false
    }
    set quoted(value) {
        this.#quoted = value;
    }

    /** @type {Boolean} */
    #trailing
    get trailing() {
        return this.#trailing ?? /** @type {typeof IEntity} */(this.constructor).trailing ?? false
    }
    set trailing(value) {
        this.#trailing = value;
    }

    constructor(values = {}) {
        const attributes = /** @type {typeof IEntity} */(this.constructor).attributes;
        const keys = Utility.mergeArrays(
            Object.keys(values),
            Object.entries(attributes).filter(([k, v]) => v.default !== undefined).map(([k, v]) => k)
        );
        for (const key of keys) {
            if (values[key] !== undefined) {
                if (values[key].constructor === Object) {
                    // It is part of a nested key (words separated by ".")
                    values[key] = new (
                        attributes[key] !== undefined ? attributes[key] : IEntity.unknownEntity
                    )(values[key]);
                }
                const computedEntity = /** @type {ComputedTypeEntityConstructor} */(attributes[key]);
                this[key] = values[key];
                if (computedEntity?.compute) {
                    /** @type {typeof IEntity} */
                    const actualEntity = computedEntity.compute(this);
                    const parsed = actualEntity.grammar.run(values[key].toString());
                    if (parsed.status) {
                        this[key] = parsed.value;
                    }
                }
                continue
            }
            const attribute = attributes[key];
            if (attribute.default !== undefined) {
                this[key] = attribute.default(attribute);
                continue
            }
        }
    }

    /**
     * @protected
     * @returns {P<IEntity>}
     */
    static createGrammar() {
        return this.unknownEntityGrammar
    }

    static actualClass() {
        let self = this;
        while (!self.name) {
            self = Object.getPrototypeOf(self);
        }
        return self
    }

    static className() {
        return this.actualClass().name
    }

    /**
     * @protected
     * @template {typeof IEntity} T
     * @this {T}
     * @returns {T}
     */
    static asUniqueClass(alwaysCreate = false) {
        let result = this;
        if (this.name.length || alwaysCreate) {
            // @ts-expect-error
            result = (() => class extends this { })(); // Comes from a lambda otherwise the class will have name "result"
            result.grammar = result.createGrammar(); // Reassign grammar to capture the correct this from subclass

        }
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     * @param {String} value
     */
    static withLookbehind(value) {
        const result = this.asUniqueClass();
        result.lookbehind = value;
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     * @param {(type: T) => (InstanceType<T> | NullEntity)} value
     * @returns {T}
     */
    static withDefault(value = type => new type()) {
        const result = this.asUniqueClass();
        result.default = value;
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagNullable(value = true) {
        const result = this.asUniqueClass();
        result.nullable = value;
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagIgnored(value = true) {
        const result = this.asUniqueClass();
        result.ignored = value;
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagSerialized(value = true) {
        const result = this.asUniqueClass();
        result.serialized = value;
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagInlined(value = true) {
        const result = this.asUniqueClass();
        result.inlined = value;
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagQuoted(value = true) {
        const result = this.asUniqueClass();
        result.quoted = value;
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagSilent(value = true) {
        const result = this.asUniqueClass();
        result.silent = value;
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagTrailing(value = true) {
        const result = this.asUniqueClass();
        result.trailing = value;
        return result
    }

    /**
     * @protected
     * @param {String} string
     */
    static asSerializedString(string) {
        return `"${string.replaceAll(/(?<=(?:[^\\]|^)(?:\\\\)*?)"/g, '\\"')}"`
    }

    /** @param {String} key */
    showProperty(key) {
        /** @type {IEntity} */
        let value = this[key];
        const valueType = /** @type {typeof IEntity} */(value.constructor);
        if (valueType.silent && valueType.default !== undefined) {
            if (valueType["#default"] === undefined) {
                valueType["#default"] = valueType.default(valueType);
            }
            const defaultValue = valueType["#default"];
            return !value.equals(defaultValue)
        }
        return true
    }

    /**
     * 
     * @param {String} attributeName
     * @param {(v: any) => void} callback
     */
    listenAttribute(attributeName, callback) {
        const descriptor = Object.getOwnPropertyDescriptor(this, attributeName);
        const setter = descriptor.set;
        if (setter) {
            descriptor.set = v => {
                setter(v);
                callback(v);
            };
            Object.defineProperties(this, { [attributeName]: descriptor });
        } else if (descriptor.value) {

            Object.defineProperties(this, {
                ["#" + attributeName]: {
                    value: descriptor.value,
                    writable: true,
                    enumerable: false,
                },
                [attributeName]: {
                    enumerable: true,
                    get() {
                        return this["#" + attributeName]
                    },
                    set(v) {
                        callback(v);
                        this["#" + attributeName] = v;
                    },
                },
            });
        }
    }

    /** @this {IEntity | Array} */
    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        const isSelfOverriden = Self !== this.constructor;
        let result = "";
        let first = true;
        const keys = this instanceof IEntity ? this.keys : Object.keys(this);
        for (const key of keys) {
            /** @type {IEntity} */
            const value = this[key];
            const valueType = /** @type {typeof IEntity} */(value?.constructor);
            if (value === undefined || this instanceof IEntity && !this.showProperty(key)) {
                continue
            }
            if (first) {
                first = false;
            } else {
                result += attributeSeparator;
            }
            let keyValue = this instanceof Array ? `(${key})` : key;
            if (keyValue.length && (Self.attributes[key]?.quoted || value.quoted)) {
                keyValue = `"${keyValue}"`;
            }
            if (value.inlined) {
                const inlinedPrintKey = valueType.className() === "ArrayEntity"
                    ? k => printKey(`${keyValue}${k}`)
                    : k => printKey(`${keyValue}.${k}`);
                result += value.serialize(
                    insideString,
                    indentation,
                    undefined,
                    inlinedPrintKey,
                    keySeparator,
                    attributeSeparator,
                    Self.notWrapped
                );
                continue
            }
            keyValue = printKey(keyValue);
            if (keyValue.length) {
                result += (attributeSeparator.includes("\n") ? indentation : "") + keyValue + keySeparator;
            }
            let serialization = value?.serialize(insideString, indentation);
            result += serialization;
        }
        if (this instanceof IEntity && (isSelfOverriden && Self.trailing || this.trailing) && result.length) {
            result += attributeSeparator;
        }
        return wrap(/** @type {IEntity} */(this), result)
    }

    /** @this {IEntity | Array} */
    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        Self !== this.constructor;
        let result = this instanceof Array
            ? IEntity.prototype.doSerialize.bind(this)(insideString, indentation, Self, printKey, keySeparator, attributeSeparator, wrap)
            : this.doSerialize(insideString, indentation, Self, printKey, keySeparator, attributeSeparator, wrap);
        if (Self.serialized) {
            result = IEntity.asSerializedString(result);
        }
        return result
    }

    equals(other) {
        if (!(other instanceof IEntity)) {
            return false
        }
        const thisKeys = Object.keys(this);
        const otherKeys = Object.keys(other);
        const thisType = /** @type {typeof IEntity} */(this.constructor).actualClass();
        const otherType = /** @type {typeof IEntity} */(other.constructor).actualClass();
        if (
            thisKeys.length !== otherKeys.length
            || this.lookbehind != other.lookbehind
            || !(other instanceof thisType) && !(this instanceof otherType)
        ) {
            return false
        }
        for (let i = 0; i < thisKeys.length; ++i) {
            const k = thisKeys[i];
            if (!otherKeys.includes(k)) {
                return false
            }
            const a = this[k];
            const b = other[k];
            if (a instanceof IEntity) {
                if (!a.equals(b)) {
                    return false
                }
            } else if (a instanceof Array && b instanceof Array) {
                if (a.length !== b.length) {
                    return false
                }
                for (let j = 0; j < a.length; ++j) {
                    if (!(a[j] instanceof IEntity && a[j].equals(b[j])) && a[j] !== b[j]) {
                        return false
                    }
                }
            } else {
                if (a !== b) {
                    return false
                }
            }
        }
        return true
    }

    /** @returns {IEntity | Boolean | Number | String | BigInt | (IEntity | Boolean | Number | String | BigInt)[]} */
    valueOf() {
        return this
    }
}

/** @template {(typeof IEntity)[]} T */
class AlternativesEntity extends IEntity {

    /** @type {(typeof IEntity)[]} */
    static alternatives = []

    static className() {
        let result = super.className();
        if (this.alternatives.length) {
            result += ".accepting(" + this.alternatives.map(v => v.className()).join(", ") + ")";
        }
        return result
    }

    static createGrammar() {
        if (!this.alternatives) return this.unknownEntityGrammar;
        const grammars = this.alternatives.map(entity => entity.grammar);
        if (this.alternatives.length == 0 || grammars.includes(this.unknownEntityGrammar)) {
            return this.unknownEntityGrammar
        }
        return Parsernostrum.alt(...grammars)
    }

    /**
     * @template {(typeof IEntity)[]} Types
     * @param {Types} types
     */
    static accepting(...types) {
        const result = /** @type {typeof AlternativesEntity<Types> & { alternatives: Types }} */(
            this.asUniqueClass()
        );
        result.alternatives = types;
        result.grammar = result.createGrammar();
        return result
    }
}

class Grammar {

    /** @type {String} */
    // @ts-expect-error
    static numberRegexSource = Parsernostrum.number.getParser().parser.regexp.source

    static separatedBy = (source, separator, min = 1) =>
        new RegExp(
            source + "(?:" + separator + source + ")"
            + (min === 1 ? "*" : min === 2 ? "+" : `{${min},}`)
        )

    static Regex = class {
        static HexDigit = /[0-9a-fA-F]/
        static InsideString = /(?:[^"\\]|\\.)*/
        static InsideSingleQuotedString = /(?:[^'\\]|\\.)*/
        static Integer = /[\-\+]?\d+(?!\d|\.)/
        static Number = /[-\+]?(?:\d*\.)?\d+(?!\d|\.)/
        static RealUnit = /\+?(?:0(?:\.\d+)?|1(?:\.0+)?)(?![\.\d])/ // A number between 0 and 1 included
        static Word = Grammar.separatedBy("[a-zA-Z]", "_")
        static Symbol = /[a-zA-Z_]\w*/
        static DotSeparatedSymbols = Grammar.separatedBy(this.Symbol.source, "\\.")
        static MultipleWordsSymbols = Grammar.separatedBy(this.Symbol.source, "(?:\\.|\\ +)")
        static PathFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:]")
        static PathSpaceFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:\\ ]")
        static Path = new RegExp(`(?:\\/${this.PathFragment.source}){2,}`) // Multiple (2+) /PathFragment
    }

    /*   ---   Primitive   ---   */

    static null = Parsernostrum.reg(/\(\s*\)/).map(() => null)
    static true = Parsernostrum.reg(/true/i).map(() => true)
    static false = Parsernostrum.reg(/false/i).map(() => false)
    static number = Parsernostrum.regArray(
        // @ts-expect-error
        new RegExp(`(${Parsernostrum.number.getParser().parser.regexp.source})|(\\+?inf)|(-inf)`)
    ).map(([_0, n, plusInf, minusInf]) => n ? Number(n) : plusInf ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY)
    // @ts-expect-error
    static bigInt = Parsernostrum.reg(new RegExp(Parsernostrum.number.getParser().parser.regexp.source)).map(BigInt)
        .map(result =>
            result[2] !== undefined
                ? Number.POSITIVE_INFINITY
                : result[3] !== undefined
                    ? Number.NEGATIVE_INFINITY
                    : Number(result[1])
        )
    static naturalNumber = Parsernostrum.lazy(() => Parsernostrum.reg(/\d+/).map(Number))
    static string = Parsernostrum.doubleQuotedString.map(insideString => Utility.unescapeString(insideString))

    /*   ---   Fragment   ---   */

    static colorValue = Parsernostrum.numberByte
    static word = Parsernostrum.reg(Grammar.Regex.Word)
    static symbol = Parsernostrum.reg(Grammar.Regex.Symbol)
    static symbolQuoted = Parsernostrum.reg(new RegExp('"(' + Grammar.Regex.Symbol.source + ')"'), 1)
    static attributeName = Parsernostrum.reg(Grammar.Regex.DotSeparatedSymbols)
    static attributeNameQuoted = Parsernostrum.reg(new RegExp('"(' + Grammar.Regex.InsideString.source + ')"'), 1)
    static guid = Parsernostrum.reg(new RegExp(`${Grammar.Regex.HexDigit.source}{32}`))
    static commaSeparation = Parsernostrum.reg(/\s*,\s*(?!\))/)
    static commaOrSpaceSeparation = Parsernostrum.reg(/\s*,\s*(?!\))|\s+/)
    static equalSeparation = Parsernostrum.reg(/\s*=\s*/)
    static hexColorChannel = Parsernostrum.reg(new RegExp(Grammar.Regex.HexDigit.source + "{2}"))

    /*   ---   Factory   ---   */

    /**
     * @param {typeof IEntity} entityType
     * @param {String[]} key
     * @returns {typeof IEntity}
     */
    static getAttribute(entityType, [key, ...keys]) {
        const attribute = entityType?.attributes?.[key];
        if (!attribute) {
            return
        }
        if (attribute.prototype instanceof AlternativesEntity) {
            for (const alternative of /** @type {typeof AlternativesEntity} */(attribute).alternatives) {
                const candidate = this.getAttribute(alternative, keys);
                if (candidate) {
                    return candidate
                }
            }
        }
        if (keys.length > 0) {
            return this.getAttribute(attribute, keys)
        }
        return attribute
    }

    /** @param {typeof IEntity} entityType */
    static createAttributeGrammar(
        entityType,
        attributeNameGrammar = this.attributeName,
        valueSeparator = this.equalSeparation,
        handleObjectSet = (values, attributeKey, attributeValue) => { },
    ) {
        return Parsernostrum.seq(
            attributeNameGrammar,
            valueSeparator,
        ).chain(([attributeName, _1]) => {
            const attributeKey = attributeName.split(Configuration.keysSeparator);
            const attributeValue = this.getAttribute(entityType, attributeKey);
            const grammar = attributeValue ? attributeValue.grammar : IEntity.unknownEntityGrammar;
            const inlined = attributeKey.length > 1;
            return grammar.map(attributeValue =>
                values => {
                    Utility.objectSet(values, attributeKey, attributeValue);
                    attributeKey.reduce(
                        (acc, cur, i) => {
                            acc[cur]["inlined"] = inlined && i < attributeKey.length - 1;
                            return acc[cur]
                        },
                        values
                    );
                    handleObjectSet(values, attributeKey, attributeValue);
                }
            )
        })
    }

    /**
     * @template {typeof IEntity & (new (...values: any) => InstanceType<T>)} T
     * @param {T} entityType
     * @param {Number} completeness
     * @return {Parsernostrum<InstanceType<T>>}
     */
    static createEntityGrammar(entityType, entriesSeparator = this.commaSeparation, completeness = null, minKeys = 1) {
        const lookbehind = entityType.lookbehind instanceof Array
            ? entityType.lookbehind.join("|")
            : entityType.lookbehind;
        return Parsernostrum.seq(
            Parsernostrum.reg(new RegExp(String.raw`(${lookbehind}\s*)\(\s*`), 1),
            this.createAttributeGrammar(entityType).sepBy(entriesSeparator, minKeys),
            Parsernostrum.reg(/\s*(,\s*)?\)/, 1), // optional trailing comma
        )
            .map(([lookbehind, attributes, trailing]) => {
                let values = {};
                if (lookbehind.length) {
                    values["lookbehind"] = lookbehind;
                }
                attributes.forEach(attributeSetter => attributeSetter(values));
                values["trailing"] = trailing !== undefined;
                return values
            })
            // Decide if we accept the entity or not. It is accepted if it doesn't have too many unexpected keys
            .chain(values => {
                if (entityType.lookbehind instanceof Array || entityType.lookbehind !== lookbehind) {
                    entityType = entityType.withLookbehind(lookbehind);
                }
                const keys = Object.keys(values);
                const expectedKeys = Object.keys(entityType.attributes);
                return completeness != null
                    ? Parsernostrum.success()
                        .assert(
                            v => keys.filter(k => expectedKeys.includes(k)).length / expectedKeys.length >= completeness
                        )
                        .map(() => new entityType(values))
                    : Parsernostrum.success().map(() => new entityType(values))
            })
    }
}

class ColorChannelEntity extends IEntity {

    static grammar = this.createGrammar()

    constructor(value = 0) {
        super();
        this.value = value;
    }

    /** @returns {P<ColorChannelEntity>} */
    static createGrammar() {
        return Parsernostrum.number.map(v => new this(v))
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value.toFixed(6);
        if (Self.serialized) {
            result = `"${result}"`;
        }
        return result
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}

class LinearColorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        R: ColorChannelEntity.withDefault(),
        G: ColorChannelEntity.withDefault(),
        B: ColorChannelEntity.withDefault(),
        A: ColorChannelEntity.withDefault(type => new type(1)),
    }
    static grammar = this.createGrammar()

    #H = new ColorChannelEntity()
    get H() {
        return this.#H
    }
    set H(value) {
        this.#H = value;
    }

    #S = new ColorChannelEntity()
    get S() {
        return this.#S
    }
    set S(value) {
        this.#S = value;
    }

    #V = new ColorChannelEntity()
    get V() {
        return this.#V
    }
    set V(value) {
        this.#V = value;
    }

    constructor(values) {
        super(values);
        if (values instanceof Array) {
            values = {
                R: values[0] ?? 0,
                G: values[1] ?? 0,
                B: values[2] ?? 0,
                A: values[3] ?? 1,
            };
        }
        /** @type {InstanceType<typeof LinearColorEntity.attributes.R>} */ this.R;
        /** @type {InstanceType<typeof LinearColorEntity.attributes.G>} */ this.G;
        /** @type {InstanceType<typeof LinearColorEntity.attributes.B>} */ this.B;
        /** @type {InstanceType<typeof LinearColorEntity.attributes.A>} */ this.A;
        this.#updateHSV();
    }

    /** @returns {P<LinearColorEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this, Grammar.commaSeparation, 0.5).label("LinearColorEntity")
    }

    /** @param {LinearColorEntity} value */
    static printLinearColor(value) {
        return `${Math.round(value.R.valueOf() * 255)}, ${Math.round(value.G.valueOf() * 255)}, ${Math.round(value.B.valueOf() * 255)}`
    }

    /** @param {Number} x */
    static linearToSRGB(x) {
        if (x <= 0) {
            return 0
        } else if (x >= 1) {
            return 1
        } else if (x < 0.0031308) {
            return x * 12.92
        } else {
            return Math.pow(x, 1 / 2.4) * 1.055 - 0.055
        }
    }

    /** @param {Number} x */
    static sRGBtoLinear(x) {
        if (x <= 0) {
            return 0
        } else if (x >= 1) {
            return 1
        } else if (x < 0.04045) {
            return x / 12.92
        } else {
            return Math.pow((x + 0.055) / 1.055, 2.4)
        }
    }

    static getWhite() {
        return new LinearColorEntity({
            R: new ColorChannelEntity(1),
            G: new ColorChannelEntity(1),
            B: new ColorChannelEntity(1),
        })
    }

    static getLinearColorFromHexGrammar() {
        const hexDigit = /[0-9a-fA-F]/;
        return Parsernostrum.regArray(new RegExp(
            "#(" + hexDigit.source + "{2})"
            + "(" + hexDigit.source + "{2})"
            + "(" + hexDigit.source + "{2})"
            + "(" + hexDigit.source + "{2})?"
        )).map(([m, R, G, B, A]) => new this({
            R: parseInt(R, 16) / 255,
            G: parseInt(G, 16) / 255,
            B: parseInt(B, 16) / 255,
            A: parseInt(A ?? "FF", 16) / 255,
        }))
    }

    static getLinearColorRGBListGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.numberByte,
            Grammar.commaSeparation,
            Parsernostrum.numberByte,
            Grammar.commaSeparation,
            Parsernostrum.numberByte,
        ).map(([R, _1, G, _3, B]) => new this({
            R: R / 255,
            G: G / 255,
            B: B / 255,
            A: 1,
        }))
    }

    static getLinearColorRGBGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/rgb\s*\(\s*/),
            this.getLinearColorRGBListGrammar(),
            Parsernostrum.reg(/\s*\)/)
        ).map(([_0, linearColor, _2]) => linearColor)
    }

    static getLinearColorRGBAGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/rgba\s*\(\s*/),
            this.getLinearColorRGBListGrammar(),
            Parsernostrum.reg(/\s*\)/)
        ).map(([_0, linearColor, _2]) => linearColor)
    }

    static getLinearColorFromAnyFormat() {
        return Parsernostrum.alt(
            this.getLinearColorFromHexGrammar(),
            this.getLinearColorRGBAGrammar(),
            this.getLinearColorRGBGrammar(),
            this.getLinearColorRGBListGrammar(),
        )
    }

    #updateHSV() {
        const r = this.R.value;
        const g = this.G.value;
        const b = this.B.value;
        if (Utility.approximatelyEqual(r, g) && Utility.approximatelyEqual(r, b) && Utility.approximatelyEqual(g, b)) {
            this.S.value = 0;
            this.V.value = r;
            return
        }
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        let h;
        switch (max) {
            case min:
                h = 0;
                break
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break
            case g:
                h = (b - r) / d + 2;
                break
            case b:
                h = (r - g) / d + 4;
                break
        }
        h /= 6;
        this.H.value = h;
        this.S.value = max == 0 ? 0 : d / max;
        this.V.value = max;
    }

    /**
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
     * @param {Number} a
     */
    setFromRGBA(r, g, b, a = 1) {
        this.R.value = r;
        this.G.value = g;
        this.B.value = b;
        this.A.value = a;
        this.#updateHSV();
    }

    /**
     * @param {Number} h
     * @param {Number} s
     * @param {Number} v
     * @param {Number} a
     */
    setFromHSVA(h, s, v, a = 1) {
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        const values = [v, q, p, p, t, v];
        const [r, g, b] = [values[i % 6], values[(i + 4) % 6], values[(i + 2) % 6]];
        this.R.value = r;
        this.G.value = g;
        this.B.value = b;
        this.A.value = a;
        this.H.value = h;
        this.S.value = s;
        this.V.value = v;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} v
     * @param {Number} a
     */
    setFromWheelLocation(x, y, v, a) {
        const [r, theta] = Utility.getPolarCoordinates(x, y, true);
        this.setFromHSVA(1 - theta / (2 * Math.PI), r, v, a);
    }

    toDimmedColor(minV = 0) {
        const result = new LinearColorEntity();
        result.setFromRGBANumber(this.toNumber());
        result.setFromHSVA(
            result.H.value,
            result.S.value * 0.6,
            Math.pow(result.V.value + minV, 0.55) * 0.7
        );
        return result
    }

    toCSSRGBValues() {
        const r = Math.round(this.R.value * 255);
        const g = Math.round(this.G.value * 255);
        const b = Math.round(this.B.value * 255);
        return i$8`${r}, ${g}, ${b}`
    }

    toRGBA() {
        return [
            Math.round(this.R.value * 255),
            Math.round(this.G.value * 255),
            Math.round(this.B.value * 255),
            Math.round(this.A.value * 255),
        ]
    }

    toSRGBA() {
        return [
            Math.round(LinearColorEntity.linearToSRGB(this.R.value) * 255),
            Math.round(LinearColorEntity.linearToSRGB(this.G.value) * 255),
            Math.round(LinearColorEntity.linearToSRGB(this.B.value) * 255),
            Math.round(this.A.value * 255),
        ]
    }

    toRGBAString() {
        return this
            .toRGBA()
            .map(v => v.toString(16).toUpperCase().padStart(2, "0"))
            .join("")
    }

    toSRGBAString() {
        return this
            .toSRGBA()
            .map(v => v.toString(16).toUpperCase().padStart(2, "0"))
            .join("")
    }

    toHSVA() {
        return [this.H.value, this.S.value, this.V.value, this.A.value]
    }

    toNumber() {
        return (
            Math.round(this.R.value * 0xff) << 24)
            + (Math.round(this.G.value * 0xff) << 16)
            + (Math.round(this.B.value * 0xff) << 8)
            + Math.round(this.A.value * 0xff)
    }

    /** @returns {[Number, Number, Number, Number]} */
    toArray() {
        return [this.R.value, this.G.value, this.B.value, this.A.value]
    }

    /** @param {Number} number */
    setFromRGBANumber(number) {
        this.A.value = (number & 0xff) / 0xff;
        this.B.value = ((number >> 8) & 0xff) / 0xff;
        this.G.value = ((number >> 16) & 0xff) / 0xff;
        this.R.value = ((number >> 24) & 0xff) / 0xff;
        this.#updateHSV();
    }

    /** @param {Number} number */
    setFromSRGBANumber(number) {
        this.A.value = (number & 0xff) / 0xff;
        this.B.value = LinearColorEntity.sRGBtoLinear(((number >> 8) & 0xff) / 0xff);
        this.G.value = LinearColorEntity.sRGBtoLinear(((number >> 16) & 0xff) / 0xff);
        this.R.value = LinearColorEntity.sRGBtoLinear(((number >> 24) & 0xff) / 0xff);
        this.#updateHSV();
    }

    toString() {
        return LinearColorEntity.printLinearColor(this)
    }
}

const p$4 = Configuration.paths;

/** @param {ObjectEntity} entity */
function nodeColor(entity) {
    switch (entity.getType()) {
        case p$4.materialExpressionConstant2Vector:
        case p$4.materialExpressionConstant3Vector:
        case p$4.materialExpressionConstant4Vector:
            return Configuration.nodeColors.yellow
        case p$4.materialExpressionFunctionInput:
        case p$4.materialExpressionTextureCoordinate:
        case p$4.materialExpressionWorldPosition:
        case p$4.pcgEditorGraphNodeInput:
        case p$4.pcgEditorGraphNodeOutput:
            return Configuration.nodeColors.red
        case p$4.makeStruct:
            return Configuration.nodeColors.darkBlue
        case p$4.materialExpressionMaterialFunctionCall:
            return Configuration.nodeColors.blue
        case p$4.materialExpressionTextureSample:
            return Configuration.nodeColors.darkTurquoise
        case p$4.niagaraNodeInput:
            switch (entity["Usage"]?.toString()) {
                case "Attribute": return Configuration.nodeColors.intenseGreen
                case "Parameter": return Configuration.nodeColors.red
                case "RapidIterationParameter": return Configuration.nodeColors.black
                case "SystemConstant": return Configuration.nodeColors.gray
                case "TranslatorConstant": return Configuration.nodeColors.gray
                default: return Configuration.nodeColors.red
            }
    }
    switch (entity.getClass()) {
        case p$4.niagaraNodeFunctionCall:
            return Configuration.nodeColors.darkerBlue
        case p$4.dynamicCast:
            return Configuration.nodeColors.turquoise
        case p$4.inputDebugKey:
        case p$4.inputKey:
            return Configuration.nodeColors.red
        case p$4.createDelegate:
        case p$4.enumLiteral:
        case p$4.makeArray:
        case p$4.makeMap:
        case p$4.materialGraphNode:
        case p$4.select:
            return Configuration.nodeColors.green
        case p$4.executionSequence:
        case p$4.ifThenElse:
        case p$4.macro:
        case p$4.multiGate:
            return Configuration.nodeColors.gray
        case p$4.functionEntry:
        case p$4.functionResult:
            return Configuration.nodeColors.violet
        case p$4.timeline:
            return Configuration.nodeColors.yellow
    }
    if (entity.switchTarget()) {
        return Configuration.nodeColors.lime
    }
    if (entity.isEvent()) {
        return Configuration.nodeColors.red
    }
    if (entity.isComment()) {
        return (entity.CommentColor ? entity.CommentColor : LinearColorEntity.getWhite())
            .toDimmedColor()
            .toCSSRGBValues()
    }
    const pcgSubobject = entity.getPcgSubobject();
    if (pcgSubobject) {
        if (pcgSubobject.NodeTitleColor) {
            return pcgSubobject.NodeTitleColor.toDimmedColor(0.1).toCSSRGBValues()
        }
        switch (entity.PCGNode?.getName(true)) {
            case "Branch":
            case "Select":
                return Configuration.nodeColors.intenseGreen
        }
    }
    if (entity.bIsPureFunc?.valueOf() || entity.bDefaultsToPureFunc?.valueOf()) {
        return Configuration.nodeColors.green
    }
    if (entity["Input"]?.["Name"]) {
        return Configuration.nodeColors.gray
    }
    return Configuration.nodeColors.blue
}

class SVGIcon {

    static arrayPin = x`
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0H0V4H4V0Z" fill="currentColor" />
            <path d="M10 0H6V4H10V0Z" fill="currentColor" />
            <path d="M16 0H12V4H16V0Z" fill="currentColor" />
            <path d="M4 6H0V10H4V6Z" fill="currentColor" />
            <path class="ueb-pin-tofill" d="M10 6H6V10H10V6Z" fill="black" />
            <path d="M16 6H12V10H16V6Z" fill="currentColor" />
            <path d="M4 12H0V16H4V12Z" fill="currentColor" />
            <path d="M10 12H6V16H10V12Z" fill="currentColor" />
            <path d="M16 12H12V16H16V12Z" fill="currentColor" />
        </svg>
    `

    static branchNode = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 2H6C5.44772 2 5 2.44772 5 3V13C5 13.5523 5.44772 14 6 14H11V12H7V4H11V2Z" fill="white" />
            <rect x="1" y="7" width="4" height="2" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6L15 3L11 0V6Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 16L15 13L11 10V16Z" fill="white" />
        </svg>
    `

    static breakStruct = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14L10 12L11 11L13 13L14 12L14 15L11 15L12 14Z" fill="white" />
            <path d="M13 3L11 5L10 4L12 2L11 1L14 1L14 4L13 3Z" fill="white" />
            <path d="M7.975 6H3.025C1.90662 6 1 6.90662 1 8.025V8.475C1 9.59338 1.90662 10.5 3.025 10.5H7.975C9.09338 10.5 10 9.59338 10 8.475V8.025C10 6.90662 9.09338 6 7.975 6Z" fill="white" />
        </svg>
    `

    static cast = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12L16 7.5L12 3V12Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11L4 7.5L0 4V11Z" fill="white" />
            <rect opacity="0.5" x="5" y="6" width="1" height="3" fill="white" />
            <rect opacity="0.5" x="7" y="6" width="1" height="3" fill="white" />
            <rect opacity="0.5" x="9" y="6" width="1" height="3" fill="white" />
            <rect x="9" y="6" width="3" height="3" fill="white" />
        </svg>
    `

    static close = x`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="2" x2="30" y2="30" stroke="currentColor" stroke-width="4" />
            <line x1="30" y1="2" x2="2" y2="30" stroke="currentColor" stroke-width="4" />
        </svg>
    `

    static convert = x`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path fill="#3e7fbc" d="M 4 0 H 16 V 32 H 4 L 0 28 V 4 Z" />
            <path fill="#bdd6ef" d="M 2 8 H 14 V 30 H 4 L 2 28 Z" />
            <path fill="#bc3e4a" d="M 16 0 H 28 L 32 4 V 28 L 28 32 H 16 Z" />
            <path fill="#efbdc1" d="M 18 8 H 30 V 27 L 27 30 H 18 Z" />
        </svg>
    `

    static correct = x`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path fill="#2da800" d="M 2 16 L 14 30 L 30 2 L 13 22 Z" />
        </svg>
    `

    static delegate = x`
        <svg width="11" height="11" viewBox="-2 -2 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect class="ueb-pin-tofill" fill="black" width="28" height="28" rx="4" stroke="currentColor" stroke-width="5" />
        </svg>
    `

    static doN = x`
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M1 12V8H9V4L16 10L9 16V12H1Z" />
            <path fill="white" d="M7 6L6 6L4 2.66667V6H3V1H4L6 4.33333V1H7V6Z" />
        </svg>
    `

    static doOnce = x`
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12V8H9V4L16 10L9 16V12H1Z" fill="white" />
            <path d="M6 6H5L4.98752 2.42387L4 2.8642V1.893L5.89305 1H6V6Z" fill="white" />
            <rect x="4" y="5" width="3" height="1" fill="white" />
        </svg>
    `

    static enum = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M9 5V0H2V16H14V5H9ZM3.2 4.4L4.5 4H4.6V7H4V4.7L3.2 4.9V4.4ZM4.7 14.8C4.6 14.9 4.3 15 4 15C3.7 15 3.5 14.9 3.3 14.8C3.1 14.6 3 14.4 3 14.2H3.6C3.6 14.3 3.6 14.4 3.7 14.5C3.8 14.6 3.9 14.6 4 14.6C4.1 14.6 4.2 14.6 4.3 14.5C4.4 14.4 4.4 14.3 4.4 14.2C4.4 13.9 4.2 13.8 3.9 13.8H3.7V13.3H4C4.1 13.3 4.3 13.3 4.3 13.2C4.4 13.1 4.4 13 4.4 12.9C4.4 12.8 4.4 12.7 4.3 12.6C4.2 12.5 4.1 12.5 4 12.5C3.9 12.5 3.8 12.5 3.7 12.6C3.6 12.7 3.6 12.7 3.6 12.8H3C3 12.6 3 12.5 3.1 12.4C3.2 12.3 3.3 12.2 3.4 12.1C3.7 12 3.8 12 4 12C4.3 12 4.6 12.1 4.7 12.2C4.9 12.4 5 12.6 5 12.8C5 12.9 5 13.1 4.9 13.2C4.8 13.3 4.7 13.4 4.6 13.5C4.8 13.6 4.9 13.6 5 13.8C5 13.8 5 14 5 14.1C5 14.4 4.9 14.6 4.7 14.8ZM5.1 11H3.1V10.6L4.1 9.6C4.2 9.5 4.3 9.3 4.4 9.2C4.4 9.1 4.4 9 4.4 8.9C4.4 8.8 4.4 8.7 4.3 8.6C4.2 8.5 4.1 8.5 4 8.5C3.9 8.5 3.8 8.5 3.7 8.6C3.6 8.7 3.6 8.8 3.6 9H3C3 8.8 3 8.7 3.1 8.5C3.2 8.4 3.3 8.2 3.5 8.1C3.7 8 3.8 8 4 8C4.3 8 4.5 8.1 4.7 8.2C4.9 8.4 5 8.6 5 8.8C5 9 5 9.1 4.9 9.3C4.8 9.4 4.7 9.6 4.5 9.8L3.8 10.5H5.1V11ZM12 15H6V14H12V15ZM12 11H6V10H12V11ZM12 7H6V6H12V7Z" />
            <path d="M9 0H8L14 6V5L9 0Z" fill="white" />
        </svg>
    `

    static event = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.929031" y="8" width="10" height="10" rx="0.5" transform="rotate(-45 0.929031 8)" stroke="white" />
            <path d="M5 4.00024L8 1.00024V6.00024H3L5 4.00024Z" fill="white" />
            <path d="M6 13.0002L3 10.0002L8 10.0002L8 15.0002L6 13.0002Z" fill="white" />
            <path d="M4.53551 6.82854L4.53551 11.0712L0.999977 7.53564L4.53551 4.00011L4.53551 6.82854Z" fill="white" />
        </svg>
    `

    static execPin = x`
        <svg width="15" height="15" viewBox="-2 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="ueb-pin-tofill" stroke-width="1.25" stroke="white" fill="none"
                d="M 2 1 a 2 2 0 0 0 -2 2 v 10 a 2 2 0 0 0 2 2 h 4 a 2 2 0 0 0 1.519 -0.698 l 4.843 -5.651 a 1 1 0 0 0 0 -1.302 L 7.52 1.7 a 2 2 0 0 0 -1.519 -0.698 z" />
        </svg>
    `

    static expandIcon = x`
        <svg fill="currentColor" viewBox="4 4 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M 16.003 18.626 l 7.081 -7.081 L 25 13.46 l -8.997 8.998 -9.003 -9 1.917 -1.916 z" />
        </svg>
    `

    static flipflop = x`
        <svg  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L10 14" stroke="white" stroke-width="2" stroke-linecap="round" />
            <path d="M6 2L2 14" stroke="white" stroke-width="2" stroke-linecap="round" />
            <path d="M6 2L10 14" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" />
        </svg>
    `

    static forEachLoop = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C1.8 2 0 3.8 0 6V9C0 11.2 2 13 4 13H10V11H5C3.2 11 2 9.7 2 8V7C2 5.63882 2.76933 4.53408 4 4.14779V2ZM12 4C13.8 4 14 5.3 14 7V8C14 8.8 13.7 9.5 13.3 10L15.2 11.4C15.7 10.7 16 9.9 16 9V6C16 3.8 14.2 2 12 2V4Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L13 12L8 8V16Z" fill="white" />
            <rect x="5" y="1" width="1" height="4" fill="white" />
            <rect x="7" y="1" width="1" height="4" fill="white" />
            <rect x="9" y="1" width="1" height="4" fill="white" />
            <rect x="11" y="2" width="1" height="2" fill="white" />
        </svg>
    `

    static functionSymbol = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.72002 6.0699C9.88111 4.96527 10.299 3.9138 10.94 2.99991C10.94 2.99991 10.94 3.05991 10.94 3.08991C10.94 3.36573 11.0496 3.63026 11.2446 3.8253C11.4397 4.02033 11.7042 4.12991 11.98 4.12991C12.2558 4.12991 12.5204 4.02033 12.7154 3.8253C12.9105 3.63026 13.02 3.36573 13.02 3.08991C13.0204 2.90249 12.9681 2.71873 12.8691 2.5596C12.7701 2.40047 12.6283 2.27237 12.46 2.18991H12.37C11.8725 2.00961 11.3275 2.00961 10.83 2.18991C9.21002 2.63991 8.58002 4.99991 8.58002 4.99991L8.40002 5.1199H5.40002L5.15002 6.1199H8.27002L7.27002 11.4199C7.11348 12.0161 6.79062 12.5555 6.33911 12.9751C5.8876 13.3948 5.32607 13.6773 4.72002 13.7899C4.78153 13.655 4.81227 13.5081 4.81002 13.3599C4.81002 13.0735 4.69624 12.7988 4.4937 12.5962C4.29116 12.3937 4.01646 12.2799 3.73002 12.2799C3.44359 12.2799 3.16889 12.3937 2.96635 12.5962C2.76381 12.7988 2.65002 13.0735 2.65002 13.3599C2.66114 13.605 2.75692 13.8386 2.92104 14.021C3.08517 14.2033 3.30746 14.3231 3.55002 14.3599C7.91002 15.1999 8.55002 11.4499 8.55002 11.4499L9.55002 7.05991H12.55L12.8 6.05991H9.64002L9.72002 6.0699Z"
                fill="currentColor"
            />
        </svg>
    `

    static gamepad = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="m 15.2107 8.525 c -0.6619 -1.7207 -1.9856 -4.8978 -3.3094 -4.8978 c -1.9856 0 -1.9856 1.8532 -2.7799 1.8532 c -0.3971 0 -1.8532 0 -2.3827 0 c -0.7943 0 -0.7943 -1.8532 -2.6475 -1.8532 c -1.3238 0 -2.6475 3.0446 -3.3094 4.8978 c -1.059 3.3094 -1.1914 4.8979 1.1914 4.8979 c 2.6475 0 2.6475 -3.0445 5.9569 -3.0445 c 3.3094 0 3.4418 3.0445 5.9569 3.0445 c 2.5151 0 2.5151 -1.5885 1.3238 -4.8979 z m -8.472 0 h -1.3238 v 1.3238 h -1.3238 v -1.3238 h -1.3238 v -1.3238 h 1.3238 v -1.3238 h 1.3238 v 1.3238 h 1.3238 v 1.3238 z m 4.6331 1.5887 c -1.1914 0 -2.2504 -0.9268 -2.2504 -2.2505 c 0 -1.1913 0.9267 -2.2503 2.2504 -2.2503 c 1.3238 0 2.2504 0.9266 2.2504 2.2503 c 0 1.1915 -1.059 2.2505 -2.2504 2.2505 z m -0.0001 -2.9124 c -0.3971 0 -0.6619 0.2648 -0.6619 0.6619 c 0 0.3971 0.2648 0.6619 0.6619 0.6619 c 0.3971 0 0.6619 -0.2648 0.6619 -0.6619 c 0 -0.3971 -0.2648 -0.6619 -0.6619 -0.6619 z" />
        </svg>
    `

    static genericPin = x`
        <svg width="16" height="12" viewBox="0 0 42 32" xmlns="http://www.w3.org/2000/svg">
            <circle class="ueb-pin-tofill" cx="16" cy="16" r="13" fill="black" stroke="currentColor" stroke-width="5" />
            <path fill="currentColor" d="M 34 6 L 34 26 L 42 16 Z" />
        </svg>
    `

    static keyboard = x`
        <svg viewBox="0 -3 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M 1 10 H 15 c 0.2652 0 0.5195 -0.1054 0.707 -0.293 c 0.1875 -0.1875 0.293 -0.4418 0.293 -0.707 v -8 c 0 -0.2652 -0.1054 -0.5195 -0.293 -0.707 c -0.1875 -0.1875 -0.4418 -0.293 -0.707 -0.293 H 1 c -0.2652 0 -0.5195 0.1054 -0.707 0.293 c -0.1875 0.1875 -0.293 0.4418 -0.293 0.707 V 9 c 0 0.2652 0.1054 0.5195 0.293 0.707 c 0.1875 0.1875 0.4418 0.293 0.707 0.293 Z M 14 6 h -3 v -2 h 3 v 2 Z M 13 1 h 2 v 2 h -2 v -2 Z M 10 1 h 2 v 2 h -2 v -2 Z M 10 6 h -2 v -2 h 2 v 2 Z M 7 1 h 2 v 2 h -2 v -2 Z M 7 6 h -2 v -2 h 2 v 2 Z M 4 1 h 2 v 2 h -2 v -2 Z M 4 6 h -2 v -2 h 2 v 2 Z M 1 1 h 2 v 2 h -2 v -2 Z M 1 7 h 2 v 2 h -2 v -2 M 4 7 h 8 v 2 h -8 v -2 M 13 7 h 2 v 2 h -2 v -2 Z" />
        </svg>
    `

    static loop = x`
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .cls-1 {
                        fill: #fff;
                        fill-rule: evenodd;
                    }
                    .cls-2 {
                        fill: none;
                    }
                </style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_4" data-name="Layer 4">
                    <path class="cls-1" d="M16,2H4A4,4,0,0,0,0,6v4a4.14,4.14,0,0,0,4,4H9v5l8-6L9,7v5H4.5A2.36,2.36,0,0,1,2,9.5v-3A2.36,2.36,0,0,1,4.5,4h11A2.36,2.36,0,0,1,18,6.5V9a3,3,0,0,1-.69,2l1.88,1.41A4,4,0,0,0,20,10V6A4,4,0,0,0,16,2Z" />
                    <rect class="cls-2" width="20" height="20" />
                </g>
            </g>
        </svg>
    `

    static macro = x`
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.92L10 12.29L14.55 2.61C14.662 2.4259 14.8189 2.27332 15.0061 2.16661C15.1933 2.05989 15.4045 2.00256 15.62 2H19L18.66 2.89C18.66 2.89 17.17 3.04 17.11 3.63C17.05 4.22 16 15.34 15.93 16.13C15.86 16.92 17.33 17.13 17.33 17.13L17.17 17.99H13.84C13.7241 17.9764 13.612 17.9399 13.5103 17.8826C13.4086 17.8253 13.3194 17.7484 13.2477 17.6562C13.176 17.5641 13.1234 17.4586 13.0929 17.346C13.0624 17.2333 13.0546 17.1157 13.07 17L14.43 5.52L10 14.57C9.8 15.03 9.07 15.72 8.63 15.71H7.75L6.05 4.86L3.54 17.39C3.51941 17.5514 3.44327 17.7005 3.32465 17.8118C3.20603 17.9232 3.05235 17.9897 2.89 18H1L1.11 17.09C1.11 17.09 2.21 17.09 2.3 16.69C2.39 16.29 5.3 3.76 5.41 3.32C5.52 2.88 4.19 2.81 4.19 2.81L4.46 2H6.62C7.09 2 7.92 2.38 8 2.92Z" fill="white" />
        </svg>
    `

    static mapPin = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0H0V4H4V0Z" fill="currentColor" />
            <path d="M4 6H0V10H4V6Z" fill="currentColor" />
            <path d="M4 12H0V16H4V12Z" fill="currentColor" />
            <path d="M16 0H6V4H16V0Z" fill="white" />
            <path d="M16 6H6V10H16V6Z" fill="white" />
            <path d="M16 12H6V16H16V12Z" fill="white" />
        </svg>
    `

    static makeArray = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H13V6H15V4Z" fill="white" />
            <path d="M15 7H13V9H15V7Z" fill="white" />
            <path d="M15 10H13V12H15V10Z" fill="white" />
            <path d="M12 4H10V6H12V4Z" fill="white" />
            <path d="M12 7H10V9H12V7Z" fill="white" />
            <path d="M12 10H10V12H12V10Z" fill="white" />
            <path d="M9 4H7V6H9V4Z" fill="white" />
            <path d="M9 7H7V9H9V7Z" fill="white" />
            <path d="M9 10H7V12H9V10Z" fill="white" />
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white" />
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white" />
        </svg>
    `

    static makeMap = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H10V6H15V4Z" fill="white" />
            <path d="M15 7H10V9H15V7Z" fill="white" />
            <path d="M15 10H10V12H15V10Z" fill="white" />
            <path d="M9 4H7V6H9V4Z" fill="white" />
            <path d="M9 7H7V9H9V7Z" fill="white" />
            <path d="M9 10H7V12H9V10Z" fill="white" />
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white" />
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white" />
        </svg>
    `

    static makeSet = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white" />
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white" />
            <path d="M6 8.00205V7.43062C6.40147 7.37088 6.79699 7.28299 7.18286 7.16777C7.30414 7.11578 7.40659 7.03462 7.47858 6.93348C7.57165 6.81021 7.63108 6.66933 7.65215 6.52205C7.6832 6.31181 7.69609 6.09976 7.69072 5.88777C7.67539 5.53753 7.70341 5.18685 7.77429 4.84205C7.81918 4.66059 7.92446 4.49533 8.07643 4.36777C8.26269 4.22923 8.48285 4.13138 8.71929 4.08205C9.01252 4.02392 9.31249 3.99706 9.61287 4.00205H9.85715V4.57348C9.66398 4.58307 9.47806 4.64211 9.32179 4.7435C9.16552 4.84489 9.04559 4.9843 8.97644 5.14491C8.92057 5.24999 8.89621 5.36613 8.90572 5.48205C8.90572 5.64205 8.90572 5.95062 8.86715 6.40205C8.85805 6.6136 8.81697 6.8231 8.74501 7.02491C8.69216 7.17345 8.60697 7.3113 8.49429 7.43062C8.33135 7.64 8.1415 7.83177 7.92858 8.00205" fill="white" />
            <path d="M7.92858 8.00195C8.14537 8.18165 8.33547 8.3852 8.49429 8.60767C8.60419 8.72229 8.6892 8.85404 8.74501 8.99624C8.81697 9.19805 8.85805 9.40755 8.86715 9.6191C8.89286 10.0724 8.90572 10.381 8.90572 10.5448C8.89679 10.6607 8.92112 10.7767 8.97644 10.882C9.05077 11.0375 9.17272 11.1714 9.32842 11.2683C9.48411 11.3653 9.66731 11.4215 9.85715 11.4305V12.002H9.61287C9.31086 12.0112 9.0087 11.9881 8.71286 11.9334C8.47744 11.8816 8.25788 11.784 8.07001 11.6477C7.91926 11.5193 7.81421 11.3543 7.76786 11.1734C7.69764 10.8285 7.66962 10.4779 7.68429 10.1277C7.69081 9.91186 7.67791 9.69593 7.64572 9.48195C7.62465 9.33468 7.56522 9.1938 7.47215 9.07052C7.40016 8.96939 7.29771 8.88822 7.17643 8.83624C6.79266 8.72131 6.3993 8.63342 6 8.57338V8.00195" fill="white" />
            <path d="M13.0712 8.00197C12.8582 7.83169 12.6684 7.63992 12.5054 7.43054C12.3942 7.31461 12.3091 7.18076 12.2547 7.03626C12.1828 6.83445 12.1417 6.62495 12.1326 6.4134C12.1326 5.96197 12.094 5.6534 12.094 5.4934C12.1058 5.37369 12.0814 5.25334 12.0233 5.14483C11.9541 4.98422 11.8342 4.84481 11.6779 4.74342C11.5217 4.64203 11.3357 4.58299 11.1426 4.5734V4.00197H11.3869C11.6889 3.99277 11.991 4.01579 12.2869 4.07054C12.5233 4.11987 12.7435 4.21772 12.9297 4.35626C13.0817 4.48382 13.187 4.64908 13.2319 4.83054C13.3027 5.17534 13.3308 5.52602 13.3154 5.87626C13.3094 6.09206 13.3223 6.30795 13.354 6.52197C13.3751 6.66925 13.4345 6.81013 13.5276 6.9334C13.5996 7.03454 13.702 7.1157 13.8233 7.16769C14.2071 7.28262 14.6004 7.37051 14.9997 7.43054V8.00197" fill="white" />
            <path d="M14.9997 8.00195V8.57338C14.5983 8.63312 14.2027 8.72102 13.8169 8.83624C13.6956 8.88822 13.5931 8.96939 13.5212 9.07052C13.4281 9.1938 13.3686 9.33468 13.3476 9.48195C13.3154 9.69593 13.3025 9.91186 13.309 10.1277C13.3237 10.4779 13.2957 10.8285 13.2254 11.1734C13.1791 11.3543 13.074 11.5193 12.9233 11.6477C12.7354 11.784 12.5159 11.8816 12.2804 11.9334C11.9846 11.9881 11.6824 12.0112 11.3804 12.002H11.1426V11.4305C11.3353 11.4196 11.5205 11.36 11.6765 11.2588C11.8325 11.1576 11.9528 11.0189 12.0233 10.8591C12.0786 10.7539 12.1029 10.6378 12.094 10.522C12.094 10.3543 12.1069 10.0458 12.1326 9.59624C12.1417 9.38469 12.1828 9.17519 12.2547 8.97338C12.3105 8.83119 12.3955 8.69943 12.5054 8.58481C12.666 8.37037 12.856 8.17457 13.0712 8.00195" fill="white" />
        </svg>
    `

    static makeStruct = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white" />
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white" />
            <path d="M12.975 6H8.025C6.90662 6 6 6.90662 6 8.025V8.475C6 9.59338 6.90662 10.5 8.025 10.5H12.975C14.0934 10.5 15 9.59338 15 8.475V8.025C15 6.90662 14.0934 6 12.975 6Z" fill="white" />
        </svg>
    `

    static metasoundFunction = x`
        <svg viewBox="-8 1 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M7.14453 3.32422C7.14453 3.53255 7.07292 3.70833 6.92969 3.85156C6.78646 3.98828 6.61068 4.05664 6.40234 4.05664C6.19401 4.05664 6.00846 3.98828 5.8457 3.85156C5.68945 3.71484 5.61133 3.53581 5.61133 3.31445C5.61133 3.0931 5.69922 2.91081 5.875 2.76758C5.82943 2.61784 5.7513 2.49414 5.64063 2.39648C5.52995 2.29232 5.39323 2.24023 5.23047 2.24023C5.02214 2.24023 4.85612 2.31185 4.73242 2.45508C4.61523 2.5918 4.52734 2.76107 4.46875 2.96289C4.41016 3.1582 4.37435 3.36328 4.36133 3.57812C4.34831 3.79297 4.3418 3.972 4.3418 4.11523C4.3418 4.42773 4.35482 4.74023 4.38086 5.05273C4.4069 5.35872 4.4362 5.66797 4.46875 5.98047H6.38281V6.86914H4.61523L5.13281 11.3418C5.14583 11.4915 5.15885 11.6413 5.17188 11.791C5.19141 11.9473 5.20117 12.1003 5.20117 12.25C5.20117 12.5885 5.1556 12.9206 5.06445 13.2461C4.97331 13.5781 4.83333 13.8711 4.64453 14.125C4.46224 14.3854 4.22786 14.5937 3.94141 14.75C3.66146 14.9128 3.33268 14.9941 2.95508 14.9941C2.69466 14.9941 2.44401 14.9453 2.20313 14.8477C1.96875 14.7565 1.75716 14.6263 1.56836 14.457C1.38607 14.2878 1.23958 14.0859 1.12891 13.8516C1.01823 13.6237 0.962891 13.3763 0.962891 13.1094C0.962891 12.8945 1.03451 12.7187 1.17773 12.582C1.32096 12.4453 1.49675 12.377 1.70508 12.377C1.80273 12.377 1.89714 12.3932 1.98828 12.4258C2.08594 12.4648 2.17057 12.5169 2.24219 12.582C2.32031 12.6471 2.37891 12.722 2.41797 12.8066C2.46354 12.8978 2.48633 12.9954 2.48633 13.0996C2.48633 13.3079 2.4082 13.4902 2.25195 13.6465C2.29753 13.7897 2.37565 13.9102 2.48633 14.0078C2.59701 14.112 2.72721 14.1641 2.87695 14.1641C3.05273 14.1641 3.19596 14.1087 3.30664 13.998C3.42383 13.8939 3.51497 13.7637 3.58008 13.6074C3.64518 13.4577 3.6875 13.2949 3.70703 13.1191C3.73307 12.9499 3.74609 12.8001 3.74609 12.6699C3.74609 12.4225 3.72982 12.1751 3.69727 11.9277C3.67122 11.6803 3.63867 11.4329 3.59961 11.1855L3.58984 11.1758L3.0625 6.86914H1.60742V5.98047H2.96484C2.93229 5.73307 2.90625 5.48893 2.88672 5.24805C2.8737 5.00716 2.86719 4.76302 2.86719 4.51562C2.86719 4.15104 2.903 3.7832 2.97461 3.41211C3.04622 3.04102 3.16992 2.70898 3.3457 2.41602C3.52148 2.11654 3.7526 1.8724 4.03906 1.68359C4.33203 1.49479 4.69661 1.40039 5.13281 1.40039C5.39974 1.40039 5.65365 1.44922 5.89453 1.54687C6.13542 1.64453 6.34701 1.78125 6.5293 1.95703C6.7181 2.1263 6.86784 2.32812 6.97852 2.5625C7.08919 2.79687 7.14453 3.05078 7.14453 3.32422Z" />
        </svg>
    `

    static mouse = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M8.85714 8.34043H14L13.9143 6.6383H8.85714V0H7.14286V6.6383H2.08571L2 8.34043H7.14286H8.85714Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.85714 0C11 0.595745 13.4 3.31915 13.9143 6.6383H8.85714V0ZM7.14286 0C5 0.595745 2.6 3.31915 2.08571 6.6383H7.14286V0ZM8.85714 8.34043H7.14286H2C2 12.5957 3.02857 16 8 16C12.9714 16 14 12.5957 14 8.34043H8.85714Z" fill="white" />
        </svg>
    `

    static node = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="15" rx="1" fill="white" fill-opacity="0.5" />
            <rect x="0.5" y="0.5" width="15" height="14" rx="0.5" stroke="white" />
            <rect x="1" width="14" height="5" fill="white" />
        </svg>
    `

    static operationPin = x`
        <svg width="14" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle class="ueb-pin-tostroke" cx="16" cy="16" r="14" stroke="currentColor" stroke-width="4" />
            <circle cx="16" cy="16" r="9.5" fill="#817a7a" />
        </svg>
    `

    static pcgStackPin = x`
        <svg width="18" height="22" viewBox="4 0 28 36" xmlns="http://www.w3.org/2000/svg">
            <path stroke="black" stroke-width="1" fill="rgba(var(--ueb-pin-color-rgb), 0.5)"  d="M25.8,32.2V17.5c0-1.7,1.3-3.1,3-3.1s3,1.3,3,3.1v14.7c0,1.8-1.3,3.2-3,3.2C27,35.5,25.8,34,25.8,32.2z" />
            <path stroke="black" stroke-width="1" fill="rgba(var(--ueb-pin-color-rgb), 0.75)" d="M18.8,30.1V11.8c0-2.4,1.8-4.3,4-4.3s4,1.9,4,4.3v18.4c0,2.4-1.8,4.3-4,4.3C20.5,34.5,18.8,32.5,18.8,30.1z" />
            <path stroke="black" stroke-width="1" fill="currentColor" d="M21.3,6.4v21.3c0,3.2-2.4,5.8-5.5,5.8s-5.5-2.5-5.5-5.8V6.3c0-3.2,2.4-5.8,5.5-5.8C18.8,0.5,21.2,3,21.3,6.4z" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="10.2" cy="9" r="6" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="10.2" cy="17" r="6" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="10.2" cy="25" r="6" />
        </svg>
    `

    static pcgPin = x`
        <svg class="ueb-pin-reflect-output" width="12" height="20" viewBox="8 0 20 36" xmlns="http://www.w3.org/2000/svg">
            <path stroke="black" stroke-width="1" fill="currentColor" d="M21.2,34.5c-3.1,0-5.5-2.6-5.5-5.8V7.3c0-3.3,2.4-5.8,5.5-5.8s5.5,2.6,5.5,5.8v21.3C26.8,31.9,24.3,34.5,21.2,34.5z" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="15.8" cy="10" r="6" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="15.8" cy="18" r="6" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="15.8" cy="26" r="6" />
        </svg>
    `

    static pcgParamPin = x`
        <svg class="ueb-pin-reflect-output" width="18" height="12" viewBox="8 8 19 21" xmlns="http://www.w3.org/2000/svg">
            <path class="ueb-pin-tofill" stroke="currentcolor" stroke-width="1" d="M8,18c-2.5,0-4.5-2-4.5-4.5S5.5,9,8,9h20c2.5,0,4.5,2,4.5,4.5S30.5,18,28,18H8z" />
            <path fill="currentColor" d="M31,27.5H13c-0.5,0-1-0.4-1-1v-4c0-0.5,0.4-1,1-1h18c0.5,0,1,0.4,1,1v4C32,27.1,31.6,27.5,31,27.5z" />
        </svg>
    `

    static pcgSpatialPin = x`
        <svg width="14" height="16" viewBox="5 4 28 28" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#ffffff" stroke-width="1" fill="#808080" d="M20.5,33h-10c-2.8,0-5-2.2-5-5V8c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v20C25.5,30.8,23.3,33,20.5,33z" />
            <circle class="ueb-pin-tofill" stroke="#ffffff" stroke-width="1" fill="#202020" cx="23.7" cy="18" r="10" />
        </svg>
    `

    static plusCircle = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8.00016 10.6667V5.33334M5.3335 8H10.6668M8.00016 1.33334C4.31826 1.33334 1.3335 4.3181 1.3335 8C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8C14.6668 4.3181 11.6821 1.33334 8.00016 1.33334Z" />
        </svg>
    `

    static questionMark = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 15C9.10456 15 10 14.1046 10 13C10 11.8954 9.10456 11 8 11C6.89544 11 6 11.8954 6 13C6 14.1046 6.89544 15 8 15Z" fill="white" />
            <path d="M5 4.86697C5.15 3.33619 6.5 2.26465 8 2.26465C9.65 2.26465 11 3.64235 11 5.3262C11 7.01005 8 7.92852 8 9.00006" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `

    static referencePin = x`
        <svg width="12" height="12" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <polygon class="ueb-pin-tofill" points="4 16 16 4 28 16 16 28" stroke="currentColor" stroke-width="5" />
        </svg>
    `

    static reject = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="red" stroke-width="2" stroke-miterlimit="10" d="M12.5 3.5L3.5 12.5" />
            <path fill="red" d="M8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2ZM8 0.5C3.9 0.5 0.5 3.9 0.5 8C0.5 12.1 3.9 15.5 8 15.5C12.1 15.5 15.5 12.1 15.5 8C15.5 3.9 12.1 0.5 8 0.5Z" />
        </svg>
    `

    static setPin = x`
        <svg width="16" height="16" viewBox="2 2 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7.99956V6.99956C1.62451 6.89501 2.23976 6.7412 2.84 6.53956C3.02865 6.44859 3.18802 6.30655 3.3 6.12956C3.44478 5.91383 3.53723 5.6673 3.57 5.40956C3.6183 5.04164 3.63836 4.67055 3.63 4.29956C3.60615 3.68664 3.64974 3.07296 3.76 2.46956C3.82982 2.152 3.99359 1.86279 4.23 1.63956C4.51974 1.39713 4.86221 1.22589 5.23 1.13956C5.68612 1.03782 6.15275 0.990826 6.62 0.999563H7V1.99956C6.69952 2.01634 6.4103 2.11967 6.16722 2.2971C5.92414 2.47453 5.73757 2.71849 5.63 2.99956C5.5431 3.18346 5.5052 3.3867 5.52 3.58956C5.52 3.86956 5.52 4.40956 5.46 5.19956C5.44584 5.56977 5.38194 5.9364 5.27 6.28956C5.18779 6.5495 5.05527 6.79074 4.88 6.99956C4.62654 7.36597 4.33121 7.70157 4 7.99956" fill="currentColor" />
            <path d="M4 7.99951C4.33723 8.31397 4.63295 8.67019 4.88 9.05951C5.05095 9.2601 5.18319 9.49067 5.27 9.73951C5.38194 10.0927 5.44584 10.4593 5.46 10.8295C5.5 11.6228 5.52 12.1628 5.52 12.4495C5.5061 12.6523 5.54395 12.8553 5.63 13.0395C5.74563 13.3117 5.93533 13.546 6.17752 13.7157C6.41972 13.8854 6.70468 13.9837 7 13.9995V14.9995H6.62C6.15021 15.0156 5.68019 14.9753 5.22 14.8795C4.85378 14.7889 4.51224 14.6181 4.22 14.3795C3.98551 14.1548 3.8221 13.8662 3.75 13.5495C3.64077 12.946 3.59718 12.3324 3.62 11.7195C3.63014 11.3418 3.61007 10.964 3.56 10.5895C3.52723 10.3318 3.43478 10.0852 3.29 9.86951C3.17802 9.69252 3.01865 9.55048 2.83 9.45951C2.23302 9.25838 1.62113 9.10457 1 8.99951V7.99951" fill="currentColor" />
            <path d="M12 7.99955C11.6688 7.70156 11.3735 7.36596 11.12 6.99955C10.947 6.79667 10.8146 6.56242 10.73 6.30955C10.6181 5.95638 10.5542 5.58976 10.54 5.21954C10.54 4.42954 10.48 3.88955 10.48 3.60955C10.4983 3.40004 10.4604 3.18944 10.37 2.99955C10.2624 2.71847 10.0759 2.47452 9.83278 2.29708C9.5897 2.11965 9.30048 2.01632 9 1.99955V0.999545H9.38C9.84979 0.983442 10.3198 1.02373 10.78 1.11955C11.1478 1.20587 11.4903 1.37711 11.78 1.61955C12.0164 1.84278 12.1802 2.13198 12.25 2.44955C12.3603 3.05294 12.4039 3.66662 12.38 4.27955C12.3706 4.6572 12.3907 5.03501 12.44 5.40954C12.4728 5.66728 12.5652 5.91382 12.71 6.12955C12.822 6.30653 12.9813 6.44858 13.17 6.53955C13.767 6.74067 14.3789 6.89448 15 6.99955V7.99955" fill="currentColor" />
            <path d="M15 7.99951V8.99951C14.3755 9.10406 13.7602 9.25787 13.16 9.45951C12.9713 9.55048 12.812 9.69252 12.7 9.86951C12.5552 10.0852 12.4628 10.3318 12.43 10.5895C12.3799 10.964 12.3599 11.3418 12.37 11.7195C12.3928 12.3324 12.3492 12.946 12.24 13.5495C12.1679 13.8662 12.0045 14.1548 11.77 14.3795C11.4778 14.6181 11.1362 14.7889 10.77 14.8795C10.3098 14.9753 9.83979 15.0156 9.37 14.9995H9V13.9995C9.2998 13.9803 9.58791 13.876 9.83056 13.6989C10.0732 13.5218 10.2603 13.2792 10.37 12.9995C10.456 12.8153 10.4939 12.6123 10.48 12.4095C10.48 12.1162 10.5 11.5762 10.54 10.7895C10.5542 10.4193 10.6181 10.0527 10.73 9.69951C10.8168 9.45067 10.9491 9.2201 11.12 9.01951C11.3698 8.64424 11.6654 8.30159 12 7.99951" fill="currentColor" />
        </svg>
    `

    static select = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="2" width="6" height="2" fill="white" />
            <rect x="10" y="7" width="3" height="2" fill="white" />
            <path d="M12 5L15 8L12 11V5Z" fill="white" />
            <rect x="1" y="7" width="8" height="2" fill="white" />
            <rect x="5" y="4" width="2" height="9" fill="white" />
            <rect x="1" y="12" width="6" height="2" fill="white" />
        </svg>
    `

    static sequence = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="5" height="2" fill="white" />
            <rect y="7" width="8" height="2" fill="white" />
            <rect x="3" y="4" width="2" height="9" fill="white" />
            <rect x="3" y="12" width="5" height="2" fill="white" />
            <rect x="10" y="2" width="6" height="2" fill="white" />
            <rect x="10" y="7" width="4" height="2" fill="white" />
            <rect x="10" y="12" width="2" height="2" fill="white" />
        </svg>
    `

    static sound = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5H3L7 1V15L3 11H0V5Z" fill="white" />
            <path opacity="0.5" d="M9 1C13 2.7 15 5.4 15 8C15 10.6 13 13.3 9 15C11.5 12.8 12.7 10.4 12.7 8C12.7 5.6 11.5 3.2 9 1Z" fill="white" />
            <path opacity="0.5" d="M9 5C10.3 5.7 11 6.9 11 8C11 9.1 10.3 10.3 9 11C9.8 10 9.8 6 9 5Z" fill="white" />
        </svg>
    `

    static spawnActor = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.38 12.62L7 11.5L10.38 10.38L11.5 7L12.63 10.38L16 11.5L12.63 12.62L11.5 16L10.38 12.62Z" fill="white" />
            <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M4 14H2L3 10L0 14V16H10L9 14H4Z" fill="white" />
            <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M2 6C1.9996 7.10384 2.30372 8.1864 2.87889 9.12854C3.45406 10.0707 4.27798 10.8359 5.26 11.34L9 9L11.5 5L13.78 7.6C13.9251 7.07902 13.9991 6.54081 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.63214 9.5913 0 8 0C6.4087 0 4.88258 0.63214 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6V6Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22005 0.810059H8.00005C6.62265 0.810056 5.30153 1.35654 4.32663 2.32957C3.35172 3.30259 2.8027 4.62266 2.80005 6.00006C2.79984 7.03987 3.11257 8.05567 3.69756 8.91532C4.28255 9.77497 5.11271 10.4387 6.08005 10.8201L7.17005 10.1401C6.16687 9.86642 5.28119 9.27116 4.64894 8.44562C4.01669 7.62008 3.6728 6.60989 3.67005 5.57006C3.66886 4.34318 4.14143 3.16323 4.98917 2.27635C5.83692 1.38948 6.99437 0.864185 8.22005 0.810059V0.810059Z" fill="white" />
            <path d="M10.0401 5.16001C10.7028 5.16001 11.2401 4.62275 11.2401 3.96001C11.2401 3.29727 10.7028 2.76001 10.0401 2.76001C9.37735 2.76001 8.84009 3.29727 8.84009 3.96001C8.84009 4.62275 9.37735 5.16001 10.0401 5.16001Z" fill="white" />
        </svg>
    `

    static staticPin = x`
        <svg width="16" height="12" viewBox="1 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="ueb-pin-tofill" d="M1 7C1 4 3 1 7 1C10 1 14 3 17 6C18 7 18 7 17 8C14 11 10 13 7 13C3 13 1 10 1 7Z" fill="none" stroke="currentColor" stroke-width="2" />
            <path class="ueb-pin-tostroke" d="M 9 4 V 3.5 H 5 V 7 H 9 V 10.5 H 5 V 10" stroke="currentColor" stroke-width="2" />
        </svg>
    `

    static switch = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="6" height="2" fill="white" />
            <rect y="7" width="9" height="2" fill="white" />
            <rect x="3" y="4" width="2" height="9" fill="white" />
            <rect x="3" y="12" width="6" height="2" fill="white" />
            <rect x="10" y="2" width="3" height="2" fill="white" />
            <path d="M12 0L15 3L12 6V0Z" fill="white" />
        </svg>
    `

    static timer = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.5C3.9 0.5 0.5 3.9 0.5 8C0.5 12.1 3.9 15.5 8 15.5C12.1 15.5 15.5 12.1 15.5 8C15.5 3.9 12.1 0.5 8 0.5ZM8 14.1C4.6 14.1 1.9 11.4 1.9 8C1.9 4.6 4.6 1.90002 8 1.90002C11.4 1.90002 14.1 4.6 14.1 8C14.1 11.4 11.4 14.1 8 14.1Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.60003 3.19995H7.40002V8.49994L10.5 11.4999L11.4 10.5999L8.60003 7.99994V3.19995Z" fill="white" />
        </svg>
    `

    static touchpad = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M13 0H3C2.4 0 2 0.4 2 1V15C2 15.6 2.4 16 3 16H13C13.6 16 14 15.6 14 15V1C14 0.4 13.6 0 13 0ZM8 15.5C7.2 15.5 6.5 14.8 6.5 14C6.5 13.2 7.2 12.5 8 12.5C8.8 12.5 9.5 13.2 9.5 14C9.5 14.8 8.8 15.5 8 15.5ZM13 12H3V1H13V12Z" />
            <path opacity="0.5" d="M13 1H3V12H13V1Z" fill="white" />
        </svg>
    `
}

class BooleanEntity extends IEntity {

    static grammar = this.createGrammar()
    static booleanConverter = {
        fromAttribute: (value, type) => {
        },
        toAttribute: (value, type) => {
            if (value === true) {
                return "true"
            }
            if (value === false) {
                return "false"
            }
            return ""
        }
    }

    #uppercase = true
    get uppercase() {
        return this.#uppercase
    }
    set uppercase(value) {
        this.#uppercase = value;
    }

    /** @returns {P<BooleanEntity>} */
    static createGrammar() {
        return Parsernostrum.regArray(/(true)|(True)|(false)|(False)/)
            .map(v => {
                const result = (v[1] ?? v[2]) ? new this(true) : new this(false);
                result.uppercase = (v[2] ?? v[4]) !== undefined;
                return result
            })
            .label("BooleanEntity")
    }

    constructor(value = false) {
        super();
        this.value = value;
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value
            ? this.#uppercase ? "True" : "true"
            : this.#uppercase ? "False" : "false";
        if (Self.serialized) {
            result = `"${result}"`;
        }
        return result
    }

    valueOf() {
        return this.value
    }
}

/** @template {typeof IEntity} T */
class MirroredEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type

    /** @param {() => InstanceType<T>} getter */
    constructor(getter = null) {
        super();
        const self = /** @type {typeof MirroredEntity<T>} */(this.constructor);
        getter ??= self.default !== undefined ? /** @type {MirroredEntity} */(self.default(self)).getter : getter;
        this.getter = getter;
    }

    static createGrammar(elementGrammar = this.type?.grammar ?? Parsernostrum.lazy(() => this.unknownEntityGrammar)) {
        return this.type?.grammar.map(v => new this(() => v))
    }


    /**
     * @template {typeof IEntity} T
     * @this {T}
     * @param {(type: T) => (InstanceType<T> | NullEntity)} value
     * @returns {T}
     */
    // @ts-expect-error
    static withDefault(value = type => new type(() => new (type.type)())) {
        // @ts-expect-error
        return super.withDefault(value)
    }

    /**
     * @template {typeof IEntity} T
     * @param {T} type
     */
    static of(type) {
        const result = /** @type {{type: T, grammar: P<MirroredEntity<T>> } & typeof MirroredEntity<T>} */(
            this.asUniqueClass()
        );
        result.type = type;
        result.grammar = result.createGrammar();
        return result
    }

    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof MirroredEntity<T>} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        const value = this.getter();
        return value.serialize(insideString, indentation, Self.type, printKey, keySeparator, attributeSeparator, wrap)
    }

    /** @param {IEntity} other */
    equals(other) {
        if (other instanceof MirroredEntity) {
            other = other.getter?.();
        }
        return this.getter?.().equals(other)
    }

    /** @returns {InstanceType<T>} */
    valueOf(arg) {
        // @ts-expect-error
        return this.getter(arg).valueOf()
    }

    toString() {
        return this.getter().toString()
    }
}

class NumberEntity extends IEntity {

    static numberRegexSource = String.raw`${Grammar.numberRegexSource}(?<=(?:\.(\d*0+))?)`
    static grammar = this.createGrammar()
    /** @type {Number} */
    static precision // Can override this.precision

    #precision
    get precision() {
        return /** @type {typeof NumberEntity} */(this.constructor).precision ?? this.#precision
    }
    set precision(value) {
        this.#precision = value;
    }

    /**
     * @protected
     * @type {Number}
     */
    _value
    get value() {
        return this._value
    }
    set value(value) {
        if (value === -0) {
            value = 0;
        }
        this._value = value;
    }

    constructor(value = 0, precision = null) {
        super();
        this.value = Number(value);
        if (precision !== null) {
            this.#precision = Number(precision);
        }
    }

    /** @returns {P<NumberEntity>} */
    static createGrammar() {
        return Parsernostrum.regArray(
            new RegExp(`(?<n>${this.numberRegexSource})|(?<posInf>\\+?inf)|(?<negInf>-inf)`)
        ).map(({ 2: precision, groups: { n, posInf, negInf } }) => new this(
            n ? Number(n) : posInf ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY,
            precision?.length
        )
        ).label("NumberEntity")
    }

    /**
     * @template {typeof NumberEntity} T
     * @this {T}
     * @returns {T}
     */
    static withPrecision(value = 0) {
        const result = this.asUniqueClass();
        result.precision = value;
        return result
    }

    /** @param {Number} num */
    static printNumber(num) {
        if (num == Number.POSITIVE_INFINITY) {
            return "inf"
        } else if (num == Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        return Utility.minDecimals(num)
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof NumberEntity} */(this.constructor),
    ) {
        if (this.value === Number.POSITIVE_INFINITY) {
            return "+inf"
        }
        if (this.value === Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        const precision = Self.precision ?? this.precision;
        let result = precision !== undefined ? this.value.toFixed(precision) : this.value.toString();
        if (Self.serialized) {
            result = `"${result}"`;
        }
        return result
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}

class VectorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
        Z: NumberEntity.withDefault(),
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values);
        /** @type {InstanceType<typeof VectorEntity.attributes.X>} */ this.X;
        /** @type {InstanceType<typeof VectorEntity.attributes.Y>} */ this.Y;
        /** @type {InstanceType<typeof VectorEntity.attributes.X>} */ this.Z;
    }

    /** @returns {P<VectorEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this, Grammar.commaSeparation, 1).label("VectorEntity")
    }

    /** @returns {[Number, Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf(), this.Z.valueOf()]
    }
}

const sequencerScriptingNameRegex = /\/Script\/SequencerScripting\.MovieSceneScripting(.+)Channel/;
const keyNameValue = {
    "A_AccentGrave": "à",
    "Add": "Num +",
    "C_Cedille": "ç",
    "Decimal": "Num .",
    "Divide": "Num /",
    "E_AccentAigu": "é",
    "E_AccentGrave": "è",
    "F1": "F1", // Otherwise F and number will be separated
    "F10": "F10",
    "F11": "F11",
    "F12": "F12",
    "F2": "F2",
    "F3": "F3",
    "F4": "F4",
    "F5": "F5",
    "F6": "F6",
    "F7": "F7",
    "F8": "F8",
    "F9": "F9",
    "Gamepad_Special_Left_X": "Touchpad Button X Axis",
    "Gamepad_Special_Left_Y": "Touchpad Button Y Axis",
    "Mouse2D": "Mouse XY 2D-Axis",
    "Multiply": "Num *",
    "Section": "§",
    "Subtract": "Num -",
    "Tilde": "`",
};
const niagaraNodeNames = {
    "Boolean::LogicAnd": "Logic AND",
    "Boolean::LogicEq": "==",
    "Boolean::LogicNEq": "!=",
    "Boolean::LogicNot": "Logic NOT",
    "Boolean::LogicOr": "Logic OR",
    "Integer::BitAnd": "Bitwise AND",
    "Integer::BitLShift": "Bitwise Left Shift",
    "Integer::BitNot": "Bitwise NOT",
    "Integer::BitOr": "Bitwise OR",
    "Integer::BitRShift": "Bitwise Right Shift",
    "Integer::BitXOr": "Bitwise XOR",
    "Integer::EnumEq": "==",
    "Integer::EnumNEq": "!=",
    "Matrix::MatrixMultiply": "Multiply (Matrix * Matrix)",
    "Matrix::MatrixVectorMultiply": "Multiply (Matrix * Vector4)",
    // Numeric::
    ...Object.fromEntries(Object.entries({
        "Add": "+",
        "ArcCosine": "ArcCosine",
        "ArcCosine(Degrees)": "ArcCos(D)",
        "ArcCosine(Radians)": "ArcCos(R)",
        "ArcSine": "ArcSine",
        "ArcSine(Degrees)": "ArcSin(D)",
        "ArcSine(Radians)": "ArcSin(R)",
        "ArcTangent(Degrees)": "ArcTan(D)",
        "ArcTangent(Radians)": "ArcTan(R)",
        "CmpEQ": "==",
        "CmpGE": ">=",
        "CmpGT": ">",
        "CmpLE": "<=",
        "CmpLT": "<",
        "CmpNEQ": "!=",
        "Cosine(Degrees)": "Cos(D)",
        "Cosine(Radians)": "Cos(R)",
        "DegreesToRadians": "DegToRad",
        "DistancePos": "Distance",
        "Div": String.fromCharCode(0x00f7),
        "FMod": "%",
        "FModFast": "Modulo Fast",
        "Length": "Len",
        "Madd": `(A${String.fromCharCode(0x2a2f)}B)+C`,
        "Mul": String.fromCharCode(0x2a2f),
        "Negate": "-A",
        "OneMinus": "1-A",
        "PI": String.fromCharCode(0x03C0),
        "RadiansToDegrees": "RadToDeg",
        "Rand Float": "Random Float",
        "Rand Integer": "Random Integer",
        "Rand": "Random",
        "Rcp": "Reciprocal",
        "RSqrt": "Rcp Sqrt",
        "Sine(Degrees)": "Sin(D)",
        "Sine(Radians)": "Sin(R)",
        "Subtract": "-",
        "Tangent(Degrees)": "Tan(D)",
        "Tangent(Radians)": "Tan(R)",
        "TWO_PI": `2 ${String.fromCharCode(0x03C0)}`,
    }).map(([k, v]) => ["Numeric::" + k, v])),
};
const p$3 = Configuration.paths;
const format = Utility.formatStringName;

/** @param {String} value */
function numberFromText(value = "") {
    value = value.toLowerCase();
    switch (value) {
        case "zero": return 0
        case "one": return 1
        case "two": return 2
        case "three": return 3
        case "four": return 4
        case "five": return 5
        case "six": return 6
        case "seven": return 7
        case "eight": return 8
        case "nine": return 9
    }
}

function keyName(value) {
    /** @type {String} */
    let result = keyNameValue[value];
    if (result) {
        return result
    }
    result = numberFromText(value)?.toString();
    if (result) {
        return result
    }
    const match = value.match(/NumPad([a-zA-Z]+)/);
    if (match) {
        result = numberFromText(match[1]).toString();
        if (result) {
            return "Num " + result
        }
    }
}

/**
 * @param {ObjectEntity} entity
 * @returns {String}
 */
function nodeTitle(entity) {
    let value;
    switch (entity.getType()) {
        case p$3.addDelegate:
            value ??= "Bind Event to ";
        case p$3.clearDelegate:
            value ??= "Unbind all Events from ";
        case p$3.removeDelegate:
            value ??= "Unbind Event from ";
            return value + format(
                entity.DelegateReference?.MemberName?.toString().replace(/Delegate$/, "") ?? "None"
            )
        case p$3.asyncAction:
            if (entity.ProxyFactoryFunctionName) {
                return format(entity.ProxyFactoryFunctionName?.toString())
            }
        case p$3.actorBoundEvent:
        case p$3.componentBoundEvent:
            return `${format(entity.DelegatePropertyName?.toString())} (${entity.ComponentPropertyName?.toString() ?? "Unknown"})`
        case p$3.callDelegate:
            return `Call ${entity.DelegateReference?.MemberName?.toString() ?? "None"}`
        case p$3.createDelegate:
            return "Create Event"
        case p$3.customEvent:
            if (entity.CustomFunctionName) {
                return entity.CustomFunctionName?.toString()
            }
        case p$3.dynamicCast:
            if (!entity.TargetType) {
                return "Bad cast node" // Target type not found
            }
            return `Cast To ${entity.TargetType?.getName()}`
        case p$3.enumLiteral:
            return `Literal enum ${entity.Enum?.getName()}`
        case p$3.event:
            return `Event ${(entity.EventReference?.MemberName?.toString() ?? "").replace(/^Receive/, "")}`
        case p$3.executionSequence:
            return "Sequence"
        case p$3.forEachElementInEnum:
            return `For Each ${entity.Enum?.getName()}`
        case p$3.forEachLoopWithBreak:
            return "For Each Loop with Break"
        case p$3.functionEntry:
            return entity.FunctionReference?.MemberName?.toString() === "UserConstructionScript"
                ? "Construction Script"
                : entity.FunctionReference?.MemberName?.toString()
        case p$3.functionResult:
            return "Return Node"
        case p$3.ifThenElse:
            return "Branch"
        case p$3.makeStruct:
            if (entity.StructType) {
                return `Make ${entity.StructType.getName()}`
            }
        case p$3.materialExpressionComponentMask: {
            const materialObject = entity.getMaterialSubobject();
            if (materialObject) {
                return `Mask ( ${Configuration.rgba
                    .filter(k => /** @type {MirroredEntity<typeof BooleanEntity>} */(materialObject[k]).getter().value === true)
                    .map(v => v + " ")
                    .join("")})`
            }
        }
        case p$3.materialExpressionConstant:
            value ??= [entity.getCustomproperties().find(pinEntity => pinEntity.PinName.toString() == "Value")?.DefaultValue];
        case p$3.materialExpressionConstant2Vector:
            value ??= [
                entity.getCustomproperties().find(pinEntity => pinEntity.PinName?.toString() == "X")?.DefaultValue,
                entity.getCustomproperties().find(pinEntity => pinEntity.PinName?.toString() == "Y")?.DefaultValue,
            ];
        case p$3.materialExpressionConstant3Vector:
        case p$3.materialExpressionConstant4Vector:
            if (!value) {
                const vector = entity.getCustomproperties()
                    .find(pinEntity => pinEntity.PinName?.toString() == "Constant")
                    ?.DefaultValue;
                value = vector instanceof VectorEntity ? [vector.X, vector.Y, vector.Z].map(v => v.valueOf())
                    : vector instanceof LinearColorEntity ? [vector.R, vector.G, vector.B, vector.A].map(v => v.valueOf())
                        : /** @type {Number[]} */([]);
            }
            if (value?.length > 0) {
                return value.map(v => Utility.printExponential(v)).join(",")
            }
            value = undefined;
            break
        case p$3.materialExpressionFunctionInput: {
            const materialObject = entity.getMaterialSubobject();
            const inputName = materialObject?.InputName ?? "In";
            const inputType = materialObject?.InputType?.value.match(/^.+?_(\w+)$/)?.[1] ?? "Vector3";
            return `Input ${inputName} (${inputType})`
        }
        case p$3.materialExpressionLogarithm:
            return "Ln"
        case p$3.materialExpressionLogarithm10:
            return "Log10"
        case p$3.materialExpressionLogarithm2:
            return "Log2"
        case p$3.materialExpressionMaterialFunctionCall:
            const materialFunction = entity.getMaterialSubobject()?.MaterialFunction;
            if (materialFunction) {
                return materialFunction.getName()
            }
            break
        case p$3.materialExpressionSquareRoot:
            return "Sqrt"
        case p$3.materialExpressionSubtract:
            const materialObject = entity.getMaterialSubobject();
            if (materialObject) {
                return `Subtract(${materialObject.ConstA ?? "1"},${materialObject.ConstB ?? "1"})`
            }
        case p$3.metasoundEditorGraphExternalNode: {
            const name = entity["ClassName"]?.["Name"];
            if (name) {
                switch (name) {
                    case "Add": return "+"
                    default: return name
                }
            }
        }
        case p$3.niagaraNodeConvert:
            /** @type {String} */
            const targetType = (entity["AutowireMakeType"]?.["ClassStructOrEnum"] ?? "")
                .toString()
                .match(/(?:Niagara)?(\w+)['"]*$/)
                ?.[1]
                ?? "";
            return `Make ${targetType}`
        case p$3.pcgEditorGraphNodeInput:
            return "Input"
        case p$3.pcgEditorGraphNodeOutput:
            return "Output"
        case p$3.soundNodeWavePlayer:
            return `Wave Player : ${entity.getSounCueSubobject()
                ?.SoundWaveAssetPtr
                ?.type
                .match(/([^.]+)$/)
                ?.[0]
                ?? "NONE"}`
        case p$3.spawnActorFromClass:
            let className = entity.getCustomproperties()
                .find(pinEntity => pinEntity.PinName.toString() == "ReturnValue")
                ?.PinType
                ?.PinSubCategoryObject
                ?.getName();
            if (className === "Actor") {
                className = null;
            }
            return `SpawnActor ${format(className ?? "NONE")}`
        case p$3.switchEnum:
            return `Switch on ${entity.Enum?.getName() ?? "Enum"}`
        case p$3.switchInteger:
            return `Switch on Int`
        case p$3.variableGet:
            return ""
        case p$3.variableSet:
            return "SET"
    }
    const className = entity.getClass();
    let switchTarget = entity.switchTarget();
    if (switchTarget) {
        if (switchTarget[0] !== "E") {
            switchTarget = format(switchTarget);
        }
        return `Switch on ${switchTarget}`
    }
    if (entity.isComment()) {
        return entity.NodeComment.toString()
    }
    const keyNameSymbol = entity.getHIDAttribute();
    if (keyNameSymbol) {
        const name = keyNameSymbol.toString();
        let title = keyName(name) ?? format(name);
        if (className === p$3.inputDebugKey) {
            title = "Debug Key " + title;
        } else if (className === p$3.getInputAxisKeyValue) {
            title = "Get " + title;
        }
        return title
    }
    if (className === p$3.macro) {
        return format(entity.MacroGraphReference?.getMacroName())
    }
    const materialSubobject = entity.getMaterialSubobject();
    if (materialSubobject) {
        let result = nodeTitle(materialSubobject);
        result = result.match(/Material Expression (.+)/)?.[1] ?? result;
        return result
    }
    if (entity.isPcg() && entity.getPcgSubobject()) {
        let pcgSubobject = entity.getPcgSubobject();
        let result = pcgSubobject.NodeTitle ? pcgSubobject.NodeTitle.toString() : nodeTitle(pcgSubobject);
        return result
    }
    const soundCueSubobject = entity.getSounCueSubobject();
    if (soundCueSubobject) {
        return Utility.formatStringName(soundCueSubobject.getObjectName(true).replace(/^SoundNode/, ""))
    }
    const subgraphObject = entity.getSubgraphObject();
    if (subgraphObject) {
        return subgraphObject.Graph.getName()
    }
    const settingsObject = entity.getSettingsObject();
    if (settingsObject) {
        if (settingsObject.ExportPath?.valueOf()?.type === p$3.pcgHiGenGridSizeSettings) {
            return `Grid Size: ${(
                settingsObject.HiGenGridSize?.toString().match(/\d+/)?.[0]?.concat("00")
                ?? settingsObject.HiGenGridSize?.toString().match(/^\w+$/)?.[0]
            ) ?? "256"}`
        }
        if (settingsObject.BlueprintElementInstance) {
            return format(settingsObject.BlueprintElementType.getName())
        }
        if (settingsObject.Operation) {
            const match = settingsObject.Name?.toString().match(/PCGMetadata(\w+)Settings_\d+/);
            if (match) {
                return format(match[1] + ": " + settingsObject.Operation)
            }
        }
        const settingsSubgraphObject = settingsObject.getSubgraphObject();
        if (settingsSubgraphObject && settingsSubgraphObject.Graph) {
            return settingsSubgraphObject.Graph.getName()
        }
    }
    let memberName = entity.FunctionReference?.MemberName?.toString();
    if (memberName) {
        const memberParent = entity.FunctionReference.MemberParent?.path ?? "";
        switch (memberName) {
            case "AddKey":
                let result = memberParent.match(sequencerScriptingNameRegex);
                if (result) {
                    return `Add Key (${format(result[1])})`
                }
            case "Concat_StrStr":
                return "Append"
        }
        const memberNameTraceLineMatch = memberName.match(Configuration.lineTracePattern);
        if (memberNameTraceLineMatch) {
            return "Line Trace"
                + (memberNameTraceLineMatch[1] === "Multi" ? " Multi " : " ")
                + (memberNameTraceLineMatch[2] === ""
                    ? "By Channel"
                    : format(memberNameTraceLineMatch[2])
                )
        }
        switch (memberParent) {
            case p$3.blueprintGameplayTagLibrary:
            case p$3.kismetMathLibrary:
            case p$3.kismetStringLibrary:
            case p$3.slateBlueprintLibrary:
            case p$3.timeManagementBlueprintLibrary:
            case p$3.typedElementHandleLibrary:
                const leadingLetter = memberName.match(/[BF]([A-Z]\w+)/);
                if (leadingLetter) {
                    // Some functions start with B or F (Like FCeil, FMax, BMin)
                    memberName = leadingLetter[1];
                }
                switch (memberName) {
                    case "Abs": return "ABS"
                    case "BooleanAND": return "AND"
                    case "BooleanNAND": return "NAND"
                    case "BooleanOR": return "OR"
                    case "Equal": return "=="
                    case "Exp": return "e"
                    case "LineTraceSingle": return "Line Trace By Channel"
                    case "Max": return "MAX"
                    case "MaxInt64": return "MAX"
                    case "Min": return "MIN"
                    case "MinInt64": return "MIN"
                    case "Not_PreBool": return "NOT"
                    case "Sin": return "SIN"
                    case "Sqrt": return "SQRT"
                    case "Square": return "^2"
                    // Dot products not respecting MemberName pattern
                    case "CrossProduct2D": return "cross"
                    case "Vector4_CrossProduct3": return "cross3"
                    case "DotProduct2D":
                    case "Vector4_DotProduct":
                        return "dot"
                    case "Vector4_DotProduct3": return "dot3"
                }
                if (memberName.startsWith("Add_")) {
                    return "+"
                }
                if (memberName.startsWith("And_")) {
                    return "&"
                }
                if (memberName.startsWith("Conv_")) {
                    return "" // Conversion nodes do not have visible names
                }
                if (memberName.startsWith("Cross_")) {
                    return "cross"
                }
                if (memberName.startsWith("Divide_")) {
                    return String.fromCharCode(0x00f7)
                }
                if (memberName.startsWith("Dot_")) {
                    return "dot"
                }
                if (memberName.startsWith("EqualEqual_")) {
                    return "=="
                }
                if (memberName.startsWith("Greater_")) {
                    return ">"
                }
                if (memberName.startsWith("GreaterEqual_")) {
                    return ">="
                }
                if (memberName.startsWith("Less_")) {
                    return "<"
                }
                if (memberName.startsWith("LessEqual_")) {
                    return "<="
                }
                if (memberName.startsWith("Multiply_")) {
                    return String.fromCharCode(0x2a2f)
                }
                if (memberName.startsWith("Not_")) {
                    return "~"
                }
                if (memberName.startsWith("NotEqual_")) {
                    return "!="
                }
                if (memberName.startsWith("Or_")) {
                    return "|"
                }
                if (memberName.startsWith("Percent_")) {
                    return "%"
                }
                if (memberName.startsWith("Subtract_")) {
                    return "-"
                }
                if (memberName.startsWith("Xor_")) {
                    return "^"
                }
                break
            case p$3.blueprintSetLibrary:
                {
                    const setOperationMatch = memberName.match(/Set_(\w+)/);
                    if (setOperationMatch) {
                        return format(setOperationMatch[1]).toUpperCase()
                    }
                }
                break
            case p$3.blueprintMapLibrary:
                {
                    const setOperationMatch = memberName.match(/Map_(\w+)/);
                    if (setOperationMatch) {
                        return format(setOperationMatch[1]).toUpperCase()
                    }
                }
                break
            case p$3.kismetArrayLibrary:
                {
                    const arrayOperationMath = memberName.match(/Array_(\w+)/);
                    if (arrayOperationMath) {
                        return arrayOperationMath[1].toUpperCase()
                    }
                }
                break
        }
        return format(memberName)
    }
    if (entity.OpName) {
        return niagaraNodeNames[entity.OpName.toString()]
            ?? format(entity.OpName.toString().replaceAll(/(?:^\w+(?<!^Matrix))?::/g, " "))
    }
    if (entity.FunctionDisplayName) {
        return format(entity.FunctionDisplayName.toString())
    }
    if (entity.ObjectRef) {
        return entity.ObjectRef.getName()
    }
    let prefix;
    if (
        className.startsWith(prefix = "/Script/NiagaraEditor.NiagaraNodeParameter")
        || className.startsWith(prefix = "/Script/NiagaraEditor.NiagaraNode")
    ) {
        return entity["Input"]?.["Name"]?.toString() ?? format(className.substring(prefix.length))
    }
    if (entity.ParameterName) {
        return entity.ParameterName.toString()
    }
    return format(entity.getNameAndCounter()[0])
}

const p$2 = Configuration.paths;

/** @param {ObjectEntity} entity */
function nodeIcon(entity) {
    if (entity.isMaterial() || entity.isPcg() || entity.isSoundCue() || entity.isNiagara()) {
        return null
    }
    switch (entity.getType()) {
        case p$2.addDelegate:
        case p$2.asyncAction:
        case p$2.callDelegate:
        case p$2.clearDelegate:
        case p$2.createDelegate:
        case p$2.functionEntry:
        case p$2.functionResult:
        case p$2.removeDelegate:
            return SVGIcon.node
        case p$2.customEvent: return SVGIcon.event
        case p$2.doN: return SVGIcon.doN
        case p$2.doOnce: return SVGIcon.doOnce
        case p$2.dynamicCast: return SVGIcon.cast
        case p$2.enumLiteral: return SVGIcon.enum
        case p$2.event: return SVGIcon.event
        case p$2.executionSequence:
        case p$2.multiGate:
            return SVGIcon.sequence
        case p$2.flipflop:
            return SVGIcon.flipflop
        case p$2.forEachElementInEnum:
        case p$2.forLoop:
        case p$2.forLoopWithBreak:
        case p$2.whileLoop:
            return SVGIcon.loop
        case p$2.forEachLoop:
        case p$2.forEachLoopWithBreak:
            return SVGIcon.forEachLoop
        case p$2.ifThenElse: return SVGIcon.branchNode
        case p$2.isValid: return SVGIcon.questionMark
        case p$2.makeArray: return SVGIcon.makeArray
        case p$2.makeMap: return SVGIcon.makeMap
        case p$2.makeSet: return SVGIcon.makeSet
        case p$2.makeStruct: return SVGIcon.makeStruct
        case p$2.metasoundEditorGraphExternalNode: return SVGIcon.metasoundFunction
        case p$2.select: return SVGIcon.select
        case p$2.spawnActorFromClass: return SVGIcon.spawnActor
        case p$2.timeline: return SVGIcon.timer
    }
    if (entity.switchTarget()) {
        return SVGIcon.switch
    }
    if (nodeTitle(entity).startsWith("Break")) {
        return SVGIcon.breakStruct
    }
    if (entity.getClass() === p$2.macro) {
        return SVGIcon.macro
    }
    const hidValue = entity.getHIDAttribute()?.toString();
    if (hidValue) {
        if (hidValue.includes("Mouse")) {
            return SVGIcon.mouse
        } else if (hidValue.includes("Gamepad_Special")) {
            return SVGIcon.keyboard // It is called Touchpad in UE
        } else if (hidValue.includes("Gamepad") || hidValue.includes("Steam")) {
            return SVGIcon.gamepad
        } else if (hidValue.includes("Touch")) {
            return SVGIcon.touchpad
        } else {
            return SVGIcon.keyboard
        }
    }
    if (entity.getDelegatePin()) {
        return SVGIcon.event
    }
    if (entity.ObjectRef?.type === p$2.ambientSound) {
        return SVGIcon.sound
    }
    return SVGIcon.functionSymbol
}

/** @template {typeof IEntity} T */
class ArrayEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type
    static grammar = this.createGrammar()

    get length() {
        return this.values.length
    }

    /** @param {(ExtractType<T>)[]} values */
    constructor(values = []) {
        super();
        this.values = values;
    }

    /** @returns {P<ArrayEntity<typeof IEntity>>} */
    static createGrammar(elementGrammar = this.type?.grammar ?? Parsernostrum.lazy(() => this.unknownEntityGrammar)) {
        // The following lines appear to be from a different entity type (AlternativesEntity)
        // and are syntactically incorrect in this context.
        // I am adding a console log as per the instruction, but not the problematic lines.
        if (this.inlined && !elementGrammar) ;
        return this.inlined
            ? elementGrammar
            : Parsernostrum.seq(
                Parsernostrum.reg(/\(\s*/),
                elementGrammar.sepBy(Grammar.commaSeparation).opt(),
                Parsernostrum.reg(/\s*(,\s*)?\)/, 1),
            ).map(([_0, values, trailing]) => {
                values = values instanceof Array ? values : [];
                let Self = this;
                if ((trailing !== undefined) !== Self.trailing) {
                    Self = Self.flagTrailing(trailing !== undefined);
                }
                return new Self(values)
            }).label(`ArrayEntity of ${this.type?.className() ?? "unknown values"}`)
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagInlined(value = true) {
        const result = this.asUniqueClass();
        result.inlined = value;
        result.grammar = /** @type {P<ArrayEntity>} */(result.createGrammar());
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @param {T} type
     */
    static of(type) {
        const result = /** @type {{type: T, grammar: P<ArrayEntity<T>> } & typeof ArrayEntity<T>} */(
            this.asUniqueClass()
        );
        result.type = type;
        result.grammar = /** @type {P<ArrayEntity>} */(result.createGrammar());
        return result
    }

    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof ArrayEntity<T>} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        if (Self.inlined) {
            return super.serialize.bind(
                this.values,
                insideString,
                indentation,
                Self,
                printKey,
                keySeparator,
                attributeSeparator,
                wrap
            )()
        }
        let result = this.values.map(v => v?.serialize(insideString)).join(Self.attributeSeparator);
        if (this.trailing) {
            result += Self.attributeSeparator;
        }
        return `(${result})`
    }

    valueOf() {
        return this.values
    }

    /** @param {IEntity} other */
    equals(other) {
        if (!(other instanceof ArrayEntity) || this.values.length !== other.values.length) {
            return false
        }
        for (let i = 0; i < this.values.length; ++i) {
            if (!this.values[i].equals(other.values[i])) {
                return false
            }
        }
        return true
    }
}

var crypto;
if (typeof window === "undefined") {
    // When used in nodejs, mainly for test purpose
    import('crypto').then(mod => crypto = mod.default).catch();
} else {
    crypto = window.crypto;
}

class GuidEntity extends IEntity {

    static grammar = this.createGrammar()

    static generateGuid() {
        let values = new Uint32Array(4);
        crypto.getRandomValues(values);
        let guid = "";
        values.forEach(n => {
            guid += ("0".repeat(8) + n.toString(16).toUpperCase()).slice(-8);
        });
        return guid
    }

    constructor(value = GuidEntity.generateGuid()) {
        super();
        this.value = value;
    }

    /** @returns {P<GuidEntity>} */
    static createGrammar() {
        return Parsernostrum.reg(/[0-9A-F]{32}/i).map(v => new this(v)).label("GuidEntity")
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value;
        if (Self.serialized) {
            result = `"${result}"`;
        }
        return result
    }

    toString() {
        return this.value
    }
}

class IntegerEntity extends NumberEntity {

    static grammar = this.createGrammar()

    get value() {
        return super.value
    }
    set value(value) {
        value = Math.trunc(value);
        if (value >= 1 << 31 && value < -(1 << 31)) {
            value = Math.floor(value);
            super.value = value;
        }
    }

    /** @returns {P<IntegerEntity>} */
    static createGrammar() {
        return Parsernostrum.numberInteger.map(v => new this(v))
    }
}

class NaturalNumberEntity extends IntegerEntity {

    static grammar = this.createGrammar()

    get value() {
        return super.value
    }
    set value(value) {
        value = Math.round(Utility.clamp(value, 0));
        super.value = value;
    }

    /** @returns {P<NaturalNumberEntity>} */
    static createGrammar() {
        return Parsernostrum.numberNatural.map(v => new this(v))
    }
}

const p$1 = Configuration.paths;
const colors = {
    "Any": i$8`132, 132, 132`,
    "Any[]": i$8`132, 132, 132`,
    "audio": i$8`252, 148, 252`,
    "blue": i$8`0, 0, 255`,
    "bool": i$8`146, 0, 0`,
    "byte": i$8`0, 110, 100`,
    "class": i$8`88, 0, 186`,
    "default": i$8`255, 255, 255`,
    "delegate": i$8`255, 56, 56`,
    "enum": i$8`0, 109, 99`,
    "exec": i$8`240, 240, 240`,
    "float": i$8`160, 252, 70`,
    "green": i$8`0, 255, 0`,
    "int": i$8`30, 224, 172`,
    "int32": i$8`30, 224, 172`,
    "int64": i$8`170, 224, 172`,
    "interface": i$8`238, 252, 168`,
    "name": i$8`200, 128, 252`,
    "object": i$8`0, 168, 242`,
    "Param": i$8`255, 166, 40`,
    "Param[]": i$8`255, 166, 40`,
    "Point": i$8`64, 138, 255`,
    "Point[]": i$8`64, 137, 255`,
    "real": i$8`54, 208, 0`,
    "red": i$8`255, 0, 0`,
    "string": i$8`251, 0, 208`,
    "struct": i$8`0, 88, 200`,
    "Surface": i$8`69, 196, 126`,
    "Surface[]": i$8`69, 196, 126`,
    "text": i$8`226, 121, 167`,
    "time": i$8`148, 252, 252`,
    "Volume": i$8`230, 69, 188`,
    "Volume[]": i$8`230, 69, 188`,
    "wildcard": i$8`128, 120, 120`,
    [p$1.linearColor]: i$8`0, 88, 200`,
    [p$1.niagaraBool]: i$8`146, 0, 0`,
    [p$1.niagaraDataInterfaceCollisionQuery]: i$8`0, 168, 242`,
    [p$1.niagaraDataInterfaceCurlNoise]: i$8`0, 168, 242`,
    [p$1.niagaraDataInterfaceVolumeTexture]: i$8`0, 168, 242`,
    [p$1.niagaraFloat]: i$8`160, 250, 68`,
    [p$1.niagaraInt32]: i$8`30, 224, 172`,
    [p$1.niagaraPosition]: i$8`251, 146, 251`,
    [p$1.quat4f]: i$8`0, 88, 200`,
    [p$1.rotator]: i$8`157, 177, 251`,
    [p$1.transform]: i$8`227, 103, 0`,
    [p$1.vector]: i$8`251, 198, 34`,
    [p$1.vector2f]: i$8`0, 88, 200`,
    [p$1.vector3f]: i$8`250, 200, 36`,
    [p$1.vector4f]: i$8`0, 88, 200`,
};

const pinColorMaterial = i$8`120, 120, 120`;

/** @param {PinEntity<IEntity>} entity */
function pinColor(entity) {
    if (entity.PinType.PinCategory?.toString() === "mask") {
        const result = colors[entity.PinType.PinSubCategory?.toString()];
        if (result) {
            return result
        }
    } else if (entity.PinType.PinCategory?.toString() === "optional") {
        return pinColorMaterial
    }
    const type = entity.getType();
    return colors[type]
        ?? colors[entity.PinType.PinCategory?.toString().toLowerCase()]
        ?? (type.startsWith("/Script/Niagara.") ? colors["struct"] : colors["default"])
}

/** @param {PinEntity<IEntity>} entity */
function pinTitle(entity) {
    let result = entity.PinFriendlyName
        ? entity.PinFriendlyName.toString()
        : Utility.formatStringName(entity.PinName?.toString() ?? "");
    let match;
    if (match = entity.PinToolTip?.toString().match(/\s*(.+?(?=\n)|.+\S)\s*/)) {
        if (match[1].toLowerCase() === result.toLowerCase()) {
            return match[1] // In case they match, then keep the case of the PinToolTip
        }
    }
    result = result.replace(/^Module\./, "");
    return result
}

class ByteEntity extends IntegerEntity {

    static grammar = this.createGrammar()

    get value() {
        return super.value
    }
    set value(value) {
        value = Math.trunc(value);
        if (value >= 0 && value < 1 << 8) {
            super.value = value;
        }
    }

    /** @returns {P<ByteEntity>} */
    createGrammar() {
        // @ts-expect-error
        return Parsernostrum.numberByte.map(v => new this(v))
    }
}

class StringEntity extends IEntity {

    static grammar = this.createGrammar()
    static escapedCharacters = /['"\\]/g
    static unescapedBackslash = /(?<=(?:[^\\]|^)(?:\\\\)*)\\(?!\\)/

    constructor(value = "") {
        super();
        this.value = value;
    }

    /** @returns {P<StringEntity>} */
    static createGrammar() {
        return Parsernostrum.doubleQuotedString
            .map(insideString => new this(StringEntity.unescape(insideString)))
            .label("StringEntity")
    }


    /** @param {String} value */
    static escape(value, inline = true) {
        let result = value.replaceAll(new RegExp(`(${StringEntity.escapedCharacters.source})`, "g"), '\\$1');
        if (inline) {
            result = result
                .replaceAll("\n", "\\n") // Replace newline with \n
                .replaceAll("\t", "\\t"); // Replace tab with \t
        }
        return result
    }

    /** @param {String} value */
    static unescape(value) {
        return value
            .replaceAll(new RegExp(StringEntity.unescapedBackslash.source + "t", "g"), "\t") // Replace tab with \t
            .replaceAll(new RegExp(StringEntity.unescapedBackslash.source + "n", "g"), "\n") // Replace newline with \n
            .replaceAll(new RegExp(`\\\\(${StringEntity.escapedCharacters.source})`, "g"), "$1")
    }

    doSerialize(insideString = false) {
        let result = `"${StringEntity.escape(this.value)}"`;
        if (insideString) {
            result = StringEntity.escape(result, false);
        }
        return result
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

class ComputedTypeEntity extends IEntity {

    static grammar = this.createGrammar()
    /** @type {(entity: IEntity) => typeof IEntity} */
    static f

    static createGrammar() {
        return StringEntity.grammar
    }

    /**
     * @template {typeof ComputedTypeEntity.f} T
     * @param {T} producer
     */
    static from(producer) {
        const result = /** @type {(typeof ComputedTypeEntity) & { f: T }} */(this.asUniqueClass());
        result.f = producer;
        return result
    }

    /** @param {IEntity} entity */
    static compute(entity) {
        return this.f(entity)
    }
}

class SymbolEntity extends IEntity {

    static attributeConverter = {
        fromAttribute: (value, type) => new this(value),
        toAttribute: (value, type) => value.toString()
    }
    static grammar = this.createGrammar()

    /** @returns {P<SymbolEntity>} */
    static createGrammar() {
        return Grammar.symbol.map(v => new this(v)).label("SymbolEntity")
    }

    constructor(value = "") {
        super();
        this.value = value;
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value;
        if (Self.serialized) {
            result = `"${result}"`;
        }
        return result
    }

    toString() {
        return this.value
    }
}

class EnumEntity extends SymbolEntity {

    static grammar = this.createGrammar()

    /** @returns {P<EnumEntity>} */
    static createGrammar() {
        return Grammar.symbol.map(v => new this(v))
    }
}

class EnumDisplayValueEntity extends EnumEntity {

    static grammar = this.createGrammar()

    /** @returns {P<EnumDisplayValueEntity>} */
    static createGrammar() {
        return Parsernostrum.reg(Grammar.Regex.InsideString).map(v => new this(v))
    }
}

class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"

    static grammar = this.createGrammar()

    constructor(value = "") {
        super();
        this.value = value;
    }

    /** @returns {P<InvariantTextEntity>} */
    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.seq(
                Parsernostrum.reg(new RegExp(`${this.lookbehind}\\s*\\(`)),
                Parsernostrum.doubleQuotedString,
                Parsernostrum.reg(/\s*\)/)
            ).map(([_0, value, _2]) => value),
            Parsernostrum.reg(new RegExp(this.lookbehind)).map(() => "") // InvariantTextEntity can have no arguments
        )
            .map(value => new this(value))
            .label("InvariantTextEntity")
    }

    doSerialize() {
        return this.lookbehind + '("' + this.value + '")'
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

class LocalizedTextEntity extends IEntity {

    static attributeSeparator = ", "
    static printKey = k => ""
    static lookbehind = "NSLOCTEXT"
    static attributes = {
        ...super.attributes,
        namespace: StringEntity.withDefault(),
        key: StringEntity.withDefault(),
        value: StringEntity.withDefault(),
    }
    static grammar = this.createGrammar()

    constructor(values = {}) {
        super(values);
        /** @type {InstanceType<typeof LocalizedTextEntity.attributes.namespace>} */ this.namespace;
        /** @type {InstanceType<typeof LocalizedTextEntity.attributes.key>} */ this.key;
        /** @type {InstanceType<typeof LocalizedTextEntity.attributes.value>} */ this.value;
    }

    /** @returns {P<LocalizedTextEntity>} */
    static createGrammar() {
        return Parsernostrum.regArray(new RegExp(
            String.raw`${LocalizedTextEntity.lookbehind}\s*\(`
            + String.raw`\s*"(?<namespace>${Grammar.Regex.InsideString.source})"\s*,`
            + String.raw`\s*"(?<key>${Grammar.Regex.InsideString.source})"\s*,`
            + String.raw`\s*"(?<value>${Grammar.Regex.InsideString.source})"\s*`
            + String.raw`(?<trailing>,\s+)?`
            + String.raw`\)`,
            "m"
        )).map(({ groups: { namespace, key, value, trailing } }) => {
            return new this({
                namespace: new (this.attributes.namespace)(Utility.unescapeString(namespace)),
                key: new (this.attributes.namespace)(Utility.unescapeString(key)),
                value: new (this.attributes.namespace)(Utility.unescapeString(value)),
                trailing: trailing !== undefined,
            })
        }).label("LocalizedTextEntity")
    }

    toString() {
        return Utility.capitalFirstLetter(this.value.valueOf())
    }
}

class FormatTextEntity extends IEntity {

    static attributeSeparator = ", "
    static lookbehind = ["LOCGEN_FORMAT_NAMED", "LOCGEN_FORMAT_ORDERED"]
    static grammar = this.createGrammar()

    /** @param {(StringEntity | LocalizedTextEntity | InvariantTextEntity | FormatTextEntity)[]} values */
    constructor(values) {
        super();
        this.values = values;
    }

    /** @returns {P<FormatTextEntity>} */
    static createGrammar() {
        return Parsernostrum.lazy(() => Parsernostrum.seq(
            // Resulting regex: /(LOCGEN_FORMAT_NAMED|LOCGEN_FORMAT_ORDERED)\s*/
            Parsernostrum.reg(new RegExp(String.raw`(${this.lookbehind.join("|")})\s*\(\s*`), 1),
            Parsernostrum.alt(
                ...[StringEntity, LocalizedTextEntity, InvariantTextEntity, FormatTextEntity].map(type => type.grammar)
            ).sepBy(Parsernostrum.reg(/\s*\,\s*/)),
            Parsernostrum.reg(/\s*\)/)
        )
            .map(([lookbehind, values]) => {
                const result = new this(values);
                result.lookbehind = lookbehind;
                return result
            }))
            .label("FormatTextEntity")
    }

    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof FormatTextEntity} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        const separator = Self.attributeSeparator;
        return this.lookbehind + "("
            + this.values.map(v => v.serialize(insideString)).join(separator)
            + (Self.trailing ? separator : "")
            + ")"
    }

    toString() {
        const pattern = this.values?.[0]?.toString(); // The pattern is always the first element of the array
        if (!pattern) {
            return ""
        }
        const values = this.values.slice(1).map(v => v?.valueOf());
        let result = this.lookbehind == "LOCGEN_FORMAT_NAMED"
            ? pattern.replaceAll(/\{([a-zA-Z]\w*)\}/g, (substring, arg) => {
                const argLocation = values.indexOf(arg) + 1;
                return argLocation > 0 && argLocation < values.length
                    ? values[argLocation]
                    : substring
            })
            : this.lookbehind == "LOCGEN_FORMAT_ORDERED"
                ? pattern.replaceAll(/\{(\d+)\}/g, (substring, arg) => {
                    const argValue = Number(arg);
                    return argValue < values.length
                        ? values[argValue]
                        : substring
                })
                : "";
        return result
    }
}

class Integer64Entity extends IEntity {

    static grammar = this.createGrammar()

    /**
     * @protected
     * @type {bigint}
     */
    _value
    get value() {
        return this._value
    }
    set value(value) {
        if (value >= -(1n << 63n) && value < 1n << 63n) {
            this._value = value;
        }
    }

    /** @param {bigint | Number} value */
    constructor(value = 0n) {
        super();
        this.value = BigInt(value);
    }

    /** @returns {P<Integer64Entity>} */
    static createGrammar() {
        return Parsernostrum.numberBigInteger.map(v => new this(v))
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value.toString();
        if (Self.serialized) {
            result = `"${result}"`;
        }
        return result
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}

class ObjectReferenceEntity extends IEntity {

    static typeReference = Parsernostrum.reg(
        // Fallback to simple regexes to avoid potential circular dependency issues with Grammar.js during static init
        new RegExp(`(?:\\/(?:[a-zA-Z_]\\w*(?:[\\.:][a-zA-Z_]\\w*)*)){2,}|[a-zA-Z_]\\w*`)
    )
    static fullReferenceGrammar = this.createFullReferenceGrammar()
    static grammar = this.createGrammar()

    #type
    get type() {
        return this.#type
    }
    set type(value) {
        this.#type = value;
    }

    #path
    get path() {
        return this.#path
    }
    set path(value) {
        this.#name = "";
        this.#path = value;
    }

    #serializer
    get full() {
        return this.#serializer
    }
    set full(value) {
        this.#serializer = value;
    }

    #name = ""

    /** @param {(t: String, p: String) => String} serializer */
    constructor(
        type = "None",
        path = "",
        serializer = type.includes("/") || path
            ? (t, p) => `"${t + (p ? (`'${p}'`) : "")}"`
            : (t, p) => t) {
        super();
        this.#type = type;
        this.#path = path;
        this.#serializer = serializer;
    }

    /** @returns {P<ObjectReferenceEntity>} */
    static createGrammar() {
        return Parsernostrum.alt(
            this.createFullReferenceSerializedGrammar(),
            this.createFullReferenceGrammar(),
            this.createTypeReferenceGrammar(),
        ).label("ObjectReferenceEntity")
    }

    /** @returns {P<ObjectReferenceEntity>} */
    static createFullReferenceGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.seq(
                this.typeReference,
                Parsernostrum.reg(/'"/),
                Parsernostrum.reg(Grammar.Regex.InsideString),
                Parsernostrum.reg(/"'/)
            ).map(([type, _1, path, _2]) => [type, path, true]),
            Parsernostrum.seq(
                this.typeReference,
                Parsernostrum.reg(/'/),
                Parsernostrum.reg(Grammar.Regex.InsideSingleQuotedString),
                Parsernostrum.reg(/'/)
            ).map(([type, _1, path, _2]) => [type, path, false])
        ).map(([type, path, isDouble]) => {
            let quotes = isDouble ? [`'"`, `"'`] : ["'", "'"];
            return new this(
                type,
                path,
                (t, p) => t + quotes[0] + p + quotes[1]
            )
        })
    }

    /** @returns {P<ObjectReferenceEntity>} */
    static createFullReferenceSerializedGrammar() {
        return Parsernostrum.regArray(
            new RegExp(
                '"(' + Grammar.Regex.InsideString.source + "?)"
                + "(?:'(" + Grammar.Regex.InsideSingleQuotedString.source + `?)')?"`
            )
        ).map(([_0, type, path]) => new this(type, path, (t, p) => `"${t}${p ? `'${p}'` : ""}"`))
    }

    /** @returns {P<ObjectReferenceEntity>} */
    static createTypeReferenceGrammar() {
        return this.typeReference.map(v => new this(v, "", (t, p) => t))
    }

    static createNoneInstance() {
        return new this("None")
    }

    getName(dropCounter = false) {
        if (!this.#name) {
            if (!dropCounter) {
                return this.#name = Utility.getNameFromPath(this.path.replace(/_C$/, ""), dropCounter)
            }
            return Utility.getNameFromPath(this.path.replace(/_C$/, ""), dropCounter)
        }
        return this.#name
    }

    doSerialize(insideString = false) {
        let result = this.full(this.type, this.path);
        if (insideString) {
            result = Utility.escapeString(result, false);
        }
        return result
    }

    /** @param {IEntity} other */
    equals(other) {
        if (!(other instanceof ObjectReferenceEntity)) {
            return false
        }
        return this.type == other.type && this.path == other.path
    }

    toString() {
        return this.full(this.type, this.path)
    }
}

class PinReferenceEntity extends IEntity {

    static grammar = this.createGrammar()

    /**
     * @param {SymbolEntity} objectName
     * @param {GuidEntity} pinGuid
     */
    constructor(objectName = null, pinGuid = null) {
        super();
        this.objectName = objectName;
        this.pinGuid = pinGuid;
    }

    /** @returns {P<PinReferenceEntity>} */
    static createGrammar() {
        return Parsernostrum.seq(
            SymbolEntity.grammar,
            Parsernostrum.whitespace,
            GuidEntity.grammar
        )
            .map(([objectName, _1, pinGuid]) => new this(objectName, pinGuid))
            .label("PinReferenceEntity")
    }

    doSerialize() {
        return this.objectName.serialize() + " " + this.pinGuid.serialize()
    }

    toString() {
        return this.doSerialize()
    }
}

class FunctionReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberParent: ObjectReferenceEntity,
        MemberName: StringEntity,
        MemberGuid: GuidEntity,
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values);
        /** @type {InstanceType<typeof FunctionReferenceEntity.attributes.MemberParent>} */ this.MemberParent;
        /** @type {InstanceType<typeof FunctionReferenceEntity.attributes.MemberName>} */ this.MemberName;
        /** @type {InstanceType<typeof FunctionReferenceEntity.attributes.MemberGuid>} */ this.MemberGuid;
    }

    /** @returns {P<FunctionReferenceEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this, Grammar.commaSeparation, 0, 0)
    }
}

class PinTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        PinCategory: StringEntity.withDefault(),
        PinSubCategory: StringEntity,
        PinSubCategoryObject: ObjectReferenceEntity,
        PinSubCategoryMemberReference: FunctionReferenceEntity,
        ContainerType: SymbolEntity,
        bIsReference: BooleanEntity,
        bIsConst: BooleanEntity,
        bIsWeakPointer: BooleanEntity,
        bIsUObjectWrapper: BooleanEntity,
        bSerializeAsSinglePrecisionFloat: BooleanEntity,
    }
    static grammar = this.createGrammar()

    constructor(values = {}) {
        super(values);
        /** @type {InstanceType<typeof PinTypeEntity.attributes.PinCategory>} */ this.PinCategory;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.PinSubCategory>} */ this.PinSubCategory;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.PinSubCategoryObject>} */ this.PinSubCategoryObject;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.PinSubCategoryMemberReference>} */ this.PinSubCategoryMemberReference;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.ContainerType>} */ this.ContainerType;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsReference>} */ this.bIsReference;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsConst>} */ this.bIsConst;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsWeakPointer>} */ this.bIsWeakPointer;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsUObjectWrapper>} */ this.bIsUObjectWrapper;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bIsUObjectWrapper>} */ this.bIsUObjectWrapper;
        /** @type {InstanceType<typeof PinTypeEntity.attributes.bSerializeAsSinglePrecisionFloat>} */ this.bSerializeAsSinglePrecisionFloat;
    }

    /** @returns {P<PinTypeEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this).label("PinTypeEntity")
    }

    /** @param {PinTypeEntity} other */
    copyTypeFrom(other) {
        for (const key of this.keys) {
            if (other[key] !== undefined) {
                this[key] = other[key];
            }
        }
    }
}

class Vector2DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values);
        /** @type {InstanceType<typeof Vector2DEntity.attributes.X>} */ this.X;
        /** @type {InstanceType<typeof Vector2DEntity.attributes.Y>} */ this.Y;
    }

    /** @returns {P<Vector2DEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this, Grammar.commaSeparation, 1).label("Vector2DEntity")
    }

    /** @returns {[Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf()]
    }
}

class RBSerializationVector2DEntity extends Vector2DEntity {

    static grammar = this.createGrammar()

    /** @returns {P<RBSerializationVector2DEntity>} */
    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                /X\s*=\s*/.source + "(?<x>" + Grammar.numberRegexSource + ")"
                + "\\s+"
                + /Y\s*=\s*/.source + "(?<y>" + Grammar.numberRegexSource + ")"
            )).map(({ groups: { x, y } }) => new this({
                X: new (Vector2DEntity.attributes.X)(x),
                Y: new (Vector2DEntity.attributes.Y)(y),
            })),
            Vector2DEntity.grammar.map(v => new this({
                X: v.X,
                Y: v.Y,
            }))
        ).label("RBSerializationVector2DEntity")
    }
}

class RotatorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        R: NumberEntity.withDefault(),
        P: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values);
        /** @type {InstanceType<typeof RotatorEntity.attributes.R>} */ this.R;
        /** @type {InstanceType<typeof RotatorEntity.attributes.P>} */ this.P;
        /** @type {InstanceType<typeof RotatorEntity.attributes.Y>} */ this.Y;
    }

    /** @returns {P<RotatorEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this, Grammar.commaSeparation, 1).label("RotatorEntity")
    }

    getRoll() {
        return this.R
    }

    getPitch() {
        return this.P
    }

    getYaw() {
        return this.Y
    }
}

class SimpleSerializationRotatorEntity extends RotatorEntity {

    static attributeSeparator = ", "
    static grammar = this.createGrammar()

    /** @returns {P<SimpleSerializationRotatorEntity>} */
    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
            )).map(([_, p, pPrecision, y, yPrecision, r, rPrecision]) => new this({
                R: new (RotatorEntity.attributes.R)(r, rPrecision?.length),
                P: new (RotatorEntity.attributes.P)(p, pPrecision?.length),
                Y: new (RotatorEntity.attributes.Y)(y, yPrecision?.length),
            })),
            RotatorEntity.grammar.map(v => new this({
                R: v.R,
                P: v.P,
                Y: v.Y,
            }))
        ).label("SimpleSerializationRotatorEntity")
    }

    doSerialize() {
        const attributeSeparator = /** @type {typeof SimpleSerializationRotatorEntity} */(
            this.constructor
        ).attributeSeparator;
        return this.P.serialize() + attributeSeparator
            + this.Y.serialize() + attributeSeparator
            + this.R.serialize() + (this.trailing ? attributeSeparator : "")
    }
}

class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static attributeSeparator = ", "
    static grammar = this.createGrammar()

    /** @returns {P<SimpleSerializationVector2DEntity>} */
    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
            )).map(([_, x, xPrecision, y, yPrecision]) => new this({
                X: new (Vector2DEntity.attributes.X)(x, xPrecision?.length),
                Y: new (Vector2DEntity.attributes.Y)(y, yPrecision?.length),
            })),
            Vector2DEntity.grammar.map(v => new this({
                X: v.X,
                Y: v.Y,
            }))
        ).label("SimpleSerializationVector2DEntity")
    }

    doSerialize() {
        const attributeSeparator = /** @type {typeof SimpleSerializationVector2DEntity} */(
            this.constructor
        ).attributeSeparator;
        return this.X.serialize() + attributeSeparator
            + this.Y.serialize() + (this.trailing ? attributeSeparator : "")
    }
}

class Vector4DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: NumberEntity.withDefault(),
        Y: NumberEntity.withDefault(),
        Z: NumberEntity.withDefault(),
        W: NumberEntity.withDefault(),
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values);
        /** @type {InstanceType<typeof Vector4DEntity.attributes.X>} */ this.X;
        /** @type {InstanceType<typeof Vector4DEntity.attributes.Y>} */ this.Y;
        /** @type {InstanceType<typeof Vector4DEntity.attributes.Z>} */ this.Z;
        /** @type {InstanceType<typeof Vector4DEntity.attributes.W>} */ this.W;
    }

    /** @returns {P<Vector4DEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this, Grammar.commaSeparation, 1).label("Vector4DEntity")
    }

    /** @returns {[Number, Number, Number, Number]} */
    toArray() {
        return [this.X.valueOf(), this.Y.valueOf(), this.Z.valueOf(), this.W.valueOf()]
    }
}

class SimpleSerializationVector4DEntity extends Vector4DEntity {

    static grammar = this.createGrammar()

    /** @returns {P<SimpleSerializationVector4DEntity> } */
    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                `(${Grammar.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${Grammar.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${Grammar.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${Grammar.numberRegexSource})`
            ))
                .map(([_0, x, y, z, w]) => new this({
                    X: new (Vector4DEntity.attributes.X)(x),
                    Y: new (Vector4DEntity.attributes.Y)(y),
                    Z: new (Vector4DEntity.attributes.Z)(z),
                    W: new (Vector4DEntity.attributes.W)(w),
                })),
            Vector4DEntity.grammar
        )
    }
}

class SimpleSerializationVectorEntity extends VectorEntity {

    static allowShortSerialization = false
    static attributeSeparator = ", "
    static grammar = this.createGrammar()

    /** @returns {P<SimpleSerializationVectorEntity>} */
    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                `(${NumberEntity.numberRegexSource})`
                // If allow simple serialization then it can parse only a single number ...
                + (this.allowShortSerialization ? `(?:` : "")
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
                + String.raw`\s*,\s*`
                + `(${NumberEntity.numberRegexSource})`
                // ... that will be assigned to X and the rest is optional and set to 0
                + (this.allowShortSerialization ? `)?` : "")
            ))
                .map(([_, x, xPrecision, y, yPrecision, z, zPrecision]) => new this({
                    X: new (VectorEntity.attributes.X)(x, xPrecision?.length),
                    Y: new (VectorEntity.attributes.Y)(y, yPrecision?.length),
                    Z: new (VectorEntity.attributes.Z)(z, zPrecision?.length),
                })),
            VectorEntity.grammar.map(v => new this({
                X: v.X,
                Y: v.Y,
                Z: v.Z,
            }))
        )
    }

    /**
     * @template {typeof SimpleSerializationVectorEntity} T
     * @this {T}
     */
    static flagAllowShortSerialization(value = true) {
        const result = this.asUniqueClass();
        if (value !== result.allowShortSerialization) {
            result.allowShortSerialization = value;
            result.grammar = result.createGrammar();
        }
        return result
    }

    doSerialize() {
        const attributeSeparator = /** @type {typeof SimpleSerializationVectorEntity} */(
            this.constructor
        ).attributeSeparator;
        return this.X.serialize() + attributeSeparator
            + this.Y.serialize() + attributeSeparator
            + this.Z.serialize() + (this.trailing ? attributeSeparator : "")
    }
}

const paths = Configuration.paths;

/** @template {IEntity} T */
class PinEntity extends IEntity {

    static lookbehind = "Pin"
    static #typeEntityMap = {
        "bool": BooleanEntity,
        "byte": ByteEntity,
        "enum": EnumEntity,
        "exec": StringEntity,
        "float": NumberEntity,
        "int": IntegerEntity,
        "int64": Integer64Entity,
        "name": StringEntity,
        "real": NumberEntity,
        "string": StringEntity,
        [paths.linearColor]: LinearColorEntity,
        [paths.niagaraBool]: BooleanEntity,
        [paths.niagaraFloat]: NumberEntity,
        [paths.niagaraPosition]: VectorEntity,
        [paths.rotator]: RotatorEntity,
        [paths.vector]: VectorEntity,
        [paths.vector2D]: Vector2DEntity,
        [paths.vector4f]: Vector4DEntity,
    }
    static #alternativeTypeEntityMap = {
        "enum": EnumDisplayValueEntity,
        "rg": RBSerializationVector2DEntity,
        [paths.niagaraPosition]: SimpleSerializationVectorEntity.flagAllowShortSerialization(),
        [paths.rotator]: SimpleSerializationRotatorEntity,
        [paths.vector]: SimpleSerializationVectorEntity,
        [paths.vector2D]: SimpleSerializationVector2DEntity,
        [paths.vector3f]: SimpleSerializationVectorEntity,
        [paths.vector4f]: SimpleSerializationVector4DEntity,
    }
    static attributes = {
        PinId: GuidEntity.withDefault(),
        PinName: StringEntity.withDefault(),
        PinFriendlyName: AlternativesEntity.accepting(
            LocalizedTextEntity,
            FormatTextEntity,
            InvariantTextEntity,
            StringEntity
        ),
        PinToolTip: StringEntity,
        Direction: StringEntity,
        PinType: PinTypeEntity.withDefault().flagInlined(),
        LinkedTo: ArrayEntity.of(PinReferenceEntity).withDefault().flagSilent(),
        SubPins: ArrayEntity.of(PinReferenceEntity),
        ParentPin: PinReferenceEntity,
        DefaultValue:
            ComputedTypeEntity.from(
                /** @param {PinEntity} pinEntity */
                pinEntity => pinEntity.getEntityType(true)?.flagSerialized() ?? StringEntity
            ),
        AutogeneratedDefaultValue: StringEntity,
        DefaultObject: ObjectReferenceEntity,
        PersistentGuid: GuidEntity,
        bHidden: BooleanEntity,
        bNotConnectable: BooleanEntity,
        bDefaultValueIsReadOnly: BooleanEntity,
        bDefaultValueIsIgnored: BooleanEntity,
        bAdvancedView: BooleanEntity,
        bOrphanedPin: BooleanEntity,
    }
    static grammar = this.createGrammar()

    #recomputesNodeTitleOnChange = false
    set recomputesNodeTitleOnChange(value) {
        this.#recomputesNodeTitleOnChange = value;
    }
    get recomputesNodeTitleOnChange() {
        return this.#recomputesNodeTitleOnChange
    }

    /** @type {ObjectEntity} */
    #objectEntity = null
    get objectEntity() {
        try {
            /*
             * Why inside a try block ?
             * It is because of this issue: https://stackoverflow.com/questions/61237153/access-private-method-in-an-overriden-method-called-from-the-base-class-construc
             * super(values) will call IEntity constructor while this instance is not yet fully constructed
             * IEntity will call computedEntity.compute(this) to initialize DefaultValue from this class
             * Which in turn calls pinEntity.getEntityType(true)
             * Which calls this.getType()
             * Which calls this.objectEntity?.isPcg()
             * Which would access #objectEntity through get objectEntity()
             * And this would violate the private access rule (because this class is not yet constructed)
             * If this issue in the future will be fixed in all the major browsers, please remove this try catch
             */
            return this.#objectEntity
        } catch (e) {
            return null
        }
    }
    set objectEntity(value) {
        this.#objectEntity = value;
    }

    #pinIndex
    get pinIndex() {
        return this.#pinIndex
    }
    set pinIndex(value) {
        this.#pinIndex = value;
    }

    constructor(values = {}) {
        super(values);
        /** @type {InstanceType<typeof PinEntity.attributes.PinId>} */ this.PinId;
        /** @type {InstanceType<typeof PinEntity.attributes.PinName>} */ this.PinName;
        /** @type {InstanceType<typeof PinEntity.attributes.PinFriendlyName>} */ this.PinFriendlyName;
        /** @type {InstanceType<typeof PinEntity.attributes.PinToolTip>} */ this.PinToolTip;
        /** @type {InstanceType<typeof PinEntity.attributes.Direction>} */ this.Direction;
        /** @type {InstanceType<typeof PinEntity.attributes.PinType>} */ this.PinType;
        /** @type {InstanceType<typeof PinEntity.attributes.LinkedTo>} */ this.LinkedTo;
        /** @type {T} */ this.DefaultValue;
        /** @type {InstanceType<typeof PinEntity.attributes.AutogeneratedDefaultValue>} */ this.AutogeneratedDefaultValue;
        /** @type {InstanceType<typeof PinEntity.attributes.DefaultObject>} */ this.DefaultObject;
        /** @type {InstanceType<typeof PinEntity.attributes.PersistentGuid>} */ this.PersistentGuid;
        /** @type {InstanceType<typeof PinEntity.attributes.bHidden>} */ this.bHidden;
        /** @type {InstanceType<typeof PinEntity.attributes.bNotConnectable>} */ this.bNotConnectable;
        /** @type {InstanceType<typeof PinEntity.attributes.bDefaultValueIsReadOnly>} */ this.bDefaultValueIsReadOnly;
        /** @type {InstanceType<typeof PinEntity.attributes.bDefaultValueIsIgnored>} */ this.bDefaultValueIsIgnored;
        /** @type {InstanceType<typeof PinEntity.attributes.bAdvancedView>} */ this.bAdvancedView;
        /** @type {InstanceType<typeof PinEntity.attributes.bOrphanedPin>} */ this.bOrphanedPin;
        /** @type {ObjectEntity} */ this.objectEntity;
    }

    /** @returns {P<PinEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    /** @param {ObjectEntity} objectEntity */
    static fromLegacyObject(objectEntity) {
        return new PinEntity(objectEntity)
    }

    /** @returns {String} */
    getType() {
        const category = this.PinType.PinCategory?.toString().toLocaleLowerCase();
        if (["struct", "class", "object", "type", "statictype"].includes(category)) {
            return this.PinType.PinSubCategoryObject?.path
        }
        if (this.isEnum()) {
            return "enum"
        }
        if (this.objectEntity?.isPcg()) {
            const pcgSuboject = this.objectEntity.getPcgSubobject();
            const pinObject = this.getPinObject(pcgSuboject);
            if (pinObject) {
                let allowedTypes = pinObject["Properties"]?.AllowedTypes?.toString() ?? "";
                if (allowedTypes == "") {
                    allowedTypes = this.PinType.PinCategory ?? "";
                    if (allowedTypes == "") {
                        allowedTypes = "Any";
                    }
                }
                if (allowedTypes) {
                    if (
                        pinObject["Properties"].bAllowMultipleData?.valueOf() !== false
                        && pinObject["Properties"].bAllowMultipleConnections?.valueOf() !== false
                    ) {
                        allowedTypes += "[]";
                    }
                    return allowedTypes
                }
            }
        }
        if (category === "optional") {
            const subCategory = this.PinType.PinSubCategory?.toString();
            switch (subCategory) {
                case "red":
                    return "real"
                case "rg":
                    return "rg"
                case "rgb":
                    return paths.vector
                case "rgba":
                    return paths.linearColor
                default:
                    return subCategory
            }
        }
        return category
    }

    /** @returns {typeof IEntity} */
    getEntityType(alternative = false) {
        const type = this.getType();
        const entity = PinEntity.#typeEntityMap[type];
        const alternativeEntity = PinEntity.#alternativeTypeEntityMap[type];
        return alternative && alternativeEntity !== undefined
            ? alternativeEntity
            : entity
    }

    pinTitle() {
        return pinTitle(this)
    }

    /** @param {PinEntity} other */
    copyTypeFrom(other) {
        this.PinType = other.PinType;
    }

    getDefaultValue(maybeCreate = false) {
        if (this.DefaultValue === undefined && maybeCreate) {
            this.DefaultValue = /** @type {T} */(new (this.getEntityType(true))());
        }
        return this.DefaultValue
    }

    isEnum() {
        const type = this.PinType.PinSubCategoryObject?.type;
        return type === paths.enum
            || type === paths.userDefinedEnum
            || type?.toLowerCase() === "enum"
    }

    isExecution() {
        return this.PinType.PinCategory.toString() === "exec"
            || this.getType() === paths.niagaraParameterMap
    }

    isHidden() {
        return this.bHidden?.valueOf()
    }

    isInput() {
        return !this.isHidden() && this.Direction?.toString() != "EGPD_Output"
    }

    isOutput() {
        return !this.isHidden() && this.Direction?.toString() == "EGPD_Output"
    }

    isLinked() {
        return this.LinkedTo?.length > 0
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     * @returns true if it was not already linked to the tarket
     */
    linkTo(targetObjectName, targetPinEntity) {
        const linkFound = this.LinkedTo.values?.some(pinReferenceEntity =>
            pinReferenceEntity.objectName.toString() == targetObjectName
            && pinReferenceEntity.pinGuid.toString() == targetPinEntity.PinId.toString()
        );
        if (!linkFound) {
            this.LinkedTo.values.push(new PinReferenceEntity(new SymbolEntity(targetObjectName), targetPinEntity.PinId));
            return true
        }
        return false // Already linked
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     * @returns true if it was linked to the target
     */
    unlinkFrom(targetObjectName, targetPinEntity) {
        const indexElement = this.LinkedTo.values?.findIndex(pinReferenceEntity => {
            return pinReferenceEntity.objectName.toString() == targetObjectName
                && pinReferenceEntity.pinGuid.toString() == targetPinEntity.PinId.toString()
        });
        if (indexElement >= 0) {
            this.LinkedTo.values.splice(indexElement, 1);
            if (this.LinkedTo.length === 0 && PinEntity.attributes.LinkedTo.default === undefined) {
                this.LinkedTo.values = [];
            }
            return true
        }
        return false
    }

    /** @param {ObjectEntity} pcgSuboject */
    getPinObject(pcgSuboject) {
        const pinObjectReference = this.isInput()
            ? pcgSuboject.InputPins?.valueOf()[this.pinIndex]
            : pcgSuboject.OutputPins?.valueOf()[this.pinIndex];
        if (pinObjectReference) {
            /** @type {ObjectEntity} */
            return pcgSuboject[Configuration.subObjectAttributeNameFromReference(pinObjectReference, true)]
        }
    }

    getSubCategory() {
        return this.PinType.PinSubCategoryObject?.path
    }

    pinColor() {
        return pinColor(this)
    }
}

/** @param {PinEntity} pinEntity */
const indexFromUpperCaseLetterName = pinEntity =>
    pinEntity.PinName?.toString().match(/^\s*([A-Z])\s*$/)?.[1]?.charCodeAt(0) - "A".charCodeAt(0);
const p = Configuration.paths;

/** @param {ObjectEntity} entity */
function nodeVariadic(entity) {
    /** @type {() => PinEntity[]} */
    let pinEntities;
    /** @type {(pinEntity: PinEntity) => Number} */
    let pinIndexFromEntity;
    /** @type {(newPinIndex: Number, minIndex: Number, maxIndex: Number, newPin: PinEntity) => String} */
    let pinNameFromIndex;
    const type = entity.getType();
    let prefix;
    let name;
    switch (type) {
        case p.commutativeAssociativeBinaryOperator:
        case p.promotableOperator:
            name = entity.FunctionReference?.MemberName?.toString();
            switch (name) {
                default:
                    if (
                        !name?.startsWith("Add_")
                        && !name?.startsWith("Subtract_")
                        && !name?.startsWith("Multiply_")
                        && !name?.startsWith("Divide_")
                    ) {
                        break
                    }
                case "And_Int64Int64":
                case "And_IntInt":
                case "BMax":
                case "BMin":
                case "BooleanAND":
                case "BooleanNAND":
                case "BooleanOR":
                case "Concat_StrStr":
                case "FMax":
                case "FMin":
                case "Max":
                case "MaxInt64":
                case "Min":
                case "MinInt64":
                case "Or_Int64Int64":
                case "Or_IntInt":
                    pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isInput());
                    pinIndexFromEntity ??= indexFromUpperCaseLetterName;
                    pinNameFromIndex ??= (index, min = -1, max = -1) => {
                        const result = String.fromCharCode(index >= 0 ? index : max + "A".charCodeAt(0) + 1);
                        entity.NumAdditionalInputs = new NaturalNumberEntity(pinEntities().length - 1);
                        return result
                    };
                    break
            }
            break
        case p.executionSequence:
            prefix ??= "Then";
        case p.multiGate:
            prefix ??= "Out";
            pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isOutput());
            pinIndexFromEntity ??= pinEntity => Number(
                pinEntity.PinName?.toString().match(new RegExp(String.raw`^\s*${prefix}[_\s]+(\d+)\s*$`, "i"))?.[1]
            );
            pinNameFromIndex ??= (index, min = -1, max = -1, newPin) =>
                `${prefix} ${index >= 0 ? index : min > 0 ? `${prefix} 0` : max + 1}`;
            break
        // case p.niagaraNodeOp:
        //     pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isInput())
        //     pinIndexFromEntity ??= indexFromUpperCaseLetterName
        //     pinNameFromIndex ??= (index, min = -1, max = -1, newPin) => {
        //         const result = String.fromCharCode(index >= 0 ? index : max + "A".charCodeAt(0) + 1)
        //         entity.AddedPins ??= []
        //         entity.AddedPins.push(newPin)
        //         return result
        //     }
        //     break
        case p.switchInteger:
            pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isOutput());
            pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName?.toString().match(/^\s*(\d+)\s*$/)?.[1]);
            pinNameFromIndex ??= (index, min = -1, max = -1, newPin) => (index < 0 ? max + 1 : index).toString();
            break
        case p.switchGameplayTag:
            pinNameFromIndex ??= (index, min = -1, max = -1, newPin) => {
                const result = `Case_${index >= 0 ? index : min > 0 ? "0" : max + 1}`;
                entity.PinNames ??= new ArrayEntity();
                entity.PinNames.valueOf().push(new StringEntity(result));
                delete entity.PinTags.valueOf()[entity.PinTags.length - 1];
                entity.PinTags.valueOf()[entity.PinTags.length] = null;
                return result
            };
        case p.switchName:
        case p.switchString:
            pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isOutput());
            pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.toString().match(/^\s*Case[_\s]+(\d+)\s*$/i)?.[1]);
            pinNameFromIndex ??= (index, min = -1, max = -1, newPin) => {
                const result = `Case_${index >= 0 ? index : min > 0 ? "0" : max + 1}`;
                entity.PinNames ??= new ArrayEntity();
                entity.PinNames.valueOf().push(new StringEntity(result));
                return result
            };
            break
    }
    if (pinEntities) {
        return () => {
            let min = Number.MAX_SAFE_INTEGER;
            let max = Number.MIN_SAFE_INTEGER;
            let values = [];
            const modelPin = pinEntities().reduce(
                (acc, cur) => {
                    const value = pinIndexFromEntity(cur);
                    if (!isNaN(value)) {
                        values.push(value);
                        min = Math.min(value, min);
                        if (value > max) {
                            max = value;
                            return cur
                        }
                    } else if (acc === undefined) {
                        return cur
                    }
                    return acc
                },
                undefined
            );
            if (min === Number.MAX_SAFE_INTEGER || max === Number.MIN_SAFE_INTEGER) {
                min = undefined;
                max = undefined;
            }
            if (!modelPin) {
                return null
            }
            values.sort((a, b) => a < b ? -1 : a === b ? 0 : 1);
            let prev = values[0];
            let index = values.findIndex(
                // Search for a gap
                value => {
                    const result = value - prev > 1;
                    prev = value;
                    return result
                }
            );
            const newPin = new PinEntity(modelPin);
            newPin.PinId = new GuidEntity();
            newPin.PinName = new StringEntity(pinNameFromIndex(index, min, max, newPin));
            newPin.PinToolTip = undefined;
            if (newPin.DefaultValue) {
                // @ts-expect-error
                newPin.DefaultValue = new (newPin.DefaultValue.constructor)();
            }
            entity.getCustomproperties(true).push(newPin);
            return newPin
        }
    }
}

class MacroGraphReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MacroGraph: ObjectReferenceEntity,
        GraphBlueprint: ObjectReferenceEntity,
        GraphGuid: GuidEntity,
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values);
        /** @type {InstanceType<typeof MacroGraphReferenceEntity.attributes.MacroGraph>} */ this.MacroGraph;
        /** @type {InstanceType<typeof MacroGraphReferenceEntity.attributes.GraphBlueprint>} */ this.GraphBlueprint;
        /** @type {InstanceType<typeof MacroGraphReferenceEntity.attributes.GraphGuid>} */ this.GraphGuid;
    }

    /** @returns {P<MacroGraphReferenceEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    getMacroName() {
        const colonIndex = this.MacroGraph.path.search(":");
        return this.MacroGraph.path.substring(colonIndex + 1)
    }
}

class NullEntity extends IEntity {

    static grammar = this.createGrammar()

    /** @returns {P<NullEntity>} */
    static createGrammar() {
        // @ts-expect-error
        return Parsernostrum.reg(new RegExp(String.raw`\(${Parsernostrum.whitespaceInlineOpt.getParser().regexp.source}\)`))
            .map(v => new this())
            .label("NullEntity")
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor)
    ) {
        let result = "()";
        if (Self.serialized) {
            result = `"${result}"`;
        }
        return result
    }
}

class ScriptVariableEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ScriptVariable: ObjectReferenceEntity,
        OriginalChangeId: GuidEntity,
    }
    static grammar = this.createGrammar()

    constructor(values = {}) {
        super(values);
        /** @type {InstanceType<typeof ScriptVariableEntity.attributes.ScriptVariable>} */ this.ScriptVariable;
        /** @type {InstanceType<typeof ScriptVariableEntity.attributes.OriginalChangeId>} */ this.OriginalChangeId;
    }

    /** @returns {P<ScriptVariableEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this).label("ScriptVariableEntity")
    }
}

class UnknownPinEntity extends PinEntity {

    static attributes = {
        ...super.attributes,
        PinId: GuidEntity
    }

    static grammar = this.createGrammar()

    /** @returns {P<UnknownPinEntity>} */
    static createGrammar() {
        return Parsernostrum.seq(
            // Lookbehind
            Parsernostrum.reg(new RegExp(`(${Grammar.Regex.Symbol.source}\\s*)?\\(\\s*`), 1),
            Grammar.createAttributeGrammar(this).sepBy(Grammar.commaSeparation),
            Parsernostrum.reg(/\s*(?:,\s*)?\)/)
        ).map(([lookbehind, attributes, _2]) => {
            lookbehind ??= "";
            let values = {};
            if (lookbehind.length) {
                values.lookbehind = lookbehind;
            }
            attributes.forEach(attributeSetter => attributeSetter(values));
            return new this(values)
        }).label("UnknownPinEntity")
    }
}

class VariableReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberScope: StringEntity,
        MemberName: StringEntity.withDefault(),
        MemberGuid: GuidEntity,
        bSelfContext: BooleanEntity,
    }
    static grammar = this.createGrammar()

    constructor(values) {
        super(values);
        /** @type {InstanceType<typeof VariableReferenceEntity.attributes.MemberScope>} */ this.MemberScope;
        /** @type {InstanceType<typeof VariableReferenceEntity.attributes.MemberName>} */ this.MemberName;
        /** @type {InstanceType<typeof VariableReferenceEntity.attributes.MemberGuid>} */ this.MemberGuid;
        /** @type {InstanceType<typeof VariableReferenceEntity.attributes.bSelfContext>} */ this.bSelfContext;
    }

    /** @returns {P<VariableReferenceEntity>} */
    static createGrammar() {
        return Grammar.createEntityGrammar(this).label("VariableReferenceEntity")
    }
}

class ObjectEntity extends IEntity {

    #exported = false
    get exported() {
        return this.#exported
    }
    set exported(value) {
        this.#exported = value;
    }

    static #nameRegex = /^(\w+?)(?:_(\d+))?$/
    /** @type {(k: String) => String} */
    static printKey = k => !k.startsWith(Configuration.subObjectAttributeNamePrefix) ? k : ""
    static attributeSeparator = "\n"
    static wrap = this.notWrapped
    static trailing = true
    static attributes = {
        ...super.attributes,
        Class: ObjectReferenceEntity,
        Name: StringEntity,
        Archetype: ObjectReferenceEntity,
        ExportPath: MirroredEntity.of(ObjectReferenceEntity),
        ObjectRef: ObjectReferenceEntity,
        BlueprintElementType: ObjectReferenceEntity,
        BlueprintElementInstance: ObjectReferenceEntity,
        ConstA: MirroredEntity.of(NumberEntity),
        ConstB: MirroredEntity.of(NumberEntity),
        PinTags: ArrayEntity.of(NullEntity).flagInlined(),
        PinNames: ArrayEntity.of(StringEntity).flagInlined(),
        AxisKey: SymbolEntity,
        InputAxisKey: SymbolEntity,
        InputName: StringEntity,
        InputType: SymbolEntity,
        NumAdditionalInputs: NaturalNumberEntity,
        bIsPureFunc: BooleanEntity,
        bIsConstFunc: BooleanEntity,
        bIsCaseSensitive: BooleanEntity,
        bDefaultsToPureFunc: BooleanEntity,
        VariableReference: VariableReferenceEntity,
        SelfContextInfo: SymbolEntity,
        DelegatePropertyName: StringEntity,
        DelegateOwnerClass: ObjectReferenceEntity,
        ComponentPropertyName: StringEntity,
        EventReference: FunctionReferenceEntity,
        FunctionReference: FunctionReferenceEntity,
        FunctionScript: ObjectReferenceEntity,
        CustomFunctionName: StringEntity,
        TargetType: ObjectReferenceEntity,
        MacroGraphReference: MacroGraphReferenceEntity,
        Enum: ObjectReferenceEntity,
        EnumEntries: ArrayEntity.of(StringEntity).flagInlined(),
        InputKey: SymbolEntity,
        OpName: StringEntity,
        CachedChangeId: GuidEntity,
        FunctionDisplayName: StringEntity,
        AddedPins: ArrayEntity.of(UnknownPinEntity).withDefault().flagInlined().flagSilent(),
        ChangeId: GuidEntity,
        MaterialFunction: ObjectReferenceEntity,
        bOverrideFunction: BooleanEntity,
        bInternalEvent: BooleanEntity,
        bConsumeInput: BooleanEntity,
        bExecuteWhenPaused: BooleanEntity,
        bOverrideParentBinding: BooleanEntity,
        bControl: BooleanEntity,
        bAlt: BooleanEntity,
        bShift: BooleanEntity,
        bCommand: BooleanEntity,
        CommentColor: LinearColorEntity,
        bCommentBubbleVisible_InDetailsPanel: BooleanEntity,
        bColorCommentBubble: BooleanEntity,
        ProxyFactoryFunctionName: StringEntity,
        ProxyFactoryClass: ObjectReferenceEntity,
        ProxyClass: ObjectReferenceEntity,
        StructType: ObjectReferenceEntity,
        MaterialExpression: ObjectReferenceEntity,
        MaterialExpressionComment: ObjectReferenceEntity,
        MoveMode: SymbolEntity,
        TimelineName: StringEntity,
        TimelineGuid: GuidEntity,
        SizeX: MirroredEntity.of(IntegerEntity),
        SizeY: MirroredEntity.of(IntegerEntity),
        Text: MirroredEntity.of(StringEntity),
        ParameterName: StringEntity,
        ExpressionGUID: GuidEntity,
        MaterialExpressionEditorX: MirroredEntity.of(IntegerEntity),
        MaterialExpressionEditorY: MirroredEntity.of(IntegerEntity),
        MaterialExpressionGuid: GuidEntity,
        NodeTitle: StringEntity,
        NodeTitleColor: LinearColorEntity,
        PositionX: MirroredEntity.of(IntegerEntity),
        PositionY: MirroredEntity.of(IntegerEntity),
        SettingsInterface: ObjectReferenceEntity,
        PCGNode: ObjectReferenceEntity,
        SoundNode: ObjectReferenceEntity,
        SoundWaveAssetPtr: ObjectReferenceEntity,
        HiGenGridSize: SymbolEntity,
        Operation: SymbolEntity,
        NodePosX: IntegerEntity,
        NodePosY: IntegerEntity,
        NodeHeight: IntegerEntity,
        NodeWidth: IntegerEntity,
        Graph: ObjectReferenceEntity,
        SubgraphInstance: StringEntity,
        InputPins: ArrayEntity.of(ObjectReferenceEntity).flagInlined(),
        OutputPins: ArrayEntity.of(ObjectReferenceEntity).flagInlined(),
        bExposeToLibrary: BooleanEntity,
        bCanRenameNode: BooleanEntity,
        bCommentBubblePinned: BooleanEntity,
        bCommentBubbleVisible: BooleanEntity,
        NodeComment: StringEntity,
        AdvancedPinDisplay: SymbolEntity,
        DelegateReference: VariableReferenceEntity,
        EnabledState: SymbolEntity,
        NodeGuid: GuidEntity,
        ErrorType: IntegerEntity,
        ErrorMsg: StringEntity,
        ScriptVariables: ArrayEntity.flagInlined().of(ScriptVariableEntity),
        Node: MirroredEntity.of(ObjectReferenceEntity),
        ExportedNodes: StringEntity,
        CustomProperties: ArrayEntity
            .of(AlternativesEntity.accepting(PinEntity, UnknownPinEntity))
            .withDefault()
            .flagSilent()
            .flagInlined(),
    }
    static customPropertyGrammar = Parsernostrum.seq(
        Parsernostrum.reg(/CustomProperties\s+/),
        this.attributes.CustomProperties.type.grammar,
    ).map(([_0, pin]) => values => {
        /** @type {InstanceType<typeof this.attributes.CustomProperties>} */(
            values.CustomProperties ??= new (this.attributes.CustomProperties)()
        ).values.push(pin);
    })
    static inlinedArrayEntryGrammar = Parsernostrum.seq(
        Parsernostrum.alt(
            Grammar.symbolQuoted.map(v => [v, true]),
            Grammar.symbol.map(v => [v, false]),
        ),
        Parsernostrum.reg(new RegExp(String.raw`\s*\(\s*(\d+)\s*\)\s*\=\s*`), 1).map(Number) // Number in parentheses then equal
    ).chain(
        /** @param {[[keyof ObjectEntity.attributes, Boolean], Number]} param */
        ([[symbol, quoted], index]) =>
            (this.attributes[symbol]?.grammar ?? IEntity.unknownEntityGrammar).map(currentValue =>
                values => {
                    if (values[symbol] === undefined) {
                        let arrayEntity = ArrayEntity;
                        if (quoted != arrayEntity.quoted) {
                            arrayEntity = arrayEntity.flagQuoted(quoted);
                        }
                        if (!arrayEntity.inlined) {
                            arrayEntity = arrayEntity.flagInlined();
                        }
                        values[symbol] = new arrayEntity();
                    }
                    /** @type {ArrayEntity} */
                    const target = values[symbol];
                    target.values[index] = currentValue;
                }
            )
    )
    static grammar = this.createGrammar()
    static grammarMultipleObjects = Parsernostrum.seq(
        Parsernostrum.whitespaceOpt,
        this.grammar,
        Parsernostrum.seq(
            Parsernostrum.whitespace,
            this.grammar,
        )
            .map(([_0, object]) => object)
            .many(),
        Parsernostrum.whitespaceOpt
    ).map(([_0, first, remaining, _4]) => [first, ...remaining])

    constructor(values = {}) {
        if (("NodePosX" in values) !== ("NodePosY" in values)) {
            const entries = Object.entries(values);
            const [key, position] = "NodePosX" in values
                ? ["NodePosY", Object.keys(values).indexOf("NodePosX") + 1]
                : ["NodePosX", Object.keys(values).indexOf("NodePosY")];
            entries.splice(position, 0, [key, new IntegerEntity(0)]);
            values = Object.fromEntries(entries);
        }
        super(values);

        // Attributes
        /** @type {ArrayEntity<typeof PinEntity | typeof UnknownPinEntity>} */ this.CustomProperties;
        /** @type {InstanceType<typeof ObjectEntity.attributes.AddedPins>} */ this.AddedPins;
        /** @type {InstanceType<typeof ObjectEntity.attributes.AdvancedPinDisplay>} */ this.AdvancedPinDisplay;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Archetype>} */ this.Archetype;
        /** @type {InstanceType<typeof ObjectEntity.attributes.AxisKey>} */ this.AxisKey;
        /** @type {InstanceType<typeof ObjectEntity.attributes.bIsPureFunc>} */ this.bIsPureFunc;
        /** @type {InstanceType<typeof ObjectEntity.attributes.bDefaultsToPureFunc>} */ this.bDefaultsToPureFunc;
        /** @type {InstanceType<typeof ObjectEntity.attributes.BlueprintElementInstance>} */ this.BlueprintElementInstance;
        /** @type {InstanceType<typeof ObjectEntity.attributes.BlueprintElementType>} */ this.BlueprintElementType;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Class>} */ this.Class;
        /** @type {InstanceType<typeof ObjectEntity.attributes.CommentColor>} */ this.CommentColor;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ComponentPropertyName>} */ this.ComponentPropertyName;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ConstA>} */ this.ConstA;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ConstB>} */ this.ConstB;
        /** @type {InstanceType<typeof ObjectEntity.attributes.CustomFunctionName>} */ this.CustomFunctionName;
        /** @type {InstanceType<typeof ObjectEntity.attributes.DelegatePropertyName>} */ this.DelegatePropertyName;
        /** @type {InstanceType<typeof ObjectEntity.attributes.DelegateReference>} */ this.DelegateReference;
        /** @type {InstanceType<typeof ObjectEntity.attributes.EnabledState>} */ this.EnabledState;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Enum>} */ this.Enum;
        /** @type {InstanceType<typeof ObjectEntity.attributes.EnumEntries>} */ this.EnumEntries;
        /** @type {InstanceType<typeof ObjectEntity.attributes.EventReference>} */ this.EventReference;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ExportedNodes>} */ this.ExportedNodes;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ExportPath>} */ this.ExportPath;
        /** @type {InstanceType<typeof ObjectEntity.attributes.FunctionDisplayName>} */ this.FunctionDisplayName;
        /** @type {InstanceType<typeof ObjectEntity.attributes.FunctionReference>} */ this.FunctionReference;
        /** @type {InstanceType<typeof ObjectEntity.attributes.FunctionScript>} */ this.FunctionScript;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Graph>} */ this.Graph;
        /** @type {InstanceType<typeof ObjectEntity.attributes.HiGenGridSize>} */ this.HiGenGridSize;
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputAxisKey>} */ this.InputAxisKey;
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputKey>} */ this.InputKey;
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputName>} */ this.InputName;
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputPins>} */ this.InputPins;
        /** @type {InstanceType<typeof ObjectEntity.attributes.InputType>} */ this.InputType;
        /** @type {InstanceType<typeof ObjectEntity.attributes.MacroGraphReference>} */ this.MacroGraphReference;
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialExpression>} */ this.MaterialExpression;
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialExpressionComment>} */ this.MaterialExpressionComment;
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialExpressionEditorX>} */ this.MaterialExpressionEditorX;
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialExpressionEditorY>} */ this.MaterialExpressionEditorY;
        /** @type {InstanceType<typeof ObjectEntity.attributes.MaterialFunction>} */ this.MaterialFunction;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Name>} */ this.Name;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Node>} */ this.Node;
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeComment>} */ this.NodeComment;
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeHeight>} */ this.NodeHeight;
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodePosX>} */ this.NodePosX;
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodePosY>} */ this.NodePosY;
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeTitle>} */ this.NodeTitle;
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeTitleColor>} */ this.NodeTitleColor;
        /** @type {InstanceType<typeof ObjectEntity.attributes.NodeWidth>} */ this.NodeWidth;
        /** @type {InstanceType<typeof ObjectEntity.attributes.NumAdditionalInputs>} */ this.NumAdditionalInputs;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ObjectRef>} */ this.ObjectRef;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Operation>} */ this.Operation;
        /** @type {InstanceType<typeof ObjectEntity.attributes.OpName>} */ this.OpName;
        /** @type {InstanceType<typeof ObjectEntity.attributes.OutputPins>} */ this.OutputPins;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ParameterName>} */ this.ParameterName;
        /** @type {InstanceType<typeof ObjectEntity.attributes.PCGNode>} */ this.PCGNode;
        /** @type {InstanceType<typeof ObjectEntity.attributes.SoundNode>} */ this.SoundNode;
        /** @type {InstanceType<typeof ObjectEntity.attributes.SoundWaveAssetPtr>} */ this.SoundWaveAssetPtr;
        /** @type {InstanceType<typeof ObjectEntity.attributes.PinNames>} */ this.PinNames;
        /** @type {InstanceType<typeof ObjectEntity.attributes.PinTags>} */ this.PinTags;
        /** @type {InstanceType<typeof ObjectEntity.attributes.PositionX>} */ this.PositionX;
        /** @type {InstanceType<typeof ObjectEntity.attributes.PositionY>} */ this.PositionY;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ProxyFactoryFunctionName>} */ this.ProxyFactoryFunctionName;
        /** @type {InstanceType<typeof ObjectEntity.attributes.ScriptVariables>} */ this.ScriptVariables;
        /** @type {InstanceType<typeof ObjectEntity.attributes.SettingsInterface>} */ this.SettingsInterface;
        /** @type {InstanceType<typeof ObjectEntity.attributes.SizeX>} */ this.SizeX;
        /** @type {InstanceType<typeof ObjectEntity.attributes.SizeY>} */ this.SizeY;
        /** @type {InstanceType<typeof ObjectEntity.attributes.StructType>} */ this.StructType;
        /** @type {InstanceType<typeof ObjectEntity.attributes.SubgraphInstance>} */ this.SubgraphInstance;
        /** @type {InstanceType<typeof ObjectEntity.attributes.TargetType>} */ this.TargetType;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Text>} */ this.Text;
        /** @type {InstanceType<typeof ObjectEntity.attributes.Text>} */ this.Text;
        /** @type {InstanceType<typeof ObjectEntity.attributes.VariableReference>} */ this.VariableReference;

        // Legacy nodes pins
        if (this["Pins"] instanceof ArrayEntity) {
            this["Pins"].valueOf().forEach(
                /** @param {ObjectReferenceEntity} objectReference */
                objectReference => {
                    const pinObject = this[Configuration.subObjectAttributeNameFromReference(objectReference, true)];
                    if (pinObject) {
                        const pinEntity = PinEntity.fromLegacyObject(pinObject);
                        pinEntity.LinkedTo = new (PinEntity.attributes.LinkedTo)();
                        this.getCustomproperties(true).push(pinEntity);
                        this.CustomProperties.ignored = true;
                    }
                }
            );
        }
        /** @type {ObjectEntity} */
        const materialSubobject = this.getMaterialSubobject();
        if (materialSubobject) {
            const obj = materialSubobject;
            obj.SizeX !== undefined && (obj.SizeX.getter = () => this.NodeWidth);
            obj.SizeY && (obj.SizeY.getter = () => this.NodeHeight);
            obj.Text && (obj.Text.getter = () => this.NodeComment);
            obj.MaterialExpressionEditorX && (obj.MaterialExpressionEditorX.getter = () => this.NodePosX);
            obj.MaterialExpressionEditorY && (obj.MaterialExpressionEditorY.getter = () => this.NodePosY);
            if (this.getType() === Configuration.paths.materialExpressionComponentMask) {
                const rgbaPins = Configuration.rgba.map(pinName => {
                    const result = this.getPinEntities().find(pin => pin.PinName.toString() === pinName);
                    result.recomputesNodeTitleOnChange = true;
                    return result
                });
                // Reorder keys so that the added ones stay first
                obj.keys = [...Configuration.rgba, ...obj.keys];
                const silentBool = MirroredEntity.of(BooleanEntity).withDefault().flagSilent();
                obj["R"] = new silentBool(() => rgbaPins[0].DefaultValue);
                obj["G"] = new silentBool(() => rgbaPins[1].DefaultValue);
                obj["B"] = new silentBool(() => rgbaPins[2].DefaultValue);
                obj["A"] = new silentBool(() => rgbaPins[3].DefaultValue);
            } else if (this.getType() === Configuration.paths.materialExpressionSubtract) {
                const silentNumber = MirroredEntity
                    .of(NumberEntity.withPrecision(6))
                    .withDefault(() => new MirroredEntity(() => new NumberEntity(1)))
                    .flagSilent();
                const pinA = this.getCustomproperties().find(pin => pin.PinName?.toString() === "A");
                const pinB = this.getCustomproperties().find(pin => pin.PinName?.toString() === "B");
                if (pinA || pinB) {
                    // Reorder keys so that the added ones stay first
                    obj.keys = ["ConstA", "ConstB", ...obj.keys];
                    if (pinA) {
                        pinA.recomputesNodeTitleOnChange = true;
                        obj.ConstA = new silentNumber(() => pinA.DefaultValue);
                    }
                    if (pinB) {
                        pinB.recomputesNodeTitleOnChange = true;
                        obj.ConstB = new silentNumber(() => pinB.DefaultValue);
                    }
                }
            }
        }
        /** @type {ObjectEntity} */
        const pcgObject = this.getPcgSubobject();
        if (pcgObject) {
            pcgObject.PositionX && (pcgObject.PositionX.getter = () => this.NodePosX);
            pcgObject.PositionY && (pcgObject.PositionY.getter = () => this.NodePosY);
            pcgObject.getSubobjects().forEach(
                /** @param {ObjectEntity} obj */
                obj => {
                    if (obj.Node !== undefined) {
                        const nodeRef = obj.Node.getter();
                        if (
                            nodeRef.type === this.PCGNode.type
                            && nodeRef.path === `${this.Name}.${this.PCGNode.path}`
                        ) {
                            obj.Node.getter = () => new ObjectReferenceEntity(
                                this.PCGNode.type,
                                `${this.Name}.${this.PCGNode.path}`,
                                nodeRef.full,
                            );
                        }
                    }
                }
            );

        }
        let inputIndex = 0;
        let outputIndex = 0;
        this.getCustomproperties().forEach((pinEntity, i) => {
            pinEntity.objectEntity = this;
            pinEntity.pinIndex = pinEntity.isInput()
                ? inputIndex++
                : pinEntity.isOutput()
                    ? outputIndex++
                    : i;
        });
        this.mirrorNameInExportPaths();
    }

    /** @returns {P<ObjectEntity>} */
    static createGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/Begin +Object/),
            Parsernostrum.seq(
                Parsernostrum.whitespace,
                Parsernostrum.alt(
                    this.createSubObjectGrammar(),
                    this.customPropertyGrammar,
                    Grammar.createAttributeGrammar(this, Parsernostrum.reg(Grammar.Regex.MultipleWordsSymbols)),
                    Grammar.createAttributeGrammar(
                        this,
                        Grammar.attributeNameQuoted,
                        undefined,
                        (values, attributeKey, attributeValue) => {
                            Utility.objectSet(values, [...attributeKey, "quoted"], true);
                        },
                    ),
                    this.inlinedArrayEntryGrammar,
                )
            )
                .map(([_0, entry]) => entry)
                .many(),
            Parsernostrum.reg(/\s+End +Object/),
        )
            .map(([_0, attributes, _2]) => {
                const values = {};
                attributes.forEach(attributeSetter => attributeSetter(values));
                return new this(values)
            })
            .label("ObjectEntity")
    }

    static createSubObjectGrammar() {
        return Parsernostrum.lazy(() => this.grammar)
            .map(object =>
                values => {
                    object.trailing = false;
                    values[Configuration.subObjectAttributeNameFromEntity(object)] = object;
                }
            )
    }

    /**
     * @protected
     * Mirror then name part of the objects contained in this one in ExportPath
     */
    mirrorNameInExportPaths(originalName = this.Name?.toString()) {
        if (!originalName) {
            return
        }
        const values = [this];
        for (let i = 0; i < values.length; ++i) {
            const value = values[i];
            if (value instanceof ObjectEntity) {
                values.push(...Object.values(value));
                if (!value.ExportPath?.valueOf().path.includes(originalName)) {
                    continue
                }
            } else {
                continue
            }
            const mirroredEntity = /** @type {typeof ObjectEntity} */(value.constructor).attributes.ExportPath;
            let originalExportPath = value.ExportPath;
            value.ExportPath = new mirroredEntity(
                () => {
                    const exportPath = originalExportPath.valueOf();
                    return new (mirroredEntity.type)(
                        exportPath.type,
                        exportPath.path.replace(originalName, this.Name?.toString() ?? ""),
                        exportPath.full
                    )
                }
            );
        }
    }

    /** @type {String} */
    #class
    getClass() {
        if (!this.#class) {
            this.#class = (this.Class?.path ? this.Class.path : this.Class?.type)
                ?? this.ExportPath?.valueOf()?.type
                ?? "";
            if (this.#class && !this.#class.startsWith("/")) {
                // Old path names did not start with /Script or /Engine, check tests/resources/LegacyNodes.js
                let path = Object.values(Configuration.paths).find(path => path.endsWith("." + this.#class));
                if (path) {
                    this.#class = path;
                }
            }
        }
        return this.#class
    }

    getType() {
        const path = this.MacroGraphReference?.MacroGraph?.path;
        if (path) {
            return path
        }
        if (this.MaterialExpression) {
            return this.MaterialExpression.type
        }
        let subobject = this.getSounCueSubobject();
        if (subobject) {
            return subobject.getClass()
        }
        return this.getClass()
    }

    getObjectName(dropCounter = false) {
        if (dropCounter) {
            return this.getNameAndCounter()[0]
        }
        return this.Name.toString()
    }

    /** @returns {[String, Number]} */
    getNameAndCounter() {
        const result = this.getObjectName().match(ObjectEntity.#nameRegex);
        return result
            ? [result[1] ?? "", parseInt(result[2] ?? "0")]
            : ["", 0]
    }

    getCounter() {
        return this.getNameAndCounter()[1]
    }

    getNodeWidth() {
        return this.NodeWidth
            ?? this.isComment() ? Configuration.defaultCommentWidth : undefined
    }

    /** @param {Number} value */
    setNodeWidth(value) {
        if (!this.NodeWidth) {
            this.NodeWidth = new IntegerEntity();
        }
        this.NodeWidth.value = value;
    }

    getNodeHeight() {
        return this.NodeHeight
            ?? this.isComment() ? Configuration.defaultCommentHeight : undefined
    }

    /** @param {Number} value */
    setNodeHeight(value) {
        if (!this.NodeHeight) {
            this.NodeHeight = new IntegerEntity();
        }
        this.NodeHeight.value = value;
    }

    getNodePosX() {
        return this.NodePosX?.value ?? 0
    }

    /** @param {Number} value */
    setNodePosX(value) {
        if (!this.NodePosX) {
            this.NodePosX = new IntegerEntity();
        }
        this.NodePosX.value = Math.round(value);
    }

    getNodePosY() {
        return this.NodePosY?.value ?? 0
    }

    /** @param {Number} value */
    setNodePosY(value) {
        if (!this.NodePosY) {
            this.NodePosY = new IntegerEntity();
        }
        this.NodePosY.value = Math.round(value);
    }

    getCustomproperties(canCreate = false) {
        return this.CustomProperties.values
    }

    /** @returns {PinEntity[]} */
    getPinEntities() {
        return this.getCustomproperties().filter(v => v.constructor === PinEntity)
    }

    /** @returns {ObjectEntity[]} */
    getSubobjects() {
        return Object.keys(this)
            .filter(k => k.startsWith(Configuration.subObjectAttributeNamePrefix))
            .flatMap(k => [this[k], .../** @type {ObjectEntity} */(this[k]).getSubobjects()])
    }

    switchTarget() {
        const switchMatch = this.getClass().match(Configuration.switchTargetPattern);
        if (switchMatch) {
            return switchMatch[1]
        }
    }

    isEvent() {
        switch (this.getClass()) {
            case Configuration.paths.actorBoundEvent:
            case Configuration.paths.componentBoundEvent:
            case Configuration.paths.customEvent:
            case Configuration.paths.event:
            case Configuration.paths.inputAxisKeyEvent:
            case Configuration.paths.inputVectorAxisEvent:
                return true
        }
        return false
    }

    isComment() {
        switch (this.getClass()) {
            case Configuration.paths.comment:
            case Configuration.paths.materialGraphNodeComment:
                return true
        }
        return false
    }

    isMaterial() {
        const classValue = this.getClass();
        return classValue.startsWith("/Script/Engine.MaterialExpression")
            || classValue.startsWith("/Script/InterchangeImport.MaterialExpression")
            || classValue.startsWith("/Script/UnrealEd.MaterialGraph")
    }

    /** @return {ObjectEntity} */
    getMaterialSubobject() {
        const expression = this.MaterialExpression ?? this.MaterialExpressionComment;
        return expression
            ? this[Configuration.subObjectAttributeNameFromReference(expression, true)]
            : null
    }

    isPcg() {
        return this.getClass() == Configuration.paths.pcgEditorGraphNode || this.getPcgSubobject() != null
    }

    isNiagara() {
        return this.Class && (this.Class.type ? this.Class.type : this.Class.path)?.startsWith("/Script/NiagaraEditor.")
    }

    isSoundCue() {
        return this.getClass() == Configuration.paths.soundCueGraphNode
    }

    getBlueprintType() {
        if (this.isMaterial()) {
            return "MATERIAL"
        }
        if (this.isNiagara()) {
            return "NIAGARA"
        }
        if (this.isPcg()) {
            return "PCG Graph"
        }
        if (this.isSoundCue()) {
            return "SOUND CUE"
        }
        return "BLUEPRINT"
    }

    /** @return {ObjectEntity} */
    getPcgSubobject() {
        const node = this.PCGNode;
        return node
            ? this[Configuration.subObjectAttributeNameFromReference(node, true)]
            : null
    }

    /** @return {ObjectEntity} */
    getSounCueSubobject() {
        const node = this.SoundNode;
        return node
            ? this[Configuration.subObjectAttributeNameFromReference(node, true)]
            : null
    }

    /** @return {ObjectEntity} */
    getSettingsObject() {
        const settings = this.SettingsInterface;
        return settings
            ? this[Configuration.subObjectAttributeNameFromReference(settings, true)]
            : null
    }

    /** @return {ObjectEntity} */
    getSubgraphObject() {
        const name = this.SubgraphInstance;
        return name
            ? this[Configuration.subObjectAttributeNameFromName(name)]
            : null
    }

    isDevelopmentOnly() {
        const nodeClass = this.getClass();
        return this.EnabledState?.toString() === "DevelopmentOnly"
            || nodeClass.includes("Debug", Math.max(0, nodeClass.lastIndexOf(".")))
    }

    getHIDAttribute() {
        return this.InputKey ?? this.AxisKey ?? this.InputAxisKey
    }

    getDelegatePin() {
        return this.getCustomproperties().find(pin => pin.PinType.PinCategory.toString() === "delegate")
    }

    nodeColor() {
        return nodeColor(this)
    }

    nodeIcon() {
        return nodeIcon(this)
    }

    additionalPinInserter() {
        return nodeVariadic(this)
    }

    /** @param {String} key */
    showProperty(key) {
        switch (key) {
            case "Class":
            case "Name":
            case "Archetype":
            case "ExportPath":
            case "CustomProperties":
                // Serielized separately, check doWrite()
                return false
        }
        return super.showProperty(key)
    }

    /** @param {typeof ObjectEntity} Self */
    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof ObjectEntity} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        const isSelfOverriden = Self !== this.constructor;
        const deeperIndentation = indentation + Configuration.indentation;
        const initial_trailing = this.trailing;
        this.trailing = true;
        const content = super.doSerialize(insideString, deeperIndentation, Self, printKey, keySeparator, attributeSeparator, wrap);
        this.trailing = initial_trailing;
        let result = indentation + "Begin Object"
            + ((this.Class?.type || this.Class?.path)
                // && Self.attributes.Class.ignored !== true
                // && this.Class.ignored !== true
                ? ` Class${keySeparator}${this.Class.serialize(insideString)}`
                : ""
            )
            + (this.Name
                // && Self.attributes.Name.ignored !== true
                // && this.Name.ignored !== true
                ? ` Name${keySeparator}${this.Name.serialize(insideString)}`
                : ""
            )
            + (this.Archetype
                // && Self.attributes.Archetype.ignored !== true
                // && this.Archetype.ignored !== true
                ? ` Archetype${keySeparator}${this.Archetype.serialize(insideString)}`
                : ""
            )
            + ((this.ExportPath?.valueOf()?.type || this.ExportPath?.valueOf()?.path)
                // && Self.attributes.ExportPath.valueOf().ignored !== true
                // && this.ExportPath.valueOf().ignored !== true
                ? ` ExportPath${keySeparator}${this.ExportPath.serialize(insideString)}`
                : ""
            )
            + attributeSeparator
            + content
            + (Self.attributes.CustomProperties.ignored !== true && this.CustomProperties.ignored !== true
                ? this.getCustomproperties()
                    .map(pin =>
                        deeperIndentation
                        + printKey("CustomProperties ")
                        + pin.serialize(insideString)
                        + attributeSeparator
                    )
                    .join("")
                : ""
            )
            + indentation + "End Object"
            + (isSelfOverriden && Self.trailing || this.trailing ? attributeSeparator : "");
        return result
    }
}

/**
 * AI Panel Element - AI Assistant Floating Panel
 * Lit-based web component for UE Blueprint AI generation
 */

/**
 * @typedef {Object} AISettings
 * @property {string} provider
 * @property {string} apiKey
 * @property {string} baseUrl
 * @property {string} model
 * @property {number} temperature
 */

class AIPanelElement extends i$5 {

    static properties = {
        visible: { type: Boolean, reflect: true },
        prompt: { type: String },
        isGenerating: { type: Boolean },
        statusText: { type: String },
        statusType: { type: String },
        quickModels: { type: Array },
        model: { type: String },
        provider: { type: String },
        // "chat" or "generate" (which covers text/image/node generation)
        mode: { type: String }, 
        // "blueprint" or "material" - graph type mode
        graphMode: { type: String },
        // Array of { role: 'user' | 'assistant', content: string | Array }
        history: { type: Array },
        // Modal dialog state
        showModal: { type: Boolean },
        modalConfig: { type: Object },
        // Pending images for next message (base64 data URLs)
        pendingImages: { type: Array },
        debug: { type: Boolean },
        systemPrompt: { type: String },
        providerConfigs: { type: Object },
        // Slim IR mode (experimental) - generates compact JSON then converts to T3D
        useSlimIR: { type: Boolean },
        maxHistoryLength: { type: Number },
        contextMode: { type: String },
        temperature: { type: Number }
    }

    static styles = i$8`
        :host {
            position: fixed;
            top: 30px;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: none;
        }

        :host([visible]) {
            display: flex;
        }

        .ai-panel {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 0;
            box-shadow: -4px 0 16px rgba(0, 0, 0, 0.3);
            width: 400px;
            height: 100%;
            min-width: 280px;
            max-width: 90vw;
            resize: horizontal;
            overflow: auto;
            direction: rtl; /* Move resize handle to left side */
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #e0e0e0;
        }

        .ai-panel > * {
            direction: ltr; /* Reset text direction for content */
        }

        .panel-header {
            display: flex;
            justify-content: flex-end; /* Align controls to right */
            align-items: center;
            padding: 8px 12px;
            background: #252525;
            border-bottom: 1px solid #3a3a3a;
            cursor: move;
            flex-shrink: 0;
            height: 24px; /* Fixed header height */
        }

        .tabs {
            display: flex;
            gap: 2px;
            background: transparent;
            padding: 2px;
            border-radius: 4px;
        }

        .tab {
            padding: 4px 12px;
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            border-radius: 0;
            color: #666;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
        }

        .tab:hover {
            color: #aaa;
        }

        .tab.active {
            border-bottom-color: #4a7c8c;
            color: #fff;
        }

        .tab.active.material {
            border-bottom-color: #7c4a8c;
        }

        /* Mode Buttons (BP/Material) */
        .mode-buttons {
            display: flex;
            gap: 2px;
            background: #1a1a1a;
            padding: 2px;
            border-radius: 4px;
            border: 1px solid #3a3a3a;
            margin-right: auto;
        }

        .mode-btn {
            padding: 4px 10px;
            background: transparent;
            border: none;
            border-radius: 3px;
            color: #888;
            cursor: pointer;
            font-size: 11px;
            transition: all 0.2s;
        }

        .mode-btn:hover {
            background: #333;
            color: #ccc;
        }

        .mode-btn.active {
            background: #4a7c8c;
            color: white;
        }

        .mode-btn.active.material {
            background: #7c4a8c;
        }

        /* Modal Overlay */
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
        }

        .modal {
            background: #252525;
            border: 1px solid #4a4a4a;
            border-radius: 8px;
            padding: 20px;
            max-width: 350px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .modal-title {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #f0c060;
        }

        .modal-message {
            font-size: 14px;
            color: #ccc;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .modal-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }

        .modal-btn {
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            font-size: 13px;
            transition: background 0.2s;
        }

        .modal-btn.cancel {
            background: #3a3a3a;
            color: #ccc;
        }

        .modal-btn.cancel:hover {
            background: #4a4a4a;
        }

        .modal-btn.confirm {
            background: #4a7c8c;
            color: white;
        }

        .modal-btn.confirm:hover {
            background: #5a8c9c;
        }

        .close-btn, .settings-btn {
            background: none;
            border: none;
            color: #888;
            font-size: 16px;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
        }

        .close-btn:hover, .settings-btn:hover {
            background: #333;
            color: #fff;
        }

        /* Chat History Area */
        .chat-history {
            flex-grow: 1;
            padding: 12px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #1e1e1e;
        }

        .message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }

        .message.user {
            align-self: flex-end;
            background: #2d4a54;
            color: #fff;
            border-bottom-right-radius: 2px;
        }

        .message.assistant {
            align-self: flex-start;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            color: #e0e0e0;
            border-bottom-left-radius: 2px;
        }

        .message.system {
            align-self: center;
            font-size: 12px;
            color: #666;
            font-style: italic;
            background: none;
            border: none;
            padding: 4px;
        }

        /* Markdown styles in messages */
        .message p {
            margin: 0 0 8px 0;
        }
        .message p:last-child {
            margin-bottom: 0;
        }
        .message code {
            background: #1a1a1a;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 13px;
        }
        .message pre {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 6px;
            padding: 10px;
            margin: 8px 0;
            overflow-x: auto;
        }
        .message pre code {
            background: none;
            padding: 0;
            font-size: 12px;
            line-height: 1.4;
        }
        .message strong {
            color: #fff;
        }
        .message em {
            font-style: italic;
            color: #b0b0b0;
        }
        .message h2, .message h3, .message h4 {
            margin: 12px 0 6px 0;
            color: #fff;
        }
        .message h2 { font-size: 16px; }
        .message h3 { font-size: 14px; }
        .message h4 { font-size: 13px; }
        .message ul {
            margin: 6px 0;
            padding-left: 20px;
        }
        .message li {
            margin: 4px 0;
        }
        .message a {
            color: #6ab0c7;
            text-decoration: none;
        }
        .message a:hover {
            text-decoration: underline;
        }

        /* Input Area at Bottom */
        .input-area {
            padding: 12px;
            background: #252525;
            border-top: 1px solid #3a3a3a;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .toolbar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 4px;
        }

        .config-row {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
        }

        .model-select {
            flex: 1;
            max-width: 200px;
            padding: 4px 8px;
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #ccc;
            font-size: 12px;
        }

        .prompt-wrapper {
            display: flex;
            flex-direction: column;
        }

        .prompt-resize-handle {
            height: 6px;
            background: transparent;
            cursor: ns-resize;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 2px;
        }

        .prompt-resize-handle::before {
            content: '';
            width: 40px;
            height: 3px;
            background: #3a3a3a;
            border-radius: 2px;
            transition: background 0.2s;
        }

        .prompt-resize-handle:hover::before {
            background: #5a5a5a;
        }

        .prompt-input {
            width: 100%;
            min-height: 60px;
            max-height: 400px;
            padding: 10px;
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 6px;
            color: #e0e0e0;
            font-size: 14px;
            resize: none;
            direction: ltr;
            font-family: inherit;
            box-sizing: border-box;
        }

        .prompt-input:focus {
            outline: none;
            border-color: #4a7c8c;
        }

        .action-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 4px;
        }

        .send-btn {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            background: #4a7c8c;
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: background 0.2s;
        }

        .send-btn:hover:not(:disabled) {
            background: #5a8c9c;
        }

        .send-btn:disabled {
            background: #3a3a3a;
            cursor: not-allowed;
            opacity: 0.5;
        }

        .status-bar {
            padding: 4px 12px;
            background: #1a1a1a;
            border-top: 1px solid #3a3a3a;
            font-size: 11px;
            color: #666;
            text-align: center;
            flex-shrink: 0;
            min-height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .status-bar.error { color: #e57373; }
        .status-bar.success { color: #81c784; }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .generating .status-bar {
            animation: pulse 1.5s infinite;
        }

        /* Image attachment styles */
        .image-preview-area {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px;
            background: #1e1e1e;
            border-bottom: 1px solid #3a3a3a;
            max-height: 120px;
            overflow-y: auto;
        }

        .image-preview-area:empty {
            display: none;
        }

        .image-thumb {
            position: relative;
            width: 80px;
            height: 80px;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid #3a3a3a;
        }

        .image-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .image-thumb .remove-btn {
            position: absolute;
            top: 2px;
            right: 2px;
            width: 18px;
            height: 18px;
            background: rgba(0, 0, 0, 0.7);
            border: none;
            border-radius: 50%;
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .image-thumb .remove-btn:hover {
            background: #e57373;
        }

        .attach-btn {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            background: transparent;
            border: 1px solid #3a3a3a;
            color: #888;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.2s;
        }

        .attach-btn:hover {
            border-color: #4a7c8c;
            color: #4a7c8c;
        }

        .capture-btn {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            background: transparent;
            border: 1px solid #3a3a3a;
            color: #888;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.2s;
        }

        .capture-btn:hover:not(:disabled) {
            border-color: #4a7c8c;
            color: #4a7c8c;
        }

        .capture-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Image in chat history */
        .message-images {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
        }

        .message-images img {
            max-width: 150px;
            max-height: 100px;
            border-radius: 4px;
            cursor: pointer;
        }

        .message-images img:hover {
            opacity: 0.9;
        }

        input[type="file"] {
            display: none;
        }
    `

    constructor() {
        super();
        this.visible = true;
        this.history = []; // Chat history
        this.prompt = "";
        this.statusText = "Ready";
        this.statusType = "";
        this.isGenerating = false;
        this.mode = "chat"; // Default to chat mode
        this.graphMode = "blueprint"; // "blueprint" or "material"
        this.showModal = false;
        this.modalConfig = null;
        this.model = localStorage.getItem("ueb-ai-model") || "";
        this.provider = localStorage.getItem("ueb-ai-provider") || "";
        this.quickModels = [];
        this.settings = {
            baseUrl: "",
            apiKey: "",
            model: "",
            provider: "openai" // Default provider
        };
        this.providerConfigs = {};
        this.debug = false;
        this.systemPrompt = DEFAULT_PROMPT_TEMPLATE;
        this.abortController = null;
        this.pendingImages = []; // Images pending to be sent with next message
        this.useSlimIR = localStorage.getItem("ueb-ai-slim-ir") !== "false"; // Default enabled
        this.maxHistoryLength = 10;
        this.contextMode = "auto";
        this.contextMode = "auto";
        this.temperature = 1.0;

        // Dragging state
        this._isDragging = false;
        this._dragStartX = 0;
        this._dragStartY = 0;
        this._panelStartX = 0;
        this._panelStartY = 0;

        // Blueprint reference (set externally)
        this.blueprint = null;
        this.llmService = new LLMService();
    }

    /* ... lifecycle and handlers ... */

    connectedCallback() {
        super.connectedCallback();
        this._loadSettings();
        this._setupKeyboardShortcut();
        document.body.addEventListener("ueb-ai-settings-saved", (e) => {
            if (this.llmService) {
                const settings = e.detail;
                this.providerConfigs = settings.providerConfigs || {};
                this.quickModels = settings.quickModels || [];
                this.debug = settings.debug || false;
                this.llmService.setDebug(this.debug);
                this.systemPrompt = settings.systemPrompt || DEFAULT_PROMPT_TEMPLATE;
                this.maxHistoryLength = settings.maxHistoryLength ?? 10;
                this.contextMode = settings.contextMode ?? "auto";
                
                // If the user actively chose a provider/model in settings, update the active selection
                if (settings.provider && settings.providerConfigs[settings.provider]?.apiKey) {
                     this.provider = settings.provider;
                     if (settings.model) {
                         this.model = settings.model;
                     }
                }

                // If we currently have no valid provider selected, fallback to settings
                if (!this.model || !this.provider) {
                    this.model = settings.model || "";
                    this.provider = settings.provider || "";
                }

                // Construct config to apply (respecting local override)
                let configUpdate = { ...settings };
                
                // If local selection exists, ensure we use its provider config
                if (this.model && this.provider && this.providerConfigs[this.provider]) {
                    const pConfig = this.providerConfigs[this.provider];
                    configUpdate = {
                        ...configUpdate,
                        apiKey: pConfig.apiKey,
                        baseUrl: pConfig.baseUrl,
                        model: this.model,
                        provider: this.provider
                    };
                    
                    // Apply quick model specific baseUrl if any
                    const quickEntry = this.quickModels.find(qm => qm.model === this.model && qm.provider === this.provider);
                    if (quickEntry && quickEntry.baseUrl) {
                        configUpdate.baseUrl = quickEntry.baseUrl;
                    }
                }

                this.llmService.updateConfig(configUpdate);
                // Force UI update to check if warning should be removed
                this.requestUpdate();
            }
        });
        
        // Listen for type mismatch events from blueprint
        document.body.addEventListener("ueb-type-mismatch", (e) => {
            const { currentType, newType, nodeCount } = e.detail;
            this.history = [...this.history, { 
                role: 'system', 
                content: `⚠️ Added ${nodeCount || 1} ${newType} node(s) to ${currentType} graph.` 
            }];
            this._scrollToBottom();
        });
        
        // Observe blueprint type changes to sync graphMode
        this._setupBlueprintTypeObserver();
    }
    
    /**
     * Set up observer to sync graphMode with blueprint.blueprintType
     */
    _setupBlueprintTypeObserver() {
        // Wait for blueprint to be set
        const checkAndObserve = () => {
            if (this.blueprint) {
                // Initial sync
                this._syncGraphModeFromBlueprint();
                
                // Watch for data-type attribute changes
                this._blueprintObserver = new MutationObserver((mutations) => {
                    for (const mutation of mutations) {
                        if (mutation.attributeName === 'data-type') {
                            this._syncGraphModeFromBlueprint();
                        }
                    }
                });
                this._blueprintObserver.observe(this.blueprint, { 
                    attributes: true, 
                    attributeFilter: ['data-type'] 
                });
            } else {
                // Retry later if blueprint not set yet
                setTimeout(checkAndObserve, 100);
            }
        };
        checkAndObserve();
    }
    
    /**
     * Sync graphMode based on current blueprint type
     */
    _syncGraphModeFromBlueprint() {
        if (!this.blueprint) return
        
        const blueprintType = this.blueprint.blueprintType;
        if (blueprintType === "MATERIAL") {
            this.graphMode = "material";
        } else if (blueprintType === "BLUEPRINT" || !blueprintType) {
            this.graphMode = "blueprint";
        }
        // Other types (NIAGARA, PCG, etc.) stay as blueprint mode for now
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("keydown", this._keydownHandler);
        if (this._blueprintObserver) {
            this._blueprintObserver.disconnect();
        }
    }

    _setupKeyboardShortcut() {
        this._keydownHandler = (e) => {
            // Shortcuts disabled
        };
        document.addEventListener("keydown", this._keydownHandler);
    }

    _loadSettings() {
        try {
            // Load global settings
            const savedApi = localStorage.getItem("ueblueprint-api-settings");
            if (savedApi) {
                const settings = JSON.parse(savedApi);
                
                // Store provider configs for switching
                this.providerConfigs = settings.providerConfigs || {};
                
                // Update local state
                this.quickModels = settings.quickModels || [];
                this.debug = settings.debug || false;
                if (this.llmService) this.llmService.setDebug(this.debug);
                this.systemPrompt = settings.systemPrompt || DEFAULT_PROMPT_TEMPLATE;
                this.maxHistoryLength = settings.maxHistoryLength ?? 10;
                this.contextMode = settings.contextMode ?? "auto";
                
                // 1. Base config from active global settings
                let configToUse = { ...settings };
                
                // 2. Check for local override (Quick Switch selection)
                const savedModel = localStorage.getItem("ueb-ai-model");
                const savedProvider = localStorage.getItem("ueb-ai-provider");
                
                if (savedModel && savedProvider) {
                    this.model = savedModel;
                    this.provider = savedProvider;
                } else {
                    // Fallback to global defaults
                    this.model = settings.model || "";
                    this.provider = settings.provider || "";
                }
                
                // Load temperature
                const savedTemp = localStorage.getItem("ueb-ai-temperature");
                if (savedTemp !== null) {
                    this.temperature = parseFloat(savedTemp);
                } else if (settings.temperature !== undefined) {
                    this.temperature = settings.temperature;
                } else {
                    this.temperature = 1.0;
                }
                
                // 3. Construct effective config for LLMService
                // If we have a provider override, try to get its specific config (ApiKey etc) from providerConfigs
                if (this.provider && this.providerConfigs[this.provider]) {
                    const pConfig = this.providerConfigs[this.provider];
                    configToUse = {
                        ...configToUse,
                        apiKey: pConfig.apiKey,
                        baseUrl: pConfig.baseUrl, 
                        model: this.model,
                        provider: this.provider,
                        temperature: this.temperature
                    };
                } else {
                     // Just ensure model is correct if we didn't find provider config
                     configToUse.model = this.model;
                     configToUse.provider = this.provider;
                }
                
                // If the quick model has a specific custom baseUrl, apply it
                const quickEntry = this.quickModels.find(qm => qm.model === this.model && qm.provider === this.provider);
                if (quickEntry && quickEntry.baseUrl) {
                    configToUse.baseUrl = quickEntry.baseUrl;
                }

                this.llmService.updateConfig(configToUse);
            }
        } catch (e) {
            console.warn("Failed to load AI settings:", e);
        }
    }

    _saveSettings() {
        // No local settings to save anymore, everything is in global API settings
    }

    show() { this.visible = true; }
    hide() { this.visible = false; }
    toggle() { this.visible = !this.visible; }

    /**
     * Get compressed blueprint context for LLM
     * P1 Optimization: Reduce token usage by 50-70%
     */
    _getBlueprintContext() {
        if (!this.blueprint) return null

        // Try to get selected nodes first
        let nodes = this.blueprint.getNodes(true);
        let selectionState = "Selected nodes";
        
        // If no selection, get all nodes
        if (nodes.length === 0) {
            nodes = this.blueprint.getNodes(false);
            selectionState = "All nodes";
        }

        if (nodes.length > 0) {
            // Determine context mode
            let useSummary = false;
            
            if (this.contextMode === 'none') {
                 return null
            } else if (this.contextMode === 'summary') {
                 useSummary = true;
            } else if (this.contextMode === 'full') {
                 useSummary = false;
            } else {
                 // Auto mode: Summary if > 50 nodes AND no specific selection
                 // If selectionState is "Selected nodes", user specifically wants context for these, so use full.
                 // If "All nodes" (fallback) and count is high, use summary.
                 if (selectionState === "All nodes" && nodes.length > 50) {
                      useSummary = true;
                 }
            }

            // P1: Compressed context format
            const compressed = this._compressContext(nodes, useSummary);
            const modeLabel = useSummary ? "Summary" : "Full";
            return `Context (${selectionState}, ${nodes.length} nodes, ${modeLabel}):\n${compressed}`
        }
        
        return null
    }
    
    /**
     * Compress node context to summary format
     * Format: [NodeType] pin1←, →pin2*
     * @param {Array} nodes - Node elements
     * @param {boolean} summaryOnly - If true, only show node types/names, no pins
     * @returns {string} - Compressed context
     */
    _compressContext(nodes, summaryOnly = false) {
        // Build a map of node Name -> display name for connection resolution
        const nodeNameToTitle = new Map();
        for (const node of nodes) {
            const entity = node.entity;
            const name = entity.Name?.toString();
            if (name) {
                let title = nodeTitle(entity);
                if (!title) {
                    if (entity.FunctionReference?.MemberName) {
                        title = entity.FunctionReference.MemberName.toString();
                    } else {
                        const typePath = entity.getType?.() || entity.getClass?.() || '';
                        const lastDot = typePath.lastIndexOf('.');
                        title = lastDot >= 0 ? typePath.substring(lastDot + 1) : typePath;
                    }
                }
                nodeNameToTitle.set(name, title || name);
            }
        }
        
        return nodes.map(node => {
            const entity = node.entity;
            
            // Get node display name
            let nodeTypeName = nodeTitle(entity);
            if (!nodeTypeName) {
                if (entity.FunctionReference?.MemberName) {
                    nodeTypeName = entity.FunctionReference.MemberName.toString();
                } else if (entity.CustomFunctionName) {
                    nodeTypeName = entity.CustomFunctionName.toString();
                } else {
                    const typePath = entity.getType?.() || entity.getClass?.() || '';
                    const lastDot = typePath.lastIndexOf('.');
                    nodeTypeName = lastDot >= 0 ? typePath.substring(lastDot + 1) : typePath;
                }
            }
            
            // If summary only, skip pins
            if (summaryOnly) {
                return `[${nodeTypeName}]`
            }
            
            // Get pin summary with connection targets
            const pins = entity.getPinEntities?.() || [];
            const pinDescriptions = [];
            
            for (const pin of pins.slice(0, 8)) {
                const pinName = pin.PinName?.toString() || 'pin';
                const linkedTo = pin.LinkedTo?.values || [];
                
                if (linkedTo.length > 0) {
                    // Has connections - show targets
                    const targets = linkedTo.slice(0, 2).map(ref => {
                        const targetNodeName = ref.objectName?.toString();
                        const targetTitle = nodeNameToTitle.get(targetNodeName) || targetNodeName || '?';
                        return `[${targetTitle}]`
                    }).join(',');
                    
                    if (pin.isInput?.()) {
                        pinDescriptions.push(`←${pinName} from ${targets}`);
                    } else {
                        pinDescriptions.push(`→${pinName} to ${targets}`);
                    }
                } else {
                    // No connection - show default value if meaningful
                    const defaultVal = pin.DefaultValue;
                    if (defaultVal !== undefined && defaultVal !== null) {
                        const valStr = defaultVal.toString?.() || '';
                        if (valStr && valStr !== '' && valStr !== '0' && valStr !== 'false') {
                            pinDescriptions.push(`${pinName}=${valStr.slice(0, 20)}`);
                        }
                    }
                }
            }
            
            const summary = pinDescriptions.length > 0 ? pinDescriptions.join(', ') : 'no connections';
            return `[${nodeTypeName}] ${summary}`
        }).join('\\n')
    }

    
    /**
     * Validate T3D syntax before injection
     * P1 Optimization: Catch parsing errors early
     * @param {string} t3dText - T3D text to validate
     * @returns {{valid: boolean, error?: string, parsed?: any}} - Validation result
     */
    _validateT3D(t3dText) {
        if (!t3dText || !t3dText.trim()) {
            return { valid: false, error: 'Empty T3D text' }
        }
        
        // Check for basic T3D structure
        if (!t3dText.includes('Begin Object')) {
            return { valid: false, error: 'Missing "Begin Object" declaration' }
        }
        
        // Check for truncation (missing End Object)
        const beginCount = (t3dText.match(/Begin Object/g) || []).length;
        const endCount = (t3dText.match(/End Object/g) || []).length;
        if (beginCount !== endCount) {
            return { valid: false, error: `Truncated T3D: ${beginCount} "Begin Object" but ${endCount} "End Object"` }
        }
        
        // Try to parse using the grammar
        try {
            const parsed = ObjectEntity.grammarMultipleObjects.parse(t3dText);
            
            // Check if parse returned valid result
            if (parsed === undefined || parsed === null) {
                return { valid: false, error: 'Parser returned empty result' }
            }
            
            if (!Array.isArray(parsed)) {
                return { valid: false, error: `Parser returned non-array: ${typeof parsed}` }
            }
            
            if (parsed.length === 0) {
                return { valid: false, error: 'No valid nodes found in T3D' }
            }
            
            return { valid: true, parsed }
        } catch (e) {
            // Extract more useful error info
            const errorMsg = e.message || 'T3D parsing failed';
            const stack = e.stack ? e.stack.split('\n').slice(0, 3).join('\n') : '';
            console.error('[T3D Validation] Parse exception:', e);
            return { valid: false, error: `${errorMsg}${stack ? '\n' + stack : ''}` }
        }
    }

    _handlePromptInput(e) { 
        this.prompt = e.target.value; 
        
        // If user manually resized, respect that height (don't auto-shrink/grow)
        if (this._manualPromptHeight) return

        // Auto-resize textarea
        const el = e.target;
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }

    _handleKeyDown(e) {
        // Stop propagation to prevent graph interactions (Arrow keys, Del, etc.)
        e.stopPropagation();

        // Ctrl+Enter to send, plain Enter for newline
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            this._handleSubmit();
        }
    }

    /* Prompt textarea resize from top */
    _handlePromptResizeStart(e) {
        e.preventDefault();
        const textarea = this.shadowRoot.querySelector('.prompt-input');
        if (!textarea) return

        this._isResizingPrompt = true;
        this._promptResizeStartY = e.clientY;
        this._promptStartHeight = textarea.offsetHeight;

        this._promptResizeMove = this._handlePromptResizeMove.bind(this);
        this._promptResizeEnd = this._handlePromptResizeEnd.bind(this);
        document.addEventListener('mousemove', this._promptResizeMove);
        document.addEventListener('mouseup', this._promptResizeEnd);
    }

    _handlePromptResizeMove(e) {
        if (!this._isResizingPrompt) return
        const textarea = this.shadowRoot.querySelector('.prompt-input');
        if (!textarea) return

        // Dragging up (negative delta) should increase height
        const deltaY = this._promptResizeStartY - e.clientY;
        const newHeight = Math.max(60, Math.min(400, this._promptStartHeight + deltaY));
        textarea.style.height = newHeight + 'px';
    }

    _handlePromptResizeEnd() {
        this._isResizingPrompt = false;
        
        // Capture final height to prevent auto-resize from overriding it
        const textarea = this.shadowRoot.querySelector('.prompt-input');
        if (textarea) {
            this._manualPromptHeight = textarea.style.height;
        }
        
        document.removeEventListener('mousemove', this._promptResizeMove);
        document.removeEventListener('mouseup', this._promptResizeEnd);
    }

    /**
     * Build messages array for LLM call, incorporating history and context
     * @param {string} userPrompt - Current user prompt
     * @param {string} systemPrompt - System prompt to use
     * @param {string} context - Blueprint context string
     * @param {number} historyLimit - Max number of history items to include
     * @returns {Array} Messages array for llmService.chat
     */
    _buildMessagesForGeneration(userPrompt, systemPrompt, context, historyLimit = 10) {
        const messages = [{ role: "system", content: systemPrompt }];
        
        // Add recent history (respecting limit)
        // For generation, we might want a shorter history to focus on the current task
        const limit = Math.max(2, historyLimit);
        const historyToInclude = this.history.slice(-limit);
        
        for (const msg of historyToInclude) {
            if (msg.role === 'system') continue
            
            // If it's the very last message in history, and it matches our current prompt attempt,
            // we skip it here and add it at the end with context.
            // However, this.history usually already contains the message we just added.
            // To avoid duplication and ensure context is in the right place:
            if (msg.role === 'user' && msg === historyToInclude[historyToInclude.length - 1] && msg.content === userPrompt) {
                continue
            }
            
            messages.push({ role: msg.role, content: msg.content || "" });
        }
        
        // Add current prompt with context as the final message
        let finalContent = userPrompt;
        if (context) {
            finalContent = `Context:\n${context}\n\nTask: ${userPrompt}`;
        }
        messages.push({ role: "user", content: finalContent });
        
        return messages
    }

    _handleSubmit() {
        if (this.mode === 'chat') {
            this._handleChat();
        } else {
            this._handleGenerate();
        }
    }

    async _handleChat() {
        if (this.isGenerating || (!this.prompt.trim() && this.pendingImages.length === 0)) return

        const userMsg = this.prompt.trim();
        const userImages = [...this.pendingImages];
        
        // Build user message content (text + images for Vision API)
        let userContent;
        if (userImages.length > 0) {
            userContent = [];
            if (userMsg) {
                userContent.push({ type: "text", text: userMsg });
            }
            for (const imgData of userImages) {
                userContent.push({ 
                    type: "image_url", 
                    image_url: { url: imgData } 
                });
            }
        } else {
            userContent = userMsg;
        }
        
        // Add to history (store images for display)
        this.history = [...this.history, { 
            role: 'user', 
            content: userMsg,
            images: userImages.length > 0 ? userImages : undefined 
        }];
        this.prompt = "";
        this.pendingImages = [];
        this.requestUpdate();

        // Reset textarea height
        const textarea = this.shadowRoot.querySelector('.prompt-input');
        if (textarea) {
            textarea.style.height = 'auto';
            this._manualPromptHeight = null;
        }

        this.isGenerating = true;
        this.statusText = "Thinking...";
        this.statusType = "";
        this.abortController = new AbortController();

        try {
            const context = this._getBlueprintContext() || "No blueprint/material nodes currently available.";
            
            // Select system prompt based on graphMode and customization
            let systemPrompt = this.systemPrompt || DEFAULT_PROMPT_TEMPLATE;
            
            const modeDesc = this.graphMode === "material" ? "Material Editor" : "Blueprint Editor";
            const modeType = this.graphMode === "material" ? "Material node" : "Blueprint";
            
            // Replace placeholders
            systemPrompt = systemPrompt
                .replace(/{{MODE}}/g, modeDesc)
                .replace(/{{MODE_TYPE}}/g, modeType);

            // Handle Context placeholder
            if (systemPrompt.includes("{{CONTEXT}}")) {
                 systemPrompt = systemPrompt.replace(/{{CONTEXT}}/g, context ? `Context:\n${context}` : "");
            } else if (context) {
                 // Append context if no placeholder
                 systemPrompt += `\n\nContext:\n${context}`;
            }
            
            // Always reinforce current mode awareness
            systemPrompt += `\n\nCurrent Editor Mode: ${this.graphMode}`;
            
            // Build messages array for API call
            const messages = this._buildMessagesForGeneration(userMsg, systemPrompt, context, this.maxHistoryLength || 10);
            
            // Handle Vision (images) for the last message if needed
            if (userImages.length > 0) {
                const lastMsg = messages[messages.length - 1];
                const content = [{ type: "text", text: lastMsg.content }];
                for (const imgData of userImages) {
                    content.push({ type: "image_url", image_url: { url: imgData } });
                }
                lastMsg.content = content;
            }

            // Stream response placeholder
            this.history = [...this.history, { role: 'assistant', content: "" }];
            const assistantMsgIndex = this.history.length - 1;
            
            const responseText = await this.llmService.chat(messages, this.abortController.signal);
            
            // Update the assistant message
            const updatedHistory = [...this.history];
            updatedHistory[assistantMsgIndex].content = responseText;
            this.history = updatedHistory;
            
            this.statusText = "Reply received";
            this.statusType = "success";

        } catch (error) {
            if (error.name === 'AbortError') {
                this.statusText = "Stopped";
            } else {
                this.statusText = "Error";
                this.statusType = "error";
                this.history = [...this.history, { role: 'system', content: `Error: ${error.message}` }];
            }
        } finally {
            this.isGenerating = false;
            this.abortController = null;
            this.requestUpdate();
            this._scrollToBottom();
        }
    }

    _scrollToBottom() {
        setTimeout(() => {
            const historyEl = this.shadowRoot.querySelector('.chat-history');
            if (historyEl) {
                historyEl.scrollTop = historyEl.scrollHeight;
            }
        }, 10);
    }

    _handleModeChange(newMode) {
        this.mode = newMode;
    }

    /**
     * Handle graph type mode switching (blueprint/material)
     */
    _handleGraphModeChange(newMode) {
        // If graph has nodes and switching to different type, show warning
        const currentType = this.blueprint?.blueprintType;
        const targetType = newMode === "material" ? "MATERIAL" : "BLUEPRINT";
        
        if (currentType && currentType !== targetType && this.blueprint?.nodes?.length > 0) {
            this._showModal({
                title: "⚠️ Switch Mode?",
                message: `Current graph contains ${currentType} nodes. Switching to ${newMode.toUpperCase()} mode may cause issues.`,
                confirmText: "Switch Anyway",
                cancelText: "Cancel",
                onConfirm: () => {
                    this.graphMode = newMode;
                    this._hideModal();
                }
            });
        } else {
            this.graphMode = newMode;
        }
    }

    /**
     * Convert graphMode to blueprintType string
     */
    _modeToType(mode) {
        return mode === "material" ? "MATERIAL" : "BLUEPRINT"
    }

    /**
     * Show modal dialog with config
     */
    _showModal(config) {
        this.modalConfig = config;
        this.showModal = true;
    }

    /**
     * Hide modal dialog
     */
    _hideModal() {
        this.showModal = false;
        this.modalConfig = null;
    }

    /**
     * Handle modal confirm action
     */
    _confirmModal() {
        if (this.modalConfig?.onConfirm) {
            this.modalConfig.onConfirm();
        } else {
            this._hideModal();
        }
    }

    _handleModelSelect(e) {
        const index = e.target.value;
        if (index !== "" && this.quickModels[index]) {
            const selected = this.quickModels[index];
            this.model = selected.model;
            this.provider = selected.provider;
            
            // Persist selection
            localStorage.setItem("ueb-ai-model", this.model);
            localStorage.setItem("ueb-ai-provider", this.provider);
            
            // Prepare config update
            let configUpdate = {
                model: selected.model,
                provider: selected.provider,
                baseUrl: selected.baseUrl // Start with quick model's base URL (if any)
            };
            
            // If we have provider configs, grab the API key and fallback base URL
            // This handles switching providers (e.g. OpenAI -> Gemini)
            if (this.providerConfigs && this.providerConfigs[selected.provider]) {
                const pConfig = this.providerConfigs[selected.provider];
                configUpdate.apiKey = pConfig.apiKey;
                if (!configUpdate.baseUrl) {
                    configUpdate.baseUrl = pConfig.baseUrl;
                }
            }
            
            this.llmService.updateConfig(configUpdate);
        }
    }
    
    _handleTemperatureChange(e) {
        let val = parseFloat(e.target.value);
        if (isNaN(val)) val = 1.0;
        // Clamp between 0 and 2 (most LLMs range)
        val = Math.max(0, Math.min(2, val));
        
        this.temperature = val;
        localStorage.setItem("ueb-ai-temperature", val.toString());
        
        this.llmService.updateConfig({ temperature: val });
    }

    /**
     * Handle paste event to capture images
     */
    _handlePaste(e) {
        const items = e.clipboardData?.items;
        if (!items) return
        
        for (const item of items) {
            if (item.type.startsWith('image/')) {
                e.preventDefault();
                const file = item.getAsFile();
                if (file) this._addImage(file);
            }
        }
    }

    /**
     * Handle file input change
     */
    _handleFileSelect(e) {
        const files = e.target.files;
        if (!files) return
        
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                this._addImage(file);
            }
        }
        // Reset input so same file can be selected again
        e.target.value = '';
    }

    /**
     * Add image file to pending images (convert to base64)
     */
    _addImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            this.pendingImages = [...this.pendingImages, base64];
        };
        reader.readAsDataURL(file);
    }

    /**
     * Remove pending image by index
     */
    _removeImage(index) {
        this.pendingImages = this.pendingImages.filter((_, i) => i !== index);
    }

    /**
     * Open file picker for images
     */
    _openImagePicker() {
        const input = this.shadowRoot.querySelector('#image-input');
        if (input) input.click();
    }

    /**
     * Get bounding box of selected nodes in screen coordinates
     * @returns {{x: number, y: number, width: number, height: number} | null}
     */
    _getSelectedNodesBounds() {
        const selectedNodes = this.blueprint?.getNodes(true);
        if (!selectedNodes || selectedNodes.length === 0) return null

        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;

        for (const node of selectedNodes) {
            const rect = node.getBoundingClientRect();
            minX = Math.min(minX, rect.left);
            minY = Math.min(minY, rect.top);
            maxX = Math.max(maxX, rect.right);
            maxY = Math.max(maxY, rect.bottom);
        }

        // Add padding
        const padding = 20;
        return {
            x: minX - padding,
            y: minY - padding,
            width: maxX - minX + padding * 2,
            height: maxY - minY + padding * 2
        }
    }

    /**
     * Capture screenshot of selected nodes and add to pending images
     */
    async _captureSelectedNodes() {
        const bounds = this._getSelectedNodesBounds();
        if (!bounds) {
            this.statusText = "No nodes selected";
            this.statusType = "error";
            // Revert status after 3s
            setTimeout(() => {
                if (this.statusText === "No nodes selected") {
                    this.statusText = "Ready";
                    this.statusType = "";
                }
            }, 3000);
            return
        }

        this.statusText = "Capturing...";
        this.statusType = "";
        this.requestUpdate();

        try {
            // Get blueprint grid element
            const gridElement = this.blueprint.getGridDOMElement();
            const gridRect = gridElement.getBoundingClientRect();

            // Calculate capture area relative to grid element
            const captureX = bounds.x - gridRect.left;
            const captureY = bounds.y - gridRect.top;
            
            // Capture with html2canvas
            const canvas = await html2canvas(gridElement, {
                backgroundColor: "#1e1e1e",
                scale: window.devicePixelRatio || 2,
                logging: false,
                x: captureX,
                y: captureY,
                width: bounds.width,
                height: bounds.height,
                useCORS: true,
                allowTaint: true
            });

            const base64 = canvas.toDataURL("image/png");
            this.pendingImages = [...this.pendingImages, base64];

            this.statusText = "Node area captured";
            this.statusType = "success";
            
            // Revert status after 2s
            setTimeout(() => {
                if (this.statusText === "Node area captured") {
                    this.statusText = "Ready";
                    this.statusType = "";
                }
            }, 2000);

        } catch (error) {
            console.error("[Capture Error]:", error);
            this.statusText = "Capture failed";
            this.statusType = "error";
        } finally {
            this.requestUpdate();
        }
    }


    /* ... drag handlers ... */
    _handleDragStart(e) {
        if (e.target.closest(".tabs") || e.target.closest("button")) return
        this._isDragging = true;
        this._dragStartX = e.clientX;
        this._dragStartY = e.clientY;
        const rect = this.getBoundingClientRect();
        this._panelStartX = rect.left;
        this._panelStartY = rect.top;
        document.addEventListener("mousemove", this._handleDragMove);
        document.addEventListener("mouseup", this._handleDragEnd);
    }

    _handleDragMove = (e) => {
        if (!this._isDragging) return
        const dx = e.clientX - this._dragStartX;
        const dy = e.clientY - this._dragStartY;
        this.style.left = `${this._panelStartX + dx}px`;
        this.style.top = `${this._panelStartY + dy}px`;
        this.style.right = "auto";
    }

    _handleDragEnd = () => {
        this._isDragging = false;
        document.removeEventListener("mousemove", this._handleDragMove);
        document.removeEventListener("mouseup", this._handleDragEnd);
    }

    _openSettings() {
        this.dispatchEvent(new CustomEvent("open-settings", { bubbles: true }));
    }

    _handleStop() {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
            this.isGenerating = false;
            this.statusText = "Generation stopped";
            this.statusType = ""; // Neutral color for stop
        }
    }

    async _handleGenerate() {
        if (this.isGenerating) {
            this._handleStop();
            return
        }

        if (!this.prompt || !this.prompt.trim()) {
            this.statusText = "Please enter a prompt";
            this.statusType = "error";
            return
        }

        // Add user prompt to history
        this.history = [...this.history, { role: 'user', content: this.prompt }];
        const currentPrompt = this.prompt;
        this.prompt = ""; // Clear prompt
        this.requestUpdate();

        this.isGenerating = true;
        this.statusText = "Generating...";
        this.statusType = "";
        
        this.abortController = new AbortController();

        try {
            // Config is already updated via event listener or initial load
            const context = this._getBlueprintContext();
            
            // === Slim IR Mode ===
            // Use compact JSON generation then convert to T3D
            console.log('%c[Generate] useSlimIR =', 'color: #ff9800', this.useSlimIR);
            if (this.useSlimIR) {
                this.statusText = "Generating (Slim IR)...";
                const result = await this._handleSlimIRGenerate(currentPrompt, context);
                const nodeCount = result.nodes?.length || 0;
                const content = this.debug 
                    ? `Generated ${nodeCount} nodes via Slim IR.\n\n\`\`\`json\n${JSON.stringify(result.slimIR, null, 2)}\n\`\`\`\n\n\`\`\`\n${result.t3dText}\n\`\`\`` 
                    : `✅ Generated ${nodeCount} node${nodeCount !== 1 ? 's' : ''} (Slim IR).`;
                
                this.history = [...this.history, { role: 'assistant', content }];
                this.statusText = "Generation complete!";
                this.statusType = "success";
                return
            }
            
            // === Legacy T3D Mode ===
            let promptToSend = currentPrompt;
            
            if (context) {
                promptToSend = `${context}\n\nTask: ${currentPrompt}`;
            }

            // Select system prompt based on graphMode and enhance with relevant examples
            const baseSystemPrompt = this.graphMode === "material" 
                ? MATERIAL_SYSTEM_PROMPT 
                : BLUEPRINT_SYSTEM_PROMPT;
            
            // P1: Inject available node types index
            const classIndexText = await getClassIndexText(this.graphMode);
            const promptWithIndex = classIndexText 
                ? `${baseSystemPrompt}\n\n${classIndexText}`
                : baseSystemPrompt;
            
            // Dynamically inject relevant T3D examples based on user prompt
            const systemPrompt = await enhancePromptWithExamples(
                promptWithIndex, 
                currentPrompt, 
                this.graphMode
            );

            const messages = this._buildMessagesForGeneration(promptToSend, systemPrompt, context, 5);
            const t3dText = await this.llmService.chat(messages, this.abortController.signal);
            
            // P1: Validate T3D syntax (soft validation - warn but still try)
            const validation = this._validateT3D(t3dText);
            if (!validation.valid) {
                // Log full error details to console for debugging
                console.group('%c[T3D Pre-Validation Warning]', 'color: #ffa94d; font-weight: bold');
                console.warn('Pre-validation failed:', validation.error);
                console.log('%cGenerated T3D:', 'color: #ffa94d');
                console.log(t3dText);
                console.log('%cPrompt:', 'color: #69db7c');
                console.log(currentPrompt);
                console.log('%cAttempting injection anyway...', 'color: #74c0fc');
                console.groupEnd();
                
                // Don't block - still try to inject, _injectBlueprint has its own error handling
            }
            
            const nodes = this._injectBlueprint(t3dText);
            
            // Validate generated node types match graphMode
            if (nodes && nodes.length > 0) {
                const expectedType = this._modeToType(this.graphMode);
                const mismatchedNodes = nodes.filter(n => {
                    const nodeType = n.entity.getBlueprintType();
                    return nodeType !== expectedType
                });
                
                if (mismatchedNodes.length > 0) {
                    const actualType = mismatchedNodes[0].entity.getBlueprintType();
                    this.history = [...this.history, { 
                        role: 'system', 
                        content: `\u26a0\ufe0f Generated ${mismatchedNodes.length} ${actualType} nodes in ${this.graphMode.toUpperCase()} mode.` 
                    }];
                }
                
                setTimeout(() => {
                    LayoutEngine.process(nodes);
                }, 50);
            }

            // Add success response to history
            // Add success response to history
            const nodeCount = nodes?.length || 0;
            const content = this.debug 
                ? `Generated ${nodeCount} nodes.\n\n\`\`\`\n${t3dText}\n\`\`\`` 
                : `✅ Generated ${nodeCount} node${nodeCount !== 1 ? 's' : ''}.`;

            this.history = [...this.history, { 
                role: 'assistant', 
                content: content 
            }];

            this.statusText = "Generation complete!";
            this.statusType = "success";
        } catch (error) {
            if (error.name === 'AbortError') {
                this.statusText = "Generation stopped";
                this.statusType = "";
                this.history = [...this.history, { role: 'system', content: "Generation stopped by user." }];
            } else {
                this.statusText = `Error: ${error.message}`;
                this.statusType = "error";
                console.error("Generation failed:", error);
                this.history = [...this.history, { role: 'assistant', content: `Error generating blueprint: ${error.message}` }];
            }
        } finally {
            this.isGenerating = false;
            this.abortController = null;
            this.requestUpdate();
            this._scrollToBottom();
        }
    }

    _injectBlueprint(t3dText) {
        if (!this.blueprint) throw new Error("Blueprint instance not set")
        const pasteHandler = this.blueprint.template.getPasteInputObject();
        const nodes = pasteHandler.pasted(t3dText);
        if (!nodes || nodes.length === 0) throw new Error("Failed to parse blueprint text or no nodes generated")
        
        // Post-process: Set material node link colors to white/gray (like UE Material Editor)
        this._postProcessMaterialLinkColors(nodes);
        
        return nodes
    }
    
    /**
     * Post-process material nodes to set their link colors to white/gray
     * This matches UE Material Editor's behavior where all links are white
     * @param {NodeElement[]} nodes 
     */
    _postProcessMaterialLinkColors(nodes) {
        // Material link color: rgb(200, 200, 200) - light gray/white
        const materialLinkColor = new LinearColorEntity({ R: 200/255, G: 200/255, B: 200/255, A: 1 });
        
        for (const node of nodes) {
            if (!node.entity?.isMaterial()) continue
            
            // Get all pins and their connected links
            const pins = node.getPinElements();
            for (const pin of pins) {
                // Update pin color for material nodes
                pin.color = materialLinkColor;
                
                // Update all links connected to this pin
                const links = this.blueprint.getLinks(pin);
                for (const link of links) {
                    link.color = materialLinkColor;
                }
            }
        }
    }

    /**
     * Handle generation using Slim IR mode
     * Generates compact JSON, converts to T3D, then injects
     * @param {string} userPrompt - Original user prompt
     * @param {string} context - Blueprint context
     */
    async _handleSlimIRGenerate(userPrompt, context) {

        // Use simplified Slim IR prompt
        const systemPrompt = getSlimPrompt(this.graphMode);
        
        console.group('%c[Slim IR Generation]', 'color: #00d4ff; font-weight: bold');
        console.log('%c=== SLIM IR MODE ACTIVE ===', 'color: #00ff00; font-size: 14px; font-weight: bold');
        console.log('Mode:', this.graphMode);
        console.log('User prompt:', userPrompt);
        console.log('%cSystem prompt size: ' + systemPrompt.length + ' bytes', 
            systemPrompt.length < 5000 ? 'color: #00ff00; font-weight: bold' : 'color: #ff0000; font-weight: bold');
        console.log('System prompt preview:', systemPrompt.substring(0, 200) + '...');
        
        // Get LLM response (should be JSON)
        const messages = this._buildMessagesForGeneration(userPrompt, systemPrompt, context, 5);
        const responseText = await this.llmService.chat(messages, this.abortController.signal);
        
        console.log('LLM response:', responseText);
        
        // Parse JSON response
        let slimIR;
        try {
            // Try to extract JSON from response (in case LLM adds extra text)
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON object found in response')
            }
            slimIR = JSON.parse(jsonMatch[0]);
        } catch (parseErr) {
            console.error('Failed to parse Slim IR JSON:', parseErr);
            console.log('Raw response:', responseText);
            console.groupEnd();
            throw new Error(`Failed to parse Slim IR: ${parseErr.message}`)
        }
        
        console.log('Parsed Slim IR:', slimIR);
        console.log('Slim IR size:', JSON.stringify(slimIR).length, 'bytes');
        
        // Convert Slim IR to T3D
        const conversionResult = convertSlimIRToT3D(slimIR, this.graphMode);
        
        if (!conversionResult.success) {
            console.error('Slim IR conversion failed:', conversionResult.errors);
            console.groupEnd();
            throw new Error(`Slim IR conversion failed: ${conversionResult.errors.join(', ')}`)
        }
        
        const t3dText = conversionResult.t3d;
        console.log('Generated T3D:', t3dText);
        console.log('T3D size:', t3dText.length, 'bytes');
        console.log('Expansion ratio:', (t3dText.length / JSON.stringify(slimIR).length).toFixed(1) + 'x');
        console.groupEnd();
        
        // Inject and process nodes
        const nodes = this._injectBlueprint(t3dText);
        
        if (nodes && nodes.length > 0) {
            setTimeout(() => {
                LayoutEngine.process(nodes);
            }, 50);
        }
        
        return { nodes, t3dText, slimIR }
    }

    render() {
        return x`
            <div class="ai-panel ${this.isGenerating ? "generating" : ""}"
                @mousedown=${e => e.stopPropagation()}
                @click=${e => e.stopPropagation()}
                @wheel=${e => e.stopPropagation()}
            >
                <div class="panel-header" @mousedown=${this._handleDragStart}>
                    <div class="mode-buttons">
                        <button class="mode-btn ${this.graphMode === "blueprint" ? "active" : ""}"
                                @click=${() => this._handleGraphModeChange("blueprint")}
                                title="Blueprint mode">Blueprint</button>
                        <button class="mode-btn ${this.graphMode === "material" ? "active material" : ""}"
                                @click=${() => this._handleGraphModeChange("material")}
                                title="Material mode">Material</button>
                    </div>
                    <div>
                        <button class="settings-btn" @click=${this._openSettings} title="Settings">⚙</button>
                    </div>
                </div>

                <!-- Chat History -->
                <div class="chat-history">
                    ${(!this.provider || !this.providerConfigs[this.provider]?.apiKey) ? x`
                        <div class="message system" style="color: #ef5350; border: 1px solid #ef5350; padding: 12px; border-radius: 6px; background: rgba(239, 83, 80, 0.1); text-align: center;">
                            <div>⚠️ API Configuration Required</div>
                            <div style="margin-top: 8px; color: #ccc;">
                                Please <a href="#" @click=${(e) => { e.preventDefault(); this._openSettings(); }} style="color: #4fc3f7; text-decoration: underline;">Open Settings</a> to configure your API Provider and Key.
                            </div>
                        </div>
                    ` : this.history.length === 0 ? x`
                        <div class="message system">
                            ${this.mode === 'chat' ? 
                                (this.graphMode === 'material' ? 
                                    "Ask questions about material nodes or UE5 shaders." :
                                    "Ask questions about your blueprint or UE5.") : 
                                (this.graphMode === 'material' ?
                                    "Describe the shader effect you want to generate." :
                                    "Describe the blueprint logic you want to generate.")}
                        </div>
                    ` : this.history.map(msg => x`
                        <div class="message ${msg.role}">
                            ${msg.role === 'assistant' 
                                ? o(parseMarkdown(msg.content))
                                : msg.content}
                            ${msg.images && msg.images.length > 0 ? x`
                                <div class="message-images">
                                    ${msg.images.map(img => x`
                                        <img src="${img}" alt="Attached image" />
                                    `)}
                                </div>
                            ` : ''}
                        </div>
                    `)}
                </div>

                <div class="input-area" @paste=${this._handlePaste}>
                    <!-- Image preview area -->
                    ${this.pendingImages.length > 0 ? x`
                        <div class="image-preview-area">
                            ${this.pendingImages.map((img, index) => x`
                                <div class="image-thumb">
                                    <img src="${img}" alt="Pending image" />
                                    <button class="remove-btn" @click=${() => this._removeImage(index)} title="Remove">×</button>
                                </div>
                            `)}
                        </div>
                    ` : ''}
                    
                    <div class="toolbar">
                        <div class="config-row">
                            <select class="model-select" @change=${this._handleModelSelect}>
                                ${this.quickModels.length > 0 ? 
                                    this.quickModels.map((m, index) => x`
                                        <option 
                                            value=${index} 
                                            ?selected=${this.model === m.model && this.provider === m.provider}
                                        >
                                            ${m.model}
                                        </option>
                                    `) : 
                                    x`<option value="">Select Model...</option>`
                                }
                            </select>
                        </div>
                    </div>

                    <div class="prompt-wrapper">
                        <div class="prompt-resize-handle" @mousedown=${this._handlePromptResizeStart}></div>
                        <textarea
                            class="prompt-input"
                            placeholder="${this._getPlaceholder()}"
                            .value=${this.prompt}
                            @input=${this._handlePromptInput}
                            @keydown=${this._handleKeyDown}
                        ></textarea>
                    </div>
                    
                    <!-- Hidden file input -->
                    <input type="file" id="image-input" accept="image/*" multiple @change=${this._handleFileSelect} />
                    
                    <div class="action-row">
                        <div class="tabs">
                            <button class="tab ${this.mode === "chat" ? "active" : ""}"
                                    @click=${() => this._handleModeChange("chat")}>Chat</button>
                            <button class="tab ${this.mode === "generate" ? "active" : ""}"
                                    @click=${() => this._handleModeChange("generate")}>Generate</button>
                        </div>

                        <div style="display: flex; gap: 8px;">
                            <button
                                class="capture-btn"
                                @click=${this._captureSelectedNodes}
                                title="Capture selected nodes"
                                ?disabled=${this.isGenerating}
                            >
                                📷
                            </button>
                            <button
                                class="attach-btn"
                                @click=${this._openImagePicker}
                                title="Attach image (or paste)"
                            >
                                📎
                            </button>
                            <button
                                class="send-btn"
                                ?disabled=${this.isGenerating || (!this.prompt.trim() && this.pendingImages.length === 0)}
                                @click=${this._handleSubmit}
                                title="${this.isGenerating ? 'Stop' : 'Send'}"
                            >
                            ${this.isGenerating ? '■' : '➤'}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="status-bar ${this.statusType}">${this.statusText}</div>

                ${this.showModal && this.modalConfig ? x`
                    <div class="modal-overlay" @click=${this._hideModal}>
                        <div class="modal" @click=${e => e.stopPropagation()}>
                            <div class="modal-title">${this.modalConfig.title}</div>
                            <div class="modal-message">${this.modalConfig.message}</div>
                            <div class="modal-buttons">
                                <button class="modal-btn cancel" @click=${this._hideModal}>
                                    ${this.modalConfig.cancelText || "Cancel"}
                                </button>
                                <button class="modal-btn confirm" @click=${this._confirmModal}>
                                    ${this.modalConfig.confirmText || "Confirm"}
                                </button>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
        `
    }

    /**
     * Get placeholder text based on mode and graphMode
     */
    _getPlaceholder() {
        if (this.mode === 'chat') {
            return this.graphMode === 'material' 
                ? 'Ask about material nodes...' 
                : 'Ask about blueprint nodes...'
        }
        return this.graphMode === 'material'
            ? 'Describe shader effect...'
            : 'Describe blueprint logic...'
    }
}

// Removed: customElements.define is called in index.js

/**
 * Settings Element - API Configuration Panel
 * Lit-based web component for API provider settings
 */

/**
 * @typedef {Object} ProviderConfig
 * @property {string} name
 * @property {string} baseUrl
 * @property {string[]} models
 */

/** @type {Record<string, ProviderConfig>} */
const PROVIDERS = {
    openai: {
        name: "OpenAI",
        baseUrl: "https://api.openai.com/v1",
        models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"]
    },
    // DeepSeek removed
    gemini: {
        name: "Google Gemini",
        baseUrl: "https://generativelanguage.googleapis.com/v1beta",
        models: ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-1.5-pro", "gemini-1.5-flash"]
    },
    gptgod: {
        name: "GPTGod",
        baseUrl: "https://api.gptgod.online/v1",
        models: ["gpt-4o", "gpt-4o-mini", "claude-3-5-sonnet"]
    },
    yunwu: {
        name: "Yunwu",
        baseUrl: "https://yunwu.ai/v1",
        models: ["gemini-2.5-flash-thinking", "gemini-2.5-flash", "gemini-2.5-pro"]
    },
    openrouter: {
        name: "OpenRouter",
        baseUrl: "https://openrouter.ai/api/v1",
        models: ["google/gemini-2.0-flash-exp:free", "google/gemini-exp-1206:free", "deepseek/deepseek-r1-distill-llama-70b:free", "meta-llama/llama-3.3-70b-instruct:free"]
    },
    custom: {
        name: "Custom",
        baseUrl: "",
        models: []
    }
};

class SettingsElement extends i$5 {

    static properties = {
        visible: { type: Boolean, reflect: true },
        provider: { type: String },
        apiKey: { type: String },
        baseUrl: { type: String },
        model: { type: String },
        temperature: { type: Number },
        testStatus: { type: String },
        isTesting: { type: Boolean },
        availableModels: { type: Array, state: true },
        isLoadingModels: { type: Array, state: true },
        quickModels: { type: Array, state: true },
        dragOverIndex: { type: Number, state: true },
        showModelDropdown: { type: Boolean, state: true },
        modelFilter: { type: String, state: true },
        debug: { type: Boolean },
        systemPrompt: { type: String },
        maxHistoryLength: { type: Number },
        contextMode: { type: String }
    }

    static styles = i$8`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.7);
        }

        :host([visible]) {
            display: flex;
        }

        .settings-panel {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            width: 550px;
            max-height: 80vh;
            overflow-y: auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #e0e0e0;
        }

        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: #252525;
            border-bottom: 1px solid #3a3a3a;
        }

        .panel-title {
            font-size: 16px;
            font-weight: 500;
        }

        .close-btn {
            background: none;
            border: none;
            color: #888;
            font-size: 20px;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 4px;
        }

        .close-btn:hover {
            background: #333;
            color: #fff;
        }

        .panel-body {
            padding: 20px;
        }

        .setting-group {
            margin-bottom: 20px;
        }

        .setting-row {
            margin-bottom: 16px;
        }

        .setting-label {
            display: block;
            font-size: 14px;
            color: #e0e0e0;
            margin-bottom: 4px;
        }

        .setting-description {
            font-size: 12px;
            color: #888;
            margin-bottom: 8px;
        }

        .setting-input {
            width: 100%;
            padding: 10px 12px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 14px;
            box-sizing: border-box;
        }

        .setting-input:focus {
            outline: none;
            border-color: #4a7c8c;
        }

        .setting-select {
            width: 100%;
            padding: 10px 12px;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 14px;
        }

        .input-row {
            display: flex;
            gap: 8px;
        }

        .input-row .setting-input {
            flex: 1;
        }

        .test-btn {
            padding: 10px 16px;
            background: #3a3a3a;
            border: 1px solid #4a4a4a;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 13px;
            cursor: pointer;
            white-space: nowrap;
        }

        .test-btn:hover:not(:disabled) {
            background: #4a4a4a;
        }

        .test-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .test-status {
            font-size: 12px;
            margin-top: 8px;
            padding: 8px;
            border-radius: 4px;
        }

        .test-status.success {
            background: rgba(129, 199, 132, 0.2);
            color: #81c784;
        }

        .test-status.error {
            background: rgba(229, 115, 115, 0.2);
            color: #e57373;
        }

        .test-status.testing {
            background: rgba(100, 181, 246, 0.2);
            color: #64b5f6;
        }

        .section-title {
            font-size: 14px;
            font-weight: 500;
            color: #4a7c8c;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #3a3a3a;
        }

        .panel-footer {
            padding: 16px 20px;
            background: #252525;
            border-top: 1px solid #3a3a3a;
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }

        .save-btn {
            padding: 10px 24px;
            background: #4a7c8c;
            border: none;
            border-radius: 4px;
            color: white;
            font-size: 14px;
            cursor: pointer;
        }

        .save-btn:hover {
            background: #5a8c9c;
        }

        .cancel-btn {
            padding: 10px 24px;
            background: #3a3a3a;
            border: none;
            border-radius: 4px;
            color: #e0e0e0;
            font-size: 14px;
            cursor: pointer;
        }

        .cancel-btn:hover {
            background: #4a4a4a;
        }

        .quick-list-container {
            margin-top: 10px;
            padding: 10px;
            background: #202020;
            border-radius: 4px;
            border: 1px solid #333;
        }

        .quick-list-label {
            font-size: 12px;
            color: #888;
            margin-bottom: 8px;
            display: block;
        }

        .quick-models-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .quick-model-tag {
            display: flex;
            align-items: center;
            background: #2a2a2a;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            padding: 4px 8px;
            font-size: 12px;
            color: #e0e0e0;
            cursor: pointer;
            user-select: none;
            transition: all 0.2s;
        }

        .quick-model-tag:hover {
            background: #333;
            border-color: #4a7c8c;
        }
        
        .quick-model-tag.dragging {
            opacity: 0.5;
            background: #252525;
        }
        
        .quick-model-tag.drag-over {
            border-left: 2px solid #4a7c8c;
        }

        .quick-model-info {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .delete-quick-btn {
            background: none;
            border: none;
            color: #666;
            margin-left: 6px;
            padding: 2px;
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
            display: flex;
            align-items: center;
        }

        .delete-quick-btn:hover {
            color: #e57373;
        }
        
        .add-quick-btn {
            background: none;
            border: none;
            color: #4a7c8c;
            cursor: pointer;
            font-size: 12px;
            text-decoration: underline;
            padding: 4px 0;
            margin-top: 4px;
            display: inline-block;
        }
        
        
        .add-quick-btn:hover {
            color: #5a8c9c;
        }

        .model-selector {
            position: relative;
            flex: 1;
        }
        
        .model-dropdown-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #252525;
            border: 1px solid #3a3a3a;
            border-radius: 4px;
            max-height: 300px;
            overflow-y: auto;
            z-index: 100;
            margin-top: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            display: none;
        }

        .model-dropdown-list.show {
            display: block;
        }

        .model-option {
            padding: 8px 12px;
            cursor: pointer;
            border-bottom: 1px solid #2a2a2a;
            font-size: 13px;
        }
        
        .model-option:hover {
            background: #333;
        }

        .model-option.selected {
            background: #4a7c8c;
            color: white;
        }
    `

    constructor() {
        super();
        this.visible = false;
        this.provider = "openai";
        // Current active values (syncs with providerConfigs[provider])
        this.apiKey = "";
        this.baseUrl = PROVIDERS.openai.baseUrl;
        this.model = "gpt-4o";
        this.model = "gpt-4o";
        this.temperature = 1.0;
        
        // Multi-provider storage
        this.providerConfigs = {};
        
        this.testStatus = "";
        this.isTesting = false;
        this.availableModels = [];
        this.isLoadingModels = false;
        this.modelsCache = {};
        this.quickModels = [];
        this.dragOverIndex = -1;
        this.showModelDropdown = false;
        this.modelFilter = "";
        this.debug = false;
        this.maxHistoryLength = 10;
        this.contextMode = "auto";
    }

    connectedCallback() {
        super.connectedCallback();
        this._loadSettings();
    }

    _loadSettings() {
        try {
            const saved = localStorage.getItem("ueblueprint-api-settings");
            let settings = {};
            if (saved) {
                settings = JSON.parse(saved);
            }

            // Global settings
            this.provider = settings.provider ?? "openai";
            this.quickModels = settings.quickModels ?? [];
            this.provider = settings.provider ?? "openai";
            this.quickModels = settings.quickModels ?? [];
            this.debug = settings.debug ?? false;
            this.systemPrompt = settings.systemPrompt ?? DEFAULT_PROMPT_TEMPLATE;
            this.maxHistoryLength = settings.maxHistoryLength ?? 10;
            this.contextMode = settings.contextMode ?? "auto";

            // Load provider configs
            if (settings.providerConfigs) {
                this.providerConfigs = settings.providerConfigs;
            } else {
                // Migration: Create default configs from what we have or defaults
                // If we have legacy flat settings, assign them to the saved provider
                // or default to OpenAI if none saving
                this.providerConfigs = {};
                
                // Initialize all providers with defaults
                for (const [key, config] of Object.entries(PROVIDERS)) {
                    this.providerConfigs[key] = {
                        apiKey: "",
                        baseUrl: config.baseUrl,
                        model: config.models[0] || "",
                        temperature: 1.0
                    };
                }

                // If migration is needed (settings exist but no providerConfigs)
                if (saved) {
                    const legacyProvider = settings.provider || "openai";
                    this.providerConfigs[legacyProvider] = {
                        apiKey: settings.apiKey || "",
                        baseUrl: settings.baseUrl || PROVIDERS[legacyProvider]?.baseUrl || "",
                        model: settings.model || PROVIDERS[legacyProvider]?.models?.[0] || "",
                        temperature: settings.temperature ?? 1.0
                    };
                }
            }

            // Ensure current provider has a config object
            if (!this.providerConfigs[this.provider]) {
                 this.providerConfigs[this.provider] = {
                    apiKey: "",
                    baseUrl: PROVIDERS[this.provider]?.baseUrl || "",
                    model: PROVIDERS[this.provider]?.models?.[0] || "",
                    temperature: 1.0
                };
            }

            // Sync current state with active provider config
            this._applyProviderConfig(this.provider);

            // Load models cache
            const cache = localStorage.getItem("ueblueprint-api-models-cache");
            if (cache) {
                this.modelsCache = JSON.parse(cache);
            }
            
            this._updateAvailableModels();
            
        } catch (e) {
            console.warn("Failed to load API settings:", e);
            // Fallback initialization
            this.providerConfigs = {};
            for (const [key, config] of Object.entries(PROVIDERS)) {
                this.providerConfigs[key] = {
                    apiKey: "",
                    baseUrl: config.baseUrl,
                    model: config.models[0] || "",
                    temperature: 1.0
                };
            }
        }
    }

    _applyProviderConfig(provider) {
        const config = this.providerConfigs[provider] || {};
        this.apiKey = config.apiKey || "";
        this.baseUrl = config.baseUrl || PROVIDERS[provider]?.baseUrl || "";
        this.model = config.model || PROVIDERS[provider]?.models?.[0] || "";
        this.temperature = config.temperature ?? 1.0;
    }

    _updateProviderConfig(provider, updates) {
        if (!this.providerConfigs[provider]) {
             this.providerConfigs[provider] = {};
        }
        this.providerConfigs[provider] = { ...this.providerConfigs[provider], ...updates };
    }

    _updateAvailableModels() {
        // Use cached models if available, otherwise fallback to default provider list
        if (this.modelsCache[this.provider] && this.modelsCache[this.provider].length > 0) {
            this.availableModels = this.modelsCache[this.provider];
        } else {
            this.availableModels = PROVIDERS[this.provider]?.models || [];
        }
    }

    async _fetchModels() {
        if (!this.apiKey) return

        this.isLoadingModels = true;
        try {
            // Remove trailing slash from baseUrl if present
            const safeBaseUrl = this.baseUrl.replace(/\/+$/, '');
            let url = `${safeBaseUrl}/models`;
            let headers = {
                "Content-Type": "application/json"
            };

            if (this.provider === 'gemini') {
                url = `${url}?key=${this.apiKey}`;
            } else {
                headers["Authorization"] = `Bearer ${this.apiKey}`;
            }

            const response = await fetch(url, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                // Support generic OpenAI format and some variations
                let models = [];
                if (this.provider === 'gemini' && Array.isArray(data.models)) {
                    // Gemini format: { models: [{ name: "models/gemini-pro" }] }
                    // We strip "models/" prefix for simpler display/usage if preferred, or keep as is.
                    // The user config likely expects short names "gemini-2.5-flash" but API returns "models/gemini-2.5-flash".
                    // Let's filter/clean.
                    models = data.models.map(m => m.name.replace(/^models\//, ''));
                } else if (Array.isArray(data.data)) {
                    models = data.data.map(m => m.id);
                } else if (Array.isArray(data)) {
                    models = data.map(m => m.id || m);
                }

                if (models.length > 0) {
                    models.sort();
                    this.availableModels = models;
                    this.modelsCache[this.provider] = models;
                    localStorage.setItem("ueblueprint-api-models-cache", JSON.stringify(this.modelsCache));
                    
                    // If current model is invalid, select first available
                    if (this.model && !models.includes(this.model)) {
                        /* Keep current model even if not in list? Maybe not. */
                    }
                    if (!this.model && models.length > 0) {
                        this.model = models[0];
                        this._updateProviderConfig(this.provider, { model: this.model });
                        this._saveSettings();
                    }
                }
            }
        } catch (e) {
            console.error("Failed to fetch models:", e);
        } finally {
            this.isLoadingModels = false;
        }
    }

    async _handleRefreshModels() {
        await this._fetchModels();
    }

    _saveSettings() {
        try {
            // Update current provider config state before saving to be sure
            this._updateProviderConfig(this.provider, {
                apiKey: this.apiKey,
                baseUrl: this.baseUrl,
                model: this.model,
                temperature: this.temperature
            });

            const settings = {
                provider: this.provider,
                providerConfigs: this.providerConfigs, // Save all configs
                quickModels: this.quickModels,
                debug: this.debug,
                systemPrompt: this.systemPrompt,
                maxHistoryLength: this.maxHistoryLength,
                contextMode: this.contextMode,
                
                // Legacy fields for backward compatibility (optional, but good for safety)
                apiKey: this.apiKey,
                baseUrl: this.baseUrl,
                model: this.model,
                temperature: this.temperature
            };
            localStorage.setItem("ueblueprint-api-settings", JSON.stringify(settings));
            
            this.dispatchEvent(new CustomEvent("ueb-ai-settings-saved", {
                bubbles: true,
                detail: settings
            }));
        } catch (e) {
            console.warn("Failed to save API settings:", e);
        }
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    _handleProviderChange(e) {
        const newProvider = e.target.value;
        this.provider = newProvider;
        
        // Ensure config exists
        if (!this.providerConfigs[this.provider]) {
             this.providerConfigs[this.provider] = {
                apiKey: "",
                baseUrl: PROVIDERS[this.provider]?.baseUrl || "",
                model: PROVIDERS[this.provider]?.models?.[0] || "",
                temperature: 1.0
            };
        }

        // Apply new provider settings to UI state
        this._applyProviderConfig(this.provider);
        
        this.testStatus = "";
        
        this._updateAvailableModels();
        
        this._saveSettings();
        
        // Auto-fetch if first time (empty cache) and we have an API key
        if ((!this.modelsCache[this.provider] || this.modelsCache[this.provider].length === 0) && this.apiKey) {
            this._fetchModels();
        } else {
             // Reset model logic
             if (this.availableModels.length > 0 && !this.availableModels.includes(this.model)) {
                 this.model = this.availableModels[0];
                 this._updateProviderConfig(this.provider, { model: this.model });
                 this._saveSettings();
             } else if (this.availableModels.length === 0 && !this.model) {
                 this.model = "";
                 this._saveSettings();
             }
        }
    }

    _handleApiKeyChange(e) {
        this.apiKey = e.target.value;
        this.testStatus = "";
        this._updateProviderConfig(this.provider, { apiKey: this.apiKey });
        this._saveSettings();
    }

    _handleBaseUrlChange(e) {
        this.baseUrl = e.target.value;
        this.testStatus = "";
        this._updateProviderConfig(this.provider, { baseUrl: this.baseUrl });
        this._saveSettings();
    }

    _handleModelChange(e) {
        this.model = e.target.value;
        this._updateProviderConfig(this.provider, { model: this.model });
        this._saveSettings();
    }

    _handleAddQuickModel() {
        if (!this.model) return
        
        const exists = this.quickModels.some(m => 
            m.model === this.model && m.provider === this.provider
        );
        
        if (!exists) {
            this.quickModels = [...this.quickModels, {
                provider: this.provider,
                model: this.model,
                baseUrl: this.baseUrl // Optional: save baseUrl if custom
            }];
            this._saveSettings();
        }
    }

    _handleRemoveQuickModel(index, e) {
        e.stopPropagation();
        const newModels = [...this.quickModels];
        newModels.splice(index, 1);
        this.quickModels = newModels;
        this._saveSettings();
    }

    _handleQuickModelClick(qm) {
        this.provider;
        this.provider = qm.provider;
        
        // 1. Ensure config object exists
        if (!this.providerConfigs[this.provider]) {
             this.providerConfigs[this.provider] = {
                apiKey: "",
                baseUrl: PROVIDERS[this.provider]?.baseUrl || "",
                model: PROVIDERS[this.provider]?.models?.[0] || "",
                temperature: 1.0
            };
        }

        // 2. Apply saved config (API Key, etc.)
        this._applyProviderConfig(this.provider);

        // 3. Override with specific quick model details
        // Restore baseUrl if saved in quick model (mostly for custom)
        if (qm.baseUrl && this.provider === 'custom') {
            this.baseUrl = qm.baseUrl;
        }
        
        // Set the model from the quick shortcut
        this.model = qm.model;
        
        // Update state to match
        this._updateAvailableModels();
        
        // Update the provider config to reflect this new model selection
        this._updateProviderConfig(this.provider, { 
            model: this.model,
            baseUrl: this.baseUrl
        });

        // Save
        this._saveSettings();
    }

    _handleDragStart(e, index) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index);
        e.target.classList.add('dragging');
    }

    _handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.dragOverIndex = -1;
    }

    _handleDragOver(e, index) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (this.dragOverIndex !== index) {
            this.dragOverIndex = index;
        }
    }

    _handleDrop(e, index) {
        e.preventDefault();
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
        if (fromIndex !== index) {
            const newModels = [...this.quickModels];
            const [moved] = newModels.splice(fromIndex, 1);
            newModels.splice(index, 0, moved);
            this.quickModels = newModels;
            this._saveSettings();
        }
        this.dragOverIndex = -1;
    }



    _handleModelFilterInput(e) {
        this.modelFilter = e.target.value;
        this.showModelDropdown = true;
        // If user clears input, still show dropdown
    }

    _handleModelInputFocus() {
        this.modelFilter = this.model;
        this.showModelDropdown = true;
    }
    
    _handleModelInputBlur() {
        // Small delay to allow click event on option to fire before closing
        setTimeout(() => {
            this.showModelDropdown = false;
            // If we didn't select a new model (dropdown closed), revert display to current model
            // But if the user typed a custom model name and we want to support that?
            // For now, let's strictly support selection from list OR custom input if list is empty.
            // But wait, what if the user types something valid that is in the list but didn't click?
            // Let's just reset to this.model for visual consistency
            if (!this.showModelDropdown) {
                 this.modelFilter = this.model;
                 this.requestUpdate();
            }
        }, 200);
    }

    _handleModelSelect(m) {
        this.model = m;
        this.modelFilter = m;
        this.showModelDropdown = false;
        this._saveSettings();
    }

    _handleDebugChange(e) {
        this.debug = e.target.checked;
        this._saveSettings();
    }

    _handleSystemPromptChange(e) {
        this.systemPrompt = e.target.value;
        this._saveSettings();
    }

    _resetSystemPrompt() {
        this.systemPrompt = DEFAULT_PROMPT_TEMPLATE;
        this._saveSettings();
    }

    _handleTemperatureChange(e) {
        let val = parseFloat(e.target.value);
        if (isNaN(val)) val = 1.0;
        val = Math.max(0, Math.min(2, val));
        
        this.temperature = val;
        
        // Update current provider config
        this._updateProviderConfig(this.provider, { temperature: val });
        this._saveSettings();
    }

    _handleHistoryLengthChange(e) {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 2) val = 2;
        this.maxHistoryLength = val;
        this._saveSettings();
    }

    _handleContextModeChange(e) {
        this.contextMode = e.target.value;
        this._saveSettings();
    }

    async _handleTest() {
        if (!this.apiKey) {
            this.testStatus = "error:Please enter an API key";
            return
        }

        this.isTesting = true;
        this.testStatus = "testing:Testing connection...";

        try {
            // Remove trailing slash from baseUrl if present
            const safeBaseUrl = this.baseUrl.replace(/\/+$/, '');
            let url = `${safeBaseUrl}/models`;
            let headers = {
                "Content-Type": "application/json"
            };

            if (this.provider === 'gemini') {
                url = `${url}?key=${this.apiKey}`;
            } else {
                headers["Authorization"] = `Bearer ${this.apiKey}`;
            }

            const response = await fetch(url, {
                method: "GET",
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                let modelCount = 0;
                if (Array.isArray(data.models)) {
                    modelCount = data.models.length;
                } else {
                    modelCount = data.data?.length ?? 0;
                }
                this.testStatus = `success:Connection successful! Found ${modelCount} models.`;
            } else {
                const errorText = await response.text();
                this.testStatus = `error:API error: ${response.status} - ${errorText.slice(0, 100)}`;
            }
        } catch (error) {
            this.testStatus = `error:Connection failed: ${error.message}`;
        } finally {
            this.isTesting = false;
        }
    }

    // Saved automatically on change.
    // _handleSave and _handleCancel are removed.

    _handleOverlayClick(e) {
        if (e.target === this) {
            this.hide();
        }
    }

    _renderTestStatus() {
        if (!this.testStatus) return null

        const [type, message] = this.testStatus.split(":");
        return x`<div class="test-status ${type}">${message}</div>`
    }

    render() {
        const providerConfig = PROVIDERS[this.provider];

        return x`
            <div class="settings-panel" @click=${(e) => e.stopPropagation()}>
                <div class="panel-header">
                    <span class="panel-title">AI Settings</span>
                    <button class="close-btn" @click=${this.hide}>×</button>
                </div>

                <div class="panel-body">
                    <div class="setting-group">
                        <div class="section-title" style="display: flex; justify-content: space-between; align-items: center;">
                            <span>API Configuration</span>
                            <span style="font-size: 12px; color: #888; font-weight: normal;">Data is stored locally</span>
                        </div>

                        <div class="setting-row">
                            <label class="setting-label">API provider</label>
                            <span class="setting-description">Select API provider</span>
                            <select class="setting-select" @change=${this._handleProviderChange}>
                                ${Object.entries(PROVIDERS).map(([key, config]) => x`
                                    <option value=${key} ?selected=${this.provider === key}>${config.name}</option>
                                `)}
                            </select>
                        </div>

                        <div class="setting-row">
                            <label class="setting-label">${providerConfig?.name ?? "API"} API key</label>
                            <span class="setting-description">Enter your ${providerConfig?.name ?? "API"} API key</span>
                            <div class="input-row">
                                <input
                                    type="password"
                                    class="setting-input"
                                    placeholder="sk-..."
                                    .value=${this.apiKey}
                                    @input=${this._handleApiKeyChange}
                                >
                                <button
                                    class="test-btn"
                                    @click=${this._handleTest}
                                    ?disabled=${this.isTesting}
                                >
                                    ${this.isTesting ? "Testing..." : "Test connection"}
                                </button>
                            </div>
                            ${this._renderTestStatus()}
                        </div>

                        <div class="setting-group">
                            <div class="section-title">System Prompt</div>
                            <div class="setting-row">
                                <label class="setting-label">Chat System Prompt (Template)</label>
                                <span class="setting-description">
                                    Customize the AI persona. Supports placeholders: 
                                    <code>{{MODE}}</code> (Blueprint/Material), 
                                    <code>{{CONTEXT}}</code> (Selected nodes).
                                </span>
                                <textarea
                                    class="setting-input"
                                    style="height: 120px; font-family: monospace; line-height: 1.4;"
                                    .value=${this.systemPrompt}
                                    @input=${this._handleSystemPromptChange}
                                    placeholder="You are a UE5 {{MODE}} expert..."
                                ></textarea>
                                <button 
                                    class="add-quick-btn" 
                                    @click=${this._resetSystemPrompt}
                                    style="margin-top: 4px;"
                                >
                                    Reset to Default
                                </button>
                            </div>
                        </div>

                        <div class="setting-row">
                            <label class="setting-label">API base URL</label>
                            <span class="setting-description">API base URL</span>
                            <input
                                type="text"
                                class="setting-input"
                                placeholder="https://api.openai.com/v1"
                                .value=${this.baseUrl}
                                @input=${this._handleBaseUrlChange}
                            >
                        </div>
                        
                        <div class="setting-row">
                            <label class="setting-label">Model</label>
                            <span class="setting-description">Select model for generation</span>
                            <div class="input-row">
                                ${this.provider === 'custom' && this.availableModels.length === 0 ? x`
                                    <input 
                                        type="text" 
                                        class="setting-input" 
                                        .value=${this.model} 
                                        @input=${this._handleModelChange}
                                        placeholder="Enter model name"
                                    >
                                ` : x`
                                    <div class="model-selector">
                                        <input
                                            type="text"
                                            class="setting-input"
                                            .value=${this.showModelDropdown ? this.modelFilter : this.model}
                                            @input=${this._handleModelFilterInput}
                                            @focus=${this._handleModelInputFocus}
                                            @blur=${this._handleModelInputBlur}
                                            placeholder="Select or search model..."
                                        >
                                        <div class="model-dropdown-list ${this.showModelDropdown ? 'show' : ''}">
                                            ${this.availableModels
                                                .filter(m => !this.modelFilter || m.toLowerCase().includes(this.modelFilter.toLowerCase()))
                                                .map(m => x`
                                                    <div 
                                                        class="model-option ${this.model === m ? 'selected' : ''}"
                                                        @mousedown=${() => this._handleModelSelect(m)}
                                                    >
                                                        ${m}
                                                    </div>
                                                `)}
                                            ${this.availableModels.filter(m => !this.modelFilter || m.toLowerCase().includes(this.modelFilter.toLowerCase())).length === 0 ? x`
                                                <div class="model-option" style="cursor: default; color: #888;">No matching models</div>
                                            ` : ''}
                                        </div>
                                    </div>
                                `}
                                <button 
                                    class="test-btn" 
                                    @click=${this._handleRefreshModels}
                                    ?disabled=${this.isLoadingModels || !this.apiKey}
                                    title="Refresh Model List"
                                    style="width: 40px; padding: 0; display: flex; align-items: center; justify-content: center;"
                                >
                                    ${this.isLoadingModels ? "..." : "↻"}
                                </button>
                            </div>
                            <button class="add-quick-btn" @click=${this._handleAddQuickModel}>+ Add to Quick Switch List</button>
                        </div>
                        
                        ${this.quickModels.length > 0 ? x`
                            <div class="quick-list-container">
                                <span class="quick-list-label">Quick Switch: Drag to reorder</span>
                                <div class="quick-models-grid">
                                    ${this.quickModels.map((qm, index) => x`
                                        <div 
                                            class="quick-model-tag ${this.dragOverIndex === index ? 'drag-over' : ''}"
                                            draggable="true"
                                            @dragstart=${(e) => this._handleDragStart(e, index)}
                                            @dragend=${this._handleDragEnd}
                                            @dragover=${(e) => this._handleDragOver(e, index)}
                                            @drop=${(e) => this._handleDrop(e, index)}
                                            @click=${() => this._handleQuickModelClick(qm)}
                                        >
                                            <span class="quick-model-info">
                                                ${qm.model} <span style="opacity:0.6">| ${PROVIDERS[qm.provider]?.name || qm.provider}</span>
                                            </span>
                                            <button class="delete-quick-btn" @click=${(e) => this._handleRemoveQuickModel(index, e)}>×</button>
                                        </div>
                                    `)}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                        
                        <div class="setting-row" style="margin-top: 16px; border-top: 1px solid #3a3a3a; padding-top: 12px;">
                             <div class="input-row" style="align-items: center;">
                                 <input 
                                     type="checkbox" 
                                     id="debug-switch"
                                     .checked=${this.debug}
                                     @change=${this._handleDebugChange}
                                     style="width: auto; margin-right: 8px;"
                                 >
                                 <label for="debug-switch" class="setting-label" style="margin-bottom: 0; cursor: pointer;">Debug Mode</label>
                             </div>
                             <span class="setting-description" style="margin-left: 20px; display: block;">Show generation logs in chat history</span>
                        </div>

                        <div class="setting-row" style="margin-top: 12px; border-top: 1px solid #3a3a3a; padding-top: 12px;">
                            <label class="setting-label">Temperature</label>
                            <div class="input-row" style="align-items: center;">
                                <input 
                                    type="number" 
                                    class="setting-input" 
                                    .value=${String(this.temperature)}
                                    title="Temperature (0.0 - 2.0)\n• 1.0: Recommended for Gemini 3 (Default)\n• 0.0-0.3: Precise code generation\n• >1.0: Creative/Random"
                                    @change=${this._handleTemperatureChange}
                                    min="0" max="2" step="0.1"
                                >
                            </div>
                            <span class="setting-description">Controls randomness (1.0 = Default/Balanced, 0.2 = Precise)</span>
                        </div>

                        <div class="setting-row" style="margin-top: 12px;">
                            <label class="setting-label">Chat History Limit (Messages)</label>
                            <div class="input-row" style="align-items: center;">
                                <input 
                                    type="number" 
                                    class="setting-input" 
                                    .value=${String(this.maxHistoryLength)}
                                    @change=${this._handleHistoryLengthChange}
                                    min="2" max="50" step="2"
                                >
                            </div>
                            <span class="setting-description">Number of messages to keep in context (each round is 2 messages)</span>
                        </div>

                        <div class="setting-row" style="margin-top: 12px;">
                            <label class="setting-label">Context Mode</label>
                            <span class="setting-description">Optimize token usage for large graphs</span>
                            <select class="setting-select" @change=${this._handleContextModeChange}>
                                <option value="auto" ?selected=${this.contextMode === 'auto'}>Auto (Smart Summary)</option>
                                <option value="full" ?selected=${this.contextMode === 'full'}>Always Full Context</option>
                                <option value="summary" ?selected=${this.contextMode === 'summary'}>Always Summary (Nodes Only)</option>
                                <option value="none" ?selected=${this.contextMode === 'none'}>None (No Context)</option>
                            </select>
                        </div>
                    </div>

                    </div>


                </div>

                <div class="panel-footer" style="border:none; padding: 10px;">
                    <!-- Auto-save enabled -->
                </div>
            </div>
        ` 
    }
}

// Removed: customElements.define is called in index.js

/**
 * AI Module Export
 * Entry point for AI-related components
 */

/**
 * Initialize AI components and attach to blueprint
 * @param {import("../Blueprint.js").default} blueprint - Blueprint instance
 * @returns {{panel: AIPanelElement, settings: SettingsElement}}
 */
function initAIComponents(blueprint) {
    // Create AI panel
    const panel = document.createElement("ueb-ai-panel");
    panel.blueprint = blueprint;
    document.body.appendChild(panel);

    // Create settings panel
    const settings = document.createElement("ueb-ai-settings");
    document.body.appendChild(settings);

    // Connect events
    panel.addEventListener("open-settings", () => {
        settings.show();
    });

    settings.addEventListener("settings-saved", (e) => {
        console.log("AI settings saved:", e.detail);
    });

    return { panel, settings }
}

// Auto-register on import if not already defined
if (!customElements.get("ueb-ai-panel")) {
    customElements.define("ueb-ai-panel", AIPanelElement);
}
if (!customElements.get("ueb-ai-settings")) {
    customElements.define("ueb-ai-settings", SettingsElement);
}

export { AIPanelElement, SettingsElement, initAIComponents };
