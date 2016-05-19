import expect from 'expect.js'
import Event from '../lib/event'
import Ability from '../lib/ability'
import Entity from '../lib/entity'



describe('Entity', function () {



    Ability.register('hello', function (ability) {
        Event.listen(ability, 'entity added', function (entity) {
            entity.x = 1
        })

        Event.listen(ability, 'entity removed', function (entity) {
            delete entity.x
        })
    })



    Ability.register('foo', function (ability) {
        Event.listen(ability, 'entity added', function (entity) {
            entity.x = 2
        })
    })



    Ability.register('bar', function (ability) {
        Event.listen(ability, 'entity added', function (entity) {
            Entity.addAbility(entity, 'foo')
            entity.x += 1
        })
    })



    it('should create an entity', function () {
        const entityA = Entity.create('hello', function (entity) {
            entity.y = 1
        })
        const entityB = Entity.create(['hello', 'foo'])
        expect(entityA.x).to.be.eql(1)
        expect(entityA.y).to.be.eql(1)
        expect(entityB.x).to.be.eql(2)
    })



    it('should add ability', function () {
        const entityA = Entity.create()
        Entity.addAbility(entityA, 'hello')

        const entityB = Entity.create(['bar'])
        expect(entityA.x).to.be.eql(1)
        expect(entityB.x).to.be.eql(3)
    })



    it('should check if an entity has an ability', function () {
        const entity = Entity.create('hello')
        expect(Entity.hasAbility(entity, 'hello')).to.be.ok()
    })



    it('should get the abilities from an entity', function () {
        const entity = Entity.create('hello, foo')
        expect(Entity.getAbilities(entity)).to.be.eql(new Set(['hello', 'foo']))
    })



    it('should remove an ability', function () {
        const entity = Entity.create('hello')
        Entity.removeAbility(entity, 'hello')
        expect(entity.x).to.be.eql(undefined)
    })



    it('should destroy an entity', function () {
        let destroyed = false
        const entityA = Entity.create('hello, foo', function(entity) {
            Event.listen(entity, 'destroyed', function () {
                destroyed = true
            })
        })
        Entity.destroy(entityA)
        expect(destroyed).to.be.ok()
        expect(Entity.getAbilities(entityA)).to.be.eql(new Set())
    })



})
