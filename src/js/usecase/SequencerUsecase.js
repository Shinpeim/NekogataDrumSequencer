import Sequencer from '../domain/Sequencer'

export default class {
    constructor(){
        this.sequencer = new Sequencer();
    }

    selectPattern(id) {
        this.sequencer.selectPattern(id);
    }

    selectTrack(track) {
        this.sequencer.selectedPattern.selectTrack(track);
    }
}
