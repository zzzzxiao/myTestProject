import React, { Component } from 'react';
import './goRound.scss';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
export default class GoRound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [1, 2, 3, 4],
            mode: ['month', 'month'],
            value: [],
        }
    }
    componentDidMount() {
        this._goRound();
    }
    render() {
        const data = ['name', 'age', 'sex', 'adds'];
        const { value, mode, position } = this.state;
        return <div className="round-wrapper">
            <RangePicker
                placeholder={['Start month', 'End month']}
                format="YYYY-MM"
                value={value}
                mode={mode}
                onChange={this.handleChange}
                onPanelChange={this.handlePanelChange}
            />
            <div className="round-outer">
                {data.map((item, index) => <div key={item} className={`round-item item${position[index]}`}> 数据{position[index]}</div>)}
                {/* {position.map((item, index) => <div key={item} className={`round-item item${item}`}>数据{item}</div>)} */}
                <div className="round-center"></div>
            </div>
        </div>;
    }
    _goRound() {
        let timer = setTimeout(() => {
            const { position } = this.state;
            position.unshift(position.pop())
            this.setState({ position });
            this._goRound();
        }, 3000);
        // this.setTimeMark = setTimeout(() => {
        //     const { position } = this.state;
        //     position.unshift(position.pop());
        //     this.setState({ position });
        //     this._goRound();
        //   }, 2000);
    }
    handlePanelChange = (value, mode) => {
        debugger
        this.setState({
            value,
            mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
        });
    };

    handleChange = value => {
        debugger
        this.setState({ value });
    };
}