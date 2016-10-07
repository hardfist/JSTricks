var util = require('./index');
var expect = require('chai').expect;
describe('对象迭代与反迭代',function(){
    it('Weather',function(){
        var weather = new util.Weather(['北京','南京','天津']);
        var promises = [...weather];
        return Promise.all(promises).then(arr=>{
            expect(arr).to.eql(['city:北京','city:南京','city:天津']);
        });
    });
    it('PrimeNumbers',function(){
        var primeGen = new util.PrimeNumbers(2,10);
        var arr = [...primeGen];
        expect(arr).to.eql([2,3,5,7]);
    });
    it('#zip',function(){
        var a = [1,2,3];
        var b = ['a','b','c'];
        var c = ['x','y','z'];
        var arrs = util.zip(a,b,c);
        expect(arrs).to.eql([[1,'a','x'],[2,'b','y'],[3,'c','z']]);
    });
    it('#chain',function(){
        var a = [1,2,3];
        var b = ['a','b','c'];
        var c = ['x','y','z'];
        var arrs = util.chain(a,b,c);
        expect(arrs).to.eql([1,2,3,'a','b','c','x','y','z']);
    });
});