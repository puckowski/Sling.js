class LoginCardComponent {

    constructor() {

    }

    performLogin() {
        alert('Logged in!');
    }

    view() {
        return s.markup('div', {
            attrs: {
                style: 'height:calc(100% - 56px);display:flex;'
            },
            children: [
                s.markup('div', {
                    attrs: {
                        style: 'padding:1rem;width:30rem;margin:auto;justify-self:center;',
                        class: 'card'
                    },
                    children: [
                        s.markup('h5', {
                            attrs: {
                                class: 'card-title'
                            },
                            children: [
                                s.textNode('Login')
                            ]
                        }),
                        s.markup('p', {
                            attrs: {
                                class: 'card-text'
                            },
                            children: [
                                s.textNode('Click to login.')
                            ]
                        }),
                        s.markup('button', {
                            attrs: {
                                onclick: this.performLogin,
                                type: 'button',
                                class: 'btn ' + s.getState().buttonClass
                            }, 
                            children: [
                                s.textNode('Login')
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

export default LoginCardComponent;