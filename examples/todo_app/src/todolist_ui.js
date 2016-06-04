import $ from 'jquery'
import Tag from '../../../lib/tag'
import Event from '../../../lib/event'


let currentView = 'todolist'


const itemTemplate = `
    <li data-id="{{id}}" class="{{completed}}">
        <div class="view">
            <input class="toggle" type="checkbox" {{checked}}>
            <label>{{title}}</label>
            <button class="destroy"></button>
        </div>
    </li>
`



function renderItem (item) {
    const isCompleted = Tag.has(item, 'completed')
    const completed = isCompleted ? 'completed': ''
    const checked = isCompleted ? 'checked': ''

    return itemTemplate.replace('{{id}}', item.id)
        .replace('{{title}}', escape(item.title))
        .replace('{{completed}}', completed)
        .replace('{{checked}}', checked)
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
    Event.emit('todolist', 'filter selected', filter)
}



function markFilter (filter) {
    $('.filters li a').removeClass('selected')
    $(`.filters li a[href="${getAnchor(filter)}"]`).addClass('selected')
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



export default {
    getFilter,
    selectFilter,
    displayItem,
    displayItems,
    displayItemsCount,
    displayItemEditor,
    removeItemElement,
    markFilter
}
