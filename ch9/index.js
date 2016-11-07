      var log = function (s) {
        window.console && window.console.log(s);
      }
      dom.Deferred(function () {
        log(1);//1
      })
      .then(function () {
        log(2);//2
      })
      .then(function () {
        log(3);//3
      })
      .fire();