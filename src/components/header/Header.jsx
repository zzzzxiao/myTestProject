import './header.scss';
import React, { Component } from 'react';
import { getCookie } from '../../utils/storage';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

/**
 * @desc 页面顶部组件
 */
@inject('authRight')
@observer
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    goto(url) {
        location.href = `${getCookie('ssoUrl')}/${url}`;
    }
    logout = () => {
        const { authRight, history } = this.props;
        authRight.isAuthenticated = false;
        history.push('/login');
    }
    render() {
        const { accountName: name } = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : { accountName: 'aa' };
        return (
            <div className="header">
                <div className="left">
                    <h1 className="title-info">zzzxiao学习系统</h1>
                </div>
                <div className="right">
                    <div className="user-info ">
                        <div className="user-manage" onClick={() => this.logout()}>退出登陆</div>
                        <i className="user"></i>
                        <span className="text">Hi,{name}</span>
                        <i className="down"></i>
                    </div>
                    <i className="exit" onClick={() => this.goto('global')} title="返回首页"></i>
                </div>
                <div className="nav">
                    <ul>
                        <li>
                            <Link to="/index">首页</Link>
                        </li>
                        <li>
                            <Link to="/index/todo">计算</Link>
                        </li>
                        <li>
                            <Link to="/index/game">游戏</Link>
                        </li>
                        <li>
                            <Link to="/index/topics">主题</Link>
                        </li>
                        <li>
                            <Link to="/public">Public Page</Link>
                        </li>
                        <li>
                            <Link to="/protected">Protected Page</Link>
                        </li>
                        <li>
                            <Link to="/logout">logout Page</Link>
                        </li>
                        <li>
                            <Link to="/modal">test modal in IE</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}