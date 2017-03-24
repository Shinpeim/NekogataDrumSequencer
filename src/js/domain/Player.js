export default class {
    constructor(ticker){
        this.playingState = false;
        this.playingNoteIndex = null;
        this.bpm = 120;
        this.ticker = ticker;
    }

    togglePlayingState(){
        if (this.playingState) {
            this._stop();
        } else {
            this._play();
        }
    }

    setBpm(bpm){
        this.bpm = bpm;
        this.ticker.bpm = bpm;
    }

    _play(){
        this.playingState = true;
        this.ticker.start(this.bpm, () => this._playNextSound());
    }

    _stop(){
        this.playingState = false;
        this.ticker.stop();
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
        console.debug("playing sound: " + this.playingNoteIndex);
    }
}

