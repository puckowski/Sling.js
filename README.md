

![Sling logo](https://github.com/puckowski/Sling.js/blob/master/sling.png "Sling logo")

# Sling

Client-side JavaScript framework for building Single Page Applications. Sling is lightweight and less than 3KB minified.

Sling creates and uses a virtual DOM to perform differential updates for fast rendering.

## Building

```terser --compress --mangle --output .\dist\sling.min.js -- .\src\sling.js```

## Testing

Recommend NPM package http-server.

```
http-server -c-1 .
```

Then navigate to http://127.0.0.1:8080/index.html or
http://127.0.0.1:8080/todo.html

# Components

A component is a JavaScript class with a ```view()``` function that returns markup to render.

# Lifecycle Hooks

Components may specify two lifecycle hooks:
* ```slOnInit()```
* ```slOnDestroy()```

The ```slOnInit()``` lifecycle hook is called before the component is mounted to the DOM.
The ```slOnDestroy()``` lifecycle hook is called before the component is removed from the DOM.

# API

## s.setState 
__void s.setState ( newStateObj )__

Set a new state object for SPA.

## s.getState
__object s.getState ( )__

Get the state object for SPA.

## s.markup
__object s.markup ( tagString, { attrs: {}, children: [] } )__

Returns markup object to render. May be mounted to DOM.

## s.mount
__element s.mount ( rootElement, component )__

Mounts ```component``` on ```rootElement``` in DOM.
Returns root element in DOM where ```component``` was added.

## s.mountById
__element s.mountById ( rootElementId, elementToMount )__

Same as s.mount, but takes in an element ID as first parameter instead of the actual root element to mount to.
Returns root element in DOM where ```component``` was added.

## s.update
__void s.update ( rootElementId, component )__

Updates the component mounted at element with ID ```rootElementId```.

## s.autoUpdate
__void s.autoupdate ( rootElement, component, updateMillis = 17 )__

Automatically updates ```component``` every ```updateMillis``` milliseconds. Default is 17 milliseconds (1 second / 60 frames per second rounded up to 17).

## s.clearAutoUpdate
__void s.clearAutoUpdate ( rootElementId )__

Clear the automatic update behavior of the element with ID ```rootElementId```.

## s.version
__number s.version ( )__

Returns Sling version number represented as a float.

## s.textNode
### string s.textNode( text )

Create a text node.

## s.route
__void s.route ( hashUrlRegEx, { root: element, component: object })__

Define a hash-based route that will replace root ```element```'s content with the specified component on route action.

## s.route
__s.route ( hashUrl )__

Navigate to the hash-based route according to a previously defined route.

## s.getRouteSegments 
__string[] s.getRouteSegments ( )__

Returns the current hash-based route's segments or an empty array if there are none.
