'use strict'

import utils from './utils'



const tags = new Map()



function createTag (name) {
    if (!tagExists(name)) {
        const tag = new Set()
        restoreTag(name, tag)
        return tag
    }
}



function restoreTag (name, tag) {
    tags.set(name, tag)
}



function tagExists (name) {
    return tags.has(name)
}



function getTag (name) {
    return utils.isString(name) ? findOrCreate(name) : name
}



function findOrCreate (name) {
    return tagExists(name) ? tags.get(name) : createTag(name)
}



function tag (item, ...names) {
    for (let name of names) {
        getTag(name).add(item)
    }
}



function untag (item, ...names) {
    for (let name of names) {
        getTag(name).delete(item)
    }
}



function hasTag (item, name) {
    return getTag(name).has(item)
}



function clearTag (name) {
    getTag(name).clear()
}



function destroyTag (name) {
    tags.delete(name)
}



export default {
    createTag,
    getTag,
    tag,
    untag,
    hasTag,
    clearTag,
    restoreTag,
    destroyTag,
    tagExists
}
