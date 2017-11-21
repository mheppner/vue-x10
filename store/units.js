import Vue from 'vue'
import {orderBy} from 'lodash'

export const FETCH_UNITS = 'FETCH_UNITS'
export const SET_UNITS = 'SET_UNITS'
export const POST_SAVE = 'post_save'
export const UPDATE_UNIT = 'UPDATE_UNIT'
export const ADD_UNIT = 'ADD_UNIT'

export const state = () => ({
  units: []
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
  }
}
