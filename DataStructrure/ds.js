class Deque{
    constructor(arr,n){
        if(arr !== void 0){
            this.container = [...arr];
        }
        if(n !== void 0){
            this.capacity = n;
        }
        this.container = this.container || []
    }
    append(item){
        this.container.push(item);
        if(this.capacity != null && this.container.length > this.capacity){
            this.container.shift()
        }
    }
    pop(){

    }
    dump(){
        return this.container;
    }
}
module.exports = {
    Deque
};