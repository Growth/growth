// Time

function delayApply (callback, context, ...args) {
    delay(() => callback.apply(context, ...args))
}



function delayCall (callback, context, ...args) {
    delay(() => callback.call(context, ...args))
}



function delay (callback) {
    setTimeout(callback)
}




// Function

function wrap (wrapped, wrapper) {
    return (...args) => {
        return wrapped.apply(wrapped, wrapper(...args))
    }
}




// Type

function check (object, type) {
    return typeof object === type
}



function isString (object) {
    return check(object, 'string')
}



function isFunction (object) {
    return check(object, 'function')
}



function isUndefined (object) {
    return check(object, 'undefined')
}



function validatePresence (params, ...keys) {
    return keys.every(key => key in params)
}



// Array

function remove (array, item) {
    const index = array.indexOf(item)
    if(index !== -1) {
        array.splice(index, 1)
    }
}




// Task

function spawnTask (generator) {
    const task = generator((...args) => task.next(...args))
    task.next()

    return task
}



export default {
    delayApply,
    delayCall,
    delay,
    wrap,
    check,
    isString,
    isFunction,
    isUndefined,
    validatePresence,
    remove,
    spawnTask
}
