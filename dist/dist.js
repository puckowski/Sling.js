/*! For license information please see dist.js.LICENSE */
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var _=t[o]={i:o,l:!1,exports:{}};return e[o].call(_.exports,_,_.exports,n),_.l=!0,_.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var _ in e)n.d(o,_,function(t){return e[t]}.bind(null,_));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="./todo.js")}({"./todo.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_components_navbar_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo/components/navbar.component.js */ "./todo/components/navbar.component.js");\n/* harmony import */ var _todo_components_note_input_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo/components/note-input.component.js */ "./todo/components/note-input.component.js");\n/* harmony import */ var _todo_components_todo_list_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todo/components/todo-list.component.js */ "./todo/components/todo-list.component.js");\n/* harmony import */ var _todo_components_todo_header_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todo/components/todo-header.component.js */ "./todo/components/todo-header.component.js");\n/* harmony import */ var _todo_components_todo_list_completed_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./todo/components/todo-list-completed.component.js */ "./todo/components/todo-list-completed.component.js");\n/* harmony import */ var _todo_components_todo_list_nav_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./todo/components/todo-list-nav.component.js */ "./todo/components/todo-list-nav.component.js");\n/* harmony import */ var _todo_stores_todo_store_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./todo/stores/todo.store.js */ "./todo/stores/todo.store.js");\n/* harmony import */ var _todo_services_note_service_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./todo/services/note.service.js */ "./todo/services/note.service.js");\n\n\n\n\n\n\n\n\nlet noteCookieData = new _todo_services_note_service_js__WEBPACK_IMPORTED_MODULE_7__["default"]().getNoteCookie();\nlet state = new _todo_stores_todo_store_js__WEBPACK_IMPORTED_MODULE_6__["default"]();\n\nif (noteCookieData.length > 0) {\n  state.addNotes(JSON.parse(noteCookieData));\n}\n\ns.setState(state);\ns.route(\'all\', {\n  component: new _todo_components_todo_list_component_js__WEBPACK_IMPORTED_MODULE_2__["default"](),\n  root: \'divTodoList\'\n});\ns.route(\'completed\', {\n  component: new _todo_components_todo_list_completed_component_js__WEBPACK_IMPORTED_MODULE_4__["default"](),\n  root: \'divTodoList\'\n});\nlet compNavbar = new _todo_components_navbar_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]();\ns.mount(\'divNavbar\', compNavbar);\nlet compNoteInput = new _todo_components_note_input_component_js__WEBPACK_IMPORTED_MODULE_1__["default"]();\ns.mount(\'divNoteInput\', compNoteInput);\nlet compTodoListNav = new _todo_components_todo_list_nav_component_js__WEBPACK_IMPORTED_MODULE_5__["default"]();\ns.mount(\'divNoteNav\', compTodoListNav);\nlet compTodoHeader = new _todo_components_todo_header_component_js__WEBPACK_IMPORTED_MODULE_3__["default"]();\ns.mount(\'divTodoHeader\', compTodoHeader);\ns.autoUpdate(\'navTodoList\', compTodoListNav);\n\n//# sourceURL=webpack:///./todo.js?')},"./todo/components/navbar.component.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\nclass NavbarComponent {\n  constructor() {}\n\n  view() {\n    return s.markup('nav', {\n      attrs: {\n        class: 'navbar navbar-light bg-light',\n        id: \"navbar\"\n      },\n      children: [s.markup('span', {\n        attrs: {},\n        children: [s.markup('img', {\n          attrs: {\n            src: 'sling.png',\n            width: '30px',\n            height: '30px',\n            class: 'd-inline-block align-top',\n            style: 'margin-right:0.5rem;margin-top:0.3125rem;margin-bottom:0.3125rem;'\n          },\n          children: []\n        }), s.markup('span', {\n          attrs: {\n            class: 'navbar-brand'\n          },\n          children: [s.textNode('Sling')]\n        }), s.markup('div', {\n          attrs: {\n            style: 'display:inline-flex;'\n          },\n          children: [s.markup('ul', {\n            attrs: {\n              class: 'navbar-nav'\n            },\n            children: [s.markup('li', {\n              attrs: {\n                class: 'nav-item'\n              },\n              children: [s.textNode('v' + s.version)]\n            })]\n          })]\n        })]\n      })]\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (NavbarComponent);\n\n//# sourceURL=webpack:///./todo/components/navbar.component.js?")},"./todo/components/note-input.component.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_note_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/note.model.js */ \"./todo/models/note.model.js\");\n/* harmony import */ var _services_note_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/note.service.js */ \"./todo/services/note.service.js\");\n\n\n\nclass NoteInputComponent {\n  constructor() {\n    this.noteText = '';\n    this.inputTarget = null;\n  }\n\n  slOnInit() {\n    console.log('Initializing NoteInputComponent');\n  }\n\n  updateNoteText(event) {\n    this.noteText = event.target.value;\n    this.inputTarget = event.target;\n  }\n\n  getNoteText() {\n    return this.noteText;\n  }\n\n  resetInput() {\n    this.noteText = '';\n    this.inputTarget.value = '';\n  }\n\n  addNewNote() {\n    const noteText = this.getNoteText();\n\n    if (!noteText || noteText.length === 0) {\n      return;\n    }\n\n    let stateObj = s.getState();\n    stateObj.getNotes().push(new _models_note_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](noteText, false));\n    s.setState(stateObj);\n    new _services_note_service_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().setNoteCookie(stateObj);\n    this.resetInput();\n  }\n\n  clearCompletedNotes() {\n    let stateObj = s.getState();\n    let currNote;\n\n    for (let i = 0; i < stateObj.getNotes().length; ++i) {\n      currNote = stateObj.getNotes()[i];\n\n      if (currNote.completed === true) {\n        stateObj.getNotes().splice(i, 1);\n        i--;\n      }\n    }\n\n    s.setState(stateObj);\n    new _services_note_service_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().setNoteCookie(stateObj);\n  }\n\n  view() {\n    return s.markup('div', {\n      attrs: {\n        class: 'input-group',\n        id: 'divNoteInput',\n        style: 'padding:1rem;'\n      },\n      children: [s.markup('div', {\n        attrs: {\n          style: 'display:grid;width:50%;margin:auto;'\n        },\n        children: [s.markup('textarea', {\n          attrs: {\n            class: 'form-control',\n            \"aria-label\": 'Note textarea',\n            style: 'margin-right:1rem;',\n            oninput: this.updateNoteText.bind(this)\n          }\n        }), s.markup('br', {}), s.markup('div', {\n          attrs: {\n            style: 'justify-self:center;'\n          },\n          children: [s.markup('button', {\n            attrs: {\n              class: 'btn btn-primary',\n              type: 'submit',\n              onclick: this.addNewNote.bind(this),\n              style: 'width:150px;margin-right:1rem;'\n            },\n            children: [s.textNode('Add note')]\n          }), s.markup('button', {\n            attrs: {\n              class: 'btn btn-primary',\n              type: 'submit',\n              onclick: this.clearCompletedNotes.bind(this),\n              style: 'width:150px;'\n            },\n            children: [s.textNode('Clear completed')]\n          })]\n        })]\n      })]\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (NoteInputComponent);\n\n//# sourceURL=webpack:///./todo/components/note-input.component.js?")},"./todo/components/todo-header.component.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\nclass TodoHeaderComponent {\n  constructor() {}\n\n  view() {\n    return s.markup('div', {\n      attrs: {},\n      children: [s.markup('h4', {\n        attrs: {\n          style: 'text-align:center;padding:1rem;font-family:\\'Lato\\', sans-serif;line-height:58px;font-size:54px;font-weight:300;'\n        },\n        children: [s.textNode('Todo App')]\n      })]\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoHeaderComponent);\n\n//# sourceURL=webpack:///./todo/components/todo-header.component.js?")},"./todo/components/todo-list-completed.component.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_note_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/note.service.js */ \"./todo/services/note.service.js\");\n\n\nclass TodoListCompletedComponent {\n  constructor() {}\n\n  completeNote(note) {\n    let stateObj = s.getState();\n    stateObj.getNotes().forEach(stateNote => {\n      if (stateNote === note) {\n        stateNote.completed = !note.completed;\n      }\n    });\n    s.setState(stateObj);\n    new _services_note_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().setNoteCookie(stateObj);\n  }\n\n  view() {\n    return s.markup('div', {\n      attrs: {\n        id: 'divTodoList'\n      },\n      children: [s.markup('div', {\n        attrs: {\n          style: \"width:50%;margin:auto;padding:1rem;\"\n        },\n        children: [...Array.from(s.getState().getNotes().filter(note => note.completed ? true : false), note => s.markup('div', {\n          attrs: {\n            class: 'input-group mb-3 animEnter',\n            style: 'width:100%;'\n          },\n          children: [s.markup('div', {\n            attrs: {\n              class: 'input-group-prepend'\n            },\n            children: [s.markup('div', {\n              attrs: {\n                class: 'input-group-text'\n              },\n              children: [s.markup('input', {\n                attrs: {\n                  type: 'checkbox',\n                  ...(note.completed && {\n                    checked: 'true'\n                  }),\n                  onchange: this.completeNote.bind(this, note)\n                }\n              })]\n            })]\n          }), s.markup('input', {\n            attrs: {\n              value: note.text,\n              class: 'form-control',\n              ...(note.completed && {\n                readonly: 'true'\n              })\n            }\n          })]\n        }))]\n      })]\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoListCompletedComponent);\n\n//# sourceURL=webpack:///./todo/components/todo-list-completed.component.js?")},"./todo/components/todo-list-nav.component.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_list_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo-list.component.js */ \"./todo/components/todo-list.component.js\");\n/* harmony import */ var _todo_list_completed_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo-list-completed.component.js */ \"./todo/components/todo-list-completed.component.js\");\n/* harmony import */ var _services_note_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/note.service.js */ \"./todo/services/note.service.js\");\n\n\n\n\nclass TodoListNavComponent {\n  constructor() {\n    this.routeString = '';\n  }\n\n  slOnInit() {\n    this.performRouteAction(s.getRouteSegments()[0]);\n  }\n\n  routeToAll() {\n    let compTodoList = new _todo_list_component_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    s.mount('divTodoList', compTodoList);\n    s.route('all');\n    s.autoUpdate('divTodoList', compTodoList);\n  }\n\n  routeToCompleted() {\n    let compTodoListCompleted = new _todo_list_completed_component_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    s.mount('divTodoList', compTodoListCompleted);\n    s.route('completed');\n    s.autoUpdate('divTodoList', compTodoListCompleted);\n  }\n\n  performRouteAction(routeString) {\n    this.routeString = routeString;\n\n    switch (routeString) {\n      case 'all':\n        {\n          this.routeToAll();\n          break;\n        }\n\n      case 'completed':\n        {\n          this.routeToCompleted();\n          break;\n        }\n\n      default:\n        {\n          this.routeString = 'all';\n          this.routeToAll();\n          break;\n        }\n    }\n  }\n\n  completeNote(note) {\n    let stateObj = s.getState();\n    stateObj.getNotes().forEach(stateNote => {\n      if (stateNote === note) {\n        stateNote.completed = !note.completed;\n      }\n    });\n    s.setState(stateObj);\n    new _services_note_service_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]().setNoteCookie(stateObj);\n  }\n\n  view() {\n    return s.markup('ul', {\n      attrs: {\n        class: 'nav',\n        style: 'width:50%;margin:auto;',\n        id: 'navTodoList'\n      },\n      children: [s.markup('li', {\n        attrs: {\n          class: 'nav-item'\n        },\n        children: [s.markup('a', {\n          attrs: { ...(this.routeString !== 'all' && {\n              class: 'nav-link'\n            }),\n            ...(this.routeString === 'all' && {\n              class: 'nav-link textBold'\n            }),\n            onclick: this.performRouteAction.bind(this, 'all'),\n            style: 'cursor:pointer;'\n          },\n          children: [s.textNode('All')]\n        })]\n      }), s.markup('li', {\n        attrs: {\n          class: 'nav-item'\n        },\n        children: [s.markup('a', {\n          attrs: { ...(this.routeString !== 'completed' && {\n              class: 'nav-link'\n            }),\n            ...(this.routeString === 'completed' && {\n              class: 'nav-link textBold'\n            }),\n            onclick: this.performRouteAction.bind(this, 'completed'),\n            style: 'cursor:pointer;'\n          },\n          children: [s.textNode('Completed')]\n        })]\n      })]\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoListNavComponent);\n\n//# sourceURL=webpack:///./todo/components/todo-list-nav.component.js?")},"./todo/components/todo-list.component.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_note_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/note.service.js */ \"./todo/services/note.service.js\");\n\n\nclass TodoListComponent {\n  constructor() {}\n\n  completeNote(note) {\n    let stateObj = s.getState();\n    stateObj.getNotes().forEach(stateNote => {\n      if (stateNote === note) {\n        stateNote.completed = !note.completed;\n      }\n    });\n    s.setState(stateObj);\n    new _services_note_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().setNoteCookie(stateObj);\n  }\n\n  updateNote(note, event) {\n    let stateObj = s.getState();\n    stateObj.getNotes().forEach(stateNote => {\n      if (stateNote === note) {\n        stateNote.text = event.target.value;\n      }\n    });\n    s.setState(stateObj);\n    new _services_note_service_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().setNoteCookie(stateObj);\n  }\n\n  view() {\n    return s.markup('div', {\n      attrs: {\n        id: 'divTodoList'\n      },\n      children: [s.markup('div', {\n        attrs: {\n          style: \"width:50%;margin:auto;padding:1rem;\"\n        },\n        children: [...Array.from(s.getState().getNotes(), note => s.markup('div', {\n          attrs: {\n            class: 'input-group mb-3 animEnter',\n            style: 'width:100%;'\n          },\n          children: [s.markup('div', {\n            attrs: {\n              class: 'input-group-prepend'\n            },\n            children: [s.markup('div', {\n              attrs: {\n                class: 'input-group-text'\n              },\n              children: [s.markup('input', {\n                attrs: {\n                  type: 'checkbox',\n                  ...(note.completed && {\n                    checked: 'true'\n                  }),\n                  onchange: this.completeNote.bind(this, note)\n                }\n              })]\n            }), s.markup('img', {\n              attrs: {\n                src: 'cat-typing.gif',\n                width: '50px',\n                height: '50px'\n              }\n            })]\n          }), s.markup('input', {\n            attrs: {\n              value: note.text,\n              class: 'form-control',\n              ...(note.completed && {\n                readonly: 'true'\n              }),\n              oninput: this.updateNote.bind(this, note)\n            }\n          })]\n        }))]\n      })]\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoListComponent);\n\n//# sourceURL=webpack:///./todo/components/todo-list.component.js?")},"./todo/models/note.model.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nclass Note {\n  constructor(text, completed) {\n    this.text = text;\n    this.completed = completed;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["default"] = (Note);\n\n//# sourceURL=webpack:///./todo/models/note.model.js?')},"./todo/services/note.service.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nconst COOKIE_NOTE_DATA = \'cookieNoteData\';\n\nclass NoteService {\n  constructor() {}\n\n  getNoteCookie() {\n    return this.getCookie(COOKIE_NOTE_DATA);\n  }\n\n  setNoteCookie(notes) {\n    this.setCookie(COOKIE_NOTE_DATA, JSON.stringify(notes), 31);\n  }\n\n  setCookie(cname, cvalue, exdays) {\n    var d = new Date();\n    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);\n    var expires = "expires=" + d.toUTCString();\n    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";\n  }\n\n  getCookie(cname) {\n    var name = cname + "=";\n    var decodedCookie = decodeURIComponent(document.cookie);\n    var ca = decodedCookie.split(\';\');\n\n    for (var i = 0; i < ca.length; i++) {\n      var c = ca[i];\n\n      while (c.charAt(0) == \' \') {\n        c = c.substring(1);\n      }\n\n      if (c.indexOf(name) == 0) {\n        return c.substring(name.length, c.length);\n      }\n    }\n\n    return "";\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["default"] = (NoteService);\n\n//# sourceURL=webpack:///./todo/services/note.service.js?')},"./todo/stores/todo.store.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\nclass StoreTodo {\n  constructor() {\n    this.notes = [];\n  }\n\n  getNotes() {\n    return this.notes;\n  }\n\n  setNotes(newNoteArray) {\n    this.notes = newNoteArray;\n  }\n\n  addNotes(dataObject) {\n    dataObject.notes.forEach(note => {\n      this.notes.push(note);\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["default"] = (StoreTodo);\n\n//# sourceURL=webpack:///./todo/stores/todo.store.js?')}});