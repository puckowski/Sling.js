The following is an example of Sling.js usage without a build step:

```javascript
import { mount, textNode, markup } from 'https://cdn.skypack.dev/slingjs';

class HelloWorldComponent {
  constructor() {
  }

  view() {
    return markup('h1', {
      attrs: {
        id: 'divRouterOutlet'
      },
      children: [
        textNode('Hello, world!')
      ]
    });
  }
}

mount('divRouterOutlet', new HelloWorldComponent());
```

The following is another example of Sling.js usage without a build step:

```javascript
import { mount, textNode, markup } from 'https://unpkg.com/slingjs@10.1.2/sling.min.js';

class HelloWorldComponent {
  constructor() {
  }

  view() {
    return markup('h1', {
      attrs: {
        id: 'divRouterOutlet'
      },
      children: [
        textNode('Hello, world!')
      ]
    });
  }
}

mount('divRouterOutlet', new HelloWorldComponent());
```