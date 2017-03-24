export default class {
    constructor(ticker, sequencer, sounds){
        this._sequencer = sequencer;
        this._sounds = sounds;
        this._ticker = ticker;

        this.isSoundsInited = false;
        this.playingState = false;
        this.playingNoteIndex = null;
        this.bpm = 120;
    }

    togglePlayingState(){
        if (this.playingState) {
            this._stop();
        } else {
            this._play();
        }
    }

    initSounds() {
        const promises = [];
        for (const key in this._sounds) {
            promises.push(this._sounds[key].setup());
        }
        return Promise.all(promises).then(()=>{
            this.isSoundsInited = true;
        });
    }

    setBpm(bpm){
        this.bpm = bpm;
        this._ticker.bpm = bpm;
    }

    _play(){
        this.playingState = true;
        this._ticker.start(this.bpm, () => this._playNextSound());
    }

    _stop(){
        this.playingState = false;
        this._ticker.stop();
    }

    _playNextSound(){
        if (this.playingState == false) {
            this.playingNoteIndex = null;
            return;
        }
        if (this.playingNoteIndex == null || this.playingNoteIndex == 15) {
            this.playingNoteIndex = 0;
        } else {
            this.playingNoteIndex += 1;
        }

        this._playSound()
    }

    _playSound(){
        const i = this.playingNoteIndex;
        for (const track of this._sequencer.selectedPattern.tracks) {
            if (this._sequencer.selectedPattern.scores[track].notes[i]) {
                this._sounds[track].play();
            }
        }

    }
}

