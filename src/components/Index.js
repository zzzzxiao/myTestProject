import '../styles/main.scss';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import Header from './header/Header';
import AuthRoute from './common/authRoute';
import routes from './common/routes';
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    formatData(data) {
        var queryData = [];
        for (var key in data) {
            // queryData.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            queryData.push(key + '=' + JSON.stringify(data[key]));
        }
        return queryData;
    }
    // 获取Ajax请求对象 test
    getXHR() {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versisonList = [
            'MSXML2.XmlHttp.6.0',
            'MSXML2.XmlHttp.5.0',
            'MSXML2.XmlHttp.4.0',
            'MSXML2.XmlHttp.3.0',
            'MSXML2.XmlHttp.2.0',
            'Microsoft.XmlHttp'
        ];
        var xhr;
        for (var i = 0; i < versisonList.length; i++) {
            try {
                xhr = new ActiveXObject(versisonList[i]);
                break;
            } catch (er) {
                throw er;
            }
        }
        return xhr;
    }
    ajax(options) {
        // var { url, type = "get", data, async = true, onsuccess, onerror } = options;
        var url = options.url;
        var type = options.type;
        var data = options.data;
        var async = options.async;
        var onsuccess = options.onsuccess;
        var onerror = options.onerror;
        if (!type) type = 'get';
        if (async === undefined) async = true;// true表示异步，false同步
        var xhr = this.getXHR();
        // 监测请求 onreadystatechange 事件
        xhr.onreadystatechange = function (response) {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    onsuccess && onsuccess(xhr.responseText, xhr.responseXml);
                }
            } else {
                onerror && onerror(response);
            }
        };
        // 从data对象中拆分出请求需要的数据格式
        if (type === 'get') {
            var queryData = formatData(data);
            xhr.open(type, queryData.length ? url + '?' + queryData.join('&') : url, async);
            xhr.send(null);
        } else if (type === 'post') {
            xhr.open(type, url, async);
            xhr.setRequestHeader('Content-type', 'text/html');
            xhr.setRequestHeader('token', 'baacbf5a-0f89-4bee-a084-349c582abe71');
            xhr.send(data);
        }
    }
    firstFn() {
        console.log('firstFn');
        this.secondFn();
    }
    secondFn() {
        console.log('secondFn');
        this.thirdFn();
    }
    thirdFn() {
        console.log('thirdFn');
    }
    componentDidMount() {
        const curErrors = [
            {
                uniqueNo: null,
                name: '测试错误描述', //错误描述
                line: null, // 错误所在行数
                column: null,// 错误所在列数
                fileUrl: '',//错误所在文件路径
                type: '错误类型',
                // level: LOG_LEVEL.monitor,// 错误日志紧急级别, 默认监控，设计间隔时间上报
                date: null, // 产生错误的时间
                stack: ''
            },
            {
                uniqueNo: null,
                name: '', //错误描述
                line: null, // 错误所在行数
                column: null,// 错误所在列数
                fileUrl: '',//错误所在文件路径
                type: '错误类型',
                // level: LOG_LEVEL.monitor,// 错误日志紧急级别, 默认监控，设计间隔时间上报
                date: null, // 产生错误的时间
                stack: ''
            }
        ];
        // axios.post('/api/seeyon/rest/app_logger_record/error', curErrors,
        //     {
        //         headers: {
        //             token: '6bb8d09d-5802-405b-b354-4553619729dd',
        //             // 'Content-type':'application/x-www-form-urlencoded'
        //             // 'Content-type': 'multipart/form-data',
        //             'Content-type': 'application/json'
        //         }
        //     }).then(res => {
        //         debugger;
        //     })
        // this.ajax({
        //     url: '/api/seeyon/rest/app_logger_record/error_text',
        //     type: 'post',
        //     data: JSON.stringify(curErrors),
        //     async: false
        // });
        // formdata.append('token', '6c62d8c2-67be-48dd-b9ff-f863354b3c01');
        // navigator.sendBeacon('/api/seeyon/rest/app_logger_record/error', formdata);
        // let blob = new Blob([curErrors], {
        //     // token: '6c62d8c2-67be-48dd-b9ff-f863354b3c01',
        //     type: 'application/json'
        // });
        // console.log(blob);
        // window.addEventListener('unload', function (event) {
        //   localStorage.setItem('window.close', JSON.stringify('测试挂载浏览器报错1111111'));
        //   navigator.sendBeacon('/api/seeyon/rest/app_logger_record/error_text', JSON.stringify('测试挂载浏览器报错1111111'));
        // });
        // navigator.sendBeacon('/api/seeyon/rest/app_logger_record/error_text', JSON.stringify(curErrors));
        this.firstFn();
        //做饭
        function cook() {
            console.log('开始做饭。');
            var p = new Promise(function (resolve, reject) {  //做一些异步操作
                setTimeout(function () {
                    console.log('做饭完毕！');
                    resolve('鸡蛋炒饭');
                }, 1000);
            });
            return p;
        }

        //吃饭
        function eat(data) {
            console.log('开始吃饭：' + data);
            var p = new Promise(function (resolve, reject) { //做一些异步操作
                setTimeout(function () {
                    console.log('吃饭完毕!');
                    resolve('用过的碗和筷子');
                }, 2000);
            });
            return p;
        }

        cook()
            .then(eat)
            .then(function (data) {
                console.log(data);
            });
        window.onerror = function (msg, url, line, col, error) {
            alert(msg);
            console.log(msg);
        }
        // throw '测试错误描述';

    }

    render() {
        // const { match } = this.props;
        return (
            <div className="container">
                <Route component={(props) => <Header {...props} />} />
                <div className="main-content">
                    <Switch>
                        {routes.map(item => <AuthRoute {...item} key={item.name} />)}
                        <Redirect path="/" exact to={{ pathname: '/index' }} />
                    </Switch>
                </div>

            </div>
        );
    }
}
