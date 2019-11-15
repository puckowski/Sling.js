![Sling logo](https://github.com/puckowski/Sling.js/sling.png "Sling logo") Sling 

# Sling

Client-side JavaScript framework for building Single Page Applications.

## Building

terser --compress --mangle --output .\dist\sling.js -- .\src\sling.js

## Testing

Recommend NPM package http-server.

```
http-server -c-1 .
```

Then navigate to http://127.0.0.1:8080/index.html

## API

## s.setState 
### void s.setState ( newStateObj )

Set a new state object for SPA.

## s.getState
### object s.getState ( )

Get the state object for SPA.

## s.markup
### object s.markup ( tagString, { attrs: {}, children: [] } )

Returns an object to render. Once rendered, may be mounted to DOM.

## s.mount
### element s.mount ( rootElement, elementToMount )

Mounts second argument elementToMount on rootElement in DOM.
Returns root element in DOM where elementToMount was added.

## s.mountById
### element s.mount ( rootElementId, elementToMount )

Same as s.mount, but takes in element ID as first parameter instead of the actual root element to mount to.
Returns root element in DOM where elementToMount was added.

## s.render
### s.render ( componentView )

Render the component. Doesn't affect the DOM.

## s.autoupdate
### void s.autoupdate ( rootElement, renderedComponent, component, updateMillis = 17 )

Automatically updates the rendered component every updateMillis milliseconds. Default is 17 milliseconds (1 second / 60 frames per second rounded up to 17).

## s.version
### number s.version ( )

Returns Sling version number represented as a float.

## s.textNode
### string s.textNode( text )

Create a text node.

## s.route
### void s.route ( hashUrlRegEx, { component: object, root: element })

Define a hash-based route that will replace root element's content with the specified component on route action.

## s.route
### s.route ( hashUrl )

Navigate to the hash-based route according to a previosuly defined route.

## s.getRouteSegments 
## string[] s.getRouteSegments ( )

Returns the current hash-based route's segments or empty array if there are none.
