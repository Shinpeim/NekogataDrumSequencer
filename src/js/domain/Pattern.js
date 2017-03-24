import Score from './Score'

export default class {
    /**
     * @returns Score
     */
    get selectedScore(){
        return this.scores[this.selectedTrack];
    }

    constructor(){
        this.tracks = ["BD", "SD", "HH","RS"];
        const initialNotes = {
            "BD": [
                true, false, false, false, false, false, false, false,
                true, false, false, false, false, false, false, false
            ],
            "SD": [
                false, false, false, false, true, false, false, false,
                false, false, false, false, true, false, false, false
            ],
            "HH": [
                true, false, true, false, true, false, true, false,
                true, false, true, false, true, false, true, false
            ],

            "RS": [
                false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false
            ],
        };

        this.scores = {};
        for (const track of this.tracks) {
            this.scores[track] = new Score(initialNotes[track]);
        }

        this.selectedTrack = this.tracks[0];
    }

    selectTrack(track){
        this.selectedTrack = track;
        console.debug("track selected: " + track);
    }
}
