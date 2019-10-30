import React, { Component } from 'react';
// import { mod, eq, compose } from '../../../utils/test'
export default class FuncionPrograme extends Component {
    render() {
        const result = this.test();
        // const curriedSum = this.curry(this.sum, 5);
        const curriedSum = this.curry1(this.sum, 5);
        // const total = curriedSum([])(1)(2)(3)(4)(5);
        const total = curriedSum(1)(2)(3)(4)(5);
        return <div>
            <p>test</p>
            <p>{result ? 'true' : 'false'}</p>
            <p>total: {total}</p>
        </div>
    }
    test() {
        const iOdd = this.compose(this.eq(1), this.mod(2));
        const result = iOdd(5);
        return result;
    }
    mod(y) {
        return function forX(x) {
            return x % y;
        }
    }
    eq(y) {
        return function forX(x) {
            return x === y;
        }
    }
    compose(fn2, fn1) {
        return function composed(v) {
            return fn2(fn1(v));
        }
    }
    curry1(fn, arity = fn.length) {
        const arr = [];
        return function curried(nextArg) {
            arr.push(nextArg);
            if (arr.length >= arity) {
                return fn(...arr);
            } else {
                return function(nextArg){
                    return curried(nextArg)
                };
            }
        };
    }
    curry(fn, arity = fn.length) {
        return function nextCurried(prevArgs) {
            return function curried(nextArg) {
                debugger
                var args = [...prevArgs, nextArg];
                if (args.length >= arity) {
                    return fn(...args);
                } else {
                    return nextCurried(args);
                }
            };
        };
    }
    sum(...nums) {
        var total = 0;
        for (let num of nums) {
            total += num;
        }
        return total;
    }
}