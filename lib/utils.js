function deferredApply (callback, context, ...args) {
    defer(function () {
        callback.apply(context, ...args)
    })
}



function deferredCall (callback, context, ...args) {
    defer(function () {
        callback.call(context, ...args)
    })
}



function defer (callback) {
    setTimeout(callback, 0)
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
