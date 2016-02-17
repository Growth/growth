import expect from 'expect.js'
import {tag, findByTag} from '../lib/tag'
import {
    enqueue,
    processQueue,
    clearQueue,
    isRunningQueue
} from '../lib/queue'

describe('Queue', function () {


    it('should enqueue a processor', function () {

        enqueue('queueName', (next) => next())
        enqueue('queueName', (next) => next())

        expect(findByTag('queue.queueName').size).to.be(2)
    })



    it('should clear a queue', function () {

        enqueue('queueName', (next) => next())
        enqueue('queueName', (next) => next())

        clearQueue('queueName')

        expect(findByTag('queue.queueName').size).to.be(0)
    })



    it('should process a queue', function (done) {

        let inc = 0
        enqueue('queueName', (next) => {inc += 1; next()})
        enqueue('queueName', (next) => {inc += 1; next()})

        enqueue('queueName', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                expect(inc).to.be(3)
                done()
            }, 1)
        })

        processQueue('queueName')
    })



    it('should enqueue while processing', function (done) {
        let inc = 0
        enqueue('queueName', (next) => {inc += 1; next()})
        enqueue('queueName', function (next) {
            setTimeout(function () {
                inc += 1
                next()
            }, 1)
        })
        processQueue('queueName')
        enqueue('queueName', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                expect(inc).to.be(3)
                done()
            }, 1)
        })
    })



    it('should not process already running queue', function (done) {
        let inc = 0
        enqueue('queueName', (next) => {inc += 1; next()})
        enqueue('queueName', (next) => {inc += 1; next()})

        enqueue('queueName', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                checkDone()
            }, 1)
        })

        function checkDone () {
            setTimeout(function () {
                expect(inc).to.be(3)
                done()
            }, 1);
        }

        processQueue('queueName')
        processQueue('queueName')
    })



    it('should check running queue state', function (done) {

        let inc = 0
        enqueue('queueName', (next) => next())
        enqueue('queueName', (next) => next())

        enqueue('queueName', function (next) {
            setTimeout(function () {
                next()
                done()
            }, 1)
        })

        processQueue('queueName')
        expect(isRunningQueue('queueName')).to.be.ok()
    })


})
