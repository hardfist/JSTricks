 var $$ = jquery = function(selector){
    return new jquery.fn.init(selector)
}
jquery.fn = jquery.prototype = {
    version: '2.1',
    init:function(selector){
        this.selector = selector
        return this;
    },
    constructor:jquery
}
jquery.fn.init.prototype = jquery.fn 

jquery.extend = jquery.fn.extend = function(){
    var options,src,copy,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length;
    if(i === length){
        target = this;
        i--;
    }
    for(;i<length;i++){
        if((options = arguments[i]) != null){
            for(name in options){
                copy = options[name]
                target[name] = copy;
            }
        }
    }
    return target;
}

jquery.fn.extend({
    setName: function(myName){
        this.myName = myName
        return this;
    },
    getName:function(){
        console.log(this.myName)
        return this;
    }
})
var expando = 'jQuery' + (new Date()).getTime(),uuid =0,windowData = 0;
jquery.extend({
    cache:{},
    data:function(elem,name,data){
        elem = elem === global ? windowData : elem
        var id = elem[expando]
        if(!id){
            id = elem[expando] = ++uuid;
        }
        if(name && !jquery.cache[id]){
            jquery.cache[id] = {}
        }
        if(data != undefined){
            jquery.cache[id][name] = data;
        }
        return name ? jquery.cache[id][name] : jquery.cache[id]
    },
    removeData:function(elem,name){
        elem = elem == global ? windowData : elem;
        var id = elem[expando]
        if(name){
            if(jquery.cache[id]){
                delete jquery.cache[id][name]
                name = ""
                if(Object.keys(jquery.cache[id]).length == 0){
                    jquery.removeData(elem)
                }
            }
        }else{
            try{
                delete elem[expando]
            }catch(e){
                if(elem.removeAttribute){
                    elem.removeAttribute(expando)
                }
            }
            delete jquery.cache[id]
        }
    }
})
var obj = {}
$$.data(obj,'hello','world')
$$.data(obj,'test','fuck')
console.log($$.data(obj,'hello'))
console.log($$.data(obj))
$$.removeData(obj,'hello')
console.log($$.data(obj))