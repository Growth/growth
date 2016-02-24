import expect from 'expect.js'
import Event from '../lib/event'



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
        Event.listen(mock, 'event name', increment)
        Event.emit(mock, 'event name')

        expect(passed).to.be(1)
    })



    it('should not add the same listener twice', function () {
        Event.listen(mock, 'event name', increment)
        Event.listen(mock, 'event name', increment)
        Event.emit(mock, 'event name')

        expect(passed).to.be(1)
    })



    it('should trigger multiple listeners', function () {
        Event.listen(mock, 'event name', increment)
        Event.listen(mock, 'event name', function () {
            passed += 1
        })
        Event.listen(mock, 'event name', function () {
            passed += 1
        })
        Event.emit(mock, 'event name')

        expect(passed).to.be(3)
    })



    it('should remove a listener', function () {
        Event.listen(mock, 'event name', increment)
        Event.removeListener(mock, 'event name', increment)
        Event.emit(mock, 'event name')

        expect(passed).to.be(0)
    })



    it('should forward parameters', function () {
        let param1, param2

        Event.listen(mock, 'custom', function (p1, p2) {
            param1 = p1
            param2 = p2
        })

        Event.emit(mock, 'custom', 1, 2)

        expect(param1 + param2).to.be(3)
    })



    it('should work with an array as emitter', function () {
        const array = [1, 2, 3]

        Event.listen(array, 'custom', function () {
            this.push(4)
        })

        Event.emit(array, 'custom')

        expect(array).to.have.length(4)
    })



    it('should work with a function as emitter', function () {
        Event.listen(increment, 'custom', function () {
            this()
        })

        Event.emit(increment, 'custom')

        expect(passed).to.be(1)
    })



    it('should work with a string as emitter', function () {
        Event.listen('abstract emitter name', 'event name', increment)
        Event.emit('abstract emitter name', 'event name')

        expect(passed).to.be(1)
    })



    it('should dispatch an event on multiple emitters', function () {
        Event.listen('emitter 1', 'event name', increment)
        Event.listen('emitter 2', 'event name', increment)
        Event.listen('emitter 3', 'event name', increment)
        Event.dispatch(['emitter 1', 'emitter 2', 'emitter 3'], 'event name')

        expect(passed).to.be(3)
    })



    it('should forward params to an emit proxy', function () {
        Event.listen(mock, 'event name', (value) => passed += value)

        function foo (callback) {
            callback(2)
        }

        foo(Event.forwardTo(mock, 'event name'))

        expect(passed).to.be(2)
    })



    it('should clear listeners', function () {
        Event.listen(mock, 'event name', increment)
        Event.listen(mock, 'event name', increment)
        Event.listen(mock, 'event name', increment)

        Event.clearListeners(mock, 'event name')
        Event.emit(mock, 'event name')

        expect(passed).to.be(0)
    })



    it('should clear emitter', function () {
        Event.listen(mock, 'event A', increment)
        Event.listen(mock, 'event B', increment)
        Event.listen(mock, 'event C', increment)

        Event.clearEmitter(mock)

        Event.emit(mock, 'event A')
        Event.emit(mock, 'event B')
        Event.emit(mock, 'event C')

        expect(passed).to.be(0)
    })


})
