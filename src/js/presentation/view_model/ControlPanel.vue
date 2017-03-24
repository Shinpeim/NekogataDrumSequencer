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
                            Pattern: {{selectedPatternId}}
                        </span>
                        <div>
                            <input name="pattern" type="radio" value="1" id="radio-pattern-1" v-model="selectedPatternId" @change="setPatternId"/>
                            <label for="radio-pattern-1"></label>
                            <input name="pattern" type="radio" value="2" id="radio-pattern-2" v-model="selectedPatternId" @change="setPatternId"/>
                            <label for="radio-pattern-2"></label>
                            <input name="pattern" type="radio" value="3" id="radio-pattern-3" v-model="selectedPatternId" @change="setPatternId"/>
                            <label for="radio-pattern-3"></label>
                            <input name="pattern" type="radio" value="4" id="radio-pattern-4" v-model="selectedPatternId" @change="setPatternId"/>
                            <label for="radio-pattern-4"></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ServiceLocator from '../../usecase/UsecaseServiceLocator'

    export default {
        created(){
            this.usecase = ServiceLocator.resolve("SequencerUsecase");
        },

        data(){
            return {
                bpm: "120",
                selectedPatternId: "1"
            }
        },

        methods: {
            setBpm(){
                const bpm = document.getElementById("bpm-slider").value;
                this.bpm = parseInt(bpm);

                this.$emit("bpmChanged", bpm)
            },

            setPatternId() {
                this.usecase.selectPattern(this.selectedPatternId);
            }
        }
    }
</script>
