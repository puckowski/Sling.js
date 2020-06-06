![Sling logo](https://github.com/puckowski/Sling.js/blob/master/src/images/sling.png "Sling logo")

# Sling

Sling is a client-side JavaScript framework for building Single Page Applications (SPAs). Sling is lightweight and **less than 3.0KB minified**.

Sling creates and uses a virtual DOM to perform differential updates for fast rendering.

Sling has an automatic change detection mechanism which updates your components for you.

Sling is structured using ECMAScript modules so that it is tree shakeable to reduce bundle sizes.

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

The V8 JavaScript engine can compile and parse the entire minified distributed of Sling in 4 milliseconds. Sling Core 1.0 is compiled and parsed 10.5 times faster than a minimal Angular 9.0.0 project and 13.5 times faster than a normal Angular 9.0.0 project.

|Version                                 |Compile   |Parse     |Total     |
|----------------------------------------|----------|----------|----------|
|Sling Core 1.0 (Routing included)       |1ms       |3ms       |4ms       |
|Sling Core + XHR 1.0 (Routing included) |2ms       |4ms       |6ms       |
|Angular 9.0.0 Minimal (w/Routing)       |27ms      |15ms      |42ms      |
|Angular 9.0.0 (w/Routing)               |30ms      |24ms      |54ms      |
|Angular 9.0.0 (w/Routing and HttpClient)|30ms      |26ms      |56ms      |

Because Sling is so lightweight, it can render thousands more nodes than Angular can in the same time period. Both test applications were served using the ```http-server``` NPM package.

| Version                          |Number of nodes |Time   |Nodes per ms |
|----------------------------------|----------------|-------|-------------|
|Sling Core 1.0 (Routing included) |10,000          |27ms   |370.3        |
|Angular 9.0.0 Minimal (w/Routing) |10,000          |294ms  |34.0         |

## Performance (Network)

Using simulated 3G network speeds, Sling Core 1.0 with routing and XHR loads 3.2 times faster than a minimal Angular 9.0.0 project and 3.62 times faster than an Angular 9.0.0 project with HttpClient.

|Version                                  |Requests  |Async Time (3G network)|Total     |
|-----------------------------------------|----------|-----------------------|----------|
|Sling Core 1.0 (Routing included)        |1         |2.06s                  |2.86KB    |
|Sling Core + XHR 1.0 (Routing included)  |1         |2.06s                  |3.80KB    |
|Angular 9.0.0 Minimal (w/Routing)        |3         |6.59s                  |226.1KB   |
|Angular 9.0.0 (w/Routing)                |3         |7.18s                  |255.1KB   |
|Angular 9.0.0 (w/Routing and HttpClient) |3         |7.47s                  |270.1KB   |

## Add Sling

To add Sling to your project, simply import the Sling function required by your application.

Below is an example of Sling import statements:

```javascript
import { addRoute } from  './sling/core/sling-router';
import { setState, mount } from  './sling/core/sling';
import { setDetectionStrategy } from  './sling/core/sling-change';
import { Observable } from  '../../sling/reactive/sling-reactive';
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
		return s.markup('h1', {
			children: [
				s.textNode('Hello, world!')
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
* ```s.detachedSetTimeout()```
* ```s.detachedSetInterval()```

For example:
```javascript
s.detachedSetTimeout(() => {
    console.log('Hello, world!');
}, 0);
```

## Lifecycle Hooks

Components may specify up to three lifecycle hooks:
|Lifecycle Hook         |Triggers Change Detection|Timing                                     |
|-----------------------|-------------------------|-------------------------------------------|
|```slOnInit()```       |```false```              |Before the component is mounted to the DOM.|
|```slOnDestroy()```    |```false```              |Before the component is removed from the DOM.|
|```slAfterInit()```    |```true```               |After the component is mounted to the DOM.|

## Directives

Structural directives modify interactions with the DOM layout.

|Directive          |Type     |Behavior                                                       |
|-------------------|---------|---------------------------------------------------------------|
|```slUseExisting```|Structural|Create the element or, if it exists, use the existing element.|

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
s.markup('div', {
	attrs: {
		style:  "width:50%;margin:auto;padding:1rem;"
	},
	children: [
		...Array.from(s.getState().getNotes(), (note) =>
			s.markup('div', {
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

## textNode
### string textNode( text )

Create a text node.

Example textNode call:

```javascript
s.textNode('Click me!');
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

## initializeRouter
__ void initializeRouter ( )__

Explicitly initialize the router.

## addRoute
__void addRoute ( hashUrlRegEx, { root: elementId, routeObj: object })__

Define a hash-based route that will replace element with ID ```elementId```'s content with the specified component on route action.

Below is a list of possible ```routeObj``` properties:

|Property |Description                                                                |
|---------|---------------------------------------------------------------------------|
| root    |The ```id``` of the element to replace on route.                           |
|component|The component to replace ```root```.                                       |
|authGuard|A function that returns true if route action may be taken, otherwise false.|
|authFail |Object with ```route``` property to route to on ```authGuard``` fail. Also may specify ```params```.|

Example route definition:

```javascript
s.route('all', { component:  new  TodoListComponent(), root:  'divTodoList' });
s.route('completed', { component:  new  TodoListCompletedComponent(), root:  'divTodoList' });
s.route('user/:userId', { component: new UserProfileComponent(), root: 'divUserProfile' });
```

Example ```authGuard``` definition:

```javascript
s.route('completed', { component:  new  TodoListCompletedComponent(), root:  'divTodoList', authGuard: function(proposedRoute) { console.log('This will prevent route to \'completed\'.'); return false; }, authFail: { route: 'all', params: { } } });
```

## route
__object route ( hashUrl, params = { }, attachDetector = true )__

Navigate to the hash-based route according to a previously defined route. May specify route parameters as an object. Returns the component that was routed to.

By default, the Sling change detector is attached for the mounted component. Setting ```attachDetector``` to ```false``` prevents the change detector from being attached to this component.

Example route call:

```javascript
s.route('user/5'); // Activates component at root for route 'user/:userId'
```

## getRoute
__void getRoute ( )__

Get the current hash-based route.

## getRouteSegments 
__string[] getRouteSegments ( )__

Returns the current hash-based route's segments or an empty array if there are none.

Example:

```javascript
console.log(s.getRouteSegments()); // [ 'user', '5' ]
```

Using Sling Reactive, route changes may be listened to by using a Sling Observable. Every time the route changes, the subscribed function below will be called.

```javascript
let routeObservable = s.Observable(s.getRouteSegments());
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

## setDetectionStrategy
__void setDetectionStrategy ( newDetectionStrategy )__

Set the new change detection strategy.

## detectChanges
__void detectChanges ( )__

Trigger automatic change detection immediately.

## isDetectorAttached
__boolean isDetectorAttached ( eleId )__

Returns true if Sling change detector is attached for the given element ID ```eleId```.

## detachDetector
__void detachDetector ( eleId )__

Detach the Sling change detector for the given element ID ```eleId```.

## initializeChangeDetector
__ void initializeChangeDetector ( )__

Explicitly initialize the change detector.

## version
__string version__

Returns Sling version number represented as a string.

Example:

```javascript
console.log(s.version); // '2.0.6'
```

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
s.get('https://jsonplaceholder.typicode.com/posts').then(xhrResp => {
	let postArr = JSON.parse(xhrResp.response);
	let postStream = s.Stream().from(postArr).transform(function(arr) {
		return arr.filter(v => v.userId === 1);
	}).transform(function(arr) {
		return arr.filter(v => v.body.includes('quo'));
	});
});
```

Equivalent stream usage using preexisting stream object and Sling XHR API:

```javascript
let postStream2 = s.Stream();
postStream2.transform(function(arr) {
	return arr.filter(v => v.userId === 1);
}).transform(function(arr) {
	return arr.filter(v => v.body.includes('quo'));
});

s.get('https://jsonplaceholder.typicode.com/posts').then(xhrResp => {
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
let myObservable = s.Observable(myArray);
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
let subject = s.BehaviorSubject(5);
subject.next(subject.getData() + 1);
let value = subject.getData(); // 6

subject.subscribe(function (value) { console.log('Value: ' + value); });
```

## BehaviorSubject Functions

## subscribe
__void subscribe ( listenerFunction )__

Listener function will be automatically called whenever the subject's value changes. Returns the behavior subject.

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
