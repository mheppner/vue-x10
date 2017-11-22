import Vue from 'vue'
import {orderBy} from 'lodash'

export const FETCH_UNITS = 'FETCH_UNITS'
export const SET_UNITS = 'SET_UNITS'
export const SEND_SIGNAL = 'SEND_SIGNAL'
export const UPDATE_UNIT = 'UPDATE_UNIT'
export const ADD_UNIT = 'ADD_UNIT'
export const SET_SIGNAL = 'SET_SIGNAL'
export const REMOVE_SIGNAL = 'REMOVE_SIGNAL'

// websocket signals
export const POST_SAVE = 'post_save'
export const RECEIVE_SIGNAL = 'send_signal'
export const RECEIVE_UNITS = 'set'

export const state = () => ({
  units: [],
  activeSignals: {}
})

export const getters = {
  unitsOrdered: state => {
    return orderBy(state.units, 'order')
  }
}

export const actions = {
  [FETCH_UNITS] ({commit, state}, params) {
    return this.$axios.$get('/units/', {params}).then((data) => {
      commit(SET_UNITS, data)
      return data
    })
  },
  [POST_SAVE] ({commit, state}, params) {
    if (params.created) {
      commit(ADD_UNIT, params)
    } else {
      commit(UPDATE_UNIT, params)
    }
  },
  [RECEIVE_SIGNAL] ({commit, state}, params) {
    commit(SET_SIGNAL, params)
    setTimeout(() => {
      commit(REMOVE_SIGNAL, params)
    }, 750)
  },
  [SEND_SIGNAL] ({commit, state}, {slug, params}) {
    return this.$axios.$post(`/units/${slug}/signal/`, params).then((data) => {
      return data
    })
  },
  [RECEIVE_UNITS] ({commit, state}, payload) {
    commit(SET_UNITS, payload.payload)
  }
}

export const mutations = {
  [SET_UNITS] (state, payload) {
    state.units = payload
  },
  [UPDATE_UNIT] (state, payload) {
    if (payload.id) {
      for (let i = 0; i < state.units.length; i++) {
        if (state.units[i].slug === payload.id) {
          Vue.set(state.units, i, payload.payload)
          break
        }
      }
    }
  },
  [ADD_UNIT] (state, payload) {
    state.units.push(payload.payload)
  },
  [SET_SIGNAL] (state, payload) {
    state.activeSignals[payload.id] = payload.payload.command
  },
  [REMOVE_SIGNAL] (state, payload) {
    Vue.delete(state.activeSignals, payload.id)
  }
}
