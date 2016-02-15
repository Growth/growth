function spawnTask (generator) {

    const task = generator((...args) => task.next(...args))

    task.next()

    return task
}



export {
    spawnTask
}
