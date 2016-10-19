function quick_sort(a,lo,hi){
    if(lo>=hi) return;
    let pivot = a[hi];
    let k=lo;
    for(let i=lo;i<hi;i++){
        if(a[i]<=pivot){
            a[k++] = a[i]
        }
    }
    [a[k],a[hi]] = [a[hi],a[k]]
    
}
module.exports={
    quick_sort
};