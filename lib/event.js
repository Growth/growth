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
    const listeners = listenersFor(emitter, eventName)

    const index = listeners.indexOf(listener)
    if(index !== -1) {
        listeners.splice(index, 1)
    }
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
    if (typeof emitter === 'string') {
        globalEmitters[emitter] = globalEmitters[emitter] || {}
        emitter = globalEmitters[emitter]
    }

    if (!listenersRegisters.has(emitter)) {
        listenersRegisters.set(emitter, {})
    }

    return listenersRegisters.get(emitter)
}



function listenersFor (emitter, eventName) {
    const listenersRegister = getListenersRegister(emitter)
    listenersRegister[eventName] = listenersRegister[eventName] || []

    return listenersRegister[eventName]
}



export default {
    listen, on: listen, addListener: listen, addEventListener: listen,
    emit, trigger: emit,
    dispatch, dispatchEvent: dispatch,
    forwardTo,
    removeListener, stopListen: removeListener, removeEventListener: removeListener,
    clearListeners,
    clearEmitter
}
