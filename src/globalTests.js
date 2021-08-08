import { detectChanges, getState, m, markup, mount, route, setState, textNode, addRoute, getRouteParams, resolveAll, getRouteSegments, hydrate, renderToString, removeRoute, version, update, setDetectionStrategy, wrapWithChangeDetector, isDetectorAttached, detachDetector, getRoute } from "../dist/sling.min";
import { FormControl, Observable } from '../dist/sling-reactive.min';

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
                sltrustchildren: 'true'
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

export class GlobalTestRunner {

    constructor() {
        this.someClassMember = 123;
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
            if (window.globalAsyncCount === 0) {
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

                let state = getState();
                state.wrapDetector = 0;
                setState(state);

                addRoute('wrapdetector', { component: new TestWrapDetectorComponent1(), root: 'testwrapdetector' });
                route('wrapdetector');

                state = getState();
                const originalWrapCount = state.wrapDetector;

                const someFunc = () => { console.log('Wrap detector'); };
                const wrappedFunc = wrapWithChangeDetector(someFunc);

                s.DETACHED_SET_TIMEOUT(() => {
                    wrappedFunc();

                    state = getState();
                    const correctCount = state.wrapDetector === originalWrapCount + 1;

                    result.success = correctCount;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
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

                state = getState();
                const changeCountCorrect2 = state.manualChanges === originalChangeCount;

                setDetectionStrategy(s.CHANGE_STRATEGY_AUTOMATIC);

                s.DETACHED_SET_TIMEOUT(() => {
                    buttonEle.click();

                    state = getState();
                    const changeCountCorrect3 = state.manualChanges === originalChangeCount + 1;

                    result.success = changeCountCorrect && changeCountCorrect2 && changeCountCorrect3;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
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
                buttonEle.click();
                buttonEle.click();
                buttonEle.click();
                buttonEle.click();
                buttonEle.click();

                s.DETACHED_SET_TIMEOUT(() => {
                    state = getState();
                    result.success = state.debounce === 2;

                    window.globalTestResults.push(result);
                    window.globalTestCount++;
                    window.globalAsyncCount--;
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
                                const correctDiv1 = rowEle && rowEle.children.length === 5 && rowEle.children[0].textContent === 'Mode: 0 some markup and a text node';
                                const correctDiv2 = rowEle && rowEle.children.length === 5 && rowEle.children[1].textContent === 'Toggle';
                                const correctDiv3 = rowEle && rowEle.children.length === 5 && rowEle.children[2].textContent === 'Mode: 0 some markup and a text node';
                                const correctDiv4 = rowEle && rowEle.children.length === 5 && rowEle.children[3].textContent === 'Toggle';
                                const correctDiv5 = rowEle && rowEle.children.length === 5 && rowEle.children[4].textContent === 'Mode: 0 some markup and a text node';

                                s.DETACHED_SET_TIMEOUT(() => {
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
            }, 300);
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

        if (s && s._updateMap && s._updateMap.size === 5) {
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
            setTimeout(() => {
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
            setTimeout(() => {
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
        setTimeout(() => {
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
                window.globalAsyncCount++;
                mount('testfetchcomponent', new TestFetchChangeDetectionComponent());

                const requestPromises = [
                    fetch('todo.html')
                ];

                resolveAll(requestPromises).then((results) => {
                    const successfulPromises = results.filter(p => p.status === 'fulfilled');

                    const hadSuccess = successfulPromises && successfulPromises.length === 1;

                    s.DETACHED_SET_TIMEOUT(() => {
                        const ele = document.getElementById('testfetchcomponent');

                        const stateObj = getState();
                        const correctText = ele.textContent === 'Count: 1';
                        const countIncremented = stateObj && stateObj.count === 2;

                        result.success = hadSuccess && correctText && countIncremented;

                        window.globalTestResults.push(result);
                        window.globalTestCount++;

                        clearInterval(waitForStableInterval);
                        window.globalAsyncCount--;
                    }, 100);
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
        testFuncList.forEach(testFuncName => {
            this[testFuncName]();
        });

        const testCount = this.getAllFuncs(this).filter(key => key && key.startsWith('test')).filter(key => key && key !== 'dummyTest').length;

        let checkCount = 0;
        let startTime = new Date();

        const checkInterval = setInterval(() => {
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