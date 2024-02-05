export const Observable = (array) => {
    const arrFns = ['pop', 'push', 'reverse', 'shift', 'unshift', 'splice', 'sort', 'map', 'filter', 'fill', 'copyWithin'];
    const noReturnFns = arrFns.slice(0, 6);
    const observeOps = {};
    
    let subscribedFns = [];
    let data = array;
    let subCallCount = 0;

    const callCallbackIfNeeded = function (arr) {
        if (subCallCount === 0) {
            subscribedFns.forEach(fn => {
                fn(arr);
            });
            subCallCount++;
        } else {
            subCallCount = 0;
        }
    }

    observeOps.subscribe = function (fn) {
        subscribedFns.push(fn);

        data = new Proxy(data, {
            set: function (target, key, value) {
                if (key === 'length') {
                    target[key] = value;

                    return true;
                } else if (isNaN(key) === false) {
                    target[key] = value;
                    callCallbackIfNeeded(target);

                    return true;
                }
            }
        });

        arrFns.forEach(function (arrFn) {
            Object.defineProperty(data, arrFn, {
                writable: true,
                value: function () {
                    let result = data;
                    if (noReturnFns.indexOf(arrFn) > -1) {
                        Array.prototype[arrFn].apply(result, arguments);
                    } else {
                        result = Array.prototype[arrFn].apply(result, arguments);
                    }

                    callCallbackIfNeeded(result);

                    return result;
                }
            });
        });

        return this;
    }

    observeOps.clearSubscription = function (fn) {
        // const, no reassignment
        const filteredFns = subscribedFns.filter(currFn => currFn !== fn);
        this.clearSubscriptions();

        subscribedFns = subscribedFns.concat(filteredFns);

        return this;
    }

    observeOps.getHasSubscription = function (fn) {
        const matchingFunction = subscribedFns.find(currFn => currFn === fn);
        
        return matchingFunction != null && matchingFunction !== undefined;
    }

    observeOps.clearSubscriptions = function () {
        // const, no reassignment
        subscribedFns.splice(0, subscribedFns.length);

        return this;
    }

    observeOps.getData = function () {
        return data;
    }

    return observeOps;
}

export const BehaviorSubject = (value) => {
    const subjectOps = {};
    
    let subscribedFns = [];
    let data = value;

    const callCallback = function () {
        subscribedFns.forEach(fn => {
            fn(data);
        });
    }

    subjectOps.subscribe = function (fn) {
        subscribedFns.push(fn);

        return this;
    }

    subjectOps.clearSubscription = function (fn) {
        // const, no reassignment
        const filteredFns = subscribedFns.filter(currFn => currFn !== fn);
        this.clearSubscriptions();

        subscribedFns = subscribedFns.concat(filteredFns);

        return this;
    }

    subjectOps.getHasSubscription = function (fn) {
        const matchingFunction = subscribedFns.find(currFn => currFn === fn);
        
        return matchingFunction != null && matchingFunction !== undefined;
    }

    subjectOps.clearSubscriptions = function () {
        // const, no reassignment
        subscribedFns.splice(0, subscribedFns.length);

        return this;
    }

    subjectOps.next = function (value) {
        data = value;
        callCallback();

        return this;
    }

    subjectOps.getData = function () {
        return data;
    }

    return subjectOps;
}

export const Stream = () => {
    const dependentFns = [];
    const data = [];
    const streamOps = {};
    
    let subscribedFns = [];
    let length = 0;

    const react = function () {
        dependentFns.forEach((fnObj) => {
            let subArr = data.slice(fnObj.end, length);
            let initLen = subArr.length;
            if (initLen > 0) {
                subArr = fnObj.fn(subArr);

                // For reducers
                if (!Array.isArray(subArr)) {
                    subArr = [subArr];
                }

                // General transforms
                data.splice(fnObj.end, subArr.length, ...subArr);

                // For filters
                let filteredDiff = initLen - subArr.length;
                if (filteredDiff) {
                    data.splice(data.length - filteredDiff, filteredDiff);
                }

                fnObj.end = data.length;
            }
        });
    }

    const callSubscribed = function () {
        subscribedFns.forEach(fn => {
            fn(data);
        });
    }

    streamOps.push = function (value) {
        data.push(value);
        length++;

        react();
        callSubscribed();

        return this;
    }

    streamOps.subscribe = function (fn) {
        subscribedFns.push(fn);

        return this;
    }

    streamOps.getHasSubscription = function (fn) {
        const matchingFunction = subscribedFns.find(currFn => currFn === fn);
        
        return matchingFunction != null && matchingFunction !== undefined;
    }

    streamOps.clearSubscription = function (fn) {
        // const, no reassignment
        const filteredFns = subscribedFns.filter(currFn => currFn !== fn);
        this.clearSubscriptions();

        subscribedFns = subscribedFns.concat(filteredFns);

        return this;
    }

    streamOps.clearSubscriptions = function () {
        // const, no reassignment
        subscribedFns.splice(0, subscribedFns.length);

        return this;
    }

    streamOps.transform = function (mapFn) {
        dependentFns.push({ fn: mapFn, end: 0 });

        react();
        callSubscribed();

        return this;
    }

    streamOps.call = function (fn) {
        fn(data);

        return this;
    }

    streamOps.getData = function () {
        return JSON.parse(JSON.stringify(data));
    }

    streamOps.clearTransformers = function () {
        // const, no reassignment
        dependentFns.splice(0, dependentFns.length);

        return this;
    }

    streamOps.from = function (array) {
        // const, no reassignment
        data.splice(0, data.length);
        array.forEach(value => {
            data.push(value);
        });

        length = data.length;

        react();
        callSubscribed();

        return this;
    }

    return streamOps;
}

export const FormControl = (initialValue) => {
    const observeOps = {};
    const validatorFnList = [];
    const errors = [];
    const valueChangesSubject = BehaviorSubject(initialValue);

    let value = initialValue !== undefined ? initialValue : null;
    let pristine = true;
    let valid = true;

    const applyValidators = function () {
        // const, no reassignment
        errors.splice(0, errors.length);
        valid = true;

        if (validatorFnList) {
            validatorFnList.forEach(validatorFn => {
                const result = validatorFn(value);

                if (result !== null && result !== undefined && typeof result === 'object') {
                    errors.push(result);
                }
            });
        }

        if (errors.length > 0) {
            valid = false;
        }
    }

    observeOps.getValueChanges = function() {
        return valueChangesSubject;
    }

    observeOps.setValidators = function (newValidatorFnList) {
        // const, no reassignment
        validatorFnList.splice(0, validatorFnList.length);

        if (Array.isArray(newValidatorFnList)) {
            newValidatorFnList.forEach(validatorFn => {
                if (typeof validatorFn === 'function') {
                    validatorFnList.push(validatorFn);
                }
            });
        }

        applyValidators();
    }

    observeOps.setValue = function (newValue) {
        value = newValue;
        pristine = false;
        applyValidators();
        valueChangesSubject.next(value);
    }

    observeOps.setPristine = function() {
        pristine = true;
    }

    observeOps.getPristine = function() {
        return pristine;
    }

    observeOps.getDirty = function() {
        return !pristine;
    }

    observeOps.getValue = function () {
        return value;
    }

    observeOps.getValid = function() {
        return valid;
    }

    observeOps.getErrors = function() {
        return errors;
    }

    observeOps.getError = function (errorKey) {
        const matchingErrors = errors.filter(errorObj => errorObj[errorKey] !== undefined);

        if (matchingErrors.length > 0) {
            return matchingErrors[0];
        } else {
            return null;
        }
    }

    return observeOps;
}
