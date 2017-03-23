<style scoped>
   div {
       font-size: x-large;
       cursor: pointer;
   }
</style>
<template>
    <div @click="clicked">
        {{message}}
    </div>
</template>
<script>
    export default {
        data(){
            return {
                message: "click me"
            }
        },

        methods: {
            clicked(){
                this.message = "clicked"
            }
        }
    }
</script>