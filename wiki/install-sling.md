Download and install Sling with the following npm command: 

```npm i slingjs```

Refer to the project at [Sling.js](https://github.com/puckowski/Sling.js) for an example on how to integrate Sling.js with Webpack.

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