import expect from 'expect.js'
import {
    registerComponent,
    bindComponent,
    unbindComponent
} from '../lib/component'



describe('Component', function () {


    it('should register a component', function (done) {
        registerComponent('componentA', function () {
            done()
        })
    })



    it('should not register already registered component', function () {
        function registerComponentB () {
            registerComponent('componentB', function () {})
        }

        registerComponentB()
        expect(registerComponentB).to.throwError()
    })


})
