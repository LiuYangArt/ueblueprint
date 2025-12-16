/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;class n$2{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b={attribute:!0,type:String,converter:u$1,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class y$1 extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}}y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$1="?"+h,n=`<${o$1}>`,r=document,l=()=>r.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$1)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}i._$litElement$=!0,i["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.1");

/**
 * System Prompt for UE Blueprint Generation
 */

const SYSTEM_PROMPT = `You are an expert Unreal Engine 5 Blueprint developer. Your task is to generate valid T3D format Blueprint code based on user requests.

### Core Rules
1. **Output Format**: Return ONLY the raw T3D text. Do not wrap in markdown code blocks. Do not add explanations.
2. **Node Structure**: Every node must start with \`Begin Object Class=...\` and end with \`End Object\`.
3. **GUIDs**: generate unique 32-character hex strings for \`NodeGuid\` and \`PinId\`.
4. **Layout**:
   - \`NodePosX\` and \`NodePosY\` are REQUIRED.
   - Place Event/Entry nodes on the far left (e.g., X=-600).
   - Place execution flow nodes sequentially to the right (X=0, X=250, X=500...).
5. **Pins**:
   - Include ALL necessary pins for the node type.
   - Use correct \`PinCategory\` (exec, bool, int, real, object, etc.).
   - For connections, use \`LinkedTo=(NodeName PinId,)\`.

### Common Nodes Reference

**Print String**
Class: /Script/BlueprintGraph.K2Node_CallFunction
FunctionReference: MemberParent=/Script/CoreUObject.Class'"/Script/Engine.KismetSystemLibrary"',MemberName="PrintString"

**Event BeginPlay**
Class: /Script/BlueprintGraph.K2Node_Event
EventReference: MemberParent=/Script/CoreUObject.Class'"/Script/Engine.Actor"',MemberName="ReceiveBeginPlay"

**Make Literal String**
Class: /Script/BlueprintGraph.K2Node_Literal
Pin: PinName="Value", DefaultValue="Your String"

### Example Output
Begin Object Class="/Script/BlueprintGraph.K2Node_Event" Name="K2Node_Event_0"
   NodePosX=-200
   NodePosY=0
   NodeGuid=00000000000000000000000000000001
   CustomProperties Pin (PinId=00000000000000000000000000000002,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",LinkedTo=(K2Node_CallFunction_0 00000000000000000000000000000004,),bHidden=False,)
End Object
Begin Object Class="/Script/BlueprintGraph.K2Node_CallFunction" Name="K2Node_CallFunction_0"
   FunctionReference=(MemberParent=/Script/CoreUObject.Class'"/Script/Engine.KismetSystemLibrary"',MemberName="PrintString")
   NodePosX=200
   NodePosY=0
   NodeGuid=00000000000000000000000000000003
   CustomProperties Pin (PinId=00000000000000000000000000000004,PinName="execute",PinType.PinCategory="exec",LinkedTo=(K2Node_Event_0 00000000000000000000000000000002,),bHidden=False,)
   CustomProperties Pin (PinId=00000000000000000000000000000005,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",bHidden=False,)
   CustomProperties Pin (PinId=00000000000000000000000000000006,PinName="InString",PinType.PinCategory="string",DefaultValue="Hello",bHidden=False,)
End Object
`;

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

    /**
     * Generate Blueprint T3D from prompt
     * @param {string} userPrompt
     * @param {AbortSignal} [signal] Optional abort signal
     * @returns {Promise<string>} T3D text
     */
    async generate(userPrompt, signal) {
        if (!this.config.apiKey) {
            throw new Error("API Key is missing. Please configure it in settings.")
        }

        const baseUrl = this.config.baseUrl || "https://api.openai.com/v1";
        const model = this.config.model || "gpt-4o";
        const temperature = this.config.temperature ?? 0.5;

        try {
            const response = await fetch(`${baseUrl}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.config.apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: temperature,
                    stream: false
                }),
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

class AIPanelElement extends i {

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
        // Array of { role: 'user' | 'assistant', content: string }
        history: { type: Array }
    }

    static styles = i$3`
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
            min-height: 60px;
            max-height: 150px;
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
        this.model = localStorage.getItem("ueb-ai-model") || "";
        this.provider = localStorage.getItem("ueb-ai-provider") || "";
        this.quickModels = [];
        this.settings = {
            baseUrl: "",
            apiKey: "",
            model: "",
            provider: "openai" // Default provider
        };
        this.abortController = null;

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
                // If model/provider are not set from localStorage, or if they are no longer valid,
                // fall back to settings.
                if (!this.model || !this.provider) {
                    this.model = settings.model || "";
                    this.provider = settings.provider || "";
                }
                this.requestUpdate();
            }
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("keydown", this._keydownHandler);
    }

    _setupKeyboardShortcut() {
        this._keydownHandler = (e) => {
            if (e.altKey && e.code === "KeyA") {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === "Escape" && this.visible) {
                this.hide();
            }
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
        if (this.isGenerating || !this.prompt.trim()) return

        const userMsg = this.prompt.trim();
        this.history = [...this.history, { role: 'user', content: userMsg }];
        this.prompt = "";
        this.requestUpdate();

        // Reset textarea height
        const textarea = this.shadowRoot.querySelector('.prompt-input');
        if (textarea) textarea.style.height = 'auto';

        this.isGenerating = true;
        this.statusText = "Thinking...";
        this.statusType = "";
        this.abortController = new AbortController();

        try {
            const context = this._getBlueprintContext() || "Context: No blueprint nodes available.";

            // Construct prompt
            const systemPrompt = `You are a helper for Unreal Engine Blueprints.
${context}
Answer the user's question based on the provided blueprint context if relevant.
Use concise language.`;
            
            let fullPrompt = `${systemPrompt}\n\n`;
            // Append recent history (limited to last few turns to save context)
            const recentHistory = this.history.slice(-6); 
            for (const msg of recentHistory) {
                if (msg === recentHistory[recentHistory.length - 1]) continue 
                fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
            }
            fullPrompt += `User: ${userMsg}\nAssistant:`;

            // Stream response placeholder
            this.history = [...this.history, { role: 'assistant', content: "" }];
            const assistantMsgIndex = this.history.length - 1;
            
            const responseText = await this.llmService.generate(fullPrompt, this.abortController.signal);
            
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

            const t3dText = await this.llmService.generate(promptToSend, this.abortController.signal);
            const nodes = this._injectBlueprint(t3dText);
            
            if (nodes && nodes.length > 0) {
                 setTimeout(() => {
                    LayoutEngine.process(nodes);
                 }, 50);
            }

            // Add success response to history
            this.history = [...this.history, { 
                role: 'assistant', 
                content: `Generated ${nodes?.length || 0} nodes.\n\n\`\`\`\n${t3dText}\n\`\`\`` 
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
                                "Ask questions about your blueprint or UE5." : 
                                "Describe the blueprint logic you want to generate."}
                        </div>
                    ` : this.history.map(msg => x`
                        <div class="message ${msg.role}">
                            ${msg.content}
                        </div>
                    `)}
                </div>

                <div class="input-area">
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
                        placeholder="${this.mode === 'chat' ? 'Ask a question...' : 'Describe functionality...'}"
                        .value=${this.prompt}
                        @input=${this._handlePromptInput}
                        @keydown=${this._handleKeyDown}
                    ></textarea>
                    
                    <div class="action-row">
                        <div class="tabs">
                            <button class="tab ${this.mode === "chat" ? "active" : ""}"
                                    @click=${() => this._handleModeChange("chat")}>Chat</button>
                            <button class="tab ${this.mode === "generate" ? "active" : ""}"
                                    @click=${() => this._handleModeChange("generate")}>Generate</button>
                        </div>

                        <button
                            class="send-btn"
                            ?disabled=${this.isGenerating || !this.prompt.trim()}
                            @click=${this._handleSubmit}
                            title="${this.isGenerating ? 'Stop' : 'Send'}"
                        >
                            ${this.isGenerating ? '■' : '➤'}
                        </button>
                    </div>
                </div>
                
                <div class="status-bar ${this.statusType}">${this.statusText}</div>
            </div>
        `
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

class SettingsElement extends i {

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
    }

    static styles = i$3`
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
        this.apiKey = "";
        this.baseUrl = PROVIDERS.openai.baseUrl;
        this.model = "gpt-4o";
        this.temperature = 0.5;
        this.testStatus = "";
        this.isTesting = false;
        this.availableModels = [];
        this.availableModels = [];
        this.isLoadingModels = false;
        this.modelsCache = {};
        this.quickModels = [];
        this.dragOverIndex = -1;
        this.showModelDropdown = false;
        this.modelFilter = "";
    }

    connectedCallback() {
        super.connectedCallback();
        this._loadSettings();
    }

    _loadSettings() {
        try {
            const saved = localStorage.getItem("ueblueprint-api-settings");
            if (saved) {
                const settings = JSON.parse(saved);
                this.provider = settings.provider ?? "openai";
                this.apiKey = settings.apiKey ?? "";
                this.baseUrl = settings.baseUrl ?? PROVIDERS[this.provider]?.baseUrl ?? "";
                this.model = settings.model ?? "gpt-4o";
                this.temperature = settings.temperature ?? 0.5;
                this.quickModels = settings.quickModels ?? [];
            }
            
            // Load models cache
            const cache = localStorage.getItem("ueblueprint-api-models-cache");
            if (cache) {
                this.modelsCache = JSON.parse(cache);
            }
            
            this._updateAvailableModels();
            
        } catch (e) {
            console.warn("Failed to load API settings:", e);
        }
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
                         // Save immediately if we auto-selected
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
            const settings = {
                provider: this.provider,
                apiKey: this.apiKey,
                baseUrl: this.baseUrl,
                model: this.model,
                temperature: this.temperature,
                quickModels: this.quickModels
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
        this.provider = e.target.value;
        const config = PROVIDERS[this.provider];
        if (config && this.provider !== "custom") {
            this.baseUrl = config.baseUrl;
        }
        this.testStatus = "";
        
        this._updateAvailableModels();
        
        this._saveSettings();
        
        // Auto-fetch if first time (empty cache) and we have an API key
        if ((!this.modelsCache[this.provider] || this.modelsCache[this.provider].length === 0) && this.apiKey) {
            this._fetchModels();
        } else {
             // Reset model logic: if we have models, pick first if current is invalid
             // Just ensure this.model is in the list
             if (this.availableModels.length > 0 && !this.availableModels.includes(this.model)) {
                 this.model = this.availableModels[0];
                 this._saveSettings();
             } else if (this.availableModels.length === 0) {
                 this.model = "";
                 this._saveSettings();
             }
        }
    }

    _handleApiKeyChange(e) {
        this.apiKey = e.target.value;
        this.testStatus = "";
        this._saveSettings();
    }

    _handleBaseUrlChange(e) {
        this.baseUrl = e.target.value;
        this.testStatus = "";
        this._saveSettings();
    }

    _handleModelChange(e) {
        this.model = e.target.value;
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
        this.provider = qm.provider;
        // Restore baseUrl if saved, or from provider config
        if (qm.baseUrl && this.provider === 'custom') {
            this.baseUrl = qm.baseUrl;
        } else {
            this.baseUrl = PROVIDERS[this.provider]?.baseUrl || qm.baseUrl || "";
        }
        
        // Update models list for this provider
        this._updateAvailableModels();
        
        // Set model
        this.model = qm.model;
        
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
