import Vue from 'vue';

export default {
    namespaced: true,

    state: {
        team: {
            name: '',
            players: [],
        },
        items: { },
    },

    getters: {
        get: (state) => state.team,
        getProperty: (state) => (property) => state.team[property],
        getItems: (state) => (state.items ? state.items : []),
    },

    mutations: {
        setItems(state, payload) {
            state.items = payload;
        },
        setProperty(state, payload) {
            Object.keys(payload).forEach(
                (property) => Vue.set(state.team, property, payload[property]),
            );
        },
        clear(state) {
            state.team = {
                name: '',
                players: [],
            };
        },
        clearItems(state) {
            state.items = {};
        },
        formatPlayers(state, payload) {
            state.team.players = payload ? payload.map((player) => (player.id)) : [];
        },
    },

    actions: {
        async list({ commit }, page = null) {
            const { data } = await axios.get('/api/teams');
            commit('setItems', data);
        },

        async save({ commit, state }, id) {
            try {
                const { data } = await axios.put(`/api/teams/${id}`, state.team);

                return data;
            } catch (error) {
                console.log(error);
            }
            return null;
        },

        async get({ commit }, id) {
            try {

                const { data } = await axios.get(`/api/teams/${id}`);

                commit('setProperty', data);

                commit('formatPlayers', data.players);
            } catch (error) {
              console.log(error)
            }
        },

        async create({ commit, state }) {
            try {

                const { data } = await axios.post('/api/teams', state.team);

                return data;
            } catch (error) {
                console.log(error);
            }
            return null;
        },

        async delete({ commit, state }, id) {
            try {
                await axios.delete(`/api/teams/${id}`).then(() => {

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
