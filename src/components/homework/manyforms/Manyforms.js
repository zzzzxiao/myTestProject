import React from 'react';
// import FormOne from './FormOne';
// import FormTwo from './FormTwo';
// import { Form, Icon, Input, Button, Modal } from 'antd';
export default class Manyforms extends React.Component {
    state = {
        visible1: true,
        visible2: true
    }
    constructor(props) {
        super(props);
        const arr = [[1, 3], [2, 6], [15, 18], [8, 10], [10, 11], [7, 8]];
        const result = this.getResult(arr)
        debugger;
    }
    render() {
        // const { visible1, visible2 } = this.state;
        return <div>
            {/* <Modal
                visible={visible1}
                onOk={this.handleOk}
            // onCancel={this.handleCancel}
            >
                <FormOne wrappedComponentRef={(form) => this.form1 = form} />
            </Modal>
            <Modal
                visible={visible2}
                onOk={this.handleOk}
            // onCancel={this.handleCancel}
            >
                <FormTwo wrappedComponentRef={(form) => this.form2 = form} />
            </Modal> */}


            <div>
                {/* <Button onClick={(e) => this.handleSubmit(e)}>提交</Button> */}
            </div>
        </div>;
    }
    handleOk = (e) => {
        this.handleSubmit(e);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.form1.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(' form11: ', values);
            }
        });
        this.form2.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('form22: ', values);
            }
        });
    };
    getResult = (arr) => {
        // [[1, 3], [2, 6], [15, 18], [8, 10], [10, 11], [7, 8]];
        // [[1,6],[15,18],[7,11]]
        let newarr = [];
        arr.sort((a, b) => {
            return a[0] - b[0];
        });
        newarr.push(arr[0])
        arr.forEach((item, index) => {
            if (index > 0) {
                const len = newarr.length;
                const lastItem = newarr[len - 1];
                if (item[0] <= lastItem[1]) {
                    lastItem[1] = item[1];
                } else {
                    newarr.push(item);
                }
            }
        });
        return newarr
    }
}