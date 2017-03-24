export default class {
    constructor(){
        this.notes = [
            true, false, false, false, true, false, false, false,
            true, false, false, false, true, false, false, false
        ];
    }

    toggleNote(index) {
        this.notes[index] = ! this.notes[index];
    }
}
