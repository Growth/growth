const dataMap = new Map
const linkMap = new Map



function set (...items) {
    setDeepData(items, 0, dataMap);
}



function setDeepData (items, index, link) {
    const item = items[index]

    if (!link.has(item)) {
        link.set(item, new Map)
    }

    if (index === items.length - 1) {
        linkMap.set(link, item);
    } else {
        setDeepData(items, index + 1, link.get(item))
    }
}



function get (...items) {
    return getDeepLink(items, 0, dataMap)
}



function getDeepLink (items, index, parent) {
    const item = items[index]
    const link = parent.get(item)

    if (index === items.length - 1) {
        return linkMap.get(link)
    } else {
        return getDeepLink(items, index + 1, link)
    }
}



function unset () {

}



export default {
    set,
    get,
    unset
}
