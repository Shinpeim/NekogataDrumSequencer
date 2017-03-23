import Vue from 'vue'

import Application from './presentation/view_model/Application.vue'

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init.js';

new Vue({
    el: '#app',
    components: { Application }
});
