import Sequencer from '../domain/Sequencer'
import Player from '../domain/Player'
import BpmTicker from '../domain/BpmTicker'
import Sound from '../domain/Sound'
import Notificator from '../lib/Notificator'

export default class {
    constructor(ticker, sounds){
        this.sequencer = new Sequencer();
        this.player = new Player(ticker, this.sequencer, sounds);

        //Events
        this.initializationFailed = new Notificator();
        this.isSoundsInitedChanged = new Notificator();
        this.selectedPatternChanged = new Notificator();
        this.selectedTrackChanged = new Notificator();
        this.notesChanged = new Notificator();
        this.playingStateChanged = new Notificator();
        this.playingNoteIndexChanged = new Notificator();
        this.bpmChanged = new Notificator();

        // subscribe _ticker events
        ticker.ticked.subscribe(() => {
            console.debug("ticked");
            this.playingNoteIndexChanged.notify();
        });
    }

    initSound(){
        this.player.initSounds().then(()=>{
            this.isSoundsInitedChanged.notify();
        }).catch((e) => {
            console.error(e);
            this.initializationFailed.notify();
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
