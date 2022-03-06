## Scoped CSS

Sling.js version 15.0.0 supports scoped CSS for components. 

Scoped CSS may be applied to a class by specifying a ```slStyle``` function which returns CSS. Note that CSS imports are currently not supported.

```javascript
class ExampleScopedStyleComponent {
    constructor() {
    }

    slStyle() {
        return 'div a[target="_blank"], nav { background-color: #cacaca; } kbd { background-color: #cacaca; }';
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divslstyle4'
            },
            children: [
                markup('a', {
                    attrs: {
                        target: "_blank"
                    },
                    children: [
                        textNode('Styled a')
                    ]
                }),
                markup('nav', {
                    children: [
                        textNode('Unstyled nav')
                    ]
                }),
                markup('kbd', {
                    children: [
                        textNode('Tab')
                    ]
                })
            ]
        })
    }
}
```
