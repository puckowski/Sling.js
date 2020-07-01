import Note from '../models/note.model.js';
import NoteService from '../services/note.service.js';

import { setState, getState, markup, textNode } from '../../../dist/sling.min';

class NoteInputComponent {

    constructor() {
        this.noteText = '';
        this.inputTarget = null;
    }

    slOnInit() {
        console.log('Initializing NoteInputComponent');
    }

    updateNoteText(event) {
        this.noteText = event.target.value;
        this.inputTarget = event.target;
    }

    getNoteText() {
        return this.noteText;
    }

    resetInput() {
        this.noteText = '';
        this.inputTarget.value = '';
    }

    addNewNote() {
        const noteText = this.getNoteText();

        if (!noteText || noteText.length === 0) {
            return;
        }

        let stateObj = getState();

        stateObj.getNotes().push(new Note(noteText, false));
        setState(stateObj);
        new NoteService().setNoteCookie(stateObj);

        this.resetInput();
    }

    clearCompletedNotes() {
        let stateObj = getState();

        let currNote, clearedNote = false;
        for (let i = 0; i < stateObj.getNotes().length; ++i) {
            currNote = stateObj.getNotes()[i];

            if (currNote.completed === true) {
                stateObj.getNotes().splice(i, 1);
                clearedNote = true;
                i--;
            }
        }

        if (clearedNote === true) {
            setState(stateObj);
            new NoteService().setNoteCookie(stateObj);
        }

        document.querySelectorAll('#divTodoList input').forEach(node => {
            node.checked = false;
            node.removeAttribute('readonly');
        });
    }

    view() {
        return markup('div', {
            attrs: {
                class: 'input-group',
                id: 'divNoteInput',
                style: 'padding:1rem;'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'display:grid;width:50%;margin:auto;'
                    },
                    children: [
                        markup('textarea', {
                            attrs: {
                                class: 'form-control',
                                "aria-label": 'Note textarea',
                                oninput: this.updateNoteText.bind(this)
                            }
                        }),
                        markup('br', {

                        }),
                        markup('div', {
                            attrs: {
                                style: 'justify-self:center;'
                            },
                            children: [
                                markup('button', {
                                    attrs: {
                                        class: 'btn btn-primary',
                                        type: 'submit',
                                        onclick: this.addNewNote.bind(this),
                                        style: 'width:150px;margin-right:1rem;'
                                    },
                                    children: [
                                        textNode('Add note')
                                    ]
                                }),
                                markup('button', {
                                    attrs: {
                                        class: 'btn btn-primary',
                                        type: 'submit',
                                        onclick: this.clearCompletedNotes.bind(this),
                                        style: 'width:150px;'
                                    },
                                    children: [
                                        textNode('Clear completed')
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

export default NoteInputComponent;
