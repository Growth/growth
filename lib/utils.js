function deferredApply (callback, context, ...args) {
    defer(() => callback.apply(context, ...args))
}



function deferredCall (callback, context, ...args) {
    defer(() => callback.call(context, ...args))
}



function defer (callback) {
    setTimeout(callback)
}



function wrap (wrapped, wrapper) {
    return function (...args) {
        args = wrapper(...args)
        return wrapped(...args)
    }
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



export {
    deferredApply,
    deferredCall,
    defer,
    wrap,
    checkType,
    isString,
    addNamespace
}
