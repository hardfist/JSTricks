var expect= require('chai').expect;
var util = require('./index');
describe('Date function test',function(){
    it('#geDatePeriod',function(){
        var day1 = new Date();
        var day2 = new Date();
        day2.setDate(day2.getDate()+1);
        var diff = util.getDatePeriod(day1,day2);
        expect(diff).to.eql(1);
    })
    it('#getFirstDateInMonth',function(){
        var day1 = new Date();
        var day2 = util.getFirstDateInMonth(day1);
        console.log(day2)
    })
})