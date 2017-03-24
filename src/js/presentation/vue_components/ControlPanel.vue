<style>
</style>
<template>
    <div class="row">
        <div class="col s12">
            <div class="card horizontal">
                <div class="card-image left-pane">
                    <div class="card-content">
                        <a :class="{'disabled': ! isSoundsInited}" class="btn-floating btn-large waves-effect waves-light" @click="togglePlayingState">
                            <i class="material-icons">{{playButtonIcon}}</i>
                        </a>
                    </div>
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <span class="brown-text">
                            BPM: {{bpm}}
                        </span>
                        <p class="range-field">
                            <input type="range" id="bpm-slider" min="10" max="360" :value="bpm" @input="setBpm"/>
                        </p>
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
    import Base from './Base'

    export default {
        mixins: [Base],

        created(){
            this.subscriptions.push(
                this.usecase.selectedPatternChanged.subscribe(() => {
                    this.selectedPatternId = this.usecase.sequencer.selectedPatternId;
                })
            );

            this.subscriptions.push(
                this.usecase.playingStateChanged.subscribe(() => {
                    this.playingState = this.usecase.player.playingState;
                })
            );

            this.subscriptions.push(
                this.usecase.bpmChanged.subscribe(() => {
                    this.bpm= this.usecase.player.bpm;
                })
            );

            this.subscriptions.push(
                this.usecase.isSoundsInitedChanged.subscribe(() => {
                    console.debug(this.usecase.player);
                    this.isSoundsInited = this.usecase.player.isSoundsInited;
                })
            );
        },

        data(){
            return {
                bpm: this.usecase.player.bpm,
                selectedPatternId: this.usecase.sequencer.selectedPatternId,
                playingState: this.usecase.player.playingState,
                isSoundsInited: this.usecase.player.isSoundsInited
            }
        },

        computed:{
            playButtonIcon(){
                if (this.playingState) {
                    return 'stop';
                } else {
                    return 'play_arrow';
                }
            }
        },

        methods: {
            setBpm(){
                const bpm = document.getElementById("bpm-slider").value;
                console.log(bpm);
                this.usecase.setBpm(bpm);
            },

            setPatternId() {
                this.usecase.selectPattern(this.selectedPatternId);
            },

            togglePlayingState(){
                this.usecase.togglePlayingState();
            }
        }
    }
</script>
