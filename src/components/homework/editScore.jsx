import React, { Component } from 'react';
import ComplicatedTable from './complicatedTable';
import { Form, InputNumber, Button } from 'antd';
import tableData from 'datas/table.json';
import './homework.scss';
export default class EditScore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false
        }
    }
    render() {
        const { isEdit } = this.state;
        return <div className="tableWrapper">
            {isEdit ? <Button type="primary" icon="save" onClick={(e) => this._submitForm(e)}>save</Button> : <Button type="primary" icon="edit" onClick={() => this.setState({ isEdit: true })}> edit </Button>}
            <ComplicatedTable data={tableData.adjustCreditList} isEdit={isEdit} ref={ref => this.pulicDom = ref} />
            <ComplicatedTable data={tableData.gradingCreditList} isEdit={isEdit} ref={ref => this.marketDom = ref} />
        </div>
    }
    _submitForm = (e) => {
        e.preventDefault();
        // const { form } = this.props;
        this.pulicDom.validateFields((err, values) => {
            if (!err) {
                debugger
                console.log('Received values of form: ', values);
            }
        });
        this.marketDom.validateFields((err, values) => {
            if (!err) {
                debugger
                console.log('Received values of form: ', values);
            }
        });
    }
}