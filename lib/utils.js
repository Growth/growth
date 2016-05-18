'use strict'

// Time

function delayedApply (callback, context, ...args) {
    delay(() => callback.apply(context, ...args))
}



function delayedCall (callback, context, ...args) {
    delay(() => callback.call(context, ...args))
}



function delay (callback) {
    setTimeout(callback)
}




// Function

function wrapFunction (wrapped, wrapper) {
    return (...args) => wrapped.apply(wrapped, wrapper(...args))
}




// Type

function checkType (object, type) {
    return typeof object === type
}



function isString (object) {
    return checkType(object, 'string')
}



function isFunction (object) {
    return checkType(object, 'function')
}



function isUndefined (object) {
    return checkType(object, 'undefined')
}




// String

function addNamespace (identifier, namespace) {
    return isString(identifier) ? `${namespace}.${identifier}` : identifier
}



function stringToArray (string, separator = ',') {
    return string.split(separator).map((str) => str.trim())
}




// Array


function remove (array, item) {
    const index = array.indexOf(item)
    if(index !== -1) {
        array.splice(index, 1)
    }
}



function flatten (array) {
    return [].concat(array)
}



export {
    delayedApply,
    delayedCall,
    delay,
    wrapFunction,
    checkType,
    isString,
    isFunction,
    isUndefined,
    addNamespace,
    stringToArray,
    remove,
    flatten
}
