class NavbarComponent {

    constructor() {

    }

    view() {
        return s.markup('nav', {
            attrs: {
                class: 'navbar navbar-light bg-light',
                id: "navbar"
            },
            children: [
                s.markup('span', {
                    attrs: {
                    },
                    children: [
                        s.markup('img', {
                            attrs: {
                                src: 'sling.png',
                                width: '30px',
                                height: '30px',
                                class: 'd-inline-block align-top',
                                style: 'margin-right:0.5rem;margin-top:0.3125rem;margin-bottom:0.3125rem;'
                            },
                            children: [
        
                            ]
                        }),
                        s.markup('span', {
                            attrs: {
                                class: 'navbar-brand'
                            },
                            children: [
                                s.textNode('Sling')
                            ]
                        }),
                        s.markup('div', {
                            attrs: {
                                style: 'display:inline-flex;'
                            },
                            children: [
                                s.markup('ul', {
                                    attrs: {
                                        class: 'navbar-nav'
                                    },
                                    children: [
                                        s.markup('li', {
                                            attrs: {
                                                class: 'nav-item'
                                            },
                                            children: [
                                                s.textNode('v' + s.version)
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

export default NavbarComponent;