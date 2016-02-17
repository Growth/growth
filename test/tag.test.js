import expect from 'expect.js'
import {
    createTag,
    checkTag,
    getTag,
    tag,
    untag,
    hasTag,
    clearTag,
    deleteTag,
    tagGetter,
    tagChecker,
    tagCreator
} from '../lib/tag'



describe('Tag', function () {

    const item = {}
    const countries = ['France', 'Spain', 'Germany']



    it('should tag an item', function () {
        tag(item, 'tagA')
        expect(hasTag(item, 'tagA')).to.be.ok()

        const tagB = getTag('tagB')
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

        expect(getTag('country')).to.be.eql(new Set(countries))
    })



    it('should clear a tag', function () {
        countries.forEach((country) => tag(country, 'tagE'))
        clearTag('tagE')

        expect(getTag('tagE').size).to.be.eql(0)
    })



    it('should delete a tag', function () {
        tag(item, 'tagF')
        const tagF = getTag('tagF')
        deleteTag('tagF')

        expect(getTag('tagF') !== tagF).to.be.ok()
    })



    it('should get tag by name or by the tag itself', function () {
        const tagG = getTag('tagG')
        expect(getTag('tagG') === getTag(tagG)).to.be.ok()
    })



    it('define a tag getter with namespace', function () {
        const getCustom = tagGetter('customA')
        tag(item, getCustom('tagH'))
        expect(hasTag(item, 'customA.tagH')).to.be.ok()
    })



    it('define a tag checker with namespace', function () {
        const checkCustom = tagChecker('customB')
        expect(checkCustom('tagI')).to.not.be.ok()
        createTag('customB.tagI')
        expect(checkCustom('tagI')).to.be.ok()
    })



    it('define a tag creator with namespace', function () {
        const createCustom = tagCreator('customC')
        expect(createCustom('tagJ')).to.be.ok()
        expect(createCustom('tagJ')).to.not.be.ok()
    })


})
