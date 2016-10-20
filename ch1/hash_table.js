class HashTable{
    constructor(){
        this.data = [];
    }
    hashKey(key){
        let sum = 0;
        for(let i=0;i<key.length;i++){
            let code = key.charCodeAt(i);
            sum = ((sum<<5) - sum) + code | 0
        }
        return sum;
    }
    set(key,value){
         let idx = this.hashKey(key);
         this.data[idx] = this.data[idx] || {}
         this.data[idx].push(value); 
    }
}