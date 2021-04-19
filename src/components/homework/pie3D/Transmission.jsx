import React, { Component } from 'react';
// import { Carousel } from 'antd';
import testData from './testData';
import Pie3dChart from './Pie3dChart';
import Map3DChart from '../../common/map3D/Map3DChart';
import './transmission.scss';
import { mapData } from './mapData';
import {Carousel} from './Carousel'
export default class Transmission extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        pieData: [],
        data: [],
        carouselData: [],
        currentIndex: 0
    }
    componentDidMount() {
        this._getPieData(testData);
        this._doAnimate();
        setTimeout(() => {
            this.setState({
                loading: false,
                data: mapData.map((item) => ({ name: item.provinceCity, value: item.score, order: item.trend === '0' ? 'down' : item.trend === '2' ? 'up' : '' }))
            });
        }, 300);
    }
    render() {
        const { pieData, currentIndex, carouselData } = this.state;
        return <div>
            这里
            {/* {pieData.length ? <Carousel autoplay>
                {
                    pieData.map((items, i) => {
                        return <div key={`items${i}`}>
                            {items.map((item, index) => {
                                return <div key={item.region} className="numItem">
                                    <div className="leftChart">
                                        <Pie3dChart option={item} className="piechart" />
                                    </div>
                                    <div className="dec">{item.region}</div>
                                    <div className="num">
                                        {item.acct}
                                        <span className="unit"> 家</span>
                                    </div>
                                    <div className="percent">{Math.round((item.rate) * 10000) / 100}%</div>
                                </div>;
                            })}
                        </div>;
                    })
                }
            </Carousel> : null} */}
            <div style={{ width: 600, height: 300 }}>
                {pieData.map((items, i) => {
                    return <div key={`items${i}`}>
                        {items.map((item, index) => {
                            return <div key={item.region} className="numItem">
                                <div className="leftChart">
                                    <Pie3dChart option={item} className="piechart" />
                                </div>
                                <div className="dec">{item.region}</div>
                                <div className="num">
                                    {item.acct}
                                    <span className="unit"> 家</span>
                                </div>
                                <div className="percent">{Math.round((item.rate) * 10000) / 100}%</div>
                            </div>;
                        })}
                    </div>;
                })}
            </div>

            <div style={{ width: 600, height: 300 }}>
                {/* <Map3DChart option={this._getOption(data)} /> */}
                {carouselData.length ? <Carousel data={carouselData} width={508} currentIndex={currentIndex} onClick={this._goVision} /> : null}
            </div>
        </div>
    }
    _getPieData(riskTransmissions) {
        const colorAll = ['#5EE080', '#FF5057', '#FF9D00'];
        const totalCompanyNum = riskTransmissions.reduce((cal, cur) => {
            return cal + cur.acct;
        }, 0);

        const pieOptionData = riskTransmissions.map((item, index) => {
            let optionColor = [colorAll[(index + 1) % 3], '#114080'];
            return {
                data: [
                    { name: item.region, value: item.acct, selected: true },
                    { name: '剩下', value: (totalCompanyNum - item.acct) }
                ],
                color: optionColor, r: 25, amount: 6, region: item.region, acct: item.acct, rate: item.rate
            };
        });
        const riskTransmissionsArr = [];
        let itemArr = [];
        const len = riskTransmissions.length;
        pieOptionData.forEach((item, index) => {
            const curFlag = (index + 1);
            itemArr.push(item);
            if (curFlag % 3 === 0 && curFlag < len) {
                riskTransmissionsArr.push(itemArr);
                itemArr = [];
            } else if (curFlag === len) {
                riskTransmissionsArr.push(itemArr);
            }
        });
        const pieData = riskTransmissionsArr.slice();
        const carouselData = this._getcarouselData(pieData);
        this.setState({
            carouselData
        });
        // return riskTransmissionsArr.slice();

    }
    _getcarouselData(pieData) {
        return pieData.map((items, i) => {
            return items.map((item, index) => {
                return <div key={item.region} className="numItem">
                    <div className="leftChart">
                        <Pie3dChart option={item} className="piechart" />
                    </div>
                    <div className="dec">{item.region}</div>
                    <div className="num">
                        {item.acct}
                        <span className="unit"> 家</span>
                    </div>
                    <div className="percent">{Math.round((item.rate) * 10000) / 100}%</div>
                </div>;
            });
        });
    }
    _getOption = (data) => {
        return {
            map: {
                data,
                lineStyle: {
                    color: '#457aff', // 线条样式
                    linewidth: 3
                },
                mapStyle: {
                    color: '#2049af' // 地图颜色
                }
            },
            shape: {
                type: 'cylinder',
                width: 0.07,
                height: 0.07,
                color: '#C0910C'
            },
            label: {
                color: '#1FF1FF',
                fontSize: '12px'
            },
            num: {
                color: '#FAB329',
                offset: [5, 0],
                fontSize: '18px'
            }
        };
    }
    _doAnimate = () => {
        this.setTimeMark = setTimeout(() => {
            let { currentIndex, carouselData } = this.state;
            if (currentIndex < carouselData.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            this.setState({ currentIndex });
            this._doAnimate();
        }, 3000);
    };
    _goVision = (v, p) => () => {
        this.setState({ currentIndex: v }, () => {
            this._doAnimate();
        });
    }
}