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
