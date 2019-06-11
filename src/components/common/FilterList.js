import './style.scss';
import React, { Component } from "react";
import { Icon } from 'antd';

export default class FilterType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            isOverflow: false,
            selected: props.selected || props.value[0]// 选中的值
        };
    }

    componentDidMount() {
        this._isOverFlow();
    }

    _clearState() {
        const { props } = this;
        this.setState({
            selected: props.value[0]// 选中的值
        });
    }

    _isOverFlow() {
        const $item = $(this.item);
        const itemHeight = $item.outerHeight() + window.parseFloat($item.css('margin-top')) + window.parseFloat($item.css('margin-top')),
            countHeight = $(this.content).height();
        if (itemHeight * 2 <= countHeight) {
            this.setState({
                isOverflow: true,
                expand: false
            });
        }
    }

    _toggleShow() {
        this.setState({
            expand: !this.state.expand
        });
    }

    _getSelectedValue() {
        return this.state.value[ind];
    }

    _handleClick(ind) {
        const { state: { selected }, props: { value } } = this;
        let newSelected = value[ind];
        // 选中再次点击则选择第一项
        if (selected === newSelected) {
            newSelected = value[0];
        }
        this.setState({
            selected: newSelected
        });
        this.props.onChange && this.props.onChange(newSelected);
    }

    _contentBoxClass() {
        const { expand, isOverflow } = this.state;
        let strClass = 'content-box';
        if (isOverflow && !expand) {
            strClass += ' line-height overflow-hidden';
        }
        return strClass;
    }

    render() {
        const { state, props } = this,
            { selected, expand, isOverflow } = state,
            { data, value, title } = props;
        let contentBoxClass = this._contentBoxClass();

        return (
            <div className="filter-type">
                <div className="title-info">{title}:</div>
                <div className={contentBoxClass}>
                    <ul className="content" ref={(name) => this.content = name}>
                        {data.map((val, ind) => {
                            return (
                                <li key={ind} onClick={() => this._handleClick(ind)} ref={(name) => this.item = name}
                                    className={selected === value[ind] ? 'active' : ''}>
                                    {val}
                                </li>
                            );
                        })}
                    </ul>
                    <div className="toggle">
                        {
                            isOverflow ? expand ?
                                <span onClick={() => this._toggleShow()}>收起 <Icon type="up"/></span>
                                :
                                <span onClick={() => this._toggleShow()}>更多 <Icon type="down"/></span>
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }

}

