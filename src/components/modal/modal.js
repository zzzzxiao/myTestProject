import React, { Component } from 'react';
import { Modal, Table, Button, Divider, Tag, Select } from 'antd';
const { Option } = Select;
import './modal.scss'
export default class TestModal extends Component {
    state = {
        visible: false,
        pageNum: 1
    }
    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;">Invite {record.name}</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">Delete</a>
                    </span>
                ),
            },
        ];
        const dataSource = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ];
        const { pageNum, visible } = this.state;
        return <div>
            <Button type="primary" onClick={() => this._showModal()}>
                Open Modal
            </Button>
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled">
                    Disabled
                    </Option>
                <Option value="Yiminghe">的风格豆腐干地方个豆腐干地鼓捣鼓捣飞给房东</Option>
            </Select>
            <Modal
            style={{wordWrap: 'normal'}}
                title="Basic Modal"
                visible={visible}
                onOk={this._handleOk}
                onCancel={this._handleCancel}
            >
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">
                        Disabled
                    </Option>
                    <Option value="Yiminghe">的风格豆腐干地方个豆腐干地鼓捣鼓捣飞给房东</Option>
                </Select>
                <Table
                    dataSource={dataSource}
                    rowKey="orderId"
                    columns={columns}
                    pagination={{
                        size: 'small',
                        pageSize: 10,
                        current: pageNum,
                        onChange: (pageNum, pageSize) => this._changePage(pageNum, pageSize),
                        onShowSizeChange: (current, pageSize) => this._changePageSize(current, pageSize),
                        total: 30,
                        showSizeChanger: true,
                        showQuickJumper: true
                    }}
                />
            </Modal>
        </div>
    }
    _showModal() {
        this.setState({ visible: true })
    }
    _handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    _handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    _changePage(pageNum) {
        this.setState({ pageNum });
    }
    _changePageSize(current, pageSize) {
        this.setState({ pageSize, pageNum: 1 });
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
}