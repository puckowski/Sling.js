!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);let o=!1;if(!window.s){o=!0,window.s=function(){},s.VERSION="3.1.3";const t=window.setTimeout,e=window.setInterval;s.detachedSetTimeout=t.bind(window),s.detachedSetInterval=e.bind(window),s._state={},s._destroyFuncArr=[],s._updateMap=new Map}const r=({tagName:t,attrs:e,children:n})=>{let o,r=document.createElement(t);for(let[t,n]of Object.entries(e))"function"===(o=typeof n)?r[t]=n:r.setAttribute(t,n);for(let t of n){let e=l(t);r.appendChild(e)}return r},i=(t,e)=>{let n=[];(t=Array.from(t)).forEach((t,o)=>{n.push(a(t,e[o]))});let o=[];for(let n of e.slice(t.length))"string"==typeof n?o.push(t=>(t.textContent!==n&&(t.textContent=n),t)):o.push(t=>(t.appendChild(l(n)),t));return t=>{for(let[e,o]of((t,e)=>{let n=[];for(let o=0;o<Math.max(t.length,e.length);++o)n.push([t[o],e[o]]);return n})(n,t.childNodes))e&&e(o);for(let e of o)e(t);return s._cdr&&s._changeDetector.changeDetectionStrategy===s.CHANGE_STRATEGY_AUTOMATIC&&s._proxyAllEvents(t),t}},a=(t,e)=>{if(!e)return t=>{t.remove()};if("string"==typeof t||"string"==typeof e)return t!==e?t=>{let n=l(e);return t.replaceWith(n),n}:t=>void 0;if(e.attrs.slUseExisting)return t=>t;let n=((t,e)=>{let n,o=[];for(let n of t)e[n.name]||o.push(t=>(t.setAttribute(n.name,n.value),t));for(let[t,r]of Object.entries(e))"function"===(n=typeof r)?o.push(e=>(e[t]=r,e)):o.push(e=>(e.setAttribute(t,r),e));for(let n of t)n in e||o.push(t=>(t.removeAttribute(n),t));return t=>{for(let e of o)e(t)}})(t.attributes,e.attrs),o=i(t.children,e.children);return t=>(n(t),o(t),t)},l=t=>{if("string"==typeof t){const e=document.createElement("SPAN");return e.innerText=t,e}return r(t)},c=(t,e,n)=>{let o=t.id,i=(t=>{if(t.slOnInit&&t.slOnInit(),"string"==typeof(t=t.view())){const e=document.createElement("SPAN");return e.innerText=t,e}return r(t)})(e);if(n&&s._updateMap.set(t.id,e),t.replaceWith(i),t.id!==o&&(console.warn('Mounted component root element ID set to: "'+o+'"'),t.id=o),e.slAfterInit){let t=setInterval(()=>{e.slAfterInit(),s._performChangeDetection(),clearInterval(t)},0)}return i};function u(t){s._state=t}function d(){return s._state}function p(t){return String(t)}function h(t,{attrs:e={},children:n=[]}={}){return{tagName:t=t.toUpperCase(),attrs:e,children:n}}function g(t,e,n=!0){let o=t,r=document.getElementById(t);if(null!==r)return c(r,e,n);throw"Element ID '"+o+"' is invalid."}if(o&&(s._mountInternal=c),o&&(s._update=function(t,e){t=document.getElementById(t);let n=e.view.bind(e)();t=a(t,n)(t)}),o){let t=window.onpopstate;window.onpopstate=function(e){t&&t(e),s._route(s._getRoute())}}var f=class{constructor(){}view(){return h("nav",{attrs:{class:"navbar navbar-light bg-light",id:"divNavbar"},children:[h("span",{attrs:{},children:[h("img",{attrs:{src:"images/sling.png",width:"30px",height:"30px",class:"d-inline-block align-top",style:"margin-right:0.5rem;margin-top:0.3125rem;margin-bottom:0.3125rem;"},children:[]}),h("span",{attrs:{class:"navbar-brand"},children:[p("Sling")]}),h("div",{attrs:{style:"display:inline-flex;"},children:[h("ul",{attrs:{class:"navbar-nav"},children:[h("li",{attrs:{class:"nav-item"},children:[p("v"+s.VERSION)]})]})]})]})]})}};var m=class{constructor(t,e){this.text=t,this.completed=e}};const y="cookieNoteData";var v=class{constructor(){}getNoteCookie(){return this.getCookie(y)}setNoteCookie(t){this.setCookie(y,JSON.stringify(t),31)}setCookie(t,e,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var r="expires="+o.toUTCString();document.cookie=t+"="+e+";"+r+";path=/"}getCookie(t){for(var e=t+"=",n=decodeURIComponent(document.cookie).split(";"),o=0;o<n.length;o++){for(var r=n[o];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(e))return r.substring(e.length,r.length)}return""}};var w=class{constructor(){this.noteText="",this.inputTarget=null}slOnInit(){console.log("Initializing NoteInputComponent")}updateNoteText(t){this.noteText=t.target.value,this.inputTarget=t.target}getNoteText(){return this.noteText}resetInput(){this.noteText="",this.inputTarget.value=""}addNewNote(){const t=this.getNoteText();if(!t||0===t.length)return;let e=d();e.getNotes().push(new m(t,!1)),u(e),(new v).setNoteCookie(e),this.resetInput()}clearCompletedNotes(){let t,e=d(),n=!1;for(let o=0;o<e.getNotes().length;++o)!0===(t=e.getNotes()[o]).completed&&(e.getNotes().splice(o,1),n=!0,o--);!0===n&&(u(e),(new v).setNoteCookie(e)),document.querySelectorAll("#divTodoList input").forEach(t=>{t.checked=!1,t.removeAttribute("readonly")})}view(){return h("div",{attrs:{class:"input-group",id:"divNoteInput",style:"padding:1rem;"},children:[h("div",{attrs:{style:"display:grid;width:50%;margin:auto;"},children:[h("textarea",{attrs:{class:"form-control","aria-label":"Note textarea",oninput:this.updateNoteText.bind(this)}}),h("br",{}),h("div",{attrs:{style:"justify-self:center;"},children:[h("button",{attrs:{class:"btn btn-primary",type:"submit",onclick:this.addNewNote.bind(this),style:"width:150px;margin-right:1rem;"},children:[p("Add note")]}),h("button",{attrs:{class:"btn btn-primary",type:"submit",onclick:this.clearCompletedNotes.bind(this),style:"width:150px;"},children:[p("Clear completed")]})]})]})]})}};var A=class{constructor(){}updateReadonlyAttribute(t,e){!1===t.completed?document.querySelectorAll("#divTodoList input").forEach((t,n)=>{n===2*e+1&&t.removeAttribute("readonly")}):!0===t.completed&&document.querySelectorAll("#divTodoList input").forEach((t,n)=>{n===2*e+1&&t.setAttribute("readonly",!0)})}completeNote(t){let e=d(),n=0,o=!1;e.getNotes().forEach((e,r)=>{e===t&&(e.completed=!t.completed,o=!0,n=r)}),u(e),(new v).setNoteCookie(e),!0===o&&this.updateReadonlyAttribute(t,n)}updateNote(t,e){let n=d();n.getNotes().forEach(n=>{n===t&&(n.text=e.target.value)}),u(n),(new v).setNoteCookie(n)}view(){return h("div",{attrs:{id:"divTodoList"},children:[h("div",{attrs:{style:"width:50%;margin:auto;padding:1rem;"},children:[...Array.from(d().getNotes(),t=>h("div",{attrs:{class:"input-group mb-3 animEnter",style:"width:100%;"},children:[h("div",{attrs:{class:"input-group-prepend"},children:[h("div",{attrs:{class:"input-group-text"},children:[h("input",{attrs:{type:"checkbox",...t.completed&&{checked:"true"},onchange:this.completeNote.bind(this,t)}})]}),h("img",{attrs:{src:"images/cat-typing.gif",width:"50px",height:"50px"}})]}),h("input",{attrs:{value:t.text,class:"form-control",...t.completed&&{readonly:"true"},oninput:this.updateNote.bind(this,t),style:"margin-left:1px;"}})]}))]})]})}};var b=class{constructor(){}view(){return h("div",{attrs:{id:"divTodoHeader"},children:[h("h4",{attrs:{style:"text-align:center;padding:1rem;font-family:Arial;line-height:58px;font-size:54px;font-weight:300;"},children:[p("Todo App")]})]})}};var _=class{constructor(){}slOnDestroy(){console.log("Destroy completed list component")}applyCheckedProperty(){document.querySelectorAll("#divTodoList input").forEach((t,e)=>{e%2==0&&(t.checked=!0)})}completeNote(t){let e=d();e.getNotes().forEach(e=>{e===t&&(e.completed=!t.completed)}),u(e),(new v).setNoteCookie(e),this.applyCheckedProperty()}view(){return h("div",{attrs:{id:"divTodoList"},children:[h("div",{attrs:{style:"width:50%;margin:auto;padding:1rem;"},children:[...Array.from(d().getNotes().filter(t=>!!t.completed),t=>h("div",{attrs:{class:"input-group mb-3 animEnter",style:"width:100%;"},children:[h("div",{attrs:{class:"input-group-prepend"},children:[h("div",{attrs:{class:"input-group-text"},children:[h("input",{attrs:{type:"checkbox",...t.completed&&{checked:"true"},onchange:this.completeNote.bind(this,t)}})]})]}),h("input",{attrs:{value:t.text,class:"form-control",...t.completed&&{readonly:"true"}}})]}))]})]})}};let T=!1;s._rtr||(s._rtr=1,T=!0,s._router={segmentArr:[],routeMap:new Map,params:null},Object.seal(s._router));const N=()=>{let t=window.location.href.split("#")[1];if(s._router.segmentArr.splice(0,s._router.segmentArr.length),t){t.split("/").forEach(t=>{s._router.segmentArr.push(t)})}};function E(){return s._router.segmentArr}function C(t,e){s._router.routeMap.set(new RegExp("^"+t.replace(/:[^\/]+/g,"([^\\/]+)")+"$"),e)}function x(t,e={},n=!0){s._router.params=e;let o=null;return s._router.routeMap.forEach((e,r)=>{if(r.test(t)){if(e.authGuard&&!e.authGuard(r))return e.authFail&&(o=s._route(e.authFail.route,e.authFail.params)),void(t=void 0);s._destroyFuncArr.forEach(t=>{t()}),s._destroyFuncArr=[],window.location.hash=t,N();let i=document.getElementById(e.root);e.component&&(s._mountInternal(i,e.component,n),e.component.slOnDestroy&&s._destroyFuncArr.push(e.component.slOnDestroy),o=e.component)}}),s._changeDetector.changeDetectionStrategy===s.CHANGE_STRATEGY_AUTOMATIC&&s._performChangeDetection(),o}T&&(s._getRoute=function(){return window.location.href.split("#")[1]}),T&&(s._route=x),T&&N();const S=t=>{const e=["pop","push","reverse","shift","unshift","splice","sort","map","filter","fill","copyWithin"],n=e.slice(0,6),o={},r=[];let s=t,i=0;const a=function(t){0===i?(r.forEach(e=>{e(t)}),i++):i=0};return o.subscribe=function(t){return r.push(t),s=new Proxy(s,{set:function(t,e,n){return"length"===e?(t[e]=n,!0):!1===isNaN(e)?(t[e]=n,a(t),!0):void 0}}),e.forEach((function(t){Object.defineProperty(s,t,{writable:!0,value:function(){let e=s;return n.indexOf(t)>-1?Array.prototype[t].apply(e,arguments):e=Array.prototype[t].apply(e,arguments),a(e),e}})})),this},o.clearSubscription=function(t){const e=r.filter(e=>e!==t);return this.clearSubscriptions(),r.concat(e),this},o.clearSubscriptions=function(){return r.splice(0,r.length),this},o.getData=function(){return s},o};var k=class{constructor(){this.routeString=""}slOnInit(){this.performRouteAction(E()[0]),S(E()).subscribe(function(t){t.length>0?this.routeString=t[0]:this.routeString=""}.bind(this))}routeToAll(){x("all")}routeToCompleted(){x("completed")}performRouteAction(t){switch(this.routeString=t,t){case"all":this.routeToAll();break;case"completed":this.routeToCompleted();break;default:this.routeString="all",this.routeToAll()}}completeNote(t){let e=d();e.getNotes().forEach(e=>{e===t&&(e.completed=!t.completed)}),setState(e),(new v).setNoteCookie(e)}view(){return h("ul",{attrs:{class:"nav",style:"width:50%;margin:auto;",id:"divNoteNav"},children:[h("li",{attrs:{class:"nav-item"},children:[h("a",{attrs:{..."all"!==this.routeString&&{class:"nav-link"},..."all"===this.routeString&&{class:"nav-link textBold"},onclick:this.performRouteAction.bind(this,"all"),style:"cursor:pointer;"},children:[p("All")]})]}),h("li",{attrs:{class:"nav-item"},children:[h("a",{attrs:{..."completed"!==this.routeString&&{class:"nav-link"},..."completed"===this.routeString&&{class:"nav-link textBold"},onclick:this.performRouteAction.bind(this,"completed"),style:"cursor:pointer;"},children:[p("Completed")]})]})]})}};var D=class{constructor(){this.notes=[]}getNotes(){return this.notes}setNotes(t){this.notes=t}addNotes(t){t.notes.forEach(t=>{this.notes.push(t)})}};let I=!1;s._cdr||(s._cdr=1,I=!0,s.CHANGE_STRATEGY_AUTOMATIC=100,s.CHANGE_STRATEGY_MANUAL=200,s.CHANGE_DETECTOR_DETACHED=!1,s.CHANGE_DETECTOR_ATTACHED=!0,s.changeStrategies=[s.CHANGE_STRATEGY_AUTOMATIC,s.CHANGE_STRATEGY_MANUAL],s._changeDetector={lastUpdateDate:new Date,changeDetectionStrategy:s.CHANGE_STRATEGY_AUTOMATIC},Object.seal(s._changeDetector));const O=(t,e)=>{if(e[t]){let n=e[t];e[t]=function(){let t=n.apply(this,[].slice.call(arguments));return s._performChangeDetection(),t}}};const M=()=>{s._updateMap.forEach((t,e)=>{s._update(e,t)})};I&&(s._debouncedPerformUpdates=function(t,e){let n;return function(...o){const r=this;clearTimeout(n),n=s.detachedSetTimeout(()=>t.apply(r,o),e)}}(M,17));if(I&&(s._performChangeDetection=()=>{if(s._changeDetector.changeDetectionStrategy!==s.CHANGE_STRATEGY_AUTOMATIC)return;new Date-s._changeDetector.lastUpdateDate>17?M():s._debouncedPerformUpdates(),s._changeDetector.lastUpdateDate=new Date}),I){const t=t=>{["setTimeout","setInterval","onafterprint","onbeforeprint","onbeforeunload","onerror","onhashchange","onload","onmessage","onoffline","ononline","onpagehide","onpageshow","onpopstate","onresize","onstorage","onunload","onblur","onchange","oncontextmenu","onfocus","oninput","oninvalid","onreset","onsearch","onselect","onsubmit","onkeydown","onkeypress","onkeyup","onclick","ondblclick","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onwheel","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","onscroll","oncopy","oncut","onpaste","onabort","oncanplay","oncanplaythrough","oncuechange","ondurationchange","onemptied","onended","onloadeddata","onloadedmetadata","onloadstart","onpause","onplay","onplaying","onprogress","onratechange","onseeked","onseeking","onstalled","onsuspend","ontimeupdate","onvolumechange","onwaiting","ontoggle"].forEach(e=>{O(e,t)})};s._proxyAllEvents=t}if(I){var R=window.XMLHttpRequest.prototype.send;function G(){if(this._onreadystatechange){let t=this._onreadystatechange.apply(this,arguments);return s._performChangeDetection(),t}}window.XMLHttpRequest.prototype.send=function(t){return this.onreadystatechange&&(this._onreadystatechange=this.onreadystatechange),this.onreadystatechange=G,R.apply(this,arguments)};const t=window.fetch;window.fetch=function(){let e=t.apply(this,arguments);return s._performChangeDetection(),e},s._proxyAllEvents(window)}var U;U=s.CHANGE_STRATEGY_AUTOMATIC,s.changeStrategies.forEach(t=>{t[1]===U&&(s._changeDetector.changeDetectionStrategy=U)});let H=(new v).getNoteCookie(),j=new D;H.length>0&&j.addNotes(JSON.parse(H)),u(j),C("all",{component:new A,root:"divTodoList"}),C("completed",{component:new _,root:"divTodoList"}),g("divNavbar",new f),g("divNoteInput",new w),g("divNoteNav",new k),g("divTodoHeader",new b)}]);