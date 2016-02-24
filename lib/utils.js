function deferredApply (callback, context, ...args) {
    defer(() => callback.apply(context, ...args))
}



function deferredCall (callback, context, ...args) {
    defer(() => callback.call(context, ...args))
}



function defer (callback) {
    setTimeout(callback)
}



function wrapFunction (wrapped, wrapper) {
    return (...args) => wrapped.apply(wrapped, wrapper(...args))
}



function checkType (object, type) {
    return typeof object === type
}



function isString (object) {
    return checkType(object, 'string')
}



function addNamespace (identifier, namespace) {
    return isString(identifier) ? `${namespace}.${identifier}` : identifier
}



function flatten (array) {
    return [].concat(array)
}



export {
    deferredApply,
    deferredCall,
    defer,
    wrapFunction,
    checkType,
    isString,
    addNamespace,
    flatten
}
