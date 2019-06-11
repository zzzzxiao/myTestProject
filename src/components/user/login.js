import React, { Component } from 'react';
// import { fakeAuth } from 'utils/util';
import { Route, Redirect } from 'react-router-dom';
import { autorun } from "mobx";
import { inject, observer } from 'mobx-react';
@inject('authRight')
@observer
export default class Login extends Component {
    constructor(props) {
        super(props)
    }
    // 登录， 通过验证，
    login = () => {
        const { authRight } = this.props;
        authRight.isAuthenticated = true;
        // this.setState({
        //     redirectToReferrer: true
        // })
        // autorun(()=>{
        //     authRight.authenticate;
        // })
        
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/index" } };
        // const { redirectToReferrer } = this.state;
        const { authRight } = this.props;
        // 判断是否登录，
        if (authRight.isAuthenticated) {
            return <Redirect to={from} />;
        }
        // 未登录则提示登录
        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}