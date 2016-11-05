var str = function(s){
    if(typeof s != "string"){
        throw new TypeError("Expected a string");
    }else{
        return s;
    }
}
var any = function(x) { return x}
var typeOf = function(type){
    type = str(type)
    return function(p){
        if(typeof p != type){
            throw new TypeError(`Expected a ${type}!`)
        }else{
            return p
        }
    }
}
// function 

// test case

var maybeUnit = function(x){
    return function(x){
        x = c(x)
        return maybe(c)(some(x))
    }
}

function arrOfFlatten(c){
    return function(x){
        x = arrOf(arrOf(c))(x)
        var result = [],len = x.length;
        for(var i=0;i<len;i++){
            result = result.concat(x[i])
        }
        return result
    }
}
function maybeFlatten(c){
    return function(mmx){
        mmx= maybe(maybe(c))(mmx)
        var result = mmx
        if(result instanceof Some){
            result = result.x 
        }else if(result instanceof None){
            result = result
        }
        return maybe(c)(result)
    }
}
var twice = function(functor){
    return function(c){
        return functor(functor(c))
    }
}
var once = function(functor){
    return function(c){
        return functor(c)
    }
}
var noTimes = function(functor){
    return function(c){
        return c;
    }
}
function repeat(x){
    return x+x;
}


var bool = typeOf("boolean")
var obj = typeOf("object")
var number = typeOf("number")
var arr = function(a){
    if({}.toString.call(a) != ["[object Array]"]){
        throw new TypeError("Expect an array!")
    }else{
        return a
    }
}
var arrOf = function(c){
    return function(a){
        return arr(a).map(c)
    }
}
Array.unit = function(c){
    return [x]
}
Array.prototype.flatten = function(c){
    if(c === void 0){
        c = any 
    }
    return arrOfFlatten(c)(this)
}
var Maybe = function(){}
Maybe.unit = some;
Maybe.prototype.getOrElse = function(x){
    if(this instanceof Some){
        return this.x;
    }else{
        return x
    }
}
Maybe.prototype.flatten = function(c){
    if(c === void 0){
        c = any;
    }
    return maybeFlatten(c)(this)
}
var None = function (){}
None.prototype = Object.create(Maybe.prototype)
None.prototype.toString = function() { return "None"}

var none = new None()
var Some= function(x) {
    this.x = x 
}
Some.prototype = Object.create(Maybe.prototype)
Some.prototype.toString = function(){
    return `Some(${this.x})`
}
var none = new None 
var some = function(x){
    return new Some(x)
}
var maybe = function(c){
    return function(m){
        if(m instanceof None){
            return m 
        }else if(m instanceof Some){
            return some(c(m.x))
        }else{
            throw new TypeError('Expected None or Some(value)!');
        }
    }
}
var arrOfUnit = function(c){
    return function(x){
        x = noTimes(arrOf)(x)
        return once(arrOf)(c)([x])
    }
} 


