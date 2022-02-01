Below is an example of fade in, drop down, and fade out animations using Sling attribute directions and CSS animations.

```javascript
<html>

<head>
    <script type="module">
        import { mount, textNode, markup } from 'https://cdn.skypack.dev/slingjs';

        class HelloWorldComponent {
            constructor() {
                this.welcomeHidden = false;
            }

            hideWelcome() {
                this.welcomeHidden = true;
            }

            view() {
                return markup('div', {
                    attrs: {
                        id: 'divRouterOutlet',
                        ...this.welcomeHidden !== true && { class: 'visible' },
                        style: 'display: flex; justify-content: center; align-items: center; height: 100%;'
                    },
                    children: [
                        ...(this.welcomeHidden === false ? [
                            markup('h1', {
                                attrs: {
                                    slanimatedestroy: 'hide',
                                },
                                children: [
                                    textNode('Hello, world!'),
                                    markup('button', {
                                        attrs: {
                                            onclick: this.hideWelcome.bind(this)
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
        }

        mount('divRouterOutlet', new HelloWorldComponent());
    </script>
    <style>
        .visible {
            animation: fadein 800ms ease-in-out;
        }

        .hide {
            animation: fadeout 800ms ease-in-out;
        }

        @keyframes fadein {
            from {
                opacity: 0;
                transform: translateY(-5%);
            }

            to {
                opacity: 1;
                transform: translateY(0%);
            }
        }

        @keyframes fadeout {
            from {
                opacity: 1;
                transform: translateY(0%);
            }

            to {
                opacity: 0;
                transform: translateY(100%);
            }
        }
    </style>
</head>

<body>
    <div id="divRouterOutlet"></div>
</body>

</html>
```