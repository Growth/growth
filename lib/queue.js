import {hasTag, tag, untag, findByTag, clearTag} from './tag'
import {spawnTask} from './task'
import {deferredCall} from './utils'


const RUNNING = 'queueState.running'



function enqueue (queueName, processor) {
    tag(processor, getTagName(queueName))
}



function processQueue (queueName) {
    const queue = getQueue(queueName)

    if (!hasTag(queue, RUNNING)) {
        tag(queue, RUNNING)

        spawnProcessors(queue, function () {
            untag(queue, RUNNING)
            clearQueue(queueName)
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



function clearQueue (queueName) {
    clearTag(getTagName(queueName))
}



function getQueue (queueName) {
    return findByTag(getTagName(queueName))
}



function getTagName (name) {
    return `queue.${name}`
}



export {
    enqueue,
    processQueue,
    clearQueue
}
