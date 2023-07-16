## Directives

Structural directives modify interactions with the DOM layout.

|Directive            |Type      |Behavior                                                       |
|---------------------|----------|---------------------------------------------------------------|
|```useexisting```  |Structural|Create the element or, if it exists, use the existing element.    |
|```onlychildren``` |Structural|Only perform change detection on element's children.              |
|```onlyself```     |Structural|Only perform change detection on the element and not children.    |
|```trustchildren```|Structural|Render HTML string children.                                      |
|```slfor```        |Structural|Render a named list using a node factory and an update function.  |
|```slfornamed```        |Structural|Render a named list using a node factory and an update function. This directive may be used instead of ```slfor``` where function names are minified in builds.  |
|```slref```     |Structural|Store the DOM node reference in the component variable name.         |

Attribute directives change the appearance or behavior of a DOM element.

|Directive                     |Type      |Behavior                                                                                            |
|------------------------------|----------|----------------------------------------------------------------------------------------------------|
|```slanimatedestroy```        |Attribute |Wait for CSS class animation to finish before removal from the DOM.                                 |
|```slanimatedestroytarget```  |Attribute |Used together with ```slanimatedestroy```. Should be a function which returns a DOM node to animate. The proposed node to animate is supplied as an argument to the function.|
|```slpreventdefault```        |Attribute |Prevent default behavior on Event object. |

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

Example of ``slfor``` directive usage:

```javascript
export class TestRenderElement3 {
    constructor() {
        this.data = function () { return Store3.data; };
        this.selected = function () { return Store3.selected; };
        this.run = function () {
            Store3.run();
        };
        this.add = function () {
            Store3.add();
        };
        this.update = function () {
            Store3.update();
        };
        this.select = function (id) {
            Store3.select(id);
        };
        this.delete = function (id) {
            Store3.remove(id);
        };
        this.runLots = function () {
            Store3.runLots();
        };
        this.clear = function () {
            Store3.clear();
        };
        this.swapRows = function () {
            Store3.swapRows();
        };

        this.add();
    }

    updateRow(ctx, v) {
        if (this.$id === undefined) {
            this.$fid = this.childNodes[1];
            this.$label = this.children[2].childNodes[0];
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(ctx.delete.bind(this, v.id));

        if (this.$label.childNodes[0].data !== v.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(v.label);
        }
	
        const idStr = String(v.id);
        
	if (this.$id.childNodes[0].data !== idStr) {
            this.$id.removeChild(this.$foo.childNodes[0]);
            this.$id.append(v.id);
        }
	
        var className = (v.id === ctx.selected()) ? 'danger' : ''
        if (this.className !== className) this.className = className
    }

    makeRow(d) {
        return markup('tr', {
            attrs: {
                ...d.id === this.selected() && { class: 'danger' },
                onclick: this.select.bind(this, d.id),
                onremove: this.delete.bind(this, d.id)
            },
            children: [
                new TestRenderElement4(),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1'
                    },
                    children: [
                        textNode(d.id)
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-4',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.select.bind(this, d.id)
                            },
                            children: [
                                textNode(d.label)
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-1',
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                'href': '#',
                                onclick: this.delete.bind(this, d.id)
                            },
                            children: [
                                markup('span', {
                                    attrs: {
                                        'class': 'glyphicon glyphicon-remove',
                                        'aria-hidden': 'true'
                                    }
                                })
                            ]
                        })
                    ]
                }),
                markup('td', {
                    attrs: {
                        'class': 'col-md-6'
                    }
                })
            ]
        });
    }

    view() {
        return markup('div', {
            attrs: {
                'class': 'container',
                'id': 'rendertoelement3'
            },
            children: [
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data'
                    },
                    children: [
                        markup('tbody', {
                            attrs: {
                                'slfor': 'myfor:data:makeRow:updateRow'
                            }
                        })
                    ]
                })
            ]
        });
    }
}
```

Below is an example of ```slanimatedestroytarget``` directive usage. 

Note that for ```slanimatedestroytarget```, unlike regular ```slanimatedestroy```, change detection is paused for the entire duration of all animated elements. Change detection is resumed and called immediately after that last animation ends.

```javascript
export class TestKeyedHideAnimation1 {
    constructor() {
        this.list = ['a', 'b', 'c'];
        this.toRemoveIndex = 1;
    }

    slDetachedOnNodeDestroy(proposedNode) {
        const parent = proposedNode.parentNode;
        return parent.childNodes[this.toRemoveIndex];
    }

    onHide() {
        this.list.splice(1, 1);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divkeyedanimation1'
            },
            children: [
                ...Array.from(this.list, (note) =>
                    markup('div', {
                        attrs: {
                            slanimatedestroy: 'animExit',
                            slanimatedestroytarget: this.slDetachedOnNodeDestroy.bind(this)
                        },
                        children: [
                            markup('p', {
                                children: [
                                    textNode(note)
                                ]
                            })
                        ]
                    })
                ),
                markup('button', {
                    attrs: {
                        id: 'keyedhidebtn1',
                        onclick: this.onHide.bind(this)
                    },
                    children: [
                        textNode('Keyed Hide Button')
                    ]
                })
            ]
        });
    }
}
```

Below is an example of ```slref``` directive usage.

```javascript
export class TestRefComponent1 {

    constructor() {
        this.ref1 = null;
    }

    slAfterInit() {
        const state = getState();
        state.ref1 = this.ref1 !== null && this.ref1 !== undefined && this.ref1.id === 'divtestrefcomp1';
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divtestrefcomp1',
                slref: 'ref1'
            },
            children: [
                markup('button', {
                    children: [
                        textNode('Hello, world!')
                    ]
                })
            ]
        })
    }
}
```
