import expect from 'expect.js'
import {
    tag,
    untag,
    hasTag,
    findByTag,
    clearTag,
    deleteTag
} from '../lib/tag'



describe('Tag', function () {


    const spider = {}
    const countries = ['France', 'Spain', 'Germany']


    it('should tag an item', function () {
        tag(spider, 'monster')
        expect(hasTag(spider, 'monster')).to.be.ok()
    })



    it('should untag an item', function () {
        untag(spider, 'monster')
        expect(hasTag(spider, 'monster')).to.not.be.ok()
    })



    it('should find items by tag name', function () {
        countries.forEach((country) => tag(country, 'country'))

        expect(findByTag('country')).to.be.eql(new Set(countries))
    })



    it('should clear a tag', function () {
        countries.forEach((country) => tag(country, 'country'))
        clearTag('country')

        expect(findByTag('country').size).to.be.eql(0)
    })



    it('should delete a tag', function () {
        tag({}, 'hello')
        const hello = findByTag('hello')
        deleteTag('hello')

        expect(findByTag('hello') !== hello).to.be.ok()
    })



    it('should find tag by name or by the tag itself', function () {
        const hello = findByTag('hello')
        expect(findByTag('hello') === findByTag(hello)).to.be.ok()
    })


})
