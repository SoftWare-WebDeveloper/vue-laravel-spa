import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

//modules
import UserModule from './modules/user';
import TeamsModule from './modules/teams'
import PlayersModule from './modules/players'

Vue.use(Vuex);
Vue.config.devtools = true;

const vuexPersist = new VuexPersistence({
    strictMode: true, // process.env.NODE_ENV !== 'production',
    storage: window.localStorage,
    reducer: (state) => ({
        user: state.user,
    }),
});


export default new Vuex.Store({
    strict: false, // process.env.NODE_ENV !== 'production',

    plugins: [
        vuexPersist.plugin,
    ],

    modules: {
        user: UserModule,
        teams: TeamsModule,
        players: PlayersModule
    },

    mutations: {
        // for preventing errors during loading from localStorage
        // this mutation **MUST** be named "RESTORE_MUTATION"
        RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    },
});
