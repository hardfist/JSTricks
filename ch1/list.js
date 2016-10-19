class Node{
    constructor(value,prev= null,next=null){
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}
class List{
    constructor(){
        this.head = new Node(null);
        this.head.prev = this.head.next = this.head;
    }
    static from(a){
        let list = new List();
        for(let x of a){
            list.push(x);
        }
        return list;
    }
    *[Symbol.iterator](){
        let cur = this.head.next;
        while(cur!=this.head){
            yield cur.value;
            cur = cur.next;
        }
    }
    empty(){
        return this.head.prev == this.head;
    }
    __add(cur,prev,next){
        next.prev = cur;
        cur.next = next;
        cur.prev = prev;
        prev.next= cur;
        
    }
    __del(cur){
        let [prev,next] = [cur.prev,cur.next];
        prev.next = next;
        next.prev = prev;
    }
    push(x){
        let cur = new Node(x);
        this.__add(cur,this.head.prev,this.head);
    }
    unshift(x){
        let cur = new Node(x);
        this.__add(cur,this.head,this.head.next);
    }   
    pop(){
        if(this.empty()) return;
        let val = this.head.prev.value;
        this.__del(this.head.prev);
        return val;
    }
    shift(){
        if(this.empty()) return;
        let val = this.head.next.value;
        this.__del(this.head.next);
        return val;
    }
    concat(b){
        let copy = List.from(this);
        for(let x of b){
            copy.push(x);
        }
        return copy;
    }
}
module.exports = List;