import expect from 'expect.js'
import {
    tag,
    untag,
    hasTag,
    findByTag,
    eachByTag
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



    it('should iterate on items by tag', function () {
        const _countries = []
        eachByTag('country', (country) => _countries.push(country))
        expect(_countries).to.be.eql(countries)
    })


})
