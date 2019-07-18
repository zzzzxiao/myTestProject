
import Home from 'components/Index/index';
import Game from 'components/game/Game';
import Topics from 'components/topic/topics';
import TodoListView from 'components/Index/todoListView';
import Topic from 'components/topic/topic';
import Login from 'components/user/login';
import Logout from 'components/user/logout';
import Modal from 'components/modal/modal';
import ES6Class from 'components/homework/ES6Class';
// import Customtable from 'components/homework/complicatedTable'
import EditScore from '../homework/editScore';
import ReactContext from '../homework/context/reactContext';
// import ReactContext from '../homework/context/ReactToggleContext';
const routes = [
    {
        path: '/index',
        name: 'index',
        // authRight: false,
        component: Home,
        routes: [
            {
                path: '/index/game',
                name: 'game',
                exact: true,
                // authRight: false,
                component: Game
            }, {
                path: '/index/todo',
                name: 'todo',
                exact: true,
                // authRight: false,
                component: TodoListView
            }, {
                path: '/index/topics',
                name: 'topics',
                exact: false,
                // authRight: false,
                component: Topics,
                routes: [
                    {
                        path: '/index/topics/:topicId',
                        name: 'topic',
                        exact: true,
                        // authRight: false,
                        component: Topic,
                    }
                ]
            },
        ]
    },{
        path: '/public',
        name: 'todo',
        exact: true,
        // authRight: false,
        component: TodoListView
    }, {
        path: '/login',
        name: 'todo',
        exact: true,
        // authRight: false,
        component: Login
    }, {
        path: '/logout',
        name: 'todo',
        exact: true,
        // authRight: true,
        component: Logout
    },
    {
        path: '/protected',
        name: 'todo',
        exact: true,
        // authRight: true,
        component: TodoListView
    },
    {
        path: '/modal',
        name: 'modal',
        exact: true,
        // authRight: true,
        component: Modal
    },
    {
        path: '/homework',
        name: 'homework',
        exact: true,
        // authRight: true,
        component: ES6Class
    },{
        path: '/customtable',
        name: 'customtable',
        exact: true,
        component: EditScore
    },{
        path: '/reactcontext',
        name: 'reactcontext',
        exact: true,
        component: ReactContext
    }
];
export default routes;