import React, { Component } from 'react';
import { MyContext } from './context';
// import {MyContext} from './reactContext';
import { Button } from 'antd';
export default class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。
    static contextType = MyContext;
    render() {
        let props = this.props;
        let theme = this.context;
        return <div>
            <p>
                {/* {JSON.stringify(this.context)} */}
                <MyContext.Consumer>
                    {({ background }) =>
                        <Button {...props}
                            style={{ backgroundColor: background }}>{background}</Button>
                    }
                </MyContext.Consumer>
            </p>
            {/* <Button {...props}
                style={{ backgroundColor: theme.background }}>{theme.background}</Button> */}
        </div>;
    }
}