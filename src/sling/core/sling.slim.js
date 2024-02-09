const origWindow = typeof (window) !== 'undefined';
var slContext = origWindow ? window : global;
if (!origWindow) {
    slContext.setTimeout = () => { };
    slContext.setInterval = () => { };
    slContext.location = {};
    slContext.location.href = '';
    slContext.fetch = () => { };
    slContext.XMLHttpRequest = {};
    slContext.XMLHttpRequest.prototype = {};
    slContext.XMLHttpRequest.prototype.send = () => { };
}

slContext.s = function () { };

s._state = {};
s._destroyFuncMap = new Map();
s._updateMap = new Map();
s._afterInitArr = [];
s._destroyNodeMap = new Map();
s._structureForMap = new Map();
s._isAnimatingKeyed = null;

const renderAsString = ({ tagName, attrs, children, model }, destroyCompList) => {
    tagName = tagName.toLowerCase();
    let markup = '<' + tagName;
    let templateNodesMarkup = null;

    // set attributes
    let vType;
    for (let [k, v] of Object.entries(attrs)) {
        vType = typeof v;

        if (vType === 'function') {
            markup += ' ' + k + '=\"\"';
        }
        else markup += ' ' + k + '=\"' + v + '\"';

        if (k === 'slfor') {
            const slfor = v;
            const tokens = slfor.split(':');

            if (tokens.length >= 4) {
                if (!s._structureForMap.has(tokens[0])) {
                    s._structureForMap.set(tokens[0], makeSlForList(null, model[tokens[2]]));
                }

                const list = s._structureForMap.get(tokens[0]);
                templateNodesMarkup = renderSlForList.bind(model, list, model[tokens[1]], model[tokens[3]])();
            }
        } else if (k === 'slfornamed') {
            const slfor = v;
            const tokens = slfor.split(':');

            if (tokens.length >= 4) {
                let namedFactory, namedUpdate, namedData, namedFn;
                for (let prop of Object.keys(model)) {
                    namedFn = model[prop];

                    if (namedFn.slfor === tokens[2]) {
                        namedFactory = namedFn;
                    } else if (namedFn.slfor === tokens[1]) {
                        namedData = namedFn;
                    } else if (namedFn.slfor === tokens[3]) {
                        namedUpdate = namedFn;
                    }
                }
                for (let prop of userFunctions(model)) {
                    namedFn = model[prop];

                    if (namedFn.slfor === tokens[2]) {
                        namedFactory = namedFn;
                    } else if (namedFn.slfor === tokens[1]) {
                        namedData = namedFn;
                    } else if (namedFn.slfor === tokens[3]) {
                        namedUpdate = namedFn;
                    }
                }
                namedData = namedData.bind(model);

                if (!s._structureForMap.has(tokens[0])) {
                    s._structureForMap.set(tokens[0], makeSlForList(null, namedFactory));
                }

                const list = s._structureForMap.get(tokens[0]);
                templateNodesMarkup = renderSlForList.bind(model, list, namedData, namedUpdate)();
            }
        }
    }

    markup += '>';

    if (templateNodesMarkup !== null) {
        templateNodesMarkup.forEach(nodeMarkup => {
            markup += renderAsString(nodeMarkup, destroyCompList);
        });
    }

    // set children
    for (let child of children) {
        if (child.view) {
            if (child.slOnInit) {
                child.slOnInit();
                destroyCompList.push(child);
            }
            child = child.view.bind(child)();
            markup += renderAsString(child, destroyCompList);
        }
        else if (typeof child === 'string') {
            markup += child;
        } else markup += renderAsString(child, destroyCompList);
    }

    return markup += '</' + tagName + '>';
}

const applyModelForStructuralDirectives = (view, model) => {
    const nodes = [];
    nodes.push(view);
    let node;

    while (nodes.length > 0) {
        node = nodes.shift();

        if (node.attrs && (node.attrs.slfor || node.attrs.slfornamed)) {
            node.model = model;
        }

        if (node.children) {
            for (let i = node.children.length - 1; i >= 0; --i) {
                nodes.push(node.children[i]);
            }
        }
    }
}

const clearDataForStructuralDirectives = (domNode) => {
    const nodes = [];
    nodes.push(domNode);
    let node;
    let data;

    while (nodes.length > 0) {
        node = nodes.shift();

        if (node.nodeType !== 3) {
            if (node.hasAttribute('slfor')) {
                data = node.getAttribute('slfor');
                data = data.split(':');

                if (data.length > 0) {
                    s._structureForMap.delete(data[0]);
                }
            } else if (node.hasAttribute('slfornamed')) {
                data = node.getAttribute('slfornamed');
                data = data.split(':');

                if (data.length > 0) {
                    s._structureForMap.delete(data[0]);
                }
            }

            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; --i) {
                    nodes.push(node.children[i]);
                }
            }
        }
    }
}

export function renderElementWithoutClass(tagName, attrs, children) {
    let el;

    if (attrs && attrs.slns) {
        el = document.createElementNS(attrs.slns, tagName.toLowerCase());
    } else {
        el = document.createElement(tagName);
    }

    let vType;
    let v;

    for (let k of Object.keys(attrs)) {
        v = attrs[k];
        vType = typeof v;

        if (vType === 'function') {
            el[k] = v;

            if (s._changeDetector.changeDetectionStrategy === s.CHANGE_STRATEGY_AUTOMATIC && !v.name.startsWith('bound slDetached') && !v.name.startsWith('slDetached')) {
                proxyEventForChangeDetection(k, el);
            }
        }
        else if (k === 'slnsfor') {
            const keyPairs = JSON.parse(attrs.slnsfor);

            for (const [key, value] of Object.entries(keyPairs)) {
                el.setAttributeNS(
                    value.namespace,
                    key,
                    value.value
                );
            }
        }
        else el.setAttribute(k, v);
    }

    for (let child of children) {
        el.append(child);
    }

    return el;
}

export function renderElement({ tagName, attrs, children }, isDetached = false) {
    let el;

    if (attrs && attrs.slns) {
        el = document.createElementNS(attrs.slns, tagName.toLowerCase());
    } else {
        el = document.createElement(tagName);
    }

    // set attributes
    let vType;
    for (let [k, v] of Object.entries(attrs)) {
        vType = typeof v;

        if (vType === 'function') {
            el[k] = v;

            if (s._changeDetector.changeDetectionStrategy === s.CHANGE_STRATEGY_AUTOMATIC && !v.name.startsWith('bound slDetached') && !v.name.startsWith('slDetached')) {
                proxyEventForChangeDetection(k, el);
            }
        }
        else if (k === 'slnsfor') {
            const keyPairs = JSON.parse(attrs.slnsfor);

            for (const [key, value] of Object.entries(keyPairs)) {
                el.setAttributeNS(
                    value.namespace,
                    key,
                    value.value
                );
            }
        }
        else el.setAttribute(k, v);
    }

    // set children
    for (let child of children) {
        if (typeof child === 'string') {
            el.append(child)
        }
        else {
            if (child.view) {
                if (isDetached) {
                    consumeClassViewAndAppendDetached(child, el);
                } else {
                    consumeClassViewAndAppend(child, el);
                }
            } else {
                el.appendChild(renderElement(child, isDetached));
            }
        }
    }

    return el;
}

const renderElementInternal = ({ tagName, attrs, children }) => {
    let el;

    if (attrs && attrs.slns) {
        el = document.createElementNS(attrs.slns, tagName.toLowerCase());
    } else {
        el = document.createElement(tagName);
    }

    // set attributes
    let vType;
    for (let [k, v] of Object.entries(attrs)) {
        vType = typeof v;

        if (vType === 'function') {
            el[k] = v;

            if (s._changeDetector.changeDetectionStrategy === s.CHANGE_STRATEGY_AUTOMATIC && !v.name.startsWith('bound slDetached') && !v.name.startsWith('slDetached')) {
                proxyEventForChangeDetection(k, el);
            }
        }
        else if (k === 'slnsfor') {
            const keyPairs = JSON.parse(attrs.slnsfor);

            for (const [key, value] of Object.entries(keyPairs)) {
                el.setAttributeNS(
                    value.namespace,
                    key,
                    value.value
                );
            }
        }
        else el.setAttribute(k, v);
    }

    // set children
    for (let child of children) {
        if (typeof child === 'string') {
            el.append(child)
        }
        else {
            if (child.view) {
                consumeClassViewAndAppend(child, el);
            } else {
                el.appendChild(renderElementInternal(child));
            }
        }
    }

    return el;
}

const applyClassPropertiesToElement = (ele, viewObject) => {
    ele.slKeyList = [];
    ele.slNamespace = {};
    for (const compKey in viewObject) {
        ele.slNamespace[compKey] = viewObject[compKey];
        ele.slKeyList.push(compKey);
    }
}

const consumeClassViewAndAppendDetached = (child, el) => {
    const buildObj = getViewFromClass(child, true, true, true);
    child = buildObj.view;
    const ele = renderElementInternal(child);
    el.appendChild(ele);
}

const consumeClassViewAndAppend = (child, el, diffDom = false) => {
    const proto = Object.getPrototypeOf(child);
    proto.slDirty = true;
    const origChild = child;
    const buildObj = getViewFromClass(child, true, true, true);
    child = buildObj.view;
    if (buildObj.afterInit) s._afterInitArr.push(buildObj.afterInit);
    const ele = renderElementInternal(child);
    setHookStateForNode(ele, buildObj.destroyIndex, buildObj.onDestroy, buildObj.unboundOnDestroy);
    insertEleIntoDestroyMap(ele);
    el.appendChild(ele);
    applyClassPropertiesToElement(ele, origChild);
    if (diffDom) {
        diffVDom(ele, child, buildObj.model);
    }
}

const setHookStateForNode = (ele, destroyIndex, destroyFn, unboundDestroyFn) => {
    ele.slOnDestroy = true;
    ele.slAfterInit = true;
    ele.slOnInit = true;
    ele.slOnDestroyIndex = destroyIndex;
    ele.slOnDestroyFn = destroyFn;
    ele.slUnboundOnDestroy = unboundDestroyFn;
}

const getViewFromClass = (child, appendDestroy, callOnInit, returnDestroyFn = false, oldChild = null) => {
    if (callOnInit && child.slOnInit) child.slOnInit();

    if (oldChild && oldChild.slKeyList) {
        for (const compKey of oldChild.slKeyList) {
            if (child[compKey] === undefined) child[compKey] = oldChild.slNamespace[compKey];
            else oldChild.slNamespace[compKey] = child[compKey];
        }
    }

    let delFnIndex = null;

    if (appendDestroy && child.slOnDestroy) {
        let fnList = s._destroyFuncMap.get(s._router.mountRoute);
        if (!fnList) fnList = [];
        fnList.push(child.slOnDestroy.bind(child));
        s._destroyFuncMap.set(s._router.mountRoute, fnList);
        delFnIndex = fnList.length - 1;
    }

    const finalView = child.view.bind(child)();
    applyModelForStructuralDirectives(finalView, child);

    return {
        view: finalView,
        afterInit: child.slAfterInit ? child.slAfterInit.bind(child) : null,
        onDestroy: (!appendDestroy || returnDestroyFn) && child.slOnDestroy ? child.slOnDestroy.bind(child) : null,
        onInit: !callOnInit && child.slOnInit ? child.slOnInit : null,
        destroyIndex: delFnIndex,
        model: child,
        slUnboundOnDestroy: child.slOnDestroy,
        slUnboundAfterInit: child.slAfterInit
    };
}

const insertEleIntoDestroyMap = (node) => {
    if (node && node.slOnDestroyIndex !== null && node.slOnDestroyIndex !== undefined) {
        let eleList = s._destroyNodeMap.get(s._router.mountRoute);
        if (!eleList) eleList = [];
        const existingEle = eleList.find(ele => ele.slOnDestroyIndex === node.slOnDestroyIndex);
        if (!existingEle) eleList.push(node);
        s._destroyNodeMap.set(s._router.mountRoute, eleList);
    }
}

const removeFromDestroyList = (node) => {
    if (node && node.slOnDestroy) {
        let fnList = s._destroyFuncMap.get(s._router.mountRoute);
        if (!fnList) fnList = [];
        fnList.splice(node.slOnDestroyIndex, 1);
        s._destroyFuncMap.set(s._router.mountRoute, fnList);

        let eleList = s._destroyNodeMap.get(s._router.mountRoute);
        if (!eleList) eleList = [];
        eleList.forEach(ele => {
            if (ele.slOnDestroyIndex > node.slOnDestroyIndex) ele.slOnDestroyIndex--;
        });
        eleList = eleList.filter(ele => ele.slOnDestroyIndex !== node.slOnDestroyIndex);
        s._destroyNodeMap.set(s._router.mountRoute, eleList);
    }
}

const callAllDestroyHooks = (node) => {
    if (node && node.children && node.children.length > 0) {
        for (const child of node.children) {
            callAllDestroyHooks(child);
        }

        if (node.slOnDestroyFn) {
            node.slOnDestroyFn();
            node.slOnDestroyFn = null;
        }
    } else if (node.slOnDestroyFn) {
        node.slOnDestroyFn();
        node.slOnDestroyFn = null;
    }
}

const prepareNodeForDestroyHook = (node, fn, unboundDestroyFn) => {
    node.slOnDestroy = true;

    let fnList = s._destroyFuncMap.get(s._router.mountRoute);
    if (!fnList) fnList = [];
    fnList.push(fn);
    s._destroyFuncMap.set(s._router.mountRoute, fnList);

    node.slOnDestroyIndex = fnList.length - 1;
    node.slOnDestroyFn = fn;
    node.slUnboundOnDestroy = unboundDestroyFn;

    insertEleIntoDestroyMap(node);
}

const diffVAttrs = (node, oldAttrs, newAttrs) => {
    let vType;
    const toRemove = [];

    for (let attrib of oldAttrs) {
        let newValue = newAttrs[attrib.name];
        if (!newValue) {
            toRemove.push(attrib.nodeName);
        } else if (newValue.length === attrib.nodeValue.length && newValue === attrib.nodeValue) {
            delete newAttrs[attrib.name];
        }
    }

    toRemove.forEach(remove => {
        node.removeAttribute(remove);
    });

    if (newAttrs.slref !== undefined) {
        node.slref = node;
    }

    const isPreventDefault = newAttrs['slpreventdefault'];
    let appliedPrevention = false;

    // set new attributes
    for (let [k, v] of Object.entries(newAttrs)) {
        vType = typeof v;

        if (vType === 'function') {
            if (isPreventDefault !== undefined) {
                let evtName = k;
                if (evtName.startsWith('on')) {
                    evtName = evtName.substring(2, evtName.length);
                }

                const evtListeners = node[k];
                if (evtListeners) {
                    const evtListenerArray = Array.isArray(evtListeners) ? evtListeners : [evtListeners];
                    evtListenerArray.forEach(evtListener => {
                        node.removeEventListener(evtName, evtListener);
                    });
                }

                node.addEventListener(evtName, function (event) {
                    event.preventDefault();
                });

                appliedPrevention = true;
            }

            node[k] = v;

            if (s._changeDetector.changeDetectionStrategy === s.CHANGE_STRATEGY_AUTOMATIC && !v.name.startsWith('bound slDetached') && !v.name.startsWith('slDetached')) {
                proxyEventForChangeDetection(k, node);
            }
        }
        else if (k === 'slnsfor') {
            const keyPairs = JSON.parse(newAttrs.slnsfor);

            for (const [key, value] of Object.entries(keyPairs)) {
                node.setAttributeNS(
                    value.namespace,
                    key,
                    value.value
                );
            }
        } else {
            node.setAttribute(k, v);
        }
    }

    if (!appliedPrevention) {
        if (isPreventDefault !== undefined) {
            applyPreventDefault([node]);
        } else if (oldAttrs['slpreventdefault']) {
            applyPreventDefault([node]);
        }
    }
};

const diffVChildren = (oldNode, oldVChildren, newVChildren) => {
    const origOldLen = oldVChildren.length;
    let childIndex = 0;

    for (let i = oldVChildren.length - 1; i >= 0; --i) {
        let model = null;

        if (newVChildren[i] && newVChildren[i].view) {
            if (oldVChildren[i].slUnboundOnDestroy !== newVChildren[i].slOnDestroy) {
                if (oldVChildren[i].slUnboundOnDestroy !== undefined) oldVChildren[i].slOnDestroyFn();
                removeFromDestroyList(oldVChildren[i]);
                oldVChildren[i].slOnDestroyFn = null;
                oldVChildren[i].slOnDestroy = false;
                oldVChildren[i].slOnDestroyIndex = null;
            }

            const buildObj = getViewFromClass(newVChildren[i], false, false, false, oldVChildren[i]);
            newVChildren[i] = buildObj.view;

            const proto = Object.getPrototypeOf(buildObj.model);
            if (proto.slDirty !== true) {
                if (buildObj.onInit && oldVChildren[i].slOnInit) {
                    oldVChildren[i].slOnInit = false;
                }
                if (buildObj.afterInit && oldVChildren[i].slAfterInit) {
                    oldVChildren[i].slAfterInit = false;
                }
                if (buildObj.onDestroy && oldVChildren[i].slOnDestroy) {
                    oldVChildren[i].slOnDestroy = false;
                }
                proto.slDirty = true;
            }

            if (buildObj.onInit && oldVChildren[i] && !oldVChildren[i].slOnInit) {
                buildObj.onInit.bind(buildObj.model)();
            }
            if (buildObj.afterInit && !oldVChildren[i].slAfterInit && oldVChildren[i].slUnboundAfterInit !== buildObj.slUnboundAfterInit) {
                oldVChildren[i].slAfterInit = true;
                oldVChildren[i].slUnboundAfterInit = buildObj.slUnboundAfterInit;
                s._afterInitArr.push(buildObj.afterInit);
            } else if (oldVChildren[i].slUnboundAfterInit !== undefined && !buildObj.afterInit) {
                oldVChildren[i].slAfterInit = false;
                oldVChildren[i].slUnboundAfterInit = null;
            } else if (buildObj.afterInit && oldVChildren[i] && !oldVChildren[i].slAfterInit) {
                oldVChildren[i].slAfterInit = true;
                oldVChildren[i].slUnboundAfterInit = buildObj.slUnboundAfterInit;
                s._afterInitArr.push(buildObj.afterInit);
            } else if (buildObj.afterInit && oldVChildren[i].slAfterInit && oldVChildren[i].slUnboundAfterInit === undefined) {
                oldVChildren[i].slUnboundAfterInit = buildObj.slUnboundAfterInit;
            }
            if (buildObj.onDestroy && oldVChildren[i] && !oldVChildren[i].slOnDestroy) {
                prepareNodeForDestroyHook(oldVChildren[i], buildObj.onDestroy, buildObj.slUnboundOnDestroy);
            }

            applyClassPropertiesToElement(oldVChildren[i], buildObj.model);
            model = buildObj.model;
        }

        diffVDom(oldVChildren[i], newVChildren[i], model);
        childIndex++;
    }

    let oldVChildrenLength = oldVChildren.length;
    while (oldVChildrenLength > origOldLen) {
        removeFromDestroyList(oldVChildren[oldVChildrenLength - 1]);
        callAllDestroyHooks(oldVChildren[oldVChildrenLength - 1]);
        clearDataForStructuralDirectives(oldVChildren[oldVChildren.length - 1]);
        removeAfterAnimationIfNeeded(oldVChildren[oldVChildrenLength - 1]);

        oldVChildrenLength--;
    }

    for (let additionalVChild of newVChildren.slice(origOldLen)) {
        if (typeof additionalVChild === 'string') {
            if (!oldNode.childNodes[childIndex]) {
                oldNode.append(additionalVChild);
            }
            else if (oldNode.childNodes[childIndex].textContent !== additionalVChild) {
                // oldNode.childNodes[childIndex] might not be defined?
                oldNode.childNodes[childIndex].textContent = additionalVChild;
            }
        }
        else {
            if (typeof additionalVChild === 'string') {
                oldNode.append(additionalVChild);
            } else {
                if (additionalVChild.view) {
                    consumeClassViewAndAppend(additionalVChild, oldNode, true);
                } else {
                    const newNode = renderElementInternal(additionalVChild);
                    oldNode.appendChild(newNode);
                    diffVDom(newNode, additionalVChild);
                }
            }
        }

        childIndex++;
    }

    oldVChildrenLength = oldVChildren.length;
    while (oldVChildrenLength > newVChildren.length) {
        removeFromDestroyList(oldVChildren[oldVChildrenLength - 1]);
        callAllDestroyHooks(oldVChildren[oldVChildrenLength - 1]);
        clearDataForStructuralDirectives(oldVChildren[oldVChildrenLength - 1]);
        removeAfterAnimationIfNeeded(oldVChildren[oldVChildrenLength - 1]);

        oldVChildrenLength--;
    }
};

const removeAfterAnimationIfNeeded = (vNode) => {
    const routeCount = s._router.count;

    if (vNode['slanimatedestroytarget'] !== undefined && vNode['slanimatedestroytarget'] !== '' && !vNode.slAnimateDestroy
        && vNode.attributes.slanimatedestroy !== undefined && vNode.getAttribute('slanimatedestroy') !== '') {
        const targetFn = vNode['slanimatedestroytarget'];

        if (typeof targetFn === 'function') {
            const nodeToAnim = targetFn(vNode);
            if (nodeToAnim) {
                const classToAdd = nodeToAnim.getAttribute('slanimatedestroy');
                const animProxy = nodeToAnim.onanimationend;
                const animStartProxy = nodeToAnim.onanimationstart;

                nodeToAnim.onanimationstart = function (animEvt) {
                    nodeToAnim.slAnimationName = animEvt.animationName;
                }

                nodeToAnim.onanimationend = function (animEvt) {
                    if (!nodeToAnim.slAnimationName || nodeToAnim.slAnimationName !== animEvt.animationName) {
                        return;
                    }

                    let result = undefined;
                    if (animProxy) {
                        result = animProxy.apply(this, [].slice.call(arguments));
                    }

                    nodeToAnim.classList.remove(classToAdd);
                    s._isAnimatingKeyed = null;

                    if (!s._router.currentRoute.animateDestroy) {
                        if (s._router.currentRoute && vNode.id !== s._router.currentRoute.root) {
                            vNode.remove();
                            s._updateMap.delete(vNode.id);
                        } else if (routeCount === s._router.count) {
                            vNode.remove();
                            s._updateMap.delete(vNode.id);
                        }
                        nodeToAnim.onanimationend = animProxy;
                        nodeToAnim.onanimationstart = animStartProxy;
                    } else {
                        s._router.currentRoute.animateDestroy = false;
                        vNode.setAttribute('style', 'opacity: 0;');
                        nodeToAnim.onanimationend = null;
                        nodeToAnim.onanimationstart = null;
                    }

                    nodeToAnim.slAnimationName = null;

                    vNode.slAnimateDestroy = false;
                    delete vNode['slanimatedestroytarget'];

                    detectChanges();

                    return result;
                }

                s._isAnimatingKeyed = nodeToAnim;
                nodeToAnim.classList.add(classToAdd);
                vNode.slAnimateDestroy = true;
            } else {
                if (s._router.currentRoute && vNode.id !== s._router.currentRoute.root) {
                    vNode.remove();
                    s._updateMap.delete(vNode.id);
                } else if (routeCount === s._router.count) {
                    vNode.remove();
                    s._updateMap.delete(vNode.id);
                }
            }
        } else {
            if (s._router.currentRoute && vNode.id !== s._router.currentRoute.root) {
                vNode.remove();
                s._updateMap.delete(vNode.id);
            } else if (routeCount === s._router.count) {
                vNode.remove();
                s._updateMap.delete(vNode.id);
            }
        }
    } else if (vNode.nodeType !== 3
        && vNode.attributes.slanimatedestroy !== undefined
        && vNode.getAttribute('slanimatedestroy') !== ''
        && !vNode.slAnimateDestroy) {
        const animProxy = vNode.onanimationend;
        const animStartProxy = vNode.onanimationstart;
        const classToAdd = vNode.getAttribute('slanimatedestroy');

        vNode.onanimationstart = function (animEvt) {
            vNode.slAnimationName = animEvt.animationName;
        }

        vNode.onanimationend = function (animEvt) {
            if (!vNode.slAnimationName || vNode.slAnimationName !== animEvt.animationName) {
                return;
            }

            let result = undefined;
            if (animProxy) {
                result = animProxy.apply(this, [].slice.call(arguments));
            }

            if (s._router.currentRoute && vNode.id !== s._router.currentRoute.root) {
                vNode.remove();
                s._updateMap.delete(vNode.id);
            } else if (routeCount === s._router.count) {
                vNode.remove();
                s._updateMap.delete(vNode.id);
            }

            vNode.slAnimationName = null;
            vNode.onanimationend = animProxy;
            vNode.onanimationstart = animStartProxy;
            vNode.slAnimateDestroy = false;

            return result;
        }

        vNode.classList.add(classToAdd);
        vNode.slAnimateDestroy = true;
    } else if (!vNode.slAnimateDestroy) {
        if (s._router.currentRoute && vNode.id !== s._router.currentRoute.root) {
            vNode.remove();
            s._updateMap.delete(vNode.id);
        } else if (routeCount === s._router.count) {
            vNode.remove();
            s._updateMap.delete(vNode.id);
        }
    }
}

const isGetter = (x, name) => (Object.getOwnPropertyDescriptor(x, name) || {}).get
const isFunction = (x, name) => typeof x[name] === "function";
const deepFunctions = x =>
    x && x !== Object.prototype &&
    Object.getOwnPropertyNames(x)
        .filter(name => isGetter(x, name) || isFunction(x, name))
        .concat(deepFunctions(Object.getPrototypeOf(x)) || []);
const distinctDeepFunctions = x => Array.from(new Set(deepFunctions(x)));
const userFunctions = x => distinctDeepFunctions(x).filter(name => name !== "constructor" && !~name.indexOf("__"));

const applyPreventDefault = (children) => {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (child.getAttribute('slpreventdefault') !== null) {
            for (const key in child) {
                if (key.startsWith('on')) {
                    let evtName = key.substring(2, key.length);

                    const evtListeners = child[key];
                    if (evtListeners) {
                        const evtListenerArray = Array.isArray(evtListeners) ? evtListeners : [evtListeners];
                        evtListenerArray.forEach(evtListener => {
                            child.removeEventListener(evtName, evtListener);
                        });
                    }

                    child.addEventListener(evtName, function (event) {
                        event.preventDefault();
                    });
                }
            }
        }
    }
}

const diffVDom = (vOldNode, vNewNode, viewModel = null) => {
    if (s._isAnimatingKeyed !== null) {
        for (let [id, component] of s._updateMap) {
            const parentEle = document.getElementById(id);

            if (parentEle.contains(s._isAnimatingKeyed)
                && parentEle.contains(vOldNode)) {
                return vOldNode;
            }
        }
    }

    if (vNewNode && vNewNode.view) {
        const buildObj = getViewFromClass(vNewNode, false, false, false, vOldNode);
        vNewNode = buildObj.view;

        const proto = Object.getPrototypeOf(buildObj.model);
        if (proto.slDirty !== true) {
            if (buildObj.onInit && vOldNode.slOnInit) {
                vOldNode.slOnInit = false;
            }
            if (buildObj.afterInit && vOldNode.slAfterInit) {
                vOldNode.slAfterInit = false;
            }
            if (buildObj.onDestroy && vOldNode.slOnDestroy) {
                vOldNode.slOnDestroy = false;
            }
            proto.slDirty = true;
        }

        if (buildObj.onInit && vOldNode && !vOldNode.slOnInit) {
            buildObj.onInit.bind(buildObj.model)();
        }
        if (buildObj.afterInit && vOldNode && !vOldNode.slAfterInit) {
            vOldNode.slAfterInit = true;
            vOldNode.slUnboundAfterInit = buildObj.slUnboundAfterInit;
            s._afterInitArr.push(buildObj.afterInit);
        }
        if (buildObj.onDestroy && vOldNode && !vOldNode.slOnDestroy) {
            prepareNodeForDestroyHook(vOldNode, buildObj.onDestroy, buildObj.slUnboundOnDestroy);
        }
    }

    if (!vNewNode) {
        if (vOldNode) {
            // vOldNode.style.opacity = 0;
            removeFromDestroyList(vOldNode);
            callAllDestroyHooks(vOldNode);
            clearDataForStructuralDirectives(vOldNode);
            removeAfterAnimationIfNeeded(vOldNode);
        }
        return vOldNode;
    }

    // Tag mismatch
    if (vOldNode &&
        (vOldNode.tagName || '').toLowerCase() !== ((vNewNode ? vNewNode.tagName : undefined) || '').toLowerCase()) {
        if (vNewNode.tagName) {
            let el;

            if (vNewNode.attrs && vNewNode.attrs.slns) {
                el = document.createElementNS(vNewNode.attrs.slns, vNewNode.tagName.toLowerCase());
            } else {
                el = document.createElement(vNewNode.tagName);
            }

            vOldNode.parentNode.insertBefore(el, vOldNode);
            removeFromDestroyList(vOldNode);
            callAllDestroyHooks(vOldNode);
            clearDataForStructuralDirectives(vOldNode);
            removeAfterAnimationIfNeeded(vOldNode);
            vOldNode = el;
        } else {
            removeFromDestroyList(vOldNode);
            callAllDestroyHooks(vOldNode);
            vOldNode.replaceWith(vNewNode);
            vOldNode = vNewNode;
            return vOldNode;
        }
    }

    if (typeof vNewNode === 'string') {
        if (vOldNode.textContent !== vNewNode) {
            vOldNode.textContent = vNewNode;
        }
        return vOldNode;
    }

    switch (vNewNode.attrs.sldirective) {
        case 'useexisting': {
            return vOldNode;
        }
        case 'onlychildren': {
            diffVChildren(vOldNode, vOldNode.childNodes, vNewNode.children);

            return vOldNode;
        }
        case 'onlyself': {
            diffVAttrs(vOldNode, vOldNode.attributes, vNewNode.attrs);

            return vOldNode;
        }
        case 'trustchildren': {
            diffVAttrs(vOldNode, vOldNode.attributes, vNewNode.attrs);

            let newHtml = '';
            vNewNode.children.forEach(childHtml => {
                newHtml += childHtml;
            });

            if (vOldNode.innerHTML !== newHtml) {
                vOldNode.innerHTML = newHtml;
            }

            const preventChildrenList = vOldNode.querySelectorAll('[slpreventdefault]');
            if (preventChildrenList.length > 0) {
                applyPreventDefault(Array.from(preventChildrenList));
            }

            return vOldNode;
        }
    }

    if (vNewNode.attrs.slfor) {
        const slfor = vNewNode.attrs.slfor;
        const tokens = slfor.split(':');

        if (tokens.length >= 4) {
            if (!s._structureForMap.has(tokens[0])) {
                const list = makeSlForList(vOldNode, vNewNode.model[tokens[2]]);
                s._structureForMap.set(tokens[0], list);

                if (vOldNode.children.length > 0) {
                    let kids = Object.create(null);
                    for (let i = 0; i < vOldNode.children.length; ++i) {
                        kids[i] = vOldNode.children[i];
                    }

                    list.map = kids;
                }
            }

            const list = s._structureForMap.get(tokens[0]);
            updateSlForList.bind(vNewNode.model, list, vNewNode.model[tokens[1]], vNewNode.model[tokens[3]])();
        }

        diffVAttrs(vOldNode, vOldNode.attributes, vNewNode.attrs);

        return vOldNode;
    } else if (vNewNode.attrs.slfornamed) {
        const slfor = vNewNode.attrs.slfornamed;
        const tokens = slfor.split(':');

        if (tokens.length >= 4) {
            let namedFactory, namedUpdate, namedData, namedFn;
            for (let prop of Object.keys(vNewNode.model)) {
                namedFn = vNewNode.model[prop];

                if (namedFn.slfor === tokens[2]) {
                    namedFactory = namedFn;
                } else if (namedFn.slfor === tokens[1]) {
                    namedData = namedFn;
                } else if (namedFn.slfor === tokens[3]) {
                    namedUpdate = namedFn;
                }
            }
            for (let prop of userFunctions(vNewNode.model)) {
                namedFn = vNewNode.model[prop];

                if (namedFn.slfor === tokens[2]) {
                    namedFactory = namedFn;
                } else if (namedFn.slfor === tokens[1]) {
                    namedData = namedFn;
                } else if (namedFn.slfor === tokens[3]) {
                    namedUpdate = namedFn;
                }
            }
            namedData = namedData.bind(vNewNode.model);

            if (!s._structureForMap.has(tokens[0])) {
                const list = makeSlForList(vOldNode, namedFactory);
                s._structureForMap.set(tokens[0], list);

                if (vOldNode.children.length > 0) {
                    let kids = Object.create(null);
                    for (let i = 0; i < vOldNode.children.length; ++i) {
                        kids[i] = vOldNode.children[i];
                    }

                    list.map = kids;
                }
            }

            const list = s._structureForMap.get(tokens[0]);
            updateSlForList.bind(vNewNode.model, list, namedData, namedUpdate)();
        }

        diffVAttrs(vOldNode, vOldNode.attributes, vNewNode.attrs);

        return vOldNode;
    }

    diffVAttrs(vOldNode, vOldNode.attributes, vNewNode.attrs);
    diffVChildren(vOldNode, vOldNode.childNodes, vNewNode.children);

    return vOldNode;
};

const _mountInternal = (target, component, attachDetector) => {
    s._afterInitArr = [];

    // init before view
    if (component.slOnInit) component.slOnInit();
    let vNewApp = component.view.bind(component)();
    applyModelForStructuralDirectives(vNewApp, component);
    if (vNewApp.view) {
        vNewApp = vNewApp.view.bind(component)();
        applyModelForStructuralDirectives(vNewApp, component);
    }

    if (!vNewApp.attrs || (target && target.id !== vNewApp.attrs.id)) {
        const newId = vNewApp.attrs ? vNewApp.attrs.id : 'null';
        console.error('Mounted component root element changed from ' + target.id + ' to ' + newId);
    }

    target = diffVDom(target, vNewApp, component);

    if (attachDetector)
        s._updateMap.set(target.id, component);

    if (component.slOnDestroy) {
        prepareNodeForDestroyHook(target, component.slOnDestroy.bind(component), component.slOnDestroy);
    }

    let refs = target.querySelectorAll('[slref]');
    if (target.slref !== undefined) {
        refs = Array.from(refs);
        refs.push(target);
    }
    for (let index = 0; index < refs.length; ++index) {
        const slrefValue = refs[index].getAttribute('slref');
        component[slrefValue] = refs[index].slref;
    }

    if (component.slAfterInit) {
        component.slAfterInit();
        target.slUnboundAfterInit = component.slAfterInit;
        _performChangeDetection();
    }

    s._afterInitArr.forEach((afterInitFn) => {
        afterInitFn();
    });

    return target;
}

export function version() {
    return '21.0.0';
}

export function resolveAll(promiseArr) {
    const reflect = p => p.then(result => ({ result, status: 'fulfilled', error: null }),
        error => ({ result: null, error, status: 'rejected' }));

    return Promise.all(promiseArr.map(reflect));
}

export function setState(newStateObj) {
    s._state = newStateObj;
}

export function getState() {
    return s._state;
}

export function textNode(text) {
    return String(text);
}

export function markup(tagName, { attrs = {}, children = [] } = {}) {
    tagName = tagName.toUpperCase();

    return {
        tagName,
        attrs,
        children
    };
}

export function m() {
    if (arguments.length === 3 && typeof arguments[0] === 'string' && typeof arguments[1] === 'object' && Array.isArray(arguments[2])) {
        return markup(arguments[0], { attrs: arguments[1], children: arguments[2] });
    } else {
        return markup(arguments[0], arguments[1]);
    }
}

export function mount(eleId, component, attachDetector = true) {
    s._router.mountRoute = eleId;
    let ele = document.getElementById(eleId);

    if (ele !== null) {
        return _mountInternal(ele, component, attachDetector);
    } else {
        console.error('ID ' + eleId + ' does not exist in DOM.');
    }
}

export function update(rootEl, component) {
    const origId = rootEl;
    rootEl = document.getElementById(rootEl);

    //clear after init arr?
    s._afterInitArr = [];

    if (!rootEl) {
        console.error('ID ' + origId + ' not mounted in DOM; attachDetector likely needs to be called.');
    } else {
        let vNewApp = component.view.bind(component)();
        applyModelForStructuralDirectives(vNewApp, component);
        rootEl = diffVDom(rootEl, vNewApp, component);
    }

    let refs = rootEl.querySelectorAll('[slref]');
    if (rootEl.slref !== undefined) {
        refs = Array.from(refs);
        refs.push(rootEl);
    }
    for (let index = 0; index < refs.length; ++index) {
        const slrefValue = refs[index].getAttribute('slref');
        component[slrefValue] = refs[index].slref;
    }

    s._afterInitArr.forEach((afterInitFn) => {
        afterInitFn();
    });
}

let origPopState = slContext.onpopstate;

slContext.onpopstate = function (event) {
    switch (s._router.strategy) {
        case '#': {
            // #/
            if (slContext.location.hash && s._router.lastHash !== slContext.location.hash.substring(2)) {
                if (origPopState) origPopState(event);
                route(getRoute());
            }

            break;
        }
        case '?': {
            // ?/
            if (slContext.location.search && s._router.lastHash !== slContext.location.search.substring(2)) {
                if (origPopState) origPopState(event);
                route(getRoute());
            }

            break;
        }
        case '': {
            // /
            if (slContext.location.pathname && s._router.lastHash !== slContext.location.pathname.substring(1)) {
                if (origPopState) origPopState(event);
                route(getRoute());
            }

            break;
        }
    }
}

s._router = {
    segmentArr: [],
    routeList: [],
    params: null,
    lastHash: false,
    currentRoute: null,
    mountRoute: '',
    strategy: '#',
    count: 0
};

Object.seal(s._router);

const setUrlSegments = () => {
    switch (s._router.strategy) {
        case '#': {
            let hashStr = slContext.location.href.split('#/')[1];

            if (hashStr) {
                let newSegments = hashStr.split('/');
                newSegments.forEach((segment, index) => {
                    s._router.segmentArr[index] = segment;
                });

                s._router.segmentArr.splice(newSegments.length, s._router.segmentArr.length);
            } else {
                s._router.segmentArr.splice(0, s._router.segmentArr.length);
            }

            break;
        }
        case '?': {
            let queryStr = slContext.location.href.split('?/')[1];

            if (queryStr) {
                let newSegments = queryStr.split('/');
                newSegments.forEach((segment, index) => {
                    s._router.segmentArr[index] = segment;
                });

                s._router.segmentArr.splice(newSegments.length, s._router.segmentArr.length);
            } else {
                s._router.segmentArr.splice(0, s._router.segmentArr.length);
            }

            break;
        }
        case '': {
            let pathStr = slContext.location.pathname;

            if (pathStr) {
                pathStr = pathStr.replace('/', '');

                let newSegments = pathStr.split('/');
                newSegments.forEach((segment, index) => {
                    s._router.segmentArr[index] = segment;
                });

                s._router.segmentArr.splice(newSegments.length, s._router.segmentArr.length);
            } else {
                s._router.segmentArr.splice(0, s._router.segmentArr.length);
            }

            break;
        }
    }
}

export function setRouteStrategy(newStrategy) {
    const validSet = new Set(['#', '?', '']);

    if (validSet.has(newStrategy)) {
        s._router.strategy = newStrategy;
    }
}

export function getRouteQueryVariables() {
    // ?/
    const query = slContext.location.search.substring(2);
    const vars = query.split('&');

    const resultList = [];

    for (var i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        resultList.push({ var: decodeURIComponent(pair[0]), value: decodeURIComponent(pair[1]) });
    }

    return resultList;
}

export function getRouteSegments() {
    return s._router.segmentArr;
}

export function getRouteParams() {
    return s._router.params;
}

export function getRoute() {
    switch (s._router.strategy) {
        case '#': {
            return slContext.location.href.split('#/')[1];
        }
        case '?': {
            return slContext.location.href.split('?/')[1];
        }
        case '': {
            let pathStr = slContext.location.pathname;

            if (pathStr) {
                pathStr = pathStr.replace('/', '');
            }

            return pathStr;
        }
    }
}

export function addRoute(routeExp, routeObj) {
    s._router.routeList.push([new RegExp('^' + routeExp.replace(/:[^\/]+/g, '([^\\/]+)') + '$'), routeObj]); // eslint-disable-line no-useless-escape
}

export function removeRoute(routeExp) {
    const toRemExp = new RegExp('^' + routeExp.replace(/:[^\/]+/g, '([^\\/]+)') + '$');
    const toRemStr = String(toRemExp);

    for (let i = 0; i < s._router.routeList.length; ++i) {
        const [key, value] = s._router.routeList[i];

        if (String(key) === toRemStr) {
            s._router.routeList.splice(i, 1);
            break;
        }
    }
}

export function route(routeStr, routeParams = {}, attachDetector = true) {
    s._router.params = routeParams;

    if (s._router.currentRoute && s._router.currentRoute.onCanDeactivate) {
        if (!s._router.currentRoute.onCanDeactivate(routeStr)) {
            return;
        }
    }

    let comp = null;
    for (let [key, value] of s._router.routeList) {
        if (key.test(routeStr)) {
            if (value.onActivationCheck) {
                if (!value.onActivationCheck(routeStr)) {
                    if (value.onActivationFail) {
                        comp = route(value.onActivationFail.route, value.onActivationFail.params, typeof value.onActivationFail.attachDetector === 'boolean' ? value.onActivationFail.attachDetector : true);
                    }

                    routeStr = undefined;
                    return;
                }
            }

            if (value.onBeforeRoute) {
                value.onBeforeRoute();
            }

            // Handle destroy functions
            const destroyEleList = s._destroyNodeMap.get(getRoute());
            if (destroyEleList) {
                destroyEleList.forEach(destroyEle => {
                    if (destroyEle.slOnDestroyFn) destroyEle.slOnDestroyFn();
                    destroyEle.slOnDestroyFn = null;
                });
                s._destroyNodeMap.set(getRoute(), []);
                s._destroyFuncMap.set(getRoute(), []);
            }

            s._router.lastHash = routeStr;

            const scrollPosition = slContext.pageYOffset;

            switch (s._router.strategy) {
                case '#': {
                    //slContext.location.hash = '/' + routeStr;
                    slContext.history.pushState(null, document.title, '#/' + routeStr);

                    break;
                }
                case '?': {
                    let newUrl = slContext.location.href;
                    const originalPathname = slContext.location.pathname;
                    newUrl = newUrl.substring(0, newUrl.indexOf(originalPathname));
                    newUrl += '/?/' + routeStr;

                    slContext.history.pushState(null, document.title, newUrl);

                    break;
                }
                case '': {
                    let newUrl = slContext.location.href;
                    const originalPathname = slContext.location.pathname;
                    newUrl = newUrl.substring(0, newUrl.indexOf(originalPathname));
                    newUrl += '/' + routeStr;

                    slContext.history.pushState(null, document.title, newUrl);

                    break;
                }
            }

            slContext.scrollTo(0, scrollPosition);

            let root = document.getElementById(value.root);

            if (s._router.currentRoute && s._router.currentRoute.animateDestroy !== undefined) {
                s._router.currentRoute.animateDestroy = true;
            }

            if (s._router.currentRoute && s._router.currentRoute.animateDestroy) {
                let currentRouteRoot = s._router.currentRoute.root;
                currentRouteRoot = document.getElementById(currentRouteRoot);

                s._router.currentRoute = value;

                removeFromDestroyList(currentRouteRoot);
                callAllDestroyHooks(currentRouteRoot);
                clearDataForStructuralDirectives(currentRouteRoot);
                removeAfterAnimationIfNeeded(currentRouteRoot);

                setUrlSegments();
            } else {
                setUrlSegments();
                s._router.currentRoute = value;
            }

            s._router.count++;

            if (value.component) {
                // Set new destroy functions
                if (value.component.slOnDestroy)
                    s._destroyFuncMap.set(routeStr, [value.component.slOnDestroy.bind(value.component)]);

                // Set new content
                s._router.mountRoute = routeStr;
                _mountInternal(root, value.component, attachDetector);

                comp = value.component;
            }

            break;
        }
    }

    if (s._changeDetector.changeDetectionStrategy === s.CHANGE_STRATEGY_AUTOMATIC) {
        _performChangeDetection();
    }

    return comp;
}

setUrlSegments();

const makeSlForList = (parent, factory, options) => {
    return {
        parent: parent,
        factory: factory,
        map: Object.create(null),
    }
}

function renderSlForList(list, arr) {
    if (typeof arr === 'function') arr = arr();

    let markupNodes = [];

    for (let i = 0; i < arr.length; ++i) {
        markupNodes.push(list.factory.bind(this, arr[i])());
    }

    return markupNodes;
}

// Allows markup or DOM node
function updateSlForList(list, arr, updateFn) {
    if (typeof arr === 'function') arr = arr();

    const kids = Object.create(null), parent = list.parent;
    let spot = parent.firstChild, kid, next;

    if (!arr.length) {
        parent.textContent = '';
    } else {
        for (let i = 0; i < arr.length; ++i) {
            kid = list.map[i];
            if (kid) {
                updateFn.bind(kid, this, arr[i])();
            } else {
                kid = list.factory.bind(this, arr[i])();

                // If markup...
                if (kid.attrs !== undefined) {
                    kid = renderElementInternal(kid);
                }
            }
            kids[i] = kid;

            if (!spot) {
                parent.appendChild(kid);
            }
            spot = kid.nextSibling;
        }

        while (spot !== null) {
            next = spot.nextSibling;
            removeFromDestroyList(spot);
            callAllDestroyHooks(spot);
            clearDataForStructuralDirectives(spot);
            removeAfterAnimationIfNeeded(spot);
            spot = next;
        }
    }

    list.map = kids;

    const preventChildrenList = list.parent.querySelectorAll('[slpreventdefault]');
    if (preventChildrenList.length > 0) {
        applyPreventDefault([list.parent]);
        applyPreventDefault(Array.from(preventChildrenList));
    }
}

s.CHANGE_STRATEGY_AUTOMATIC = 100;
s.CHANGE_STRATEGY_MANUAL = 200;
s.CHANGE_DETECTOR_DETACHED = false;
s.CHANGE_DETECTOR_ATTACHED = true;

s._changeStrategies = [
    s.CHANGE_STRATEGY_AUTOMATIC,
    s.CHANGE_STRATEGY_MANUAL
];

s._changeDetector = {
    lastUpdateDate: new Date(),
    changeDetectionStrategy: s.CHANGE_STRATEGY_AUTOMATIC,
};

Object.seal(s._changeDetector);
Object.freeze(s._changeStrategies);

const proxyEventForChangeDetection = (eventName, elem) => {
    if (elem[eventName]) {
        let proxy = elem[eventName];

        elem[eventName] = function () {
            let result = proxy.apply(this, [].slice.call(arguments));
            _performChangeDetection(); // Change after update
            return result;
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = s.DETACHED_SET_TIMEOUT(() => func.apply(context, args), wait);
    }
}

const performChangeUpdates = (targetEleId = null) => {
    if (targetEleId) {
        update(targetEleId, s._updateMap.get(targetEleId));
    } else {
        s._updateMap.forEach((component, eleId) => {
            update(eleId, component);
        });
    }
}

const _performChangeDetection = () => {
    if (s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC) {
        return;
    }

    let currentDate = new Date();
    let timeDiff = currentDate - s._changeDetector.lastUpdateDate;

    if (timeDiff > 6) {
        performChangeUpdates();
    } else {
        s._debouncedPerformUpdates();
    }

    s._changeDetector.lastUpdateDate = new Date();
}

export function setDetectionStrategy(newStrategy) {
    s._changeStrategies.forEach(paramEntry => {
        if (paramEntry === newStrategy) {
            s._changeDetector.changeDetectionStrategy = newStrategy;
        }
    });
}

export function detectChanges(targetEleId = null) {
    performChangeUpdates(targetEleId);
}

export function isDetectorAttached(checkEleId) {
    return s._updateMap.has(checkEleId);
}

export function detachDetector(eleId) {
    s._updateMap.delete(eleId);
}

const originalThen = Promise.prototype.then;

export function enableDetectOnThen() {
    Promise.prototype.then = function (onFulfill, onReject) {
        const wrappedOnFulfill = (result) => {
            _performChangeDetection();
            return typeof onFulfill === 'function' && onFulfill instanceof Function ? onFulfill(result) : onFulfill;
        };

        return originalThen.call(this, wrappedOnFulfill, onReject);
    };
}

export function wrapWithChangeDetector(func, config) {
    return function () {
        if (config && config.slpreventdefault && arguments.length > 0 && typeof arguments[0].preventDefault === 'function') {
            arguments[0].preventDefault();
        }

        let result = func.apply(this, [].slice.call(arguments));
        _performChangeDetection(); // Change after update
        return result;
    }
}

s._debouncedPerformUpdates = debounce(performChangeUpdates, 17);

// XHR Proxy
let xhrSendProxy = slContext.XMLHttpRequest.prototype.send;
let onReadyMap = new Map();

function xhrSend(data) {
    if (this.onreadystatechange) {
        this._onreadystatechange = this.onreadystatechange;

        if (this._onreadystatechangecount === undefined) this._onreadystatechangecount = 0;
        else this._onreadystatechangecount += 4;
    } else {
        this._onreadystatechangecount = 0;
    }

    this.onreadystatechange = xhrOnReadyStateChangeProxy;
    return xhrSendProxy.apply(this, arguments);
}

function xhrOnReadyStateChangeProxy() {
    if (this._onreadystatechange) {
        let lastCount = onReadyMap.get(this);

        if (lastCount !== undefined && lastCount === this._onreadystatechangecount) {
            onReadyMap.delete(this);
            return undefined;
        } else if (lastCount !== undefined) {
            onReadyMap.set(this, lastCount + 1);
        } else {
            onReadyMap.set(this, 0);
        }

        let result = this._onreadystatechange.apply(this, arguments);
        _performChangeDetection(); // Change after update
        onReadyMap.delete(this);

        return result;
    }
}

slContext.XMLHttpRequest.prototype.send = xhrSend;

// Fetch
let fetchProxy = slContext.fetch;

slContext.fetch = function () {
    let result = fetchProxy.apply(this, arguments);
    _performChangeDetection(); // Change after update
    return result;
}

// Web APIs wrap
const origTimeout = slContext.setTimeout;
slContext.setTimeout = function (runChanges = true) {
    let result;

    if (arguments.length > 2) {
        const args = [].slice.call(arguments, 1);
        result = origTimeout.apply(this, args);
        if (runChanges) {
            _performChangeDetection(); // Change after update
        }
    } else {
        const args = [].slice.call(arguments);
        result = origTimeout.apply(this, args);
        _performChangeDetection(); // Change after update
    }

    return result;
}

const origInterval = slContext.setInterval;
slContext.setInterval = function (runChanges = true) {
    let result;

    if (arguments.length > 2) {
        const args = [].slice.call(arguments, 1);
        result = origInterval.apply(this, args);

        if (runChanges) {
            _performChangeDetection(); // Change after update
        }
    } else {
        const args = [].slice.call(arguments);
        const fn = args[0];
        args[0] = () => {
            fn();
            _performChangeDetection(); // Change after update
        };
        result = origInterval.apply(this, args);
        _performChangeDetection(); // Change after update
    }

    return result;
}

const DETACHED_SET_TIMEOUT = slContext.setTimeout;
const DETACHED_SET_INTERVAL = slContext.setInterval;

Object.defineProperty(s, 'DETACHED_SET_TIMEOUT', {
    value: DETACHED_SET_TIMEOUT.bind(slContext, false)
});

Object.defineProperty(s, 'DETACHED_SET_INTERVAL', {
    value: DETACHED_SET_INTERVAL.bind(slContext, false)
});
