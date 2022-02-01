Sling.js is best used in conjunction with the Model-View-ViewModel (MVVM) architectural pattern where the class instance of a component is the ViewModel.

A component class may store a copy of a model or retrieve a model via the ```getState``` function. A component class may then manipulate the values of the model, optionally assigning a new state via the ```setState``` function, and the change detection mechanism of Sling.js will automatically update the view.

The following is an example component:
```javascript
class HelloWorldComponent {
	constructor() {
                this.data = {
                        greeting: 'Hello, world!'
                };
	}

        changeGreeting() {
                this.data.greeting = 'Hola, mundo!';
        }

	view() {
		return markup('div', {            
			children: [
                                markup('h1', {
                                        children: [
				                textNode(this.data.greeting)
                                        ]
                                }),
                                markup('button', {
                                        attrs: {
                                                onclick: this.changeGreeting.bind(this)
                                        },
                                        children: [
                                                textNode('Change Greeting')
                                        ]
                                })
			]
		});
	}
}
```

Note that the above ```HelloWorldComponent``` manipulates a model when the correspondingly changes the view upon click of the ```Change Greeting``` button.