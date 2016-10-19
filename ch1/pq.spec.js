let expect = require('chai').expect;
let PQ = require('./pq');
describe('testing Priority Queue',function(){
    it('#PQ',function(){
        let pq = new PQ();
        let arr = Array.from({length:10},(_) => Math.floor(Math.random()*100));
        for(let x of arr){
            pq.push(x);
        }
        arr.sort((e1,e2) => e1 - e2);
        let c = []
        while(!pq.empty()){
            let top = pq.pop();
            c.unshift(top);
        }
        expect(c).to.eql(arr);
    })
})