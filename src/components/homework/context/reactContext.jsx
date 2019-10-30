import React, { Component } from 'react';
import ThemedButton from './ThemedButton';
import { MyContext, themes } from './context';

export default class ReactContext extends React.Component {
    state = {
        theme: themes.light,
        // theme: {},
    }
    componentDidMount() {
        // setTimeout(() => this.setState({  }), 100);
    }
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
        const { theme } = this.state;
        return (
            <div>
                <MyContext.Provider value={theme}>
                    <Toolbar toggleThame={this.toggleThame} />
                </MyContext.Provider>
                <br />
                {/* <div>
                    <ThemedButton onClick={this.toggleThame} />
                </div> */}
            </div>
        );
    }
    toggleThame = () => {
        this.setState((state) => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark
        }))
    }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedButton onClick={props.toggleThame} />
        </div>
    );
}

// class ThemedButton extends React.Component {
//     // 指定 contextType 读取当前的 theme context。
//     // React 会往上找到最近的 theme Provider，然后使用它的值。
//     // 在这个例子中，当前的 theme 值为 “dark”。
//     static contextType = MyContext;
//     render() {
//         return <div>
//             <p>
//                 {JSON.stringify(this.context)}
//             </p>
//             <Button theme={this.context}>thame</Button>
//         </div>;
//     }
// }
