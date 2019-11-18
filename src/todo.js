import NavbarComponent from './intro/components/navbar.component.js';
import NoteInputComponent from './todo/components/note-input.component.js';
import TodoListComponent from './todo/components/todo-list.component.js';
import TodoHeaderComponent from './todo/components/todo-header.component.js';
import TodoListCompletedComponent from './todo/components/todo-list-completed.component.js';
import TodoListNavComponent from './todo/components/todo-list-nav.component.js';

let state = { buttonClass: 'btn-primary', index: 0, notes: [] };
s.setState(state);

let compNavbar = new NavbarComponent();
s.mount('divNavbar', compNavbar);

let compNoteInput = new NoteInputComponent();
s.mount('divNoteInput', compNoteInput);

let compTodoListNav = new TodoListNavComponent();
let rootTodoListNav = s.mount('divNoteNav', compTodoListNav);

let compTodoHeader = new TodoHeaderComponent();
s.mount('divTodoHeader', compTodoHeader);

let compTodoList = new TodoListComponent();
let compTodoListCompleted = new TodoListCompletedComponent();

s.route('all', { component: compTodoList, root: 'divTodoList' });
s.route('completed', { component: compTodoListCompleted, root: 'divTodoList' });

s.autoUpdate('navTodoList', compTodoListNav);
