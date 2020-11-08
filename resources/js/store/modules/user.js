import collect from 'collect.js';

export default {
    namespaced: true,

    state: {
        user: {

        },
    },

    getters: {
        get: (state) => state.user,
        isSet: (state) => collect(state.user).isNotEmpty(),
        isNotSet: (state, getters) => !getters.isSet,
    },

    mutations: {
        updateUser(state, user) {
            state.user = user;
        },

        remove(state) {
            state.user = {
            };
        },
    },

    actions: {
        async logout(context) {
            await axios.post('/logout');
            context.commit('remove');
        },
        async fetch(context) {
            const { data } = await axios.get('/api/user');
            context.commit('updateUser', data);
        },
    },
};
