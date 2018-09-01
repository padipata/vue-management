import { queryRule, addRule, removeRule, updataRule, userRule } from 'services/api';
const state = {
    list: {},
    pagination: {}
};
const mutations = {
    save(state, payload) {
        state.list = payload || {};
        state.pagination = payload.pagination || {};
    }
};
const actions = {
    // 植物列表
    async fetch(context, payload) {
        try {
            const response = await queryRule(payload);
            const data = response.data;
            context.commit('save', data);
            return data;
        }
        catch (error) {
            context.commit('save', []);
            throw error;
        }
    },
    // 编辑植物信息
    async updata(context, payload) {
        try {
            const response = await updataRule(payload);
            const data = response.data;
            context.commit('save', data);
            return data;
        }
        catch (error) {
            throw error;
        }
    },
    // 删除植物
    async remove(context, payload) {
        try {
            const response = await removeRule(payload);
            const data = response.data;
            context.commit('save', data);
            return data;
        }
        catch (error) {
            throw error;
        }
    },
    // 添加植物
    async add(context, payload) {
        try {
            const response = await addRule(payload);
            const data = response.data;
            context.commit('save', data);
            return data;
        }
        catch (error) {
            throw error;
        }
    },
    // 用户列表
    async fetch2(context, payload) {
        try {
            const response = await userRule(payload);
            const data = response.data;
            context.commit('save', data);
            return data;
        }
        catch (error) {
            context.commit('save', []);
            throw error;
        }
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
