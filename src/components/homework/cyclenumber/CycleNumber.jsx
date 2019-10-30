import React, { Component } from 'react';
import './cyclenumber.scss';
// 数字翻牌
export default class CycleNumber extends Component {
    state = {
        dom: null
    }
    componentDidMount() {
        this._createTag('35648');
    }
    render() {
        const { dom } = this.state;
        return <div className="tags-wrapper">
            <h2>数字翻牌</h2>
            <div>
                {dom}
            </div>
        </div>;
    }
    _createTag(numStr) {
        const numArr = numStr.split('');
        const len = numArr.length;
        const tagItem = [];
        for (let i = 0; i < 10; i++) {
            tagItem.push(<div key={i}>{i}</div>)
        };
        const that = this;

        let tags = [];
        const count = [];
        for (let i = 0; i < len; i++) {
            count[i] = 0;
            function init() {
                let timer = null;
                if (count[i] <= +numArr[i]) {
                    tags.splice(i, 1, <div className="tag" key={i}><div className="tag-cycle" style={{ marginTop: -count[i] * 20 }}>{tagItem}</div></div>);
                    count[i] += 1;
                    timer = setTimeout(() => {
                        init();
                    }, 1000);
                } else {
                    clearTimeout(timer);
                    return;
                }
                that.setState({ dom: tags });
            }
            init();
        }
    }
}