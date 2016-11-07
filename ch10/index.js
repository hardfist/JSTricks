var $$ = jquery = jQuery = function (selector) {
    return new jquery.fn.init(selector)
}
jquery.fn = jquery.prototype = {
    version: '2.1',
    init: function (selector) {
        this.selector = selector
        return this;
    },
    constructor: jquery
}
jquery.fn.init.prototype = jquery.fn


jquery.extend = jquery.fn.extend = function () {
    var options, src, copy,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length;
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                copy = options[name]
                target[name] = copy;
            }
        }
    }
    return target;
}

jquery.fn.extend({
    setName: function (myName) {
        this.myName = myName
        return this;
    },
    getName: function () {
        console.log(this.myName)
        return this;
    }
})

// utility function

jquery.extend({
    isFunction(fn){
        return typeof fn === 'function'
    }
})
var expando = 'jQuery' + (new Date()).getTime(), uuid = 0, windowData = 0;
jquery.extend({
    cache: {},
    data: function (elem, name, data) {
        elem = elem === global ? windowData : elem
        var id = elem[expando]
        if (!id) {
            id = elem[expando] = ++uuid;
        }
        if (name && !jquery.cache[id]) {
            jquery.cache[id] = {}
        }
        if (data != undefined) {
            jquery.cache[id][name] = data;
        }
        return name ? jquery.cache[id][name] : jquery.cache[id]
    },
    removeData: function (elem, name) {
        elem = elem == global ? windowData : elem;
        var id = elem[expando]
        if (name) {
            if (jquery.cache[id]) {
                delete jquery.cache[id][name]
                name = ""
                if (Object.keys(jquery.cache[id]).length == 0) {
                    jquery.removeData(elem)
                }
            }
        } else {
            try {
                delete elem[expando]
            } catch (e) {
                if (elem.removeAttribute) {
                    elem.removeAttribute(expando)
                }
            }
            delete jquery.cache[id]
        }
    }
})
jquery.extend({
    makeArray(data) {
        if (Array.isArray(data)) {
            return [...data]
        }
        return [data]
    },
    queue: function (elem, type, data) {
        if (elem) {
            type = (type || 'fx') + 'queue'
            var q = jquery.data(elem, type)
            if (!q) {
                q = jquery.data(elem, type, jquery.makeArray(data))
            } else if (data) {
                q.push(data)
            }
        }
        return q
    },
    dequeue: function (elem, type) {
        var queue = jquery.queue(elem, type)
        fn = queue.shift()
        if (!type || type === 'fx') {
            fn = queue[0]
        }
        if (fn !== undefined) {
            fn.call(elem)
        }
    },
    Callbacks:Callbacks,
    $Callbacks: Callbacks,
    $Deferred: Deferred,
    each: function (obj, callback) {
        for (var i = 0; i < obj.length; i++) {
            callback(i, obj[i])
        }
    }
})

function Callbacks(options) {
    var list = [];
    var self;
    var firingStart;
    var memory;
    function _fire(data) {
        memory = options === 'memory' && data;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        for (; firingStart < firingLength; firingStart++) {
            if (list[firingStart](data) == false && options === 'stopOnFalse') {
                break;
            }
        }
    }
    self = {
        add: function (fn) {
            var start = list.length;
            if (options == 'unique') {
                if (list.indexOf(fn) === -1) {
                    list.push(fn)
                }
            } else {
                list.push(fn)
            }
            if (memory) {
                firingStart = start;
                _fire(memory)
            }
        },
        fire: function (args) {
            if (list) {
                _fire(args);
            }
        }
    }
    return self;
}
function Deferred(){
    this.promise = new Promise2;
}
function defer(){
    return new Deferred()
}
var Promise2 = function(){
    this.$$state = {}
}
function delay(fn){
    new Promise((resolve,reject)=>{
        fn();
    })
}
function processQueue(state){
    var pending = state.pending;
    delete state.pending;
    for(let arr of pending){
        var fn = arr[state.status];
        if(jquery.isFunction(fn)){
            fn(state.value)
        }
    }
}
function scheduleProcessQueue(state){
    delay(function(){
        processQueue(state);
    })
}

Promise2.prototype.then = function(onFullfilled,onRejected){
    this.$$state.pending = this.$$state.pending || [];
    this.$$state.pending.push([null,onFullfilled,onRejected])
    if(this.$$state.status > 0){
        scheduleProcessQueue(this.$$state)
    }
}
Promise2.prototype.finally = function(callback){
    return this.then(function(){
        callback()
    },function(){
        callback()
    })
}
Deferred.prototype.resolve = function(value){
    var self = this;
    if(self.promise.$$state.status){
        return;
    }
    self.promise.$$state.status = 1;
    self.promise.$$state.value = value;
    scheduleProcessQueue(self.promise.$$state)
    
}
Deferred.prototype.reject = function(reason){
    if(this.promise.$$state.status){
        return;
    }
    this.promise.$$state.value = reason;
    this.promise.$$state.status = 2;
    scheduleProcessQueue(this.promise.$$state)
}
var d = defer();
var p = d.promise;
p.then(function(value){
    console.log('value:',value)
})
p.then(function(value){
    console.log('value2:',value)
})
d.resolve(42)
d.resolve(43)
