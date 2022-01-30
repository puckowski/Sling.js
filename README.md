![Sling update history](https://github.com/puckowski/Sling.js/blob/master/src/images/Sling_Update_History.png "Sling update history")

# Sling

Sling is a client-side JavaScript framework for building Single Page Applications (SPAs). Sling is lightweight, **12KB minified, and less than 4KB gzipped**.

Sling creates and uses an Incremental DOM to perform differential updates for fast rendering.

Sling has an automatic change detection mechanism which updates your components for you.

Sling is structured using ECMAScript modules so that Sling code is tree shakeable to ultimately reduce bundle sizes.

See: [slingjs.org](slingjs.org)

## Goals

__Next Billion Users (NBUs)__
Empower developers to create SPAs for the NBUs of the web. The NBUs tend to use more affordable and less powerful devices. These devices struggle to achieve a two second Time to Interactive (TTI) with larger component libraries and frameworks.

__Practical__
Familiarity with other JavaScript component libraries. Components are instantiated objects which may be used to control their own state. Components have a simple markup language with a gradual learning curve.

__Generalized__
API as unopinionated as possible. Developers choose the right design patterns for their SPAs—not the library.

__Fast__
High performance. Sling aims to get your SPA to interactive as quickly as possible and aims to keep your SPA as responsive as possible by staying within small code production budgets. With Sling, it should be easier for your SPA to run at 60 frames per second for a native application experience.

__Minimal Setup__
Simply import the Sling functions required by your SPA and Sling is ready to use. No configuration files and no hidden requirements.

## Testing

Run ```npm run devServer``` after a ```npm install``` to start ```webpack-dev-server```.

Then navigate to ```localhost:8080/todo.html```.

## Performance (Time)

Because Sling is so lightweight, it can render thousands more nodes than Angular can in the same time period. Both test applications were served using the ```local-web-server``` NPM package.

| Version                          |Number of nodes created |Average time       |Nodes per ms |
|----------------------------------|------------------------|-------------------|-------------|
|Sling Core 10.1.0                 |1,000                   |37.195ms           |26.885       |
|Mithril.js 2.0.4                  |1,000                   |39.312ms           |25.437       |
|Angular 10.1.6                    |1,000                   |165.810ms          |6.030        |

Sling.js creates nodes **8.173** times faster than Angular.

The above nodes were ```<p>``` tags containing strings generated by the following simple function:

```javascript
for (let i = 0; i < 1000; ++i) {
    const value = i / 100;
    let str = val.toString(36).substring(7);
    this.data.push(str);
}
```

| Version                                                 |Number of nodes changed |Average time       |Nodes per ms |
|---------------------------------------------------------|------------------------|-------------------|-------------|
|Sling Core 10.1.0                                        |1,000                   |17.197ms           |58.149       |
|Mithril.js 2.0.4                                         |1,000                   |23.600ms           |42.372       |
|Angular 10.1.6                                           |1,000                   |362.536ms          |2.758        |

Sling.js changes nodes **21.263** times faster than Angular in automatic change detection mode.

The above nodes were ```<p>``` tags containing strings generated by the following simple function:

```javascript
for (let i = 0; i < 1000; ++i) {
    const value = i / 50;
    let str = val.toString(36).substring(4);
    this.data.push(str);
}
```

## Performance (Network)

|Version                                  |Requests  |Total      |
|-----------------------------------------|----------|-----------|
|Sling Core 10.1.1                        |1         |7.9KB      |
|Mithril.js 2.0.4                         |1         |26.7KB     |
|Angular 10.1.6                           |3         |143.00KB   |

## Add Sling

To add Sling to your project, simply import the Sling function required by your application.

Below is an example of Sling import statements:

```javascript
import { setState, mount, setDetectionStrategy, addRoute } from './sling';
import { Observable } from './sling-reactive';
import { slGet } from './sling-xhr';
```

## Compatibility

Sling uses ES2015/ES6 syntax. Sling does not have any production dependencies.

## Components

A component is a JavaScript class with a ```view()``` function that returns markup to render.

Components may be nested, but lifecycle hooks for nested components will not be automatically called. This is done for performance reasons and to stay within production code budgets.

Example component:

```javascript
class HelloWorldComponent {
	constructor() {
	}

	view() {
		return markup('h1', {
			children: [
				textNode('Hello, world!')
			]
		});
	}
}
```

## Change Detection

Sling supports two change detection strategies: automatic and manual. The default mode is automatic.

|Strategy                                        |Description|
|------------------------------------------------|-----------|
|```s.CHANGE_STRATEGY_AUTOMATIC```|Automatically update components after browser events and requests. This is the default setting.|
|```s.CHANGE_STRATEGY_MANUAL```   |Manually update components after browser events and requests.|

Automatic change detection performs updates upon the following:
* All browser events (click, mouseover, keyup, etc.)
* ```setTimeout``` and ```setInterval```
* XMLHttpRequest and Fetch API requests

Automatic change detection does not perform updates upon the following:
* Websocket events
* IndexedDB callbacks

For versions of ```setTimeout``` and ```setInterval``` that do not trigger automatic change detection, use the following:
* ```s.DETACHED_SET_TIMEOUT()```
* ```s.DETACHED_SET_INTERVAL()```

For example:
```javascript
s.DETACHED_SET_TIMEOUT(() => {
    console.log('Hello, world!');
}, 0);
```

## Lifecycle Hooks

Components may specify up to three lifecycle hooks:
|Lifecycle Hook         |Triggers Change Detection|Timing                                     |
|-----------------------|-------------------------|-------------------------------------------|
|```slOnInit()```       |```false```              |Before the component's view function is called and before the component is mounted to the DOM.|
|```slOnDestroy()```    |```false```              |Before the component is removed from the DOM.|
|```slAfterInit()```    |```true```               |After the component is mounted to the DOM.|

Lifecycle hooks are executed for nested components returned by a component's view function.

```javascript
class NestedHookComponent {
	slOnInit() {
		console.log('Will be called after root component slOnInit hook.');
	}

	view() {
		return markup('div', {
			children: [
				textNode('Child component.')
			]
		});
	}
}

class RootComponent {
	slOnInit() {
		console.log('Will be called before view function of component is called.');
	}

	view() {
		return markup('div', {
			children: [
				textNode('Root component.'),
				new NestedHookComponent()
			]
		});
	}
}
```

## Directives

Structural directives modify interactions with the DOM layout.

|Directive            |Type      |Behavior                                                       |
|---------------------|----------|---------------------------------------------------------------|
|```useexisting```  |Structural|Create the element or, if it exists, use the existing element. |
|```onlychildren``` |Structural|Only perform change detection on element's children.           |
|```onlyself```     |Structural|Only perform change detection on the element and not children. |
|```trustchildren```|Structural|Render HTML string children.                                   |

Attribute directives change the appearance or behavior of a DOM element.

|Directive               |Type      |Behavior                                                           |
|------------------------|----------|-------------------------------------------------------------------|
|```slanimatedestroy```  |Attribute |Wait for CSS class animation to finish before removal from the DOM.|

Example directive usage:

```javascript
view() {
    return markup('div', {
        attrs: {
            id: 'divSheetContent'
        },
        children: [
            new SelectedPartHeaderComponent().view(),
            markup('div', {
                attrs: {
                    id: 'chartDiv',
                    sldirective: 'useexisting',
                    style: 'width: 90vw;'
                }
            })
        ]
    })
}
```

Another example of directive usage:

```javascript
view() {
    return markup('div', {
        attrs: {
            id: 'divnav',
        },
        children: [
            textNode('Select a route to navigate to.'),
            markup('button', {
                attrs: {
                    onclick: this.navigateToHydrate.bind(this)
                },
                children: [
                    textNode('Hydrate Route')
                ]
            }),
            markup('button', {
                attrs: {
                    onclick: this.navigateToRoot.bind(this)
                },
                children: [
                    textNode('Root Route')
                ]
            }),
            markup('div', {
                attrs: {
                    sldirective: 'trustchildren'
                    },
                children: [
                    textNode(this.ssrContent)
                ]
            })
        ]
    })
}
```

Another example of directive usage:

```javascript
view() {
    return markup('div', {
        attrs: {
        	...this.showhide !== true && { class: 'visible' }
        },
        children: [
            ...(this.hide === false ? [
                markup('h1', {
                    attrs: {
                        slanimatedestroy: 'hide'
                    },
                    children: [
                        textNode('Hello, world!'),
                        markup('button', {
                            attrs: {
                                onclick: this.hideTemplate.bind(this)
                            },
                            children: [
                                textNode('Hide')
                            ]
                        })
                    ]
                })
            ] : [
            ])
        ]
    });
}			
```

# Core API

## setState 
__void setState ( newStateObj )__

Set a new state object for SPA.

## getState
__object getState ( )__

Get the state object for SPA.

## markup
__object markup ( tagString, { attrs: {}, children: [] } )__

Returns markup object to render. May be mounted to DOM.

Example markup call:

```javascript
markup('div', {
	attrs: {
		style:  "width:50%;margin:auto;padding:1rem;"
	},
	children: [
		...Array.from(getState().getNotes(), (note) =>
			markup('div', {
				attrs: {
					class:  'input-group mb-3 animEnter',
					style:  'width:100%;'
				},
				children: [
				]
			})
		)
	]
});
```

## m
__object markup ( tagString, { attrs: {}, children: [] } )__

Terse alias for markup() function.

## textNode
__string textNode( text )__

Append a DOMString to a node.

Example textNode call:

```javascript
textNode('Click me!');
```

## mount
__element mount ( rootElementId, component, attachDetector = true )__

Mounts ```component``` on element with ID ```rootElementId``` in DOM.
Returns root element in DOM where ```component``` was added.

Mounted components replace the element with ```rootElementId``` to avoid an excessive DOM size. Mounted components must have the same root element ID as the element in the DOM they are attached to.

By default, the Sling change detector is attached for the mounted component. Setting ```attachDetector``` to ```false``` prevents the change detector from being attached to this component. There are two convenience constants for change detection which are as follows:

|Constant                        |Value      |
|--------------------------------|-----------|
|```s.CHANGE_DETECTOR_DETACHED```|```false```|
|```s.CHANGE_DETECTOR_ATTACHED```|```true``` |

## update
__void update ( rootElementId, component )__

Updates the component mounted at element with ID ```rootElementId```.

## version
__string version( )__

Returns Sling version number represented as a string.

Example:

```javascript
console.log(version()); // '10.1.1'
```

## resolveAll
__object resolveAll( promiseArray )__

Returns an object with data about settled Promises in the format:

```javascript
{ result: Promise Result | null, error: Error | null, status: 'fulfilled' | 'rejected' }
```

Example:

```javascript
const requestPromises = [
	fetch('todo.html'), 
	fetch('http://does-not-exist')
];

resolveAll(requestPromises).then((results) => {
    const successfulPromises = results.filter(p => p.status === 'fulfilled');
});
```

## hydrate
__element hydrate ( rootElementId, attachDetector = true )__

Attach event handlers to component on element with ID ```rootElementId``` in DOM.
Returns root element in DOM.

Sling will take over the static HTML sent by the server and manage change detection.

In order to correctly hydrate static HTML sent by the server, the static HTML of the root element must contain two attributes. First, an ID must be specified so Sling can locate the component for hydration. Second, the attribute ```slssrclass``` must be specified. The value of ```slssrclass``` should be the class name of the view which manages the component. The class identified by ```slssrclass``` should be defined on the ```window``` object, or defined on the value of ```this```.

Example:

```javascript
class TestSsrHydrateComponent1 {
    hydratedFunction() {
        const state = getState();
        state.ishydrated = true;
        setState(state);
    }

    view() {
        const state = getState();
        const isFuncCalled = state.ishydrated;

        return markup('div', {
            attrs: {
                id: 'testssrhydrate',
                slssrclass: 'TestSsrHydrateComponent1'
            },
            children: [
                markup('button', {
                    attrs: {
                        id: 'ssrTest2',
                        onclick: this.hydratedFunction.bind(this)
                    },
                    children: [
                        textNode('Test Hydrate')
                    ]
                }),
                markup('div', {
                    attrs: {
                        id: 'ssrTest1'
                    },
                    children: [
                        ...(isFuncCalled === true ? [
                            textNode('Hydrated function called.')
                        ] : [
                            textNode('SSR placeholder.')
                        ])
                    ]
                })
            ]
        })
    }
}
window.TestSsrHydrateComponent1 = TestSsrHydrateComponent1;

hydrate('testssrhydrate');
```

By default, the Sling change detector is attached for the mounted component. Setting ```attachDetector``` to ```false``` prevents the change detector from being attached to this component. There are two convenience constants for change detection which are as follows:

|Constant                        |Value      |
|--------------------------------|-----------|
|```s.CHANGE_DETECTOR_DETACHED```|```false```|
|```s.CHANGE_DETECTOR_ATTACHED```|```true``` |

## renderToString
__string renderToString( component )__

Renders a component into a HTML string.

Example:

```javascript
const compStr = renderToString(new LoginComponent());
```

# Core Router API

## addRoute
__void addRoute ( hashUrlRegEx, { root: elementId, routeObj: object })__

Define a hash-based route that will replace element with ID ```elementId```'s content with the specified component on route action.

Below is a list of possible ```routeObj``` properties:

|Property          |Description                                                                                                                          |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------|
|root              |The ```id``` of the element to replace on route.                                                                                     |
|component         |The component to replace ```root```.                                                                                                 |
|onCanDeactivate   |A function that returns true if the current route may be navigated away from. Called before onActivationCheck.                       |
|onActivationCheck |A function that returns true if route action may be taken, otherwise false.                                                          |
|onActivationFail  |Object with ```route``` property to route to on ```onActivationCheck``` fail. Also may specify ```params``` and ```attachDetector```.|
|onBeforeRoute     |Function to execute before taking route action. Called after onActivationCheck and before the route action is taken.                 |

Example route definition:

```javascript
addRoute('all', { component:  new  TodoListComponent(), root:  'divTodoList' });
addRoute('completed', { component:  new  TodoListCompletedComponent(), root:  'divTodoList' });
addRoute('user/:userId', { component: new UserProfileComponent(), root: 'divUserProfile' });
addRoute('.*', { component: new DefaultRouteComponent(), root: 'divRouterOutlet' });
```

Note: Use '.*' for the default route. Routes are checked in the order they are registered with addRoute.

Example ```onActivationCheck``` definition:

```javascript
route('completed', { component:  new  TodoListCompletedComponent(), root:  'divTodoList', onActivationCheck: function(proposedRoute) { console.log('This will prevent route to \'completed\'.'); return false; }, onActivationFail: { route: 'all', params: { } } });
```

## route
__object route ( hashUrl, params = { }, attachDetector = true )__

Navigate to the hash-based route according to a previously defined route. May specify route parameters as an object. Returns the component that was routed to.

By default, the Sling change detector is attached for the mounted component. Setting ```attachDetector``` to ```false``` prevents the change detector from being attached to this component.

Example route call:

```javascript
route('user/5'); // Activates component at root for route 'user/:userId'
```

## removeRoute
__void removeRoute ( hashUrlRegEx )__

Remove a route from the Sling router.

Example:

```javascript
removeRoute('user/:userId');
```

## getRoute
__void getRoute ( )__

Get the current hash-based route.

## getRouteSegments 
__string[] getRouteSegments ( )__

Returns the current hash-based route's segments or an empty array if there are none.

Example:

```javascript
console.log(getRouteSegments()); // [ 'user', '5' ]
```

Using Sling Reactive, route changes may be listened to by using a Sling Observable. Every time the route changes, the subscribed function below will be called.

```javascript
let routeObservable = Observable(getRouteSegments());
routeObservable.subscribe(function(routeArr) {
    if (routeArr.length > 0) {
        this.primaryRoute = routeArr[0];
    }
    else {
        this.primaryRoute = '';
    }
}.bind(this));
```

## getRouteParams
__object getRouteParams ( )__

Returns the current route's parameters as an object. Returns ```{ }``` if there are none.

# Core Change Detection API

## setDetectionStrategy
__void setDetectionStrategy ( newDetectionStrategy )__

Set the new change detection strategy.

## detectChanges
__void detectChanges ( eleId )__

Trigger automatic change detection immediately. If eleId is undefined or null, change detection will be performed on all components.

## isDetectorAttached
__boolean isDetectorAttached ( eleId )__

Returns true if Sling change detector is attached for the given element ID ```eleId```.

## detachDetector
__void detachDetector ( eleId )__

Detach the Sling change detector for the given element ID ```eleId```.

## wrapWithChangeDetector
__function wrapWithChangeDetector ( funcToWrap )__

Wrap a function ```funcToWrap``` with a change detector call, so every time the function is called change detection is also run.

# XHR API

## slRequest
__Promise slRequest ( url, methodString, optionsObject = { } )__

Create a XML HTTP Request (XHR) for the specified URL using the specified method, such as ```GET```. Returns a Promise.

|Request Option    |Default                |Detail                                      |
|------------------|-----------------------|--------------------------------------------|
|contentType       |```application/json``` |Set ```Content-Type``` request header.      |
|body              |```''```               |Body of the request.                        |
|withCredentials   |```false```            |Send cookies to 3rd party domains.          |
|timeout           |```0```                |0 is no timeout. Specified in milliseconds. |
|headers           |```{}```               |Key/value request headers to set.           |
  
On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## slRequestWithBody
__Promise slRequestWithBody ( url, methodString, bodyObject = { } )__

Create a XML HTTP Request (XHR) for the specified URL using the specified method, such as ```GET```, with the specified body object. Returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## slGet
__Promise slGet ( url, data = { } )__

Create a ```GET``` XHR request with the specified ```data``` which returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## slPost
__Promise slPost ( url, data = { } )__

Create a ```POST``` XHR request with the specified ```data``` which returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## slPut
__Promise slPut ( url, data = { } )__

Create a ```PUT``` XHR request with the specified ```data``` which returns a Promise.
On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## slPatch
__Promise slPatch ( url, data = { } )__

Create a ```PATCH``` XHR request with the specified ```data``` which returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

## slDelete
__Promise slDelete ( url, data = { } )__

Create a ```DELETE``` XHR request with the specified ```data``` which returns a Promise.

On success, returns XMLHttpRequest which has data in ```response``` property like so:

```
XMLHttpRequest 
{
	onabort:  null
	onerror:  null
	onload:  null
	onloadend:  null
	onloadstart:  null
	onprogress:  null
	onreadystatechange:  ƒ ()
	ontimeout:  null
	readyState:  4
	response:  "[↵ {↵ "userId": 1,↵ "id": 1,↵ "title": ""
	...
}
```

On request fail, returns an object in the following format:
```
{
	status: 404,
	statusText: ''
}
```

# Reactive API

## Stream
__object Stream( )__

Returns a Sling stream. A stream is a sequence of values over time and the associated operations which are automatically applied as those values change.

Example stream usage using Sling XHR API:

```javascript
slGet('https://jsonplaceholder.typicode.com/posts').then(xhrResp => {
	let postArr = JSON.parse(xhrResp.response);
	let postStream = Stream().from(postArr).transform(function(arr) {
		return arr.filter(v => v.userId === 1);
	}).transform(function(arr) {
		return arr.filter(v => v.body.includes('quo'));
	});
});
```

Equivalent stream usage using preexisting stream object and Sling XHR API:

```javascript
let postStream2 = Stream();
postStream2.transform(function(arr) {
	return arr.filter(v => v.userId === 1);
}).transform(function(arr) {
	return arr.filter(v => v.body.includes('quo'));
});

slGet('https://jsonplaceholder.typicode.com/posts').then(xhrResp => {
	let postArr = JSON.parse(xhrResp.response);
	postArr.forEach(post => {
		postStream2.push(post);
	});
});
```

## Stream Functions

## push
__object push( value )__

Push a value onto a stream. All transformers automatically called. Transformers are only applied on new data. Returns the stream.

## transform
__object transform ( function(arrayData) { } )__

Add a new transformer to stream. Is automatically applied to all existing and new data. Returns the stream.

## subscribe
__object subscribe( function(arrayData) { } )__

Add a function that is automatically called when the underlying stream data changes. Returns the stream.

## getHasSubscription
__boolean getHasSubscription( functionToCheck )__

Check if ```functionToCheck``` is in the list of subscribed functions. Returns true if ```functionToCheck``` is in the list, false otherwise.

## clearSubscription
__object clearSubscription( functionToClear )__

Remove ```functionToClear``` from the list of subscribed functions. Returns the stream.

## clearSubscriptions
__object clearSubscriptions( )__

Remove all subscribed functions. Returns the stream.

## call
__object call ( function(arrayData) { } )__

Call a function which operates on the stream's data. Returns the stream.

## getData
__[ ] getData( )__

Returns a copy of stream array data.

## clearTransformers
__object clearTransformers( )__

Clears all transformers acting on the stream. Data will remain in state of last transformation. Returns the stream.

## from
__object from ( newArray )__

Set stream data to ```newArray``` and apply all existing transformers. Returns the stream.

## Observable
__object observable( array )__

Returns a Sling observable. An observable is an array which may be listened to.

Example observable usage:

```javascript
let myArray = [1, 2, 3];
let myObservable = Observable(myArray);
myObservable.subscribe(function(arr) {
	console.log('New length: ' + arr.length);
});

myObservable.getData().push(4);
obs.getData()[myObservable.getData().length] = 5;
```

## Observable Functions

## subscribe
__void subscribe ( listenerFunction )__

Listener function will be automatically called whenever the underlying array data changes. Returns the observable.

## getHasSubscription
__boolean getHasSubscription( functionToCheck )__

Check if ```functionToCheck``` is in the list of subscribed functions. Returns true if ```functionToCheck``` is in the list, false otherwise.

## clearSubscription
__object clearSubscription( functionToClear )__

Remove ```functionToClear``` from the list of subscribed functions. Returns the observable.

## clearSubscriptions
__object clearSubscriptions( )__

Remove all subscribed functions. Returns the observable.

## getData
__[ ] getData( )__

Get the underlying array data.

## BehaviorSubject
__object BehaviorSubject( value )__

Returns a Sling behavior subject. A behavior subject is a value that emits changes to subscribers.

Example behavior subject usage:

```javascript
let subject = BehaviorSubject(5);
subject.next(subject.getData() + 1);
let value = subject.getData(); // 6

subject.subscribe(function (value) { console.log('Value: ' + value); });
```

## BehaviorSubject Functions

## subscribe
__void subscribe ( listenerFunction )__

Listener function will be automatically called whenever the subject's value changes. Returns the behavior subject.

## getHasSubscription
__boolean getHasSubscription( functionToCheck )__

Check if ```functionToCheck``` is in the list of subscribed functions. Returns true if ```functionToCheck``` is in the list, false otherwise.

## clearSubscription
__object clearSubscription( functionToClear )__

Remove ```functionToClear``` from the list of subscribed functions. Returns the behavior subject.

## clearSubscriptions
__object clearSubscriptions( )__

Remove all subscribed functions. Returns the behavior subject.

## next
__object next( value )__

Set the next value of the subject. All subscribers are automatically called. Returns the behavior subject.

## getData
__primitive|object getData( )__

Get the underlying value.

## FormControl
__object FormControl( initialValue )__

Returns a Sling form control. A form control is a value checked by attached validation functions that emits changes to subscribers.

Example form control usage:

```javascript
const formControl = FormControl(200);

const validatorFn1 = (val) => {
	if (!isNaN(val) && isFinite(val)) {
    	return null;
    } else {
    	return { nonNumeric: true };
    }
}

formControl.setValidators([validatorFn1, validatorFn2]);

formControl.getValueChanges().subscribe((value) => {
	console.log(value);
});

const valid = formControl.getValid() === true;
const pristine = formControl.getPristine() === true;
const errors = formControl.getErrors();

formControl.setValue(2);
```

## FormControl Functions

## getValue
__any getValue ( )__

Get the current value of the form control.

## getValid
__boolean getValid ( )__

Get the current validity status of the form control.

## getDirty
__boolean getDirty ( )__

Returns true if the form control value has been changed.

## getPristine
__boolean getPristine ( )__

Returns true if the form control value has not been changed.

## getErrors
__object[] getErrors ( )__

Returns the list of error objects.

## getError
__object getError ( errorKey )__

Return the error object identified by the given key, it it exists. Null otherwise.

## getValueChanges
__BehaviorSubject getValueChanges ( )__

Returns the value changes BehaviorSubject which may be subscribed to on form control value change.

## setValue
__void setValue ( newValue )__

Sets the new value of the form control.

## setPristine
__void setPristine ( )__

Sets the form control as pristine.

## setValidators
__void setValidators ( validatorFnList )__

Sets the validator functions of the form control. Each function accepts a value and returns null if valid or an object with a key.
