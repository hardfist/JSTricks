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
jquery.extend({
    isEmptyObject(obj){
        return obj && typeof obj === 'object' && Object.keys(obj).length === 0
    }
})
/*
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
jquery.extend({
    makeArray(data){
        if(Array.isArray(data)){
            return [...data]
        }
        return [data]
    },
    queue:function(elem,type,data){
        if(elem){
            type = (type || 'fx') + 'queue'
            var q = jquery.data(elem,type)
            if(!q){
                 q = jquery.data(elem,type,jquery.makeArray(data))
            }else if(data){
                q.push(data)
            }
        }
        return q
    },
    dequeue:function(elem,type){
        var queue = jquery.queue(elem,type)
        fn = queue.shift()
        if(!type || type ==='fx'){
            fn = queue[0]
        }
        if(fn !== undefined){
            fn.call(elem)
        }
    }
})
*/

function Data(){
    this.cache = {};
}
Data.uid = 1;

Data.prototype = {
    locker:function(){
        var ovalueOf,
        unlock = owner.valueOf(Data)

        if(typeof unlock !== 'string'){
            unlock = jquery.expando + Data.uid++,
            ovalueOf = owner.valueOf

            Object.defineProperty(owner,"valueOf",{
                value:function(pick){
                    if(pick === Data){
                        return unlock;
                    }
                    return ovalueOf.apply(owner)
                }
            })
        }
        if(!this.cache[unlock]){
            this.cache[unlock] = {}
        }
        return unlock;
    },
    set:function(owner,data,value){
        var prop,cache,unlock;
        unlock = this.locker(owner);
        cache = this.cache[unlock]
        if(typeof data === 'string'){
            cache[data] = value;
        }else{
            if(jquery.isEmptyObject(cache)){
                cache = data 
            }else{
                for(prop in data){
                    cache[prop] = data[prop]
                }
            }
        }
        this.cache[unlock] = cache;
        return this;
    },
    get:function(owner,key){
        var cache = this.cache[this.locker(owner)]
        return key === undefined ? cache : cache[key]
    },
    access:function(owner,key,value){
        if(key === undefined || ((key && typeof key === 'string' && value === undefined))){
            return this.get(owner,key)
        }
        this.set(owner,key,value)
        return value !== undefined ? value: key;
    },
    remove:function(owner,key){

    },
    hasData:function(owner){

    },
    discard:function(owner){
        delete this.cache(this.locker(owner))
    }
}
var data_user = new Data();
var data_priv = new Data();

function data_discard(owner){
    data_user.discard(owner)
    data_priv.discard(owner);
}
jquery.extend({
    expando: "jQuery" + Math.random(),

    acceptData:function(){
        return true;
    },
    hasData:function(elem){
        return data_user.hasData(elem) || data_priv.hasData(elem)
    },
    data:function(elem,name,data){
        return data_user.access(elem,name,data)
    },
    removeData:function(elem,name){
        return data_user.remove(elem,name)
    },
    _data:function(elem,name,data){
        return data_priv.access(elem,name,data)
    },
    _removeData:function(elem,name){
        return data_priv.remove(elem,name)
    }
})
function Data (){
    this.cache = {}
}
Data.uid = 1

Data.prototype = {
    locker:function(owner){

    },
    set:function(owner,data,value){

    }
}

var obj = {}
function cb1(){
    console.log('test1')
}
function cb2(){
    console.log('test2')
}
$$.queue(obj,'testq',cb1);
$$.queue(obj,'testq',cb2);
console.log($$.data(obj))
console.log($$.queue(obj,'testq'))
$$.dequeue(obj,'testq')