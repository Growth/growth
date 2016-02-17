import {isString, addNamespace, wrap} from './utils'

const tags = new Map()



function createTag (name) {
    let tag = false
    if (!checkTag(name)) {
        tag = new Set()
        tags.set(name, tag)
    }

    return tag
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



function proxify (fn, namespace) {
    return wrap(fn, function (name) {
        return [addNamespace(name, namespace)]
    })
}



function tagGetter (namespace) {
    return proxify(getTag, namespace)
}



function tagChecker (namespace) {
    return proxify(checkTag, namespace)
}



function tagCreator (namespace) {
    return proxify(createTag, namespace)
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
