let List = require('./List');
let expect = require('chai').expect;
describe('List',function(){
    beforeEach(function(){

    })
    afterEach(function(){

    })
    it('#push',function(){
        let list = new List();
        let a = []
        for(let i=0;i<10;i++){
            a.push(i);
            list.push(i);
        }
        let b = [...list];
        expect(b).to.eql(a);
    })
    it('#unshift',function(){
        let list = new List();
        let a = [];
        for(let i=0;i<10;i++){
            a.push(i);
            list.unshift(i);
        }
        a = a.reverse();
        let b = [...list];
        expect(b).to.eql(a);
    })
    it('#pop',function(){
        let list = new List();
        let a = [];
        for(let i=0;i<10;i++){
            list.push(i);
            a.push(i);
        }
        while(!list.empty()){
            let x = list.pop();
            let y = a.pop();
            expect(x).to.eql(y);
        }
    })
    it('#shift',function(){

        let list = new List();
        let a = [];
        for(let i=0;i<10;i++){
            list.push(i);
            a.push(i);
        }
        let c = [];
        while(!list.empty()){
            let x = list.shift();
            let y = a.shift();
            expect(x).to.eql(y);
        }
    })
    it('#concat',function(){
        let a = List.from([1,2,3]);
        let b = List.from([4,5,6]);
        let c = a.concat(b);
        let arr = [...c];
        expect(arr).to.eql([1,2,3,4,5,6]);
    })
})
