import {hasTag, tag, untag, findByTag, clearTag} from './tag'
import {spawnTask} from './task'
import {deferredCall, isString} from './utils'


const NAMESPACE = 'queue'
const RUNNING = 'queueState.running'



function enqueue (queueName, processor) {
    tag(processor, getTagName(queueName))
}



function processQueue (queueName) {
    const queue = getQueue(queueName)

    if (!isRunningQueue(queue)) {
        tag(queue, RUNNING)

        spawnProcessors(queue, function () {
            untag(queue, RUNNING)
            clearQueue(queue)
        })
    }
}



function spawnProcessors (processors, callback) {
    spawnTask(function * (tick) {
        for (let processor of processors) {
            yield deferredCall(processor, null, tick)
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



function getQueue (queueName) {
    return isString(queueName) ? findByTag(getTagName(queueName)) : queueName
}



function getTagName (queueName) {
    return `${NAMESPACE}.${queueName}`
}



export {
    enqueue,
    processQueue,
    clearQueue,
    isRunningQueue
}
