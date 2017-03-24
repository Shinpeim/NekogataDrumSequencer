<style scoped>
    .note {
        width: 80px;
    }
</style>
<template>
    <div class="row">
        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <span class="card-title brown-text">PatternEditor</span>
                    <span class="brown-text">
                        Track: {{selectedTrack}}
                    </span>
                    <div>
                        <p>
                            <input name="track" type="radio" value="HH" id="radio-track-1" v-model="selectedTrack" @change="setTrack"/>
                            <label for="radio-track-1">HH</label>
                        </p>
                        <p>
                            <input name="track" type="radio" value="SD" id="radio-track-2" v-model="selectedTrack" @change="setTrack"/>
                            <label for="radio-track-2">SD</label>
                        </p>
                        <p>
                            <input name="track" type="radio" value="BD" id="radio-track-3" v-model="selectedTrack" @change="setTrack"/>
                            <label for="radio-track-3">BD</label>
                        </p>
                        <p>
                            <input name="track" type="radio" value="RS" id="radio-track-4" v-model="selectedTrack" @change="setTrack"/>
                            <label for="radio-track-4">RS</label>
                        </p>
                    </div>
                </div>
                <div class="card horizontal">
                    <div class="card-stacked">
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[0]}" @click="toggleNote(0)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[1]}" @click="toggleNote(1)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[2]}" @click="toggleNote(2)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[3]}" @click="toggleNote(3)"><span class="note"></span></span></div>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[4]}" @click="toggleNote(4)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[5]}" @click="toggleNote(5)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[6]}" @click="toggleNote(6)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[7]}" @click="toggleNote(7)"><span class="note"></span></span></div>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[8]}" @click="toggleNote(8)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[9]}" @click="toggleNote(9)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[10]}" @click="toggleNote(10)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[11]}" @click="toggleNote(11)"><span class="note"></span></span></div>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[12]}" @click="toggleNote(12)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[13]}" @click="toggleNote(13)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[14]}" @click="toggleNote(14)"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large teal" :class="{'lighten-5': ! notes[15]}" @click="toggleNote(15)"><span class="note"></span></span></div>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Base from './Base'

    export default {
        mixins: [Base],

        created(){
            this.subscriptions.push(
                this.usecase.selectedTrackChanged.subscribe(() => {
                    this.selectedTrack = this.usecase.sequencer.selectedPattern.selectedTrack;
                })
            );
            this.subscriptions.push(
                this.usecase.notesChanged.subscribe(() => {
                    this.notes = Object.assign({}, this.usecase.sequencer.selectedPattern.selectedScore.notes)
                })
            );
        },

        data(){
            return {
                selectedTrack: this.usecase.sequencer.selectedPattern.selectedTrack,
                notes: Object.assign({}, this.usecase.sequencer.selectedPattern.selectedScore.notes)
            };
        },

        methods: {
            setTrack() {
                this.usecase.selectTrack(this.selectedTrack);
            },
            toggleNote(index) {
                this.usecase.toggleNote(index);
            }
        },

    }
</script>
