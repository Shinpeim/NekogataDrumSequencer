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
                    <span class="card-title brown-text">Score</span>
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
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                        <div class="card-content cel"><span class="note waves-effect waves-light btn-large"><span class="note"></span></span></div>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ServiceLocator from '../../usecase/UsecaseServiceLocator'

    export default {
        beforeCreate(){
            this.usecase = ServiceLocator.resolve("SequencerUsecase");
        },

        created(){
            this.usecase.sequencer.selectedPatternChanged.subscribe(() => {
                this.selectedTrack = this.usecase.sequencer.selectedPattern.selectedTrack;
            });
        },

        data(){
            return {
                selectedTrack: this.usecase.sequencer.selectedPattern.selectedTrack
            };
        },

        methods: {
            setTrack() {
                this.usecase.selectTrack(this.selectedTrack);
            }
        }
    }
</script>
