/**
 * generate range in [lo,hi] with step
 * @param lo
 * @param hi
 * @param step
 * @returns {Array}
 * @example
 * // returns [1,3,5,7,9]
 * range(1,2,10)
 */
function range(lo,hi,step=1){
    return Array.from({length:hi-lo},(_,i) => lo+i*step)
}
/**
 * combine two arrays
 * @param left
 * @param right
 * @param fn
 * @returns {Array}
 * @example
 * // returns [['a',1],['b',2],['c',3]]
 * zip(['a','b','c'],[1,2,3])
 */
function zip(left,right,fn=(l,r) => [l,r]){
    var counter, results = [];
    for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
        results.push(fn(left[counter],right[counter]));
    }
    return results;
}
/**
 * combine keys and values into dict
 * @param keys
 * @param values
 * @returns {Map}
 * @example
 * // returns  Map(a=>1,b=>2,c=>3)
 * arrays2dict(['a','b','c'],[1,2,3]) =>
 */
function arrays2dict(keys,values){
    return new Map(zip(keys,values));
}
/**
 * filter by key
 * @param dict
 * @param fn
 * @returns {Map}
 * @example
 * // return {b=>2}
 * filterValue({a=>1,b=>2},x => x=='b')
 */
function filterKey(dict,fn){
    let result = new Map();
    for(let [key,value] of dict){
        if(fn(key)){
            result.set(key,value)
        }
    }
    return result;
}
/**
 * filter by value
 * @param dict
 * @param fn
 * @returns {Map}
 * @example
 * // returns {b => 2}
 * filterValue({a=>1,b=>2},x => x==2)
 */
function filterValue(dict,fn){
    let result = new Map();
    for(let [key,value] of dict){
        if(fn(value)){
            result.set(key,value);
        }
    }
    return result;
}
/**
 * filter set
 * @param s
 * @param fn
 * @returns {Set}
 * @example
 * // returns {2}
 * filterSet({1,2,3},x => x%2 ==0)
 */
function filterSet(s,fn){
    let result = new Set();
    for(let key of s){
        if(fn(key)){
            result.add(s);
        }
    }
    return result;
}