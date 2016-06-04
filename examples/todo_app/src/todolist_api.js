import Tag from '../../../lib/tag'
import Event from '../../../lib/event'


const itemsMap = new Map()
let uid = 0



function addItem (item) {
    item.id = uid += 1
    itemsMap.set(item.id, item)
    Tag.set(item, 'todolist')
    Tag.set(item, 'active')
    Event.emit('todolist', 'item added', item)
}



function updateItem (item, data) {
    item.title = data.title || item.title
    Tag.toggle(item, 'completed', data.completed)
    Tag.toggle(item, 'active', !data.completed)
    Event.emit('todolist', 'item updated', item)
}



function getItem (id) {
    return itemsMap.get(id)
}



function removeItem (item) {
    itemsMap.delete(item.id)
    Tag.unset(item, 'todolist', 'completed', 'active')
    Event.emit('todolist', 'item removed', item)
}



function clearCompleted () {
    for (let item of Tag.get('completed')) {
        removeItem(item)
    }

    Event.emit('todolist', 'completed cleared')
}



export default {
    addItem,
    updateItem,
    getItem,
    removeItem,
    clearCompleted
}
