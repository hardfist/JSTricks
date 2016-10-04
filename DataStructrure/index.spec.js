var util = require('./index');
var chai = require('chai');
var expect = require('chai').expect;
describe('数据结构与算法测试',function(){
    it('#range',function(){
        expect(util.range(5)).eql([0,1,2,3,4]);
        expect(util.range(1,5)).eql([1,2,3,4])
    });
    it('#zip',function(){
        expect(util.zip(['a','b','c'],[1,2,3])).eql([['a',1],['b',2],['c',3]]);
    });
    it('#arrays2dict',function(){
        let dict = {a:1,b:2,c:3};
        expect(util.arrays2dict(['a','b','c'],[1,2,3])).eql(dict);
    });
    it('#dict2arrays',function(){
       let dict = {a:1,b:2,c:3};
       expect(util.dict2arrays(dict)).eql([['a','b','c'],[1,2,3]])
    });
    it('#filterKey',function(){
        expect(util.filterKey({a:1,b:2},x => x == 'b')).eql({b:2});
    });
    it('#filterValue',function(){
        expect(util.filterValue({a:1,b:2},x => x === 2)).eql({b:2});
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
        expect(dict).eql({
            1:1,
            2:2,
            3:3,
            4:4
        })
    });
    it('#countWord',function(){
        return util.countWord('../resources/word.txt')
            .then(dict =>{
                expect(dict).eql({
                    1:1,
                    2:2,
                    3:3,
                    4:4
                })
            })

    });
    it('#sortDict',function(){
        let dict = {
            a:3,
            b:4,
            c:1,
            d:2,
            f:5
        };
        let res = util.sortDict(dict);
        expect(res).eql(['c','d','a','b','f']);
    });
    it('#union',function(){
        let a = new Set([1,2,3]);
        let b = new Set([2,3,4]);
        let res = util.union(a,b);
        expect([...res]).eql([1,2,3,4]);
    });
    it('#intersect',function(){
        let a = new Set([1,2,3]);
        let b = new Set([2,3,4]);
        let res = util.intersect(a,b);
        expect([...res]).eql([2,3]);
    });
    it('#diff',function(){
        let a = new Set([1,2,3]);
        let b = new Set([2,3,4]);
        let res = util.diff(a,b);
        expect([...res]).eql([1]);
    })
});