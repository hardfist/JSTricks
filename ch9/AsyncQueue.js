class Deferred{
    static get(obj){
        return obj instanceof Deferred ? obj : new Deferred
    }
    static ok(r){
        return r;
    }
    static ng(e){
        throw e
    }
    constructor(fn){
        this._firing = []
        this._fired = []
        if(typeof fn === 'function'){
            return this.then(fn)
        }
        return this;
    }
    
    _add(okng,fn){
        var obj = {
            ok: Deferred.ok,
            ng: Deferred.ng,
            arr:[]
        }
        if(typeof fn === 'function'){
            obj[okng] = fn 
        }
        this._firing.push(obj)
        return this;
    }
    then(fn){
        return Deferred.get(this)._add("ok",fn)
    }
    once(fn){
        return Deferred.get(this)._add("ng",fn)
    }
    wait(timeout){
        var self = Deferred.get(this)
        self._firing.push(~~timeout);
        return self;
    }
    _fire(okng,args,result){
        var type = "ok"
        obj = this._firing.shift()
        if(obj){
            this._fired.push(obj)
            var self = this;
            if(typeof obj === "number"){
                var timeoutId = setTimeout(function(){
                    self._fire(okng,self.before(args,result))
                },obj)
                this.onabort = function(){
                    clearTimeout(timeoutId)
                }
            }else if(obj.arr.length){
                var i= 0,d;
                
            }
        }
    }
}