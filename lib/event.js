'use strict'

import {remove} from './utils'



const listenersRegisters = new WeakMap()
const globalEmitters = {}



function listen (emitter, eventName, listener) {
    const listeners = listenersFor(emitter, eventName)
    if (listeners.indexOf(listener) === -1) {
        listenersFor(emitter, eventName).push(listener)
    }
}



function emit (emitter, eventName, ...args) {
    const listeners = listenersFor(emitter, eventName)

    for (let listener of listeners) {
        listener.apply(emitter, args)
    }
}



function dispatch (emitters, eventName, ...args) {
    for (let emitter of emitters) {
        emit(emitter, eventName, ...args)
    }
}



function forwardTo (emitter, eventName) {
    return (...args) => emit(emitter, eventName, ...args)
}



function removeListener (emitter, eventName, listener) {
    remove(listenersFor(emitter, eventName), listener)
}



function clearEmitter (emitter) {
    const listenersBox = getListenersRegister(emitter)
    for (let eventName in listenersBox) {
        delete listenersBox[eventName]
    }
}



function clearListeners (emitter, eventName) {
    listenersFor(emitter, eventName).length = 0
}



function getListenersRegister (emitter) {
    emitter = getGlobalEmitter(emitter)

    if (!listenersRegisters.has(emitter)) {
        listenersRegisters.set(emitter, {})
    }

    return listenersRegisters.get(emitter)
}



function getGlobalEmitter (emitter) {
    if (typeof emitter === 'string') {
        globalEmitters[emitter] = globalEmitters[emitter] || {}
        emitter = globalEmitters[emitter]
    }

    return emitter
}



function listenersFor (emitter, eventName) {
    const listenersRegister = getListenersRegister(emitter)
    listenersRegister[eventName] = listenersRegister[eventName] || []

    return listenersRegister[eventName]
}



export default {
    listen,
    emit,
    dispatch,
    forwardTo,
    removeListener,
    clearListeners,
    clearEmitter
}
