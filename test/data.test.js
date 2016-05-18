import expect from 'expect.js'
import Data from '../lib/data'



describe('Data', function () {

    it('should set data', function () {
        const object = {}
        const key = 'hello'

        Data.set(object, key, 'world')
        expect(Data.get(object, key)).to.be.eql('world')
    })



    it('should unset data', function () {
        const object = {}
        const key = 'hello'

        Data.set(object, key, 'world')
        Data.unset(object, key, 'world')
        expect(Data.get(object, key)).to.be.eql(undefined)
    })

})
