import NavbarComponent from './todo/components/navbar.component.js';
import NoteInputComponent from './todo/components/note-input.component.js';
import TodoListComponent from './todo/components/todo-list.component.js';
import TodoHeaderComponent from './todo/components/todo-header.component.js';
import TodoListCompletedComponent from './todo/components/todo-list-completed.component.js';
import TodoListNavComponent from './todo/components/todo-list-nav.component.js';
import StoreTodo from './todo/stores/todo.store.js';
import NoteService from './todo/services/note.service.js';

let noteCookieData = new NoteService().getNoteCookie();
let state = new StoreTodo();

if (noteCookieData.length > 0) {
    state.addNotes(JSON.parse(noteCookieData)); 
}

s.setState(state);

s.addRoute('all', { component: new TodoListComponent(), root: 'divTodoList' });
s.addRoute('completed', { component: new TodoListCompletedComponent(), root: 'divTodoList' });

let compNavbar = new NavbarComponent();
s.mount('divNavbar', compNavbar);

let compNoteInput = new NoteInputComponent();
s.mount('divNoteInput', compNoteInput);

let compTodoListNav = new TodoListNavComponent();
s.mount('divNoteNav', compTodoListNav);

let compTodoHeader = new TodoHeaderComponent();
s.mount('divTodoHeader', compTodoHeader);

s.autoUpdate('navTodoList', compTodoListNav);


let str = s.stream();
str.push(1);
str.push(2);
/*let mapFn = function(val) {
    val = val * 2;
}*/
const map1 = function(array) { return array.map(x => x * 2) };
str.log();
str.transform(map1);
str.log();
str.push(3);
const map2 = function(array) { return array.map(x => x * 2) };
str.transform(map2);
str.log();
const filter1 = function(array) { return array.filter(x => x > 6) };
str.transform(filter1);
str.log();
str.transform(map1);
str.log();
const reducer1 = function(array) { return array.reduce((accumulator, currentValue) => accumulator + currentValue); };
str.transform(reducer1);
str.log();
str.transform(map1).transform(map1);
str.log();
str.clearTransformers();
str.from([1, 2]);
str.transform(map1).transform(map1);
str.log();