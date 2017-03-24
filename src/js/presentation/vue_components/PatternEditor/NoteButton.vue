<style scoped>
    .note {
        width: 80px;
    }
</style>
<template>
    <div class="card-content cel">
        <span class="note btn-large"
              :class="[isPlayingBeat ? 'orange' : 'teal', {'lighten-5': ! notes[index]}]"
              @click="toggleNote(index)">
            <span class="note"></span>
        </span>
    </div>
</template>
<script>
    import Base from '../Base'

    export default {
        mixins: [Base],

        props: ['index'],

        created(){
            this.subscriptions.push(
                this.usecase.notesChanged.subscribe(() => {
                    this.notes = Object.assign({}, this.usecase.sequencer.selectedPattern.selectedScore.notes)
                })
            );

            this.subscriptions.push(
                this.usecase.playingNoteIndexChanged.subscribe(() => {
                    this.playingNoteIndex = this.usecase.player.playingNoteIndex;
                })
            );
        },

        computed:{
            isPlayingBeat(){
                if (this.playingNoteIndex == null) {
                    return false;
                }
                return (Math.floor(this.playingNoteIndex / 4) == Math.floor(this.index / 4));
            }
        },

        data(){
            return {
                notes: Object.assign({}, this.usecase.sequencer.selectedPattern.selectedScore.notes),
                playingNoteIndex: this.usecase.player.playingNoteIndex
            }
        },

        methods: {
            toggleNote(index) {
                this.usecase.toggleNote(index);
            }
        }
    }
</script>
