import {isString} from './utils'

const tagsMap = new Map()



function tag (item, tagName) {
    getTag(tagName).add(item)
}



function untag (item, tagName) {
    getTag(tagName).delete(item)
}



function hasTag (item, tagName) {
    return getTag(tagName).has(item)
}



function clearTag (tagName) {
    getTag(tagName).clear()
}



function deleteTag (tagName) {
    tagsMap.delete(tagName)
}



function findByTag (tagName) {
    return getTag(tagName)
}



function getTag (tagName) {
    let tag = tagName

    if (isString(tagName)) {
        if (!tagsMap.has(tagName)) {
            tag = new Set()
            tagsMap.set(tagName, tag)
        } else {
            tag = tagsMap.get(tagName)
        }
    }

    return tag
}



export {
    tag,
    untag,
    hasTag,
    findByTag,
    clearTag,
    deleteTag
}
