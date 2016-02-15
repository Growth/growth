import expect from 'expect.js'
import {
    spawnTask
} from '../lib/task'



describe('Task', function () {


    let passed


    function asyncFunction (done, value) {
        setTimeout(function () {
            passed = value
            done();
        }, 1);
    }



    beforeEach(function () {
        passed = false
    })



    it('should spawn task', function (done) {
        spawnTask(function * (next) {

            yield asyncFunction(next, true)
            yield asyncFunction(next, false)
            yield asyncFunction(next, true)

            expect(passed).to.be.ok()
            done()
        })
    })


})
