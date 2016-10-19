class HashTable{
    constructor(){
        this.data = [];
    }
    hash(key){
        let hash = 0;
        for(let i=0;i<key.length;i++){
            let code = key.charCodeAt(i);
            hash = ((hash<<5) -hash) + code | 0
        }
    }
}