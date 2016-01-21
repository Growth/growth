const tagsMap = new Map()



function tag (item, tagName) {
    getTag(tagName).add(item)
}



function untag (item, tagName) {
    getTag(tagName).delete(item)
}



function hasTag (item, tagName) {
    return getTag(tagName).has(tagName)
}



function findByTag (tagName) {
    return getTag(tagName).entries()
}



function eachItemTagged (tagName, iterator) {
    for (let item of getTag(tagName)) {
        iterator(item)
    }
}



function getTag (tagName) {
    if (!tagsMap.has(tagName)) {
        tagsMap.set(tagName, new Set())
    }

    return tagsMap.get(tagName)
}



export {
    tag,
    untag,
    hasTag,
    findByTag,
    eachByTag,
    eachItemTagged
}
