/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;class n$2{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b={attribute:!0,type:String,converter:u$1,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class y$1 extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}}y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$2=t$1.trustedTypes,s$1=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$2="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$2="?"+h,n=`<${o$2}>`,r=document,l=()=>r.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n:d>=0?(o.push(a),s.slice(0,d)+e$2+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$2)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$2)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$1.litHtmlPolyfillSupport;j?.(N,R),(t$1.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i$1 extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}i$1._$litElement$=!0,i$1["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i$1});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i{constructor(i){if(super(i),this.it=E,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===E||null==r)return this._t=void 0,this.it=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o=e$1(e);

const BLUEPRINT_SYSTEM_PROMPT = `
You are an expert Unreal Engine 5 Blueprint developer.
Your goal is to generate valid T3D format text for UE5 Blueprint nodes based on the user's request.

CRITICAL RULES:
1. OUTPUT ONLY THE T3D TEXT. No markdown, no explanations, no code blocks.
2. Start directly with "Begin Object", do NOT include "Begin Map" or "End Map".
3. Each Node MUST have a unique "NodeGuid" (32-digit uppercase hex, e.g., "A1B2C3D4E5F6789012345678ABCDEF01").
4. Each Pin MUST have a unique "PinId" (32-digit uppercase hex).
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
The following context contains {{MODE_TYPE}} T3D data.
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
    async generate(userPrompt, signal, systemPrompt = SYSTEM_PROMPT) {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure it in settings.")
        }

        const baseUrl = this.config.baseUrl || "https://api.openai.com/v1";
        const model = this.config.model || "gpt-4o";
        const temperature = this.config.temperature ?? 0.5;

        try {
        const requestBody = {
                    model: model,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: temperature,
                    stream: false
                };

            // Debug logging
            if (this.debug) {
                console.group('%c[LLM Debug] Generate Request', 'color: #4CAF50; font-weight: bold');
                console.log('%cEndpoint:', 'color: #2196F3', `${baseUrl}/chat/completions`);
                console.log('%cModel:', 'color: #2196F3', model);
                console.log('%cTemperature:', 'color: #2196F3', temperature);
                console.log('%cSystem Prompt:', 'color: #FF9800', systemPrompt);
                console.log('%cUser Prompt:', 'color: #FF9800', userPrompt);
                console.log('%cFull Payload:', 'color: #9C27B0', JSON.stringify(requestBody, null, 2));
                console.groupEnd();
            }

            const response = await fetch(`${baseUrl}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.config.apiKey}`
                },
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
            const content = data.choices[0]?.message?.content;

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

        const baseUrl = this.config.baseUrl || "https://api.openai.com/v1";
        const model = this.config.model || "gpt-4o";
        const temperature = this.config.temperature ?? 0.7;

        try {
            const requestBody = {
                    model: model,
                    messages: messages,
                    temperature: temperature,
                    stream: false
                };

            // Debug logging
            if (this.debug) {
                console.group('%c[LLM Debug] Chat Request', 'color: #4CAF50; font-weight: bold');
                console.log('%cEndpoint:', 'color: #2196F3', `${baseUrl}/chat/completions`);
                console.log('%cModel:', 'color: #2196F3', model);
                console.log('%cMessages:', 'color: #FF9800', messages);
                console.log('%cFull Payload:', 'color: #9C27B0', JSON.stringify(requestBody, null, 2));
                console.groupEnd();
            }

            const response = await fetch(`${baseUrl}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.config.apiKey}`
                },
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
            const content = data.choices[0]?.message?.content;

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
 * Node Example Service
 * Provides dynamic few-shot example injection based on user prompts
 */

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
        // Use relative path from the current module
        const baseUrl = new URL('.', import.meta.url).href;
        const response = await fetch(baseUrl + 'nodeTemplates.json');
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
    
    // Extract keywords from prompt (simple tokenization)
    const keywords = prompt
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2);
    
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

class AIPanelElement extends i$1 {

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
        systemPrompt: { type: String }
    }

    static styles = i$4`
        :host {
            position: fixed;
            top: 50px;
            right: 50px;
            z-index: 9999;
            display: none;
        }

        :host([visible]) {
            display: block;
        }

        .ai-panel {
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            width: 500px;
            height: 80vh;
            min-width: 320px;
            min-height: 400px;
            max-width: 90vw;
            max-height: 95vh;
            resize: both;
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #e0e0e0;
            overflow: hidden;
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
            background: #1a1a1a;
            padding: 2px;
            border-radius: 4px;
            border: 1px solid #3a3a3a;
        }

        .tab {
            padding: 4px 12px;
            background: transparent;
            border: none;
            border-radius: 3px;
            color: #888;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
        }

        .tab:hover {
            background: #333;
            color: #ccc;
        }

        .tab.active {
            background: #4a7c8c;
            color: white;
        }

        .tab.active.material {
            background: #7c4a8c;
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

        .prompt-input {
            width: 100%;
            min-height: 100px;
            max-height: 300px;
            padding: 10px;
            background: #1a1a1a;
            border: 1px solid #3a3a3a;
            border-radius: 6px;
            color: #e0e0e0;
            font-size: 14px;
            resize: none;
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
        this.debug = false;
        this.systemPrompt = DEFAULT_PROMPT_TEMPLATE;
        this.abortController = null;
        this.pendingImages = []; // Images pending to be sent with next message

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
                this.llmService.updateConfig(settings);
                this.quickModels = settings.quickModels || [];
                this.debug = settings.debug || false;
                this.llmService.setDebug(this.debug);
                this.systemPrompt = settings.systemPrompt || DEFAULT_PROMPT_TEMPLATE;
                // If model/provider are not set from localStorage, or if they are no longer valid,
                // fall back to settings.
                if (!this.model || !this.provider) {
                    this.model = settings.model || "";
                    this.provider = settings.provider || "";
                }
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
                this.llmService.updateConfig(settings);
                
                // Update local state
                this.quickModels = settings.quickModels || [];
                this.debug = settings.debug || false;
                this.llmService.setDebug(this.debug);
                this.systemPrompt = settings.systemPrompt || DEFAULT_PROMPT_TEMPLATE;
                
                // If model/provider are not set from localStorage, or if they are no longer valid,
                // fall back to settings.
                if (!this.model || !this.provider) {
                    this.model = settings.model || "";
                    this.provider = settings.provider || "";
                }
                
                // If current global model is in quickModels, ensure we have the full config
                // (Though LLMService already has valid config from updateConfig(settings) which includes baseUrl)
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
             // Only serializing entities
             const nodeEntities = nodes.map(n => n.entity);
             const t3d = nodeEntities.reduce((acc, cur) => acc + cur.serialize(), "");
             return `Context (${selectionState}):\n\`\`\`\n${t3d}\n\`\`\``
        }
        
        return null
    }

    _handlePromptInput(e) { 
        this.prompt = e.target.value; 
        // Auto-resize textarea
        const el = e.target;
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }

    _handleKeyDown(e) {
        // Stop propagation to prevent graph interactions (Arrow keys, Del, etc.)
        e.stopPropagation();

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this._handleSubmit();
        }
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
        if (textarea) textarea.style.height = 'auto';

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
            const messages = [{ role: "system", content: systemPrompt }];
            
            // Add recent history (last 6 turns)
            const recentHistory = this.history.slice(-6);
            for (const msg of recentHistory) {
                if (msg.role === 'system') continue // Skip system messages like errors
                
                // For history, just use text content (images were already sent)
                if (msg === recentHistory[recentHistory.length - 1]) {
                    // Current message - use full content with images
                    messages.push({ role: msg.role, content: userContent });
                } else {
                    // Previous messages - text only
                    messages.push({ role: msg.role, content: msg.content || "" });
                }
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
            
            // Update LLM Service config for immediate use
            // Note: We don't have the API Key for this provider if it differs from the global one.
            // Assumption: User uses a compatible key or the same key provider.
            const configUpdate = {
                model: selected.model,
                provider: selected.provider,
                baseUrl: selected.baseUrl // Use the stored baseUrl for this quick model
            };
            
            this.llmService.updateConfig(configUpdate);
        }
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
            let promptToSend = currentPrompt;
            
            if (context) {
                promptToSend = `${context}\n\nTask: ${currentPrompt}`;
            }

            // Select system prompt based on graphMode and enhance with relevant examples
            const baseSystemPrompt = this.graphMode === "material" 
                ? MATERIAL_SYSTEM_PROMPT 
                : BLUEPRINT_SYSTEM_PROMPT;
            
            // Dynamically inject relevant T3D examples based on user prompt
            const systemPrompt = await enhancePromptWithExamples(
                baseSystemPrompt, 
                currentPrompt, 
                this.graphMode
            );

            const t3dText = await this.llmService.generate(promptToSend, this.abortController.signal, systemPrompt);
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
        return nodes
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
                                title="Blueprint mode">🔷 BP</button>
                        <button class="mode-btn ${this.graphMode === "material" ? "active material" : ""}"
                                @click=${() => this._handleGraphModeChange("material")}
                                title="Material mode">🎨 Mat</button>
                    </div>
                    <div>
                        <button class="settings-btn" @click=${this._openSettings} title="Settings">⚙</button>
                        <button class="close-btn" @click=${this.hide}>×</button>
                    </div>
                </div>

                <!-- Chat History -->
                <div class="chat-history">
                    ${this.history.length === 0 ? x`
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

                    <textarea
                        class="prompt-input"
                        placeholder="${this._getPlaceholder()}"
                        .value=${this.prompt}
                        @input=${this._handlePromptInput}
                        @keydown=${this._handleKeyDown}
                    ></textarea>
                    
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
    deepseek: {
        name: "DeepSeek",
        baseUrl: "https://api.deepseek.com/v1",
        models: ["deepseek-chat", "deepseek-coder"]
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
    custom: {
        name: "Custom",
        baseUrl: "",
        models: []
    }
};

class SettingsElement extends i$1 {

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
        systemPrompt: { type: String }
    }

    static styles = i$4`
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
        this.temperature = 0.5;
        
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
            this.debug = settings.debug ?? false;
            this.systemPrompt = settings.systemPrompt ?? DEFAULT_PROMPT_TEMPLATE;

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
                        temperature: 0.5
                    };
                }

                // If migration is needed (settings exist but no providerConfigs)
                if (saved) {
                    const legacyProvider = settings.provider || "openai";
                    this.providerConfigs[legacyProvider] = {
                        apiKey: settings.apiKey || "",
                        baseUrl: settings.baseUrl || PROVIDERS[legacyProvider]?.baseUrl || "",
                        model: settings.model || PROVIDERS[legacyProvider]?.models?.[0] || "",
                        temperature: settings.temperature ?? 0.5
                    };
                }
            }

            // Ensure current provider has a config object
            if (!this.providerConfigs[this.provider]) {
                 this.providerConfigs[this.provider] = {
                    apiKey: "",
                    baseUrl: PROVIDERS[this.provider]?.baseUrl || "",
                    model: PROVIDERS[this.provider]?.models?.[0] || "",
                    temperature: 0.5
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
                    temperature: 0.5
                };
            }
        }
    }

    _applyProviderConfig(provider) {
        const config = this.providerConfigs[provider] || {};
        this.apiKey = config.apiKey || "";
        this.baseUrl = config.baseUrl || PROVIDERS[provider]?.baseUrl || "";
        this.model = config.model || PROVIDERS[provider]?.models?.[0] || "";
        this.temperature = config.temperature ?? 0.5;
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
            const response = await fetch(`${this.baseUrl}/models`, {
                headers: { 
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Support generic OpenAI format and some variations
                let models = [];
                if (Array.isArray(data.data)) {
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
                temperature: 0.5
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
                temperature: 0.5
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

    async _handleTest() {
        if (!this.apiKey) {
            this.testStatus = "error:Please enter an API key";
            return
        }

        this.isTesting = true;
        this.testStatus = "testing:Testing connection...";

        try {
            const response = await fetch(`${this.baseUrl}/models`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                const modelCount = data.data?.length ?? 0;
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
                        <div class="section-title">API Configuration</div>

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
