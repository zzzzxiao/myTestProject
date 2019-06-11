import { computed, observable } from "mobx";

export default class TodoList {
    @observable todos = [];
    @observable user = { name: "one", age: 1, children: [{ name: "two", age: 2 }, { name: "three", age: 3 }, { name: "four", age: 4 }] };
    @computed
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
