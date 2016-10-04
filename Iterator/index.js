var fetch = require('node-fetch');
var querystring = require('querystring');
function getWeather(city){
    var url = 'http://wthrcdn.etouch.cn/weather_mini?city='+querystring.escape(city);
    return fetch(url)
        .then(x => x.json())
        .then(x => x.data.forecast[0])
        .then(x => `${city}: ${x.low} ${x.high}`)
}
class Weather{
    constructor(cities){
        this.cities = cities
    }
    *[Symbol.iterator](){
        for(let city of this.cities){
            yield getWeather(city)
        }
    }
}
var weather = new Weather(['北京','南京','天津']);
var promises = [...weather];
Promise.all(promises).then(arr=>{
    console.log(arr);
});