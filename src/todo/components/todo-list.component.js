import NoteService from '../services/note.service.js';

class TodoListComponent {

    constructor() {

    }

    completeNote(note) {
        let stateObj = s.getState();

        stateObj.getNotes().forEach((stateNote) => {
            if (stateNote === note) {
                stateNote.completed = !note.completed;
            }
        })

        s.setState(stateObj);
        new NoteService().setNoteCookie(stateObj);
    }

    updateNote(note, event) {
        let stateObj = s.getState();

        stateObj.getNotes().forEach((stateNote) => {
            if (stateNote === note) {
                stateNote.text = event.target.value;
            }
        })

        s.setState(stateObj);
        new NoteService().setNoteCookie(stateObj);
    }

    view() {
        return s.markup('div', {
            attrs: {
                id: 'divTodoList'
            },
            children: [
                s.markup('div', {
                    attrs: {
                        style: "width:50%;margin:auto;padding:1rem;"
                    },
                    children: [
                        ...Array.from(s.getState().getNotes(), (note) =>
                            s.markup('div', {
                                attrs: {
                                    class: 'input-group mb-3 animEnter',
                                    style: 'width:100%;'
                                },
                                children: [
                                    s.markup('div', {
                                        attrs: {
                                            class: 'input-group-prepend'
                                        },
                                        children: [
                                            s.markup('div', {
                                                attrs: {
                                                    class: 'input-group-text'
                                                },
                                                children: [
                                                    s.markup('input', {
                                                        attrs: {
                                                            type: 'checkbox',
                                                            ... note.completed && { checked: 'true' },
                                                            onchange: this.completeNote.bind(this, note)
                                                        }
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    s.markup('input', {
                                        attrs: {
                                            value: note.text,
                                            class: 'form-control',
                                            ... note.completed && { readonly: 'true' },
                                            oninput: this.updateNote.bind(this, note)
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