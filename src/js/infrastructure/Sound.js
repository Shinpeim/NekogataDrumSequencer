let context = null;

export default class {
    constructor(fileURL){
        this._fileURL = fileURL;
        this._buffer = null;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (context == null) {
                context = new AudioContext();
            }
            console.debug("audio context created");
        } catch (e) {
            throw new Error("can't create AudioContext");
        }

    }

    setup(){
        const request = new XMLHttpRequest();
        request.open('GET', this._fileURL , true);
        request.responseType = 'arraybuffer';

        return new Promise((resolve, reject) => {
            request.onload = () => {
                context.decodeAudioData(request.response, (buffer) => {
                    this._buffer = buffer;
                    resolve();
                }, (e) => {
                    reject(e);
                });
            };
            request.send();
        });
    }

    play(){
        console.debug("playing sound");
        const source = context.createBufferSource();
        source.buffer = this._buffer;
        source.connect(context.destination);
        source.start(0);
    }
}
