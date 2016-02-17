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



function enqueue (queueName, processor) {
    tag(processor, getQueue(queueName))
}



function processQueue (queueName) {
    const queue = getQueue(queueName)

    if (!isRunningQueue(queue)) {
        tag(queue, RUNNING)

        spawnProcessors(queue, function () {
            clearQueue(queue)
            untag(queue, RUNNING)
        })
    }
}



function spawnProcessors (processors, callback) {
    spawnTask(function * (next) {
        for (let processor of processors) {
            yield deferredCall(processor, null, next)
        }

        callback()
    })
}



function isRunningQueue(queueName) {
    return hasTag(getQueue(queueName), RUNNING)
}



function clearQueue (queueName) {
    clearTag(getQueue(queueName))
}



export {
    enqueue,
    processQueue,
    clearQueue,
    isRunningQueue
}
