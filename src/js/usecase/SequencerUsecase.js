import Sequencer from '../model/Sequencer'

export default class {
    constructor(){
        this.sequencer = new Sequencer();
    }

    selectPattern(id) {
        this.sequencer.selectPattern(id);
    }
}
