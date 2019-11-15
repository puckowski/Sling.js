import LoginCardComponent from './app/components/login-card.component.js';
import NavbarComponent from './app/components/navbar.component.js';

let state = { buttonClass: 'btn-primary', index: 0 };
s.setState(state);

let compNavbar = new NavbarComponent();
const rendNavbar = s.render(compNavbar.view());
let rootNavbar = s.mountById('divNavbar', rendNavbar);

let compLogin = new LoginCardComponent();
const rendLogin = s.render(compLogin.view());
let rootContent = s.mountById('divContent', rendLogin);

s.autoUpdate(rootContent, rendLogin, compLogin);

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
