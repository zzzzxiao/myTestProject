/*
* @desc 图标公共部分
* @author xuyao
*/
import React, { Component } from 'react';
import echarts from 'echarts';

class EchartBase extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let echartObj = this.renderEchartDom();
        let onEvents = this.props.onEvents || [];
        for (let eventName in onEvents) {
            if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
                echartObj.on(eventName, function (param) {
                    onEvents[eventName](param, echartObj);
                });
            }
        }
        // $(window).resize(function(){
        //     echartObj.resize();
        // });
    }
    componentDidUpdate() {
        this.renderEchartDom();
    }
    componentWillUnmount() {
        echarts.dispose(this.echartsDom);
    }
    renderEchartDom() {
        let echartObj = this.getEchartsInstance();
        echartObj.setOption(this.props.option);
        if (this.props.showLoading) {
            echartObj.showLoading();
        } else {
            echartObj.hideLoading();
        }
        return echartObj;
    }
    getEchartsInstance() { // echarts.getInstanceByDom(this.echartsDom) || 
        // let existInstance = echarts.getInstanceByDom(this.echartsDom);
        // if (existInstance) {
        //     echarts.dispose(this.echartsDom);
        // }
        return echarts.getInstanceByDom(this.echartsDom) || echarts.init(this.echartsDom);
    }
    render() {
        let style = this.props.style || {
            height: '100%',
            width: '100%'
        };
        return (
            <div ref={(echartsDom) => { this.echartsDom = echartsDom; }} style={style} />
        );
    }
}
export default EchartBase;