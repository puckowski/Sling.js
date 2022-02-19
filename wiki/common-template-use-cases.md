For an Angular ```*ngIf``` or Vue ```v-if``` equivalent, use the following as an example:

```javascript
children: [
    ...(getState().showGreeting === true ? [textNode('Hello, world!')] : []),
]
```

For an Angular ```*ngFor``` or Vue ```v-for``` equivalent, use the following as an example:

```javascript
children: [
    ...Array.from(this.mineMap, (row) =>
        markup('tr', {                         
        })
    )
]
```

For an alternative to Angular's ```*ngFor``` or Vue's ```v-for```, use the following as an example:

```javascript
view() {
    return markup('h1', {
        attrs: {
            id: 'divRouterOutlet'
        },
	children: [
            ...this.list.map(i => {
                return markup('p', {
                    children: [
                        textNode(i)
                    ]
                })
            })
	]
    });
}
```

To conditionally apply an attribute to an element, use the following as an example:

```javascript
markup('td', {
    attrs: {
        ...col.clicked === true && { class: 'clicked' },
    },
    children: [
        textNode('Hello, world!')
    ]
})
```

For two-way binding, use the following as an example:

```javascript
updateUsername(event) {
    this.usernameControl.setValue(event.target.value);
}

view() {
    return markup('input', {
        attrs: {
            oninput: this.updateUsername.bind(this),
            value: this.usernameControl.getValue()
        }
    })
}
```