import Pattern from './Pattern.js'

export default class {
    get selectedPattern(){
        return this.patterns[this.selectedPatternId];
    }
    constructor(){
        this.patternIds = ["1", "2", "3", "4"];

        this.patterns = {};
        for (const id of this.patternIds) {
            this.patterns[id] = new Pattern();
        }

        this.selectedPatternId = this.patternIds[0];
    }

    selectPattern(id) {
        this.selectedPatternId = id;
    }
}
