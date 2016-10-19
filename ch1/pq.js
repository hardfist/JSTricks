/** Max priority queue */
class PQ{
    constructor(){
        this.pq = []
    }
    empty(){
        return this.pq.length == 0
    }
    size(){
        return this.pq.length;
    }
    top(){
        return this.pq[0];
    }
    pop(){
        let a = this.pq;
        let max_v = this.pq[0];
        let n = this.pq.length;
        [a[0],a[n-1]] = [a[n-1],a[0]]
        this.pq.pop();
        this.sink(0)
        return max_v;
    }
    push(x){
        this.pq.push(x);
        this.swim(this.pq.length-1);
    }
    swim(k){
        let a = this.pq
        let par = x => Math.floor((x-1)/2);
        while(k>0 && a[k] > a[par(k)]){
            [a[k],a[par(k)]] = [a[par(k)],a[k]];
            k = par(k);
        }
    }
    sink(k){
        let a = this.pq;
        let left = x => 2*x+1;
        let right = x => 2*x+2;
        let N = a.length;
        while(left(k) < N){
            let j = left(k);
            let r = j+1;
            if(r < N && this.pq[r] > this.pq[j]) j++
            if(a[k] >= a[j]) break;
            [a[k],a[j]] = [a[j],a[k]];
            k = j;
        }
    }
}
module.exports = PQ;