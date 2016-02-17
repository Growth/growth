function deferredApply (callback, context, ...args) {
    defer(() => callback.apply(context, ...args))
}



function deferredCall (callback, context, ...args) {
    defer(() => callback.call(context, ...args))
}



function defer (callback) {
    setTimeout(callback)
}



function checkType (object, type) {
    return typeof object === type
}



function isString (object) {
    return checkType(object, 'string')
}



export {
    deferredApply,
    deferredCall,
    defer,
    checkType,
    isString
}
