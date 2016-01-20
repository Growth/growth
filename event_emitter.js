const listenersBoxes = new WeakMap()
const globalListenersBoxes = {}



function addListener (emitter, eventName, listener) {
    listenersFor(emitter, eventName).push(listener)
}



function removeListener (emitter, eventName, listener) {
    const listeners = listenersFor(emitter, eventName)

    const index = listeners.indexOf(listener)
    if(index !== -1) {
        listeners.splice(index, 1)
    }
}



function emitEvent (emitter, eventName, ...args) {
    const listeners = listenersFor(emitter, eventName)

    for (let listener of listeners) {
        listener.apply(emitter, args)
    }
}



function dispatchEvent (emitters, eventName, ...args) {
    for (let emitter of emitters) {
        emitEvent(emitter, eventName, ...args)
    }
}



function clearEmitter (emitter) {
    const listenersBox = getListenersBox(emitter)
    for (let eventName in listenersBox) {
        delete listenersBox[eventName]
    }
}



function clearListeners (emitter, eventName) {
    listenersFor(emitter, eventName).length = 0
}



function getListenersBox (emitter) {
    if (typeof emitter === 'string') {
        globalListenersBoxes[emitter] = globalListenersBoxes[emitter] || Symbol()
        emitter = globalListenersBoxes[emitter]
    }

    if (!listenersBoxes.has(emitter)) {
        listenersBoxes.set(emitter, {})
    }

    return listenersBoxes.get(emitter)
}



function listenersFor (emitter, eventName) {
    const listenerBox = getListenersBox(emitter)
    listenerBox[eventName] = listenerBox[eventName] || []

    return listenerBox[eventName]
}



function forwardToEmit (emitter, eventName) {
    return (...args) => emitEvent(emitter, eventName, ...args)
}



export {
    addListener,
    emitEvent,
    dispatchEvent,
    forwardToEmit,
    removeListener,
    clearListeners,
    clearEmitter
}
