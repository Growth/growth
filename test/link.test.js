import expect from 'expect.js'
import {
    attach,
    fetch,
    detach
} from '../lib/link'



describe('Link', function () {


    it('should attach data', function () {
        const object = {}
        const key = 'hello'
        attach(object, key, 'world')
        expect(fetch(object, key)).to.be.eql('world')
    })



    it('should detach data', function () {
        const object = {}
        const key = 'hello'

        attach(object, key, 'world')
        detach(object, key, 'world')
        expect(fetch(object, key)).to.be.eql(undefined)
    })


})
