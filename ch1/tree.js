class Tree{
    constructor(val,left=null,right=null){
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
function insert(root,val){
    return root == null ? new Tree(val)
        :  val < root.val ? (root.left = insert(root.left,val),root)
        :  (root.right = insert(root.right,val),root)
}
function build(xs){
    return xs.reduce((root,val) => insert(root,val),null);
}
function inorder(root,fn){
    if(root!=null) {
        inorder(root.left,fn);
        fn(root.val);
        inorder(root.right,fn);
    }
}
function tree_reduce(root,fn,e){
    return root == null ? e 
        : fn(tree_reduce(root.left,fn,e),root.val,tree_reduce(root.right,fn,e))
}
function size(root){
    return tree_reduce(root,(l,_,r) => l+1+r,0);
}
function sum(root){
    return tree_reduce(root,(l,x,r) => l+x+r,0);
}
function depth(root){
    return tree_reduce(root,(l,x,r) => 1 + Math.max(l,r),0)
}
function flatten(root){
    return tree_reduce(root,(l,x,r) => [...l,x,...r],[]);
}
function treeMax(root){
    return tree_reduce(root,(l,x,r) => Math.max(l,x,r),Number.MIN_VALUE);
}
Object.assign(Tree,{
    insert,
    build,
    inorder,
    tree_reduce,
    size,
    sum,
    depth,
    flatten,
    treeMax
})
module.exports = Tree;