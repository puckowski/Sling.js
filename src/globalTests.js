import { renderElement, detectChanges, getState, m, markup, mount, route, setState, textNode, addRoute, getRouteParams, resolveAll, getRouteSegments, hydrate, renderToString, removeRoute, version, update, setDetectionStrategy, wrapWithChangeDetector, isDetectorAttached, detachDetector, getRoute } from "../dist/sling.min";
import { FormControl, Observable } from '../dist/sling-reactive.min';

function _random(max, idx) {
    return Math.round((idx / 100) * 1000) % max;
}

var Store = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 10) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(10));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store2 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 10) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(10));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store3 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 8) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(8));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store4 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 8) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(8));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store5 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 8) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(8));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

var Store6 = {
    selected: undefined,
    data: [],
    id: 1,
    remove: function (id) {
        const idx = this.data.findIndex(d => d.id == id);
        this.data.splice(idx, 1);
    },
    buildData: function (count = 10) {
        var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
        var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
        var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
        var data = [];
        for (var i = 0; i < count; i++)
            data.push({ id: this.id++, label: adjectives[_random(adjectives.length, i)] + " " + colours[_random(colours.length, i)] + " " + nouns[_random(nouns.length, i)] });
        return data;
    },
    run: function () {
        this.data = this.buildData();
        this.selected = undefined;
    },
    update: function (mod = 10) {
        for (let i = 0; i < this.data.length; i += 10) {
            this.data[i].label += ' !!!';
        }
    },
    add: function () {
        this.data = [].concat(this.data, this.buildData(10));
    },
    select: function (id) {
        this.selected = id;
    },
    runLots() {
        this.data = this.buildData(10000);
        this.selected = undefined;
    },
    clear() {
        this.data = [];
        this.selected = undefined;
    },
    swapRows() {
        if (this.data.length > 998) {
            var a = this.data[1];
            this.data[1] = this.data[998];
            this.data[998] = a;
        }
    }
};

class TestDestroyAnimateComponent1 {
    constructor() {
        this.hide = false;
        this.showhide = false;
    }

    slOnInit() {
    }

    slOnDestroy() {
        this.hide = true;
    }

    hidetemplate() {
        this.showhide = true;
        this.hide = true;
        const state = getState();
        state.animatecdr = 0;
        setState(state);
    }

    rehidetemplate() {
        this.hide = false;
        this.showhide = false;
    }

    view() {
        const state = getState();

        if (state.animatecdr !== null && state.animatecdr !== undefined) {
            state.animatecdr++;
            setState(state);
        }

        const mark = markup('div', {
            attrs: {
                id: 'divanimatedestroy',
                ...this.showhide !== true && { class: 'visible' }
            },
            children: [
                ...(this.hide === false ? [
                    markup('h1', {
                        attrs: {
                            id: 'h1toanimate',
                            slanimatedestroy: 'hide'
                        },
                        children: [
                            textNode('Hello, world!'),
                            markup('button', {
                                attrs: {
                                    id: 'startanimatedestroy',
                                    onclick: this.hidetemplate.bind(this)
                                },
                                children: [
                                    textNode('hide')
                                ]
                            })
                        ]
                    })

                ] : [
                    markup('button', {
                        attrs: {
                            onclick: this.rehidetemplate.bind(this)
                        },
                        children: [
                            textNode('rehide')
                        ]
                    })
                ])
            ]
        });

        return mark;
    }
}

export class TimeoutTestComponent1 {

    constructor() {
        this.count = 0;
    }

    slOnInit() {
        const state = getState();
        state.timeoutcdr = 0;
        setState(state);
    }

    view() {
        const state = getState();
        state.timeoutcdr++;
        setState(state);

        this.count++;

        return markup('div', {
            attrs: {
                id: 'divtimeoutcdr'
            },
            children: [
                textNode('Timeout Component View Count: ' + this.count)
            ]
        });
    }
}

export class TestRow1 {
    constructor(id, classList, label, onclick, ondelete) {
        this.id = id;
        this.classList = classList;
        this.label = label;
        this.onclick = onclick;
        this.ondelete = ondelete;
    }

    slOnInit() {
        this.click = function () {
            const id = this.id;
            this.onclick(id);
        };
        this.delete = function () {
            const id = this.id;
            this.ondelete(id);
        };
    }

    view() {
        return markup('tr', {
            attrs: {
                'class': this.classList,
                onclick: this.click.bind(this),
                onremove: this.delete.bind(this)
            },
            children: [
                markup('td', {
                    attrs: {
                        'class': 'col-md-1'
                    },
                    children: [
                        textNode(this.id)
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
                                onclick: this.click.bind(this)
                            },
                            children: [
                                textNode(this.label)
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
                                id: 'id-row-delete-' + String(this.id),
                                onclick: this.delete.bind(this)
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
}

export class TestControllerComponent1 {
    constructor() {

    }

    slOnInit() {
        this.data = function () { return Store.data; };
        this.selected = function () { return Store.selected; };
        this.run = function () {
            Store.run();
        };
        this.add = function () {
            Store.add();
        };
        this.update = function () {
            Store.update();
        };
        this.select = function (id) {
            Store.select(id);
        };
        this.delete = function (id) {
            Store.remove(id);
        };
        this.runLots = function () {
            Store.runLots();
        };
        this.clear = function () {
            Store.clear();
        };
        this.swapRows = function () {
            Store.swapRows();
        };
    }

    view() {
        var ret = markup('div', {
            attrs: {
                'class': 'container',
                'id': 'main'
            },
            children: [
                markup('div', {
                    attrs: {
                        'class': 'jumbotron'
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                'class': 'row'
                            },
                            children: [
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('h1', {
                                            children: [
                                                textNode('Sling.js')
                                            ]
                                        })
                                    ]
                                }),
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'run',
                                                        onclick: this.run.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 1,000 rows')
                                                    ]
                                                }),

                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'runlots',
                                                        onclick: this.runLots.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 10,000 rows')
                                                    ]
                                                })
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'add',
                                                        onclick: this.add.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Append 1,000 rows')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'update',
                                                        onclick: this.update.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Update every 10th row')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'clear',
                                                        onclick: this.clear.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Clear')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'swaprows',
                                                        onclick: this.swapRows.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Swap Rows')
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data',
                        'id': 'idcontrollertable'
                    },
                    children: [
                        markup('tbody', {
                            children: [
                                ...Array.from(this.data(), (d, i) => {
                                    let sel = d.id === this.selected() ? 'danger' : '';
                                    return new TestRow1(d.id, sel, d.label, this.select, this.delete)
                                })
                            ]
                        })
                    ]
                }),
                markup('span', {
                    attrs: {
                        'class': 'preloadicon glyphicon glyphicon-remove',
                        'aria-hidden': 'true'
                    }
                })
            ]
        });

        return ret;
    }
}

export class TestControllerComponent2 {
    constructor() {

    }

    slOnInit() {
        this.data = function () { return Store2.data; };
        this.selected = function () { return Store2.selected; };
        this.run = function () {
            Store2.run();
        };
        this.add = function () {
            Store2.add();
        };
        this.update = function () {
            Store2.update();
        };
        this.select = function (id) {
            Store2.select(id);
        };
        this.delete = function (id) {
            Store2.remove(id);
        };
        this.runLots = function () {
            Store2.runLots();
        };
        this.clear = function () {
            Store2.clear();
        };
        this.swapRows = function () {
            Store2.swapRows();
        };
        this.run();
    }

    view() {
        var ret = markup('div', {
            attrs: {
                'class': 'container',
                'id': 'main2'
            },
            children: [
                markup('div', {
                    attrs: {
                        'class': 'jumbotron'
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                'class': 'row'
                            },
                            children: [
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('h1', {
                                            children: [
                                                textNode('Sling.js')
                                            ]
                                        })
                                    ]
                                }),
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'run2',
                                                        onclick: this.run.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 1,000 rows')
                                                    ]
                                                }),

                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'runlots2',
                                                        onclick: this.runLots.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 10,000 rows')
                                                    ]
                                                })
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'add2',
                                                        onclick: this.add.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Append 1,000 rows')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'update2',
                                                        onclick: this.update.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Update every 10th row')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'clear2',
                                                        onclick: this.clear.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Clear')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'swaprows2',
                                                        onclick: this.swapRows.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Swap Rows')
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data',
                        'id': 'idcontrollertable2'
                    },
                    children: [
                        markup('tbody', {
                            children: [
                                ...Array.from(this.data(), (d, i) => {
                                    let sel = d.id === this.selected() ? 'danger' : '';
                                    return new TestRow1(d.id, sel, d.label, this.select, this.delete)
                                })
                            ]
                        })
                    ]
                }),
                markup('span', {
                    attrs: {
                        'class': 'preloadicon glyphicon glyphicon-remove',
                        'aria-hidden': 'true'
                    }
                })
            ]
        });

        return ret;
    }
}

class TestComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testcomponent1',
                style: 'width: 100%;'
            },
            children: [
                textNode('Hello,'),
                markup('span', {
                    attrs: {
                        style: 'color: blue;'
                    },
                    children: [
                        textNode(' (nested <span>) ')
                    ]
                }),
                textNode(' world!')
            ]
        });
    }
}

class TestComponent2 {
    constructor() {
        this.counter = 0;
    }

    slAfterInit() {
        this.counter++;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testcomponent2',
                style: 'width: 100%;color: gray;'
            },
            children: [
                textNode('Hello,'),
                textNode(' world! Count: '),
                textNode(this.counter)
            ]
        });
    }
}

class TestFetchChangeDetectionComponent {
    constructor() {
        this.count = 0;
    }

    view() {
        const stateObj = getState();
        let countStr = stateObj.count ? String(stateObj.count) : String(this.count);

        if (stateObj.count !== null && stateObj.count !== undefined) stateObj.count++;
        setState(stateObj);

        return markup('div', {
            attrs: {
                id: 'testfetchcomponent',
                style: 'color: Coral;'
            },
            children: [
                textNode('Count: '),
                textNode(countStr)
            ]
        })
    }
}

class TestDestroyHookComponent {
    slOnDestroy() {
        const stateObj = getState();
        stateObj.onDestroyHookCalled = true;
        setState(stateObj);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testdestroyhookcomponent',
                style: 'color: red;'
            },
            children: [
                textNode('Should be removed.')
            ]
        })
    }
}

class TestDetachDetectorComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'testdetachdetectorcomponent',
            },
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class TestAfterDestroyHookComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'testdestroyhookcomponent',
                style: 'color: CornflowerBlue;'
            },
            children: [
                textNode('Displays after removal.')
            ]
        })
    }
}

class TestRemountComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testremountcomponent1',
            },
            children: [
                textNode('To be remounted.')
            ]
        })
    }
}

class TestNestedDestroyHookComponent2 {
    slOnDestroy() {
        const state = getState();
        state.nestedDestroy = true;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Nested destroy hook.')
            ]
        })
    }
}

class TestNestedDestroyHookComponent1 {
    slOnDestroy() {
        const state = getState();
        state.rootDestroy = true;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testnesteddestroyhook',
            },
            children: [
                textNode('Root component markup.'),
                new TestNestedDestroyHookComponent2()
            ]
        })
    }
}

class TestNestedDestroyHookComponent3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnesteddestroyhook',
            },
            children: [
                textNode('Plain root component markup.')
            ]
        })
    }
}

class TestNestedAfterInitHookComponent2 {
    slOnInit() {
        const state = getState();
        state.nestedOnInit = true;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.nestedAfterInit = true;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Nested after init and on init hooks.')
            ]
        })
    }
}

class TestNestedAfterInitHookComponent1 {
    slOnInit() {
        const state = getState();
        state.rootOnInit = true;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.rootAfterInit = true;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedafterinithook',
            },
            children: [
                textNode('Root component markup.'),
                new TestNestedAfterInitHookComponent2()
            ]
        })
    }
}

class TestNestedAfterInitHookComponent3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedafterinithook',
            },
            children: [
                textNode('Plain root component markup.')
            ]
        })
    }
}

class TestNestedConsumeClassComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedconsume',
            },
            children: [
                new TestNestedConsumeClassComponent2()
            ]
        })
    }
}

class TestNestedConsumeClassComponent2 {
    view() {
        return markup('div', {
            children: [
                new TestNestedConsumeClassComponent3()
            ]
        })
    }
}

class TestNestedConsumeClassComponent3 {
    view() {
        return markup('span', {
            children: [
                textNode('Consumed class text.')
            ]
        })
    }
}

class TestNestedConsumeClassComponent4 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedconsume2',
            },
            children: [
                new TestNestedConsumeClassComponent5()
            ]
        })
    }
}

class TestNestedConsumeClassComponent5 {
    view() {
        return markup('div', {
            children: [
                new TestNestedConsumeClassComponent6()
            ]
        })
    }
}

class TestNestedConsumeClassComponent6 {
    slAfterInit() {
        const state = getState();
        state.nestedConsumeHook = true;
        setState(state);
    }

    view() {
        return markup('span', {
            children: [
                textNode('Consumed class text with hook.')
            ]
        })
    }
}

class TestOnlySelfComponent1 {
    view() {
        return markup('iframe', {
            attrs: {
                frameborder: '0',
                id: 'tryit-sling-iframe',
                sldirective: 'onlyself',
                style: 'background-color: rgb(255, 255, 255);'
            }
        })
    }
}

class TestManualChangeDetectionComponent1 {
    constructor() {
        this.someValue = 0;
    }

    incrementSomeValue() {
        this.someValue++;
    }

    view() {
        const state = getState();
        if (state.manualChanges !== null && state.manualChanges !== undefined) state.manualChanges++;
        setState(state);

        return markup('div', {
            attrs: {
                id: 'testmanualchange',
            },
            children: [
                textNode('Plain root component markup.'),
                markup('button', {
                    attrs: {
                        id: 'manualincrementbutton',
                        onclick: this.incrementSomeValue.bind(this)
                    },
                    children: [
                        textNode('Increment Some Value')
                    ]
                })
            ]
        })
    }
}

class TestSsrHydrateComponent4 {
    hydratedFunction() {
        const state = getState();
        state.ishydrated2 = true;
        setState(state);
    }

    view() {
        const state = getState();
        const isFuncCalled = state.ishydrated2;

        return markup('div', {
            attrs: {
                id: 'testssrhydrate2',
                slssrclass: 'TestSsrHydrateComponent2'
            },
            children: [
                markup('button', {
                    attrs: {
                        id: 'ssrTest4',
                        onclick: this.hydratedFunction.bind(this)
                    },
                    children: [
                        textNode('Test Hydrate')
                    ]
                }),
                markup('div', {
                    attrs: {
                        id: 'ssrTest3'
                    },
                    children: [
                        ...(isFuncCalled === true ? [
                            textNode('Hydrated function called.')
                        ] : [
                            textNode('SSR placeholder.')
                        ])
                    ]
                })
            ]
        })
    }
}

class TestSsrHydrateComponent1 {
    hydratedFunction() {
        const state = getState();
        state.ishydrated = true;
        setState(state);
    }

    view() {
        const state = getState();
        const isFuncCalled = state.ishydrated;

        return markup('div', {
            attrs: {
                id: 'testssrhydrate',
                slssrclass: 'TestSsrHydrateComponent1'
            },
            children: [
                markup('button', {
                    attrs: {
                        id: 'ssrTest2',
                        onclick: this.hydratedFunction.bind(this)
                    },
                    children: [
                        textNode('Test Hydrate')
                    ]
                }),
                markup('div', {
                    attrs: {
                        id: 'ssrTest1'
                    },
                    children: [
                        ...(isFuncCalled === true ? [
                            textNode('Hydrated function called.')
                        ] : [
                            textNode('SSR placeholder.')
                        ])
                    ]
                })
            ]
        })
    }
}
window.TestSsrHydrateComponent1 = TestSsrHydrateComponent1;

class TestSsrHydrateComponent3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testssrhydrate2',
                slssrclass: 'TestSsrHydrateComponent2'
            },
            children: [
                markup('div', {
                    children: [
                        textNode('Test consume class.')
                    ]
                })
            ]
        })
    }
}

class TestSsrHydrateComponent2 {
    view() {
        return new TestSsrHydrateComponent3();
    }
}
window.TestSsrHydrateComponent2 = TestSsrHydrateComponent2;

class TestNestedHookComponent4 {
    slOnInit() {
        const state = getState();
        state.nestedOnInit2++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.nestedAfterInit2++;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Nested after init and on init hooks.')
            ]
        })
    }
}

class TestNestedHookComponent2 {
    slOnInit() {
        const state = getState();
        state.nestedOnInit2++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.nestedAfterInit2++;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Nested after init and on init hooks.')
            ]
        })
    }
}

class TestNestedHookComponent1 {
    slOnInit() {
        const state = getState();
        state.rootOnInit2++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        state.rootAfterInit2++;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedhook',
            },
            children: [
                textNode('Root component markup.'),
                new TestNestedHookComponent2(),
                new TestNestedHookComponent4()
            ]
        })
    }
}

class TestNestedHookComponent3 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testnestedhook',
            },
            children: [
                textNode('Plain root component markup.')
            ]
        })
    }
}

class TestCanDeactiveComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'testcandeactivate',
            },
            children: [
                textNode('Can deactivate component.')
            ]
        })
    }
}

class TestCanDeactiveComponent2 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testcandeactivate',
            },
            children: [
                textNode('Deactivated component result.')
            ]
        })
    }
}

class TestDefaultRouteComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testdefaultroute',
            },
            children: [
                textNode('Default route content.')
            ]
        })
    }
}

class TestRemoveRouteComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testremoveroute',
            },
            children: [
                textNode('Remove route content.')
            ]
        })
    }
}

class TestWrapDetectorComponent1 {
    view() {
        const state = getState();
        if (state.wrapDetector !== null && state.wrapDetector !== undefined) state.wrapDetector++;
        setState(state);

        return markup('div', {
            attrs: {
                id: 'testwrapdetector',
            },
            children: [
                textNode('Plain component text.')
            ]
        })
    }
}

class TestTrustDirectiveComponent1 {
    view() {
        return markup('div', {
            attrs: {
                id: 'testtrustdirective',
                sldirective: 'trustchildren'
            },
            children: [
                '<div>First child.</div>',
                '<p>Second child.</p>'
            ]
        })
    }
}

class TestDebounceDetectionComponent {
    constructor() {
        this.dummy = false;
    }

    toggle() {
        this.dummy = !this.dummy;
    }

    view() {
        const state = getState();
        if (state.debounce !== undefined && state.debounce !== null) state.debounce++;
        setState(state);

        return markup('div', {
            attrs: {
                id: 'testdebouncecomponent',
            },
            children: [
                textNode('To be rendered.'),
                markup('button', {
                    attrs: {
                        id: 'debounceToggleButton',
                        onclick: this.toggle.bind(this)
                    },
                    children: [
                        textNode('Toggle')
                    ]
                })
            ]
        })
    }
}

class TestDomStringComponent {
    constructor() {
        this.stringMode = false;
    }

    toggle() {
        this.stringMode = !this.stringMode;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testdomstring',
            },
            children: [
                markup('button', {
                    attrs: {
                        id: 'domStringButton',
                        onclick: this.toggle.bind(this),
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                ...(this.stringMode === false ? [
                    markup('div', {
                        children: [
                            markup('label', {
                                attrs: {
                                    style: 'margin-right: 0.25rem;'
                                },
                                children: [
                                    textNode('Username:')
                                ]
                            }),
                            markup('input', {
                                attrs: {
                                    style: 'margin-left: 0.25rem;'
                                }
                            })
                        ]
                    })
                ] : []),
                ...(this.stringMode === true ? [
                    markup('div', {
                        children: [
                            textNode('Invalid username')
                        ]
                    })
                ] : []),
            ]
        })
    }
}

class TestTagChangeComponent {
    constructor() {
        this.inputMode = false;
    }

    toggleInputMode() {
        this.inputMode = !this.inputMode;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testtagcomponent1'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow1'
                            },
                            children: [
                                ...(this.inputMode === false ? [markup('td', {
                                    children: [
                                        textNode('Mode: '),
                                        textNode(String(this.inputMode))
                                    ]
                                })] : []),
                                ...(this.inputMode === true ? [
                                    markup('input', {
                                        attrs: {
                                            value: String(this.inputMode)
                                        },
                                        children: [
                                        ]
                                    })
                                ] : []),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class TestUpdateSingleComponent1 {
    view() {
        const state = getState();
        const isTestSingle = state.testSingle;

        return markup('div', {
            attrs: {
                id: 'testsinglecomponent1'
            },
            children: [
                ...(isTestSingle === false ? [
                    textNode('Is test single false.')
                ] : [
                    textNode('Is test single true.')
                ])
            ]
        })
    }
}

class TestUpdateSingleComponent2 {
    view() {
        const state = getState();
        const isTestSingle = state.testSingle2;

        return markup('div', {
            attrs: {
                id: 'testsinglecomponent2'
            },
            children: [
                ...(isTestSingle === false ? [
                    textNode('Is test single false.')
                ] : [
                    textNode('Is test single true.')
                ])
            ]
        })
    }
}

class AuthFailComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'authcomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('Authentication guard returned false.')
            ]
        })
    }
}

class NoRouteComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'routecomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('No route taken.')
            ]
        })
    }
}

class RouteBasicComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'routecomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('Basic route taken.')
            ]
        })
    }
}

class OnDestroyCallTestComponent {
    slOnDestroy() {
        const state = getState();
        if (!state.destroyCalls) state.destroyCalls = 1;
        else state.destroyCalls++;
        setState(state);
    }

    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'destroycallcomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.onDestroyCall ? [markup('p', {
                    children: [
                        textNode('Flag set.'),
                    ]
                })] : []),
                new OnDestroyCallTestComponent2()
            ]
        })
    }
}

class HooksGenericTestComponent {
    slOnInit() {
        const state = getState();
        if (!state.genericOnInit) state.genericOnInit = 1;
        else state.genericOnInit++;
        setState(state);
    }

    slAfterInit() {
        const state = getState();
        if (!state.genericAfterInit) state.genericAfterInit = 1;
        else state.genericAfterInit++;
        setState(state);
    }

    view() {
        const state = getState();
        if (!state.renderCount) state.renderCount = 1;
        else state.renderCount++;
        setState(state);

        return markup('div', {
            attrs: {
                id: 'hooksgenericcomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.genericHookTemplate ? [markup('p', {
                    children: [
                        textNode('More plain text.')
                    ]
                })] : [])
            ]
        })
    }
}

class OnDestroyCallTemplateTestComponent {
    constructor() {
        this.comp = new OnDestroyCallTemplateTestComponent2();
    }

    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'destroycalltemplatecomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.onDestroyCallTemplate ? [markup('p', {
                    children: [
                        this.comp
                    ]
                })] : [])
            ]
        })
    }
}

class OnDestroyCallTemplateTestComponent2 {
    slOnDestroy() {
        const state = getState();
        if (!state.destroyTemplateCalls) state.destroyTemplateCalls = 1;
        else state.destroyTemplateCalls++;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class OnDestroyCallTestComponent2 {
    slOnDestroy() {
        const state = getState();
        if (!state.destroyCalls) state.destroyCalls = 1;
        else state.destroyCalls++;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class OnInitThisTestComponent {
    constructor() {
        this.value = 2;
    }

    slOnInit() {
        const state = getState();
        state.onInitThis = this.value === 2 ? true : false;
        setState(state);
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'oninitthiscomponent'
            },
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class DestroyHookCalledTestComponent {
    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'destroyhookcalledcomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(!state.forceDestroyHook ? [markup('p', {
                    children: [
                        new DestroyHookCalledTestComponent2()
                    ]
                })] : []),
            ]
        })
    }
}

class DestroyHookCalledTestComponent2 {
    slOnDestroy() {
        const state = getState();
        state.destroyHook2Called = true;
        setState(state);
    }

    view() {
        return markup('div', {
            children: [
                textNode('Some plain text.')
            ]
        })
    }
}

class AfterInitCallTestComponent {
    slAfterInit() {
        const state = getState();
        if (!state.initCalls) state.initCalls = 1;
        else state.initCalls++;
        setState(state);
    }

    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'initcallcomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.afterInitCall ? [markup('p', {
                    children: [
                        textNode('Flag set.'),
                    ]
                })] : []),
            ]
        })
    }
}

class OnInitCallTestComponent {
    slOnInit() {
        const state = getState();
        if (!state.onInitCalls) state.onInitCalls = 1;
        else state.onInitCalls++;
        setState(state);
    }

    view() {
        const state = getState();

        return markup('div', {
            attrs: {
                id: 'oninitcallcomponent'
            },
            children: [
                textNode('Some plain text.'),
                ...(state.onInitCall ? [markup('p', {
                    children: [
                        textNode('Flag set.'),
                    ]
                })] : []),
            ]
        })
    }
}

class OnBeforeRouteComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'onbeforeroutecomponent',
            },
            children: [
                textNode('Text should appear after onBeforeRoute called.')
            ]
        })
    }
}

class ConsumeClassComponent2 {
    view() {
        return markup('div', {
            attrs: {
                id: 'consumeclasscomponent',
            },
            children: [
                textNode('Consume class test.')
            ]
        })
    }
}

class ConsumeClassComponent1 {
    view() {
        return new ConsumeClassComponent2();
    }
}

class RouteComplexComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'routecomponent',
                style: 'color: blue;'
            },
            children: [
                textNode('Complex route taken.')
            ]
        })
    }
}

class RouteParamsTestComponent {
    view() {
        return markup('div', {
            attrs: {
                id: 'routeparamscomponent',
                style: 'color: SteelBlue;'
            },
            children: [
                textNode('Test route params.')
            ]
        })
    }
}

class TestGuardComponent {
    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'authcomponent',
                style: 'color: DarkSeaGreen;'
            },
            children: [
                textNode('Authentication guard returned true.')
            ]
        })
    }
}

class TestTagChangeComponent2 {
    constructor() {
        this.inputMode = false;
        this.fakeChildArray = [0, 1];
    }

    toggleInputMode() {
        this.inputMode = !this.inputMode;
        if (!this.inputMode) {
            this.fakeChildArray = [0, 1];
        } else {
            this.fakeChildArray = [0];
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'testtagcomponent2'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton2'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow2'
                            },
                            children: [
                                ...Array.from(this.fakeChildArray, (fakeChildItem) =>
                                    markup('div', {
                                        children: [
                                            ...(this.inputMode === false ? [markup('td', {
                                                children: [
                                                    textNode('Mode: '),
                                                    textNode(String(this.inputMode))
                                                ]
                                            })] : []),
                                            ...(this.inputMode === true ? [
                                                markup('input', {
                                                    attrs: {
                                                        value: String(this.inputMode)
                                                    },
                                                    children: [
                                                    ]
                                                })
                                            ] : [])
                                        ]
                                    })
                                ),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class TestRebindDetectionComponent {
    constructor() {
        this.fakeChildArray = [0, 1, 0];
    }

    toggleInputMode() {
        if (this.fakeChildArray.length === 3) {
            this.fakeChildArray = [0];
        } else {
            this.fakeChildArray = [0, 1, 0];
        }
    }

    toggleEditingMode() {
        if (this.fakeChildArray.length === 3 && this.fakeChildArray[1] === 1) {
            this.fakeChildArray = [0, 0, 0];
        } else {
            this.fakeChildArray = [0, 1, 0];
        }
    }

    view() {
        const stateObj = getState();
        if (stateObj.count2 !== null && stateObj.count2 !== undefined) stateObj.count2++;
        setState(stateObj);

        return markup('div', {
            attrs: {
                id: 'testtagcomponent3'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton3'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow3'
                            },
                            children: [
                                ...Array.from(this.fakeChildArray, (fakeChildFlag) =>
                                    markup('div', {
                                        children: [
                                            ...(fakeChildFlag === 1 ? [markup('button', {
                                                attrs: {
                                                    onclick: this.toggleEditingMode.bind(this),
                                                    id: 'toggleModeButton4'
                                                },
                                                children: [
                                                    textNode('Toggle')
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 0 ? [markup('td', {
                                                children: [
                                                    textNode('Mode: '),
                                                    textNode(String(fakeChildFlag))
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 1 ? [
                                                markup('input', {
                                                    attrs: {
                                                        value: String(fakeChildFlag)
                                                    },
                                                    children: [
                                                    ]
                                                })
                                            ] : [])
                                        ]
                                    })
                                ),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class TestRebindDetectionComplexComponent {
    constructor() {
        this.fakeChildArray = [0, 1, 0, 1, 0];
    }

    toggleInputMode() {
        if (this.fakeChildArray.length === 5) {
            this.fakeChildArray = [0];
        } else {
            this.fakeChildArray = [0, 1, 0, 1, 0];
        }
    }

    toggleEditingMode() {
        if (this.fakeChildArray.length === 3 && this.fakeChildArray[1] === 1) {
            this.fakeChildArray = [0, 0, 0, 0, 0];
        } else {
            this.fakeChildArray = [0, 1, 0, 1, 0];
        }
    }

    view() {
        const stateObj = getState();
        if (stateObj.count4 !== null && stateObj.count4 !== undefined) stateObj.count4++;
        setState(stateObj);

        return markup('div', {
            attrs: {
                id: 'testtagcomponent5'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton7'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow5'
                            },
                            children: [
                                ...Array.from(this.fakeChildArray, (fakeChildFlag) =>
                                    markup('div', {
                                        children: [
                                            ...(fakeChildFlag === 1 ? [markup('button', {
                                                attrs: {
                                                    onclick: this.toggleEditingMode.bind(this),
                                                    id: 'toggleModeButton8'
                                                },
                                                children: [
                                                    textNode('Toggle')
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 0 ? [markup('td', {
                                                children: [
                                                    textNode('Mode: '),
                                                    textNode(String(fakeChildFlag)),
                                                    markup('span', {
                                                        children: [
                                                            textNode(' some markup')
                                                        ]
                                                    }),
                                                    textNode(' and a text node')
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 1 ? [
                                                markup('input', {
                                                    attrs: {
                                                        value: String(fakeChildFlag)
                                                    },
                                                    children: [
                                                    ]
                                                })
                                            ] : [])
                                        ]
                                    })
                                ),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class TestRebindDetectionComponent2 {
    constructor() {
        this.fakeChildArray = [0, 1, 0];
    }

    toggleInputMode() {
        if (this.fakeChildArray.length === 3) {
            this.fakeChildArray = [0];
        } else {
            this.fakeChildArray = [0, 1, 0];
        }
    }

    toggleEditingMode() {
        if (this.fakeChildArray.length === 3 && this.fakeChildArray[1] === 1) {
            this.fakeChildArray = [0, 0, 0];
        } else {
            this.fakeChildArray = [0, 1, 0];
        }
    }

    view() {
        const stateObj = getState();
        if (stateObj.count3 !== null && stateObj.count3 !== undefined) stateObj.count3++;
        setState(stateObj);

        return markup('div', {
            attrs: {
                id: 'testtagcomponent4'
            },
            children: [
                markup('button', {
                    attrs: {
                        onclick: this.toggleInputMode.bind(this),
                        id: 'toggleModeButton5'
                    },
                    children: [
                        textNode('Toggle')
                    ]
                }),
                markup('table', {
                    children: [
                        markup('tr', {
                            attrs: {
                                id: 'testTagRow4'
                            },
                            children: [
                                ...Array.from(this.fakeChildArray, (fakeChildFlag) =>
                                    markup('div', {
                                        children: [
                                            ...(fakeChildFlag === 1 ? [markup('button', {
                                                attrs: {
                                                    onclick: this.toggleEditingMode.bind(this),
                                                    id: 'toggleModeButton6'
                                                },
                                                children: [
                                                    textNode('Toggle')
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 0 ? [markup('td', {
                                                children: [
                                                    textNode('Mode: '),
                                                    textNode(String(fakeChildFlag)),
                                                    markup('span', {
                                                        children: [
                                                            textNode(' <span>')
                                                        ]
                                                    })
                                                ]
                                            })] : []),
                                            ...(fakeChildFlag === 1 ? [
                                                markup('input', {
                                                    attrs: {
                                                        value: String(fakeChildFlag)
                                                    },
                                                    children: [
                                                    ]
                                                })
                                            ] : [])
                                        ]
                                    })
                                ),
                            ]
                        })
                    ]
                })
            ]
        })
    }
}

class PartSupplyComponent {

    constructor() {
        this.data = [];
        this.MOCK_DATA_MAX_VALUE_EXCLUSIVE = 101;
        this.MOCK_DATA_MONTH_RANGE = 24;
    }

    formatMockDate(dateToFormat) {
        if (dateToFormat.getMonth() === 0) {
            return '12/' + dateToFormat.getDate() + '/' + dateToFormat.getFullYear();
        } else {
            return dateToFormat.getMonth() + '/' + dateToFormat.getDate() + '/' + dateToFormat.getFullYear();
        }
    }

    getMockYData(targetMonths) {
        const mockYData = [];

        for (let i = 0; i < targetMonths; ++i) {
            // Random [0 - 100]
            mockYData.push(Math.floor(Math.random() * this.MOCK_DATA_MAX_VALUE_EXCLUSIVE));
        }

        return mockYData;
    }

    getMockXData(targetMonths) {
        const mockXData = [];
        const currentDate = new Date();

        currentDate.setMonth(currentDate.getMonth() - targetMonths);

        for (let i = 0; i < targetMonths; ++i) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            mockXData.push(this.formatMockDate(currentDate));
        }

        return mockXData;
    }

    slOnInit() {
        this.data = [
            {
                x: this.getMockXData(this.MOCK_DATA_MONTH_RANGE),
                y: this.getMockYData(this.MOCK_DATA_MONTH_RANGE),
                type: 'bar'
            }
        ];
    }

    slAfterInit() {
        if (document.getElementById('chartDiv')) {
            Plotly.newPlot('chartDiv', this.data, {}, { responsive: true, displaylogo: false });
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divsheetcontent'
            },
            children: [
                markup('div', {
                    attrs: {
                        id: 'chartDiv',
                        sldirective: 'useexsting',
                        style: 'width: 90vw;'
                    }
                })
            ]
        })
    }
}

class PreviewComponent {

    constructor() {
        this.injectedList = 'Injected files: 2';
    }

    view() {
        return markup('div', {
            attrs: {
                style: 'padding: 0.25rem; color: rgb(204, 204, 204); max-height: inherit; overflow: auto; display: flex; flex-direction: column; height: calc(100% - 0.5rem);'
            },
            children: [
                markup('h4', {
                    attrs: {
                        style: 'margin: 0px; flex: 1;'
                    },
                    children: [
                        textNode('Preview')
                    ]
                }),
                ...(this.injectedList.length > 16 ? [
                    markup('div', {
                        attrs: {
                            style: 'background-color: rgb(46, 49, 56); padding: 0.25rem; flex: 1;'
                        },
                        children: [
                            textNode(this.injectedList)
                        ]
                    })
                ] : []),
                markup('iframe', {
                    attrs: {
                        frameborder: '0',
                        id: 'tryit-sling-iframe',
                        sldirective: 'onlyself',
                        ...this.injectedList.length > 16 && { style: 'background-color: #ffffff; width: 100%; flex: 14;' },
                        ...this.injectedList.length <= 16 && { style: 'background-color: #ffffff; width: 100%; flex: 15;' }
                    }
                }),
                markup('textarea', {
                    attrs: {
                        id: 'tryit-sling-console',
                        sldirective: 'onlyself',
                        style: 'width: 100%; flex: 4;',
                        placeholder: 'Text will appear when logged'
                    }
                })
            ]
        });
    }
}

class SourcePanelComponent {

    constructor() {
    }

    slAfterInit() {
        const state = getState();
        state.sourcePanelAfterInit = true;
        setState(state);
    }

    view() {
        const file = {
            index: 0,
            name: 'test'
        };

        return markup('div', {
            attrs: {
                style: 'padding: 0.25rem; background-color: rgb(21, 24, 30); color: rgb(204, 204, 204); overflow: auto; height: calc(100% - 0.5rem); display: flex; flex-direction: column;'
            },
            children: [
                markup('h4', {
                    attrs: {
                        style: 'margin: 0px; flex: 1;'
                    },
                    children: [
                        ...(file ? [
                            textNode('File ' + (file.index + 1) + ': ' + file.name)
                        ] : []),
                    ]
                }),
                markup('textarea', {
                    attrs: {
                        style: 'width: 100%; background-color: rgb(0, 0, 0); border: none; color: rgb(204, 204, 204); flex: 19;',
                        id: 'tryit-sling-textarea'
                    }
                })
            ]
        });
    }
}

class ContentPanelComponent {

    constructor() {
        this.previewComp = new PreviewComponent();
        this.sourceComp = new SourcePanelComponent();
    }

    view() {
        const state = getState();
        const showPreview = state.showPreview;

        return markup('div', {
            attrs: {
                id: 'divcontentpanel'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'display: flex; justify-content: space-between;'
                    },
                    children: [
                        ...(showPreview === true ? [
                            markup('div', {
                                attrs: {
                                    style: 'width: 88%; max-height: inherit;'
                                },
                                children: [
                                    this.previewComp
                                ]
                            })
                        ] : []),
                        ...(showPreview === false ? [
                            markup('div', {
                                attrs: {
                                    style: 'width: 88%; max-height: inherit;'
                                },
                                children: [
                                    this.sourceComp
                                ]
                            })
                        ] : []),
                    ]
                })
            ]
        });
    }
}

class TestRenderElement1 {

    view() {
        return markup('span', {
            children: [
                textNode('Hello')
            ]
        });
    }
}

class TestRenderElement2 {

    constructor() {
        const state = getState();
        if (state.rendertoele1 === undefined) {
            state.rendertoele1 = 0;
        }
        setState(state);
    }

    slOnInit() {
        const state = getState();
        if (state.rendertoele1 === undefined) {
            state.rendertoele1 = 0;
        }
        state.rendertoele1++;
        setState(state);
    }

    view() {
        return markup('span', {
            children: [
                textNode('Hello')
            ]
        });
    }
}

class TestRenderElement4 {

    constructor() {
        const state = getState();
        if (state.rendertoele3 === undefined) {
            state.rendertoele3 = 0;
        }
        setState(state);
    }

    slOnInit() {
        const state = getState();
        if (state.rendertoele3 === undefined) {
            state.rendertoele3 = 0;
        }
        state.rendertoele3++;
        setState(state);
    }

    view() {
        return markup('span', {
            children: [
                textNode('Hello')
            ]
        });
    }
}

class TestRenderElement6 {

    constructor() {
        const state = getState();
        if (state.rendertoele4 === undefined) {
            state.rendertoele4 = 0;
        }
        setState(state);
    }

    slOnDestroy() {
        const state = getState();
        if (state.rendertoele4 === undefined) {
            state.rendertoele4 = 0;
        }
        state.rendertoele4++;
        setState(state);
    }

    view() {
        return markup('span', {
            children: [
                textNode('Hello')
            ]
        });
    }
}

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
        if (this.$foo === undefined) {
            this.$foo = this.childNodes[1];
            this.$label = this.children[2].childNodes[0];
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(ctx.delete.bind(this, v.id));

        if (this.$label.childNodes[0].data !== v.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(v.label);
        }
        const idStr = String(v.id);
        if (this.$foo.childNodes[0].data !== idStr) {
            this.$foo.removeChild(this.$foo.childNodes[0]);
            this.$foo.append(v.id);
        }
        var className = (v.id === ctx.selected()) ? 'danger' : ''
        if (this.className !== className) this.className = className
    }

    makeRow(d) {
        let $label;

        const node = markup('tr', {
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

        return node;
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
                                'slfor': 'myfor2:data:makeRow:updateRow'
                            }
                        })
                    ]
                })
            ]
        });
    }
}


export class TestRenderElement5 {
    constructor() {
        this.data = function () { return Store4.data; };
        this.selected = function () { return Store4.selected; };
        this.run = function () {
            Store4.run();
        };
        this.add = function () {
            Store4.add();
        };
        this.update = function () {
            Store4.update();
        };
        this.select = function (id) {
            Store4.select(id);
        };
        this.delete = function (id) {
            Store4.remove(id);
        };
        this.runLots = function () {
            Store4.runLots();
        };
        this.clear = function () {
            Store4.clear();
        };
        this.swapRows = function () {
            Store4.swapRows();
        };

        if (this.data().length === 0) {
            this.add();
        }

        this.show = true;
    }

    updateRow(ctx, v) {
        if (this.$foo === undefined) {
            this.$foo = this.childNodes[1];
            this.$label = this.children[2].childNodes[0];
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(ctx.delete.bind(this, v.id));

        if (this.$label.childNodes[0].data !== v.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(v.label);
        }
        const idStr = String(v.id);
        if (this.$foo.childNodes[0].data !== idStr) {
            this.$foo.removeChild(this.$foo.childNodes[0]);
            this.$foo.append(v.id);
        }
        var className = (v.id === ctx.selected()) ? 'danger' : ''
        if (this.className !== className) this.className = className
    }

    makeRow(d) {
        let $label;

        const node = markup('tr', {
            attrs: {
                ...d.id === this.selected() && { class: 'danger' },
                onclick: this.select.bind(this, d.id),
                onremove: this.delete.bind(this, d.id)
            },
            children: [
                new TestRenderElement6(),
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

        return node;
    }

    hideSlFor() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                'class': 'container',
                'id': 'rendertoelement4'
            },
            children: [
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data'
                    },
                    children: [
                        markup('button', {
                            attrs: {
                                onclick: this.hideSlFor.bind(this),
                                'id': 'renderele4btn'
                            },
                            children: [
                                textNode('Hide slFor')
                            ]
                        }),
                        ...(this.show === true ? [
                            markup('tbody', {
                                attrs: {
                                    'slfor': 'myfor3:data:makeRow:updateRow'
                                }
                            })
                        ] : [])
                    ]
                })
            ]
        });
    }
}


export class TestRenderHydrate1 {
    constructor() {
        this.data = function () { return Store5.data; };
        this.selected = function () { return Store5.selected; };
        this.run = function () {
            Store5.run();
        };
        this.add = function () {
            Store5.add();
        };
        this.update = function () {
            Store5.update();
        };
        this.select = function (id) {
            Store5.select(id);
        };
        this.delete = function (id) {
            Store5.remove(id);
        };
        this.runLots = function () {
            Store5.runLots();
        };
        this.clear = function () {
            Store5.clear();
        };
        this.swapRows = function () {
            Store5.swapRows();
        };

        if (this.data().length === 0) {
            this.add();
        }
    }

    updateRow(ctx, v) {
        if (this.$foo === undefined) {
            this.$foo = this.childNodes[0];
            this.$label = this.children[1].childNodes[0];
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(ctx.delete.bind(this, v.id));

        if (this.$label.childNodes[0].data !== v.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(v.label);
        }
        const idStr = String(v.id);
        if (this.$foo.childNodes[0].data !== idStr) {
            this.$foo.removeChild(this.$foo.childNodes[0]);
            this.$foo.append(v.id);
        }
        var className = (v.id === ctx.selected()) ? 'danger' : ''
        if (this.className !== className) this.className = className
    }

    makeRow(d) {
        let $label;

        const node = markup('tr', {
            attrs: {
                ...d.id === this.selected() && { class: 'danger' },
                onclick: this.select.bind(this, d.id),
                onremove: this.delete.bind(this, d.id)
            },
            children: [
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

        return node;
    }

    view() {
        return markup('div', {
            attrs: {
                'class': 'container',
                'id': 'divrenderhydrate',
                'slssrclass': 'TestRenderHydrate1'
            },
            children: [
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data'
                    },
                    children: [
                        markup('tbody', {
                            attrs: {
                                'slfor': 'myfor4:data:makeRow:updateRow'
                            }
                        })
                    ]
                })
            ]
        });
    }
}

export class TestSlForCleanupComponent1 {
    constructor() {
        this.show = true;
        this.data = ['a', 'b', 'c'];
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    hideList() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforcleanup'
            },
            children: [
                ...(this.show === true ? [
                    markup('div', {
                        attrs: {
                            'slfor': 'cleanupfor:data:makeRow:updateRow'
                        }
                    })
                ] : []),
                markup('button', {
                    attrs: {
                        onclick: this.hideList.bind(this),
                        id: 'slforcleanupbtn'
                    },
                    children: [
                        textNode('Hide List')
                    ]
                })
            ]
        })
    }
}

export class TestSlForCleanupComponent2 {
    constructor() {
        this.show = true;
        this.data = ['a', 'b', 'c'];
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    hideList() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforcleanup2'
            },
            children: [
                ...(this.show === true ? [
                    markup('div', {
                        attrs: {
                            'slfor': 'cleanupfor2:data:makeRow:updateRow'
                        },
                        childen: [
                            textNode('Testing...'),
                            markup('span', {
                                attrs: {
                                    'slfor': 'cleanupfor3:data:makeRow:updateRow'
                                }
                            })
                        ]
                    })
                ] : []),
                markup('button', {
                    attrs: {
                        onclick: this.hideList.bind(this),
                        id: 'slforcleanupbtn2'
                    },
                    children: [
                        textNode('Hide List')
                    ]
                })
            ]
        })
    }
}

export class TestManualChangeDetectionComponent2 {
    constructor() {
        this.data = function () { return Store6.data; };
        this.selected = function () { return Store6.selected; };
        this.run = function () {
            Store6.run();
        };
        this.add = function () {
            Store6.add();
        };
        this.update = function () {
            Store6.update();
        };
        this.select = function (id) {
            Store6.select(id);
        };
        this.delete = function (id) {
            Store6.remove(id);
        };
        this.runLots = function () {
            Store6.runLots();
        };
        this.clear = function () {
            Store6.clear();
        };
        this.swapRows = function () {
            Store6.swapRows();
        };

        this.add();
    }

    updateTableRow(context, d) {
        if (this.$label.childNodes[0].data !== d.label) {
            this.$label.removeChild(this.$label.childNodes[0]);
            this.$label.append(d.label);
        }

        this.children[2].children[0].onclick = wrapWithChangeDetector(context.delete.bind(this, d.id));

        const idStr = String(d.id);

        if (this.$id.childNodes[0].data !== idStr) {
            this.$id.removeChild(this.$id.childNodes[0]);
            this.$id.append(d.id);
        }

        const className = (d.id === context.selected()) ? 'danger' : '';

        if (this.className !== className) {
            this.className = className;
        }
    }

    makeTableRow(d) {
        const rootNode = renderElement(markup('tr', {
            attrs: {
                ...d.id === this.selected() && { class: 'danger' },
                onclick: this.select.bind(this, d.id),
                onremove: this.delete.bind(this, d.id)
            },
            children: [
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
        }));

        rootNode.$label = rootNode.children[1].children[0];
        rootNode.$id = rootNode.children[0];

        return rootNode;
    }

    view() {
        return markup('div', {
            attrs: {
                'class': 'container',
                'id': 'divtestmanual1'
            },
            children: [
                markup('div', {
                    attrs: {
                        'class': 'jumbotron'
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                'class': 'row'
                            },
                            children: [
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('h1', {
                                            children: [
                                                textNode('Sling.js 14.0.0')
                                            ]
                                        })
                                    ]
                                }),
                                markup('div', {
                                    attrs: {
                                        'class': 'col-md-6'
                                    },
                                    children: [
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'run',
                                                        onclick: this.run.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 1,000 rows')
                                                    ]
                                                }),

                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'runlots',
                                                        onclick: this.runLots.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Create 10,000 rows')
                                                    ]
                                                })
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'add',
                                                        onclick: this.add.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Append 1,000 rows')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'update',
                                                        onclick: this.update.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Update every 10th row')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'clear',
                                                        onclick: this.clear.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Clear')
                                                    ]
                                                }),
                                            ]
                                        }),
                                        markup('div', {
                                            attrs: {
                                                'class': 'col-sm-6 smallpad'
                                            },
                                            children: [
                                                markup('button', {
                                                    attrs: {
                                                        'type': 'button',
                                                        'class': 'btn btn-primary btn-block',
                                                        'id': 'swaprows',
                                                        onclick: this.swapRows.bind(this)
                                                    },
                                                    children: [
                                                        textNode('Swap Rows')
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                markup('table', {
                    attrs: {
                        'class': 'table table-hover table-striped test-data'
                    },
                    children: [
                        markup('tbody', {
                            attrs: {
                                'slfor': 'bodyfor:data:makeTableRow:updateTableRow'
                            }
                        })
                    ]
                }),
                markup('span', {
                    attrs: {
                        'class': 'preloadicon glyphicon glyphicon-remove',
                        'aria-hidden': 'true'
                    }
                })
            ]
        });
    }
}

class RenderToStringConditional1 {
    constructor() {
        this.show = true;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divrendertostring1'
            },
            children: [
                ...(this.show === true ? [textNode('Hello')] : []),
                textNode(', world!')
            ]
        })
    }
}

class RenderToStringConditional2 {
    constructor() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divrendertostring2'
            },
            children: [
                ...(this.show === true ? [textNode('Hello')] : []),
                textNode(', world!')
            ]
        })
    }
}

class HydrateSlForComponent1 {
    constructor() {
        this.list = ['a', 'b', 'c', 'd', 'e'];

        const state = getState();
        state.hydrateslformake = 0;
        state.hydrateslforupdate = 0;
        setState(state);
    }

    makeRow(data) {
        const state = getState();
        state.hydrateslformake++;
        setState(state);

        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        const state = getState();
        state.hydrateslforupdate++;
        setState(state);

        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divhydrateslfor1'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfor': 'hydratefor:list:makeRow:updateRow'
                    }
                })
            ]
        });
    }
}

class NamedSlForComponent1 {
    constructor() {
        this.list = ['a', 'b', 'c'];
    }

    slOnInit() {
        this.makeRow.slfor = 'make';
        this.updateRow.slfor = 'update';
        this.getData.slfor = 'data';
    }

    getData() {
        return this.list;
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divnamedslfor1'
            },
            children: [
                markup('div', {
                    attrs: {
                        'slfornamed': 'namedfor:data:make:update'
                    }
                })
            ]
        });
    }
}

export class TestSlForCleanupComponent3 {
    constructor() {
        this.show = true;
        this.data = ['a', 'b', 'c'];
    }

    slOnInit() {
        this.getData.slfor = 'data';
        this.makeRow.slfor = 'make';
        this.updateRow.slfor = 'update';
    }

    getData() {
        return this.data;
    }

    makeRow(data) {
        return markup('p', {
            children: [
                textNode(data)
            ]
        });
    }

    updateRow(context, data) {
        if (this.childNodes[0].data !== data) {
            this.removeChild(this.childNodes[0]);
            this.append(data);
        }
    }

    hideList() {
        this.show = false;
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divslforcleanup3'
            },
            children: [
                ...(this.show === true ? [
                    markup('div', {
                        attrs: {
                            'slfornamed': 'cleanupfornamed:data:make:update'
                        }
                    })
                ] : []),
                markup('button', {
                    attrs: {
                        onclick: this.hideList.bind(this),
                        id: 'slfornamedcleanupbtn'
                    },
                    children: [
                        textNode('Hide List')
                    ]
                })
            ]
        })
    }
}

export class GlobalTestRunner {

    constructor() {
        this.someClassMember = 123;
    }

    testFinalize100NamedSlForDirectiveRender() {
        const result = {
            test: 'test named slFor directive render',
            success: false,
            message: ''
        };

        const compStr = renderToString(new NamedSlForComponent1());

        result.success = compStr === '<div id="divnamedslfor1"><div slfornamed="namedfor:data:make:update"><p>a</p><p>b</p><p>c</p></div></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100NamedSlForDirective() {
        const result = {
            test: 'test named slFor directive',
            success: false,
            message: ''
        };

        mount('divnamedslfor1', new NamedSlForComponent1());

        const rootEle = document.getElementById('divnamedslfor1');
        const childDiv = rootEle.children[0];
        const pChildren = childDiv.querySelectorAll('p');

        result.success = childDiv && pChildren && pChildren.length === 3 && pChildren[0].textContent === 'a'
            && pChildren[1].textContent === 'b' && pChildren[2].textContent === 'c';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100HydrateSlForCounts() {
        const result = {
            test: 'test hydrate slfor markup with correct update and make counts',
            success: false,
            message: ''
        };

        window.HydrateSlForComponent1 = HydrateSlForComponent1;
        hydrate('divhydrateslfor1');

        const state = getState();
        const makeCountCorrect = state.hydrateslformake === 2;
        const updateCountCorrect = state.hydrateslforupdate === 3;

        result.success = makeCountCorrect && updateCountCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRenderToStringConditional() {
        const result = {
            test: 'test render to string with truthy conditional in template',
            success: false,
            message: ''
        };

        const compStr = renderToString(new RenderToStringConditional1());

        result.success = compStr === '<div id="divrendertostring1">Hello, world!</div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRenderToStringConditional2() {
        const result = {
            test: 'test render to string with falsy conditional in template',
            success: false,
            message: ''
        };

        const compStr = renderToString(new RenderToStringConditional2());

        result.success = compStr === '<div id="divrendertostring2">, world!</div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100NamedSlForCleanup() {
        const result = {
            test: 'test named slFor cleanup',
            success: false,
            message: ''
        };

        mount('divslforcleanup3', new TestSlForCleanupComponent3());

        const originalExists = s._structureForMap.has('cleanupfornamed');

        const hideBtn = document.getElementById('slfornamedcleanupbtn');
        hideBtn.click();

        s.DETACHED_SET_TIMEOUT(() => {
            const existsAfterHide = s._structureForMap.has('cleanupfornamed');

            result.success = originalExists === true && existsAfterHide === false;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize100SlForCleanup() {
        const result = {
            test: 'test slFor cleanup with multiple directives',
            success: false,
            message: ''
        };

        mount('divslforcleanup2', new TestSlForCleanupComponent2());

        const originalExists = s._structureForMap.has('cleanupfor2');
        const originalExists2 = s._structureForMap.has('cleanupfor3');

        const hideBtn = document.getElementById('slforcleanupbtn2');
        hideBtn.click();

        s.DETACHED_SET_TIMEOUT(() => {
            const existsAfterHide = s._structureForMap.has('cleanupfor2');
            const existsAfterHide2 = s._structureForMap.has('cleanupfor3');

            result.success = originalExists === true && originalExists2 === true && existsAfterHide === false && existsAfterHide2 === false;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize100SlForCleanup() {
        const result = {
            test: 'test slFor cleanup',
            success: false,
            message: ''
        };

        mount('divslforcleanup', new TestSlForCleanupComponent1());

        const originalExists = s._structureForMap.has('cleanupfor');

        const hideBtn = document.getElementById('slforcleanupbtn');
        hideBtn.click();

        s.DETACHED_SET_TIMEOUT(() => {
            const existsAfterHide = s._structureForMap.has('cleanupfor');

            result.success = originalExists === true && existsAfterHide === false;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testRenderHydrate() {
        const result = {
            test: 'test render element with hydrate',
            success: false,
            message: ''
        };

        window.TestRenderHydrate1 = TestRenderHydrate1;
        hydrate('divrenderhydrate');

        const eleDiv = document.getElementById('divrenderhydrate');
        const tbody = eleDiv.querySelector('tbody');

        const originalTrCount = tbody.querySelectorAll('tr').length;

        if (tbody && tbody.children && tbody.children.length > 1) {
            const tr = tbody.children[1];

            if (tr && tr.children && tr.children.length > 2 && tr.children[2].children && tr.children[2].children.length > 0) {
                // 3rd <td> and first <a>
                const deleteEle = tr.children[2].children[0];

                if (deleteEle) {
                    deleteEle.click();

                    s.DETACHED_SET_TIMEOUT(() => {
                        const finalTrCount = tbody.querySelectorAll('tr').length;

                        if (finalTrCount === originalTrCount - 1) {
                            result.success = true;
                        }

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                    }, 100);
                }
            }
        }
    }

    testRenderElementWithClass3() {
        const result = {
            test: 'test render element function with class and after init hook',
            success: false,
            message: ''
        };

        let state = getState();
        const correctHookCount = state.rendertoele3 === undefined;

        mount('rendertoelement3', new TestRenderElement3());

        state = getState();
        const correctHookCountAfter = state.rendertoele3 === 8;

        result.success = correctHookCount && correctHookCountAfter;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRenderElementWithClass4() {
        const result = {
            test: 'test render element function with class and on destroy hook',
            success: false,
            message: ''
        };

        let state = getState();
        const correctHookCount = state.rendertoele4 === undefined;

        mount('rendertoelement4', new TestRenderElement5());

        const hideBtn = document.getElementById('renderele4btn');
        hideBtn.click();

        s.DETACHED_SET_TIMEOUT(() => {
            state = getState();
            const correctHookCountAfter = state.rendertoele4 === 8;

            result.success = correctHookCount && correctHookCountAfter;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testRenderElementWithClass2() {
        const result = {
            test: 'test render element function with class and on init hook',
            success: false,
            message: ''
        };

        const nodeMarkup = markup('tr', {
            attrs: {
                'style': 'color:red;',
                'class': 'some-fake-class',
                onclick: this.dummyOnClickFunction
            },
            children: [
                new TestRenderElement2()
            ]
        });

        let state = getState();
        const correctHookCount = state.rendertoele1 === 0;

        const node = renderElement(nodeMarkup);

        const correctTag = node.tagName && node.tagName === 'TR';
        const correctStyle = node.getAttribute('style') === 'color:red;';
        const correctClass = node.getAttribute('class') === 'some-fake-class';
        const correctChildren = node.children && node.children.length === 1;
        const correctChildren2 = node.children && node.children.length === 1 && node.children[0].tagName === 'SPAN' && node.children[0].childNodes.length === 1
            && node.children[0].childNodes[0].data === 'Hello';
        const correctOnClick = node.onclick && typeof node.onclick === 'function';

        state = getState();
        const correctHookCountAfter = state.rendertoele1 === 1;

        result.success = correctTag && correctStyle && correctClass && correctChildren && correctOnClick && correctChildren2
            && correctHookCount && correctHookCountAfter;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testRenderElementWithClass1() {
        const result = {
            test: 'test render element function with class text node',
            success: false,
            message: ''
        };

        const nodeMarkup = markup('tr', {
            attrs: {
                'style': 'color:red;',
                'class': 'some-fake-class',
                onclick: this.dummyOnClickFunction
            },
            children: [
                new TestRenderElement1()
            ]
        });
        const node = renderElement(nodeMarkup);

        const correctTag = node.tagName && node.tagName === 'TR';
        const correctStyle = node.getAttribute('style') === 'color:red;';
        const correctClass = node.getAttribute('class') === 'some-fake-class';
        const correctChildren = node.children && node.children.length === 1;
        const correctChildren2 = node.children && node.children.length === 1 && node.children[0].tagName === 'SPAN' && node.children[0].childNodes.length === 1
            && node.children[0].childNodes[0].data === 'Hello';
        const correctOnClick = node.onclick && typeof node.onclick === 'function';

        result.success = correctTag && correctStyle && correctClass && correctChildren && correctOnClick && correctChildren2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100ManualChangeDetection() {
        const result = {
            test: 'test delete with manual change detection mode',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                setDetectionStrategy(s.CHANGE_STRATEGY_MANUAL);

                mount('divtestmanual1', new TestManualChangeDetectionComponent2());

                setDetectionStrategy(s.CHANGE_STRATEGY_AUTOMATIC);

                const rootEle = document.getElementById('divtestmanual1');
                const tbody = rootEle.querySelector('tbody');

                const originalTrCount = rootEle.querySelectorAll('tr');

                if (tbody && tbody.children && tbody.children.length > 0) {
                    const tr = tbody.children[0];

                    if (tr && tr.children && tr.children.length > 2) {
                        const deleteTd = tr.children[2];

                        if (deleteTd && deleteTd.children && deleteTd.children.length > 0) {
                            const deleteEle = deleteTd.children[0];

                            if (deleteEle) {
                                deleteEle.click();

                                s.DETACHED_SET_TIMEOUT(() => {
                                    const finalTrCount = rootEle.querySelectorAll('tr');

                                    if (originalTrCount.length === finalTrCount.length) {
                                        result.success = true;
                                    }

                                    window.globalTestResults.push(result);
                                    window.globalTestCount++;
                                    window.globalAsyncCount--;
                                }, 100);
                            }
                        }
                    }
                }
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testSlingExists() {
        const result = {
            test: 'test sling exists',
            success: false,
            message: ''
        };

        if (window.s !== null && window.s !== undefined) {
            result.success = true;
            result.message = 'basic sling object exists on window';
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testDetachedTimeoutExists() {
        const result = {
            test: 'test detached timeout exists',
            success: false,
            message: ''
        };

        if (s.DETACHED_SET_TIMEOUT !== null && s.DETACHED_SET_TIMEOUT !== undefined) {
            result.success = true;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testDetachedTimeout() {
        const result = {
            test: 'test detached timeout functions as expected',
            success: false,
            message: ''
        };

        if (s.DETACHED_SET_TIMEOUT !== null && s.DETACHED_SET_TIMEOUT !== undefined) {
            let initiallyExists = null;

            window.globalAsyncCount++;
            setTimeout(() => {
                window.globalAsyncCount--;
                const fakeEle = document.getElementById('fakeEle1');
                initiallyExists = fakeEle !== null && fakeEle !== undefined;
            }, 25);

            s.DETACHED_SET_TIMEOUT(() => {
                const fakeEle = document.createElement('div');
                fakeEle.id = 'fakeEle1';
                document.body.appendChild(fakeEle);
            }, 50);

            window.globalAsyncCount++;
            setTimeout(() => {
                window.globalAsyncCount--;
                const fakeEle = document.getElementById('fakeEle1');
                const finallyExists = fakeEle !== null && fakeEle !== undefined;

                if (initiallyExists === false && finallyExists === true) {
                    result.success = true;
                }

                window.globalTestCount++;
            }, 100);
        }

        window.globalTestResults.push(result);
    }

    testDetachedSetInterval() {
        const result = {
            test: 'test detached interval exists',
            success: false,
            message: ''
        };

        if (s.DETACHED_SET_INTERVAL !== null && s.DETACHED_SET_INTERVAL !== undefined) {
            result.success = true;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize990RouteBasic() {
        const result = {
            test: 'test basic route with parameter',
            success: false,
            message: ''
        };

        mount('routecomponent', new NoRouteComponent());
        addRoute('basictest/:someId', { component: new RouteBasicComponent(), root: 'routecomponent' });
        route('basictest/5');

        const divEle = document.getElementById('routecomponent');

        const correctText = divEle.textContent === 'Basic route taken.';

        result.success = correctText;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996OnBeforeRoute() {
        const result = {
            test: 'test onBeforeRoute called before component mounted to DOM',
            success: false,
            message: ''
        };

        const checkMountedInDomFunc = () => {
            const ele = document.getElementById('onbeforeroutecomponent');

            const state = getState();
            state.onBeforeRouteCorrect = ele && ele.children && ele.children.length === 0 && ele.textContent === '';
            setState(state);
        };

        addRoute('onbeforeroute1', { component: new OnBeforeRouteComponent(), onBeforeRoute: checkMountedInDomFunc, root: 'onbeforeroutecomponent' });
        route('onbeforeroute1');

        const state = getState();

        result.success = state.onBeforeRouteCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996ConsumeClass() {
        const result = {
            test: 'test consume class',
            success: false,
            message: ''
        };

        addRoute('consumeclass', { component: new ConsumeClassComponent1(), root: 'consumeclasscomponent' });
        route('consumeclass');

        const ele = document.getElementById('consumeclasscomponent');

        result.success = ele && ele.children && ele.children.length === 0 && ele.textContent === 'Consume class test.';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996DetachDetector() {
        const result = {
            test: 'test consume class',
            success: false,
            message: ''
        };

        const detachDetectorComp = new TestDetachDetectorComponent();
        mount('testdetachdetectorcomponent', detachDetectorComp, true);

        const isCompAttached = isDetectorAttached('testdetachdetectorcomponent');

        detachDetector('testdetachdetectorcomponent');

        const isCompAttachedFinal = isDetectorAttached('testdetachdetectorcomponent');

        result.success = isCompAttached && !isCompAttachedFinal;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testStateExists() {
        const result = {
            test: 'test internal state exists',
            success: false,
            message: ''
        };

        const stateDefined = s._state;

        result.success = stateDefined !== null && stateDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testDestroyFunctionMapExists() {
        const result = {
            test: 'test internal destroy function map exists',
            success: false,
            message: ''
        };

        const mapDefined = s._destroyFuncMap;

        result.success = mapDefined !== null && mapDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testUpdateMapExists() {
        const result = {
            test: 'test internal update map exists',
            success: false,
            message: ''
        };

        const mapDefined = s._updateMap;

        result.success = mapDefined !== null && mapDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testAfterInitListExists() {
        const result = {
            test: 'test internal slAfterInit list exists',
            success: false,
            message: ''
        };

        const listDefined = s._afterInitArr;

        result.success = listDefined !== null && listDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testDestroyNodeMapExists() {
        const result = {
            test: 'test internal destroy node map exists',
            success: false,
            message: ''
        };

        const mapDefined = s._destroyNodeMap;

        result.success = mapDefined !== null && mapDefined !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testChangeDetectorConstants() {
        const result = {
            test: 'test change detection constants',
            success: false,
            message: ''
        };

        const manualDefined = s.CHANGE_STRATEGY_MANUAL !== null && s.CHANGE_STRATEGY_MANUAL !== undefined;
        const automaticDefined = s.CHANGE_STRATEGY_AUTOMATIC !== null && s.CHANGE_STRATEGY_AUTOMATIC !== undefined;

        result.success = manualDefined && automaticDefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize999DefaultRoute() {
        const result = {
            test: 'test default route',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            const state = getState();

            if (window.globalAsyncCount === 0 && window.globalTestCount >= state.testCount - 1) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                addRoute('.*', { component: new TestDefaultRouteComponent1(), root: 'testdefaultroute' });

                route('abcdefghijklmnopqrstuvwxyz');

                const ele = document.getElementById('testdefaultroute');
                const correctTextAfterRoute = ele && ele.childNodes && ele.childNodes.length === 1 && ele.innerText === 'Default route content.';

                result.success = ele && correctTextAfterRoute;

                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize996WrapDetector() {
        const result = {
            test: 'test wrap function with change detector',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                s.DETACHED_SET_TIMEOUT(() => {
                    let state = getState();
                    state.wrapDetector = 0;
                    setState(state);

                    addRoute('wrapdetector', { component: new TestWrapDetectorComponent1(), root: 'testwrapdetector' });
                    route('wrapdetector');

                    s.DETACHED_SET_TIMEOUT(() => {
                        state = getState();
                        const originalWrapCount = state.wrapDetector;

                        const someFunc = () => { console.log('Wrap detector'); };
                        const wrappedFunc = wrapWithChangeDetector(someFunc);

                        wrappedFunc();

                        s.DETACHED_SET_TIMEOUT(() => {
                            state = getState();
                            const correctCount = state.wrapDetector === originalWrapCount + 1;

                            result.success = correctCount;

                            window.globalTestResults.push(result);
                            window.globalTestCount++;
                            window.globalAsyncCount--;
                        }, 100);
                    }, 100);
                }, 100);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize999RemoveRoute() {
        const result = {
            test: 'test remove route',
            success: false,
            message: ''
        };

        addRoute('routetoremove', { component: new TestRemoveRouteComponent1(), root: 'testremoveroute' });
        removeRoute('routetoremove');

        route('routetoremove');

        const ele = document.getElementById('testremoveroute');

        result.success = !ele || !ele.children || ele.children.length === 0;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testVersionTruthy() {
        const result = {
            test: 'test version truthy',
            success: false,
            message: ''
        };

        const slingVersion = version();

        result.success = slingVersion !== null && slingVersion !== undefined;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996ManualChangeDetection() {
        const result = {
            test: 'test manual change detection',
            success: false,
            message: ''
        };

        let state = getState();
        state.manualChanges = 0;
        setState(state);

        const manualChangeComp = new TestManualChangeDetectionComponent1();

        addRoute('manualchange', { component: manualChangeComp, root: 'testmanualchange' });
        const attachDetector = false;
        const params = {};
        route('manualchange', params, attachDetector);

        const isCompAttached = isDetectorAttached('testmanualchange');

        state = getState();
        const changeCountCorrect = state.manualChanges === 1;

        const buttonEle = document.getElementById('manualincrementbutton');
        buttonEle.click();

        state = getState();
        const changeCountCorrect2 = state.manualChanges === 1;

        detectChanges();

        state = getState();
        const changeCountCorrect3 = state.manualChanges === 1;

        update('testmanualchange', manualChangeComp);

        state = getState();
        const changeCountCorrect4 = state.manualChanges === 2;

        result.success = changeCountCorrect && changeCountCorrect2 && changeCountCorrect3 && changeCountCorrect4 && !isCompAttached;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize998ManualChangeDetection() {
        const result = {
            test: 'test manual change detection strategy',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                const attachDetector = true;
                const params = {};
                route('manualchange', params, attachDetector);

                let state = getState();
                const changeCountCorrect = state.manualChanges > 0;
                const originalChangeCount = state.manualChanges;

                setDetectionStrategy(s.CHANGE_STRATEGY_MANUAL);

                const buttonEle = document.getElementById('manualincrementbutton');
                buttonEle.click();

                s.DETACHED_SET_TIMEOUT(() => {
                    state = getState();
                    const changeCountCorrect2 = state.manualChanges === originalChangeCount;

                    setDetectionStrategy(s.CHANGE_STRATEGY_AUTOMATIC);

                    buttonEle.click();

                    s.DETACHED_SET_TIMEOUT(() => {
                        state = getState();
                        const changeCountCorrect3 = state.manualChanges === originalChangeCount + 1;

                        result.success = changeCountCorrect && changeCountCorrect2 && changeCountCorrect3;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 25);
                }, 25);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testFinalize996SsrHydrate() {
        const result = {
            test: 'test SSR hydration',
            success: false,
            message: ''
        };

        hydrate('testssrhydrate');

        const buttonEle = document.getElementById('ssrTest2');
        buttonEle.click();

        s.DETACHED_SET_TIMEOUT(() => {
            const ssrDivEle = document.getElementById('ssrTest1');
            const nodeDefined = ssrDivEle && ssrDivEle.childNodes;
            const contentCorrect = nodeDefined && ssrDivEle.childNodes[0].textContent === 'Hydrated function called.';

            result.success = contentCorrect;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 0);
    }

    testFinalize996SsrHydrateWithThis() {
        const result = {
            test: 'test SSR hydration using this',
            success: false,
            message: ''
        };

        this.TestSsrHydrateComponent4 = TestSsrHydrateComponent4;
        const boundHydrate = hydrate.bind(this, 'testssrhydrate2');
        boundHydrate();

        const buttonEle = document.getElementById('ssrTest4');
        buttonEle.click();

        s.DETACHED_SET_TIMEOUT(() => {
            const ssrDivEle = document.getElementById('ssrTest3');
            const nodeDefined = ssrDivEle && ssrDivEle.childNodes;
            const contentCorrect = nodeDefined && ssrDivEle.childNodes[0].textContent === 'Hydrated function called.';

            result.success = contentCorrect;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 0);
    }

    testFinalize997SsrToString() {
        const result = {
            test: 'test SSR render markup to string',
            success: false,
            message: ''
        };

        const compStr = renderToString(new TestSsrHydrateComponent1());

        result.success = compStr === '<div id="testssrhydrate" slssrclass="TestSsrHydrateComponent1"><button id="ssrTest2" onclick="">Test Hydrate</button><div id="ssrTest1">Hydrated function called.</div></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997GenericHooksCallCount() {
        const result = {
            test: 'test slOnInit and slAfterInit hooks are not called needlessly',
            success: false,
            message: ''
        };

        let state = getState();
        state.genericHookTemplate = true;
        setState(state);

        mount('hooksgenericcomponent', new HooksGenericTestComponent());

        state = getState();
        const initCount = state.genericOnInit;
        const afterInitCount = state.genericAfterInit;
        state.genericHookTemplate = false;
        setState(state);

        detectChanges('hooksgenericcomponent');

        state = getState();
        const initCountFinal = state.genericOnInit;
        const afterInitCountFinal = state.genericAfterInit;

        result.success = initCount === 1 && afterInitCount === 1 && initCountFinal === 1 && afterInitCountFinal === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997DestroyHookByTemplate() {
        const result = {
            test: 'test slOnDestroy hook called for template changes',
            success: false,
            message: ''
        };

        let state = getState();
        state.onDestroyCallTemplate = true;
        state.destroyTemplateCalls = 0;
        setState(state);

        mount('destroycalltemplatecomponent', new OnDestroyCallTemplateTestComponent());

        state = getState();
        const originalCalls = state.destroyTemplateCalls;
        state.onDestroyCallTemplate = false;

        detectChanges('destroycalltemplatecomponent');

        state = getState();
        const finalCalls = state.destroyTemplateCalls;

        result.success = originalCalls === 0 && finalCalls === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997DestroyHookWithoutRouter() {
        const result = {
            test: 'test slOnDestroy hook called without router call',
            success: false,
            message: ''
        };

        let state = getState();
        state.destroyHook2Called = false;
        setState(state);

        mount('destroyhookcalledcomponent', new DestroyHookCalledTestComponent());

        state = getState();
        const initiallyFalse = state.destroyHook2Called === false;
        state.forceDestroyHook = true;
        setState(state);

        detectChanges('destroyhookcalledcomponent');

        state = getState();

        result.success = initiallyFalse && state.destroyHook2Called === true;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997OnInitThis() {
        const result = {
            test: 'test slOnInit this reference',
            success: false,
            message: ''
        };

        mount('oninitthiscomponent', new OnInitThisTestComponent());

        const state = getState();

        result.success = state.onInitThis === true;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997OnDestroyCalls() {
        const result = {
            test: 'test slOnDestroy called correct number of times',
            success: false,
            message: ''
        };

        const originalRoute = getRoute();

        addRoute('testdestroycalls', { component: new OnDestroyCallTestComponent(), root: 'destroycallcomponent' });
        route('testdestroycalls');

        let state = getState();
        state.onDestroyCall = true;
        setState(state);

        detectChanges('destroycallcomponent');

        route(originalRoute);

        state = getState();
        const destroyCalls = state.destroyCalls;

        result.success = destroyCalls === 2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997AfterInitCalls() {
        const result = {
            test: 'test slAfterInit called correct number of times',
            success: false,
            message: ''
        };

        mount('initcallcomponent', new AfterInitCallTestComponent());

        let state = getState();
        state.afterInitCall = true;
        setState(state);

        detectChanges('initcallcomponent');

        state = getState();
        const initCalls = state.initCalls;

        result.success = initCalls === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997OnInitCalls() {
        const result = {
            test: 'test slOnInit called correct number of times',
            success: false,
            message: ''
        };

        mount('oninitcallcomponent', new OnInitCallTestComponent());

        let state = getState();
        state.onInitCall = true;
        setState(state);

        detectChanges('oninitcallcomponent');

        state = getState();
        const initCalls = state.onInitCalls;

        result.success = initCalls === 1;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997UseExsting() {
        const result = {
            test: 'test use existing directive',
            success: false,
            message: ''
        };

        mount('divsheetcontent', new PartSupplyComponent());

        detectChanges();

        let chartEle = document.getElementById('divsheetcontent');

        if (chartEle && chartEle.children && chartEle.children.length > 0) {
            chartEle = chartEle.children[0];
        }

        const classList = chartEle.classList;
        const hasChartClass = classList.contains('js-plotly-plot');

        let child = null;
        let childHasClass1 = false;
        let childHasClass2 = false;

        if (chartEle && chartEle.children && chartEle.children.length > 0) {
            child = chartEle.children[0];
            childHasClass1 = child.classList.contains('plot-container');
            childHasClass2 = child.classList.contains('plotly');
        }

        result.success = chartEle && chartEle.children && chartEle.children.length > 0 && hasChartClass && child && childHasClass1 && childHasClass2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997SingleComponentUpdate() {
        const result = {
            test: 'test update single component',
            success: false,
            message: ''
        };

        let state = getState();
        state.testSingle = false;
        state.testSingle2 = false;
        setState(state);

        mount('testsinglecomponent1', new TestUpdateSingleComponent1());
        mount('testsinglecomponent2', new TestUpdateSingleComponent2());

        let firstEle = document.getElementById('testsinglecomponent1');
        const firstEleCorrect = firstEle && firstEle.textContent === 'Is test single false.';

        let secondEle = document.getElementById('testsinglecomponent2');
        const secondEleCorrect = secondEle && secondEle.textContent === 'Is test single false.';

        state = getState();
        state.testSingle = true;
        state.testSingle2 = true;
        setState(state);

        detectChanges('testsinglecomponent1');

        firstEle = document.getElementById('testsinglecomponent1');
        const firstEleCorrect2 = firstEle && firstEle.textContent === 'Is test single true.';

        secondEle = document.getElementById('testsinglecomponent2');
        const secondEleCorrect2 = secondEle && secondEle.textContent === 'Is test single false.';

        result.success = firstEleCorrect && secondEleCorrect && firstEleCorrect2 && secondEleCorrect2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997InsertBeforeDomStructure() {
        const result = {
            test: 'test insert before call on tag name change does not adversely impact DOM structure',
            success: false,
            message: ''
        };

        let state = getState();
        state.showPreview = false;
        setState(state);

        const contentComp = new ContentPanelComponent();
        mount('divcontentpanel', contentComp);

        state = getState();
        state.showPreview = true;
        setState(state);

        detectChanges();

        const contentEle = document.getElementById('divcontentpanel');

        state = getState();
        const afterInitCalled = state.sourcePanelAfterInit === true;

        const correctChild = contentEle && contentEle.children && contentEle.children.length === 1
            && contentEle.children[0].tagName === 'DIV';
        const correctNestedChild = contentEle && contentEle.children && contentEle.children.length === 1
            && contentEle.children[0].children && contentEle.children[0].children.length === 1 && contentEle.children[0].children[0].tagName === 'DIV';

        let nestedChild = null;
        let previewChildren = null;
        let hasPreviewChildren = false;

        if (contentEle && contentEle.children && contentEle.children.length === 1 && contentEle.children[0].children
            && contentEle.children[0].children.length === 1) {
            nestedChild = contentEle.children[0].children[0];

            if (nestedChild && nestedChild.children && nestedChild.children.length === 1) {
                hasPreviewChildren = true;
                previewChildren = nestedChild.children[0];
            }
        }

        let correctFirstEle = false;
        let correctSecondEle = false;
        let correctThirdEle = false;
        let correctFourthEle = false;

        let firstEleAttr1 = false;
        let secondEleAttr1 = false;
        let thirdEleAttr1 = false;
        let thirdEleAttr2 = false;
        let thirdEleAttr3 = false;
        let thirdEleAttr4 = false;
        let fourthEleAttr1 = false;
        let fourthEleAttr2 = false;
        let fourthEleAttr3 = false;
        let fourthEleAttr4 = false;

        if (hasPreviewChildren) {
            correctFirstEle = previewChildren && previewChildren.children && previewChildren.children.length > 0 && previewChildren.children[0].tagName === 'H4';
            correctSecondEle = previewChildren && previewChildren.children && previewChildren.children.length > 1 && previewChildren.children[1].tagName === 'DIV';
            correctThirdEle = previewChildren && previewChildren.children && previewChildren.children.length > 2 && previewChildren.children[2].tagName === 'IFRAME';
            correctFourthEle = previewChildren && previewChildren.children && previewChildren.children.length > 3 && previewChildren.children[3].tagName === 'TEXTAREA';
        }

        if (correctFirstEle) {
            firstEleAttr1 = previewChildren.children[0].getAttribute('style') !== null;
        }

        if (correctSecondEle) {
            secondEleAttr1 = previewChildren.children[1].getAttribute('style') !== null;
        }

        if (correctThirdEle) {
            thirdEleAttr1 = previewChildren.children[2].getAttribute('style') !== null;
            thirdEleAttr2 = previewChildren.children[2].getAttribute('sldirective') !== null;
            thirdEleAttr3 = previewChildren.children[2].getAttribute('id') !== null;
            thirdEleAttr4 = previewChildren.children[2].getAttribute('frameborder') !== null;
        }

        if (correctFourthEle) {
            fourthEleAttr1 = previewChildren.children[3].getAttribute('style') !== null;
            fourthEleAttr2 = previewChildren.children[3].getAttribute('placeholder') !== null;
            fourthEleAttr3 = previewChildren.children[3].getAttribute('sldirective') !== null;
            fourthEleAttr4 = previewChildren.children[3].getAttribute('id') !== null;
        }

        result.success = afterInitCalled && correctChild && correctNestedChild && hasPreviewChildren && correctFirstEle && correctSecondEle && correctThirdEle && correctFourthEle
            && firstEleAttr1 && secondEleAttr1 && thirdEleAttr1 && thirdEleAttr2 && thirdEleAttr3 && thirdEleAttr4 && fourthEleAttr1
            && fourthEleAttr2 && fourthEleAttr3 && fourthEleAttr4;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997OnlySelf() {
        const result = {
            test: 'test only self directive',
            success: false,
            message: ''
        };

        const onlySelfComp = new TestOnlySelfComponent1();
        mount('tryit-sling-iframe', onlySelfComp);

        const iframe = document.getElementById('tryit-sling-iframe');

        const htmlContainer = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
        htmlContainer.document.open();
        htmlContainer.document.write('<p>Hello, world!</p>');
        htmlContainer.document.close();

        detectChanges();

        const iframeEle = document.getElementById('tryit-sling-iframe');

        const correctBorder = iframeEle && iframeEle.getAttribute('frameborder') === '0';
        const correctId = iframeEle && iframeEle.id === 'tryit-sling-iframe';
        const onlySelfDirective = iframeEle && iframeEle.getAttribute('sldirective') === 'onlyself';
        const correctStyle = iframeEle && iframeEle.style.cssText === 'background-color: rgb(255, 255, 255);';

        result.success = correctBorder && correctId && onlySelfDirective && correctStyle;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997NestedConsumeClass() {
        const result = {
            test: 'test nested consume class',
            success: false,
            message: ''
        };

        const nestedComp = new TestNestedConsumeClassComponent1();
        mount('testnestedconsume', nestedComp);

        const ele = document.getElementById('testnestedconsume');

        const eleCorrect = ele && ele.tagName === 'DIV' && ele.children && ele.children.length === 1;
        const childCorrect = ele && ele.children && ele.children.length > 0 && ele.children[0].tagName === 'DIV'
            && ele.children[0].children && ele.children[0].children.length === 1;
        const secondChildCorrect = ele && ele.children && ele.children.length > 0 && ele.children[0].children
            && ele.children[0].children.length > 0 && ele.children[0].children[0].tagName === 'SPAN'
            && ele.children[0].children[0].textContent === 'Consumed class text.';

        result.success = eleCorrect && childCorrect && secondChildCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997NestedConsumeClassWithHook() {
        const result = {
            test: 'test nested consume class hook called',
            success: false,
            message: ''
        };

        const nestedComp = new TestNestedConsumeClassComponent4();
        mount('testnestedconsume2', nestedComp);

        const state = getState();
        const ele = document.getElementById('testnestedconsume2');

        const eleCorrect = ele && ele.tagName === 'DIV' && ele.children && ele.children.length === 1;
        const childCorrect = ele && ele.children && ele.children.length > 0 && ele.children[0].tagName === 'DIV'
            && ele.children[0].children && ele.children[0].children.length === 1;
        const secondChildCorrect = ele && ele.children && ele.children.length > 0 && ele.children[0].children
            && ele.children[0].children.length > 0 && ele.children[0].children[0].tagName === 'SPAN'
            && ele.children[0].children[0].textContent === 'Consumed class text with hook.';
        const hookCalled = state.nestedConsumeHook === true;

        result.success = eleCorrect && childCorrect && secondChildCorrect && hookCalled;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize997SsrConsumeClass() {
        const result = {
            test: 'test SSR consume class',
            success: false,
            message: ''
        };

        const compStr = renderToString(new TestSsrHydrateComponent2());

        result.success = compStr === '<div id="testssrhydrate2" slssrclass="TestSsrHydrateComponent2"><div>Test consume class.</div></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996TestTrustDirective() {
        const result = {
            test: 'test trust directive',
            success: false,
            message: ''
        };

        addRoute('testtrust', { component: new TestTrustDirectiveComponent1(), root: 'testtrustdirective' });

        route('testtrust');

        const ele = document.getElementById('testtrustdirective');

        const correctChildCount = ele && ele.children && ele.children.length === 2;

        result.success = correctChildCount;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996NestedDestroyHook() {
        const result = {
            test: 'test nested destroy hook called',
            success: false,
            message: ''
        };

        addRoute('nesteddestroy1', { component: new TestNestedDestroyHookComponent1(), root: 'testnesteddestroyhook' });
        addRoute('nesteddestroy2', { component: new TestNestedDestroyHookComponent3(), root: 'testnesteddestroyhook' });

        route('nesteddestroy1');

        let state = getState();

        const origEle = document.getElementById('testnesteddestroyhook');
        const correctOriginalText = origEle && origEle.childNodes && origEle.childNodes.length > 0 && origEle.innerText === 'Root component markup.\nNested destroy hook.';
        const rootDestroyCalledOriginally = state.rootDestroy === undefined || state.rootDestroy === null;
        const nestedDestroyCalledOriginally = state.nestedDestroy === undefined || state.nestedDestroy === null;

        route('nesteddestroy2');

        const rootDestroyCalled = state.rootDestroy === true;
        const nestedDestroyCalled = state.nestedDestroy === true;
        const ele = document.getElementById('testnesteddestroyhook');
        const correctTextAfterRoute = ele && ele.childNodes && ele.childNodes.length === 1 && ele.innerText === 'Plain root component markup.';

        result.success = rootDestroyCalledOriginally && nestedDestroyCalledOriginally && rootDestroyCalled && nestedDestroyCalled && correctTextAfterRoute
            && correctOriginalText;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996NestedHooks() {
        const result = {
            test: 'test nested on init and after init hooks called',
            success: false,
            message: ''
        };

        addRoute('nestedhook1', { component: new TestNestedAfterInitHookComponent1(), root: 'testnestedafterinithook' });
        addRoute('nestedhook2', { component: new TestNestedAfterInitHookComponent3(), root: 'testnestedafterinithook' });

        let state = getState();

        const rootAfterInitCalledOriginally = state.rootAfterInit === undefined || state.rootAfterInit === null;
        const nestedAfterInitCalledOriginally = state.nestedAfterInit === undefined || state.nestedAfterInit === null;
        const rootOnInitCalledOriginally = state.rootOnInit === undefined || state.rootOnInit === null;
        const nestedOnInitCalledOriginally = state.nestedOnInit === undefined || state.nestedOnInit === null;

        route('nestedhook1');

        const origEle = document.getElementById('testnestedafterinithook');
        const correctOriginalText = origEle && origEle.childNodes && origEle.childNodes.length > 0 && origEle.innerText === 'Root component markup.\nNested after init and on init hooks.';
        const rootAfterInitCalled = state.rootAfterInit === true;
        const nestedAfterInitCalled = state.nestedAfterInit === true;
        const rootOnInitCalled = state.rootOnInit === true;
        const nestedOnInitCalled = state.nestedOnInit === true;

        route('nestedhook2');

        const ele = document.getElementById('testnestedafterinithook');
        const correctTextAfterRoute = ele && ele.childNodes && ele.childNodes.length === 1 && ele.innerText === 'Plain root component markup.';

        result.success = rootAfterInitCalledOriginally && nestedAfterInitCalledOriginally && rootOnInitCalledOriginally && nestedOnInitCalledOriginally
            && correctOriginalText && rootAfterInitCalled && nestedAfterInitCalled && rootOnInitCalled && nestedOnInitCalled && correctTextAfterRoute;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996NestedHooksMultipleComponents() {
        const result = {
            test: 'test nested on init and after init hooks called with multiple components',
            success: false,
            message: ''
        };

        addRoute('nestedhook3', { component: new TestNestedHookComponent1(), root: 'testnestedhook' });
        addRoute('nestedhook4', { component: new TestNestedHookComponent3(), root: 'testnestedhook' });

        let state = getState();

        const rootAfterInitCalledOriginally = state.rootAfterInit2 === undefined || state.rootAfterInit2 === null;
        const nestedAfterInitCalledOriginally = state.nestedAfterInit2 === undefined || state.nestedAfterInit2 === null;
        const rootOnInitCalledOriginally = state.rootOnInit2 === undefined || state.rootOnInit2 === null;
        const nestedOnInitCalledOriginally = state.nestedOnInit2 === undefined || state.nestedOnInit2 === null;

        state.rootAfterInit2 = 0;
        state.rootOnInit2 = 0;
        state.nestedOnInit2 = 0;
        state.nestedAfterInit2 = 0;
        setState(state);

        route('nestedhook3');

        const rootAfterInitCalled = state.rootAfterInit2 === 1;
        const nestedAfterInitCalled = state.nestedAfterInit2 === 2;
        const rootOnInitCalled = state.rootOnInit2 === 1;
        const nestedOnInitCalled = state.nestedOnInit2 === 2;

        result.success = rootAfterInitCalledOriginally && nestedAfterInitCalledOriginally && rootOnInitCalledOriginally && nestedOnInitCalledOriginally
            && rootAfterInitCalled && nestedAfterInitCalled && rootOnInitCalled && nestedOnInitCalled;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996CanDeactivateRouterHook() {
        const result = {
            test: 'test can deactivate router hook',
            success: false,
            message: ''
        };

        addRoute('deactivate1', {
            component: new TestCanDeactiveComponent(), root: 'testcandeactivate', onCanDeactivate: () => {
                const state = getState();
                return state.canDeactivate === true;
            }
        });
        addRoute('deactivate2', { component: new TestCanDeactiveComponent2(), root: 'testcandeactivate' });

        route('deactivate1');

        let ele = document.getElementById('testcandeactivate');
        const correctText = ele && ele.innerText === 'Can deactivate component.';

        route('deactivate2');

        ele = document.getElementById('testcandeactivate');
        const correctFinalText = ele && ele.innerText === 'Can deactivate component.';

        result.success = correctText && correctFinalText;

        const state = getState();
        state.canDeactivate = true;
        setState(state);

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996ObserableRoute() {
        const result = {
            test: 'test route observable changes correctly',
            success: false,
            message: ''
        };

        let state = getState();
        state.observable = 0;
        setState(state);

        route('');

        let routeObservable = Observable(getRouteSegments());
        routeObservable.subscribe(function (routeArr) {
            state = getState();
            if (state.observable !== undefined && state.observable !== null) state.observable++;
            setState(state);
        });

        state = getState();
        const correctOriginalCount = state.observable === 0;

        route('basictest/5');

        state = getState();
        const correctCount = state.observable === 1;

        const segments = getRouteSegments();
        const correctSegment1 = segments && segments.length > 0 && segments[0] === 'basictest';
        const correctSegment2 = segments && segments.length > 1 && segments[1] === '5';

        result.success = correctOriginalCount && correctCount && correctSegment1 && correctSegment2;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize996RouteSegments() {
        const result = {
            test: 'test get route segments',
            success: false,
            message: ''
        };

        route('basictest/5');

        const currentRoute = getRoute();
        const correctRoute = currentRoute === 'basictest/5';

        const segments = getRouteSegments();
        const correctSegment1 = segments && segments.length > 0 && segments[0] === 'basictest';
        const correctSegment2 = segments && segments.length > 1 && segments[1] === '5';

        result.success = segments && correctSegment1 && correctSegment2 && correctRoute;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize995DebouncedDetection() {
        const result = {
            test: 'test debounced change detection',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let state = getState();
                state.debounce = 0;
                setState(state);

                mount('testdebouncecomponent', new TestDebounceDetectionComponent());
                const buttonEle = document.getElementById('debounceToggleButton');

                state = getState();
                const originalCount = state.debounce;

                s.DETACHED_SET_TIMEOUT(() => {
                    const startTime = new Date();

                    buttonEle.click();
                    buttonEle.click();
                    buttonEle.click();
                    buttonEle.click();
                    buttonEle.click();

                    const endTime = new Date();
                    const ellapsedMillis = endTime - startTime;
                    const changeCycles = Math.ceil(ellapsedMillis / 17.0);

                    s.DETACHED_SET_TIMEOUT(() => {
                        state = getState();
                        // Initial mount, one call for 5 clicks, plus final debounced call
                        result.success = state.debounce === originalCount + changeCycles + 1;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 100);
                }, 100);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize990RouteComplex() {
        const result = {
            test: 'test basic route with parameter',
            success: false,
            message: ''
        };

        mount('routecomponent', new NoRouteComponent());
        addRoute('complextest/:someId/static/:someParam', { component: new RouteComplexComponent(), root: 'routecomponent' });
        route('complextest/5/static/foo');

        const currentRoute = getRoute();
        const correctRoute = currentRoute === 'complextest/5/static/foo';

        const divEle = document.getElementById('routecomponent');

        const correctText = divEle.textContent === 'Complex route taken.';

        result.success = correctText && correctRoute;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize950RebindDetection() {
        const result = {
            test: 'test rebinding change detection to bound functions',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let stateObj = getState();
                stateObj.count2 = 0;
                setState(stateObj);

                mount('testtagcomponent3', new TestRebindDetectionComponent());

                const ele = document.getElementById('toggleModeButton4');
                ele.click();
                s.DETACHED_SET_TIMEOUT(() => {
                    ele.click();

                    s.DETACHED_SET_TIMEOUT(() => {
                        stateObj = getState();

                        const updateCountCorrect = stateObj.count2 && stateObj.count2 === 3;

                        const removeElementsButton = document.getElementById('toggleModeButton3');
                        removeElementsButton.click();

                        s.DETACHED_SET_TIMEOUT(() => {
                            const rowEle = document.getElementById('testTagRow3');
                            const rowsReducedCorrect = rowEle && rowEle.children.length === 1 && rowEle.children[0].childNodes.length === 1;

                            removeElementsButton.click();

                            s.DETACHED_SET_TIMEOUT(() => {
                                const rowsRestoredCorrect = rowEle && rowEle.children.length === 3;

                                ele.click();

                                s.DETACHED_SET_TIMEOUT(() => {
                                    const correctDiv1 = rowEle && rowEle.children.length === 3 && rowEle.children[0].textContent === 'Mode: 0';
                                    const correctDiv2 = rowEle && rowEle.children.length === 3 && rowEle.children[1].textContent === 'Mode: 0';
                                    const correctDiv3 = rowEle && rowEle.children.length === 3 && rowEle.children[2].textContent === 'Mode: 0';

                                    s.DETACHED_SET_TIMEOUT(() => {
                                        const changeDetectionCalled = stateObj.count2 && stateObj.count2 === 6;

                                        result.success = updateCountCorrect && rowsReducedCorrect && rowsRestoredCorrect && changeDetectionCalled
                                            && correctDiv1 && correctDiv2 && correctDiv3;

                                        window.globalTestResults.push(result);
                                        window.globalTestCount++;
                                        window.globalAsyncCount--;
                                    }, 200);
                                }, 200);
                            }, 200);
                        }, 200);
                    }, 200);
                }, 200);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize990DomStringReplacement() {
        const result = {
            test: 'test DOMString replacement of a child node',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                const domStringComp = new TestDomStringComponent();
                mount('testdomstring', domStringComp);

                const domStrRoot = document.getElementById('testdomstring');

                const correctOriginalChildCount = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2;
                const correctOriginalDivCount = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                    && domStrRoot.children[1].childNodes && domStrRoot.children[1].childNodes.length === 2;
                const correctOriginalTag = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                    && domStrRoot.children[1].childNodes && domStrRoot.children[1].childNodes[0].tagName === 'LABEL';
                const correctOriginalTag2 = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                    && domStrRoot.children[1].childNodes && domStrRoot.children[1].childNodes[1].tagName === 'INPUT';

                const domStrButton = document.getElementById('domStringButton');
                domStrButton.click();

                s.DETACHED_SET_TIMEOUT(() => {
                    const correctChildCount = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2;
                    const correctDivCount = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                        && domStrRoot.children[1].childNodes && domStrRoot.children[1].childNodes.length === 1;
                    const correctTag = domStrRoot && domStrRoot.children && domStrRoot.children.length === 2
                        && domStrRoot.children[1].childNodes.tagName === undefined;

                    result.success = correctOriginalChildCount && correctOriginalDivCount && correctOriginalTag && correctOriginalTag2
                        && correctChildCount && correctDivCount && correctTag;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;

                    clearInterval(waitForStableInterval);
                }, 100);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    dummyOnClickFunction() {
        console.log('Testing...');
    }

    testRenderElement() {
        const result = {
            test: 'test render element function',
            success: false,
            message: ''
        };

        const nodeMarkup = markup('tr', {
            attrs: {
                'style': 'color:red;',
                'class': 'some-fake-class',
                onclick: this.dummyOnClickFunction
            },
            children: [
                textNode('Hello, world!')
            ]
        });
        const node = renderElement(nodeMarkup);

        const correctTag = node.tagName && node.tagName === 'TR';
        const correctStyle = node.getAttribute('style') === 'color:red;';
        const correctClass = node.getAttribute('class') === 'some-fake-class';
        const correctChildren = node.childNodes && node.childNodes.length === 1 && node.childNodes[0].data === 'Hello, world!';
        const correctOnClick = node.onclick && typeof node.onclick === 'function';

        result.success = correctTag && correctStyle && correctClass && correctChildren && correctOnClick;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize960AnimateDestroy() {
        const result = {
            test: 'test animation of element before destroy',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);
                mount('divanimatedestroy', new TestDestroyAnimateComponent1());

                const originalEle = document.getElementById('h1toanimate');
                const originallyExists = originalEle !== null && originalEle !== undefined && originalEle.tagName === 'H1';

                const startAnimateButton = document.getElementById('startanimatedestroy');
                startAnimateButton.click();

                s.DETACHED_SET_TIMEOUT(() => {
                    const delayedEle = document.getElementById('h1toanimate');
                    const delayedExists = delayedEle !== null && delayedEle !== undefined && delayedEle.tagName === 'H1';

                    s.DETACHED_SET_TIMEOUT(() => {
                        const deletedEle = document.getElementById('h1toanimate');
                        const deletedSuccess = deletedEle == undefined || deletedEle === null;

                        result.success = originallyExists && delayedExists && deletedSuccess;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 1200);
                }, 1000);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize960XhrReuse() {
        const result = {
            test: 'test XMLHttpRequest object reuse with multiple send requests',
            success: false,
            message: ''
        };

        const xhr1 = new XMLHttpRequest();

        xhr1.onload = function () {
            console.log('testFinalize960XhrReuse XHR load completed');

            onloadCount++;
            if (this.response !== null && this.response !== undefined && this.response !== '') responseNotEmptyCount++;

            result.success = onloadCount === NUMBER_OF_REQUESTS && responseNotEmptyCount === NUMBER_OF_REQUESTS;

            if (onloadCount === NUMBER_OF_REQUESTS) {
                addedResult = true;
                window.globalTestResults.push(result);
                window.globalTestCount++;
            } else {
                xhr1.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

                console.log('testFinalize960XhrReuse before send');
                xhr1.send(null);
                console.log('testFinalize960XhrReuse after send');
            }
        };

        let onloadCount = 0;
        let responseNotEmptyCount = 0;
        let addedResult = false;
        const NUMBER_OF_REQUESTS = 2;

        xhr1.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

        console.log('testFinalize960XhrReuse before send');
        xhr1.send(null);
        console.log('testFinalize960XhrReuse after send');

        s.DETACHED_SET_TIMEOUT(() => {
            if (!addedResult) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        }, 12000);
    }

    testFinalize960TimeoutFunctionTriggersChanges() {
        const result = {
            test: 'test setTimeout function argument triggers change detection',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                mount('divtimeoutcdr', new TimeoutTestComponent1());

                setTimeout(() => {
                    const state = getState();
                    const cdrcount = state.timeoutcdr;

                    result.success = cdrcount === 2;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
                }, 250);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize960NestedClassRenderedToString() {
        const result = {
            test: 'test nested class rendered to string properly',
            success: false,
            message: ''
        };

        const compStr = renderToString(new TestControllerComponent2());

        result.success = compStr === '<div class="container" id="main2"><div class="jumbotron"><div class="row"><div class="col-md-6"><h1>Sling.js</h1></div><div class="col-md-6"><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="run2" onclick="">Create 1,000 rows</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="runlots2" onclick="">Create 10,000 rows</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="add2" onclick="">Append 1,000 rows</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="update2" onclick="">Update every 10th row</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="clear2" onclick="">Clear</button></div><div class="col-sm-6 smallpad"><button type="button" class="btn btn-primary btn-block" id="swaprows2" onclick="">Swap Rows</button></div></div></div></div><table class="table table-hover table-striped test-data" id="idcontrollertable2"><tbody><tr class="" onclick="" onremove=""><td class="col-md-1">1</td><td class="col-md-4"><a href="#" onclick="">pretty red table</a></td><td class="col-md-1"><a href="#" id="id-row-delete-1" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">2</td><td class="col-md-4"><a href="#" onclick="">clean orange pizza</a></td><td class="col-md-1"><a href="#" id="id-row-delete-2" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">3</td><td class="col-md-4"><a href="#" onclick="">important black cookie</a></td><td class="col-md-1"><a href="#" id="id-row-delete-3" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">4</td><td class="col-md-4"><a href="#" onclick="">short white desk</a></td><td class="col-md-1"><a href="#" id="id-row-delete-4" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">5</td><td class="col-md-4"><a href="#" onclick="">helpful brown chair</a></td><td class="col-md-1"><a href="#" id="id-row-delete-5" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">6</td><td class="col-md-4"><a href="#" onclick="">pretty purple mouse</a></td><td class="col-md-1"><a href="#" id="id-row-delete-6" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">7</td><td class="col-md-4"><a href="#" onclick="">clean brown sandwich</a></td><td class="col-md-1"><a href="#" id="id-row-delete-7" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">8</td><td class="col-md-4"><a href="#" onclick="">important pink car</a></td><td class="col-md-1"><a href="#" id="id-row-delete-8" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">9</td><td class="col-md-4"><a href="#" onclick="">short green house</a></td><td class="col-md-1"><a href="#" id="id-row-delete-9" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr><tr class="" onclick="" onremove=""><td class="col-md-1">10</td><td class="col-md-4"><a href="#" onclick="">helpful blue keyboard</a></td><td class="col-md-1"><a href="#" id="id-row-delete-10" onclick=""><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td><td class="col-md-6"></td></tr></tbody></table><span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span></div>';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize960NestedClassConsumedInChild() {
        const result = {
            test: 'test nested class consumed in child properly',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                mount('testnestedchild1', new TestControllerComponent1());

                const addBtn = document.getElementById('add');
                addBtn.click();

                s.DETACHED_SET_TIMEOUT(() => {
                    let tableEle = document.getElementById('idcontrollertable');
                    let tbodyEle = tableEle.children[0];

                    const correctRowCount = tbodyEle && tbodyEle.children && tbodyEle.children.length === 10;

                    const deleteBtn = document.getElementById('id-row-delete-2');
                    deleteBtn.click();

                    s.DETACHED_SET_TIMEOUT(() => {
                        tableEle = document.getElementById('idcontrollertable');
                        tbodyEle = tableEle.children[0];

                        const correctRowCountAfterDelete = tbodyEle && tbodyEle.children && tbodyEle.children.length === 9;

                        result.success = correctRowCount && correctRowCountAfterDelete;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;
                        window.globalAsyncCount--;
                    }, 200);
                }, 200);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize960RebindDetection() {
        const result = {
            test: 'test rebinding change detection to bound functions with complex markup',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let stateObj = getState();
                stateObj.count4 = 0;
                setState(stateObj);

                mount('testtagcomponent5', new TestRebindDetectionComplexComponent());

                const ele = document.getElementById('toggleModeButton8');
                ele.click();
                s.DETACHED_SET_TIMEOUT(() => {
                    ele.click();

                    s.DETACHED_SET_TIMEOUT(() => {
                        stateObj = getState();

                        const updateCountCorrect = stateObj.count4 && stateObj.count4 === 3;

                        const removeElementsButton = document.getElementById('toggleModeButton7');
                        removeElementsButton.click();

                        s.DETACHED_SET_TIMEOUT(() => {
                            const rowEle = document.getElementById('testTagRow5');
                            const rowsReducedCorrect = rowEle && rowEle.children.length === 1 && rowEle.children[0].childNodes.length === 1;

                            removeElementsButton.click();

                            s.DETACHED_SET_TIMEOUT(() => {
                                const rowsRestoredCorrect = rowEle && rowEle.children.length === 5;

                                ele.click();

                                s.DETACHED_SET_TIMEOUT(() => {
                                    const correctDiv1 = rowEle && rowEle.children.length === 5 && rowEle.children[0].textContent === 'Mode: 0 some markup and a text node';
                                    const correctDiv2 = rowEle && rowEle.children.length === 5 && rowEle.children[1].textContent === 'Toggle';
                                    const correctDiv3 = rowEle && rowEle.children.length === 5 && rowEle.children[2].textContent === 'Mode: 0 some markup and a text node';
                                    const correctDiv4 = rowEle && rowEle.children.length === 5 && rowEle.children[3].textContent === 'Toggle';
                                    const correctDiv5 = rowEle && rowEle.children.length === 5 && rowEle.children[4].textContent === 'Mode: 0 some markup and a text node';

                                    const changeDetectionCalled = stateObj.count4 && stateObj.count4 === 6;

                                    result.success = updateCountCorrect && rowsReducedCorrect && rowsRestoredCorrect && changeDetectionCalled
                                        && correctDiv1 && correctDiv2 && correctDiv3 && correctDiv4 && correctDiv5;

                                    window.globalTestResults.push(result);
                                    window.globalTestCount++;
                                    window.globalAsyncCount--;
                                }, 200);
                            }, 200);
                        }, 200);
                    }, 200);
                }, 200);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
                window.globalAsyncCount--;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testFinalize980RebindDetectionWithNonNodeType3() {
        const result = {
            test: 'test rebinding change detection to bound functions where components have markup',
            success: false,
            message: ''
        };

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                window.globalAsyncCount++;
                clearInterval(waitForStableInterval);

                let stateObj = getState();
                stateObj.count3 = 0;
                setState(stateObj);

                mount('testtagcomponent4', new TestRebindDetectionComponent2());

                const ele = document.getElementById('toggleModeButton6');
                ele.click();
                s.DETACHED_SET_TIMEOUT(() => {
                    ele.click();

                    s.DETACHED_SET_TIMEOUT(() => {
                        stateObj = getState();

                        const updateCountCorrect = stateObj.count3 && stateObj.count3 === 3;

                        const removeElementsButton = document.getElementById('toggleModeButton5');
                        removeElementsButton.click();

                        s.DETACHED_SET_TIMEOUT(() => {
                            const rowEle = document.getElementById('testTagRow4');
                            const rowsReducedCorrect = rowEle && rowEle.children.length === 1 && rowEle.children[0].childNodes.length === 1;

                            removeElementsButton.click();

                            s.DETACHED_SET_TIMEOUT(() => {
                                const rowsRestoredCorrect = rowEle && rowEle.children.length === 3;
                                const correctTd1 = rowEle && rowEle.children.length === 3 && rowEle.children[0].textContent === 'Mode: 0 <span>';
                                const correctTd3 = rowEle && rowEle.children.length === 3 && rowEle.children[2].textContent === 'Mode: 0 <span>';
                                const correctActiveRowCount = rowEle && rowEle.children.length === 3 && rowEle.children[1].children.length === 2;
                                const correctButton = rowEle && rowEle.children.length === 3 && rowEle.children[1].children.length === 2
                                    && rowEle.children[1].children[0].textContent === 'Toggle';
                                const correctInput = rowEle && rowEle.children.length === 3 && rowEle.children[1].children.length === 2
                                    && rowEle.children[1].children[1].value === '1';
                                ele.click();

                                s.DETACHED_SET_TIMEOUT(() => {
                                    const changeDetectionCalled = stateObj.count3 && stateObj.count3 === 6;

                                    result.success = updateCountCorrect && rowsReducedCorrect && rowsRestoredCorrect && changeDetectionCalled
                                        && correctTd1 && correctTd3 && correctActiveRowCount && correctButton && correctInput;

                                    window.globalTestResults.push(result);
                                    window.globalAsyncCount--;
                                    window.globalTestCount++;
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 100);
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalAsyncCount--;
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
            }
        }, 500);
    }

    testDetachedInterval() {
        const result = {
            test: 'test detached interval functions as expected',
            success: false,
            message: ''
        };

        if (s.DETACHED_SET_INTERVAL !== null && s.DETACHED_SET_INTERVAL !== undefined) {
            let initiallyExists = null;
            let slingIntervalCount = 0;

            window.globalAsyncCount++;
            setTimeout(() => {
                window.globalAsyncCount--;
                const fakeEles = document.getElementsByClassName('fakeclass1')
                initiallyExists = fakeEles.length !== 0;
            }, 25);

            const slingInterval = s.DETACHED_SET_INTERVAL(() => {
                const fakeEle = document.createElement('div');
                fakeEle.classList.add('fakeclass1');
                document.body.appendChild(fakeEle);
                slingIntervalCount++;

                if (slingIntervalCount === 2) {
                    clearInterval(slingInterval);
                }
            }, 80);

            window.globalAsyncCount++;
            setTimeout(() => {
                window.globalAsyncCount--;
                const fakeEles = document.getElementsByClassName('fakeclass1')
                const correctFinalCount = fakeEles.length === 2;

                if (initiallyExists === false && correctFinalCount === true) {
                    result.success = true;
                }

                window.globalTestCount++;
            }, 600);
        }

        window.globalTestResults.push(result);
    }

    testPriority10BoundAddNoteFunctionNotCalledNeedlessly() {
        const result = {
            test: 'test bound add note function not called needlessly',
            success: false,
            message: ''
        };

        const stateObj = getState();
        const originalAddedCount = stateObj.getNoteAddedCount();

        result.success = originalAddedCount === 0;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    addNoteManually() {
        const textArea = document.getElementById('noteInputTextArea');
        textArea.value = 'test';
        const inputEvent = {
            bubbles: true,
            cancelBubble: false,
            cancelable: false,
            composed: true,
            currentTarget: null,
            data: "h",
            dataTransfer: null,
            defaultPrevented: false,
            detail: 0,
            eventPhase: 2,
            inputType: "insertText",
            isComposing: false,
            isTrusted: true,
            path: [],
            sourceCapabilities: null,
            srcElement: null,
            target: textArea,
            timeStamp: 87124.19999999925,
            type: "input",
            view: null,
            which: 0
        };
        textArea.oninput(inputEvent);

        const addNoteButton = document.getElementById('addNoteButton');
        addNoteButton.click();

        detectChanges();
    }

    testAddNoteButton() {
        const result = {
            test: 'test add note button function runs once',
            success: false,
            message: ''
        };

        const stateObj = getState();
        const originalAddedCount = stateObj.getNoteAddedCount();

        this.addNoteManually();

        result.success = (stateObj.getNoteAddedCount() - 1) === originalAddedCount && originalAddedCount >= 0;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testAddNoteButtonRendering() {
        const result = {
            test: 'test add note button rendering is performed successfully',
            success: false,
            message: ''
        };

        route('all');

        let eles = document.querySelectorAll('.input-group-text input');
        const originalCount = eles.length;

        this.addNoteManually();

        eles = document.querySelectorAll('.input-group-text input');

        result.success = (originalCount + 1) === eles.length;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testUpdateMapDefined() {
        const result = {
            test: 'test update map defined',
            success: false,
            message: ''
        };

        if (s !== null && s !== undefined && s._updateMap !== null && s._updateMap !== undefined) {
            result.success = true;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testUpdateMapCorrectCount() {
        const result = {
            test: 'test update map has correct count',
            success: false,
            message: ''
        };

        if (s && s._updateMap && s._updateMap.size === 8) {
            result.success = true;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testPriority20MarkTwoAsCompleteAndRoute() {
        const result = {
            test: 'test manually marking notes and routing to completed route',
            success: false,
            message: ''
        };

        route('all');

        let eles = document.querySelectorAll('.input-group-text input');

        if (eles) {
            while (eles.length < 3) {
                this.addNoteManually();
                eles = document.querySelectorAll('.input-group-text input');
            }

            const notes = getState().getNotes();

            if (notes) {
                notes.forEach(note => {
                    note.completed = false;
                });

                if (notes.length > 2) {
                    notes[0].completed = true;
                    notes[1].completed = true;
                }

                getState().setNotes(notes);
                detectChanges();
            }

            route('completed');

            eles = document.querySelectorAll('.input-group-text input');

            result.success = eles.length === 2;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    block(millis = 18) {
        return new Promise(resolve => {
            s.DETACHED_SET_TIMEOUT(() => {
                resolve(true);
            }, millis);
        });
    }

    testFinalize100ClearCompletedAndVerifyRendering() {
        const result = {
            test: 'test clearing completed notes and verify rendering',
            success: false,
            message: ''
        };

        route('all');

        let eles = document.querySelectorAll('.input-group-text input');

        if (eles) {
            while (eles.length < 3) {
                this.addNoteManually();
                eles = document.querySelectorAll('.input-group-text input');
            }

            const notes = getState().getNotes();

            if (notes) {
                notes.forEach(note => {
                    note.completed = false;
                });

                if (notes.length > 2) {
                    notes[0].completed = true;
                    notes[1].completed = true;
                }

                getState().setNotes(notes);
                detectChanges();
            }

            eles = document.querySelectorAll('.input-group-text input');
            const originalNoteCount = eles.length;

            const clearNotesButton = document.getElementById('clearNotesButton');
            clearNotesButton.click();

            window.globalAsyncCount++;
            s.DETACHED_SET_TIMEOUT(() => {
                window.globalAsyncCount--;
                eles = document.querySelectorAll('.input-group-text input');

                result.success = (originalNoteCount - 2) === eles.length;

                window.globalTestResults.push(result);
                window.globalTestCount++;
            }, 1);
        }
    }

    testCorrectNumberOfInputElements() {
        const result = {
            test: 'test correct number of input elements rendered',
            success: false,
            message: ''
        };

        route('all');

        const inputEles = document.querySelectorAll('.input-group input');

        const stateObj = getState();
        const noteCount = stateObj.getNotes().length;

        result.success = (noteCount * 2) === inputEles.length;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100ChangeDetectionOnTextWithHook() {
        const result = {
            test: 'test mounting component with lifecycle hook and calling change detection',
            success: false,
            message: ''
        };

        mount('testcomponent2', new TestComponent2());

        window.globalAsyncCount++;
        s.DETACHED_SET_TIMEOUT(() => {
            window.globalAsyncCount--;
            let ele = document.getElementById('testcomponent2');
            const firstPass = ele.textContent === 'Hello, world! Count: 1';
            detectChanges();
            ele = document.getElementById('testcomponent2');
            const secondPass = ele.textContent === 'Hello, world! Count: 1';
            detectChanges();
            ele = document.getElementById('testcomponent2');
            const thirdPass = ele.textContent === 'Hello, world! Count: 1';
            detectChanges();
            ele = document.getElementById('testcomponent2');
            const fourthPass = ele.textContent === 'Hello, world! Count: 1';

            result.success = firstPass && secondPass && thirdPass && fourthPass;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 1);
    }

    testFinalize800ChangeTag() {
        const result = {
            test: 'test changing the tag of a node',
            success: false,
            message: ''
        };

        mount('testtagcomponent1', new TestTagChangeComponent());
        let rowEle = document.getElementById('testTagRow1');
        let rowChildren = rowEle ? rowEle.children : [];

        let initialCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'TD';
        let initialTdCorrect = rowChildren.length > 0 && rowChildren[0].childNodes.length > 0 && rowChildren[0].textContent === 'Mode: false';

        const buttonEle = document.getElementById('toggleModeButton');
        buttonEle.click();
        s.DETACHED_SET_TIMEOUT(() => {
            rowEle = document.getElementById('testTagRow1');
            rowChildren = rowEle ? rowEle.children : [];

            let changeCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'INPUT' && rowChildren[0].childNodes.length === 0;
            let changeInputCorrect = rowChildren.length > 0 && rowChildren[0].value === 'true';

            result.success = initialCorrect && initialTdCorrect && changeCorrect && changeInputCorrect;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize300DestroyHookCalled() {
        const result = {
            test: 'test destroy hook called on route change',
            success: false,
            message: ''
        };

        addRoute('destroycomp', { component: new TestDestroyHookComponent(), root: 'testdestroyhookcomponent' });
        addRoute('afterdestroy', { component: new TestAfterDestroyHookComponent(), root: 'testdestroyhookcomponent' });

        route('destroycomp');
        route('afterdestroy');

        const stateObj = getState();

        result.success = stateObj && stateObj.onDestroyHookCalled;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize900FetchTriggersChangeDetection() {
        const result = {
            test: 'test fetch triggers change detection',
            success: false,
            message: ''
        };

        const originalState = getState();
        originalState.count = 0;
        setState(originalState);

        let attempts = 0;
        const waitForStableInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalAsyncCount === 0) {
                clearInterval(waitForStableInterval);
                window.globalAsyncCount++;
                mount('testfetchcomponent', new TestFetchChangeDetectionComponent());

                const requestPromises = [
                    fetch('todo.html')
                ];

                resolveAll(requestPromises).then((results) => {
                    const successfulPromises = results.filter(p => p.status === 'fulfilled');
                    const hadSuccess = successfulPromises && successfulPromises.length === 1;

                    const ele = document.getElementById('testfetchcomponent');

                    const stateObj = getState();
                    const correctText = ele.textContent === 'Count: 1';
                    const countIncremented = stateObj && stateObj.count === 2;

                    result.success = hadSuccess && correctText && countIncremented;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
                });
            }

            attempts++;

            if (attempts === 50 && window.globalAsyncCount > 0) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
                window.globalAsyncCount--;
            }
        }, 500);
    }

    testResolveAll() {
        const result = {
            test: 'test resolve all promises',
            success: false,
            message: ''
        };

        const requestPromises = [
            fetch('todo.html'),
            fetch('http://does-not-exist')
        ];

        resolveAll(requestPromises).then((results) => {
            const successfulPromises = results.filter(p => p.status === 'fulfilled');

            result.success = successfulPromises && successfulPromises.length === 1;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        });
    }

    testResolveAllOrdering() {
        const result = {
            test: 'test resolve all promises are in correct order',
            success: false,
            message: ''
        };

        const requestPromises = [
            fetch('todo.html'),
            fetch('http://does-not-exist')
        ];

        resolveAll(requestPromises).then((results) => {
            const firstSuccess = results[0].status === 'fulfilled';
            const secondFailure = results[1].status === 'rejected';

            result.success = firstSuccess && secondFailure;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        });
    }

    testFinalize100RouteParams() {
        const result = {
            test: 'test route params are set correctly',
            success: false,
            message: ''
        };

        addRoute('foobarbaz', { component: new RouteParamsTestComponent(), root: 'routeparamscomponent' });
        route('foobarbaz', { a: 1, b: true, c: 'abc', d: 3.14, e: () => { console.log('hello'); } });

        const params = getRouteParams();

        const aCorrect = params.a && params.a === 1;
        const bCorrect = params.b && params.b === true;
        const cCorrect = params.c && params.c === 'abc';
        const dCorrect = params.d && params.d === 3.14;
        const eCorrect = params.e && params.e.toString().replace(/\s+/g, '') === "()=>{console.log('hello');}";

        result.success = aCorrect && bCorrect && cCorrect && dCorrect && eCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100AuthenticationGuard() {
        const result = {
            test: 'test authentication guard failure routing',
            success: false,
            message: ''
        };

        addRoute('dashboard', { component: new TestGuardComponent(), root: 'authcomponent', onActivationCheck: () => { return false; }, onActivationFail: { route: 'noauth' } });
        addRoute('noauth', { component: new AuthFailComponent(), root: 'authcomponent' });

        route('dashboard');

        let ele = document.getElementById('authcomponent');

        const correctText = ele && ele.textContent === 'Authentication guard returned false.';

        result.success = correctText;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize800ChangeTagAndRemoveNode() {
        const result = {
            test: 'test changing the tag of a node and test removal of a node',
            success: false,
            message: ''
        };

        mount('testtagcomponent2', new TestTagChangeComponent2());
        let rowEle = document.getElementById('testTagRow2');
        let rowChildren = rowEle ? rowEle.children : [];

        let initialCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'DIV';
        let hasInitialTd = rowChildren.length > 0 && rowChildren[0].children.length === 1;
        let hasInitialTd2 = rowChildren.length > 1 && rowChildren[1].children.length === 1;
        let initialTdCorrect = false;
        let initialTd2Correct = false;

        if (hasInitialTd) {
            initialTdCorrect = rowChildren[0].children[0].tagName === 'TD' && rowChildren[0].children[0].textContent === 'Mode: false';
        }

        if (hasInitialTd2) {
            initialTd2Correct = rowChildren[1].children[0].tagName === 'TD' && rowChildren[1].children[0].textContent === 'Mode: false';
        }

        const buttonEle = document.getElementById('toggleModeButton2');
        buttonEle.click();

        s.DETACHED_SET_TIMEOUT(() => {
            rowEle = document.getElementById('testTagRow2');
            rowChildren = rowEle ? rowEle.children : [];

            let changeCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'DIV';
            let changeInputCorrect = rowChildren.length === 1 && rowChildren[0].children.length === 1 && rowChildren[0].children[0].tagName === 'INPUT';
            let changeInputValueCorrect = rowChildren.length === 1 && rowChildren[0].children.length === 1 && rowChildren[0].children[0].value === 'true';
            let changeInputChildrenCorrect = rowChildren.length === 1 && rowChildren[0].children.length === 1 && rowChildren[0].children[0].childNodes.length === 0;

            result.success = initialCorrect && initialTdCorrect && initialTd2Correct && changeCorrect && changeInputCorrect
                && changeInputValueCorrect && changeInputChildrenCorrect;

            window.globalTestResults.push(result);
            window.globalTestCount++;
        }, 100);
    }

    testFinalize100RemountComponent() {
        const result = {
            test: 'test remounting a component',
            success: false,
            message: ''
        };

        mount('testremountcomponent1', new TestRemountComponent1());
        detectChanges();
        mount('testremountcomponent1', new TestRemountComponent1());

        const ele = document.getElementById('testremountcomponent1');

        result.success = ele.textContent === 'To be remounted.';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testSetAndGetState() {
        const result = {
            test: 'test set and get state functions',
            success: false,
            message: ''
        };

        const someObj = {
            a: 1,
            b: 'abc',
            c: false,
            d: () => console.log('hello'),
            e: 3.14
        };

        const originalState = getState();

        setState(someObj);
        const newState = getState();

        const correctA = newState.a && newState.a === 1;
        const correctB = newState.b && newState.b === 'abc';
        const correctC = newState.c !== null && newState.c !== undefined && newState.c === false;
        const correctD = newState.d && newState.d.toString() === '() => console.log(\'hello\')';
        const correctE = newState.e && newState.e === 3.14;

        result.success = correctA && correctB && correctC && correctD && correctE;

        setState(originalState);

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testXhrMultipleRequests() {
        const result = {
            test: 'test XHR multiple requests',
            success: false,
            message: ''
        };

        let onloadCount = 0;
        let responseNotEmptyCount = 0;
        let addedResult = false;

        const xhr1 = new XMLHttpRequest();
        xhr1.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

        xhr1.onload = function () {
            console.log('testXhrMultipleRequests XHR load completed');

            onloadCount++;
            if (this.response !== undefined && this.response !== null && this.response !== '') responseNotEmptyCount++;

            result.success = onloadCount === 2 && responseNotEmptyCount === 2;

            if (onloadCount === 2) {
                addedResult = true;
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        };

        const xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

        xhr2.onload = function () {
            console.log('testXhrMultipleRequests XHR load completed');

            onloadCount++;
            if (this.response !== undefined && this.response !== null && this.response !== '') responseNotEmptyCount++;

            result.success = onloadCount === 2 && responseNotEmptyCount === 2;

            if (onloadCount === 2) {
                addedResult = true;
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        };

        console.log('testXhrMultipleRequests before send');
        xhr1.send(null);
        console.log('testXhrMultipleRequests after send');

        console.log('testXhrMultipleRequests before send');
        xhr2.send(null);
        console.log('testXhrMultipleRequests after send');

        s.DETACHED_SET_TIMEOUT(() => {
            if (!addedResult) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        }, 6000);
    }

    testXhrMultipleRequestsAutomated() {
        const result = {
            test: 'test XHR multiple requests in automated manner',
            success: false,
            message: ''
        };

        let onloadCount = 0;
        let addedResult = false;
        const NUMBER_OF_REQUESTS = 8;

        for (let i = 0; i < NUMBER_OF_REQUESTS; ++i) {
            const xhr1 = new XMLHttpRequest();
            xhr1.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

            xhr1.onload = function () {
                console.log('testXhrMultipleRequestsAutomated XHR load completed');

                onloadCount++;
                result.success = onloadCount === NUMBER_OF_REQUESTS;

                if (onloadCount === NUMBER_OF_REQUESTS) {
                    addedResult = true;
                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                }
            };

            console.log('testXhrMultipleRequestsAutomated before send');
            xhr1.send(null);
            console.log('testXhrMultipleRequestsAutomated after send');
        }

        s.DETACHED_SET_TIMEOUT(() => {
            if (!addedResult) {
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        }, 12000);
    }

    testXhrMaximumCallStackExceeded() {
        const result = {
            test: 'test XHR maximum call stack exceeded',
            success: false,
            message: ''
        };

        let addedResult = false;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

        xhr.onreadystatechange = function () {
            try {
                console.log('testXhrMaximumCallStackExceeded onready before send');
                xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
                xhr.send(null);
                console.log('testXhrMaximumCallStackExceeded onready after send');
            } catch (error) {
                addedResult = true;
                window.globalTestResults.push(result);
                window.globalTestCount++;
            }
        }

        xhr.onload = function () {
            console.log('testXhrMaximumCallStackExceeded XHR load completed');

            result.success = true;

            s.DETACHED_SET_TIMEOUT(() => {
                if (!addedResult) {
                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                }
            }, 5000);
        };

        console.log('testXhrMaximumCallStackExceeded before send');
        xhr.send(null);
        console.log('testXhrMaximumCallStackExceeded after send');
    }

    testMarkupFunction() {
        const result = {
            test: 'test markup function',
            success: false,
            message: ''
        };

        const markupObj = markup('div', { attrs: { style: 'width: 100%', id: 'someId', class: 'someclass', oninput: this.someFunctionToBind.bind(this) }, children: [] });

        const correctTag = markupObj.tagName === 'DIV';

        const hasAttrs = markupObj.attrs !== null && markupObj.attrs !== undefined;
        if (!hasAttrs) {
            markupObj.attrs = {};
        }

        const correctStyle = markupObj.attrs.style && markupObj.attrs.style === 'width: 100%';
        const correctId = markupObj.attrs.id && markupObj.attrs.id === 'someId';
        const correctClass = markupObj.attrs.class && markupObj.attrs.class === 'someclass';
        const onInputDefined = markupObj.attrs.oninput !== null && markupObj.attrs.oninput !== undefined;
        let onInputCorrect = false;

        if (onInputDefined) {
            const results = markupObj.attrs.oninput();
            onInputCorrect = results && results.test && results.test === 'test';
        }

        result.success = correctTag && hasAttrs && correctStyle && correctId && correctClass && onInputDefined && onInputCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testMarkupFunction() {
        const result = {
            test: 'test terse markup function',
            success: false,
            message: ''
        };

        const markupObj = m('div', { attrs: { style: 'width: 100%', id: 'someId', class: 'someclass', oninput: this.someFunctionToBind.bind(this) }, children: [] });

        const correctTag = markupObj.tagName === 'DIV';

        const hasAttrs = markupObj.attrs !== null && markupObj.attrs !== undefined;
        if (!hasAttrs) {
            markupObj.attrs = {};
        }

        const correctStyle = markupObj.attrs.style && markupObj.attrs.style === 'width: 100%';
        const correctId = markupObj.attrs.id && markupObj.attrs.id === 'someId';
        const correctClass = markupObj.attrs.class && markupObj.attrs.class === 'someclass';
        const onInputDefined = markupObj.attrs.oninput !== null && markupObj.attrs.oninput !== undefined;
        let onInputCorrect = false;

        if (onInputDefined) {
            const results = markupObj.attrs.oninput();
            onInputCorrect = results && results.test && results.test === 'test';
        }

        result.success = correctTag && hasAttrs && correctStyle && correctId && correctClass && onInputDefined && onInputCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testMarkupFunctionWithBoundFunction() {
        const result = {
            test: 'test markup function with bound function',
            success: false,
            message: ''
        };

        const markupObj = markup('div', { attrs: { style: 'width: 100%', id: 'someId', class: 'someclass', oninput: this.someFunctionToBindWithThis.bind(this) }, children: [] });

        const correctTag = markupObj.tagName === 'DIV';

        const hasAttrs = markupObj.attrs !== null && markupObj.attrs !== undefined;
        if (!hasAttrs) {
            markupObj.attrs = {};
        }

        const correctStyle = markupObj.attrs.style && markupObj.attrs.style === 'width: 100%';
        const correctId = markupObj.attrs.id && markupObj.attrs.id === 'someId';
        const correctClass = markupObj.attrs.class && markupObj.attrs.class === 'someclass';
        const onInputDefined = markupObj.attrs.oninput !== null && markupObj.attrs.oninput !== undefined;
        let onInputCorrect = false;

        if (onInputDefined) {
            const results = markupObj.attrs.oninput();
            onInputCorrect = results && results.test && results.test === this.someClassMember;
        }

        result.success = correctTag && hasAttrs && correctStyle && correctId && correctClass && onInputDefined && onInputCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testMarkupFunctionWithChildren() {
        const result = {
            test: 'test markup function with children',
            success: false,
            message: ''
        };

        const markupObj = markup('div', {
            attrs: { style: 'width: 100%', id: 'someId', class: 'someclass', oninput: this.someFunctionToBind.bind(this) }, children: [
                markup('span', { attrs: { style: 'height: 20px;' }, children: [] })
            ]
        });

        const correctTag = markupObj.tagName === 'DIV';

        const hasAttrs = markupObj.attrs !== null && markupObj.attrs !== undefined;
        if (!hasAttrs) {
            markupObj.attrs = {};
        }

        const correctStyle = markupObj.attrs.style && markupObj.attrs.style === 'width: 100%';
        const correctId = markupObj.attrs.id && markupObj.attrs.id === 'someId';
        const correctClass = markupObj.attrs.class && markupObj.attrs.class === 'someclass';
        const onInputDefined = markupObj.attrs.oninput !== null && markupObj.attrs.oninput !== undefined;
        let onInputCorrect = false;

        if (onInputDefined) {
            const results = markupObj.attrs.oninput();
            onInputCorrect = results && results.test && results.test === 'test';
        }

        const childCountCorrect = markupObj.children && markupObj.children.length === 1;
        const childTagCorrect = markupObj.children && markupObj.children[0].tagName === 'SPAN';
        const childStyleCorrect = markupObj.children && markupObj.children[0].attrs.style && markupObj.children[0].attrs.style === 'height: 20px;';
        const childChildrenCountCorrect = markupObj.children && markupObj.children[0].children.length === 0;

        result.success = correctTag && hasAttrs && correctStyle && correctId && correctClass && onInputDefined && onInputCorrect
            && childCountCorrect && childTagCorrect && childStyleCorrect && childChildrenCountCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize100InnerTextAppendsDomString() {
        const result = {
            test: 'test inner text function works correctly',
            success: false,
            message: ''
        };

        const comp = new TestComponent1();
        mount('testcomponent1', comp);

        detectChanges();

        const ele = document.getElementById('testcomponent1');

        result.success = ele.innerText === 'Hello, (nested <span>) world!';

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testMountWithChangeDetectorDetached() {
        const result = {
            test: 'test mount with change detector detached',
            success: false,
            message: ''
        };

        if (s) {
            const originalMapLength = s._updateMap ? s._updateMap.length : 0;

            const comp = new TestComponent1();
            mount('testcomponent1', comp, false);

            detectChanges();

            result.success = s._updateMap && s._updateMap.length === originalMapLength;
        }

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFormControl() {
        const result = {
            test: 'test general form control functions',
            success: false,
            message: ''
        };

        const formControl = FormControl(200);
        const validatorFn1 = (val) => {
            if (!isNaN(val) && isFinite(val)) {
                return null;
            } else {
                return { nonNumeric: true };
            }
        }
        const validatorFn2 = (val) => {
            if (val < 100) {
                return { lessThan100: true };
            } else {
                return null;
            }
        }

        const stateObj = getState();
        stateObj.controlCount = 0;
        setState(stateObj);

        formControl.setValidators([validatorFn1, validatorFn2]);
        formControl.getValueChanges().subscribe((val) => {
            const stateObj = getState();
            stateObj.controlCount++;
            setState(stateObj);
        });

        const valid1 = formControl.getValid() === true;
        const pristine1 = formControl.getPristine() === true;
        const errorLength1 = formControl.getErrors().length === 0;

        formControl.setValue(2);

        const valid2 = formControl.getValid() === false;
        const pristine2 = formControl.getPristine() === false;
        const errorLength2 = formControl.getErrors().length === 1;
        const hasLessThanError = formControl.getError('lessThan100') !== null;

        formControl.setValue('abc');

        const valid3 = formControl.getValid() === false;
        const pristine3 = formControl.getPristine() === false;
        const errorLength3 = formControl.getErrors().length === 1;
        const hasNonNumericError = formControl.getError('nonNumeric') !== null;

        formControl.setValue(500);

        const valid4 = formControl.getValid() === true;
        const pristine4 = formControl.getPristine() === false;
        const errorLength4 = formControl.getErrors().length === 0;

        const finalControlCountCorrect = getState().controlCount === 3;

        result.success = valid1 && pristine1 && errorLength1 && valid2 && pristine2 && errorLength2 && hasLessThanError
            && valid3 && pristine3 && errorLength3 && hasNonNumericError && valid4 && pristine4 && errorLength4 && finalControlCountCorrect

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    dummyTest() {
        const result = {
            test: 'test ',
            success: false,
            message: ''
        };

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    someFunctionToBind() {
        const result = {
            test: 'test',
            success: false,
            message: ''
        };

        return result;
    }

    someFunctionToBindWithThis() {
        const result = {
            test: this.someClassMember,
            success: false,
            message: ''
        };

        return result;
    }

    init() {
        window.globalTestResults = [];
        window.globalTestCount = 0;
        window.globalAsyncCount = 0;

        const runTestsButton = document.createElement('button');
        runTestsButton.innerText = 'Run Tests';
        runTestsButton.id = 'runtestsbutton';
        document.body.appendChild(runTestsButton);
        runTestsButton.onclick = this.run.bind(this);
    }

    createResultList(timeDiff) {
        const unorderedList = document.createElement('ul');

        window.globalTestResults.sort((first, second) => first.success === false ? -1 : 1);

        window.globalTestResults.forEach(testResult => {
            const listItem = document.createElement('li');
            let itemHtml = '';

            if (testResult.success === false) itemHtml += '<span><strong>' + String(testResult.success) + '</strong></span><span> - ' + testResult.test + '</span>';
            else itemHtml += '<span>' + String(testResult.success) + '</span><span> - ' + testResult.test + '</span>';

            if (testResult.message !== null && testResult.message !== undefined && testResult.message.length > 0) {
                itemHtml += '<br><span>' + testResult.message + '</span>';
            }

            listItem.innerHTML = itemHtml;
            unorderedList.appendChild(listItem);
        });

        const summaryEle = document.createElement('p');
        summaryEle.innerHTML = '<span>Elapsed time: ' + timeDiff + 'ms</span><br>';

        const testsPassing = window.globalTestResults.filter(testResult => testResult.success === true).length;
        summaryEle.innerHTML += '<span><strong>Tests passing: ' + testsPassing + '/' + window.globalTestResults.length + '</strong></span><br>';
        summaryEle.innerHTML += '<span><strong>Tests failing: ' + (window.globalTestResults.length - testsPassing) + '/' + window.globalTestResults.length + '</strong></span>';

        if (testsPassing === window.globalTestResults.length) {
            summaryEle.innerHTML += '<br><span style="color: green;">All tests passed.</span>';
        } else {
            summaryEle.innerHTML += '<br><span style="color: red;">There are failing tests.</span>';
        }

        document.body.appendChild(summaryEle);
        document.body.appendChild(unorderedList);
    }

    showError() {
        const errorDiv = document.createElement('div');
        errorDiv.innerText = 'Failed to run tests.';

        document.body.appendChild(errorDiv);
    }

    showProcessing() {
        const procDiv = document.createElement('div');
        procDiv.innerText = 'Processing...';
        procDiv.id = 'runningtestsdiv';

        document.body.appendChild(procDiv);
    }

    removeProcessing() {
        document.getElementById('runningtestsdiv').outerHTML = '';
    }

    getAllFuncs(toCheck) {
        const props = [];
        let obj = toCheck;
        do {
            props.push(...Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));

        return props.sort().filter((e, i, arr) => {
            if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
        });
    }

    removeRunTestsButton() {
        document.getElementById('runtestsbutton').outerHTML = '';
    }

    sleep(milliseconds) {
        return new Promise(resolve => s.DETACHED_SET_TIMEOUT(resolve, milliseconds));
    }

    run() {
        this.showProcessing();

        const testFuncList = this.getAllFuncs(this).filter(key => key && key.startsWith('test')).filter(key => key && key !== 'dummyTest')
            .sort((firstName, secondName) => {
                if (firstName && firstName.toLowerCase().includes('finalize')) {
                    if (secondName && secondName.toLowerCase().includes('finalize')) {
                        const p1 = firstName.substring(firstName.indexOf('finalize') + 8, firstName.indexOf('finalize') + 11);
                        const p2 = secondName.substring(secondName.indexOf('finalize') + 8, secondName.indexOf('finalize') + 11);

                        return p1 > p2;
                    } else {
                        return 1;
                    }
                } else if (secondName && secondName.toLowerCase().includes('finalize')) {
                    return -1;
                } else if (firstName && firstName.toLowerCase().includes('priority')) {
                    if (secondName && secondName.toLowerCase().includes('priority')) {
                        const p1 = firstName.substring(firstName.indexOf('priority') + 8, firstName.indexOf('priority') + 11);
                        const p2 = secondName.substring(secondName.indexOf('priority') + 8, secondName.indexOf('priority') + 11);

                        return p1 > p2;
                    } else {
                        return -1;
                    }
                } else {
                    return 1;
                }
            });

        const state = getState();
        state.testCount = testFuncList.length;
        setState(state);

        testFuncList.forEach(async testFuncName => {
            this[testFuncName]();
            await this.sleep(50);
        });

        const testCount = this.getAllFuncs(this).filter(key => key && key.startsWith('test')).filter(key => key && key !== 'dummyTest').length;

        let checkCount = 0;
        let startTime = new Date();

        const checkInterval = s.DETACHED_SET_INTERVAL(() => {
            if (window.globalTestCount === testCount) {
                this.removeProcessing();
                this.createResultList(new Date() - startTime);
                clearInterval(checkInterval);
                this.removeRunTestsButton();
            }

            checkCount++;

            if (checkCount === 500) {
                this.removeProcessing();
                this.showError();
                clearInterval(checkInterval);
                this.removeRunTestsButton();
            }
        }, 100);
    }
}

export default GlobalTestRunner;
