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
function max_diff(a){
    let dp = [];
    let lo = a[0],hi = a[0],diff = 0;
    for(let i=1;i<a.length;i++){
        if(a[i]>=lo && a[i]<=hi) continue;
        if(a[i]<lo){
            let x = lo - a[i];
            diff = Math.max(x,diff);
            lo = a[i];
        }
        if(a[i]>hi){
            let x = a[i] - hi;
            diff = Math.max(x,diff);
            hi = a[i];
        }
    }
    console.log(diff);
}
max_diff([4,1,7,5]);
function repeat(n,ch){
    let str = '';
    while(n){
        if(n%2){
            str += str;
            n/=2
        }else{
            n--;
            str+=ch;
        }
    }
}