'use strict'

import Event from './event'
import Tag from './tag'


const ComponentTag = Tag.namespace('Component')
const get = ComponentTag.get
const entities = new WeakMap()



function register (componentName, setup) {
    const component = ComponentTag.create(componentName)

    if (!component) {
        throw new Error(`Component ${componentName} already exists`)
    }

    setup(component)

    return component
}



function addEntity (entity, componentName) {
    const component = ComponentTag.get(componentName)

    if (!ComponentTag.has(entity, component)) {
        ComponentTag.set(entity, component)
        addToComponents(entity, componentName)
        Event.emit(component, 'entity added', entity)
    }
}



function removeEntity (entity, componentName) {
    const component = ComponentTag.get(componentName)

    if (ComponentTag.has(entity, component)) {
        ComponentTag.unset(entity, component)
        removeFromComponents(entity, componentName)
        Event.emit(component, 'entity removed', entity)
    }
}



function getComponentsList (entity) {
    let list = entities.get(entity)
    if (!list) {
        list = new Set
        entities.set(entity, list)
    }

    return list
}



function hasComponent (entity, componentName) {
    return getComponentsList(entity).has(componentName)
}



function addToComponents (entity, componentName) {
    getComponentsList(entity).add(componentName)
}



function removeFromComponents (entity, componentName) {
    getComponentsList(entity).delete(componentName)
}



function clearEntity (entity) {
    for (let componentName of getComponentsList(entity)) {
        removeEntity(entity, componentName)
    }
}



export default {
    get, getEntities: get,
    register,
    addEntity,
    removeEntity,
    getComponentsList,
    hasComponent,
    clearEntity
}
