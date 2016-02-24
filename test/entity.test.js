import expect from 'expect.js'
import Event from '../lib/event'
import Component from '../lib/component'
import Entity from '../lib/entity'



describe('Entity', function () {


    Component.register('hello', function (component) {
        Event.listen(component, 'entity added', function (entity) {
            entity.x = 1
        })

        Event.listen(component, 'entity removed', function (entity) {
            delete entity.x
        })
    })

    Component.register('foo', function (component) {
        Event.listen(component, 'entity added', function (entity) {
            entity.x = 2
        })
    })

    Component.register('bar', function (component) {
        Event.listen(component, 'entity added', function (entity) {
            Entity.addComponent(entity, 'foo')
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



    it('should add component', function () {
        const entityA = Entity.create()
        Entity.addComponent(entityA, 'hello')

        const entityB = Entity.create(['bar'])
        expect(entityA.x).to.be.eql(1)
        expect(entityB.x).to.be.eql(3)
    })



    it('should check if an entity has a component', function () {
        const entityA = Entity.create('hello')
        expect(Entity.hasComponent(entityA, 'hello')).to.be.ok()
    })



    it('should get the components list from an entity', function () {
        const entityA = Entity.create('hello, foo')
        expect(Entity.getComponentsList(entityA)).to.be.eql(new Set(['hello', 'foo']))
    })



    it('should remove a component', function () {
        const entityA = Entity.create('hello')
        Entity.removeComponent(entityA, 'hello')
        expect(entityA.x).to.be.eql(undefined)
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
        expect(Entity.getComponentsList(entityA)).to.be.eql(new Set())
    })



})
