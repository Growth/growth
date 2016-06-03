'use strict'

import Tag from './tag'
import {
    delayCall,
    spawnTask
} from './utils'


const RUNNING = 'QueueState.Running'
const Queue = Tag.namespace('Queue')
const clear = Queue.clear


function append (name, processor) {
    Queue.set(processor, name)
}



function run (name) {
    if (!isRunning(name)) {
        Queue.set(name, RUNNING)

        spawn(Queue.get(name), stop)
    }
}



function spawn (queue, callback) {
    spawnTask(function * (next) {
        for (let processor of queue) {
            yield delayCall(processor, null, next)
        }
        callback(queue)
    })
}



function isRunning(name) {
    return Queue.has(name, RUNNING)
}



function stop (name) {
    clear(name)
    Queue.unset(name, RUNNING)
}



export default {
    append,
    run,
    isRunning,
    stop,
    clear
}
