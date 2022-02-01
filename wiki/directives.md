Structural directives modify interactions with the DOM layout.

|Directive            |Type      |Behavior                                                       |
|---------------------|----------|---------------------------------------------------------------|
|```useexisting```  |Structural|Create the element or, if it exists, use the existing element. |
|```onlychildren``` |Structural|Only perform change detection on element's children.           |
|```onlyself```     |Structural|Only perform change detection on the element and not children. |
|```trustchildren```|Structural|Render HTML string children.                                   |

Attribute directives change the appearance or behavior of a DOM element.

|Directive               |Type      |Behavior                                                           |
|------------------------|----------|-------------------------------------------------------------------|
|```slanimatedestroy```  |Attribute |Wait for CSS class animation to finish before removal from the DOM.|

Example directive usage:

```javascript
view() {
    return markup('div', {
        attrs: {
            id: 'divSheetContent'
        },
        children: [
            new SelectedPartHeaderComponent().view(),
            markup('div', {
                attrs: {
                    id: 'chartDiv',
                    sldirective: 'useexisting',
                    style: 'width: 90vw;'
                }
            })
        ]
    })
}
```

Another example of directive usage:

```javascript
view() {
    return markup('div', {
        attrs: {
            id: 'divnav',
        },
        children: [
            textNode('Select a route to navigate to.'),
            markup('button', {
                attrs: {
                    onclick: this.navigateToHydrate.bind(this)
                },
                children: [
                    textNode('Hydrate Route')
                ]
            }),
            markup('button', {
                attrs: {
                    onclick: this.navigateToRoot.bind(this)
                },
                children: [
                    textNode('Root Route')
                ]
            }),
            markup('div', {
                attrs: {
                    sldirective: 'trustchildren'
                    },
                children: [
                    textNode(this.ssrContent)
                ]
            })
        ]
    })
}
```

Another example of directive usage:

```javascript
view() {
    return markup('div', {
        attrs: {
        	...this.showhide !== true && { class: 'visible' }
        },
        children: [
            ...(this.hide === false ? [
                markup('h1', {
                    attrs: {
                        slanimatedestroy: 'hide'
                    },
                    children: [
                        textNode('Hello, world!'),
                        markup('button', {
                            attrs: {
                                onclick: this.hideTemplate.bind(this)
                            },
                            children: [
                                textNode('Hide')
                            ]
                        })
                    ]
                })
            ] : [
            ])
        ]
    });
}			
```