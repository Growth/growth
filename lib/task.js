function spawn (generator) {
    const task = generator((...args) => task.next(...args))
    task.next()
    return task
}



export default {
    spawn, start: spawn
}
