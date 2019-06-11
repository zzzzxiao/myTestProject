import React, { Component } from 'react';
import { Redirect, Link, Switch } from 'react-router-dom';
import "./index.scss";
import AuthRoute from '../common/authRoute';
export default class Index extends Component {
    render() {
        const { routes } = this.props;
        return <div>
            <div>首页~~~</div>
            <Switch>
                {routes.map(item => <AuthRoute {...item} key={item.name} />)}
                <Redirect path="/index" exact to={{ pathname: '/index/game' }} />
            </Switch>
        </div>
    }
}