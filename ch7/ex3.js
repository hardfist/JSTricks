var JS = {}
JS.class = function(_super,def){
    if(def === void 0){
        def = _super;
        _super = Object;
    }
    function Son(...args){
        if(typeof this.init === 'function'){
            this.init.apply(this,args)
        }
    }
    Son.prototype = Object.create(_super.prototype,{})
    Son.constructor = Son;
    Object.assign(Son.prototype,def)
    return Son;
}
var Animal = JS.class({
    init:function(name){
        this.name = name
        console.log('this.name:',this.name)
    },
    shout: function(s){
        console.log(this.name + ':'+s)
    }
})

var animal = new Animal('animal')
animal.shout('shout')
var Dog = JS.class(Animal,{
    construct:function(name,age){
        this.parent.construct.apply(this,arguments)
        this.age = age 
    },
    run:function(s){
        console.log(s)
    }
})
