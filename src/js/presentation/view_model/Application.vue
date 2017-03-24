<style scoped>
</style>
<template>
    <div>
        <navigation></navigation>
        <div class="container">
            <control-panel></control-panel>
            <score></score>
        </div>
    </div>
</template>
<script>
    import Navigation from './Navigation.vue'
    import ControlPanel from './ControlPanel.vue'
    import Score from './Score.vue'
    import SequencerUsecase from '../../usecase/SequencerUsecase'
    import ServiceLocator from '../../usecase/UsecaseServiceLocator'

    export default {
        components: {
            Navigation,
            ControlPanel,
            Score
        },

        beforeCreate() {
            ServiceLocator.register('SequencerUsecase',new SequencerUsecase());
        }
    }
</script>
