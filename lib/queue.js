import {tag, findByTag, clearTag} from './tag'
import {spawnTask} from './task'
import {deferredApply} from './utils'



function enqueue (queueName, processor) {
    tag(processor, getTagName(queueName))
}



function processQueue (queueName) {
    const processors = findByTag(getTagName(queueName))

    spawnTask(function * (tick) {
        for (let processor of processors) {
            yield deferredApply(processor, null, tick)
        }

        clearQueue(queueName)
    })
}



function clearQueue (queueName) {
    clearTag(getTagName(queueName))
}



function getTagName (name) {
    return `queue.${name}`
}



export {
    enqueue,
    processQueue,
    clearQueue
}
