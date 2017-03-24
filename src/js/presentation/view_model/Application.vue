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
    import Navigation from './Navigation.vue'
    import ControlPanel from './ControlPanel.vue'
    import PatternEditor from './PatternEditor.vue'
    import SequencerUsecase from '../../usecase/SequencerUsecase'
    import ServiceLocator from '../../usecase/UsecaseServiceLocator'

    export default {
        components: {
            Navigation,
            ControlPanel,
            PatternEditor
        },

        beforeCreate() {
            ServiceLocator.register('SequencerUsecase',new SequencerUsecase());
        }
    }
</script>
