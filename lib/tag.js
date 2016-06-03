'use strict'

import {
    isString,
    addNamespace,
    wrap
} from './utils'


const tags = new Map()
const Tag = {
    create,
    get,
    set,
    unset,
    toggle,
    has,
    clear,
    reset,
    destroy,
    exists,
    namespace
}



function create (name) {
    if (!exists(name)) {
        const tag = new Set()
        reset(name, tag)
        return tag
    }
}



function reset (name, tag) {
    tags.set(name, tag)
}



function exists (name) {
    return tags.has(name)
}



function get (name) {
    return isString(name) ? findOrCreate(name) : name
}



function findOrCreate (name) {
    return exists(name) ? tags.get(name) : create(name)
}



function set (item, ...names) {
    for (let name of names) {
        get(name).add(item)
    }
}



function unset (item, ...names) {
    for (let name of names) {
        get(name).delete(item)
    }
}



function toggle (item, name, force) {
    if (!force || has(item, name)) {
        unset(item, name)
    } else {
        set(item, name)
    }
}



function has (item, name) {
    return get(name).has(item)
}



function clear (name) {
    get(name).clear()
}



function destroy (name) {
    tags.delete(name)
}



function namespace (identifier) {
    const Namespace = {}

    for (let fn in Tag) {
        Namespace[fn] = wrap(Tag[fn], handleNamespace(identifier))
    }

    return Namespace
}



function handleNamespace (namespace) {
    return (item, name) => {
        return [
            name ? item : addNamespace(item, namespace),
            name ? addNamespace(name, namespace) : name
        ]
    }
}



export default Tag
