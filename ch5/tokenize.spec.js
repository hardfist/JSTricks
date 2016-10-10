let util = require('./regexp');
let expect = require('chai').expect;
describe('fsa',function(){
    it('dfa',function(){
        expect(util.recognize1('aab')).to.be.true;
        expect(util.recognize1('aabs')).to.be.false;
        expect(util.recognize2('aab')).to.be.true;
        expect(util.recognize2('aabc')).to.be.false;
        expect(util.recognize3('011')).to.be.true;
        expect(util.recognize3('111')).to.be.false;
    })
})