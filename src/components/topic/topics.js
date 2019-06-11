import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthRoute from 'components/common/authRoute';
export default class Topics extends Component {
    render() {
        const { match, routes } = this.props;
        return <div className="topic">
            <div className="left-nav">
                <ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>React 渲染</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                    </li>
                </ul>
            </div>
            <div className="right-content">
                <Switch>
                    {/* <Route exact path={`${match.url}/:topicId`} component={Topic} /> */}
                    {routes.map(item => <AuthRoute {...item} key={item.name} authRight={item.authRight} />)}
                    <Route
                        exact
                        path={match.url}
                        render={() => <h3>请选择一个主题</h3>}
                    />
                </Switch>
            </div>
        </div>
    }
}