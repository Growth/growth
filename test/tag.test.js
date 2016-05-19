import expect from 'expect.js'
import Tag from '../lib/tag'



describe('Tag', function () {


    const item = {}
    const countries = ['France', 'Spain', 'Germany']



    it('should tag an item', function () {
        Tag.set(item, 'tagA')
        expect(Tag.has(item, 'tagA')).to.be.ok()
        // 
        // const tagB = Tag.get('tagB')
        // Tag.set(item, tagB)
        // expect(Tag.has(item, tagB)).to.be.ok()
    })



    it('should untag an item', function () {
        Tag.unset(item, 'tagC')
        expect(Tag.has(item, 'tagC')).to.not.be.ok()
    })



    it('should check if a tag has an item', function () {
        Tag.set(item, 'tagD')
        expect(Tag.has(item, 'tagD')).to.be.ok()
    })



    it('should get a tag', function () {
        countries.forEach((country) => Tag.set(country, 'tagD'))

        expect(Tag.get('country')).to.be.eql(new Set(countries))
    })



    it('should clear a tag', function () {
        countries.forEach((country) => Tag.set(country, 'tagE'))
        Tag.clear('tagE')

        expect(Tag.get('tagE').size).to.be.eql(0)
    })



    it('should delete a tag', function () {
        Tag.set(item, 'tagF')
        const tagF = Tag.get('tagF')
        Tag.destroy('tagF')

        expect(Tag.get('tagF') !== tagF).to.be.ok()
    })



    it('should get tag by name or by the tag itself', function () {
        const tagG = Tag.get('tagG')
        expect(Tag.get('tagG') === Tag.get(tagG)).to.be.ok()
    })



    it('should get a tag with namespace', function () {
        const CustomTag = Tag.namespace('customA')
        Tag.set(item, CustomTag.get('tagH'))
        expect(Tag.has(item, 'customA.tagH')).to.be.ok()
    })



    it('should check if a tag exists with namespace', function () {
        const CustomTag = Tag.namespace('customB')
        expect(CustomTag.exists('tagI')).to.not.be.ok()
        Tag.create('customB.tagI')
        expect(CustomTag.exists('tagI')).to.be.ok()
    })



    it('should create a tag with namespace', function () {
        const CustomTag = Tag.namespace('customC')
        expect(CustomTag.create('tagJ')).to.be.ok()
        expect(CustomTag.create('tagJ')).to.not.be.ok()
    })



    it('should tag an item with namespace', function () {
        const CustomTag = Tag.namespace('customD')
        CustomTag.set(item, 'tagH')
        expect(CustomTag.has(item, 'tagH')).to.be.ok()
    })



    it('should untag an item with namespace', function () {
        const CustomTag = Tag.namespace('customE')
        CustomTag.unset(item, 'tagI')
        expect(CustomTag.has(item, 'tagI')).to.not.be.ok()
    })



    it('should check if a tag has an item with namespace', function () {
        const CustomTag = Tag.namespace('customF')
        CustomTag.set(item, 'tagJ')
        expect(CustomTag.has(item, 'tagJ')).to.be.ok()
    })



})
