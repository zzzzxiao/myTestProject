import '../styles/main.scss';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Header from './header/Header';
import AuthRoute from './common/authRoute';
import routes from './common/routes';
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
