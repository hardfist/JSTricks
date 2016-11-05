var fs = require('fs')
var compose = (f,g) => x => f(g(x))
var unit = x => [x]
var lift = f => (x => unit(f(x)))

var bind = (function(f){
    return function(list){
        var output = []
        for(var i=0;i<list.length;i++){
            output = output.concat(f(list[i]))
        }
        return output;
    }
})
var bind2 = function(list,f){
    var result = [];
    for(var i=0,n=list.length;i<n;i++){
        result = result.concat(f(list[i]))
    }
    return result;
}
var pipe = function(x,functions){
    for(var i=0,n=functions.length;i<n;i++){
        x = bind2(x,functions[i])
    }
    return x
}
var byTagName = function(name){
    return  [...document.getElementsByTagName(name)];
    
}
var classNames = function(node){
    return node.className.split(/\s+/);
}
var readFile = function(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,content)=>{
            if(err) {
                reject(err)
            }else{
                console.log('content:',content)
                resolve(content.toString())
            }
        })
    })
}
var delay = function(data){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log('delay')
            resolve(data)
        },1000)
    })
}
var print = function(data){
    return new Promise((resolve,reject)=>{
        console.log(data);
        resolve(data);
    })
}

var unit3 = function(x){
    return Promise.resolve(x)
}
var bind3 = function(input,f){
    return input.then(function(data){
        return f(data)
    })
}
var pipe3 = function(x,functions){
    for(var i=0,n=functions.length;i<n;i++){
        x = bind3(x,functions[i])
    }
    return x
}
pipe3(unit3("test.json"),[readFile,delay,print])