import expect from 'expect.js'
import {tag, getTag} from '../lib/tag'
import {
    enqueue,
    processQueue,
    stopQueue,
    clearQueue,
    isRunningQueue
} from '../lib/queue'

describe('Queue', function () {


    it('should enqueue a processor', function () {

        enqueue('queueA', (next) => next())
        enqueue('queueA', (next) => next())

        expect(getTag('queue.queueA').size).to.be(2)
    })



    it('should process a queue', function (done) {

        let inc = 0
        enqueue('queueC', (next) => {inc += 1; next()})
        enqueue('queueC', (next) => {inc += 1; next()})

        enqueue('queueC', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                expect(inc).to.be(3)
                done()
            })
        })

        processQueue('queueC')
    })



    it('should clear a queue', function () {

        enqueue('queueB', (next) => next())
        enqueue('queueB', (next) => next())

        clearQueue('queueB')

        expect(getTag('queue.queueB').size).to.be(0)
    })



    it('should stop a queue while processing', function (done) {
        let inc = 0
        enqueue('queueD', (next) => {inc += 1; next()})
        enqueue('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                stopQueue('queueD')
                setTimeout(function () {
                    expect(inc).to.be(2)
                    done()
                }, 10)
                next()
            })
        })
        enqueue('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                done()
            })
        })
        processQueue('queueD')
    })



    it('should enqueue while processing', function (done) {
        let inc = 0
        enqueue('queueD', (next) => {inc += 1; next()})
        enqueue('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                next()
            })
        })
        processQueue('queueD')
        enqueue('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                expect(inc).to.be(3)
                done()
            })
        })
    })



    it('should not process already running queue', function (done) {
        let inc = 0
        enqueue('queueE', (next) => {inc += 1; next()})
        enqueue('queueE', (next) => {inc += 1; next()})

        enqueue('queueE', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                checkDone()
            })
        })

        function checkDone () {
            setTimeout(function () {
                expect(inc).to.be(3)
                done()
            });
        }

        processQueue('queueE')
        processQueue('queueE')
    })



    it('should check running queue state', function (done) {

        let inc = 0
        enqueue('queueF', (next) => next())
        enqueue('queueF', (next) => next())

        enqueue('queueF', function (next) {
            setTimeout(function () {
                next()
                done()
            })
        })

        processQueue('queueF')
        expect(isRunningQueue('queueF')).to.be.ok()
    })


})
