import Task from './task'
import {deferredCall} from './utils'
import Tag from './tag'


const QueueTag = Tag.namespace('queue')
const RUNNING = 'queueState.running'



function enqueue (name, processor) {
    QueueTag.tag(processor, name)
}



function start (name) {
    if (!isRunning(name)) {
        QueueTag.tag(name, RUNNING)

        spawnProcessors(QueueTag.get(name), stop)
    }
}



function spawnProcessors (queue, callback) {
    Task.spawn(function * (next) {
        for (let processor of queue) {
            yield deferredCall(processor, null, next)
        }
        callback(queue)
    })
}



function isRunning(name) {
    return QueueTag.has(name, RUNNING)
}



function stop (name) {
    clear(name)
    QueueTag.untag(name, RUNNING)
}



function clear (name) {
    QueueTag.clear(name)
}



export default {
    enqueue,
    start,
    isRunning,
    stop,
    clear
}
