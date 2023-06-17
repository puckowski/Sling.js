# Quick Examples

## Keyed Animations

```javascript
import {
    mount,
    textNode,
    markup
} from 'https://cdn.skypack.dev/slingjs';

class HelloWorldComponent {
    constructor() {
        this.welcomeHidden = false;
    }

    hideWelcome() {
        this.welcomeHidden = true;
    }

    showWelcome() {
        this.welcomeHidden = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutlet',
                ...this.welcomeHidden !== true && {
                    class: 'visible'
                },
                style: 'display: flex; justify-content: center; align-items: center; height: 100%;'
            },
            children: [
                ...(this.welcomeHidden === false ? [
                    markup('h1', {
                        attrs: {
                            slanimatedestroy: 'hide',
                        },
                        children: [
                            textNode('Hello, world!'),
                            markup('button', {
                                attrs: {
                                    onclick: this.hideWelcome.bind(this)
                                },
                                children: [
                                    textNode('Hide')
                                ]
                            })
                        ]
                    })
                ] : [
                    markup('button', {
                        attrs: {
                            onclick: this.showWelcome.bind(this)
                        },
                        children: [
                            textNode('Show')
                        ]
                    })
                ])
            ]
        });
    }
}

mount('divRouterOutlet', new HelloWorldComponent());
```

```css
.visible {
    animation: fadein 800ms ease-in-out;
}

.hide {
    animation: fadeout 800ms ease-in-out;
}

@keyframes fadein {
    from {
        opacity: 0;
        transform: translateY(-5%);
    }

    to {
        opacity: 1;
        transform: translateY(0%);
    }
}

@keyframes fadeout {
    from {
        opacity: 1;
        transform: translateY(0%);
    }

    to {
        opacity: 0;
        transform: translateY(100%);
    }
}
```

```html
<html><body><div id="divRouterOutlet"></div></body></html>
```

## Automatic Change Detection

```javascript
import {
  mount,
  textNode,
  markup
} from "https://cdn.jsdelivr.net/npm/slingjs@18.0.0/sling.min.js";

import { BehaviorSubject } from "https://cdn.jsdelivr.net/npm/slingjs@18.0.0/sling-reactive.min.js";

class HelloWorldComponent {
  constructor() {
    this.sub = BehaviorSubject(0);
  }

  slOnInit() {
    setInterval(() => {
      this.sub.next(this.sub.getData() + 1);
    }, 1000);
  }

  view() {
    return markup("div", {
      attrs: {
        id: "divRouterOutlet"
      },
      children: [textNode("Count: " + this.sub.getData())]
    });
  }
}

mount("divRouterOutlet", new HelloWorldComponent());
```

```html
<html>

<body>
  <div id="divRouterOutlet"></div>
</body>

</html>
```

## Routing

```javascript
import {
    mount,
    textNode,
    markup,
    route,
    addRoute,
    getRouteSegments
  } from "https://cdn.jsdelivr.net/npm/slingjs@18.2.1/sling.min.js";

  class TodoListComponent {
    view() {
      return markup("div", {
        attrs: {
          id: "divRouterOutlet"
        },
        children: [textNode("To-do list: Walk dog, Wash car")]
      });
    }
  }
  
  class TodoListCompletedComponent {
    view() {
      return markup("div", {
        attrs: {
          id: "divRouterOutlet"
        },
        children: [textNode("Completed tasks: Clean office, Pay bills")]
      });
    }
  }
  
  class UserProfileComponent {
    constructor() {
      this.id = "Unknown";
    }
  
    slOnInit() {
      this.id = getRouteSegments()[1];
    }
  
    view() {
      return markup("div", {
        attrs: {
          id: "divRouterOutlet"
        },
        children: [textNode("Your user ID: " + this.id)]
      });
    }
  }
  
  class DefaultRouteComponent {
    slDetachedOnNodeDestroy(node) {
      return node;
    }
  
    view() {
      return markup("div", {
        attrs: {
          id: "divRouterOutlet",
          class: "visible",
          slanimatedestroy: "hide",
          slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
        },
        children: [
          markup("div", {
            children: [textNode("Default route.")]
          })
        ]
      });
    }
  }
  
  class NavComponent {
    routeDefault() {
      route("cat");
    }
  
    routeTodo() {
      route("all");
    }
  
    routeTodoCompleted() {
      route("completed");
    }
  
    routeUser() {
      route("user/5");
    }
  
    view() {
      return markup("div", {
        attrs: {
          id: "divNav"
        },
        children: [
          markup("button", {
            attrs: {
              onclick: this.routeDefault
            },
            children: [textNode("Default Route")]
          }),
          markup("button", {
            attrs: {
              onclick: this.routeTodo
            },
            children: [textNode("To-do Route")]
          }),
          markup("button", {
            attrs: {
              onclick: this.routeTodoCompleted
            },
            children: [textNode("To-do Completed Route")]
          }),
          markup("button", {
            attrs: {
              onclick: this.routeUser
            },
            children: [textNode("User Route")]
          })
        ]
      });
    }
  }
  
  addRoute("all", {
    component: new TodoListComponent(),
    root: "divRouterOutlet"
  });
  addRoute("completed", {
    component: new TodoListCompletedComponent(),
    root: "divRouterOutlet",
    onActivationCheck: () => {
      return true;
    },
    onActivationFail: { route: "all" }
  });
  addRoute("user/:userId", {
    component: new UserProfileComponent(),
    root: "divRouterOutlet",
    onCanDeactivate: () => {
      return true;
    }
  });
  addRoute(".*", {
    component: new DefaultRouteComponent(),
    root: "divRouterOutlet",
    animateDestroy: true
  });
  
  mount("divNav", new NavComponent());
  
```

```css
.visible {
    animation: fadein 2s;
}

.hide {
    animation: fadeout 2s;
}

@keyframes fadein {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeout {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

dialog{background-color:var(--background500);color:var(--foreground500);border:none;border-radius:6px;padding:10px 30px}dialog>header:first-child{background-color:var(--background600);border-radius:6px 6px 0 0;margin:-10px -30px 10px;padding:10px;text-align:center}dialog::backdrop{background:#0000009c;backdrop-filter:blur(4px)}button:focus,input:focus,select:focus,textarea:focus{box-shadow:0 0 0 1px var(--primary500)}button:hover,input:hover,select:hover,textarea:hover{box-shadow:0 0 0 1px var(--primary500)}button:disabled,input:disabled,select:disabled,textarea:disabled{cursor:not-allowed;opacity:.5}input[type=checkbox]{appearance:none;background-color:var(--background700);margin:0;font:inherit;color:currentColor;width:1.15em;height:1.15em;transform:translateY(-.075em);display:inline-grid;place-content:center;border-color:var(--background700)}input[type=checkbox]::before{content:"";width:.75em;height:.75em;clip-path:polygon(14% 44%,0 65%,50% 100%,100% 16%,80% 0%,43% 62%);transform:scale(0);transform-origin:bottom left;transition:.2s transform ease-in-out;box-shadow:inset 1em 1em var(--primary500);background-color:CanvasText}input[type=checkbox]:checked::before{transform:scale(1)}input[type=checkbox]:focus{outline:1px solid var(--primary500)}input[type=radio]{appearance:none;background-color:var(--background700);margin:0;font:inherit;color:currentColor;width:1.15em;height:1.15em;border-color:var(--background700);border-radius:50%;transform:translateY(-.075em);display:inline-grid;place-content:center}input[type=radio]::before{content:"";width:.65em;height:.65em;border-radius:50%;transform:scale(0);transition:.2s transform ease-in-out;box-shadow:inset 1em 1em var(--primary500);background-color:CanvasText}input[type=radio]:checked::before{transform:scale(1)}input[type=radio]:focus{outline:1px solid var(--primary500)}select{background:var(--background600);padding-right:35px;color:var(--foreground500);padding:4px 8px}select::-ms-expand{display:none}select[multiple]{padding-right:10px;background-image:none;overflow-y:auto}select option{background:var(--background600)}::placeholder{color:var(--foreground600)}button,input,textarea{background-color:var(--background600);color:var(--foreground500);border-radius:2px;border:none;padding:8px;transition:box-shadow var(--animation-duration) linear;margin:1px}button,input[type=button],input[type=checkbox],input[type=radio],input[type=range],input[type=reset],input[type=submit],select{cursor:pointer}a{text-decoration:none;color:var(--primary500)}a:hover{text-decoration:none}hr{border:none;border-top:1px solid var(--foreground600)}code,samp,time{color:var(--secondary500);background-color:var(--background600);display:inline-block;padding:2px 4px;border-radius:6px}details{display:flex;flex-direction:column;align-items:flex-start;background-color:var(--background600);padding:10px 10px 0;margin:1em 0;border-radius:6px;overflow:hidden}details[open]{padding:10px}details>:last-child{margin-bottom:0}details[open] summary{margin-bottom:10px}summary{display:list-item;background-color:var(--background700);padding:10px;margin:-10px -10px 0;cursor:pointer;outline:0}details>:not(summary){margin-top:0}var{color:var(--foreground600);font-style:normal;font-family:monospace}kbd{background:var(--background600);border-radius:2px;color:var(--foreground500);padding:2px 4px 2px 4px}fieldset{border:1px var(--foreground600) solid;border-radius:6px;margin:0;padding:10px}blockquote,q{border-left:1px solid var(--foreground600);padding:4px 8px}input[type=range]{-webkit-appearance:none;background:0 0}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:8.4px;cursor:pointer;background:var(--background700);border-radius:1.3px;border:none}input[type=range]::-webkit-slider-thumb{border:none;height:16px;width:16px;background:var(--primary500);cursor:pointer;-webkit-appearance:none;margin-top:-4.2px;border-radius:50%}input[type=range]:focus::-webkit-slider-runnable-track{background:var(--background700)}input[type=range]::-moz-range-track{width:100%;height:8.4px;cursor:pointer;background:var(--background700);border-radius:1.3px;border:none}input[type=range]::-moz-range-thumb{border:none;height:16px;width:16px;background:var(--primary500);cursor:pointer;border-radius:50%}input[type=range]::-ms-track{width:100%;height:8.4px;cursor:pointer;background:0 0;border-color:transparent;border-width:16px 0;color:transparent}input[type=range]::-ms-fill-lower{background:var(--background700);border:none;border-radius:2.6px}input[type=range]::-ms-fill-upper{background:var(--background700);border:none;border-radius:2.6px}input[type=range]::-ms-thumb{border:none;height:16px;width:16px;background:var(--primary500);cursor:pointer;border-radius:50%}input[type=range]:focus::-ms-fill-lower{background:var(--background700)}input[type=range]:focus::-ms-fill-upper{background:var(--background700)}table{border-collapse:collapse;margin-bottom:10px;width:100%;table-layout:fixed}table caption{text-align:left}td,th{padding:6px;text-align:left;vertical-align:top;word-wrap:break-word}thead{border-bottom:1px solid var(--foreground600)}tfoot{border-top:1px solid var(--foreground600)}tbody tr:nth-child(even){background-color:var(--background600)}tbody tr:nth-child(even) button{background-color:var(--background400)}:root{--foreground500:#dbdbdb;--foreground600:#a9b1ba;--background400:#2e3e51;--background500:#202b38;--background600:#161f27;--background700:#0f151a;--primary500:#41adff;--secondary500:#ffbe85;--animation-duration:200ms}html{scrollbar-color:var(--foreground500) var(--background500);scrollbar-width:thin}body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue','Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif;padding:16px 16px;word-wrap:break-word;color:var(--foreground500);background:var(--background500);text-rendering:optimizeLegibility}
```

```html
<html>

<body>
  <div id="divNav"></div>
  <div id="divRouterOutlet"></div>
</body>

</html>
```

## Promise Change Detection

```javascript
import {
  mount,
  textNode,
  markup,
  enableDetectOnThen
} from "https://cdn.skypack.dev/slingjs";
import { slGet } from "https://cdn.jsdelivr.net/npm/slingjs@18.4.0/sling-xhr.min.js";

class HelloWorldComponent {
  constructor() {
    this.data = "";
  }

  slAfterInit() {
    slGet("https://www.apimock.live").then((xhrResp) => {
      this.data = xhrResp.response;
    });
  }

  view() {
    return markup("div", {
      attrs: {
        id: "divRouterOutlet",
        style:
          "display: flex; justify-content: center; align-items: center; height: 100%;"
      },
      children: [textNode(this.data)]
    });
  }
}

enableDetectOnThen();
mount("divRouterOutlet", new HelloWorldComponent());
```

```html
<html><body><div id="divRouterOutlet"></div></body></html>
```
