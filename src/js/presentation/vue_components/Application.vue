<style scoped>
</style>
<template>
    <div>
        <navigation></navigation>
        <div class="container">
            <control-panel></control-panel>
            <pattern-editor></pattern-editor>
        </div>
    </div>
</template>
<script>
    import ServiceLocator from '../../usecase/UsecaseServiceLocator'
    import Navigation from './Navigation.vue'
    import ControlPanel from './ControlPanel.vue'
    import PatternEditor from './PatternEditor.vue'
    import SequencerUsecase from '../../usecase/SequencerUsecase'
    import BpmTicker from '../../infrastructure/BpmTicker'
    import Sound from '../../infrastructure/Sound'

    export default {
        components: {
            Navigation,
            ControlPanel,
            PatternEditor
        },

        beforeCreate() {
            const ticker = new BpmTicker();
            const sounds = {
                "HH": new Sound('./sounds/hh.wav'),
                "SD": new Sound('./sounds/sd.wav'),
                "BD": new Sound('./sounds/bd.wav'),
                "RS": new Sound('./sounds/rs.wav'),
            };

            const usecase = new SequencerUsecase(ticker, sounds);
            usecase.initSound();
            ServiceLocator.register('SequencerUsecase',usecase);
        }
    }
</script>
