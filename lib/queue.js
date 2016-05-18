'use strict'

import Task from './task'
import Tag from './tag'
import {delayedCall} from './utils'


const QueueTag = Tag.namespace('Queue')
const RUNNING = 'QueueState.Running'



function enqueue (name, processor) {
    QueueTag.set(processor, name)
}



function start (name) {
    if (!isRunning(name)) {
        QueueTag.set(name, RUNNING)

        spawn(QueueTag.get(name), stop)
    }
}



function spawn (queue, callback) {
    Task.spawn(function * (next) {
        for (let processor of queue) {
            yield delayedCall(processor, null, next)
        }
        callback(queue)
    })
}



function isRunning(name) {
    return QueueTag.has(name, RUNNING)
}



function stop (name) {
    clear(name)
    QueueTag.unset(name, RUNNING)
}



function clear (name) {
    QueueTag.clear(name)
}



export default {
    enqueue,
    start, resume: start,
    isRunning,
    stop,
    clear
}
