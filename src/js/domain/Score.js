export default class {
    constructor(initialNotes){
        this.notes = initialNotes;
    }

    toggleNote(index) {
        this.notes[index] = ! this.notes[index];
    }
}
