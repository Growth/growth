import expect from 'expect.js'
import Link from '../lib/link'



describe('Data', function () {

    it('should set data', function () {
        const object = {}
        const key = 'hello'

        Data.attach(object, key, 'world')
        expect(Data.fetch(object, key)).to.be.eql('world')
    })



    it('should unset data', function () {
        const object = {}
        const key = 'hello'

        Data.attach(object, key, 'world')
        Data.detach(object, key, 'world')
        expect(Data.fetch(object, key)).to.be.eql(undefined)
    })

})
