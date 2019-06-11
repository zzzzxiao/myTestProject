import '../components/common.scss';
import '../components/style.scss';

import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";

import Index from "../components/Index";
import { Provider } from 'mobx-react';
import history from './history';

// import stores from '../mobx/Index';

export default class Root extends Component {
    render() {
        return (
            // <Provider {...storesArray}>
            <Provider >
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={Index}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
