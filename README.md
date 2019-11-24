![Sling logo](https://github.com/puckowski/Sling.js/blob/master/src/images/sling.png "Sling logo")

# Sling

Sling is a client-side JavaScript framework for building Single Page Applications (SPAs). Sling is lightweight and less than 3KB minified.

Sling creates and uses a virtual DOM to perform differential updates for fast rendering.

## Goals

__Next Billion Users (NBUs)__
Empower developers to create SPAs for the NBUs of the web. The NBUs tend to use more affordable, less powerful devices which struggle to achieve less than 2 second Time to Interactive (TTI) with larger component libraries and frameworks.

__Practical__
Familiarity with other JavaScript component libraries. Components are instantiated objects which may be used to control their own state and have a simple markup language with a gradual learning curve.

__Generalized__
API as unopinionated as possible. Developers choose the right design patterns for their SPAs--not the library.

__Fast__
High performance. Sling aims to get your SPA to interactive as quickly as possible and aims to keep your SPA as responsive as possible by staying within small production code budgets. With Sling, it should be easier for your SPA to run at 60 frames per second for a native application experience.

__Minimal Setup__
Simply include Sling once in your SPA and Sling is ready to use. No configuration files and no hidden requirements.

## Building

Run ```npm install``` then ```npm run build``` or ```npm run buildProd``` to build the project.

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

## Compatibility

Sling uses ES2015/ES6 syntax. Sling does not have any production dependencies.

## Components

A component is a JavaScript class with a ```view()``` function that returns markup to render.

Components may be nested, but lifecycle hooks for nested components will not be automatically called. This is done for performance reasons and to stay within production code budgets.

Example component:

```
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

## Lifecycle Hooks

Components may specify two lifecycle hooks:
* ```slOnInit()```
* ```slOnDestroy()```

The ```slOnInit()``` lifecycle hook is called before the component is mounted to the DOM.
The ```slOnDestroy()``` lifecycle hook is called before the component is removed from the DOM.

# Core API

## s.setState 
__void s.setState ( newStateObj )__

Set a new state object for SPA.

## s.getState
__object s.getState ( )__

Get the state object for SPA.

## s.markup
__object s.markup ( tagString, { attrs: {}, children: [] } )__

Returns markup object to render. May be mounted to DOM.

Example markup call:

```
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

## s.textNode
### string s.textNode( text )

Create a text node.

Example textNode call:

```
s.textNode('Click me!');
```

## s.mount
__element s.mount ( rootElementId, component )__

Mounts ```component``` on element with ID ```rootElementId``` in DOM.
Returns root element in DOM where ```component``` was added.

## s.update
__void s.update ( rootElementId, component )__

Updates the component mounted at element with ID ```rootElementId```.

## s.autoUpdate
__void s.autoupdate ( rootElementId, component, updateMillis = 17 )__

Automatically updates ```component``` every ```updateMillis``` milliseconds. Default is 17 milliseconds (1 second / 60 frames per second rounded up to 17).

Example autoUpdate call:

```
s.autoUpdate('navTodoList', new TodoListNavComponent());
```

## s.clearAutoUpdate
__void s.clearAutoUpdate ( rootElementId )__

Clear the automatic update behavior of the element with ID ```rootElementId```.

## s.route
__void s.route ( hashUrlRegEx, { root: elementId, component: object })__

Define a hash-based route that will replace element with ID ```elementId```'s content with the specified component on route action.

Example route definition:

```
s.route('all', { component:  new  TodoListComponent(), root:  'divTodoList' });
s.route('completed', { component:  new  TodoListCompletedComponent(), root:  'divTodoList' });
s.route('user/:userId', { component: new UserProfileComponent(), root: 'divUserProfile' });
```

## s.route
__void s.route ( hashUrl )__

Navigate to the hash-based route according to a previously defined route.

Example route call:

```
s.route('user/5'); // Activates component at root for route 'user/:userId'
```

## s.getRoute
__void s.getRoute ( )__

Get the current hash-based route.

## s.getRouteSegments 
__string[] s.getRouteSegments ( )__

Returns the current hash-based route's segments or an empty array if there are none.

Example:

```
console.log(s.getRouteSegments()); // [ 'user', '5' ]
```

## s.version
__number s.version ( )__

Returns Sling version number represented as a float.

Example:

```
console.log(s.version()); // 1.0
```

# XHR API

## s.request
__Promise s.request ( url, methodString, optionsObject = { } )__

Create a XML HTTP Request (XHR) for the specified URL using the specified method, such as ```GET```. Returns a Promise.

|Request Option    |Default                |Detail                                      |
|------------------|-----------------------|--------------------------------------------|
|contentType       |```application/json``` |Set ```Content-Type``` request header.      |
|data              |```''```               |Body of the request.                        |
|withCredentials   |```false```            |Send cookies to 3rd party domains.          |
|timeout           |```0``` (No timeout)   |0 is no timeout. Specified in milliseconds. |
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

## s.get
__Promise s.get ( url, data = { } )__

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

## s.post
__Promise s.post ( url, data = { } )__

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

## s.put
__Promise s.put ( url, data = { } )__

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

## s.patch
__Promise s.patch ( url, data = { } )__

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

## s.delete
__Promise s.delete ( url, data = { } )__

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
