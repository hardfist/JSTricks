var util = require('./index');
var DS = require('./ds');
var chai = require('chai');
var expect = require('chai').expect;
describe('数据结构测试',function(){
    it('deque',function(){
        let history = new DS.Deque([],3);
        history.append(1);
        expect(history.dump()).eql([1]);
        history.append(2);
        expect(history.dump()).eql([1,2]);
        history.append(3);
        expect(history.dump()).eql([1,2,3]);
        history.append(4);
        expect(history.dump()).eql([2,3,4]);
    })
});