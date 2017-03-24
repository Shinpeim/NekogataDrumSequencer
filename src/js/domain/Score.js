export default class {
    constructor(){
        this.notes = [
            false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false
        ];
    }

    toggleNote(index) {
        this.note[index] = ! this.note[index];
    }
}
