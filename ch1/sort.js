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
module.exports={
    quick_sort
};