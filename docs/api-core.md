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

## textNode
### string textNode( text )

Create a text node.

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
route('all', { component:  new  TodoListComponent(), root:  'divTodoList' });
route('completed', { component:  new  TodoListCompletedComponent(), root:  'divTodoList' });
route('user/:userId', { component: new UserProfileComponent(), root: 'divUserProfile' });
```

Example ```authGuard``` definition:

```javascript
route('completed', { component:  new  TodoListCompletedComponent(), root:  'divTodoList', authGuard: function(proposedRoute) { console.log('This will prevent route to \'completed\'.'); return false; }, authFail: { route: 'all', params: { } } });
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

## s.VERSION
__string s.VERSION__

Returns Sling version number represented as a string.

Example:

```javascript
console.log(s.version); // '3.1.3'
```
