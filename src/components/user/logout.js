
import React, { Component } from 'react';
import {fakeAuth} from 'utils/util';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
@inject('authRight')
@observer
export default class Logout extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirectToReferrer: props.authRight.isAuthenticated
        }
    }
    // 退出
    logout = () => {
        const { authRight } = this.props;
        authRight.isAuthenticated = false;
        this.setState({
            redirectToReferrer: false
        })
    };
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;
        // 判断是否登录，
        if (!redirectToReferrer) {
            return (<Redirect
                to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                }}
            />)
        }
        // 未登录则提示登录
        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.logout}>Log out</button>
            </div>
        );
    }
}