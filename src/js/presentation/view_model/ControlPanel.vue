<style>
</style>
<template>
    <div class="row">
        <div class="col s12">
            <div class="card horizontal">
                <div class="card-image left-pane">
                    <div class="card-content">
                        <a class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">play_arrow</i></a>
                    </div>
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <span class="brown-text">
                            BPM: {{bpm}}
                        </span>
                        <span class="range-field">
                            <input type="range" id="bpm-slider" min="10" max="360" :value="bpm" @input="setBpm"/>
                        </span>
                    </div>
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <span class="brown-text">
                            Track: {{trackNo}}
                        </span>
                        <div>
                            <input name="track" type="radio" value="1" id="radio-track-1" v-model="trackNo"/>
                            <label for="radio-track-1"></label>
                            <input name="track" type="radio" value="2" id="radio-track-2" v-model="trackNo"/>
                            <label for="radio-track-2"></label>
                            <input name="track" type="radio" value="3" id="radio-track-3" v-model="trackNo"/>
                            <label for="radio-track-3"></label>
                            <input name="track" type="radio" value="4" id="radio-track-4" v-model="trackNo"/>
                            <label for="radio-track-4"></label>
                            <input name="track" type="radio" value="5" id="radio-track-5" v-model="trackNo"/>
                            <label for="radio-track-5"></label>
                            <input name="track" type="radio" value="6" id="radio-track-6" v-model="trackNo"/>
                            <label for="radio-track-6"></label>
                            <input name="track" type="radio" value="7" id="radio-track-7" v-model="trackNo"/>
                            <label for="radio-track-7"></label>
                            <input name="track" type="radio" value="8" id="radio-track-8" v-model="trackNo"/>
                            <label for="radio-track-8"></label>
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
                bpm: "120",
                trackNo: "1"
            }
        },

        methods: {
            setBpm(){
                const bpm = document.getElementById("bpm-slider").value;
                this.bpm = parseInt(bpm);

                this.$emit("bpmChanged", bpm)
            }
        }
    }
</script>