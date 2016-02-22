import {
    isString,
    addNamespace,
    wrapFunction
} from './utils'



const tags = new Map()



function create (name) {
    if (!isExists(name)) {
        const tag = new Set()
        tags.set(name, tag)
        return tag
    }
}



function isExists (name) {
    return tags.has(name)
}



function get (name) {
    return isString(name) ? (tags.get(name) || create(name)) : name
}



function add (item, name) {
    get(name).add(item)
}



function remove (item, name) {
    get(name).delete(item)
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
        Namespace[fn] = wrapFunction(Tag[fn], fwdNamespace(identifier))
    }

    return Namespace
}



function fwdNamespace (namespace) {
    return (item, name) => {
        return [
            name ? item : addNamespace(item, namespace),
            name ? addNamespace(name, namespace) : name
        ]
    }
}



const Tag = {
    create,
    get,
    add,
    remove,
    has,
    clear,
    destroy,
    isExists,
    namespace
}



export default Tag
