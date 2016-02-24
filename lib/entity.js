import Event from './event'
import Component from './component'
import {isString, stringToArray} from './utils'



const hasComponent = Component.hasComponent
const getComponentsList = Component.getComponentsList



function addComponent (entity, names) {
    names = isString(names) ? stringToArray(names) : names
    for (let name of names) {
        Component.addEntity(entity, name)
    }
}



function removeComponent (entity, names) {
    names = isString(names) ? stringToArray(names) : names
    for (let name of names) {
        Component.removeEntity(entity, name)
    }
}



function create (componentNames, initialize = function () {}) {
    const entity = {}

    if (componentNames) {
        addComponent(entity, componentNames)
    }

    initialize(entity)

    return entity
}



function destroy (entity) {
    Component.clearEntity(entity)
    Event.emit(entity, 'destroyed')
}



export default {
    create,
    destroy,
    addComponent,
    removeComponent,
    getComponentsList,
    hasComponent
}
