let util = require('./sort');
let expect = require('chai').expect;
function randInt(a,b){
    return Math.floor(Math.random()*(b-a))+a;
}
describe('sort',function(){
    it('#quick_sort',function(){
        let a = Array.from({length:20},() => randInt(1,100));
        let copy = Array.from(a);
        a.sort((e1,e2) => e1 - e2);
        util.quick_sort(copy,0,copy.length-1);
        expect(copy).to.eql(a);
    })
});