import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init.js';

import Vue from 'vue'
import Application from './presentation/vue_components/Application.vue'

new Vue({
    el: '#app',
    components: { Application }
});
