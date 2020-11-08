import Vue from 'vue';

export default {
    namespaced: true,

    state: {
        player: {
            first_name: '',
            last_name: '',
        },
        items: { },
    },

    getters: {
        get: (state) => state.player,
        getProperty: (state) => (property) => state.player[property],
        getItems: (state) => (state.items ? state.items : []),
    },

    mutations: {
        setItems(state, payload) {
            state.items = payload;
        },
        setProperty(state, payload) {
            Object.keys(payload).forEach(
                (property) => Vue.set(state.player, property, payload[property]),
            );
        },
        clear(state) {
            state.player = {
                first_name: '',
                last_name: '',
            };
        },
        clearItems(state) {
            state.items = {};
        },
    },

    actions: {
        async list({ commit }, page = null) {
            const { data } = await axios.get('/api/players');
            commit('setItems', data);
        },

        async save({ commit, state }, id) {
            try {
                const { data } =  await axios.put(`/api/players/${id}`, state.player);
                return data;
            } catch (error) {
                console.log(error);
            }
            return null;
        },

        async get({ commit }, id) {
            try {

                const { data } = await axios.get(`/api/players/${id}`);

                commit('setProperty', data);
            } catch (error) {
              console.log(error)
            }
        },

        async create({ commit, state }) {
            try {

                const { data } = await axios.post('/api/players', state.player);

                return data;
            } catch (error) {
                console.log(error);
            }
            return null;
        },

        async delete({ commit, state }, id) {
            try {
                await axios.delete(`/api/players/${id}`).then(() => {

                    const index = state.items.findIndex((x) => x.id === id);
                    state.items.splice(index, 1);

                }).catch((error) => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
