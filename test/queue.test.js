import expect from 'expect.js'
import Tag from '../lib/tag'
import Queue from '../lib/queue'

describe('Queue', function () {


    it('should enqueue a processor', function () {

        Queue.enqueue('queueA', (next) => next())
        Queue.enqueue('queueA', (next) => next())

        expect(Tag.get('Queue.queueA').size).to.be(2)
    })



    it('should process a queue', function (done) {

        let inc = 0
        Queue.enqueue('queueC', (next) => {inc += 1; next()})
        Queue.enqueue('queueC', (next) => {inc += 1; next()})

        Queue.enqueue('queueC', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                expect(inc).to.be(3)
                done()
            })
        })

        Queue.start('queueC')
    })



    it('should clear a queue', function () {

        Queue.enqueue('queueB', (next) => next())
        Queue.enqueue('queueB', (next) => next())

        Queue.clear('queueB')

        expect(Tag.get('queue.queueB').size).to.be(0)
    })



    it('should stop a queue while processing', function (done) {
        let inc = 0
        Queue.enqueue('queueD', (next) => {inc += 1; next()})
        Queue.enqueue('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                Queue.stop('queueD')
                setTimeout(function () {
                    expect(inc).to.be(2)
                    done()
                }, 10)
                next()
            })
        })
        Queue.enqueue('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                done()
            })
        })
        Queue.start('queueD')
    })



    it('should enqueue while processing', function (done) {
        let inc = 0
        Queue.enqueue('queueD', (next) => {inc += 1; next()})
        Queue.enqueue('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                next()
            })
        })
        Queue.start('queueD')
        Queue.enqueue('queueD', function (next) {
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
        Queue.enqueue('queueE', (next) => {inc += 1; next()})
        Queue.enqueue('queueE', (next) => {inc += 1; next()})

        Queue.enqueue('queueE', function (next) {
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

        Queue.start('queueE')
        Queue.start('queueE')
    })



    it('should check running queue state', function (done) {

        let inc = 0
        Queue.enqueue('queueF', (next) => next())
        Queue.enqueue('queueF', (next) => next())

        Queue.enqueue('queueF', function (next) {
            setTimeout(function () {
                next()
                done()
            })
        })

        Queue.start('queueF')
        expect(Queue.isRunning('queueF')).to.be.ok()
    })


})
