import expect from 'expect.js'
import {
    delayedApply,
    delayedCall,
    delay,
    wrapFunction,
    checkType,
    isString,
    isFunction,
    isUndefined,
    addNamespace,
    stringToArray,
    remove
} from '../lib/utils'



describe('Utils', function () {


    let passed

    beforeEach (function () {
        passed = false
    })



    it('should delay', delay)



    it('should delayed apply', function (done) {
        delayedApply(function (arg1, arg2) {
            expect(arg1 && arg2).to.be.ok()
            done()
        }, null, [true, true])
    })



    it('should delayed call', function (done) {
        delayedCall(function (arg1, arg2) {
            expect(arg1 && arg2).to.be.ok()
            done()
        }, null, true, true)
    })



    it('should check types', function () {
        expect(checkType('Hello', 'string')).to.be.ok()
        expect(checkType({}, 'object')).to.be.ok()
    })



    it('should check string type', function () {
        expect(isString('Hello')).to.be.ok()
    })



    it('should check undefined type', function () {
        let hello
        expect(isUndefined(hello)).to.be.ok()
    })



    it('should check function type', function () {
        expect(isFunction(function() {})).to.be.ok()
    })



    it('should wrap a function', function () {
        function hello (a, b) {
            return a + b
        }
        const wrappedFunction = wrapFunction(hello, function (a, b) {
            a += 1
            b += 1
            return [a, b]
        })
        expect(wrappedFunction(1, 2)).to.be.eql(5)
    })



    it('should prefix a string with namespace', function () {
        const namespaced = addNamespace('identifier', 'namespace')
        expect(namespaced).to.be.eql('namespace.identifier')
    })



    it('should should convert a string to array', function () {
        expect(stringToArray('hello, world')).to.be.eql(['hello', 'world'])
        expect(stringToArray('hello; world', ';')).to.be.eql(['hello', 'world'])
    })



    it('should remove an item from an array', function () {
        const array = [1, 2, 3]
        remove(array, 3)
        expect(array).to.be.eql([1, 2])
    })


})
