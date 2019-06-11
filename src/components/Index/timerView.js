import "./index.scss";

import { Button, Input } from "antd";
import React, { Component } from "react";

import { observer } from "mobx-react";

@observer
export default class TimerView extends React.Component {
    render() {
        const { timer } = this.props.appState;
        return <Button onClick={this.onReset.bind(this)}>Seconds passed: {timer}</Button>;
    }

    onReset() {
        const { resetTimer } = this.props.appState;
        resetTimer();
    }
}
