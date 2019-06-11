import "./index.scss";

import { Button, Checkbox, Input } from "antd";
import React, { Component } from "react";
import { autorun, observable } from "mobx";
import { inject, observer } from "mobx-react";

import IndexStore from "../../mobx/Index";
import TimerView from "./timerView";
import TodoList from "../../mobx/TodoList";
import TodoStore from "../../mobx/Todo";
import tree from './tree';
const listStore = IndexStore.todoList;
const todoStore = IndexStore.todo;

const store = new TodoList();
var appState = observable({
    timer: 0
});

@observer
export default class TodoListView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const flattenTree = this._flattenTree(tree);
        console.log(flattenTree);

    }
    _flattenTree = (data) => {
        return data.reduce((arr, { id, name, type, resType, parentNodes, children = [] }) =>
            // arr.concat([{ id, name, type, resType, parentNodes }], children ? this._flattenTree(children) : []),
            arr.concat([{ id, name, type, resType, parentNodes }], this._flattenTree(children)),
            [])
    }
    render() {
        const { todos, user } = store;
        // debugger;
        return (
            <div>
                <ul>{todos.map(todo => <TodoView todo={todo} key={todo.id} />)}</ul>
                {/* Tasks left: {store.unfinishedTodoCount} */}
                <p>Total number: {user.children.length}</p>
                {/* <p>name:{user.name}</p>
                <p>age:{user.age}</p> */}

                <ul>
                    {user.children.map(item => (
                        <li key={item.age}>
                            <span>name: {item.name} </span>
                            <span> age: {item.age}</span>
                        </li>
                    ))}
                </ul>
                <div>
                    <TimerView appState={appState} />
                </div>
                name:<Input onChange={this.changeName.bind(this)} />
                age:<Input onChange={this.changeAge.bind(this)} />
                <Button onClick={this.addChild}>addChild</Button>
                <Button onClick={this.changeChild}>changeChild</Button>
            </div>
        );
    }
    changeName(e) {
        const value = e.target.value;
        const { user } = store;
        user.name = value;
    }
    changeAge(e) {
        const value = e.target.value;
        const { user } = store;
        user.age = value;
    }
    addChild() {
        const { user } = store;
        user.children.push({ name: "one", age: 2 });
    }
    changeChild() {
        const { user } = store;
        user.children[0].age = 10;
        user.children[0].name = '靓仔';
    }
}

const TodoView = observer(({ todo }) => (
    <li>
        <input type="checkbox" checked={todo.finished} onClick={() => (todo.finished = !todo.finished)} />
        {todo.title}
    </li>
));
store.todos.push(new TodoStore("zhangsan"), new TodoStore("lisi"));
autorun(() => {
    console.log("Tasks left: " + store.todos.unfinishedTodoCount);
});
appState.resetTimer = () => {
    appState.timer = 0;
};
setInterval(() => {
    appState.timer += 1;
}, 1000);
