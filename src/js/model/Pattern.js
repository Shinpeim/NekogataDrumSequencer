import Score from './Score'

export default class {
    constructor(){
        this.tracks = ["HH", "BD", "SD", "RS"];

        this.scores = {};
        for (const track of this.tracks) {
            this.scores[track] = new Score();
        }

        this.selectedTrack = this.tracks[0];
    }
}
