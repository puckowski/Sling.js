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
