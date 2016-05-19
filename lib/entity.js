'use strict'

import Event from './event'
import Ability from './ability'
import {isString, stringToArray} from './utils'


const hasAbility = Ability.has
const getAbilities = Ability.getAbilities



function addAbility (entity, names) {
    for (let name of formatNames(names)) {
        Ability.add(entity, name)
    }
}



function removeAbility (entity, names) {
    for (let name of formatNames(names)) {
        Ability.remove(entity, name)
    }
}



function formatNames (names) {
    return isString(names) ? stringToArray(names) : names
}



function create (abilities, initialize = function () {}) {
    const entity = {}
    if (abilities) {
        addAbility(entity, abilities)
    }
    initialize(entity)

    return entity
}



function destroy (entity) {
    Ability.clear(entity)
    Event.emit(entity, 'destroyed')
}



export default {
    create,
    destroy,
    addAbility,
    removeAbility,
    getAbilities,
    hasAbility
}
