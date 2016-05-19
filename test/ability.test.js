import expect from 'expect.js'
import Event from '../lib/event'
import Ability from '../lib/ability'



describe('Ability', function () {


    it('should register an ability', function (done) {
        Ability.register('AbilityA', function () {
            done()
        })
    })



    it('should not register already registered ability', function () {
        function registerAbilityB () {
            Ability.register('AbilityB', function () {})
        }

        registerAbilityB()
        expect(registerAbilityB).to.throwError()
    })



    it('should bind an entity', function () {
        Ability.register('AbilityC', function (ability) {
            Event.listen(ability, 'entity added', function (entity) {
                entity.customValue = true
            })
        })

        const entity = {}
        Ability.add(entity, 'AbilityC')
        expect(entity.customValue).to.be.ok()
    })



    it('should add a component to an entity', function () {
        Ability.register('ComponentD', function (component) {
            Event.listen(component, 'entity added', function (entity) {
                entity.isOkay = true
            })
        })

        const entity = {isOkay: false}
        Ability.add(entity, 'ComponentD')

        expect(entity.isOkay).to.be.ok()
    })



    it('should remove a component from an entity', function () {
        Ability.register('ComponentE', function (component) {
            Event.listen(component, 'entity added', function (entity) {
                entity.isOkay = true
            })
            Event.listen(component, 'entity removed', function (entity) {
                entity.isOkay = false
            })
        })

        const entity = {isOkay: false}
        Ability.add(entity, 'ComponentE')
        Ability.remove(entity, 'ComponentE')

        expect(Ability.isOkay).to.not.be.ok()
    })



    it('should get entities from a component', function () {
        Ability.register('ComponentF', function (component) {})
        const entity = {}
        Ability.add(entity, 'ComponentF')

        expect(Ability.get('ComponentF').has(entity)).to.be.ok()
    })



    it('should check if an entity as a component', function () {
        Ability.register('ComponentG', function (component) {})
        const entity = {}
        Ability.add(entity, 'ComponentF')
        expect(Ability.has(entity, 'ComponentF')).to.be.ok()
    })



    it('should clear an entity', function () {
        Ability.register('ComponentH', function (component) {})
        Ability.register('ComponentI', function (component) {})
        const entity = {}
        Ability.add(entity, 'ComponentH')
        Ability.add(entity, 'ComponentI')
        Ability.clear(entity)
        expect(Ability.get('ComponentH').has(entity)).to.not.be.ok()
        expect(Ability.get('ComponentI').has(entity)).to.not.be.ok()
    })



    it('should get components list', function () {
        Ability.register('ComponentJ', function (component) {})
        Ability.register('ComponentK', function (component) {})
        const entity = {}
        Ability.add(entity, 'ComponentJ')
        Ability.add(entity, 'ComponentK')
        expect(Ability.get(entity)).to.be.eql(new Set(['ComponentJ', 'ComponentK']))
    })


})
