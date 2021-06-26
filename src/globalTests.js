import { detectChanges, getState, m, markup, mount, route, setState, textNode, addRoute, getRouteParams, resolveAll } from "../dist/sling.min";

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

    testFinalize10ClearCompletedAndVerifyRendering() {
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

    testFinalize10ChangeDetectionOnTextWithHook() {
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

    testFinalize80ChangeTag() {
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
        detectChanges();

        rowEle = document.getElementById('testTagRow1');
        rowChildren = rowEle ? rowEle.children : [];

        let changeCorrect = rowChildren.length > 0 && rowChildren[0].tagName === 'INPUT' && rowChildren[0].childNodes.length === 0;
        let changeInputCorrect = rowChildren.length > 0 && rowChildren[0].value === 'true';

        result.success = initialCorrect && initialTdCorrect && changeCorrect && changeInputCorrect;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize30DestroyHookCalled() {
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

    testFinalize90FetchTriggersChangeDetection() {
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

                    clearInterval(waitForStableInterval);
                });
            }

            attempts++;

            if (attempts === 10) {
                window.globalTestResults.push(result);
                window.globalTestCount++;

                clearInterval(waitForStableInterval);
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

    testFinalize10RouteParams() {
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

    testFinalize10AuthenticationGuard() {
        const result = {
            test: 'test authentication guard failure routing',
            success: false,
            message: ''
        };

        addRoute('dashboard', { component: new TestGuardComponent(), root: 'authcomponent', authGuard: () => { return false; }, authFail: { route: 'noauth' } });
        addRoute('noauth', { component: new AuthFailComponent(), root: 'authcomponent' });

        route('dashboard');

        let ele = document.getElementById('authcomponent');

        const correctText = ele && ele.textContent === 'Authentication guard returned false.';

        result.success = correctText;

        window.globalTestResults.push(result);
        window.globalTestCount++;
    }

    testFinalize80ChangeTagAndRemoveNode() {
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
        detectChanges();

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
    }

    testFinalize10RemountComponent() {
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

    testFinalize10InnerTextAppendsDomString() {
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
        summaryEle.innerHTML = '<span>Elapsed time: ' + timeDiff + '</span><br>';

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
                        const p1 = firstName.substring(firstName.indexOf('finalize') + 8, firstName.indexOf('finalize') + 10);
                        const p2 = secondName.substring(secondName.indexOf('finalize') + 8, secondName.indexOf('finalize') + 10);

                        return p1 > p2;
                    } else {
                        return 1;
                    }
                } else if (secondName && secondName.toLowerCase().includes('finalize')) {
                    return -1;
                } else if (firstName && firstName.toLowerCase().includes('priority')) {
                    if (secondName && secondName.toLowerCase().includes('priority')) {
                        const p1 = firstName.substring(firstName.indexOf('priority') + 8, firstName.indexOf('priority') + 10);
                        const p2 = secondName.substring(secondName.indexOf('priority') + 8, secondName.indexOf('priority') + 10);

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

            if (checkCount === 100) {
                this.removeProcessing();
                this.showError();
                clearInterval(checkInterval);
                this.removeRunTestsButton();
            }
        }, 100);
    }
}

export default GlobalTestRunner;