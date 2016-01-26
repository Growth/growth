import expect from 'expect.js'
import {
    addListener,
    emitEvent,
    dispatchEvent,
    forwardToEmit,
    removeListener,
    clearListeners,
    clearEmitter
} from '../lib/event'



describe('Event', function () {


    let mock, passed

    function increment () {
        passed += 1
    }


    beforeEach(function () {
        mock = {}
        passed = 0
    })



    it('should add a listener and emit an event', function () {
        addListener(mock, 'event name', increment)
        emitEvent(mock, 'event name')

        expect(passed).to.be(1)
    })



    it('should trigger multiple listeners', function () {
        addListener(mock, 'event name', increment)
        addListener(mock, 'event name', increment)
        addListener(mock, 'event name', increment)
        emitEvent(mock, 'event name')

        expect(passed).to.be(3)
    })



    it('should remove a listener', function () {
        addListener(mock, 'event name', increment)
        removeListener(mock, 'event name', increment)
        emitEvent(mock, 'event name')

        expect(passed).to.be(0)
    })



    it('should forward parameters', function () {
        let param1, param2

        addListener(mock, 'custom', function (p1, p2) {
            param1 = p1
            param2 = p2
        })

        emitEvent(mock, 'custom', 1, 2)

        expect(param1 + param2).to.be(3)
    })



    it('should work with an array as emitter', function () {
        const array = [1, 2, 3]

        addListener(array, 'custom', function () {
            this.push(4)
        })

        emitEvent(array, 'custom')

        expect(array).to.have.length(4)
    })



    it('should work with a function as emitter', function () {
        addListener(increment, 'custom', function () {
            this()
        })

        emitEvent(increment, 'custom')

        expect(passed).to.be(1)
    })



    it('should work with a string as emitter', function () {
        addListener('abstract emitter name', 'event name', increment)
        emitEvent('abstract emitter name', 'event name')

        expect(passed).to.be(1)
    })



    it('should dispatch an event on multiple emitters', function () {
        addListener('emitter 1', 'event name', increment)
        addListener('emitter 2', 'event name', increment)
        addListener('emitter 3', 'event name', increment)
        dispatchEvent(['emitter 1', 'emitter 2', 'emitter 3'], 'event name')

        expect(passed).to.be(3)
    })



    it('should forward params to an emit proxy', function () {
        addListener(mock, 'event name', (value) => passed += value)

        function foo (callback) {
            callback(2)
        }

        foo(forwardToEmit(mock, 'event name'))

        expect(passed).to.be(2)
    })



    it('should clear listeners', function () {
        addListener(mock, 'event name', increment)
        addListener(mock, 'event name', increment)
        addListener(mock, 'event name', increment)

        clearListeners(mock, 'event name')
        emitEvent(mock, 'event name')

        expect(passed).to.be(0)
    })



    it('should clear emitter', function () {
        addListener(mock, 'event A', increment)
        addListener(mock, 'event B', increment)
        addListener(mock, 'event C', increment)

        clearEmitter(mock)

        emitEvent(mock, 'event A')
        emitEvent(mock, 'event B')
        emitEvent(mock, 'event C')

        expect(passed).to.be(0)
    })


})
