import NoteService from '../services/note.service.js';

import { getState, setState, markup } from '../../sling/core/sling';

class TodoListComponent {

    constructor() {
    }

    completeNote(note) {
        let stateObj = getState();
        let updatedNoteIndex = 0;
        let updatedNote = false;

        stateObj.getNotes().forEach((stateNote, index) => {
            if (stateNote === note) {
                stateNote.completed = !note.completed;
                updatedNote = true;
                updatedNoteIndex = index;
            }
        })

        setState(stateObj);
        new NoteService().setNoteCookie(stateObj);

        if (updatedNote === true && note.completed === false) {
            document.querySelectorAll('#divTodoList input').forEach((node, index) => {
                if (index === ((updatedNoteIndex * 2) + 1)) {
                    node.removeAttribute('readonly');
                }
            });
        }
    }

    updateNote(note, event) {
        let stateObj = getState();

        stateObj.getNotes().forEach(stateNote => {
            if (stateNote === note) {
                stateNote.text = event.target.value;
            }
        })

        setState(stateObj);
        new NoteService().setNoteCookie(stateObj);
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
                        ...Array.from(getState().getNotes(), (note) =>
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
                                            }),
                                            markup('img', {
                                                attrs: {
                                                    src: 'images/cat-typing.gif',
                                                    width: '50px',
                                                    height: '50px'
                                                }
                                            })
                                        ]
                                    }),
                                    markup('input', {
                                        attrs: {
                                            value: note.text,
                                            class: 'form-control',
                                            ...note.completed && { readonly: 'true' },
                                            oninput: this.updateNote.bind(this, note),
                                            style: 'margin-left:1px;'
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

export default TodoListComponent;
