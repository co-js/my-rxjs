export function Observable(subscribe) {
  this.subscribe = subscribe;
}

Observable.fromEvent = (element, name) => {
  return new Observable(observer => {
    const callback = event => observer.next(event);
    element.addEventListener(name, callback, false);
    return () => element.removeEventListener(name, callback, false);
  });
};

Observable.prototype.map = function(mapFn) {
  const input = this;
  return new Observable(observer => {
    return input.subscribe({
      next: value => observer.next(mapFn(value)),
      error: err => observer.erorr(err),
      complete: () => observer.complete()
    });
  });
};
