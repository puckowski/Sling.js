
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
