import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

class FormTwo extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="age"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('sex', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="sex"
                        />,
                    )}
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({})(FormTwo);