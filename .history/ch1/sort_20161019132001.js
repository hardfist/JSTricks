function quick_sort(a,lo,hi){
    if(lo>=hi) return;
    let pivot = a[hi];
    let k = lo;
    for(let i=lo;i<hi;i++){
        if(a[i]<=pivot){
            [a[i],a[k]] = [a[k],a[i]];
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