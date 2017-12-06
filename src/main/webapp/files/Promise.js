/**
 * Created by lifubang on 2015/6/25.
 */

;(function(root, factory) {
    if (typeof module !== 'undefined' && module.exports) {// CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {// AMD / RequireJS
        define(factory);
    } else {
        root.Promise = factory.call(root);
    }
}(this, function() {
    'use strict';

    function Promise(resolver) {
        if(!(this instanceof Promise)) return new Promise(resolver);

        this.status = 'pending';
        this.value;
        this.reason;

        // then may be called multiple times on the same promise
        this._resolves = [];
        this._rejects = [];
        this._finals = [];

        if(isFn(resolver)) resolver(this.resolve.bind(this), this.reject.bind(this));

        return this;
    };

    Promise.prototype.then = function(resolve, reject, finallyFunc) {
        var zis = this;
        var next = this._next || (this._next = Promise());
        var status = this.status;
        var x;

        if('pending' === status) {
            (isFn(resolve) || resolve.join) && this._resolves.push(resolve);
            isFn(reject) && this._rejects.push(reject);
            return next;
        }

        if('resolved' === status) {
            if(!isFn(resolve) && !resolve.join) {
                next.resolve(resolve);
            } else {
                    if (resolve.join) {
                        var ps = [];
                        for (var i=0; i<resolve.length; i++) {
                            ps.push(resolve[i].apply(null, Array.prototype.slice.call(this.value, 0)));
                        }
                        Promise.all(ps).then(function(x) {
                            if (finallyFunc)
                                finallyFunc.apply(null, Array.prototype.slice.call(zis.value, 0))
                                    .then(resolveX(next, x), zis.reject);
                            else
                                resolveX(next, x);
                        }, this.reject);
                    } else {
                        x = resolve.apply(null, Array.prototype.slice.call(this.value, 0));
                        resolveX(next, x);
                    }
                    try {
                } catch(e) {
                    this.reject(e);
                }
            }
            return next;
        }

        if('rejected' === status) {
            if(!isFn(reject)) {
                next.reject(reject);
            } else {
                try {
                    x = reject(this.reason);
                    resolveX(next, x);
                } catch(e) {
                    this.reject(e);
                }
            }
            return next;
        }
    };

    Promise.prototype.resolve = function(value) {
        if('rejected' === this.status) throw Error('Illegal call.');

        this.status = 'resolved';
        this.value = arguments;

        this._resolves.length && fireQ(this);

        return this;
    };

    Promise.prototype.reject = function(reason) {
        if('resolved' === this.status) throw Error('Illegal call.');

        this.status = 'rejected';
        this.reason = reason;

        this._rejects.length && fireQ(this);

        return this;
    };

    // shortcut of promise.then(undefined, reject)
    Promise.prototype.catch = function(reject) {
        return this.then(void 0, reject);
    };

    // return a promise with another promise passing in
    Promise.cast = function(arg) {
        var p = Promise();

        if(arg instanceof Promise) return resolvePromise(p, arg);
        else return Promise.resolve(arg);
    };

    // return a promise which resolved with arg
    // the arg maybe a thanable object or thanable function or other
    Promise.resolve = function(arg) {
        var p = Promise();

        if(isThenable(arg)) return resolveThen(p, arg);
        else return p.resolve(arg);
    };

    // accept a promises array,
    // return a promise which will resolsed with all promises's value,
    // if any promise passed rejectd, the returned promise will rejected with the same reason
    Promise.all = function(promises) {
        var len = promises.length;
        var promise = Promise();
        var r = [];
        var pending = 0;
        var locked;

        each(promises, function(p, i) {
            p.then(function(v) {
                if (arguments.length > 1)
                    r[i] = Array.prototype.slice.call(arguments, 0);
                else
                    r[i] = v;
                if(++pending === len && !locked) {
                    promise.resolve(r);
                }
            }, function(e) {
                locked = true;
                promise.reject(e);
            });
        });

        return promise;
    };

    // accept a promises array,
    // return a promise which will resolsed with the first resolved promise passed,
    // if any promise passed rejectd, the returned promise will rejected with the same reason
    Promise.any = function(promises) {
        var promise = Promise();
        var called;

        each(promises, function(p, i) {
            p.then(function(v) {
                if(!called) {
                    promise.resolve(v);
                    called = true;
                }
            }, function(e) {
                called = true;
                promise.reject(e);
            });
        });

        return promise;
    };

    // return a promise which reject with reason
    // reason must be an instance of Error object
    Promise.reject = function(reason) {
        if(!(reason instanceof Error)) throw Error('reason must be an instance of Error');

        var p = Promise();

        p.reject(reason);

        return p;
    };

    function resolveX(promise, x) {
        if(x === promise) promise.reject(new Error('TypeError'));

        if(x instanceof Promise) return resolvePromise(promise, x);
        else if(isThenable(x)) return resolveThen(promise, x);
        else return promise.resolve(x);
    };

    function resolvePromise(promise1, promise2) {
        var status = promise2.status;

        if('pending' === status) return promise2.then(promise1.resolve.bind(promise1), promise1.reject.bind(promise1));
        if('resolved' === status) return promise1.resolve.apply(promise1
            , Array.prototype.slice.call(promise2.value, 0));
        if('rejected' === status) return promise1.reject(promise2.reason);
    };

    function resolveThen(promise, thanable) {
        var called;
        var resolve = once(function(x) {
            if(called) return;
            resolveX(promise, x);
            called = true;
        });
        var reject = once(function(r) {
            if(called) return;
            promise.reject(r);
            called = true;
        });

        try {
            thanable.then.call(thanable, resolve, reject);
        } catch(e) {
            if(!called) throw e;
            else promise.reject(e);
        }

        return promise;
    };

    function fireQ(promise) {
        var status = promise.status;
        var queue = promise['resolved' === status ? '_resolves' : '_rejects'];
        var arg = promise['resolved' === status ? 'value' : 'reason'];
        var fn;
        var x;

        while(fn = queue.shift()) {
            if ('resolved' === status) {
                if (fn.join) {
                    var ps = [];
                    for (var i = 0; i < fn.length; i++) {
                        ps.push(fn[i].apply(null, 'resolved' === status ?
                            Array.prototype.slice.call(arg, 0) : arg));
                    }
                    Promise.all(ps).then(function (x) {
                        x && resolveX(promise._next, x);
                    }, promise.reject);
                } else {
                    x = fn.apply(null, 'resolved' === status ?
                        Array.prototype.slice.call(arg, 0) : arg);
                    x && resolveX(promise._next, x);
                }
            } else {
                x = fn.call(promise, arg);
                x && resolveX(promise._next, x);

                /**/
            }
        }

        return promise;
    };

    function noop () {};

    function isFn(fn) {
        return 'function' === type(fn);
    };

    function isObj(o) {
        return 'object' === type(o);
    };

    function type(obj) {
        var o = {};
        return o.toString.call(obj).replace(/\[object (\w+)\]/, '$1').toLowerCase();
    };

    function isThenable(obj) {
        return obj && obj.then && isFn(obj.then);
    };

    function once(fn) {
        var called;
        var r;

        return function() {
            if(called) return r;
            called = true;
            return r = fn.apply(this, arguments);
        };
    };

    // maybe faster then `forEach()`
    function each(arr, iterator) {
        var i = 0;

        for(; i<arr.length; i++) iterator(arr[i], i);
    };

    return Promise;
}));