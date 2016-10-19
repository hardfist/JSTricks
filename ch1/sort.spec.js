let util = require('./sort');
let expect = require('chai').expect;
function randInt(a,b){
    return Math.floor(Math.random()*(b-a))+a;
}
describe('sort',function(){
    let a;
    let copy;
    let sorted_a;
    beforeEach(function(){
        a = Array.from({length:5},() => randInt(1,100));
        copy = [...a];
        sorted_a = [...a];
        sorted_a.sort((e1,e2) => e1 -e2);
    })
    
    it('#quick_sort',function(){
        util.quick_sort(copy,0,copy.length-1);
        expect(copy).to.eql(sorted_a);
    })
    it('#merge_sort',function(){
        util.merge_sort(copy,0,copy.length);
        expect(copy).to.eql(sorted_a);
    })
    it('#insert_sort',function(){
        util.insert_sort(copy,0,copy.length);
        expect(copy).to.eql(sorted_a);
    })
    it('#select_sort',function(){
        util.select_sort(copy,0,copy.length);
        expect(copy).to.eql(sorted_a);
    })
    it('#bubble_sort',function(){
        util.bubble_sort(copy,0,copy.length);
        expect(copy).to.eql(sorted_a);
    })
    it('#heap_sort',function(){
        util.heap_sort(copy,0,copy.length);
        expect(copy).to.eql(sorted_a);
    })
});