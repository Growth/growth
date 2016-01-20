const listenersBoxes = new WeakMap()
const globalListenersBoxes = {}



function on (object, identifier, listener) {
    listenersFor(object, identifier).push(listener)
}



function off (object, identifier, listener) {
    let listeners = listenersFor(object, identifier)
    let index = listeners.indexOf(listener)
    if(index !== -1) {
        listeners.splice(index, 1)
    }
}



function emit (emitter, identifier, ...args) {
    let listeners = listenersFor(emitter, identifier)

    for (let listener of listeners) {
        listener.apply(emitter, args)
    }
}



function dispatchEvent (emitters, identifier, ...args) {
    for (let emitter of emitters) {
        emit(emitter, identifier, ...args)
    }
}



function getListenersBox (emitter) {
    if (typeof emitter === 'string') {
        globalListenersBoxes[emitter] = globalListenersBoxes[emitter] || Symbol()
        object = namespaces[emitter]
    }

    if (!listenersBoxes.has(emitter)) {
        listenersBoxes.set(emitter, {})
    }

    return listenersBoxes.get(emitter)
}



function listenersFor (object, identifier) {
    let listenerBox = getListenersBox(object)
    listenerBox[identifier] = listenerBox[identifier] || []

    return listenerBox[identifier]
}



export {on, off, emit, dispatch}
