import Sequencer from '../domain/Sequencer'
import Notificator from '../lib/Notificator'

export default class {
    constructor(){
        this.sequencer = new Sequencer();

        //Events
        this.selectedPatternChanged = new Notificator();
        this.selectedTrackChanged = new Notificator();
        this.notesChanged = new Notificator();
    }

    selectPattern(id) {
        this.sequencer.selectPattern(id);
        this.selectedPatternChanged.notify();
        this.selectedTrackChanged.notify();
        this.notesChanged.notify();
    }

    selectTrack(track) {
        this.sequencer.selectedPattern.selectTrack(track);
        this.selectedTrackChanged.notify();
        this.notesChanged.notify();
    }

    toggleNote(index) {
        this.sequencer.selectedPattern.selectedScore.toggleNote(index);
        this.notesChanged.notify();
    }
}
