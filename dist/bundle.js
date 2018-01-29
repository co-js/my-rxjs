(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.rxjs = {})));
}(this, (function (exports) { 'use strict';

function Observable(subscribe) {
  this.subscribe = subscribe;
}

Observable.fromEvent = function (element, name) {
  return new Observable(function (observer) {
    var callback = function callback(event) {
      return observer.next(event);
    };
    element.addEventListener(name, callback, false);
    return function () {
      return element.removeEventListener(name, callback, false);
    };
  });
};

Observable.prototype.map = function (mapFn) {
  var input = this;
  return new Observable(function (observer) {
    return input.subscribe({
      next: function next(value) {
        return observer.next(mapFn(value));
      },
      error: function error(err) {
        return observer.erorr(err);
      },
      complete: function complete() {
        return observer.complete();
      }
    });
  });
};

exports.Observable = Observable;

Object.defineProperty(exports, '__esModule', { value: true });

})));
