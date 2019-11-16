

![Sling logo](https://github.com/puckowski/Sling.js/blob/master/sling.png "Sling logo")

# Sling

Client-side JavaScript framework for building Single Page Applications. Sling is lightweight and less than 3KB minified.

## Building

```terser --compress --mangle --output .\dist\sling.min.js -- .\src\sling.js```

## Testing

Recommend NPM package http-server.

```
http-server -c-1 .
```

Then navigate to http://127.0.0.1:8080/index.html

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
### void s.setState ( newStateObj )

Set a new state object for SPA.

## s.getState
### object s.getState ( )

Get the state object for SPA.

## s.markup
### object s.markup ( tagString, { attrs: {}, children: [] } )

Returns markup object to render. May be mounted to DOM.

## s.mount
### element s.mount ( rootElement, component )

Mounts ```component``` on ```rootElement``` in DOM.
Returns root element in DOM where ```component``` was added.

## s.mountById
### element s.mount ( rootElementId, elementToMount )

Same as s.mount, but takes in element ID as first parameter instead of the actual root element to mount to.
Returns root element in DOM where ```component``` was added.

## s.update
### void s.update ( rootElement, component )

Updates the component mounted at ```rootElement```.

## s.autoUpdate
### void s.autoupdate ( rootElement, component, updateMillis = 17 )

Automatically updates ```component``` every ```updateMillis``` milliseconds. Default is 17 milliseconds (1 second / 60 frames per second rounded up to 17).

## s.version
### number s.version ( )

Returns Sling version number represented as a float.

## s.textNode
### string s.textNode( text )

Create a text node.

## s.route
### void s.route ( hashUrlRegEx, { component: object, root: element })

Define a hash-based route that will replace root element's content with the specified component on route action.

## s.routeById
### void s.routeById ( hashUrlRegEx, { component: object, root: elementId })

Define a hash-based route that will replace root element's content with the specified component on route action.

## s.route
### s.route ( hashUrl )

Navigate to the hash-based route according to a previously defined route.

## s.getRouteSegments 
### string[] s.getRouteSegments ( )

Returns the current hash-based route's segments or empty array if there are none.
