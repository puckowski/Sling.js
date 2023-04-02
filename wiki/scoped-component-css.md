## Scoped CSS

Sling.js version 15.0.0 supports scoped CSS for components. 

Scoped CSS may be applied to a class by specifying a ```slStyle``` function which returns CSS. 

### Supported

- CSS Nesting Module (in supporting browsers https://caniuse.com/css-nesting)
- Container Queries (https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- Media Queries (https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- Layers (https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- Keyframe Animations (https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)

### Not Supported

- CSS imports are currently not supported (https://developer.mozilla.org/en-US/docs/Web/CSS/@import)

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
                        textNode('Styled nav')
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