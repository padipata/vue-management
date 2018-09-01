import { queryCurrent } from 'services/user';
const state = {
    list: [],
    currentUser: {}
};
const mutations = {
    saveCurrentUser(state, payload) {
        state.currentUser = payload || {};
    }
};
const actions = {
    async fetchCurrent(context) {
        const response = await queryCurrent();
        context.commit('saveCurrentUser', response.data);
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
