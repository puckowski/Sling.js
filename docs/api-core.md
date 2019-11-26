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

## s.textNode
### string s.textNode( text )

Create a text node.

Example textNode call:

```javascript
s.textNode('Click me!');
```

## s.mount
__element s.mount ( rootElementId, component )__

Mounts ```component``` on element with ID ```rootElementId``` in DOM.
Returns root element in DOM where ```component``` was added.

Mounted components replace the element with ```rootElementId``` to avoid an excessive DOM size. Mounted components must have the same root element ID as the element in the DOM they are attached to.

## s.update
__void s.update ( rootElementId, component )__

Updates the component mounted at element with ID ```rootElementId```.

## s.autoUpdate
__void s.autoupdate ( rootElementId, component, updateMillis = 17 )__

Automatically updates ```component``` every ```updateMillis``` milliseconds. Default is 17 milliseconds (1 second / 60 frames per second rounded up to 17).

Example autoUpdate call:

```javascript
s.autoUpdate('navTodoList', new TodoListNavComponent());
```

## s.clearAutoUpdate
__void s.clearAutoUpdate ( rootElementId )__

Clear the automatic update behavior of the element with ID ```rootElementId```.

## s.route
__void s.route ( hashUrlRegEx, { root: elementId, component: object })__

Define a hash-based route that will replace element with ID ```elementId```'s content with the specified component on route action.

Example route definition:

```javascript
s.route('all', { component:  new  TodoListComponent(), root:  'divTodoList' });
s.route('completed', { component:  new  TodoListCompletedComponent(), root:  'divTodoList' });
s.route('user/:userId', { component: new UserProfileComponent(), root: 'divUserProfile' });
```

## s.route
__void s.route ( hashUrl )__

Navigate to the hash-based route according to a previously defined route.

Example route call:

```javascript
s.route('user/5'); // Activates component at root for route 'user/:userId'
```

## s.getRoute
__void s.getRoute ( )__

Get the current hash-based route.

## s.getRouteSegments 
__string[] s.getRouteSegments ( )__

Returns the current hash-based route's segments or an empty array if there are none.

Example:

```javascript
console.log(s.getRouteSegments()); // [ 'user', '5' ]
```

## s.version
__number s.version ( )__

Returns Sling version number represented as a float.

Example:

```javascript
console.log(s.version()); // 1.0
```
