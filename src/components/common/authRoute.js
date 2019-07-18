import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('authRight')
@observer
export default class AuthRoute extends Component {

    render() {
        const { routes, component: Component, authRight, ...rest } = this.props;
        const { isAuthenticated } = authRight
        return <Route {...rest} render={props =>
            // isAuthenticated  || (rest.path === '/login') ? <Component {...props} routes={routes} /> : <Redirect
            //     to={{
            //         pathname: "/login",
            //         state: { from: props.location }
            //     }}
            // />
            <Component {...props} routes={routes} />
        } />
        // return <Route
        //     {...rest}
        //     children={({ match }) => {
        //         return (
        //             <div className={match ? "active" : ""}>
        //                 {match ? "> " : ""}
        //                 <Link to={rest.path}>test</Link>
        //             </div>
        //         )
        //     }}
        // />
    }
}
// const AuthRoute = ({ routes, component: Component, authRight, ...rest }) => {
//     console.log(rest);
//     debugger
//     return <Route {...rest} render={props =>
//         fakeAuth.isAuthenticated && authRight && (rest.path !== '/login') ? <Component {...props} routes={routes} /> : <Redirect
//             to={{
//                 pathname: "/login",
//                 state: { from: props.location }
//             }}
//         />
//     } />;
// }
// export default AuthRoute;