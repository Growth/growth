import expect from 'expect.js'
import Task from '../lib/task'



describe('Task', function () {


    function asyncFunction (next, value) {
        setTimeout(function () {
            next(value);
        }, 1);
    }



    it('should spawn a task', function (done) {
        Task.spawn(function * (next) {
            let passed

            passed = yield asyncFunction(next, true)
            passed = yield asyncFunction(next, false)
            passed = yield asyncFunction(next, true)

            expect(passed).to.be.ok()
            done()
        })
    })


})
