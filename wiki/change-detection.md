## Change Detection

Sling supports two change detection strategies: automatic and manual. The default mode is automatic.

|Strategy                                        |Description|
|------------------------------------------------|-----------|
|```s.CHANGE_STRATEGY_AUTOMATIC```|Automatically update components after browser events and requests. This is the default setting.|
|```s.CHANGE_STRATEGY_MANUAL```   |Manually update components after browser events and requests.|

Automatic change detection performs updates upon the following:
* All browser events (click, mouseover, keyup, etc.)
* ```setTimeout``` and ```setInterval```
* XMLHttpRequest and Fetch API requests

Automatic change detection does not perform updates upon the following:
* Websocket events
* IndexedDB callbacks

For versions of ```setTimeout``` and ```setInterval``` that do not trigger automatic change detection, use the following:
* ```s.DETACHED_SET_TIMEOUT()```
* ```s.DETACHED_SET_INTERVAL()```

For example:
```javascript
s.DETACHED_SET_TIMEOUT(() => {
    console.log('Hello, world!');
}, 0);
```

For functions bound in model views that do not trigger change detection, but are run in automatic change detection mode, start the function name with case-sensitive ```slDetached```. Below is an example of a detached ```slDetachedIncrementCount``` function that does not trigger change detection when run.

```javascript
export class TestDetachedFunctionComponent {
    constructor() {
        this.count = 0;
    }

    slDetachedIncrementCount() {
        this.count++;
    }

    view() {
        return markup('div', {
            attrs: {
                'id': 'divDetachedExample'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.slDetachedIncrementCount.bind(this),
                    },
                    children: [
                        textNode('Detached Button')
                    ]
                })
            ]
        })
    }
}
```
