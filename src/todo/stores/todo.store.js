import { Observable } from "../../../dist/sling-reactive.min";
import { getRouteSegments } from "../../../dist/sling.min";

class StoreTodo {
    constructor() {
        this.notes = [];
        this.noteAddedCount = 0;
        this.routeObservable = Observable(getRouteSegments());
    }

    getRouteObservable() {
        return this.routeObservable;
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

    getNoteAddedCount() {
        return this.noteAddedCount;
    }

    incrementNoteAddedCount() {
        this.noteAddedCount++;
    }
}

export default StoreTodo;
