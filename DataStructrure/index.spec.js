var util = require('./index');
var chai = require('chai');
var expect = require('chai').expect;
describe('数据结构与算法测试',function(){
    it('#range',function(){
        expect(util.range(1,5)).to.deep.equal([1,2,3,4])
    });
    it('#zip',function(){
        expect(util.zip(['a','b','c'],[1,2,3])).to.deep.equal([['a',1],['b',2],['c',3]]);
    });
    it('#arrays2dict',function(){
        let dict = {a:1,b:2,c:3};
        expect(util.arrays2dict(['a','b','c'],[1,2,3])).to.deep.equal(dict);
    });
    it('#filterKey',function(){
        expect(util.filterKey({a:1,b:2},x => x == 'b')).to.deep.equal({b:2});
    });
    it('#filterValue',function(){
        expect(util.filterValue({a:1,b:2},x => x === 2)).to.deep.equal({b:2});
    });
    it('#namedArray',function(){
        var arr = ['yj',20,1024];
        var names = ['name','age','id'];
        util.namedArray(arr,names);
        expect(arr.name).to.equal('yj');
        expect(arr.age).to.equal(20);
        expect(arr.id).to.equal(1024);
    });
    it('#randInt',function(){
        let arr = Array.from({length:10},() => util.randInt(1,10));
        expect(arr).to.satisfy(arr => {
            return arr.every(x => x >=1 && x<10 && x%1==0);
        })
    });
    it('#countFrequency',function(){
        let arr = [1,2,2,3,3,3,4,4,4,4];
        let dict = util.countFrequency(arr);
        expect(dict).to.deep.equal({
            1:1,
            2:2,
            3:3,
            4:4
        })
    });
    it('#countWord',function(){
        return util.countWord('../resources/word.txt')
            .then(dict =>{
                expect(dict).to.deep.equal({
                    1:1,
                    2:2,
                    3:3,
                    4:4
                })
            })

    })
});