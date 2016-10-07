/**
 * split s using delimiter in ds
 * @param s
 * @param ds
 * @returns {*}
 * @example
 */
function mySplit(s,ds){
    return ds.split('').reduce((res,d)=>{
        return res.reduce((s,t) =>{
            return s.concat(t.split(d));
        },[])
    },[s]);
}
function convertDate(date){
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/g,'$2/$3/$1')
}
function padding_left(str,n,fillchar = ' '){
    let diff = n - str.length > 0  ? n-str.length : 0;
    return (new Array(diff+1)).join(fillchar)+ str;
}
function padding_right(str,n,fillchar = ' '){
    let diff = n - str.length > 0 ? n - str.length : 0;
    return str + (new Array(diff+1)).join(fillchar)
}
function pretty_print(list){
    let max_len = Math.max(...list.map(x => x.length));
    let result = list.map(x => padding_left(x,max_len));
    return result.join('\n')
}
function remove_char(str,char){
    return str.split(char).join('');
}
module.exports = {
    mySplit,
    convertDate,
    padding_left,
    padding_right,
    pretty_print,
    remove_char
};