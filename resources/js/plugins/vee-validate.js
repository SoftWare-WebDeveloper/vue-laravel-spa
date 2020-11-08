import * as rules from 'vee-validate/dist/rules';
import en from "vee-validate/dist/locale/en.json";
import Vue from 'vue';
import {
    ValidationObserver,
    ValidationProvider,
    extend,
    localize,
    setInteractionMode,
} from 'vee-validate';

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

localize("en", en);

setInteractionMode('eager');

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
