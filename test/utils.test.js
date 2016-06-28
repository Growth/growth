import expect from 'expect.js'
import Utils from '../lib/utils'



describe('Utils', function () {


    let passed

    beforeEach (function () {
        passed = false
    })



    it('should delay', Utils.delay)



    it('should delayed apply', function (done) {
        Utils.delayApply(function (arg1, arg2) {
            expect(arg1 && arg2).to.be.ok()
            done()
        }, null, [true, true])
    })



    it('should delayed call', function (done) {
        Utils.delayCall(function (arg1, arg2) {
            expect(arg1 && arg2).to.be.ok()
            done()
        }, null, true, true)
    })



    it('should check types', function () {
        expect(Utils.check('Hello', 'string')).to.be.ok()
        expect(Utils.check({}, 'object')).to.be.ok()
    })



    it('should check string type', function () {
        expect(Utils.isString('Hello')).to.be.ok()
    })



    it('should check undefined type', function () {
        let hello
        expect(Utils.isUndefined(hello)).to.be.ok()
    })



    it('should check function type', function () {
        expect(Utils.isFunction(function() {})).to.be.ok()
    })



    it('should wrap a function', function () {
        function hello (a, b) {
            return a + b
        }
        const wrappedFunction = Utils.wrap(hello, function (a, b) {
            a += 1
            b += 1
            return [a, b]
        })
        expect(wrappedFunction(1, 2)).to.be.eql(5)
    })



    it('should remove an item from an array', function () {
        const array = [1, 2, 3]
        Utils.remove(array, 3)
        expect(array).to.be.eql([1, 2])
    })



    function asyncFunction (next, value) {
        setTimeout(function () {
            next(value)
        }, 1)
    }

    it('should spawn a task', function (done) {
        Utils.spawnTask(function * (next) {
            let passed

            passed = yield asyncFunction(next, true)
            passed = yield asyncFunction(next, false)
            passed = yield asyncFunction(next, true)

            expect(passed).to.be.ok()
            done()
        })
    })



})
