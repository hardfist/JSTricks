var getDatePeriod  = function(start,finish){
    return Math.abs(start*1 - finish*1)/60/60/1000/24;
}
var getFirstDateInMonth = function(date){
    return new Date(date.getFullYear(),date.getMonth(),2);
}
var util = module.exports = {
    getDatePeriod,
    getFirstDateInMonth
}   