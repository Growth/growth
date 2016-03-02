'use strict'

// Time

function deferredApply (callback, context, ...args) {
    defer(() => callback.apply(context, ...args))
}



function deferredCall (callback, context, ...args) {
    defer(() => callback.call(context, ...args))
}



function defer (callback) {
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
    isFunction,
    isUndefined,
    addNamespace,
    stringToArray,
    flatten
}
