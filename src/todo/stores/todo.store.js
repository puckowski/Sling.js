class StoreTodo {
    constructor() {
        this.notes = [];
    }

    getNotes() {
        return this.notes;
    }

    setNotes(newNoteArray) {
        this.notes = newNoteArray;
    }

    addNotes(dataObject) {
        dataObject.notes.forEach(note => {
            this.notes.push(note);
        });
    }
}

export default StoreTodo;
