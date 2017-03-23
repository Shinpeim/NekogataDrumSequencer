<style scoped>
</style>
<template>
    <div>
        <navigation></navigation>
        <div class="container">
            <control-panel></control-panel>
        </div>
    </div>
</template>
<script>
    import Navigation from './Navigation.vue'
    import ControlPanel from './ControlPanel.vue'
    export default {
        components: {
            Navigation,
            ControlPanel
        },
    }
</script>