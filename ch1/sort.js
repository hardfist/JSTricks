const PQ = require('./pq'); 
function quick_sort(a,lo,hi){
    if(lo>=hi) return;
    let k = lo;
    let pivot = a[hi];
    for(let i=lo;i<hi;i++){
        if(a[i]<=pivot){
            [a[k],a[i]] = [a[i],a[k]];
            k++;
        }
    }
    [a[k],a[hi]] = [a[hi],a[k]];
    quick_sort(a,lo,k-1);
    quick_sort(a,k+1,hi);
}
function merge_sort(a,lo,hi){
    if(hi-lo<=1) return;
    let mid = Math.floor((hi+lo)/2);
    merge_sort(a,lo,mid);
    merge_sort(a,mid,hi);
    let c = [];
    let i=lo,j=mid;
    while(i<mid && j<hi){
        if(a[i]<a[j]) c.push(a[i++])
        else c.push(a[j++]);
    }
    while(i<mid) c.push(a[i++]);
    while(j<hi) c.push(a[j++]);
    for(let i=lo;i<hi;i++){
        a[i] = c.shift();
    }
}
function insert_sort(a,lo,hi){
    for(let i=lo+1;i<hi;i++){
        let pivot = a[i];
        let j = i-1;
        while(j>=0 && a[j]>pivot){
            a[j+1] = a[j];
            j--;
        }
        a[j+1] = pivot;
    }
}
function bubble_sort(a,lo,hi){
    for(let i=lo;i<hi;i++){
        for(let j=i;j>0;j--){
            if(a[j] < a[j-1]){
                [a[j],a[j-1]] = [a[j-1],a[j]];
            }
        }
    }
}
function select_sort(a,lo,hi){
    for(let i=lo;i<hi;i++){
        let index = i;
        for(let j=i+1;j<hi;j++){
            if(a[j]<a[index]){
                index = j;
            }
        }
        [a[i],a[index]] = [a[index],a[i]];
    }
}
function heap_sort(a,lo,hi){
    const pq = new PQ();
    for(let i=lo;i<hi;i++){
        pq.push(a[i]);
    }
    let k= hi-1;
    let c = [];
    while(!pq.empty()){
        let top = pq.pop();
        a[k--] = top;
        c.unshift(top);
    }
}
module.exports={
    quick_sort,
    merge_sort,
    insert_sort,
    bubble_sort,
    select_sort,
    heap_sort
};