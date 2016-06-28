import expect from 'expect.js'
import tag from '../lib/tag'



describe('Tag', function () {


    const item = {}
    const countries = ['France', 'Spain', 'Germany']



    it('should tag an item', function () {
        tag.tag(item, 'tagA')
        expect(tag.hasTag(item, 'tagA')).to.be.ok()

        const tagB = tag.getTag('tagB')
        tag.tag(item, tagB)
        expect(tag.hasTag(item, tagB)).to.be.ok()
    })



    it('should untag an item', function () {
        tag.untag(item, 'tagC')
        expect(tag.hasTag(item, 'tagC')).to.not.be.ok()
    })



    it('should check if a tag has an item', function () {
        tag.tag(item, 'tagD')
        expect(tag.hasTag(item, 'tagD')).to.be.ok()
    })



    it('should get a tag', function () {
        countries.forEach((country) => tag.tag(country, 'tagD'))

        expect(tag.getTag('country')).to.be.eql(new Set(countries))
    })



    it('should clear a tag', function () {
        countries.forEach((country) => tag.tag(country, 'tagE'))
        tag.clearTag('tagE')

        expect(tag.getTag('tagE').size).to.be.eql(0)
    })



    it('should delete a tag', function () {
        tag.tag(item, 'tagF')
        const tagF = tag.getTag('tagF')
        tag.destroyTag('tagF')

        expect(tag.getTag('tagF') !== tagF).to.be.ok()
    })



    it('should get tag by name or by the tag itself', function () {
        const tagG = tag.getTag('tagG')
        expect(tag.getTag('tagG') === tag.getTag(tagG)).to.be.ok()
    })



})
