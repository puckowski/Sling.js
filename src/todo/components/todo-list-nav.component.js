import NoteService from '../services/note.service.js';

import { getState, textNode, markup, getRouteSegments, route } from '../../../dist/sling.min';
import { Observable } from '../../../dist/sling-reactive.min';

class TodoListNavComponent {

    constructor() {
        this.routeString = '';
    }

    slOnInit() {
        this.performRouteAction(getRouteSegments()[0]);

        let routeObservable = Observable(getRouteSegments());
        routeObservable.subscribe(function (routeArr) {
            if (routeArr.length > 0) {
                this.routeString = routeArr[0];
            }
            else {
                this.routeString = '';
            }
        }.bind(this));
    }

    routeToAll() {
        route('all');
    }

    routeToCompleted() {
        route('completed');
    }

    performRouteAction(routeString) {
        this.routeString = routeString;

        switch (routeString) {
            case 'all': {
                this.routeToAll();

                break;
            }
            case 'completed': {
                this.routeToCompleted();

                break;
            }
            default: {
                this.routeString = 'all';
                this.routeToAll();

                break;
            }
        }
    }

    completeNote(note) {
        let stateObj = getState();

        stateObj.getNotes().forEach((stateNote) => {
            if (stateNote === note) {
                stateNote.completed = !note.completed;
            }
        })

        setState(stateObj);
        new NoteService().setNoteCookie(stateObj);
    }

    view() {
        return markup('ul', {
            attrs: {
                class: 'nav',
                style: 'width:50%;margin:auto;',
                id: 'divNoteNav'
            },
            children: [
                markup('li', {
                    attrs: {
                        class: 'nav-item'
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                ... this.routeString !== 'all' && { class: 'nav-link' },
                                ... this.routeString === 'all' && { class: 'nav-link textBold' },
                                onclick: this.performRouteAction.bind(this, 'all'),
                                style: 'cursor:pointer;'
                            },
                            children: [
                                textNode('All')
                            ]
                        })
                    ]
                }),
                markup('li', {
                    attrs: {
                        class: 'nav-item'
                    },
                    children: [
                        markup('a', {
                            attrs: {
                                ... this.routeString !== 'completed' && { class: 'nav-link' },
                                ... this.routeString === 'completed' && { class: 'nav-link textBold' },
                                onclick: this.performRouteAction.bind(this, 'completed'),
                                style: 'cursor:pointer;'
                            },
                            children: [
                                textNode('Completed')
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

export default TodoListNavComponent;
