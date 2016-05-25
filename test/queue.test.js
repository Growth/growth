import expect from 'expect.js'
import Tag from '../lib/tag'
import Queue from '../lib/queue'

describe('Queue', function () {


    it('should enqueue a processor', function () {

        Queue.append('queueA', (next) => next())
        Queue.append('queueA', (next) => next())

        expect(Tag.get('Queue.queueA').size).to.be(2)
    })



    it('should process a queue', function (done) {

        let inc = 0
        Queue.append('queueC', (next) => {inc += 1; next()})
        Queue.append('queueC', (next) => {inc += 1; next()})

        Queue.append('queueC', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                expect(inc).to.be(3)
                done()
            })
        })

        Queue.run('queueC')
    })



    it('should clear a queue', function () {

        Queue.append('queueB', (next) => next())
        Queue.append('queueB', (next) => next())

        Queue.clear('queueB')

        expect(Tag.get('queue.queueB').size).to.be(0)
    })



    it('should stop a queue while processing', function (done) {
        let inc = 0
        Queue.append('queueD', (next) => {inc += 1; next()})
        Queue.append('queueD', function (next) {
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
        Queue.append('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                next()
                done()
            })
        })
        Queue.run('queueD')
    })



    it('should enqueue while processing', function (done) {
        let inc = 0
        Queue.append('queueD', (next) => {inc += 1; next()})
        Queue.append('queueD', function (next) {
            setTimeout(function () {
                inc += 1
                next()
            })
        })
        Queue.run('queueD')
        Queue.append('queueD', function (next) {
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
        Queue.append('queueE', (next) => {inc += 1; next()})
        Queue.append('queueE', (next) => {inc += 1; next()})

        Queue.append('queueE', function (next) {
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

        Queue.run('queueE')
        Queue.run('queueE')
    })



    it('should check running queue state', function (done) {

        let inc = 0
        Queue.append('queueF', (next) => next())
        Queue.append('queueF', (next) => next())

        Queue.append('queueF', function (next) {
            setTimeout(function () {
                next()
                done()
            })
        })

        Queue.run('queueF')
        expect(Queue.isRunning('queueF')).to.be.ok()
    })


})
