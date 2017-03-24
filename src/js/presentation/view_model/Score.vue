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
                            <input name="track" type="radio" value="H.H." id="radio-track-1" v-model="selectedTrack"/>
                            <label for="radio-track-1">H.H.</label>
                            <input name="track" type="radio" value="S.D" id="radio-track-2" v-model="selectedTrack"/>
                            <label for="radio-track-2">S.D.</label>
                            <input name="track" type="radio" value="B.D." id="radio-track-3" v-model="selectedTrack"/>
                            <label for="radio-track-3">B.D.</label>
                            <input name="track" type="radio" value="R.S." id="radio-track-4" v-model="selectedTrack"/>
                            <label for="radio-track-4">R.S.</label>
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
    </div>
</template>
<script>
    export default {
        data(){
            return {
                selectedTrack: "H.H."
            }
        },

        methods: {
        }
    }
</script>
