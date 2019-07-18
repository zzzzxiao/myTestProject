
import React, { Component } from 'react';
import result from './Square';
import tableData from 'datas/table.json';
export default class ES6Class extends Component {
    constructor(props) {
        super(props)
        window.localStorage.setItem('name', 'zhangxiao');
        window.localStorage.setItem('age', '30');
        console.log(result);
    }
    componentDidMount() {
        const self = this;
        this.container.addEventListener('scroll', this._debouce2(self._test, 2000, true));
        const length1 = this._countCoulumns(tableData.adjustCreditList);
        const length2 = this._countCoulumns(tableData.gradingCreditList);
        console.log(length1);
        console.log(length2);
    }
    render() {
        const arr = [1, 2, [[[['p', 123, [[{}, [null]]]]]]], 5, [1, [6, [0, [[[null]]]]]], 6, 3];
        const thisArray = this._flatten(arr, []);
        const thisArray2 = this._flatten2(arr, []);
        console.log(thisArray);
        console.log(thisArray2);
        return <div ref={ref => this.container = ref} style={{ height: 300, overflow: 'auto' }}>
            <div style={{ height: 1000 }}>
                <a href="/customtable">test table</a>
                <br />
                <a href="/reactcontext">reactcontext</a>
            {
                    thisArray.map(item => <p>{item ? item.toString() : '--'}</p>)
                }
            </div>
        </div>
    }
    _debounce(fn, delay) {
        let timer = null;
        console.log('outer function');
        return function () {
            // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
            let context = this;
            let args = arguments;
            console.log('inner function');

            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    }
    _test() {
        console.log('scroll.. scroll..');
    }
    _isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }
    _flatten(arr) {
        // return arr.reduce((accumulator, current)=>{
        //     if(this._isArray(current)){
        //         return accumulator.concat(this._flatten(current));
        //     }else{
        //         return accumulator.concat(current);
        //     }
        // },[])
        return arr.reduce((accumulator, current) => {
            return accumulator.concat(this._isArray(current) ? this._flatten(current) : current);
        }, []);
    }
    _flatten2(arr) {
        var arr = arr || [],
            len = arr.length,
            resArr = [];
        for (var i = 0; i < len; i++) {
            if (this._isArray(arr[i])) {
                resArr = resArr.concat(this._flatten2(arr[i]))
            } else {
                resArr.push(arr[i])
            }
        }
        return resArr
    }
    _debouce2(func, delay, immediate) {
        var timer = null;
        return function () {
            var context = this;
            var args = arguments;
            if (timer) clearTimeout(timer);
            if (immediate) {
                //根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
                var doNow = !timer;
                //每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
                timer = setTimeout(function () {
                    timer = null;
                }, delay);
                //立即执行
                if (doNow) {
                    func.apply(context, args);
                }
            } else {
                timer = setTimeout(function () {
                    func.apply(context, args);
                }, delay);
            }
        }
    }
    _throttle(func,delay){
        var prev = Date.now();
        return function(){
            var context = this;
            var args = arguments;
            var now = Date.now();
            if(now-prev>=delay){
                func.apply(context,args);
                prev = Date.now();
            }
        }
    }
    _countCoulumns(data){
        return data.reduce((caculator, current)=>{
            return caculator + current.secondLevelIndexList.reduce((cacul, cur)=>{
                return cacul+ cur.commonIndexList.length;
            },0)
        },0)
    }
}