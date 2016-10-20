class BinarySearchST{
    constructor(){
        this.data = [];
    }
    put(key,value){
        
    }
    get(key){
        if(this.empty()) return null;
        let i = this.rank(key);
        if(i < this.data.length && this.data[i].key == key){
            return this.data[i].value;
        }
        return null;
    }
    empty(){
        return this.data.length == 0;
    }
}