import TodoListComponent from './todo-list.component.js';
import TodoListCompletedComponent from './todo-list-completed.component.js';
import NoteService from '../services/note.service.js';

class TodoListNavComponent {

    constructor() {
        this.routeString = '';
    }

    slOnInit() {
        this.performRouteAction(s.getRouteSegments()[0]);
    }

    routeToAll() {
        let compTodoList = new TodoListComponent();
        s.mount('divTodoList', compTodoList);

        s.route('all');

        s.autoUpdate('divTodoList', compTodoList);
    }

    routeToCompleted() {
        let compTodoListCompleted = new TodoListCompletedComponent();
        s.mount('divTodoList', compTodoListCompleted);

        s.route('completed');

        s.autoUpdate('divTodoList', compTodoListCompleted);
    }

    performRouteAction(routeString) {
        this.routeString = routeString;

        switch (routeString) {
            case 'all': {
                this.routeToAll();

                break;
            }
            case 'completed': {
                this.routeToCompleted();

                break;
            }
            default: {
                this.routeString = 'all';
                this.routeToAll();

                break;
            }
        }
    }

    completeNote(note) {
        let stateObj = s.getState();

        stateObj.getNotes().forEach((stateNote) => {
            if (stateNote === note) {
                stateNote.completed = !note.completed;
            }
        })

        s.setState(stateObj);
        new NoteService().setNoteCookie(stateObj);
    }

    view() {
        return s.markup('ul', {
            attrs: {
                class: 'nav',
                style: 'width:50%;margin:auto;',
                id: 'navTodoList'
            },
            children: [
                s.markup('li', {
                    attrs: {
                        class: 'nav-item'
                    },
                    children: [
                        s.markup('a', {
                            attrs: {
                                ... this.routeString !== 'all' && { class: 'nav-link' },
                                ... this.routeString === 'all' && { class: 'nav-link textBold' },
                                onclick: this.performRouteAction.bind(this, 'all'),
                                style: 'cursor:pointer;'
                            },
                            children: [
                                s.textNode('All')
                            ]
                        })
                    ]
                }),
                s.markup('li', {
                    attrs: {
                        class: 'nav-item'
                    },
                    children: [
                        s.markup('a', {
                            attrs: {
                                ... this.routeString !== 'completed' && { class: 'nav-link' },
                                ... this.routeString === 'completed' && { class: 'nav-link textBold' },
                                onclick: this.performRouteAction.bind(this, 'completed'),
                                style: 'cursor:pointer;'
                            },
                            children: [
                                s.textNode('Completed')
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

export default TodoListNavComponent;