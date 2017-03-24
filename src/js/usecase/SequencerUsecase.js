import Sequencer from '../domain/Sequencer'
import Player from '../domain/Player'
import BpmTicker from '../domain/BpmTicker'
import Notificator from '../lib/Notificator'

export default class {
    constructor(){
        this.sequencer = new Sequencer();
        const ticker = new BpmTicker();
        this.player = new Player(ticker);

        //Events
        this.selectedPatternChanged = new Notificator();
        this.selectedTrackChanged = new Notificator();
        this.notesChanged = new Notificator();
        this.playingStateChanged = new Notificator();
        this.playingNoteIndexChanged = new Notificator();
        this.bpmChanged = new Notificator();

        // subscribe ticker events
        ticker.ticked.subscribe(() => {
            console.debug(this.player);
            this.playingNoteIndexChanged.notify();
        });
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

    togglePlayingState() {
        this.player.togglePlayingState();
        this.playingStateChanged.notify();
        this.playingNoteIndexChanged.notify();
    }

    setBpm(bpm) {
        this.player.setBpm(bpm);
        this.bpmChanged.notify();
    }
}
