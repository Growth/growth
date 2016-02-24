import Event from './event'
import Tag from './tag'



const ComponentTag = Tag.namespace('Component')
const get = ComponentTag.get
const entitiesComponents = new WeakMap()



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
        ComponentTag.tag(entity, component)
        addToComponentsList(entity, componentName)
        Event.emit(component, 'entity added', entity)
    }
}



function removeEntity (entity, componentName) {
    const component = ComponentTag.get(componentName)

    if (ComponentTag.has(entity, component)) {
        ComponentTag.untag(entity, component)
        removeFromComponentsList(entity, componentName)
        Event.emit(component, 'entity removed', entity)
    }
}



function getComponentsList (entity) {
    let list = entitiesComponents.get(entity)
    if (!list) {
        list = new Set
        entitiesComponents.set(entity, list)
    }

    return list
}



function hasComponent (entity, componentName) {
    return getComponentsList(entity).has(componentName)
}



function addToComponentsList (entity, componentName) {
    getComponentsList(entity).add(componentName)
}



function removeFromComponentsList (entity, componentName) {
    getComponentsList(entity).delete(componentName)
}



function clearEntity (entity) {
    for (var componentName of getComponentsList(entity)) {
        removeEntity(entity, componentName)
    }
}



export default {
    get, getComponent: get, getEntities: get,
    register, registerComponent: register,
    addEntity, bindEntity: addEntity,
    removeEntity, unbindEntity: removeEntity,
    getComponentsList,
    hasComponent,
    clearEntity
}
