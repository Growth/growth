const tagsMap = new Map()



function tag (item, ...tagNames) {
    for (let tagName of tagNames) {
        getTag(tagName).add(item)
    }
}



function untag (item, ...tagNames) {
    for (let tagName of tagNames) {
        getTag(tagName).delete(item)
    }
}



function hasTag (item, tagName) {
    return getTag(tagName).has(item)
}



function findByTag (tagName) {
    return getTag(tagName)
}



function eachByTag (tagName, iterator) {
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
    eachByTag
}
