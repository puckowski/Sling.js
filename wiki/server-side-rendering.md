Sling.js is capable of Server Side Rendering.

The ```renderToString``` function is used to generate HTML from components. Then, the front-end application can use the same component definition in conjunction with the ```hydrate``` function to hydrate the HTML received from the server. By using the ```hydrate``` function, Sling.js will update the component according to subsequent changes to state. The ```slTrustChildren``` structural directive is of particular use for Sling.js SSR. See [Directives](https://github.com/puckowski/Sling.js/wiki/Directives).

The following is a basic example of rendering a component to HTML using Node.js:

```javascript
import http from 'http';

import { renderToString } from 'slingjs/sling.min.es5';
import Test1Component from './test1.component';
import Test2Component from './test2.component';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' });

  const url = req.url;

  switch (url) {
    case '/': {
      res.end(renderToString(new Test1Component()));

      break;
    }
    case '/hydrate': {
      res.end(renderToString(new Test2Component()));

      break;
    }
    default: {
      res.end(renderToString(new Test1Component()));
    }
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

export default server;
```

For a complete example of sending components as HTML, see the project at [Sling.js SSR Example](https://github.com/puckowski/slingjs-ssr-example)

For a complete example on one way to consume Sling.s SSR content, see the project at [Sling.js SSR Client Example](https://github.com/puckowski/slingjs-ssr-client-example)

When classes are consumed in a template, the following cycle hooks will be called when appropriate:
* slOnInit
* slOnDestroy

The **slAfterInit** lifecycle hook will not be called by render to string functions because a node is never created.