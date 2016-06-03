import $ from 'jquery'
import Tag from '../../../lib/tag'
import Event from '../../../lib/event'



const itemTemplate = `
    <li data-id="{{id}}" class="{{completed}}">
        <div class="view">
            <input class="toggle" type="checkbox" {{checked}}>
            <label>{{title}}</label>
            <button class="destroy"></button>
        </div>
    </li>
`



const itemsMap = new Map()
const todolist = Tag.create('todolist')
const completed = Tag.create('completed')
const active = Tag.create('active')



let uid = 0
let currentView = 'todolist'


$('.new-todo').on('keydown', function (e) {
    if (e.keyCode === 13) {
        addItem({
            id: uid += 1,
            title: $(this).val(),
            completed: false
        })
        $(this).val('')
    }
})



$('.todo-list').on('click', 'li .toggle', function () {
    const item = getItem($(this).parents('li').data('id'))
    updateItem(item, {
        completed: $(this).is(':checked')
    })
})



$('.todo-list').on('dblclick', 'li label', function () {
    displayItemEditor(getItem($(this).parents('li').data('id')))
})



$('.todo-list').on('blur', 'li .edit', function () {
    const item = getItem($(this).parents('li').data('id'))
    updateItem(item, {
        title: $(this).val()
    })
})



$('.todo-list').on('keydown', 'li .edit', function (e) {
    const item = getItem($(this).parents('li').data('id'))
    if (e.keyCode === 13) {
        updateItem(item, {
            title: $(this).val()
        })
    }

    if (e.keyCode === 27) {
        displayItem(item)
    }
})



$('.todo-list').on('click', 'li .destroy', function () {
    removeItem(getItem($(this).parents('li').data('id')))
});



$('.filters li a').on('click', function () {
    selectFilter(getFilter($(this).attr('href')))
})



$('.clear-completed').on('click', clearCompleted)


Event.listen(todolist, 'item added', displayItem)
Event.listen(todolist, 'item added', displayItemsCount)
Event.listen(todolist, 'item added', updateStorage)

Event.listen(todolist, 'item updated', displayItem)
Event.listen(todolist, 'item updated', updateStorage)

Event.listen(todolist, 'item removed', displayItemsCount)
Event.listen(todolist, 'item removed', updateStorage)
Event.listen(todolist, 'item removed', removeItemElement)

Event.listen(todolist, 'filter selected', markFilter)
Event.listen(todolist, 'filter selected', displayItems)

Event.listen(todolist, 'completed cleared', displayItems)
Event.listen(todolist, 'completed cleared', updateStorage)


function addItem (item) {
    itemsMap.set(item.id, item)
    Tag.set(item, todolist)
    Tag.set(item, active)
    Event.emit(todolist, 'item added', item)
}



function renderItem (item) {
    const completed = item.completed ? 'completed': ''
    const checked = item.completed ? 'checked': ''

    return itemTemplate.replace('{{id}}', item.id)
        .replace('{{title}}', escape(item.title))
        .replace('{{completed}}', completed)
        .replace('{{checked}}', checked)
}



function updateItem (item, data) {
    Object.assign(item, data)
    Tag.toggle(item, completed, item.completed)
    Tag.toggle(item, active, !item.completed)
    Event.emit(todolist, 'item updated', item)
}



function displayItem (item) {
    const $item = getItemElement(item)
    const template = renderItem(item)

    if (!Tag.has(item, currentView)) {
        $item.remove()
    } else if ($item) {
        $item.replaceWith(template)
    } else {
        $('.todo-list').prepend(template)
    }
}



function displayItemEditor (item) {
    const $item = getItemElement(item)
    $item.addClass('editing')
    const $input = $('<input class="edit">')
    $item.append($input)
    $input.focus()
    $input.val(item.title)
}



function displayItems () {
    $('.todo-list').html('')
    for (let item of Tag.get(currentView)) {
        displayItem(item)
    }
}



function removeItemElement (item) {
    getItemElement(item).remove()
}



function displayItemsCount () {
    const size = Tag.get(currentView).size
    const text = `${size} ${pluralize('item', size)} left`
    $('.todo-count').text(text)
}



function pluralize (word, size) {
    return word + (size > 1 ? 's' : '')
}



function getItem (id) {
    return itemsMap.get(id)
}



function removeItem (item) {
    itemsMap.delete(item.id)
    Tag.unset(item, 'todolist', 'completed', 'active')
    Event.emit(todolist, 'item removed', item)
}



function clearCompleted () {
    for (let item of completed) {
        removeItem(item)
    }

    Event.emit(todolist, 'completed cleared')
}



function getItemElement(item) {
    const $item = $(`.todo-list [data-id=${item.id}]`)
    return $item.length ? $item : false
}



function getFilter (anchor) {
    const filter = anchor.replace('#/', '')
    return filter === '' ? 'todolist' : filter
}



function getAnchor (filter) {
    const anchor = '#/'
    return filter === 'todolist' ? anchor : `${anchor}${filter}`
}



function selectFilter (filter) {
    currentView = filter
    Event.emit(todolist, 'filter selected', filter)
}



function markFilter (filter) {
    $('.filters li a').removeClass('selected')
    $(`.filters li a[href="${getAnchor(filter)}"]`).addClass('selected')
}



function initStorage () {
    if (!localStorage.todolist) {
        updateStorage()
    }
}



function getStorage () {
    initStorage()
    return new Set(JSON.parse(localStorage.todolist))
}



function updateStorage () {
    localStorage.todolist = JSON.stringify(todolist);
}
