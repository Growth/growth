import {hasTag, tag, untag, findByTag, clearTag} from './tag'
import {spawnTask} from './task'
import {deferredCall, isString} from './utils'


const NAMESPACE = 'queue'
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



function getQueue (queueName) {
    if (isString(queueName)) {
        queueName = `${NAMESPACE}.${queueName}`
    }
    return findByTag(queueName)
}





export {
    enqueue,
    processQueue,
    clearQueue,
    isRunningQueue
}
