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
s._scopedCssSet = new Set();

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
    let el = document.createElement(tagName);
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
        else el.setAttribute(k, v);
    }

    for (let child of children) {
        el.append(child);
    }

    return el;
}

export function renderElement({ tagName, attrs, children }, isDetached = false) {
    let el = document.createElement(tagName);

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
    let el = document.createElement(tagName);

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
    if (buildObj.scopedCss) {
        const identifier = applyScopedCss(buildObj.model, buildObj.model.slStyle());
        applyScopedCssIdentifier(ele, identifier);
        ele.slScopedCss = true;
    }
    setHookStateForNode(ele, buildObj.destroyIndex, buildObj.onDestroy);
    insertEleIntoDestroyMap(ele);
    el.appendChild(ele);
    applyClassPropertiesToElement(ele, origChild);
    if (diffDom) {
        diffVDom(ele, child, buildObj.model);
    }
}

const setHookStateForNode = (ele, destroyIndex, destroyFn) => {
    ele.slOnDestroy = true;
    ele.slAfterInit = true;
    ele.slOnInit = true;
    ele.slOnDestroyIndex = destroyIndex;
    ele.slOnDestroyFn = destroyFn;
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
        scopedCss: child.slStyle ? child.slStyle.bind(child) : null
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

const applyScopedCssIdentifier = (node, identifier) => {
    node.setAttribute(identifier, '');

    if (node.children && node.children.length > 0) {
        for (const child of node.children) {
            applyScopedCssIdentifier(child, identifier);
        }
    }
}

const prepareNodeForDestroyHook = (node, fn) => {
    node.slOnDestroy = true;

    let fnList = s._destroyFuncMap.get(s._router.mountRoute);
    if (!fnList) fnList = [];
    fnList.push(fn);
    s._destroyFuncMap.set(s._router.mountRoute, fnList);

    node.slOnDestroyIndex = fnList.length - 1;
    node.slOnDestroyFn = fn;

    insertEleIntoDestroyMap(node);
}

const diffVAttrs = (node, oldAttrs, newAttrs) => {
    let vType;
    const toRemove = [];

    for (let attrib of oldAttrs) {
        let newValue = newAttrs[attrib.name];
        if (!newValue) {
            if (!attrib.name.startsWith('slcss-')) {
                toRemove.push(attrib.nodeName);
            }
        } else if (newValue.length === attrib.nodeValue.length && newValue === attrib.nodeValue) {
            delete newAttrs[attrib.name];
        }
    }

    toRemove.forEach(remove => {
        node.removeAttribute(remove);
    });

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
        let identifier = null;

        if (newVChildren[i] && newVChildren[i].view) {
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
                if (buildObj.scopedCss && oldVChildren[i].slScopedCss) {
                    oldVChildren[i].slScopedCss = false;
                }
                if (buildObj.onDestroy && oldVChildren[i].slOnDestroy) {
                    oldVChildren[i].slOnDestroy = false;
                }
                proto.slDirty = true;
            }

            if (buildObj.onInit && oldVChildren[i] && !oldVChildren[i].slOnInit) {
                buildObj.onInit.bind(buildObj.model)();
            }
            if (buildObj.afterInit && oldVChildren[i] && !oldVChildren[i].slAfterInit) {
                oldVChildren[i].slAfterInit = true;
                s._afterInitArr.push(buildObj.afterInit);
            }
            if (buildObj.scopedCss && oldVChildren[i] && !oldVChildren[i].slScopedCss) {
                identifier = applyScopedCss(buildObj.model, buildObj.model.slStyle());
            }
            if (buildObj.onDestroy && oldVChildren[i] && !oldVChildren[i].slOnDestroy) {
                prepareNodeForDestroyHook(newVChildren[i], buildObj.onDestroy);
            }

            applyClassPropertiesToElement(oldVChildren[i], buildObj.model);
            model = buildObj.model;
        }

        diffVDom(oldVChildren[i], newVChildren[i], model);
        if (identifier) {
            applyScopedCssIdentifier(oldVChildren[i], identifier);
            oldVChildren[i].slScopedCss = true;
        }
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
                }
            }
        } else {
            if (s._router.currentRoute && vNode.id !== s._router.currentRoute.root) {
                vNode.remove();
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

const checkForScopedCss = (target, component) => {
    if (component.slStyle && !target.slScopedCss) {
        const identifier = applyScopedCss(component, component.slStyle());
        applyScopedCssIdentifier(target, identifier);
        target.slScopedCss = true;
    }
}

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
            if (buildObj.scopedCss && vOldNode.slScopedCss) {
                vOldNode.slScopedCss = false;
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
            s._afterInitArr.push(buildObj.afterInit);
        }
        if (buildObj.scopedCss && vOldNode && !vOldNode.slScopedCss) {
            const identifier = applyScopedCss(buildObj.model, buildObj.model.slStyle());
            applyScopedCssIdentifier(vOldNode, identifier);
            vOldNode.slScopedCss = true;
        }
        if (buildObj.onDestroy && vOldNode && !vOldNode.slOnDestroy) {
            prepareNodeForDestroyHook(vOldNode, buildObj.onDestroy);
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
    if (vOldNode && vOldNode.tagName !== vNewNode.tagName) {
        if (vNewNode.tagName) {
            let el = document.createElement(vNewNode.tagName);
            checkForScopedCss(el, vNewNode);
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
            checkForScopedCss(vOldNode, vNewNode);

            return vOldNode;
        }
        case 'onlychildren': {
            diffVChildren(vOldNode, vOldNode.childNodes, vNewNode.children);

            return vOldNode;
        }
        case 'onlyself': {
            diffVAttrs(vOldNode, vOldNode.attributes, vNewNode.attrs);
            checkForScopedCss(vOldNode, vNewNode);

            return vOldNode;
        }
        case 'trustchildren': {
            diffVAttrs(vOldNode, vOldNode.attributes, vNewNode.attrs);
            checkForScopedCss(vOldNode, vNewNode);

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
        checkForScopedCss(vOldNode, vNewNode);

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
        checkForScopedCss(vOldNode, vNewNode);

        return vOldNode;
    }

    diffVAttrs(vOldNode, vOldNode.attributes, vNewNode.attrs);
    diffVChildren(vOldNode, vOldNode.childNodes, vNewNode.children);
    checkForScopedCss(vOldNode, vNewNode);

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

    if (component.slStyle && !target.slScopedCss) {
        const identifier = applyScopedCss(component, component.slStyle());
        applyScopedCssIdentifier(target, identifier);
        target.slScopedCss = true;
    }

    if (attachDetector)
        s._updateMap.set(target.id, component);

    if (component.slOnDestroy) {
        prepareNodeForDestroyHook(target, component.slOnDestroy.bind(component));
    }

    if (component.slAfterInit) {
        component.slAfterInit();
        _performChangeDetection();
    }

    s._afterInitArr.forEach((afterInitFn) => {
        afterInitFn();
    });

    return target;
}

export function version() {
    return '18.1.0';
}

function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function () {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

const countSubstr = (string, word) => {
    return string.split(word).length - 1;
}

const seekToFirstUnquotedChar = (string, charToSeek, startIndex = 0) => {
    let data = '';
    let openedDouble = false;
    let opened = false;
    let previousEscape = false;

    for (let i = startIndex; i < string.length; ++i) {
        if (string[i] === '"' && !opened && !openedDouble) {
            openedDouble = true;
        } else if (string[i] === '\'' && !opened && !openedDouble) {
            opened = true;
        } else if (string[i] === '"' && openedDouble && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '\'' && opened && !previousEscape) {
            opened = false;
            openedDouble = false;
        } else if (string[i] === '"' && openedDouble && previousEscape) {
            previousEscape = false;
        } else if (string[i] === '\'' && opened && previousEscape) {
            previousEscape = false;
        } else {
            if (string[i] === '\\') {
                previousEscape = true;
            } else {
                previousEscape = false;
            }
        }

        //if (!opened && !openedDouble) {
        data += string[i];
        //}

        if (charToSeek.length === 1) {
            if (string[i] === charToSeek && !openedDouble && !opened) {
                break;
            }
        } else if (string.length > i + charToSeek.length && string.substring(i, i + charToSeek.length) === charToSeek && !openedDouble && !opened) {
            data += string.substring(i, i + charToSeek.length - 1);
            break;
        }
    }

    return data;
}

const applyScopedCss = (model, cssText) => {
    const seedFn = xmur3(model.constructor.name);
    const identifier = 'slcss-' + String(seedFn());

    if (cssText === '' || s._scopedCssSet.has(identifier)) {
        return identifier;
    }

    cssText = cssText.replace(/\t+/g, ' ');

    s._scopedCssSet.add(identifier);

    const cssRegex = new RegExp('([^{]+)\s*\{\s*([^}]+)\s*}', 'g');
    const matches = cssText.match(cssRegex);
    const unquotedCssRegex = /[^\s"]+|"([^"]*)"/gi;

    let unquotedStr = '';
    let match = null;

    do {
        match = unquotedCssRegex.exec(cssText);
        if (match != null) {
            if (!match[1]) {
                unquotedStr += match[0];
            }
        }
    } while (match != null);

    let finalCss = '';
    let startOpenBraceIndex;
    let appendedIndex;
    let layerCount = 0;
    let unclosedBraceCount = 0;
    let customPropertyBraceCount = 0;
    let customPropertyToken;
    let isLayer;
    let isNestedCount = 0;
    let nestedAdditionalBraces;
    let isKeyframes = false;
    let isMedia = false;
    let nestedInsertionCount = 0;
    let firstTokenIsAt = false;
    let checkAtStr;
    let firstTokenColonEnd;
    let unclosedAdjustment;
    let nestedCloseCount = 0;
    const keyframeNameMap = new Map();

    if (unquotedStr.includes('{') && unquotedStr.includes('}') && unquotedStr.split('{').length === unquotedStr.split('}').length) {
        for (let i = 0; i < matches.length; ++i) {
            nestedAdditionalBraces = 0;
            startOpenBraceIndex = 0;
            appendedIndex = 0;
            customPropertyToken = null;
            isLayer = false;
            isMedia = false;
            firstTokenIsAt = false;

            let unquotedTemp = '';

            do {
                match = unquotedCssRegex.exec(matches[i]);
                if (match != null) {
                    if (!match[1]) {
                        unquotedTemp += match[0];
                    }
                }
            } while (match != null);

            let openBraceCount = countSubstr(unquotedTemp, '{');
            checkAtStr = matches[i].substring(startOpenBraceIndex);

            while (checkAtStr.replace(/}/g, '').trim().startsWith('@') && (checkAtStr.includes('@layer')
                || checkAtStr.includes('@scope')
                || checkAtStr.includes('@container')
                || checkAtStr.includes('@keyframes')
                || checkAtStr.replace(/}/g, '').trim().startsWith('@media'))) {
                layerCount++;
                isLayer = true;

                if (matches[i].substring(startOpenBraceIndex).includes('@keyframes')) {
                    isKeyframes = true;
                } else if (matches[i].substring(startOpenBraceIndex).includes('@media')) {
                    isMedia = true;
                }

                if (openBraceCount == 1) {
                    startOpenBraceIndex = startOpenBraceIndex + seekToFirstUnquotedChar(matches[i], ';', startOpenBraceIndex).length;

                    finalCss += matches[i].substring(appendedIndex, startOpenBraceIndex);
                    appendedIndex = startOpenBraceIndex;
                    layerCount--;
                } else {
                    unclosedBraceCount++;
                    layerCount--;
                    startOpenBraceIndex = startOpenBraceIndex + seekToFirstUnquotedChar(matches[i], '{', startOpenBraceIndex).length;

                    const seekToSemicolonStr = seekToFirstUnquotedChar(matches[i], ';', 0);

                    if (isKeyframes) {
                        let animNameStr = matches[i].substring(appendedIndex, startOpenBraceIndex);
                        animNameStr = animNameStr.replace('@keyframes', '');
                        animNameStr = animNameStr.trim();

                        if (animNameStr.endsWith('{')) {
                            animNameStr = animNameStr.substring(0, animNameStr.length - 2);
                            animNameStr = animNameStr.trim();
                        }

                        const keyframeName = ' ' + animNameStr + identifier;
                        keyframeNameMap.set(animNameStr, keyframeName);

                        finalCss += ' @keyframes ' + keyframeName + ' { ';
                    } else {
                        const proposedCss = matches[i].substring(appendedIndex, startOpenBraceIndex);

                        if (seekToSemicolonStr.length < proposedCss.length) {
                            finalCss += seekToSemicolonStr;
                            startOpenBraceIndex -= proposedCss.length - seekToSemicolonStr.length;
                            openBraceCount--;
                        } else {
                            if (isNestedCount > 0) {
                                let formattedCss = proposedCss.trim();
                                while (formattedCss.startsWith('}') && isNestedCount > 0) {
                                    if (layerCount !== 0 || isNestedCount !== 1 || openBraceCount <= isNestedCount || !(unclosedBraceCount - openBraceCount >= 1)) {

                                        isNestedCount--;
                                    }

                                    openBraceCount--;
                                    unclosedBraceCount--;
                                    formattedCss = formattedCss.replace('}', '').trim();
                                }
                            }

                            let unquotedProposedStr = '';
                            match = null;

                            do {
                                match = unquotedCssRegex.exec(proposedCss);
                                if (match != null) {
                                    if (!match[1]) {
                                        unquotedProposedStr += match[0];
                                    }
                                }
                            } while (match != null);

                            finalCss += proposedCss;

                            if (isNestedCount === 0 && countSubstr(unquotedProposedStr, '}') > 0) {
                                const len = unquotedProposedStr.length;
                                const evalStr = unquotedProposedStr.replace(/^}+/, '');
                                unclosedBraceCount -= countSubstr(evalStr, '}');
                                if (unclosedBraceCount >= len - evalStr.length) {
                                    if (unclosedBraceCount !== 1 || openBraceCount !== 1) {
                                        nestedCloseCount += len - evalStr.length;
                                    }
                                }
                            }

                            let countOpen = countSubstr(unquotedProposedStr, '{') - countSubstr(unquotedProposedStr, '}');
                            let regex = /(@layer|@container|@media)[^{]*\{/g;
                            let matches = unquotedProposedStr.replace(/\s/g, '').match(regex);
                            const openLayerCount = matches ? matches.length : 0;
                            countOpen -= isNestedCount > 0 ? 0 : openLayerCount;
                            if (countOpen < 0) {
                                countOpen = 0;
                            }
                            isNestedCount += countOpen;
                        }
                    }

                    appendedIndex = startOpenBraceIndex;
                }

                checkAtStr = matches[i].substring(startOpenBraceIndex);
            }

            let indexOpenBrace = startOpenBraceIndex + seekToFirstUnquotedChar(matches[i], '{', startOpenBraceIndex).length - 1;

            if (indexOpenBrace === -1) {
                indexOpenBrace = startOpenBraceIndex;
            }

            let selectors = matches[i].substring(startOpenBraceIndex, indexOpenBrace);

            while ((selectors.split('"').length - 1) % 2 !== 0) {
                indexOpenBrace = indexOpenBrace + 1 + seekToFirstUnquotedChar(matches[i], '{', indexOpenBrace + 1).length;//matches[i].indexOf('{', indexOpenBrace + 1);
                selectors = matches[i].substring(startOpenBraceIndex, indexOpenBrace);
            }

            if (selectors !== '' && !/^\s*$/.test(selectors)) {
                const tokens = selectors.split(',');
                let token;

                if (customPropertyBraceCount > 0 && selectors.startsWith(',')) {
                    tokens.shift();
                    tokens[0] = ', ' + tokens[0];
                }

                for (let n = 0; n < tokens.length; ++n) {
                    token = tokens[n].trim();

                    while (customPropertyBraceCount > 0 && token.includes('}')) {
                        let prefix = '';
                        let openIndex;
                        let closeIndex;
                        while (token.includes('}')) {
                            openIndex = token.indexOf('{');
                            closeIndex = token.indexOf('}');

                            if (closeIndex < openIndex || openIndex === -1) {
                                prefix += token.substring(0, closeIndex + 1);
                                token = token.substring(closeIndex + 1);
                                customPropertyBraceCount--;
                            }
                        }
                        finalCss += prefix + '\n';
                        token = token.trim();
                        customPropertyToken = token;
                    }

                    if (customPropertyBraceCount === 0) {
                        while (token.startsWith('}')) {
                            token = token.substring(1).trim();
                            finalCss += '}';
                            unclosedBraceCount--;
                            firstTokenIsAt = false;

                            if (isNestedCount > 0) {
                                isNestedCount--;
                            }

                            if (isNestedCount === 0) {
                                isKeyframes = false;
                            }
                        }

                        if (token.includes(' ')) {
                            let firstToken = token.substring(0, token.indexOf(' '));
                            let afterFirstToken = token.substring(token.indexOf(' '));

                            if (n > 0) {
                                finalCss += ', ';
                            }

                            const firstTokenIsNest = firstToken.trim() === '@nest';

                            if (firstTokenIsNest && afterFirstToken.replace(/^\s+/g, '').includes(' ')) {
                                let afterLeftTrimmed = afterFirstToken.replace(/^\s+/g, '');
                                let before = afterLeftTrimmed.substring(0, afterLeftTrimmed.indexOf(' '));
                                afterLeftTrimmed = afterLeftTrimmed.substring(before.length, afterLeftTrimmed.length);

                                firstToken += ' ' + before;
                                afterFirstToken = afterLeftTrimmed;
                            }

                            firstTokenIsAt = firstToken.trim().startsWith('@');
                            firstTokenColonEnd = firstToken.trim().endsWith(':');

                            if (firstTokenColonEnd) {
                                let toSemi = seekToFirstUnquotedChar(afterFirstToken, ';');

                                while (seekToFirstUnquotedChar(afterFirstToken, ';', toSemi.length).trim().endsWith(';')) {
                                    toSemi = toSemi + seekToFirstUnquotedChar(afterFirstToken, ';', toSemi.length);
                                }

                                const after = afterFirstToken.substring(toSemi.length, afterFirstToken.length);
                                afterFirstToken = toSemi;
                                let proposedCss = matches[i].substring(indexOpenBrace);
                                indexOpenBrace = matches[i].length;

                                let insertCss = after + ' ';
                                const multipleTokens = tokens.length > 1;

                                for (let addIndex = n + 1; addIndex < tokens.length; ++addIndex) {
                                    insertCss += ', ' + tokens[addIndex] + ' ';
                                    tokens.splice(addIndex, 1);
                                    addIndex--;
                                }
                                insertCss += proposedCss;
                                matches.splice(i + 1, 0, insertCss);

                                if (firstToken.trim().endsWith(':') && isNestedCount > 0 && openBraceCount > 0 && multipleTokens) {
                                    unclosedBraceCount++;
                                    nestedCloseCount++;
                                }

                                let unquotedProposedStr = '';
                                match = null;

                                do {
                                    match = unquotedCssRegex.exec(matches[i + 1]);
                                    if (match != null) {
                                        if (!match[1]) {
                                            unquotedProposedStr += match[0];
                                        }
                                    }
                                } while (match != null);

                                let openCount = countSubstr(unquotedProposedStr, '{');
                                const closeCount = countSubstr(unquotedProposedStr, '}');

                                openCount -= closeCount;

                                if (openCount < 0) {
                                    openCount = 0;
                                }

                                unclosedBraceCount += openCount;
                                nestedInsertionCount += openCount;
                            }

                            if (!isNestedCount > 0 && !isKeyframes && (!isMedia || isNestedCount === 0) && (!firstTokenIsAt || firstToken.trim().startsWith('@nest')) && !firstTokenColonEnd) {
                                finalCss += firstToken + (isNestedCount === 0 ? '[' + identifier + ']' : '') + afterFirstToken;
                            } else {
                                finalCss += firstToken + afterFirstToken;
                            }
                        } else {
                            if (n > 0) {
                                finalCss += ', ';
                            }

                            if (!isNestedCount > 0 && !isKeyframes && (!isMedia || isNestedCount === 0) && !token.trim().startsWith('@') && !firstTokenIsAt && !token.trim().endsWith(':')) {
                                finalCss += token + (isNestedCount === 0 ? '[' + identifier + ']' : '');
                            } else {
                                finalCss += token;
                            }
                        }
                    }
                }
            }

            if (customPropertyBraceCount > 0) {
                if (customPropertyToken !== null) {
                    indexOpenBrace = matches[i].indexOf(customPropertyToken);
                } else {
                    indexOpenBrace = 0;
                }
            }

            if (matches[i].includes('--') && openBraceCount > 1) {
                let indexCustom = seekToFirstUnquotedChar(matches[i], '--', 0).length;
                const beginMatch = matches[i].substring(0, indexCustom);
                let unquotedBegin = '';

                do {
                    match = unquotedCssRegex.exec(beginMatch);
                    if (match != null) {
                        if (!match[1]) {
                            unquotedBegin += match[0];
                        }
                    }
                } while (match != null);

                const beginBraceCount = countSubstr(unquotedBegin, '{');
                const beginDiff = beginBraceCount - 1;
                nestedAdditionalBraces = openBraceCount - 1;
                if (beginDiff > 0) {
                    nestedAdditionalBraces -= beginDiff;
                }
                if (nestedAdditionalBraces > 0) {
                    customPropertyBraceCount += nestedAdditionalBraces;
                }
            }

            if (openBraceCount - customPropertyBraceCount > 1 && !isLayer) {
                const newMatch = matches[i].substring(indexOpenBrace + 1);
                matches[i] = matches[i].substring(0, matches[i].length - newMatch.length);
                matches.splice(i + 1, 0, newMatch);

                let unquotedProposedStr = '';
                match = null;

                do {
                    match = unquotedCssRegex.exec(newMatch);
                    if (match != null) {
                        if (!match[1]) {
                            unquotedProposedStr += match[0];
                        }
                    }
                } while (match != null);

                unclosedAdjustment = (countSubstr(unquotedProposedStr, '{') - countSubstr(unquotedProposedStr, '}'));

                customPropertyBraceCount -= nestedAdditionalBraces;
            }

            let proposedCss = matches[i].substring(indexOpenBrace);
            const withoutLeadingStructure = proposedCss.replace('{', '').replace(';', '');

            if (proposedCss.includes('{') && countSubstr(proposedCss, '{') > 1 && !withoutLeadingStructure.trim().startsWith('--')) {
                let before = seekToFirstUnquotedChar(proposedCss, '{', 0);
                before = before + ' ' + seekToFirstUnquotedChar(proposedCss, '{', before.length);
                let after = proposedCss.substring(before.length + 1, proposedCss.length);
                after = before.substring(before.lastIndexOf(';') + 1, before.length) + ' ' + after;
                before = before.substring(0, before.lastIndexOf(';') + 1);
                proposedCss = before;
                matches.splice(i + 1, 0, after);
                isNestedCount++;
                nestedInsertionCount++;
            }

            finalCss += proposedCss;

            let unquotedProposedStr = '';
            match = null;

            do {
                match = unquotedCssRegex.exec(proposedCss);
                if (match != null) {
                    if (!match[1]) {
                        unquotedProposedStr += match[0];
                    }
                }
            } while (match != null);

            unclosedAdjustment = (countSubstr(unquotedProposedStr, '{') - countSubstr(unquotedProposedStr, '}'));
            unclosedBraceCount += (unclosedAdjustment - nestedAdditionalBraces) >= 0 ? unclosedAdjustment - nestedAdditionalBraces : unclosedAdjustment;

            unclosedAdjustment -= customPropertyBraceCount;
            if (unclosedAdjustment < 0) {
                unclosedAdjustment = 0;
            }

            if (isNestedCount !== 0 || !isMedia) {
                nestedInsertionCount += unclosedAdjustment;
                isNestedCount += unclosedAdjustment;

                if (isNestedCount > 0) {
                    isNestedCount -= (1 - unclosedBraceCount - countSubstr(unquotedProposedStr, '{') + countSubstr(unquotedProposedStr, '}')) >= 0 ? 1 - unclosedBraceCount - countSubstr(unquotedProposedStr, '{') + countSubstr(unquotedProposedStr, '}') : 0;
                }
            }

            while (layerCount > 0) {
                finalCss += '}';
                layerCount--;
            }

            if (customPropertyBraceCount === 0) {
                finalCss += '\n';
            }
        }
    }

    isNestedCount -= nestedInsertionCount;
    while (isNestedCount > 0) {
        finalCss += '}';
        isNestedCount--;
    }
    unclosedBraceCount -= nestedCloseCount;
    while (unclosedBraceCount > 0) {
        finalCss += '}';
        unclosedBraceCount--;
    }
    finalCss += '\n';

    if (keyframeNameMap.size > 0) {
        let startIndex = 0;
        let scopedResult;

        scopedResult = updateScopedAnimationNames(finalCss, startIndex, keyframeNameMap, 'animation');
        finalCss = scopedResult.finalCss;
        startIndex = scopedResult.startIndex;

        startIndex = 0;

        scopedResult = updateScopedAnimationNames(finalCss, startIndex, keyframeNameMap, 'animation-name');
        finalCss = scopedResult.finalCss;
        startIndex = scopedResult.startIndex;
    }

    if (finalCss.trim() !== '') {
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('style');
        head.appendChild(style);
        style.appendChild(document.createTextNode(finalCss));
    }

    return identifier;
}

const updateScopedAnimationNames = (finalCss, startIndex, keyframeNameMap, propertyName) => {
    while ((startIndex = finalCss.indexOf(propertyName, startIndex)) !== -1) {
        const before = finalCss.substring(0, startIndex);
        let middle = finalCss.substring(startIndex, finalCss.indexOf(';', startIndex));
        const after = finalCss.substring(startIndex + middle.length, finalCss.length);

        if (middle.includes(':')) {
            const prefix = middle.substring(0, middle.indexOf(':') + 1).replace(propertyName, '').trim();

            if (prefix === ':') {
                for (const [key, value] of keyframeNameMap) {
                    let middleFormatted = middle.replace(propertyName, '');
                    middleFormatted = middleFormatted.trim();

                    if (middleFormatted.startsWith(':')) {
                        middleFormatted = middleFormatted.substring(1, middleFormatted.length);
                        middleFormatted = middleFormatted.trim();
                    }

                    const testRegex = new RegExp(key + '(\\s|;|$)');

                    if (testRegex.test(middleFormatted) && key.length > 0) {
                        middle = middle.replaceAll(key, value);
                        startIndex += middle.length;
                    } else {
                        startIndex += propertyName.length;
                    }
                }
                finalCss = before + middle + after;
            } else {
                startIndex += middle.length;
            }
        }
    }

    return { finalCss, startIndex };
}

export function hydrate(eleId, attachDetector = true) {
    const ele = document.getElementById(eleId);
    const ssrClass = ele.getAttribute('slssrclass');
    let viewClass = slContext[ssrClass];
    if (!viewClass && this) {
        viewClass = this[ssrClass];
    }
    const viewObj = new viewClass();
    return mount(eleId, viewObj, attachDetector);
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
    return markup(arguments[0], arguments[1]);
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

export function renderToString(component) {
    const destroyCompList = [];
    const originalForKeys = new Set();
    for (let key of s._structureForMap.keys()) {
        originalForKeys.add(key);
    }

    if (component.slOnInit) {
        component.slOnInit();
        destroyCompList.push(component);
    }
    let vNewApp = component.view.bind(component)();
    let lastComponent = component;
    while (vNewApp.view) {
        if (vNewApp.slOnInit) {
            vNewApp.slOnInit();
            destroyCompList.push(vNewApp);
        }
        lastComponent = vNewApp;
        vNewApp = vNewApp.view.bind(vNewApp)();
    }
    applyModelForStructuralDirectives(vNewApp, lastComponent);
    const compStr = renderAsString(vNewApp, destroyCompList);
    destroyCompList.forEach(comp => {
        if (comp.slOnDestroy) {
            comp.slOnDestroy.bind(comp)();
        }
    });

    for (let finalKey of s._structureForMap.keys()) {
        if (!originalForKeys.has(finalKey)) {
            s._structureForMap.delete(finalKey);
        }
    }

    return compStr;
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

    s._afterInitArr.forEach((afterInitFn) => {
        afterInitFn();
    });

    if (component.slStyle && !rootEl.slScopedCss) {
        const identifier = applyScopedCss(component, component.slStyle());
        applyScopedCssIdentifier(rootEl, identifier);
        rootEl.slScopedCss = true;
    }
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
    strategy: '#'
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

    if (timeDiff > 17) {
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