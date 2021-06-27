!function(t){var e={};function n(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(o,s,function(e){return t[e]}.bind(null,s));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e),window.s=function(){};const o=["setTimeout","setInterval","onsearch","onappinstalled","onbeforeinstallprompt","onbeforexrselect","onabort","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncontextmenu","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onformdata","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onseeked","onseeking","onselect","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel","onauxclick","ongotpointercapture","onlostpointercapture","onpointerdown","onpointermove","onpointerup","onpointercancel","onpointerover","onpointerout","onpointerenter","onpointerleave","onselectstart","onselectionchange","onanimationend","onanimationiteration","onanimationstart","ontransitionrun","ontransitionstart","ontransitionend","ontransitioncancel","onafterprint","onbeforeprint","onbeforeunload","onhashchange","onlanguagechange","onmessage","onmessageerror","onoffline","ononline","onpagehide","onpageshow","onpopstate","onrejectionhandled","onstorage","onunhandledrejection","onunload","ondevicemotion","ondeviceorientation","ondeviceorientationabsolute","onpointerrawupdate"],l=window.setTimeout,i=window.setInterval;Object.defineProperty(s,"DETACHED_SET_TIMEOUT",{value:l.bind(window)}),Object.defineProperty(s,"DETACHED_SET_INTERVAL",{value:i.bind(window)}),s._state={},s._destroyFuncArr=[],s._updateMap=new Map;const r=({tagName:t,attrs:e,children:n})=>{let o,s=document.createElement(t);for(let[t,n]of Object.entries(e))"function"==(o=typeof n)?s[t]=n:s.setAttribute(t,n);for(let t of n)"string"==typeof t?s.append(t):s.appendChild(r(t));return s},a=(t,e,n)=>{let o=[];for(let t=0;t<e.length;++t)o.push(c(e[t],n[t]));let s=[],l=0;for(let o of n.slice(e.length))"string"==typeof o?t.childNodes[l]?t.childNodes[l].textContent!==o&&s.push(t=>(t.childNodes[l].textContent=o,t)):s.push(t=>(t.append(o),t)):s.push(t=>("string"==typeof o?t.append(o):t.appendChild(r(o)),t)),l++;return t=>{for(let e=o.length-1;e>=0;--e)o[e](t.childNodes[e]);for(let e of s)e(t);return t}},c=(t,e)=>{if(!e)return 3!==t.nodeType?t=>{t&&t.remove()}:t=>void 0;if("string"==typeof e)return t.textContent&&t.textContent!==e?t=>(t.textContent=e,t):t=>void 0;if(e.attrs.slUseExisting)return t=>t;if(e.attrs.slNoChanges){let n=a(t,t.childNodes,e.children);return t=>(n(t),t)}if(t.tagName!==e.tagName){let n=document.createElement(e.tagName);t.parentNode.replaceChild(n,t)}let n=((t,e)=>{let n,o=[];for(let n of t){let t=e[n.name];t?t.length===n.nodeValue.length&&t===n.nodeValue&&delete e[n.name]:o.push(t=>(t.removeAttribute(n.nodeName),t))}for(let[t,l]of Object.entries(e))"function"==(n=typeof l)?o.push(e=>(e[t]=l,s._changeDetector.changeDetectionStrategy===s.CHANGE_STRATEGY_AUTOMATIC&&E(t,e),e)):o.push(e=>(e.setAttribute(t,l),e));return t=>{for(let e of o)e(t)}})(t.attributes,e.attrs),o=a(t,t.childNodes,e.children);return t=>(n(t),o(t),t)},d=t=>(t.slOnInit&&t.slOnInit(),t=t.view(),r(t)),u=(t,e,n)=>{let o=d(e);return n&&s._updateMap.set(t.id,e),t.replaceWith(o),o.id!==t.id&&console.error('Mounted component root element changed from "'+t.id+'" to "'+o.id+'"'),e.slAfterInit&&(e.slAfterInit(),N()),o};function h(t){return Promise.all(t.map(t=>t.then(t=>({result:t,status:"fulfilled",error:null}),t=>({result:null,error:t,status:"rejected"}))))}function g(t){s._state=t}function p(){return s._state}function m(t){return String(t)}function w(t,{attrs:e={},children:n=[]}={}){return{tagName:t=t.toUpperCase(),attrs:e,children:n}}function T(t,e,n=!0){let o=document.getElementById(t);if(null!==o)return u(o,e,n);console.error('ID "'+t+'" does not exist in DOM.')}let f=window.onpopstate;window.onpopstate=function(t){window.location.hash&&s._router.lastHash!==window.location.hash.substring(1)&&(f&&f(t),v(window.location.href.split("#")[1]))},s._router={segmentArr:[],routeMap:new Map,params:null,lastHash:!1},Object.seal(s._router);const b=()=>{let t=window.location.href.split("#")[1];s._router.segmentArr.splice(0,s._router.segmentArr.length),t&&t.split("/").forEach(t=>{s._router.segmentArr.push(t)})};function y(){return s._router.segmentArr}function C(t,e){s._router.routeMap.set(new RegExp("^"+t.replace(/:[^\/]+/g,"([^\\/]+)")+"$"),e)}function v(t,e={},n=!0){s._router.params=e;let o=null;return s._router.routeMap.forEach((e,l)=>{if(l.test(t)){if(e.authGuard&&!e.authGuard(l))return e.authFail&&(o=v(e.authFail.route,e.authFail.params,"boolean"!=typeof e.authFail.attachDetector||e.authFail.attachDetector)),void(t=void 0);s._destroyFuncArr.forEach(t=>{t()}),s._destroyFuncArr=[],s._router.lastHash=t,window.location.hash=t,b();let i=document.getElementById(e.root);e.component&&(u(i,e.component,n),e.component.slOnDestroy&&s._destroyFuncArr.push(e.component.slOnDestroy),o=e.component)}}),s._changeDetector.changeDetectionStrategy===s.CHANGE_STRATEGY_AUTOMATIC&&N(),o}b(),s.CHANGE_STRATEGY_AUTOMATIC=100,s.CHANGE_STRATEGY_MANUAL=200,s.CHANGE_DETECTOR_DETACHED=!1,s.CHANGE_DETECTOR_ATTACHED=!0,s._changeStrategies=[s.CHANGE_STRATEGY_AUTOMATIC,s.CHANGE_STRATEGY_MANUAL],s._changeDetector={lastUpdateDate:new Date,changeDetectionStrategy:s.CHANGE_STRATEGY_AUTOMATIC},Object.seal(s._changeDetector),Object.freeze(s._changeStrategies);const E=(t,e)=>{if(e[t]){let n=e[t];e[t]=function(){let t=n.apply(this,[].slice.call(arguments));return N(),t}}};const A=()=>{s._updateMap.forEach((t,e)=>{!function(t,e){const n=t;if(!(t=document.getElementById(t)))return void console.warn('Skip update of "'+n+'". ID does not exist in DOM.');let o=e.view.bind(e)();t=c(t,o)(t)}(e,t)})},N=()=>{s._changeDetector.changeDetectionStrategy===s.CHANGE_STRATEGY_AUTOMATIC&&(new Date-s._changeDetector.lastUpdateDate>17?A():s._debouncedPerformUpdates(),s._changeDetector.lastUpdateDate=new Date)};function _(){A()}s._debouncedPerformUpdates=function(t,e){let n;return function(...o){const l=this;clearTimeout(n),n=s.DETACHED_SET_TIMEOUT(()=>t.apply(l,o),e)}}(A,17);let k=window.XMLHttpRequest.prototype.send;function I(){if(this._onreadystatechange){let t=this._onreadystatechange.apply(this,arguments);return N(),t}}window.XMLHttpRequest.prototype.send=function(t){return this.onreadystatechange&&(this._onreadystatechange=this.onreadystatechange),this.onreadystatechange=I,k.apply(this,arguments)};let M=window.fetch;window.fetch=function(){let t=M.apply(this,arguments);return N(),t},(t=>{o.forEach(e=>{E(e,t)})})(window);var D=class{constructor(){}view(){return w("nav",{attrs:{class:"navbar navbar-light bg-light",id:"divNavbar"},children:[w("span",{attrs:{},children:[w("img",{attrs:{src:"images/sling.png",width:"30px",height:"30px",class:"d-inline-block align-top",style:"margin-right:0.5rem;margin-top:0.3125rem;margin-bottom:0.3125rem;"},children:[]}),w("span",{attrs:{class:"navbar-brand"},children:[m("Sling")]}),w("div",{attrs:{style:"display:inline-flex;"},children:[w("ul",{attrs:{class:"navbar-nav"},children:[w("li",{attrs:{class:"nav-item"},children:[m("v6.0.0")]})]})]})]})]})}};var S=class{constructor(t,e){this.text=t,this.completed=e}};const x="cookieNoteData";var R=class{constructor(){}getNoteCookie(){return this.getCookie(x)}setNoteCookie(t){this.setCookie(x,JSON.stringify(t),31)}setCookie(t,e,n){const o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);const s="expires="+o.toUTCString();document.cookie=t+"="+e+";"+s+";path=/"}getCookie(t){const e=t+"=",n=decodeURIComponent(document.cookie).split(";");for(var o=0;o<n.length;o++){for(var s=n[o];" "==s.charAt(0);)s=s.substring(1);if(0==s.indexOf(e))return s.substring(e.length,s.length)}return""}};var O=class{constructor(){this.noteText="",this.inputTarget=null}slOnInit(){console.log("Initializing NoteInputComponent")}updateNoteText(t){this.noteText=t.target.value,this.inputTarget=t.target}getNoteText(){return this.noteText}resetInput(){this.noteText="",this.inputTarget.value=""}addNewNote(){const t=this.getNoteText();if(!t||0===t.length)return;let e=p();e.getNotes().push(new S(t,!1)),e.incrementNoteAddedCount(),g(e),(new R).setNoteCookie(e),this.resetInput()}clearCompletedNotes(){let t,e=p(),n=!1;for(let o=0;o<e.getNotes().length;++o)!0===(t=e.getNotes()[o]).completed&&(e.getNotes().splice(o,1),n=!0,o--);!0===n&&(g(e),(new R).setNoteCookie(e)),document.querySelectorAll("#divTodoList input").forEach(t=>{t.checked=!1,t.removeAttribute("readonly")})}view(){return w("div",{attrs:{class:"input-group",id:"divNoteInput",style:"padding:1rem;"},children:[w("div",{attrs:{style:"display:grid;width:50%;margin:auto;"},children:[w("textarea",{attrs:{id:"noteInputTextArea",class:"form-control","aria-label":"Note textarea",oninput:this.updateNoteText.bind(this)}}),w("br",{}),w("div",{attrs:{style:"justify-self:center;"},children:[w("button",{attrs:{id:"addNoteButton",class:"btn btn-primary",type:"submit",onclick:this.addNewNote.bind(this),style:"width:150px;margin-right:1rem;"},children:[m("Add note")]}),w("button",{attrs:{id:"clearNotesButton",class:"btn btn-primary",type:"submit",onclick:this.clearCompletedNotes.bind(this),style:"width:150px;"},children:[m("Clear completed")]})]})]})]})}};var B=class{constructor(){}updateReadonlyAttribute(t,e){!1===t.completed?document.querySelectorAll("#divTodoList input").forEach((t,n)=>{n===2*e+1&&t.removeAttribute("readonly")}):!0===t.completed&&document.querySelectorAll("#divTodoList input").forEach((t,n)=>{n===2*e+1&&t.setAttribute("readonly",!0)})}completeNote(t){let e=p(),n=0,o=!1;e.getNotes().forEach((e,s)=>{e===t&&(e.completed=!t.completed,o=!0,n=s)}),g(e),(new R).setNoteCookie(e),!0===o&&this.updateReadonlyAttribute(t,n)}updateNote(t,e){let n=p();n.getNotes().forEach(n=>{n===t&&(n.text=e.target.value)}),g(n),(new R).setNoteCookie(n)}view(){return w("div",{attrs:{id:"divTodoList"},children:[w("div",{attrs:{style:"width:50%;margin:auto;padding:1rem;"},children:[...Array.from(p().getNotes(),t=>w("div",{attrs:{class:"input-group mb-3 animEnter",style:"width:100%;"},children:[w("div",{attrs:{class:"input-group-prepend"},children:[w("div",{attrs:{class:"input-group-text"},children:[w("input",{attrs:{type:"checkbox",...t.completed&&{checked:"true"},onchange:this.completeNote.bind(this,t)}})]}),w("img",{attrs:{src:"images/cat-typing.gif",width:"50px",height:"50px"}})]}),w("input",{attrs:{value:t.text,class:"form-control",...t.completed&&{readonly:"true"},oninput:this.updateNote.bind(this,t),style:"margin-left:1px;"}})]}))]})]})}};var H=class{constructor(){}view(){return w("div",{attrs:{id:"divTodoHeader"},children:[w("h4",{attrs:{style:"text-align:center;padding:1rem;font-family:Arial;line-height:58px;font-size:54px;font-weight:300;"},children:[m("Todo App")]})]})}};var F=class{constructor(){}slOnDestroy(){console.log("Destroy completed list component")}applyCheckedProperty(){document.querySelectorAll("#divTodoList input").forEach((t,e)=>{e%2==0&&(t.checked=!0)})}completeNote(t){let e=p();e.getNotes().forEach(e=>{e===t&&(e.completed=!t.completed)}),g(e),(new R).setNoteCookie(e),this.applyCheckedProperty()}view(){return w("div",{attrs:{id:"divTodoList"},children:[w("div",{attrs:{style:"width:50%;margin:auto;padding:1rem;"},children:[...Array.from(p().getNotes().filter(t=>!!t.completed),t=>w("div",{attrs:{class:"input-group mb-3 animEnter",style:"width:100%;"},children:[w("div",{attrs:{class:"input-group-prepend"},children:[w("div",{attrs:{class:"input-group-text"},children:[w("input",{attrs:{type:"checkbox",...t.completed&&{checked:"true"},onchange:this.completeNote.bind(this,t)}})]})]}),w("input",{attrs:{value:t.text,class:"form-control",...t.completed&&{readonly:"true"}}})]}))]})]})}};const U=t=>{const e=["pop","push","reverse","shift","unshift","splice","sort","map","filter","fill","copyWithin"],n=e.slice(0,6),o={},s=[];let l=t,i=0;const r=function(t){0===i?(s.forEach(e=>{e(t)}),i++):i=0};return o.subscribe=function(t){return s.push(t),l=new Proxy(l,{set:function(t,e,n){return"length"===e?(t[e]=n,!0):!1===isNaN(e)?(t[e]=n,r(t),!0):void 0}}),e.forEach((function(t){Object.defineProperty(l,t,{writable:!0,value:function(){let e=l;return n.indexOf(t)>-1?Array.prototype[t].apply(e,arguments):e=Array.prototype[t].apply(e,arguments),r(e),e}})})),this},o.clearSubscription=function(t){const e=s.filter(e=>e!==t);return this.clearSubscriptions(),s.concat(e),this},o.clearSubscriptions=function(){return s.splice(0,s.length),this},o.getData=function(){return l},o};var L=class{constructor(){this.routeString=""}slOnInit(){this.performRouteAction(y()[0]),U(y()).subscribe(function(t){t.length>0?this.routeString=t[0]:this.routeString=""}.bind(this))}routeToAll(){v("all")}routeToCompleted(){v("completed")}performRouteAction(t){switch(this.routeString=t,t){case"all":this.routeToAll();break;case"completed":this.routeToCompleted();break;default:this.routeString="all",this.routeToAll()}}completeNote(t){let e=p();e.getNotes().forEach(e=>{e===t&&(e.completed=!t.completed)}),setState(e),(new R).setNoteCookie(e)}view(){return w("ul",{attrs:{class:"nav",style:"width:50%;margin:auto;",id:"divNoteNav"},children:[w("li",{attrs:{class:"nav-item"},children:[w("a",{attrs:{..."all"!==this.routeString&&{class:"nav-link"},..."all"===this.routeString&&{class:"nav-link textBold"},onclick:this.performRouteAction.bind(this,"all"),style:"cursor:pointer;"},children:[m("All")]})]}),w("li",{attrs:{class:"nav-item"},children:[w("a",{attrs:{..."completed"!==this.routeString&&{class:"nav-link"},..."completed"===this.routeString&&{class:"nav-link textBold"},onclick:this.performRouteAction.bind(this,"completed"),style:"cursor:pointer;"},children:[m("Completed")]})]})]})}};var P=class{constructor(){this.notes=[],this.noteAddedCount=0}getNotes(){return this.notes}setNotes(t){this.notes=t}addNotes(t){t.notes.forEach(t=>{this.notes.push(t)})}getNoteAddedCount(){return this.noteAddedCount}incrementNoteAddedCount(){this.noteAddedCount++}};class z{view(){return w("div",{attrs:{id:"testcomponent1",style:"width: 100%;"},children:[m("Hello,"),w("span",{attrs:{style:"color: blue;"},children:[m(" (nested <span>) ")]}),m(" world!")]})}}class G{constructor(){this.counter=0}slAfterInit(){this.counter++}view(){return w("div",{attrs:{id:"testcomponent2",style:"width: 100%;color: gray;"},children:[m("Hello,"),m(" world! Count: "),m(this.counter)]})}}class j{constructor(){this.count=0}view(){const t=p();let e=t.count?String(t.count):String(this.count);return null!==t.count&&void 0!==t.count&&t.count++,g(t),w("div",{attrs:{id:"testfetchcomponent",style:"color: Coral;"},children:[m("Count: "),m(e)]})}}class V{slOnDestroy(){const t=p();t.onDestroyHookCalled=!0,g(t)}view(){return w("div",{attrs:{id:"testdestroyhookcomponent",style:"color: red;"},children:[m("Should be removed.")]})}}class q{view(){return w("div",{attrs:{id:"testdestroyhookcomponent",style:"color: CornflowerBlue;"},children:[m("Displays after removal.")]})}}class W{view(){return w("div",{attrs:{id:"testremountcomponent1"},children:[m("To be remounted.")]})}}class Y{constructor(){this.inputMode=!1}toggleInputMode(){this.inputMode=!this.inputMode}view(){return w("div",{attrs:{id:"testtagcomponent1"},children:[w("button",{attrs:{onclick:this.toggleInputMode.bind(this),id:"toggleModeButton"},children:[m("Toggle")]}),w("table",{children:[w("tr",{attrs:{id:"testTagRow1"},children:[...!1===this.inputMode?[w("td",{children:[m("Mode: "),m(String(this.inputMode))]})]:[],...!0===this.inputMode?[w("input",{attrs:{value:String(this.inputMode)},children:[]})]:[]]})]})]})}}class J{view(){return w("div",{attrs:{id:"authcomponent",style:"color: blue;"},children:[m("Authentication guard returned false.")]})}}class X{view(){return w("div",{attrs:{id:"routeparamscomponent",style:"color: SteelBlue;"},children:[m("Test route params.")]})}}class ${constructor(){}view(){return w("div",{attrs:{id:"authcomponent",style:"color: DarkSeaGreen;"},children:[m("Authentication guard returned true.")]})}}class K{constructor(){this.inputMode=!1,this.fakeChildArray=[0,1]}toggleInputMode(){this.inputMode=!this.inputMode,this.inputMode?this.fakeChildArray=[0]:this.fakeChildArray=[0,1]}view(){return w("div",{attrs:{id:"testtagcomponent2"},children:[w("button",{attrs:{onclick:this.toggleInputMode.bind(this),id:"toggleModeButton2"},children:[m("Toggle")]}),w("table",{children:[w("tr",{attrs:{id:"testTagRow2"},children:[...Array.from(this.fakeChildArray,t=>w("div",{children:[...!1===this.inputMode?[w("td",{children:[m("Mode: "),m(String(this.inputMode))]})]:[],...!0===this.inputMode?[w("input",{attrs:{value:String(this.inputMode)},children:[]})]:[]]}))]})]})]})}}class Q{constructor(){this.fakeChildArray=[0,1,0]}toggleInputMode(){3===this.fakeChildArray.length?this.fakeChildArray=[0]:this.fakeChildArray=[0,1,0]}toggleEditingMode(){3===this.fakeChildArray.length&&1===this.fakeChildArray[1]?this.fakeChildArray=[0,0,0]:this.fakeChildArray=[0,1,0]}view(){const t=p();return null!==t.count2&&void 0!==t.count2&&t.count2++,g(t),w("div",{attrs:{id:"testtagcomponent3"},children:[w("button",{attrs:{onclick:this.toggleInputMode.bind(this),id:"toggleModeButton3"},children:[m("Toggle")]}),w("table",{children:[w("tr",{attrs:{id:"testTagRow3"},children:[...Array.from(this.fakeChildArray,t=>w("div",{children:[...1===t?[w("button",{attrs:{onclick:this.toggleEditingMode.bind(this),id:"toggleModeButton4"},children:[m("Toggle")]})]:[],...0===t?[w("td",{children:[m("Mode: "),m(String(t))]})]:[],...1===t?[w("input",{attrs:{value:String(t)},children:[]})]:[]]}))]})]})]})}}class Z{constructor(){this.fakeChildArray=[0,1,0]}toggleInputMode(){3===this.fakeChildArray.length?this.fakeChildArray=[0]:this.fakeChildArray=[0,1,0]}toggleEditingMode(){3===this.fakeChildArray.length&&1===this.fakeChildArray[1]?this.fakeChildArray=[0,0,0]:this.fakeChildArray=[0,1,0]}view(){const t=p();return null!==t.count3&&void 0!==t.count3&&t.count3++,g(t),w("div",{attrs:{id:"testtagcomponent4"},children:[w("button",{attrs:{onclick:this.toggleInputMode.bind(this),id:"toggleModeButton5"},children:[m("Toggle")]}),w("table",{children:[w("tr",{attrs:{id:"testTagRow4"},children:[...Array.from(this.fakeChildArray,t=>w("div",{children:[...1===t?[w("button",{attrs:{onclick:this.toggleEditingMode.bind(this),id:"toggleModeButton6"},children:[m("Toggle")]})]:[],...0===t?[w("td",{children:[m("Mode: "),m(String(t)),w("span",{children:[m(" <span>")]})]})]:[],...1===t?[w("input",{attrs:{value:String(t)},children:[]})]:[]]}))]})]})]})}}var tt=class{constructor(){this.someClassMember=123}testSlingExists(){const t={test:"test sling exists",success:!1,message:""};null!==window.s&&void 0!==window.s&&(t.success=!0,t.message="basic sling object exists on window"),window.globalTestResults.push(t),window.globalTestCount++}testDetachedTimeoutExists(){const t={test:"test detached timeout exists",success:!1,message:""};null!==s.DETACHED_SET_TIMEOUT&&void 0!==s.DETACHED_SET_TIMEOUT&&(t.success=!0),window.globalTestResults.push(t),window.globalTestCount++}testDetachedTimeout(){const t={test:"test detached timeout functions as expected",success:!1,message:""};if(null!==s.DETACHED_SET_TIMEOUT&&void 0!==s.DETACHED_SET_TIMEOUT){let e=null;window.globalAsyncCount++,setTimeout(()=>{window.globalAsyncCount--;const t=document.getElementById("fakeEle1");e=null!=t},25),s.DETACHED_SET_TIMEOUT(()=>{const t=document.createElement("div");t.id="fakeEle1",document.body.appendChild(t)},50),window.globalAsyncCount++,setTimeout(()=>{window.globalAsyncCount--;const n=document.getElementById("fakeEle1");!1===e&&!0===(null!=n)&&(t.success=!0),window.globalTestCount++},100)}window.globalTestResults.push(t)}testDetachedSetInterval(){const t={test:"test detached interval exists",success:!1,message:""};null!==s.DETACHED_SET_INTERVAL&&void 0!==s.DETACHED_SET_INTERVAL&&(t.success=!0),window.globalTestResults.push(t),window.globalTestCount++}testFinalize95RebindDetection(){const t={test:"test rebinding change detection to bound functions",success:!1,message:""};let e=0;const n=s.DETACHED_SET_INTERVAL(()=>{if(0===window.globalAsyncCount){window.globalAsyncCount++,clearInterval(n);let e=p();e.count2=0,g(e),T("testtagcomponent3",new Q);const o=document.getElementById("toggleModeButton4");o.click(),s.DETACHED_SET_TIMEOUT(()=>{o.click(),s.DETACHED_SET_TIMEOUT(()=>{const n=(e=p()).count2&&3===e.count2,l=document.getElementById("toggleModeButton3");l.click(),s.DETACHED_SET_TIMEOUT(()=>{const i=document.getElementById("testTagRow3"),r=i&&1===i.children.length&&1===i.children[0].childNodes.length;l.click(),s.DETACHED_SET_TIMEOUT(()=>{const l=i&&3===i.children.length;o.click(),s.DETACHED_SET_TIMEOUT(()=>{const o=e.count2&&6===e.count2;t.success=n&&r&&l&&o,window.globalTestResults.push(t),window.globalTestCount++,window.globalAsyncCount--},100)},100)},100)},100)},100)}10===++e&&(window.globalTestResults.push(t),window.globalTestCount++,window.globalAsyncCount--,clearInterval(n))},500)}testFinalize99RebindDetectionWithNonNodeType3(){const t={test:"test rebinding change detection to bound functions where components have markup",success:!1,message:""};let e=0;const n=s.DETACHED_SET_INTERVAL(()=>{if(0===window.globalAsyncCount){clearInterval(n);let e=p();e.count3=0,g(e),T("testtagcomponent4",new Z);const o=document.getElementById("toggleModeButton6");o.click(),s.DETACHED_SET_TIMEOUT(()=>{o.click(),s.DETACHED_SET_TIMEOUT(()=>{const n=(e=p()).count3&&3===e.count3,l=document.getElementById("toggleModeButton5");l.click(),s.DETACHED_SET_TIMEOUT(()=>{const i=document.getElementById("testTagRow4"),r=i&&1===i.children.length&&1===i.children[0].childNodes.length;l.click(),s.DETACHED_SET_TIMEOUT(()=>{const l=i&&3===i.children.length;o.click(),s.DETACHED_SET_TIMEOUT(()=>{const o=e.count3&&6===e.count3;t.success=n&&r&&l&&o,window.globalTestResults.push(t),window.globalTestCount++},100)},100)},100)},100)},100)}10===++e&&(window.globalTestResults.push(t),window.globalTestCount++,clearInterval(n))},500)}testDetachedInterval(){const t={test:"test detached interval functions as expected",success:!1,message:""};if(null!==s.DETACHED_SET_INTERVAL&&void 0!==s.DETACHED_SET_INTERVAL){let e=null,n=0;window.globalAsyncCount++,setTimeout(()=>{window.globalAsyncCount--;const t=document.getElementsByClassName("fakeclass1");e=0!==t.length},25);const o=s.DETACHED_SET_INTERVAL(()=>{const t=document.createElement("div");t.classList.add("fakeclass1"),document.body.appendChild(t),2===++n&&clearInterval(o)},80);window.globalAsyncCount++,setTimeout(()=>{window.globalAsyncCount--;const n=2===document.getElementsByClassName("fakeclass1").length;!1===e&&!0===n&&(t.success=!0),window.globalTestCount++},300)}window.globalTestResults.push(t)}testPriority10BoundAddNoteFunctionNotCalledNeedlessly(){const t={test:"test bound add note function not called needlessly",success:!1,message:""},e=p().getNoteAddedCount();t.success=0===e,window.globalTestResults.push(t),window.globalTestCount++}addNoteManually(){const t=document.getElementById("noteInputTextArea");t.value="test";const e={bubbles:!0,cancelBubble:!1,cancelable:!1,composed:!0,currentTarget:null,data:"h",dataTransfer:null,defaultPrevented:!1,detail:0,eventPhase:2,inputType:"insertText",isComposing:!1,isTrusted:!0,path:[],sourceCapabilities:null,srcElement:null,target:t,timeStamp:87124.19999999925,type:"input",view:null,which:0};t.oninput(e),document.getElementById("addNoteButton").click(),_()}testAddNoteButton(){const t={test:"test add note button function runs once",success:!1,message:""},e=p(),n=e.getNoteAddedCount();this.addNoteManually(),t.success=e.getNoteAddedCount()-1===n&&n>=0,window.globalTestResults.push(t),window.globalTestCount++}testAddNoteButtonRendering(){const t={test:"test add note button rendering is performed successfully",success:!1,message:""};v("all");let e=document.querySelectorAll(".input-group-text input");const n=e.length;this.addNoteManually(),e=document.querySelectorAll(".input-group-text input"),t.success=n+1===e.length,window.globalTestResults.push(t),window.globalTestCount++}testUpdateMapDefined(){const t={test:"test update map defined",success:!1,message:""};null!==s&&void 0!==s&&null!==s._updateMap&&void 0!==s._updateMap&&(t.success=!0),window.globalTestResults.push(t),window.globalTestCount++}testUpdateMapCorrectCount(){const t={test:"test update map has correct count",success:!1,message:""};s&&s._updateMap&&5===s._updateMap.size&&(t.success=!0),window.globalTestResults.push(t),window.globalTestCount++}testPriority20MarkTwoAsCompleteAndRoute(){const t={test:"test manually marking notes and routing to completed route",success:!1,message:""};v("all");let e=document.querySelectorAll(".input-group-text input");if(e){for(;e.length<3;)this.addNoteManually(),e=document.querySelectorAll(".input-group-text input");const n=p().getNotes();n&&(n.forEach(t=>{t.completed=!1}),n.length>2&&(n[0].completed=!0,n[1].completed=!0),p().setNotes(n),_()),v("completed"),e=document.querySelectorAll(".input-group-text input"),t.success=2===e.length}window.globalTestResults.push(t),window.globalTestCount++}block(t=18){return new Promise(e=>{setTimeout(()=>{e(!0)},t)})}testFinalize10ClearCompletedAndVerifyRendering(){const t={test:"test clearing completed notes and verify rendering",success:!1,message:""};v("all");let e=document.querySelectorAll(".input-group-text input");if(e){for(;e.length<3;)this.addNoteManually(),e=document.querySelectorAll(".input-group-text input");const n=p().getNotes();n&&(n.forEach(t=>{t.completed=!1}),n.length>2&&(n[0].completed=!0,n[1].completed=!0),p().setNotes(n),_());const o=(e=document.querySelectorAll(".input-group-text input")).length;document.getElementById("clearNotesButton").click(),window.globalAsyncCount++,setTimeout(()=>{window.globalAsyncCount--,e=document.querySelectorAll(".input-group-text input"),t.success=o-2===e.length,window.globalTestResults.push(t),window.globalTestCount++},1)}}testCorrectNumberOfInputElements(){const t={test:"test correct number of input elements rendered",success:!1,message:""};v("all");const e=document.querySelectorAll(".input-group input"),n=p().getNotes().length;t.success=2*n===e.length,window.globalTestResults.push(t),window.globalTestCount++}testFinalize10ChangeDetectionOnTextWithHook(){const t={test:"test mounting component with lifecycle hook and calling change detection",success:!1,message:""};T("testcomponent2",new G),window.globalAsyncCount++,setTimeout(()=>{window.globalAsyncCount--;let e=document.getElementById("testcomponent2");const n="Hello, world! Count: 1"===e.textContent;_();const o="Hello, world! Count: 1"===(e=document.getElementById("testcomponent2")).textContent;_();const s="Hello, world! Count: 1"===(e=document.getElementById("testcomponent2")).textContent;_();const l="Hello, world! Count: 1"===(e=document.getElementById("testcomponent2")).textContent;t.success=n&&o&&s&&l,window.globalTestResults.push(t),window.globalTestCount++},1)}testFinalize80ChangeTag(){const t={test:"test changing the tag of a node",success:!1,message:""};T("testtagcomponent1",new Y);let e=document.getElementById("testTagRow1"),n=e?e.children:[],o=n.length>0&&"TD"===n[0].tagName,s=n.length>0&&n[0].childNodes.length>0&&"Mode: false"===n[0].textContent;document.getElementById("toggleModeButton").click(),_();let l=(n=(e=document.getElementById("testTagRow1"))?e.children:[]).length>0&&"INPUT"===n[0].tagName&&0===n[0].childNodes.length,i=n.length>0&&"true"===n[0].value;t.success=o&&s&&l&&i,window.globalTestResults.push(t),window.globalTestCount++}testFinalize30DestroyHookCalled(){const t={test:"test destroy hook called on route change",success:!1,message:""};C("destroycomp",{component:new V,root:"testdestroyhookcomponent"}),C("afterdestroy",{component:new q,root:"testdestroyhookcomponent"}),v("destroycomp"),v("afterdestroy");const e=p();t.success=e&&e.onDestroyHookCalled,window.globalTestResults.push(t),window.globalTestCount++}testFinalize90FetchTriggersChangeDetection(){const t={test:"test fetch triggers change detection",success:!1,message:""},e=p();e.count=0,g(e);let n=0;const o=s.DETACHED_SET_INTERVAL(()=>{if(0===window.globalAsyncCount){window.globalAsyncCount++,T("testfetchcomponent",new j),h([fetch("todo.html")]).then(e=>{const n=e.filter(t=>"fulfilled"===t.status),s=n&&1===n.length,l=document.getElementById("testfetchcomponent"),i=p(),r="Count: 1"===l.textContent,a=i&&2===i.count;t.success=s&&r&&a,window.globalTestResults.push(t),window.globalTestCount++,clearInterval(o),window.globalAsyncCount--})}10===++n&&(window.globalTestResults.push(t),window.globalTestCount++,clearInterval(o),window.globalAsyncCount--)},500)}testResolveAll(){const t={test:"test resolve all promises",success:!1,message:""};h([fetch("todo.html"),fetch("http://does-not-exist")]).then(e=>{const n=e.filter(t=>"fulfilled"===t.status);t.success=n&&1===n.length,window.globalTestResults.push(t),window.globalTestCount++})}testFinalize10RouteParams(){const t={test:"test route params are set correctly",success:!1,message:""};C("foobarbaz",{component:new X,root:"routeparamscomponent"}),v("foobarbaz",{a:1,b:!0,c:"abc",d:3.14,e:()=>{console.log("hello")}});const e=s._router.params,n=e.a&&1===e.a,o=e.b&&!0===e.b,l=e.c&&"abc"===e.c,i=e.d&&3.14===e.d,r=e.e&&"()=>{console.log('hello');}"===e.e.toString().replace(/\s+/g,"");t.success=n&&o&&l&&i&&r,window.globalTestResults.push(t),window.globalTestCount++}testFinalize10AuthenticationGuard(){const t={test:"test authentication guard failure routing",success:!1,message:""};C("dashboard",{component:new $,root:"authcomponent",authGuard:()=>!1,authFail:{route:"noauth"}}),C("noauth",{component:new J,root:"authcomponent"}),v("dashboard");let e=document.getElementById("authcomponent");const n=e&&"Authentication guard returned false."===e.textContent;t.success=n,window.globalTestResults.push(t),window.globalTestCount++}testFinalize80ChangeTagAndRemoveNode(){const t={test:"test changing the tag of a node and test removal of a node",success:!1,message:""};T("testtagcomponent2",new K);let e=document.getElementById("testTagRow2"),n=e?e.children:[],o=n.length>0&&"DIV"===n[0].tagName,s=n.length>0&&1===n[0].children.length,l=n.length>1&&1===n[1].children.length,i=!1,r=!1;s&&(i="TD"===n[0].children[0].tagName&&"Mode: false"===n[0].children[0].textContent),l&&(r="TD"===n[1].children[0].tagName&&"Mode: false"===n[1].children[0].textContent),document.getElementById("toggleModeButton2").click(),_();let a=(n=(e=document.getElementById("testTagRow2"))?e.children:[]).length>0&&"DIV"===n[0].tagName,c=1===n.length&&1===n[0].children.length&&"INPUT"===n[0].children[0].tagName,d=1===n.length&&1===n[0].children.length&&"true"===n[0].children[0].value,u=1===n.length&&1===n[0].children.length&&0===n[0].children[0].childNodes.length;t.success=o&&i&&r&&a&&c&&d&&u,window.globalTestResults.push(t),window.globalTestCount++}testFinalize10RemountComponent(){const t={test:"test remounting a component",success:!1,message:""};T("testremountcomponent1",new W),_(),T("testremountcomponent1",new W);const e=document.getElementById("testremountcomponent1");t.success="To be remounted."===e.textContent,window.globalTestResults.push(t),window.globalTestCount++}testSetAndGetState(){const t={test:"test set and get state functions",success:!1,message:""},e={a:1,b:"abc",c:!1,d:()=>console.log("hello"),e:3.14},n=p();g(e);const o=p(),s=o.a&&1===o.a,l=o.b&&"abc"===o.b,i=null!==o.c&&void 0!==o.c&&!1===o.c,r=o.d&&"() => console.log('hello')"===o.d.toString(),a=o.e&&3.14===o.e;t.success=s&&l&&i&&r&&a,g(n),window.globalTestResults.push(t),window.globalTestCount++}testMarkupFunction(){const t={test:"test markup function",success:!1,message:""},e=w("div",{attrs:{style:"width: 100%",id:"someId",class:"someclass",oninput:this.someFunctionToBind.bind(this)},children:[]}),n="DIV"===e.tagName,o=null!==e.attrs&&void 0!==e.attrs;o||(e.attrs={});const s=e.attrs.style&&"width: 100%"===e.attrs.style,l=e.attrs.id&&"someId"===e.attrs.id,i=e.attrs.class&&"someclass"===e.attrs.class,r=null!==e.attrs.oninput&&void 0!==e.attrs.oninput;let a=!1;if(r){const t=e.attrs.oninput();a=t&&t.test&&"test"===t.test}t.success=n&&o&&s&&l&&i&&r&&a,window.globalTestResults.push(t),window.globalTestCount++}testMarkupFunction(){const t={test:"test terse markup function",success:!1,message:""},e=function(){return w(arguments[0],arguments[1])}("div",{attrs:{style:"width: 100%",id:"someId",class:"someclass",oninput:this.someFunctionToBind.bind(this)},children:[]}),n="DIV"===e.tagName,o=null!==e.attrs&&void 0!==e.attrs;o||(e.attrs={});const s=e.attrs.style&&"width: 100%"===e.attrs.style,l=e.attrs.id&&"someId"===e.attrs.id,i=e.attrs.class&&"someclass"===e.attrs.class,r=null!==e.attrs.oninput&&void 0!==e.attrs.oninput;let a=!1;if(r){const t=e.attrs.oninput();a=t&&t.test&&"test"===t.test}t.success=n&&o&&s&&l&&i&&r&&a,window.globalTestResults.push(t),window.globalTestCount++}testMarkupFunctionWithBoundFunction(){const t={test:"test markup function with bound function",success:!1,message:""},e=w("div",{attrs:{style:"width: 100%",id:"someId",class:"someclass",oninput:this.someFunctionToBindWithThis.bind(this)},children:[]}),n="DIV"===e.tagName,o=null!==e.attrs&&void 0!==e.attrs;o||(e.attrs={});const s=e.attrs.style&&"width: 100%"===e.attrs.style,l=e.attrs.id&&"someId"===e.attrs.id,i=e.attrs.class&&"someclass"===e.attrs.class,r=null!==e.attrs.oninput&&void 0!==e.attrs.oninput;let a=!1;if(r){const t=e.attrs.oninput();a=t&&t.test&&t.test===this.someClassMember}t.success=n&&o&&s&&l&&i&&r&&a,window.globalTestResults.push(t),window.globalTestCount++}testMarkupFunctionWithChildren(){const t={test:"test markup function with children",success:!1,message:""},e=w("div",{attrs:{style:"width: 100%",id:"someId",class:"someclass",oninput:this.someFunctionToBind.bind(this)},children:[w("span",{attrs:{style:"height: 20px;"},children:[]})]}),n="DIV"===e.tagName,o=null!==e.attrs&&void 0!==e.attrs;o||(e.attrs={});const s=e.attrs.style&&"width: 100%"===e.attrs.style,l=e.attrs.id&&"someId"===e.attrs.id,i=e.attrs.class&&"someclass"===e.attrs.class,r=null!==e.attrs.oninput&&void 0!==e.attrs.oninput;let a=!1;if(r){const t=e.attrs.oninput();a=t&&t.test&&"test"===t.test}const c=e.children&&1===e.children.length,d=e.children&&"SPAN"===e.children[0].tagName,u=e.children&&e.children[0].attrs.style&&"height: 20px;"===e.children[0].attrs.style,h=e.children&&0===e.children[0].children.length;t.success=n&&o&&s&&l&&i&&r&&a&&c&&d&&u&&h,window.globalTestResults.push(t),window.globalTestCount++}testFinalize10InnerTextAppendsDomString(){const t={test:"test inner text function works correctly",success:!1,message:""};T("testcomponent1",new z),_();const e=document.getElementById("testcomponent1");t.success="Hello, (nested <span>) world!"===e.innerText,window.globalTestResults.push(t),window.globalTestCount++}testMountWithChangeDetectorDetached(){const t={test:"test mount with change detector detached",success:!1,message:""};if(s){const e=s._updateMap?s._updateMap.length:0;T("testcomponent1",new z,!1),_(),t.success=s._updateMap&&s._updateMap.length===e}window.globalTestResults.push(t),window.globalTestCount++}dummyTest(){window.globalTestResults.push({test:"test ",success:!1,message:""}),window.globalTestCount++}someFunctionToBind(){return{test:"test",success:!1,message:""}}someFunctionToBindWithThis(){return{test:this.someClassMember,success:!1,message:""}}init(){window.globalTestResults=[],window.globalTestCount=0,window.globalAsyncCount=0;const t=document.createElement("button");t.innerText="Run Tests",t.id="runtestsbutton",document.body.appendChild(t),t.onclick=this.run.bind(this)}createResultList(t){const e=document.createElement("ul");window.globalTestResults.sort((t,e)=>!1===t.success?-1:1),window.globalTestResults.forEach(t=>{const n=document.createElement("li");let o="";!1===t.success?o+="<span><strong>"+String(t.success)+"</strong></span><span> - "+t.test+"</span>":o+="<span>"+String(t.success)+"</span><span> - "+t.test+"</span>",null!==t.message&&void 0!==t.message&&t.message.length>0&&(o+="<br><span>"+t.message+"</span>"),n.innerHTML=o,e.appendChild(n)});const n=document.createElement("p");n.innerHTML="<span>Elapsed time: "+t+"</span><br>";const o=window.globalTestResults.filter(t=>!0===t.success).length;n.innerHTML+="<span><strong>Tests passing: "+o+"/"+window.globalTestResults.length+"</strong></span><br>",n.innerHTML+="<span><strong>Tests failing: "+(window.globalTestResults.length-o)+"/"+window.globalTestResults.length+"</strong></span>",o===window.globalTestResults.length?n.innerHTML+='<br><span style="color: green;">All tests passed.</span>':n.innerHTML+='<br><span style="color: red;">There are failing tests.</span>',document.body.appendChild(n),document.body.appendChild(e)}showError(){const t=document.createElement("div");t.innerText="Failed to run tests.",document.body.appendChild(t)}showProcessing(){const t=document.createElement("div");t.innerText="Processing...",t.id="runningtestsdiv",document.body.appendChild(t)}removeProcessing(){document.getElementById("runningtestsdiv").outerHTML=""}getAllFuncs(t){const e=[];let n=t;do{e.push(...Object.getOwnPropertyNames(n))}while(n=Object.getPrototypeOf(n));return e.sort().filter((e,n,o)=>{if(e!=o[n+1]&&"function"==typeof t[e])return!0})}removeRunTestsButton(){document.getElementById("runtestsbutton").outerHTML=""}run(){this.showProcessing(),this.getAllFuncs(this).filter(t=>t&&t.startsWith("test")).filter(t=>t&&"dummyTest"!==t).sort((t,e)=>{if(t&&t.toLowerCase().includes("finalize")){if(e&&e.toLowerCase().includes("finalize")){return t.substring(t.indexOf("finalize")+8,t.indexOf("finalize")+10)>e.substring(e.indexOf("finalize")+8,e.indexOf("finalize")+10)}return 1}if(e&&e.toLowerCase().includes("finalize"))return-1;if(t&&t.toLowerCase().includes("priority")){if(e&&e.toLowerCase().includes("priority")){return t.substring(t.indexOf("priority")+8,t.indexOf("priority")+10)>e.substring(e.indexOf("priority")+8,e.indexOf("priority")+10)}return-1}return 1}).forEach(t=>{this[t]()});const t=this.getAllFuncs(this).filter(t=>t&&t.startsWith("test")).filter(t=>t&&"dummyTest"!==t).length;let e=0,n=new Date;const o=setInterval(()=>{window.globalTestCount===t&&(this.removeProcessing(),this.createResultList(new Date-n),clearInterval(o),this.removeRunTestsButton()),100===++e&&(this.removeProcessing(),this.showError(),clearInterval(o),this.removeRunTestsButton())},100)}};let et=(new R).getNoteCookie(),nt=new P;et.length>0&&nt.addNotes(JSON.parse(et)),g(nt),C("all",{component:new B,root:"divTodoList"}),C("completed",{component:new F,root:"divTodoList"}),T("divNavbar",new D),T("divNoteInput",new O),T("divNoteNav",new L),T("divTodoHeader",new H),(new tt).init()}]);