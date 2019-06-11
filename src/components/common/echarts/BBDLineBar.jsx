/*
* @type 折线柱状组合图
* @author xuyao
*/
import React, { Component } from 'react';
import extend from './utils/extend';
import EchartBase from './base/EchartBase';
class BBDLineBar extends Component {
    constructor(props) {
        super(props);
    }
    setOption(param){
        const option = {
            title: {
                show: false,
                link: '',
                target: 'self',
                text: '',
                x: 'left',
                padding: [25, 0, 0, 5],
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft Yahei'
                }
            },
            tooltip: {
                trigger: 'axis',
                padding: [10, 10, 10, 10],
                axisPointer: {
                    type: 'none'
                }
            },
            legend: {
                padding: [15, 0, 0, 0],
                itemGap: 5,
                itemWidth: 20,
                itemHeight: 5,
                width: 'auto',
                show: false,
                left: 'auto',
                right: 'auto',
                bottom: 'auto',
                top: 'auto',
                data: [],
                textStyle: {
                    fontSize: 12,
                    fontFamily: 'Microsoft Yahei',
                    color: '#CCCCCC'
                }
            },
            grid: {
                left: 10,
                top: 10,
                right: 10,
                bottom: 15,
                containLabel: true
            },
            xAxis: [{
                name: '',
                type: 'category',
                data: [],
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei',
                        color: '#CCCCCC'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                data: [],
                name: '',
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei',
                        color: '#CCCCCC'
                    }
                }
            },
            {
                type: 'value',
                name: '',
                data: [],
                axisLabel: {
                    show: true, // 控制右边的Y轴显不显示
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'Microsoft Yahei',
                        color: '#CCCCCC'
                    }
                }
            }],
            series: []
        };
        return extend(true, {}, option, param);
    }
    render() {
        return (
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} />
        );
    }
}
export default BBDLineBar;