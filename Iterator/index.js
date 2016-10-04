/**
 * generate iterator promise
 */
class Weather {
    constructor(cities) {
        this.cities = cities;
    }
    fetch(city){
        return new Promise((resolve,reject)=>{
            setTimeout(() => resolve('city:'+city),10);
        });
    }
    *[Symbol.iterator]() {
        for (let city of this.cities) {
            yield this.getWeather(city);
        }
    }
    getWeather(city) {
        return this.fetch(city);
    }
}
/**
 * generate primeNum in [start,end)
 */
class PrimeNumbers {
    constructor(start,end){
        this.start = start;
        this.end = end;
    }
    static isPrimeNum(k){
        for(var i=2;i<k;i++){
            if(k%i == 0) return false;
        }
        return true;
    }
    *[Symbol.iterator](){
        for(var i=this.start;i<this.end;i++){
            if(PrimeNumbers.isPrimeNum(i)){
                yield i;
            }
        }
    }
}
function zip(...args){
    let lens = args.map(x => x.length);
    let min_len = Math.min(...lens);
    let result = [];
    for(let i=0;i<min_len;i++){
        result.push(args.map(arr => arr[i]));
    }
    return result;
}
function chain(...args){
    return args.reduce((s,t) => [...s,...t],[]);
}
module.exports = {
    Weather,
    PrimeNumbers,
    zip,
    chain
};