import React, { Component } from 'react';
import { Avatar, Breadcrumb, Row, Col, Icon, Pagination, Input, Select } from 'antd';
import classnames from 'classnames';
import { Link } from "react-router-dom";
import './index.scss';
const Option = Select.Option;


export const Circle = ({ children = 0, className, ...opts }) => (
    <Avatar className={'circle'} shape="circle" size="large">{children}</Avatar>
);

export const MyBreadcrumb = ({ routes, separator = ">" }) => {
    function itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> :
            <Link to={paths.join("/")}>{route.breadcrumbName}</Link>;
    }

    return (
        <div className="breadcrumb">
            <Breadcrumb itemRender={itemRender} routes={routes} separator={separator}/>
        </div>
    );
};

export const ItemTitle = ({ title, children, className, opts }) => (
    <div className={classnames('item-title', className)} {...opts}>
        {title}
        {children}
    </div>
);

export const Table = ({ datas, fields, cols, tfoot, className, noClass = false }) => {
    const createTd = (item, i) => {
        const isPlainObject = $.isPlainObject(item) && (item.hasOwnProperty('$$typeof') === false);
        let dom = '';
        if (isPlainObject) {
            const { text, ...opt } = item;
            dom = <td key={i} {...opt}>{text}</td>;
        } else {
            dom = <td key={i}>{item}</td>;
        }
        return dom;
    };
    return (
        <table className={classnames({ 'my-table': !noClass }, className)}>
            {cols ?
                <colgroup>
                    {cols.map((val, ind) => <col key={`${val}${ind}`} width={val}/>)}
                </colgroup> : null}
            {fields ? <thead>
            {
                fields.length && fields.map((val, index) => (
                    <tr key={index}>
                        {val.length && val.map((val, index) => (
                            createTd(val, index)
                        ))}
                    </tr>
                ))}
            </thead> : null}
            <tbody className="layout-body">
            {
                datas && datas.length && datas.map((val, index) => (
                    <tr key={index}>
                        {val.length && val.map((val, index) => (
                            createTd(val, index)
                        ))}
                    </tr>
                ))}

            </tbody>
            {tfoot ? <tfoot>
            <tr>
                <td colSpan="100">{tfoot}</td>
            </tr>
            </tfoot> : null}
        </table>
    );
};

export const FilterLayout = ({ data, cols = [8, 8, 8] }) => {
    cols = data.length === 3 ? cols : [12, 12];
    return (
        <Row className="filter-box">
            {data.map((valTr, indexTr) => <Col className={"filter-col"} key={indexTr}
                                               span={cols[indexTr]}>{valTr}</Col>)}
        </Row>
    );
};

export const ContentLayout = ({ data, cols }) => {
    if (!cols) {
        let maxLength = Math.max.apply(null, data.map(val => val.length));
        const colsSpan = window.parseInt(24 / maxLength);
        while (maxLength--) {
            cols ? cols.push(colsSpan) : cols = [colsSpan];
        }
    }
    return (
        data.map((valTr, indexTr) =>
            <Row key={indexTr}>
                {valTr.map((valTd, indexTd) => (
                    <Col key={indexTd} span={cols[indexTd]}><IconLabelText {...valTd}/></Col>
                ))}
            </Row>
        )
    )
};

export const Title = ({ compony = '贵阳森马科技股份有限公司', score = 91.2 }) => {
    const countStart = parseInt(score / 20);
    const genStart = (countStart) => {
        let list = [], allCount = 5;
        while (allCount--) {
            list.push(countStart-- ? <Icon type="star" key={allCount}/> : <Icon type="star-o" key={allCount}/>);
        }
        return list;
    };
    return (
        <div>
            {compony}
            <span style={{ color: '#F88C2D' }}>
                <span style={{ margin: '0 20px' }}>{score}分</span>
                {genStart(countStart)}
            </span>
        </div>
    );
};

export const IconLabelText = ({ type, label, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }}/>
        {label}: <span style={{ color: '#37383C' }}>&nbsp;{text}</span>
  </span>
);

export const IconText = ({ type, text, ...opts }) => (
    <span {...opts}>
    <Icon type={type} style={{ marginRight: 8 }}/>
        {text}
  </span>
);

export const MyPagination = ({ onChange, ...opts }) => (
    <div className="modal-footer">
        <Pagination className={'pagination'}
                    defaultCurrent={6}
                    total={500}
                    showTotal={total => `共 ${total / 10} 页`}
                    hideOnSinglePage={true}
                    showQuickJumper={true}
                    onChange={onChange}
                    {...opts}
        />
    </div>
);

export const TitleIconText = ({ children, className }) => (
    <span className={classnames('icon-text', className)}>{children}</span>
);

export const SelectInputSearch = ({ handleSearch, ...opts }) => (
    <div className="search-wrapper">
        <Input
            addonAfter={
                <div className="search-btn" onClick={handleSearch}>
                                <span>
                                    <Icon type="search"/>
                                </span>搜索
                </div>
            }
            {...opts}
        />
    </div>
);

const getData = (length = 4) => {
    let datas = [];
    while (length--) {
        datas.push({
            value: length, text: `选项${length}`
        })
    }
    return datas;
}
export const MySelect = ({ datas = getData(), onChange, ...opts }) => (
    <Select onChange={onChange} {...opts}>
        {datas.map(val => <Option value={val.value} key={val.value}>{val.text}</Option>)}
    </Select>
);
export const CheckboxList = ({ data, className, onClick, selected }) => (
    <div className={classnames('checkbox-list', className)}>
        {data.map(val => (
            <div onClick={() => onClick(val)} key={val}
                 className={val === selected ? 'active' : ''}>{val}</div>
        ))}
    </div>
);