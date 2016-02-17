import {spawnTask} from './task'
import {deferredCall} from './utils'
import {
    hasTag,
    tag,
    untag,
    tagGetter,
    clearTag
} from './tag'


const getQueue = tagGetter('queue')
const RUNNING = 'queueState.running'



function enqueue (name, processor) {
    tag(processor, getQueue(name))
}



function processQueue (name) {
    const queue = getQueue(name)

    if (!isRunningQueue(queue)) {
        tag(queue, RUNNING)

        spawnProcessors(queue, stopQueue)
    }
}



function spawnProcessors (queue, callback) {
    spawnTask(function * (next) {
        for (let processor of queue) {
            yield deferredCall(processor, null, next)
        }
        callback(queue)
    })
}



function isRunningQueue(name) {
    return hasTag(getQueue(name), RUNNING)
}



function stopQueue (name) {
    const queue = getQueue(name)
    clearQueue(queue)
    untag(queue, RUNNING)
}



function clearQueue (name) {
    clearTag(getQueue(name))
}



export {
    enqueue,
    processQueue,
    stopQueue,
    clearQueue,
    isRunningQueue
}
