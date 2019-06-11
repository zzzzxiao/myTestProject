import React, { Component } from 'react';
import { Input, Button, Form, Card, Tabs, message, Modal, Cascader, Select, Upload, Icon } from 'antd';
import { } from 'antd';
import './medata.less';
import '../common.less';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
import TabPaneContent from './addMeadata/tabPaneContent';
// import EditableTable from './addMeadata/editTable';
class AddMedata extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '源字段',
            dataIndex: 'sourceField',
            width: '30%',
            editable: true,
        }, {
            title: '关系名称',
            dataIndex: 'relationalName',
            editable: true,
        }, {
            title: '关系代码',
            dataIndex: 'relationalCode',
            editable: true,
        }, {
            title: '目标对象',
            dataIndex: 'targetObject',
            editable: true,
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <div className="oper-col">
                        <a onClick={() => this._editColumn(record)}>编辑</a>
                        <a onClick={() => this._deleteColumn(record)}>删除</a>
                    </div>
                );
            },
        }];
        this.state = {
            visible: false,
            dataSource: {
                dependent: [],
                beEependented: [],
                symbiosis: []
            },
            newline: true,
            count: {
                dependent: 0,
                beEependented: 0,
                symbiosis: 0
            },
            editRow: {
                dependent: 0,
                beEependented: 0,
                symbiosis: 0
            },
            tabKey: 'dependent',
            currentEditData: {},
            loading: false
        };
    }
    componentDidMount() {
        // const { editRow, tabKey } = this.state;
        const tabList = ['dependent', 'beEependented', 'symbiosis'];
        tabList.map(item => {
            this._handleAdd(0, item);
        });
    }
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                sm: { span: 6 },
            },
            wrapperCol: {
                sm: { span: 6 },
            },
        };
        const modalItemLayout = {
            labelCol: {
                sm: { span: 6 },
            },
            wrapperCol: {
                sm: { span: 14 },
            },
        };
        const { tabKey, dataSource, editRow, visible, count, loading } = this.state;
        const currentCount = count[tabKey] - 1;
        const panes = [
            { title: '依赖关系', content: 'Content of Tab 1', key: 'dependent' },
            { title: '被依赖关系', content: 'Content of Tab 2', key: 'beEependented' },
            { title: '组合关系', content: 'Content of Tab 3', key: 'symbiosis' },
        ];
        const modalMap = {
            dependent: '依赖关系',
            beEependented: '被依赖关系',
            symbiosis: '组合关系'
        };
        const options = [{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];

        return <div className="medata">
            <Form className="login-form">
                <Card title="新增数据源" extra={<Button type="primary" onClick={this._handleSubmit} className="login-form-button">提交</Button>}>
                    <div className="item-wrapper border-bt">
                        <div className="item-title">基本属性配置</div>
                        <FormItem
                            {...formItemLayout}
                            label="元数据名称"
                        >
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入元数据名称' }],
                            })(
                                <Input placeholder="请输入元数据名称" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="元数据代码"
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入元数据代码！' }],
                            })(
                                <Input placeholder="请输入元数据代码" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="版本号"
                        >
                            {getFieldDecorator('remember', {
                                rules: [{ required: true, message: '请输入版本号！' }],
                            })(
                                <Input placeholder="请输入版本号" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="所属部门或系统"
                        >
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                rules: [{ required: true, message: '请输入所属部门或系统！' }],
                            })(
                                <Input placeholder="请输入所属部门或系统" />
                            )}

                        </FormItem>
                    </div>
                    <div className="item-wrapper border-bt sub-wrapper">
                        <div className="item-title">表结构配置</div>
                        <div className="item-content">
                            
                            <div className="download">
                                请先点此 <Button type="primary">下载模版</Button> 按模板填写好以后，在下方上传。
                            </div>
                            <div className="upload">
                                {/* <Button type="primary">选择文件</Button> <span>未选择任何文件</span>
                                <Button type="primary">上传</Button> */}
                                {getFieldDecorator('upload', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this._normFile,
                                })(
                                    <Upload
                                        beforeUpload={this._beforeUpload}
                                        showUploadList={false}
                                        // listType="picture-card"
                                        action='/api/upload'
                                        name="file"
                                        onChange={this._changeUpload}
                                    >
                                        {loading ? <Button> 正在上传中…… </Button> : <Button loading={loading}> <Icon type="upload" /> 选择上传文件 </Button>}
                                    </Upload>
                                )}
                            </div>
                            <div className="tips">
                                <p className="tips-title">【温馨提示】</p>
                                <p>1、不要改变模板格式，否则可能导致上传不成功，如遇提交失败的情况，请根据提示，修改对应单元格。</p>
                                <p>2、只能上传TXT格式的文件。</p>
                            </div>
                        </div>
                    </div>
                    <div className="item-wrapper tab-wrraper">
                        <Tabs activeKey={tabKey} defaultActiveKey="1" animated={false} onChange={this._changeTabPane}>
                            {/* <TabPane tab="依赖关系" key="dependent">
                                <TabPaneContent
                                    dataSource={dataSource.dependent}
                                    columns={this.columns}
                                    visible={visible}
                                />
                            </TabPane>
                            <TabPane tab="被依赖关系" key="beEependented">
                                dddd
                                <TabPaneContent
                                    dataSource={dataSource.beEependented}
                                    columns={this.columns}
                                />
                            </TabPane>
                            <TabPane tab="组合关系" key="symbiosis">
                                fff
                                <TabPaneContent
                                    dataSource={dataSource.symbiosis}
                                    columns={this.columns}
                                />
                            </TabPane> */}
                            {panes.map((pane, index) => <TabPane tab={pane.title} key={pane.key} animated={false}>
                                {index}
                                <TabPaneContent
                                    dataSource={dataSource[pane.key]}
                                    columns={this.columns}
                                    editRow={editRow[tabKey]}
                                />
                            </TabPane>)}
                        </Tabs>
                        <Modal
                            title={modalMap[tabKey]}
                            visible={visible}
                            onOk={this._handleOk}
                            onCancel={this._handleCancel}
                            key={currentCount}
                            maskClosable={false}
                        >
                            <FormItem
                                {...modalItemLayout}
                                label="源字段"
                            >
                                {getFieldDecorator('sourceField', {
                                    rules: [{ required: true, message: '请输入源字段' }],
                                    initialValue: 'jack'
                                })(
                                    <Select style={{ width: '100%' }}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...modalItemLayout}
                                label="关系名称"
                            >
                                {getFieldDecorator('relationalName', {
                                    rules: [{ required: true, message: '请输入关系名称' }]
                                })(
                                    <Input placeholder="请输入关系名称" />
                                )}
                            </FormItem>
                            <FormItem
                                {...modalItemLayout}
                                label="关系代码"
                            >
                                {getFieldDecorator('relationalCode', {
                                    rules: [{ required: true, message: '请输入关系代码' }],
                                })(
                                    <Input placeholder="请输入关系代码" />
                                )}
                            </FormItem>
                            <FormItem
                                {...modalItemLayout}
                                label="目标对象"
                            >
                                {getFieldDecorator('targetObject', {
                                    onChange: this._changeCascader,
                                    rules: [{ required: true, message: '请选择目标对象' }],
                                })(
                                    <Cascader style={{ width: '100%' }} options={options} placeholder="请选择目标对象" />
                                )}

                            </FormItem>
                        </Modal>
                    </div>

                </Card>
            </Form>

        </div>;
    }
    _changeTabPane = (tabKey) => {
        this.setState({ tabKey });
    }
    _changeCascader = () => {

    }
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    _normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    _beforeUpload = (file) => {
        const fileName = file.name;
        const isTXT = fileName.split('.')[1] === 'txt';
        if (!isTXT) {
            message.error('只能上传TXT格式的文件！');
        }
        return isTXT;
    }
    _changeUpload1 = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功！`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败！`);
        }
    }
    _changeUpload = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const res = info.file.response;
            if (res.success === false) {
                message.warn(res.message);
                this.setState({
                    loading: false
                });
                // if (res.statusCode === 5003) {
                //     setTimeout(() => {
                //         this.props.history.push('/user/login');
                //     }, 1000);
                // }
            } else {
                message.success(`${info.file.name} 上传成功！`);
                this.setState({ loading: false });
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败！`);
            this.setState({
                loading: false
            });
        }
    }
    _editColumn = (columnData) => {
        const { form } = this.props;
        const { setFieldsValue } = form;
        const { tabKey, editRow } = this.state;
        this.setState({
            visible: true,
            editRow: {
                ...editRow,
                [tabKey]: columnData.key + 1
            },
            currentEditData: columnData
        }, () => {
            setFieldsValue(columnData);
        });
    }
    _handleAdd = (row, tabKey) => {
        const { count, dataSource } = this.state;
        const currentData = dataSource[tabKey];
        let currentCount = count[tabKey];
        if (currentCount === row) {
            const newData = {
                key: currentCount,
                sourceField: '',
                relationalName: '',
                relationalCode: null,
                targetObject: '',
            };
            ++currentCount;
            this.setState(prevState => {
                return {
                    dataSource: {
                        ...prevState.dataSource,
                        [tabKey]: [...currentData, newData]
                    },
                    count: {
                        ...prevState.count,
                        [tabKey]: currentCount
                    },
                };
            });
        }

    }
    _handleOk = () => {
        const { validateFields } = this.props.form;
        const { editRow, tabKey, currentEditData, dataSource } = this.state;
        const currentData = dataSource[tabKey];
        let currentCount = editRow[tabKey] - 1;
        validateFields(['sourceField', 'relationalName', 'relationalCode', 'targetObject'], (err, values) => {
            if (!err) {
                const curRowData = { ...currentData[currentCount], ...values };
                currentData.splice(currentCount, 1, curRowData);
                this.setState({
                    visible: false,
                    dataSource,
                    currentEditData: {
                        ...currentEditData,
                        ...values
                    }
                }, () => {
                    this._handleAdd(editRow[tabKey], tabKey);
                });
            }
        });

    }

    _handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
}
export default Form.create()(AddMedata);
