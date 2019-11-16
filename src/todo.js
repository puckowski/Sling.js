import NavbarComponent from './intro/components/navbar.component.js';
import NoteInputComponent from './todo/components/note-input.component.js';
import TodoListComponent from './todo/components/todo-list.component.js';
import TodoHeaderComponent from './todo/components/todo-header.component.js';

let state = { buttonClass: 'btn-primary', index: 0, notes: [] };
s.setState(state);

let compNavbar = new NavbarComponent();
let rootNavbar = s.mountById('divNavbar', compNavbar);

let compNoteInput = new NoteInputComponent();
let rootNoteInput = s.mountById('divNoteInput', compNoteInput);

let compTodoList = new TodoListComponent();
let rootTodoList = s.mountById('divTodoList', compTodoList);

let compTodoHeader = new TodoHeaderComponent();
let rootTodoHeader = s.mountById('divTodoHeader', compTodoHeader);

s.autoUpdate(rootTodoList, compTodoList);
