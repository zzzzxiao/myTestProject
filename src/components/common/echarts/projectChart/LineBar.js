import {parseBarWidth, parseNumber} from '../utils/publicFun';

import BBDLineBar from '../BBDLineBar';
import React from 'react';
import {chartStyle} from './config';
import extend from '../utils/extend';

class LineBar extends React.Component {
    getSeries = () => {
        let series = [];
        const {yAxis, type, color: propsColor, legend, series: dataSeries, xAxisName} = this.props.parms;
        const yAxisLength = yAxis.length;
        const typeBarLength = type.filter(val => val === 'bar').length;
        const barWidth = parseBarWidth(typeBarLength);
        const color = propsColor || ['#00D5C3', '#9B89EF', '#1D86E2', '#BCB34E', '#22AD38', '#1AA4E2', '#0B4AA9', '#8956A1', '#42D058', '#68D1FF', '#5F93E7', '#ac77c7', '#b5f4bf', '#13d2e4', '#a4c7ff', '#c490c0', '#facd89', '#0ebdce', '#cfe0fc', '#f29c9f'];
        legend.forEach(function (val, i) {
            let base = {
                name: val,
                type: type[i],
                barWidth: barWidth,
                data: dataSeries[i],
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                }
            };
            if (type[i] === 'line' && yAxisLength > 1) {
                base.yAxisIndex = 1;
            }
            series.push(base);
        }.bind(this));
        return series;
    }

    getyAxis = () => {
        let yAxis = [];
        const yAxisLength = this.props.parms.yAxis.length;
        this.props.parms.yAxis.forEach(function (val, i) {
            const base = {
                type: 'value',
                name: val,
                ...chartStyle.yAxis
            };
            if (yAxisLength <= 1) {
                return yAxis = base;
            }
            yAxis.push(base);
        }.bind(this));
        return yAxis;
    }

    getxAxis = () => {
        let xAxis = [];
        const {xAxisName, yAxis} = this.props.parms;
        const yAxisLength = yAxis.length;
        const base = {
            type: 'category',
            data: this.props.parms.xAxis,
            ...chartStyle.xAxis,
            boundaryGap: false,
            name: xAxisName
        };
        if (yAxisLength <= 1) {
            return base;
        }
        xAxis.push(base);
        return xAxis;
    }

    parseData = () => {
        const {legend} = this.props.parms;
        const option = {
            tooltip: {
                ...chartStyle.tooltip,
                formatter: (parm) => {
                    let html = '';
                    parm.forEach(function (val, i) {
                        val.value !== undefined ? html += '<div>' + (val.seriesName || val.name) + '：<span>' + parseNumber(val.value) + '</span></div>' : '';
                    });
                    return html;
                }
            },
            grid:{
                show: true,
                left:'5%',
                right:'5%'
            },
            series: this.getSeries(),
            xAxis: this.getxAxis(),
            yAxis: this.getyAxis(),
            legend: {
                data: legend
            },
            textStyle: chartStyle.textStyle
        };
        return extend({}, option, this.props.option);
    }

    render() {
        let chartBox = '';
        if (this.props.parms) {
            const style = this.props.style ? this.props.style : {height: '100%', width: '100%'};
            chartBox = <BBDLineBar option={this.parseData()} style={style}/>;
        }
        return (
            <div className="chart lineBar">
                {chartBox}
            </div>
        );
    }
}

export  default LineBar;

LineBar.defaultProps = {
    parms: {
        legend: [''],
        type: ['line'],
        color: ['#5CBFFE'],
        yAxis: ['y轴'],
        xAxis: ['2017/08', '2017/09', '2017/10', '2017/11', '2017/12', '2018/01', '2018/02', '2018/03', '2018/04', '2018/05'],
        series: [[50, 58, 73, 64, 85, 96,62,76,88,90]],
        xAxisName: ''
    },
    style: {
        width: '100%',
        height: '500px'
    }
};