  /*
   * @desc 饼图 or 环形图 or 南丁格尔玫瑰图
   * @author xuyao
   * @param radius 区别环形与饼图 eg：[0, '75%'] 内半径与外半径
   * @param roseType 南丁格尔玫瑰图专用，可选择两种模式 radius/area
   */
import React, { Component } from 'react';
import extend from './utils/extend';
import EchartBase from './base/EchartBase';

class BBDBasePie extends Component {
    constructor(props) {
        super(props);
    }
    setOption(parm) {
        const option = {
            title: {
                text: '',
                x: '',
                left: 'auto',
                top: 'auto',
                bottom: 'auto',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft Yahei'
                }
            },
            tooltip: {
                trigger: 'item',
                padding: [10, 10, 10, 10],
                formatter: function(v) {
                    return v.name;
                }
            },
            legend: {
                show: true,
                orient: 'vertical',
                left: 'auto',
                top: 'auto',
                right: 'auto',
                bottom: 'auto',
                itemGap: 10,
                data: [],
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft Yahei'
                }
            },
            series: []
        };

        let op = extend(true, {}, option, parm);
        return op;
    }
    render() {
        return (
            <EchartBase option={this.setOption(this.props.option)} style = {this.props.style} />
        );
    }
}
export default BBDBasePie;