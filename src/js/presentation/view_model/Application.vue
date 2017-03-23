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

    export default {
        components: {
            Navigation,
            ControlPanel,
            Score
        },
    }
</script>