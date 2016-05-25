'use strict'

const dataMap = new Map
const linkMap = new Map



function attach (...items) {
    attachDeep(items, 0, dataMap)
}



function attachDeep (items, index, link) {
    const item = items[index]

    if (!link.has(item)) {
        link.set(item, new Map)
    }

    if (index === items.length - 1) {
        linkMap.set(link, item)
    } else {
        attachDeep(items, index + 1, link.get(item))
    }
}



function fetch (...items) {
    return getDeep(items, 0, dataMap)
}



function fetchDeep (items, index, parent) {
    const item = items[index]
    const link = parent.get(item)

    if (index === items.length - 1) {
        return linkMap.get(link)
    } else {
        return getDeep(items, index + 1, link)
    }
}



function detach (...items) {
    items.pop()
    items.push(undefined)
    set(...items)
}



export default {
    attach,
    fetch,
    detach
}
