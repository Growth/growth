import expect from 'expect.js'
import Tag from '../lib/tag'



describe('Tag', function () {


    const item = {}
    const countries = ['France', 'Spain', 'Germany']



    it('should tag an item', function () {
        Tag.add(item, 'tagA')
        expect(Tag.has(item, 'tagA')).to.be.ok()

        const tagB = Tag.get('tagB')
        Tag.add(item, tagB)
        expect(Tag.has(item, tagB)).to.be.ok()
    })



    it('should untag an item', function () {
        Tag.remove(item, 'tagC')
        expect(Tag.has(item, 'tagC')).to.not.be.ok()
    })



    it('should check a tag for an item', function () {
        Tag.add(item, 'tagD')
        expect(Tag.has(item, 'tagD')).to.be.ok()
    })



    it('should find items by tag name', function () {
        countries.forEach((country) => Tag.add(country, 'tagD'))

        expect(Tag.get('country')).to.be.eql(new Set(countries))
    })



    it('should clear a tag', function () {
        countries.forEach((country) => Tag.add(country, 'tagE'))
        Tag.clear('tagE')

        expect(Tag.get('tagE').size).to.be.eql(0)
    })



    it('should delete a tag', function () {
        Tag.add(item, 'tagF')
        const tagF = Tag.get('tagF')
        Tag.destroy('tagF')

        expect(Tag.get('tagF') !== tagF).to.be.ok()
    })



    it('should get tag by name or by the tag itself', function () {
        const tagG = Tag.get('tagG')
        expect(Tag.get('tagG') === Tag.get(tagG)).to.be.ok()
    })



    it('define a tag getter with namespace', function () {
        const CustomTag = Tag.namespace('customA')
        Tag.add(item, CustomTag.get('tagH'))
        expect(Tag.has(item, 'customA.tagH')).to.be.ok()
    })



    it('define a tag checker with namespace', function () {
        const CustomTag = Tag.namespace('customB')
        expect(CustomTag.isExists('tagI')).to.not.be.ok()
        Tag.create('customB.tagI')
        expect(CustomTag.isExists('tagI')).to.be.ok()
    })



    it('define a tag creator with namespace', function () {
        const CustomTag = Tag.namespace('customC')
        expect(CustomTag.create('tagJ')).to.be.ok()
        expect(CustomTag.create('tagJ')).to.not.be.ok()
    })


})
