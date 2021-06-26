import { markup, textNode, version } from '../../../dist/sling.min';

class NavbarComponent {

    constructor() {
    }

    view() {
        return markup('nav', {
            attrs: {
                class: 'navbar navbar-light bg-light',
                id: 'divNavbar'
            },
            children: [
                markup('span', {
                    attrs: {
                    },
                    children: [
                        markup('img', {
                            attrs: {
                                src: 'images/sling.png',
                                width: '30px',
                                height: '30px',
                                class: 'd-inline-block align-top',
                                style: 'margin-right:0.5rem;margin-top:0.3125rem;margin-bottom:0.3125rem;'
                            },
                            children: [

                            ]
                        }),
                        markup('span', {
                            attrs: {
                                class: 'navbar-brand'
                            },
                            children: [
                                textNode('Sling')
                            ]
                        }),
                        markup('div', {
                            attrs: {
                                style: 'display:inline-flex;'
                            },
                            children: [
                                markup('ul', {
                                    attrs: {
                                        class: 'navbar-nav'
                                    },
                                    children: [
                                        markup('li', {
                                            attrs: {
                                                class: 'nav-item'
                                            },
                                            children: [
                                                textNode('v' + version())
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
