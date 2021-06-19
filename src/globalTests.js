import { detectChanges, getState, route, setState } from "../dist/sling.min";

export class GlobalTestRunner {

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

            setTimeout(() => {
                const fakeEle = document.getElementById('fakeEle1');
                initiallyExists = fakeEle !== null && fakeEle !== undefined;
            }, 25);

            s.DETACHED_SET_TIMEOUT(() => {
                const fakeEle = document.createElement('div');
                fakeEle.id = 'fakeEle1';
                document.body.appendChild(fakeEle);
            }, 50);

            setTimeout(() => {
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

            setTimeout(() => {
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

            setTimeout(() => {
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

    async testFinalizeClearCompletedAndVerifyRendering() {
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

            await this.block(18);

            eles = document.querySelectorAll('.input-group-text input');
            const originalNoteCount = eles.length;

            const clearNotesButton = document.getElementById('clearNotesButton');
            clearNotesButton.click();

            eles = document.querySelectorAll('.input-group-text input');

            result.success = (originalNoteCount - 2) === eles.length;
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

    init() {
        window.globalTestResults = [];
        window.globalTestCount = 0;

        const runTestsButton = document.createElement('button');
        runTestsButton.innerText = 'Run Tests';
        document.body.appendChild(runTestsButton);
        runTestsButton.onclick = this.run.bind(this);
    }

    createResultList() {
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

    run() {
        this.showProcessing();

        const testFuncList = this.getAllFuncs(this).filter(key => key && key.startsWith('test')).filter(key => key && key !== 'dummyTest')
            .sort((firstName, secondName) => {
                if (firstName && firstName.toLowerCase().includes('finalize')) {
                    return 1;
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

        const checkInterval = setInterval(() => {
            if (window.globalTestCount === testCount) {
                this.removeProcessing();
                this.createResultList();
                clearInterval(checkInterval);
            }

            checkCount++;

            if (checkCount === 100) {
                this.removeProcessing();
                this.showError();
                clearInterval(checkInterval);
            }
        }, 100);
    }
}

export default GlobalTestRunner;