let expect = require('chai').expect;
let Tree = require('./tree');
describe('tree',function(){
    it('',function(){
        let xs = [5,4,3,2,1];
        let b = [];  
        let root = Tree.build(xs);
        let sorted = xs.sort((e1,e2) => e1 -e2);
        Tree.inorder(root,x => b.push(x));
        let size = Tree.size(root);
        let sum = Tree.sum(root);
        let depth = Tree.depth(root);
        let flatten = Tree.flatten(root);
        expect(b).eql(sorted);
        expect(size).eql(5);
        expect(sum).eql(15);
        expect(depth).eql(5);
        expect(flatten).eql([1,2,3,4,5]);
    })
})