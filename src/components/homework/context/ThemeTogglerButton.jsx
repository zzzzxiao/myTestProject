import React, { Component } from 'react';
import { ThemeContext } from './themeContex';
// import {ThemeContext} from './reactContext';
import { Button } from 'antd';
export default class ThemeTogglerButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。
    static contextType = ThemeContext;
    render() {
        let props = this.props;
        let theme = this.context;
        return <div>
            <p>
                {/* {JSON.stringify(this.context)} */}
                <ThemeContext.Consumer>
                    {({ theme, toggleTheme }) =>
                        <Button
                            onClick={toggleTheme}
                            style={{ backgroundColor: theme.background }}>thame</Button>
                    }
                </ThemeContext.Consumer>
            </p>
            <Button {...props}
                style={{ backgroundColor: theme.background }}>thame</Button>
        </div>;
    }
}