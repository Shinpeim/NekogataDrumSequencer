<style scoped>
   div {
       font-size: x-large;
       cursor: pointer;
   }
</style>
<template>
    <div>
        <nav>
            <div class="container">
                <div class="nav-wrapper">
                    <a class="brand-logo">Finger Drum Sequencer</a>
                </div>
            </div>
        </nav>
        <div class="container">
        </div>
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