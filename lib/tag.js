import {
    isString,
    addNamespace,
    wrapFunction
} from './utils'

const tags = new Map()



function createTag (name) {
    if (!checkTag(name)) {
        const tag = new Set()
        tags.set(name, tag)
        return tag
    }
}



function checkTag (name) {
    return tags.has(name)
}



function getTag (name) {
    return isString(name) ? (tags.get(name) || createTag(name)) : name
}



function tag (item, name) {
    getTag(name).add(item)
}



function untag (item, name) {
    getTag(name).delete(item)
}



function hasTag (item, name) {
    return getTag(name).has(item)
}



function clearTag (name) {
    getTag(name).clear()
}



function deleteTag (name) {
    tags.delete(name)
}



function getNamespacedProxy (fn, namespace) {
    return wrapFunction(fn, (name) => [addNamespace(name, namespace)])
}



function tagGetter (namespace) {
    return getNamespacedProxy(getTag, namespace)
}



function tagChecker (namespace) {
    return getNamespacedProxy(checkTag, namespace)
}



function tagCreator (namespace) {
    return getNamespacedProxy(createTag, namespace)
}



export {
    createTag,
    checkTag,
    getTag,
    tag,
    untag,
    hasTag,
    clearTag,
    deleteTag,
    tagGetter,
    tagChecker,
    tagCreator
}
