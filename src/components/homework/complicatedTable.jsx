import React, { Component } from 'react';
import { Form, InputNumber, Button } from 'antd';
const FormItem = Form.Item;
class ComplicatedTable extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { data } = this.props;
        const length = this._countCoulumns(data);
        const table = this._renderTbody(data)
        console.log(length);
        console.log(table);
    }
    render() {
        const { data } = this.props;
        return <div>
            <Form>
                <br />
                <table cellSpacing="0" cellPadding="0" className="table">
                    <thead>
                        <tr>
                            <th width="8%">序号</th>
                            <th width="15%">一级指标</th>
                            <th width="30%">二级指标</th>
                            <th width="35%">三级指标</th>
                            <th width="12%">指标得分</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this._renderTbody(data)
                        }
                    </tbody>
                </table>
            </Form>
        </div>
    }
    _countCoulumns(data) {
        return data.reduce((caculator, current) => {
            return caculator + current.secondLevelIndexList.reduce((cacul, cur) => {
                return cacul + cur.commonIndexList.length;
            }, 0)
        }, 0)
    }
    _renderTbody(data) {
        let currentIndex = 0;
        let totalLen = 0;
        const firstRowSpan = this._caculateLayerLength(data);
        return data.reduce((caculator, first, firstIndex) => {
            return caculator.concat(first.secondLevelIndexList.reduce((cacul, second, secondIndex) => {
                const thirdLevel = second.commonIndexList;
                let thirdLen = thirdLevel.length;
                const str = cacul.concat(thirdLevel.map((third, t_index) => {
                    currentIndex = totalLen + t_index + 1;
                    // let formId = `${first.id}/${second.id}/${third.id}`;
                    // let formId = `${firstIndex}.secondLevelIndexList.${secondIndex}.commonIndexList.${t_index}`;
                    let formId = third.indexCode;
                    // console.log('formId', formId);
                    return <tr key={formId}>
                        <td>{currentIndex}</td>
                        {(secondIndex === 0 && t_index === 0) ? <td rowSpan={firstRowSpan[firstIndex]}>{first.name}（{first.score}分）</td> : null}
                        {t_index === 0 ? <td rowSpan={thirdLen}>{second.name}</td> : null}
                        <td>{third.indexName}</td>
                        <td>
                            {this._getScore(third.indexScore, formId, third.maxScore)}
                        </td>
                    </tr>;
                }));
                totalLen = totalLen + thirdLen;
                return str;
            }, []));
        }, []);

    }
    // 计算第一层的rowspan
    _caculateLayerLength(data) {
        return data.map(first => {
            return first.secondLevelIndexList.reduce((caculator, current) => {
                return caculator + current.commonIndexList.length;
            }, 0)
        });
    }
    // 表单输入框渲染
    _getScore = (initialValue, formId, max = 30) => {
        let { form, isEdit } = this.props;
        return (<FormItem>
            {form.getFieldDecorator(formId, {
                initialValue,
                rules: [{ required: true, message: ' ' }]
            })(isEdit ?
                <InputNumber
                    precision={2}
                    step={0.01}
                    min={0}
                    max={max}
                /> : <span>{initialValue}</span>)}
        </FormItem>
        );
    }
}
export default Form.create({})(ComplicatedTable)