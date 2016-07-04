import expect from 'expect.js'
import utils from '../lib/utils'



describe('utils', function () {


    let passed

    beforeEach (function () {
        passed = false
    })



    it('should delay', utils.delay)



    it('should delayed apply', function (done) {
        utils.delayApply(function (arg1, arg2) {
            expect(arg1 && arg2).to.be.ok()
            done()
        }, null, [true, true])
    })



    it('should delayed call', function (done) {
        utils.delayCall(function (arg1, arg2) {
            expect(arg1 && arg2).to.be.ok()
            done()
        }, null, true, true)
    })



    it('should check types', function () {
        expect(utils.check('Hello', 'string')).to.be.ok()
        expect(utils.check({}, 'object')).to.be.ok()
    })



    it('should check string type', function () {
        expect(utils.isString('Hello')).to.be.ok()
    })



    it('should check undefined type', function () {
        let hello
        expect(utils.isUndefined(hello)).to.be.ok()
    })



    it('should check function type', function () {
        expect(utils.isFunction(function() {})).to.be.ok()
    })



    it('should wrap a function', function () {
        function hello (a, b) {
            return a + b
        }
        const wrappedFunction = utils.wrap(hello, function (a, b) {
            a += 1
            b += 1
            return [a, b]
        })
        expect(wrappedFunction(1, 2)).to.be.eql(5)
    })



    it('should remove an item from an array', function () {
        const array = [1, 2, 3]
        utils.remove(array, 3)
        expect(array).to.be.eql([1, 2])
    })



    function asyncFunction (next, value) {
        setTimeout(function () {
            next(value)
        }, 1)
    }

    it('should spawn a task', function (done) {
        utils.spawnTask(function * (next) {
            let passed

            passed = yield asyncFunction(next, true)
            passed = yield asyncFunction(next, false)
            passed = yield asyncFunction(next, true)

            expect(passed).to.be.ok()
            done()
        })
    })



    it('should validate presence of params', function () {
        const object = {myParam: true}
        expect(utils.validatePresence(object, 'myParam')).to.be.ok()
    })


})
