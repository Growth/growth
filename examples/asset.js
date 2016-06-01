/*
  Usage
  Asset.load(['dragon.png', 'stars.png'], callback)
  Asset.get('dragon.png') // return <img src='dragon.png'> or undefined
  Asset.isLoaded('dragon.png')
*/


import Http from 'growth/http'
import Queue from 'growth/queue'


const assets = new Map
const queueName = 'Asset'



function load (urls, callback) {
    urls.forEach(appendQueue)
    Queue.run(queueName, callback)
}



function appendQueue (url) {
    if (!isLoaded(url)) {
        Queue.append(queueName, loadHandler(url))
    }
}



function get (url) {
    return assets.get(url)
}



function isLoaded (url) {
    return assets.has(url)
}



function loadHandler (url) {
    return (next) => {
        Http.load(loadedHandler(url, next), failureHandler(url))
    }
}



function loadedHandler (url, callback) {
    return (resource) => {
        assets.set(url, resource)
        callback()
    }
}



function failureHandler (url) {
    return () => {
        throw new Error(`Assets Loader failed to load ${url}`)
    }
}



export default {
    load,
    isLoaded,
    get
}
