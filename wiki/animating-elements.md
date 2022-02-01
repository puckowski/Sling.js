The following is an example of how to animate DOM elements when they are added and when they are removed from the DOM using the attribute directive ```slanimatedestroy```.

```javascript
<html>

<head>
    <script type="module">
        import { mount, textNode, markup, getState, setState } from 'https://cdn.skypack.dev/slingjs';

        class HelloWorldComponent {
            constructor() {
                this.hide = false;
            }

            slOnInit() {
            }

            slOnDestroy() {
                this.hide = true;
            }

            hideTemplate() {
                this.hide = true;
            }

            view() {
                return markup('div', {
                    attrs: {
                        id: 'divRouterOutlet',
                        ...this.hide !== true && { class: 'visible' }
                    },
                    children: [
                        ...(this.hide === false ? [
                            markup('h1', {
                                attrs: {
                                    slanimatedestroy: 'hide',
                                },
                                children: [
                                    textNode('Hello, world!'),
                                    markup('button', {
                                        attrs: {
                                            onclick: this.hideTemplate.bind(this)
                                        },
                                        children: [
                                            textNode('hide')
                                        ]
                                    })
                                ]
                            })

                        ] : [
                        ])
                    ]
                });
            }
        }

        mount('divRouterOutlet', new HelloWorldComponent());
    </script>
    <style>
        .visible {
            animation: fadein 2s;
        }

        .hide {
            animation: fadeout 2s;
        }

        @keyframes fadein {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        @keyframes fadeout {
            from {
                opacity: 1;
            }

            to {
                opacity: 0;
            }
        }
    </style>
</head>

<body>
    <div id="divRouterOutlet"></div>
</body>

</html>
```