import NoteService from '../services/note.service.js';

import { getState, setState, markup } from '../../../dist/sling.min';

class TodoListCompletedComponent {

    constructor() {
    }

    slOnDestroy() {
        console.log('Destroy completed list component');
    }

    applyCheckedProperty() {
        document.querySelectorAll('#divTodoList input').forEach((node, index) => {
            if (index % 2 === 0) {
                node.checked = true;
            }
        });
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

        this.applyCheckedProperty();
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divTodoList'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: "width:50%;margin:auto;padding:1rem;"
                    },
                    children: [
                        ...Array.from(getState().getNotes().filter((note) => note.completed ? true : false), (note) =>
                            markup('div', {
                                attrs: {
                                    class: 'input-group mb-3 animEnter',
                                    style: 'width:100%;'
                                },
                                children: [
                                    markup('div', {
                                        attrs: {
                                            class: 'input-group-prepend'
                                        },
                                        children: [
                                            markup('div', {
                                                attrs: {
                                                    class: 'input-group-text'
                                                },
                                                children: [
                                                    markup('input', {
                                                        attrs: {
                                                            type: 'checkbox',
                                                            ...note.completed && { checked: 'true' },
                                                            onchange: this.completeNote.bind(this, note)
                                                        }
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    markup('input', {
                                        attrs: {
                                            value: note.text,
                                            class: 'form-control',
                                            ...note.completed && { readonly: 'true' }
                                        }
                                    })
                                ]
                            })
                        )
                    ]
                })
            ]
        });
    }
}

export default TodoListCompletedComponent;
