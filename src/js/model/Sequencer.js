import Pattern from './Pattern.js'

export default class {
    constructor(){
        this.patternIds = ["1", "2", "3", "4"];

        this.patterns = {};
        for (const id of this.patternIds) {
            this.patterns[id] = new Pattern();
        }

        this.selectedPattern = this.patternIds[0];
    }

    selectPattern(id) {
        this.selectedPattern = this.patternIds[id];
    }
}
