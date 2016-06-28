import expect from 'expect.js'
import Tag from '../lib/tag'



describe('Tag', function () {


    const item = {}
    const countries = ['France', 'Spain', 'Germany']



    it('should tag an item', function () {
        Tag.tag(item, 'tagA')
        expect(Tag.hasTag(item, 'tagA')).to.be.ok()

        const tagB = Tag.getTag('tagB')
        Tag.tag(item, tagB)
        expect(Tag.hasTag(item, tagB)).to.be.ok()
    })



    it('should untag an item', function () {
        Tag.untag(item, 'tagC')
        expect(Tag.hasTag(item, 'tagC')).to.not.be.ok()
    })



    it('should check if a tag has an item', function () {
        Tag.tag(item, 'tagD')
        expect(Tag.hasTag(item, 'tagD')).to.be.ok()
    })



    it('should get a tag', function () {
        countries.forEach((country) => Tag.tag(country, 'tagD'))

        expect(Tag.getTag('country')).to.be.eql(new Set(countries))
    })



    it('should clear a tag', function () {
        countries.forEach((country) => Tag.tag(country, 'tagE'))
        Tag.clearTag('tagE')

        expect(Tag.getTag('tagE').size).to.be.eql(0)
    })



    it('should delete a tag', function () {
        Tag.tag(item, 'tagF')
        const tagF = Tag.getTag('tagF')
        Tag.destroyTag('tagF')

        expect(Tag.getTag('tagF') !== tagF).to.be.ok()
    })



    it('should get tag by name or by the tag itself', function () {
        const tagG = Tag.getTag('tagG')
        expect(Tag.getTag('tagG') === Tag.getTag(tagG)).to.be.ok()
    })



})
