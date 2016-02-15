import expect from 'expect.js'
import {
    spawnTask
} from '../lib/task'



describe('Task', function () {


    function asyncFunction (done, value) {
        setTimeout(function () {
            done(value);
        }, 1);
    }



    it('should spawn task', function (done) {
        spawnTask(function * (next) {
            let passed

            passed = yield asyncFunction(next, true)
            passed = yield asyncFunction(next, false)
            passed = yield asyncFunction(next, true)

            expect(passed).to.be.ok()
            done()
        })
    })


})
