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

Components may be consumed by passing an instance of a class.

Example consumed component:

```javascript
class ConsumeClassComponent1 {
    view() {
        return new ConsumeClassComponent2();
    }
}
```

Another example of a consumed component:

```javascript
class TestNestedHookComponent1 {
    slOnInit() {
        const state = getState();
        state.rootOnInit2++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.rootAfterInit2++;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedhook',
            },
            children: [
                textNode('Root component markup.'),
                new TestNestedHookComponent2(),
                new TestNestedHookComponent4()
            ]
        })
    }
}
```