import expect from 'expect.js'
import Ref from '../lib/reference'



describe('Reference', function () {

    it('should be ok', function () {
        const object = {}
        const key = 'hello'

        Ref.set(object, key, 'world')
        expect(Ref.get(object, key)).to.be.eql('world')
    })

})
