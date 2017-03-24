import Pattern from './Pattern.js'
import Notificator from '../lib/Notificator'

export default class {
    /**
     * @returns Pattern
     */
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

        this.selectedPatternChanged = new Notificator();
    }

    selectPattern(id) {
        this.selectedPatternId = id;
        this.selectedPatternChanged.notify();
        console.debug("pattern selected: " + this.selectedPatternId);
    }
}
