import expect from 'expect.js'
import {
    deferredApply,
    deferredCall,
    defer,
    wrapFunction,
    checkType,
    isString,
    addNamespace
} from '../lib/utils'



describe('Utils', function () {


    let passed

    beforeEach (function () {
        passed = false
    })



    it('should defer', defer)



    it('should deferred apply', function (done) {
        deferredApply(function (arg1, arg2) {
            expect(arg1 && arg2).to.be.ok()
            done()
        }, null, [true, true])
    })



    it('should deferred call', function (done) {
        deferredCall(function (arg1, arg2) {
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



})
