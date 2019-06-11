import Todo from './Todo';
import TodoList from './TodoList';
import AuthRight from './AuthRight';

class Stores {
    constructor() {
        this.todo = new Todo();
        this.todoList = new TodoList();
        this.authRight = new AuthRight();
    }
}
export default new Stores();