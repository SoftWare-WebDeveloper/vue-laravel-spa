/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueGoodTable from 'vue-good-table';
import { BootstrapVue, IconsPlugin, AlertPlugin } from 'bootstrap-vue';

// Install vue bootstrap and bootstrap plugins
import './plugins/vee-validate';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(AlertPlugin);
Vue.use(VueGoodTable);
Vue.use(require('vue-moment'));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
