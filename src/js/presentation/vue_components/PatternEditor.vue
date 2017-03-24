<style scoped>

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
                        <note-button index="0"></note-button>
                        <note-button index="4"></note-button>
                        <note-button index="8"></note-button>
                        <note-button index="12"></note-button>
                    </div>
                    <div class="card-stacked">
                        <note-button index="1"></note-button>
                        <note-button index="5"></note-button>
                        <note-button index="9"></note-button>
                        <note-button index="13"></note-button>
                    </div>
                    <div class="card-stacked">
                        <note-button index="2"></note-button>
                        <note-button index="6"></note-button>
                        <note-button index="10"></note-button>
                        <note-button index="14"></note-button>
                    </div>
                    <div class="card-stacked">
                        <note-button index="3"></note-button>
                        <note-button index="7"></note-button>
                        <note-button index="11"></note-button>
                        <note-button index="15"></note-button>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Base from './Base'
    import NoteButton from './PatternEditor/NoteButton.vue'

    export default {
        mixins: [Base],

        components: {NoteButton},

        created(){
            this.subscriptions.push(
                this.usecase.selectedTrackChanged.subscribe(() => {
                    this.selectedTrack = this.usecase.sequencer.selectedPattern.selectedTrack;
                })
            );
        },

        data(){
            return {
                selectedTrack: this.usecase.sequencer.selectedPattern.selectedTrack,
                playingNoteIndex: this.usecase.player.playingNoteIndex
            };
        },

        methods: {
            setTrack() {
                this.usecase.selectTrack(this.selectedTrack);
            }
       }
    }
</script>
