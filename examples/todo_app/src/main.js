import $ from 'jquery'
import UI from './todolist_ui'
import API from './todolist_api'
import Event from '../../../lib/event'



Event.listen('todolist', 'item added', UI.displayItem)
Event.listen('todolist', 'item added', UI.displayItemsCount)
Event.listen('todolist', 'item updated', UI.displayItem)
Event.listen('todolist', 'item updated', UI.displayItemsCount)
Event.listen('todolist', 'item removed', UI.displayItemsCount)
Event.listen('todolist', 'item removed', UI.removeItemElement)
Event.listen('todolist', 'filter selected', UI.markFilter)
Event.listen('todolist', 'filter selected', UI.displayItems)
Event.listen('todolist', 'completed cleared', UI.displayItems)



$('.new-todo').on('keydown', addItem)
$('.todo-list').on('click', 'li .toggle', toggleComplete)
$('.todo-list').on('dblclick', 'li label', editItem)
$('.todo-list').on('blur', 'li .edit', leaveEdition)
$('.todo-list').on('keydown', 'li .edit', handleEdition)
$('.todo-list').on('click', 'li .destroy', removeItem);
$('.filters li a').on('click', selectFilter)
$('.clear-completed').on('click', API.clearCompleted)



function addItem (e) {
    if (e.keyCode === 13) {
        API.addItem({
            title: $(this).val(),
            completed: false
        })
        $(this).val('')
    }
}



function toggleComplete () {
    API.updateItem(getBoundItem(this), {
        completed: $(this).is(':checked')
    })
}



function editItem () {
    UI.displayItemEditor(getBoundItem(this))
}



function leaveEdition () {
    API.updateItem(getBoundItem(this), {
        title: $(this).val()
    })
}



function handleEdition (e) {
    const item = getBoundItem(this)

    if (e.keyCode === 13) {
        API.updateItem(item, {
            title: $(this).val()
        })
    }

    if (e.keyCode === 27) {
        UI.displayItem(item)
    }
}



function removeItem () {
    API.removeItem(getBoundItem(this))
}



function selectFilter () {
    UI.selectFilter(UI.getFilter($(this).attr('href')))
}



function getBoundItem (element) {
    return API.getItem($(element).parents('li').data('id'))
}
