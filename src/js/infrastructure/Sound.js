export default class {
    constructor(fileURL){
        this._fileURL = fileURL;
        this._loaded = false;
        this._buffer = null;
    }

    setup(){
        return new Promise((resolve, reject) => {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this._context = new AudioContext();
                console.debug("audio context created");
                resolve();
            } catch (e) {
                reject(new Error("can't create AudioContext"));
                return;
            }
        }).then(() => {
            return this._loadBuffer(this._fileURL)
        }).then(() => {
            this._loaded = true;
        })
    }

    play(){
        console.debug("playing sound");
        const source = this._context.createBufferSource();
        source.buffer = this._buffer;
        source.connect(this._context.destination);
        source.start(0);
    }

    _loadBuffer(){
        const request = new XMLHttpRequest();
        request.open('GET', this._fileURL , true);
        request.responseType = 'arraybuffer';

        return new Promise((resolve, reject) => {
            request.onload = () => {
                this._context.decodeAudioData(request.response, (buffer) => {
                    this._buffer = buffer;
                    resolve();
                }, (e) => {
                    reject(e);
                });
            };
            request.send();
        })
    }
}
