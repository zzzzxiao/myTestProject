import React, { Component } from 'react';
import { Modal, Table, Button, Divider, Tag } from 'antd';
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
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={this._handleOk}
                onCancel={this._handleCancel}
            >
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
}