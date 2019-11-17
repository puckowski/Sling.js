import NavbarComponent from './intro/components/navbar.component.js';
import NoteInputComponent from './todo/components/note-input.component.js';
import TodoListComponent from './todo/components/todo-list.component.js';
import TodoHeaderComponent from './todo/components/todo-header.component.js';
import TodoListCompletedComponent from './todo/components/todo-list-completed.component.js';
import TodoListNavComponent from './todo/components/todo-list-nav.component.js';

let state = { buttonClass: 'btn-primary', index: 0, notes: [] };
s.setState(state);

let compNavbar = new NavbarComponent();
s.mountById('divNavbar', compNavbar);

let compNoteInput = new NoteInputComponent();
s.mountById('divNoteInput', compNoteInput);

let compTodoListNav = new TodoListNavComponent();
let rootTodoListNav = s.mountById('divNoteNav', compTodoListNav);

let compTodoList = new TodoListComponent();
let rootTodoList = s.mountById('divTodoList', compTodoList);

let compTodoListCompleted = new TodoListCompletedComponent();

let compTodoHeader = new TodoHeaderComponent();
s.mountById('divTodoHeader', compTodoHeader);

s.route('all', { component: compTodoList, root: 'divTodoList' });
s.route('completed', { component: compTodoListCompleted, root: 'divTodoList' });

s.autoUpdate(rootTodoList, compTodoList);
s.autoUpdate(rootTodoListNav, compTodoListNav);
