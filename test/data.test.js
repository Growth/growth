import expect from 'expect.js'
import Data from '../lib/data'



describe('Data', function () {

    it('should set data', function () {
        const object = {}
        const key = 'hello'

        Data.set(object, key, 'world')
        expect(Data.get(object, key)).to.be.eql('world')
    })

})
