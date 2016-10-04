var fs = require('fs');
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
    if(arguments.length == 1){
        return Array.from({length:lo},(_,i) => i);
    }
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
 * get [[key,value]] from dict
 * @param dict
 * @returns {Array}
 */
function dict2arrays(dict){
    let keys = Object.keys(dict);
    let result = [[],[]];
    for(let key of keys){
        result[0].push(key);
        result[1].push(dict[key]);
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
 * calculate word frequency
 * @param arr
 * @returns {*}
 */
function countFrequency(arr){
    return arr.reduce((dict,x)=> (dict[x] = (dict[x] || 0)+1,dict),{})
}
/**
 * calculate word frequency in file
 * @param filePath
 * @returns {Promise.<TResult>}
 */
function countWord(filePath){
    function count(lines){
        let words = lines.split(/\s+/);
        return countFrequency(words);
    }
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,function(err,data){
            if(err){
                return reject(err)
            }else{
                return resolve(data.toString());
            }
        })
    }).then(count);
}
function sortDict(dict){
    let keys = Object.keys(dict);
    keys.sort((a,b) =>{
        return dict[a] < dict[b] ? -1 :
            dict[a] > dict[b] ? 1 :
                0;
    });
    return keys;
}
/**
 * set union
 * @param a
 * @param b
 * @returns {Set}
 */
function union(a,b){
    return new Set([...a,...b]);
}
/**
 * set intersect
 * @param a
 * @param b
 * @returns {Set}
 */
function intersect(a,b){
    return new Set([...a].filter(x => b.has(x)));
}
/**
 * set diff
 * @param a
 * @param b
 * @returns {Set}
 */
function diff(a,b){
    return new Set([...a].filter(x => !b.has(x)))
}
module.exports ={
    range,
    zip,
    arrays2dict,
    dict2arrays,
    filterKey,
    filterValue,
    namedArray,
    randInt,
    countFrequency,
    countWord,
    sortDict,
    union,
    intersect,
    diff
};