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

    const item = {}
    const countries = ['France', 'Spain', 'Germany']


    it('should tag an item', function () {
        tag(item, 'tagA')
        expect(hasTag(item, 'tagA')).to.be.ok()

        const tagB = findByTag('tagB')
        tag(item, tagB)
        expect(hasTag(item, tagB)).to.be.ok()
    })



    it('should untag an item', function () {
        untag(item, 'tagC')
        expect(hasTag(item, 'tagC')).to.not.be.ok()
    })



    it('should check a tag for an item', function () {
        tag(item, 'tagD')
        expect(hasTag(item, 'tagD')).to.be.ok()
    })



    it('should find items by tag name', function () {
        countries.forEach((country) => tag(country, 'tagD'))

        expect(findByTag('country')).to.be.eql(new Set(countries))
    })



    it('should clear a tag', function () {
        countries.forEach((country) => tag(country, 'tagE'))
        clearTag('tagE')

        expect(findByTag('tagE').size).to.be.eql(0)
    })



    it('should delete a tag', function () {
        tag(item, 'tagF')
        const tagF = findByTag('tagF')
        deleteTag('tagF')

        expect(findByTag('tagF') !== tagF).to.be.ok()
    })



    it('should find tag by name or by the tag itself', function () {
        const tagG = findByTag('tagG')
        expect(findByTag('tagG') === findByTag(tagG)).to.be.ok()
    })


})
