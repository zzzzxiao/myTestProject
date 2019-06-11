import './common.scss';

import {Breadcrumb, Icon} from 'antd';
import React, { Component } from 'react';

import { Link } from 'react-router';

export default class RedCredit extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const routes = [{
            path: 'index',
            breadcrumbName: '首页'
          }, {
            path: 'first',
            breadcrumbName: '一级面包屑'
          }, {
            path: 'second',
            breadcrumbName: '当前页面'
          }];
          function itemRender(route, params, routes, paths) {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
          }
        return (
            <div><Breadcrumb itemRender={itemRender} routes={routes}/></div>
            // <div>面包屑</div>
        );
    }
}