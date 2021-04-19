
import React, { Component, Fragment } from 'react';
import { is, fromJS } from 'immutable';
import Pie3D from './index';

export default class Pie3dChart extends Component {
    constructor(props) {
        super(props);
        this.pieObject = null;
        this.pieChart = React.createRef();
    }

    componentDidMount() {
        this.setChart(this.props.option);
    }
    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(nextProps.option.data), fromJS(this.props.option.data))) {
            this.setChart(nextProps.option);
        }
    }
    setChart = (datas) => {
        this.pieObject = new Pie3D({
            el: this.pieChart.current,
            data: datas.data,
            color: datas.color,
            r: datas.r,
            amount: datas.amount
        });  // r:半径 amount：饼图厚度  
    }
    componentWillUnmount() {
        this.pieObject && this.pieObject.destroy();
        this.pieObject = null;
        this.pieChart = null;
    }
    render() {
        return (
            <div className={this.props.className} ref={this.pieChart}></div>
        );
    }
}
