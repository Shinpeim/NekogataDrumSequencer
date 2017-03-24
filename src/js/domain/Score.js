export default class {
    constructor(){
        this.notes = [
            false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false
        ];
    }

    toggleNote(index) {
        this.notes[index] = ! this.notes[index];
    }
}
