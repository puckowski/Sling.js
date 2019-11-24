import Note from '../models/note.model.js';
import NoteService from '../services/note.service.js';

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

        let stateObj = s.getState();

        stateObj.getNotes().push(new Note(noteText, false));
        s.setState(stateObj);
        new NoteService().setNoteCookie(stateObj);

        this.resetInput();
    }

    clearCompletedNotes() {
        let stateObj = s.getState();

        let currNote;
        for(let i = 0; i < stateObj.getNotes().length; ++i) {
            currNote = stateObj.getNotes()[i];

            if (currNote.completed === true) {
                stateObj.getNotes().splice(i, 1);
                i--;
            }
        }
        
        s.setState(stateObj);
        new NoteService().setNoteCookie(stateObj);
    }

    view() {
        return s.markup('div', {
            attrs: {
                class: 'input-group',
                id: 'divNoteInput',
                style: 'padding:1rem;'
            },
            children: [
                s.markup('div', {
                    attrs: {
                        style: 'display:grid;width:50%;margin:auto;'
                    },
                    children: [
                        s.markup('textarea', {
                            attrs: {
                                class: 'form-control',
                                "aria-label": 'Note textarea',
                                style: 'margin-right:1rem;',
                                oninput: this.updateNoteText.bind(this)
                            }
                        }),
                        s.markup('br', {

                        }),
                        s.markup('div', {
                            attrs: {
                                style: 'justify-self:center;'
                            },
                            children: [
                                s.markup('button', {
                                    attrs: {
                                        class: 'btn btn-primary',
                                        type: 'submit',
                                        onclick: this.addNewNote.bind(this),
                                        style: 'width:150px;margin-right:1rem;'
                                    },
                                    children: [
                                        s.textNode('Add note')
                                    ]
                                }),
                                s.markup('button', {
                                    attrs: {
                                        class: 'btn btn-primary',
                                        type: 'submit',
                                        onclick: this.clearCompletedNotes.bind(this),
                                        style: 'width:150px;'
                                    },
                                    children: [
                                        s.textNode('Clear completed')
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