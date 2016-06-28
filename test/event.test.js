import expect from 'expect.js'
import event from '../lib/event'



describe('event', function () {


    let mock, passed

    function increment () {
        passed += 1
    }



    beforeEach(function () {
        mock = {}
        passed = 0
    })



    it('should add a listener and emit an event', function () {
        event.listen(mock, 'event name', increment)
        event.emit(mock, 'event name')

        expect(passed).to.be(1)
    })



    it('should not add the same listener twice', function () {
        event.listen(mock, 'event name', increment)
        event.listen(mock, 'event name', increment)
        event.emit(mock, 'event name')

        expect(passed).to.be(1)
    })



    it('should trigger multiple listeners', function () {
        event.listen(mock, 'event name', increment)
        event.listen(mock, 'event name', function () {
            passed += 1
        })
        event.listen(mock, 'event name', function () {
            passed += 1
        })
        event.emit(mock, 'event name')

        expect(passed).to.be(3)
    })



    it('should remove a listener', function () {
        event.listen(mock, 'event name', increment)
        event.removeListener(mock, 'event name', increment)
        event.emit(mock, 'event name')

        expect(passed).to.be(0)
    })



    it('should forward parameters', function () {
        let param1, param2

        event.listen(mock, 'custom', function (p1, p2) {
            param1 = p1
            param2 = p2
        })

        event.emit(mock, 'custom', 1, 2)

        expect(param1 + param2).to.be(3)
    })



    it('should work with an array as emitter', function () {
        const array = [1, 2, 3]

        event.listen(array, 'custom', function () {
            this.push(4)
        })

        event.emit(array, 'custom')

        expect(array).to.have.length(4)
    })



    it('should work with a function as emitter', function () {
        event.listen(increment, 'custom', function () {
            this()
        })

        event.emit(increment, 'custom')

        expect(passed).to.be(1)
    })



    it('should work with a string as emitter', function () {
        event.listen('abstract emitter name', 'event name', increment)
        event.emit('abstract emitter name', 'event name')

        expect(passed).to.be(1)
    })



    it('should dispatch an event on multiple emitters', function () {
        event.listen('emitter 1', 'event name', increment)
        event.listen('emitter 2', 'event name', increment)
        event.listen('emitter 3', 'event name', increment)
        event.dispatch(['emitter 1', 'emitter 2', 'emitter 3'], 'event name')

        expect(passed).to.be(3)
    })



    it('should forward params to an emit proxy', function () {
        event.listen(mock, 'event name', (value) => passed += value)

        function foo (callback) {
            callback(2)
        }

        foo(event.forwardTo(mock, 'event name'))

        expect(passed).to.be(2)
    })



    it('should clear listeners', function () {
        event.listen(mock, 'event name', increment)
        event.listen(mock, 'event name', increment)
        event.listen(mock, 'event name', increment)

        event.clearListeners(mock, 'event name')
        event.emit(mock, 'event name')

        expect(passed).to.be(0)
    })



    it('should clear emitter', function () {
        event.listen(mock, 'event A', increment)
        event.listen(mock, 'event B', increment)
        event.listen(mock, 'event C', increment)

        event.clearEmitter(mock)

        event.emit(mock, 'event A')
        event.emit(mock, 'event B')
        event.emit(mock, 'event C')

        expect(passed).to.be(0)
    })


})
