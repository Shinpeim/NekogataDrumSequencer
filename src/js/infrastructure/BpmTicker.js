import Notificator from '../lib/Notificator'

export default class {
    constructor(){
        this.bpm = null;
        this.playing = false;

        // Events
        this.ticked = new Notificator();
    };

    start(bpm, callback){
        this.bpm = bpm;
        this.callback = callback;
        this.playing = true;
        this._setNextTimeout()
    }

    _setNextTimeout(){
        if(this.playing == false) {
            return;
        }

        const nextFromBpm = this._millSecPer16thNote(this.bpm);
        setTimeout(() => {
            this.callback();
            this._setNextTimeout();
            this.ticked.notify();
        }, nextFromBpm);
    }

    stop(){
        this.playing = false;
    }

    _millSecPer16thNote(bpm){
        return (60000 / (bpm * 4));
    }
}

