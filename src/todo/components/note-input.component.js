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

        stateObj.notes.push({ text: noteText, completed: false });
        s.setState(stateObj);

        this.resetInput();
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
                        style: 'display:inline-flex;width:50%;margin:auto;'
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
                        s.markup('button', {
                            attrs: {
                                class: 'btn btn-primary',
                                type: 'submit',
                                onclick: this.addNewNote.bind(this),
                                style: 'width:150px;'
                            },
                            children: [
                                s.textNode('Add note')
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

export default NoteInputComponent;