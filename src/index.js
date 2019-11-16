import LoginCardComponent from './intro/components/login-card.component.js';
import NavbarComponent from './intro/components/navbar.component.js';

let state = { buttonClass: 'btn-primary', index: 0, notes: [] };
s.setState(state);

let compNavbar = new NavbarComponent();
let rootNavbar = s.mountById('divNavbar', compNavbar);

let compLogin = new LoginCardComponent();
let rootContent = s.mountById('divContent', compLogin);

s.autoUpdate(rootContent, compLogin);

setInterval(() => {
    let state = s.getState();

    if (state.index < 2) {
        state.buttonClass = 'btn-primary';
    } else if (state.index >= 2) {
        state.buttonClass = 'btn-secondary';
    }

    state.index++;

    if (state.index === 4) {
        state.index = 0;
    }

    s.setState(state);
}, 1000);

s.routeById('foo/:userId/bar', { component: compLogin, root: 'divLogin' });
//s.route('foo/5/bar');

/*
setTimeout(() => {
    s.update(rootContent, compLogin);
}, 3200);
*/
