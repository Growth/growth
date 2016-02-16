import expect from 'expect.js'
import {
    deferredApply,
    deferredCall,
    defer
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


})
