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
 * // returns {a:1,b:2,c:3}
 * arrays2dict(['a','b','c'],[1,2,3]) =>
 */
function arrays2dict(keys,values){
    let result = Object.create(null);
    for(let i=0;i<Math.min(keys.length,values.length);i++){
        result[keys[i]] = values[i];
    }
    return result;
}
/**
 *
 * @param dict
 * @param fn
 * @returns {Object}
 * @example
 * // returns
 * filterKey({a:1,b:2},x => x === 'a')
 */
function filterKey(dict,fn){
    let result = Object.create(null);
    for(let key of Object.keys(dict)){
        let value = dict[key];
        if(fn(key)){
            result[key] = value;
        }
    }
    return result;
}
/**
 *
 * @param dict
 * @param fn
 * @returns {Object}
 */
function filterValue(dict,fn){
    let result = Object.create(null);
    for(let key of Object.keys(dict)){
        let value = dict[key];
        if(fn(value)){
            result[key] = value;
        }
    }
    return result;
}
/**
 *
 * @param arr
 * @param names
 * @example
 * // returns arr; arr[first] == 1 && arr[second] == 2 && arr[third] == 3
 * namedArray([1,2,3],['first','second','third'])
 */
function namedArray(arr,names){
    for(let i=0;i<Math.min(arr.length,names.length);i++){
        arr[names[i]] = arr[i];
    }
    return arr;
}
/**
 * generate random integer in [lo,hi)
 * @param lo
 * @param hi
 * @returns {*}
 * @example
 * //probably returns 3
 * randInt(0,10)
 */
function randInt(lo,hi){
    return Math.floor(Math.random()*(hi-lo))+lo;
}
/**
 *
 * @param arr
 */
function countFrequency(arr){

}
module.exports ={
    range:range,
    zip:zip,
    arrays2dict:arrays2dict,
    filterKey: filterKey,
    filterValue:filterValue,
    namedArray:namedArray,
    randInt,randInt
};