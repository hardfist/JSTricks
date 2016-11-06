//var P = require('pjs').P
var P = function(_superclass,definition){
    if(definition == void 0){
        definition = _superclass
        _superclass = Object 
    }
    function Son(...args){
        if(this instanceof Son){
            if(typeof this.init == 'function'){
                this.init.apply(this,args)
            }
        }else{
            return new Son(...args)
        }
    }
    function mixin(def){
        def(Son.prototype,_superclass.prototype)
        if(!('init' in Son.prototype)){
            Son.prototype.init = _superclass
        }
    }
    mixin(definition)
    return Son;
}

var Animal = P(function(animal){
    animal.init = function(name){
        this.name = name;
    }
    animal.move = function(meters){
        console.log(`${this.name} moved ${meters} m`)
    }
})
var Snake = P(Animal,function(snake,animal){
    snake.move = function(){
        console.log('Slithering....');
        animal.move.call(this,5)
    }
})
var animal = Animal('animal')
var sam = Snake('Sammy the Pytnon')
animal.move(100)
sam.move()