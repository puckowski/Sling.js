Sling.js uses hyperscript to create views. Hyperscript is powerful as you have all the utility of JavaScript when composing your view.

There are two hyperscript functions in Sling.js, ```markup``` and ```m```, the latter of which is a terse alias for ```markup```.

The function signature for ```markup``` is as follows: ```object markup ( tagString, { attrs: {}, children: [] } )```.

* The ```tagString``` is the HTML element ```tagName``` of the element to be created. 
* The ```attrs``` object is a object where keys are HTML element attributes to set with the corresponding value. 
* The ```children``` array is the list of virtual nodes, or vnodes, to mount as children of the created element. 

The ```markup``` function returns the root element of the view for convenience.

The second argument of ```markup``` will default to ```{}``` if not provided. Both properties of the second argument need not be defined. 

* The default value of the ```attrs``` property is ```{}```. 
* The default value of the ```children``` property is ```[]```.

The following is an example ```markup``` call:

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