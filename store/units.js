export const FETCH_UNITS = 'FETCH_UNITS'
export const SET_UNITS = 'SET_UNITS'

export const state = () => ({
  units: []
})

export const getters = {}

export const actions = {
  [FETCH_UNITS] ({commit, state}, params) {
    return this.$axios.$get('/units/', {params}).then((data) => {
      commit(SET_UNITS, data)
      return data
    })
  }
}

export const mutations = {
  [SET_UNITS] (state, payload) {
    state.units = payload
  }
}
