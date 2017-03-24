import Score from './Score'

export default class {
    /**
     * @returns Score
     */
    get selectedScore(){
        return this.scores[this.selectedTrack];
    }

    constructor(){
        this.tracks = ["HH", "BD", "SD", "RS"];

        this.scores = {};
        for (const track of this.tracks) {
            this.scores[track] = new Score();
        }

        this.selectedTrack = this.tracks[0];
    }

    selectTrack(track){
        this.selectedTrack = track;
        console.debug("track selected: " + track);
    }
}
