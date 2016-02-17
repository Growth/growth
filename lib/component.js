import {emitEvent} from './event'
import {tagGetter, tagChecker, tagCreator} from './tag'


const NAMESPACE = 'component'

const getComponent = tagGetter(NAMESPACE)
const checkComponent = tagChecker(NAMESPACE)
const createComponent = tagCreator(NAMESPACE)



function registerComponent (componentName, setup) {
    const component = createComponent(componentName)

    if (!component) {
        throw new Error(`Component ${componentName} already exists`)
    }

    setup(component)

    return component
}



function bindComponent (entity, componentName) {
    const component = getComponent(componentName)

    if (!hasTag(entity, component)) {
        tag(entity, component)
        emitEvent(component, 'entity added', entity)
        emitEvent(entity, 'component bound', component)
    }
}



function unbindComponent (entity, componentName) {
    const component = getComponent(componentName)
    if (hasTag(entity, component)) {
        untag(entity, component)
        emitEvent(component, 'entity removed', entity)
        emitEvent(entity, 'component unbound', component)
    }
}



export {
    registerComponent,
    bindComponent,
    unbindComponent
}
