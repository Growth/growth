import expect from 'expect.js'
import Event from '../lib/event'
import Component from '../lib/component'



describe('Component', function () {


    it('should register a component', function (done) {
        Component.register('componentA', function () {
            done()
        })
    })



    it('should not register already registered component', function () {
        function registerComponentB () {
            Component.register('componentB', function () {})
        }

        registerComponentB()
        expect(registerComponentB).to.throwError()
    })



    it('should bind an entity', function () {
        Component.register('componentC', function (component) {
            Event.listen(component, 'entity added', function (entity) {
                entity.customValue = true
            })
        })


        const entity = {}
        Event.listen(entity, 'component componentC bound', function (component) {

        })
        Component.addEntity(entity, 'componentC')
        expect(entity.customValue).to.be.ok()
    })



    it('should add a component to an entity', function () {
        Component.register('componentD', function (component) {
            Event.listen(component, 'entity added', function (entity) {
                entity.isOkay = true
            })
        })

        const entity = {isOkay: false}
        Component.addEntity(entity, 'componentD')

        expect(entity.isOkay).to.be.ok()
    })



    it('should remove a component from an entity', function () {
        Component.register('componentE', function (component) {
            Event.listen(component, 'entity added', function (entity) {
                entity.isOkay = true
            })
            Event.listen(component, 'entity removed', function (entity) {
                entity.isOkay = false
            })
        })

        const entity = {isOkay: false}
        Component.addEntity(entity, 'componentE')
        Component.removeEntity(entity, 'componentE')

        expect(entity.isOkay).to.not.be.ok()
    })



    it('should get entities from a component', function () {
        Component.register('componentF', function (component) {})
        const entity = {}
        Component.addEntity(entity, 'componentF')

        expect(Component.get('componentF').has(entity)).to.be.ok()
    })



    it('should check if an entity as a component', function () {
        Component.register('componentG', function (component) {})
        const entity = {}
        Component.addEntity(entity, 'componentF')
        expect(Component.hasComponent(entity, 'componentF')).to.be.ok()
    })



    it('should clear an entity', function () {
        Component.register('componentH', function (component) {})
        Component.register('componentI', function (component) {})
        const entity = {}
        Component.addEntity(entity, 'componentH')
        Component.addEntity(entity, 'componentI')
        Component.clearEntity(entity)
        expect(Component.get('componentH').has(entity)).to.not.be.ok()
        expect(Component.get('componentI').has(entity)).to.not.be.ok()
    })



    it('should get components list', function () {
        Component.register('componentJ', function (component) {})
        Component.register('componentK', function (component) {})
        const entity = {}
        Component.addEntity(entity, 'componentJ')
        Component.addEntity(entity, 'componentK')
        expect(Component.getComponentsList(entity)).to.be.eql(new Set(['componentJ', 'componentK']))
    })


})
