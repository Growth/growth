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



export {
    deferredApply,
    deferredCall,
    defer
}
