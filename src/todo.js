import NavbarComponent from './todo/components/navbar.component.js';
import NoteInputComponent from './todo/components/note-input.component.js';
import TodoListComponent from './todo/components/todo-list.component.js';
import TodoHeaderComponent from './todo/components/todo-header.component.js';
import TodoListCompletedComponent from './todo/components/todo-list-completed.component.js';
import TodoListNavComponent from './todo/components/todo-list-nav.component.js';
import StoreTodo from './todo/stores/todo.store.js';
import NoteService from './todo/services/note.service.js';

import { setState, mount, addRoute } from '../dist/sling.min';

let noteCookieData = new NoteService().getNoteCookie();
let state = new StoreTodo();

if (noteCookieData.length > 0) {
    state.addNotes(JSON.parse(noteCookieData));
}

setState(state);

addRoute('all', { component: new TodoListComponent(), root: 'divTodoList' });
addRoute('completed', { component: new TodoListCompletedComponent(), root: 'divTodoList' });

let compNavbar = new NavbarComponent();
mount('divNavbar', compNavbar);

let compNoteInput = new NoteInputComponent();
mount('divNoteInput', compNoteInput);

let compTodoListNav = new TodoListNavComponent();
mount('divNoteNav', compTodoListNav);

let compTodoHeader = new TodoHeaderComponent();
mount('divTodoHeader', compTodoHeader);
