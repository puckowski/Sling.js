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
__element s.mount ( rootElementId, component, attachDetector = true )__

Mounts ```component``` on element with ID ```rootElementId``` in DOM.
Returns root element in DOM where ```component``` was added.

Mounted components replace the element with ```rootElementId``` to avoid an excessive DOM size. Mounted components must have the same root element ID as the element in the DOM they are attached to.

By default, the Sling change detector is attached for the mounted component. Setting ```attachDetector``` to ```false``` prevents the change detector from being attached to this component. There are two convenience constants for change detection which are as follows:

|Constant                        |Value      |
|--------------------------------|-----------|
|```s.CHANGE_DETECTOR_DETACHED```|```false```|
|```s.CHANGE_DETECTOR_ATTACHED```|```true``` |

## s.update
__void s.update ( rootElementId, component )__

Updates the component mounted at element with ID ```rootElementId```.

## s.addRoute
__void s.addRoute ( hashUrlRegEx, { root: elementId, routeObj: object })__

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

## s.route
__object s.route ( hashUrl, params = { } )__

Navigate to the hash-based route according to a previously defined route. May specify route parameters as an object. Returns the component that was routed to.

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

## s.getRouteParams
__object s.getRouteParams ( )__

Returns the current route's parameters as an object. Returns ```{ }``` if there are none.

## s.setDetectionStrategy
__void s.setDetectionStrategy ( newDetectionStrategy )__

Set the new change detection strategy.

## s.detectChanges
__void s.detectChanges ( )__

Trigger automatic change detection immediately.

## s.isDetectorAttached
__boolean s.isDetectorAttached ( eleId )__

Returns true if Sling change detector is attached for the given element ID ```eleId```.

## s.detachDetector
__void s.detachDetector ( eleId )__

Detach the Sling change detector for the given element ID ```eleId```.

## s.version
__string s.version__

Returns Sling version number represented as a string.

Example:

```javascript
console.log(s.version); // '1.9.1'
```
