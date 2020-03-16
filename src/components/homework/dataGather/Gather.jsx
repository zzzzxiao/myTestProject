import "./gather.scss";

import React, { Component } from "react";

export default class Datagather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: this.setScale(),
      animateData: [1, 2, 3, 4],
      dataTotal: 0,
      dayIncrement: 0,
      data: [],
      num: '0.00',
      inc: '0.00',
    };
  }

  // 兼容处理，计算缩放
  setScale = () => window.innerHeight / 1080;

  doAnimate = () => {
    this.setTimeMark = setTimeout(() => {
      const { animateData } = this.state;
      animateData.unshift(animateData.pop());
      this.setState({ animateData });
      this.doAnimate();
    }, 2000);
  };

  enterBall = e => {
    if (this.setTimeMark) {
      clearTimeout(this.setTimeMark);
    }
  };

  leaveBall = e => {
    this.doAnimate();
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        scale: this.setScale()
      });
    });
    // this.doAnimate();
  }

  componentWillUnmount() {
    if (this.setTimeMark) {
      clearTimeout(this.setTimeMark);
    }
  }
  goVision = (v, p) => () => {
    // 点击元素和显示元素位置互换
    const tmp = this.state.animateData.map((value, index) => {
      // 当前显示元素变为调换到点击元素处 需优先判断
      if (value === 0) {
        return p;
      }
      // 点击元素设置为显示
      if (index === v) {
        return 0;
      }
      //其他不变
      return value;
    });
    this.setState({ animateData: tmp });
  }
  changeVision = () => () => {

  }
  render() {
    const p1 = [
      [572, 303],
      [1400, 218],
      [271, 500],
      [1146, 640],
      [578, 700],
      [1458, 600],
      [1050, 146],
    ];
    //左 上
    const p2 = [
      [612, 225],
      [1106, 146],
      [319, 486],
      [1250, 627],
      [607, 700],
      [1481, 205],
      // [547, 675],
      // [1387, 577]
    ];
    const data = ['name', 'age', 'sex', 'adds'];
    const { scale, animateData, num, inc } = this.state;
    return (
      <div className="gather-wraper">
        <div
          className="data-ball"
        >
          {data.map((dataItem, i) => {
            const classes = ["data-ball-item"];
            classes.push(`item${animateData[i]}`);
            return (
              <div
                // onClick={this.goVision(i, animateData[i])}
                className={`data-ball-item item${animateData[i]}`}
                key={i}
              // onMouseEnter={this.enterBall}
              // onMouseLeave={this.leaveBall}
              >
                <div className="center-ball">
                  数据{i}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
