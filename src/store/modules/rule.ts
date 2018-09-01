import {Commit} from 'vuex'

import {
  queryRule,
  addRule,
  removeRule,
  updataRule,
  userRule
} from 'services/api'

export interface State {
  list: any
  pagination: any
}

const state: State = {
  list: {},
  pagination: {}
}

const mutations = {
  save(state: State, payload: any) {
    state.list = payload || {}
    state.pagination = payload.pagination || {}
  }
}

const actions = {
  // 植物列表
  async fetch(context: { commit: Commit }, payload: any) {
    try {
      const response = await queryRule(payload)
      const data = response.data
      context.commit('save', data)
      return data
    } catch (error) {
      context.commit('save', [])
      throw error
    }
  },
  // 编辑植物信息
  async updata(context: { commit: Commit }, payload: any) {
    try {
      const response = await updataRule(payload)
      const data = response.data
      context.commit('save', data)
      return data
    } catch (error) {
      throw error
    }
  },
  // 删除植物
  async remove(context: { commit: Commit }, payload: any) {
    try {
      const response = await removeRule(payload)
      const data = response.data
      context.commit('save', data)
      return data
    } catch (error) {
      throw error
    }
  },
  // 添加植物
  async add(context: { commit: Commit }, payload: any) {
    try {
      const response = await addRule(payload)
      const data = response.data
      context.commit('save', data)
      return data
    } catch (error) {
      throw error
    }
  },

  // 用户列表
  async fetch2(context: { commit: Commit }, payload: any) {
    try {
      const response = await userRule(payload)
      const data = response.data
      context.commit('save', data)
      return data
    } catch (error) {
      context.commit('save', [])
      throw error
    }
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
