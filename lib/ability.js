'use strict'

import Event from './event'
import Tag from './tag'


const Ability = Tag.namespace('Ability')
const entities = new WeakMap()
const get = Ability.get



function register (name, setup) {
    const ability = Ability.create(name)

    if (!ability) {
        throw new Error(`Ability ${name} already exists`)
    }

    setup(ability)

    return ability
}



function getAbilities (entity) {
    let list = entities.get(entity)

    if (!list) {
        list = new Set
        entities.set(entity, list)
    }

    return list
}



function add (entity, name) {
    const ability = Ability.get(name)

    if (!Ability.has(entity, ability)) {
        Ability.set(entity, ability)
        track(entity, name)
        Event.emit(ability, 'entity added', entity)
    }
}



function remove (entity, name) {
    const ability = Ability.get(name)

    if (Ability.has(entity, ability)) {
        Ability.unset(entity, ability)
        untrack(entity, name)
        Event.emit(ability, 'entity removed', entity)
    }
}



function has (entity, name) {
    return getAbilities(entity).has(name)
}



function track (entity, name) {
    getAbilities(entity).add(name)
}



function untrack (entity, name) {
    getAbilities(entity).delete(name)
}



function clear (entity) {
    for (let name of getAbilities(entity)) {
        remove(entity, name)
    }
}



export default {
    get,
    getAbilities,
    register,
    add,
    remove,
    clear,
    has
}
