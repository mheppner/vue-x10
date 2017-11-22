export const FETCH_STATUS = 'FETCH_STATUS'
export const SET_STATUS = 'SET_STATUS'
export const UPDATE_STATUS = 'UPDATE_STATUS'
export const TOGGLE_STATUS = 'TOGGLE_STATUS'
export const RECEIVE_ARRIVE = 'arrive'
export const RECEIVE_LEAVE = 'leave'

export const state = () => ({
  status: null
})

export const getters = {}

export const actions = {
  [FETCH_STATUS] ({commit, state}, params) {
    return this.$axios.$get('/person/', {params}).then((data) => {
      commit(SET_STATUS, {payload: data})
      return data
    })
  },
  [RECEIVE_ARRIVE] ({commit, state}, params) {
    commit(SET_STATUS, params)
  },
  [RECEIVE_LEAVE] ({commit, state}, params) {
    commit(SET_STATUS, params)
  },
  [TOGGLE_STATUS] ({dispatch, state}) {
    if (state.status) {
      return dispatch(UPDATE_STATUS, false)
    } else {
      return dispatch(UPDATE_STATUS, true)
    }
  },
  [UPDATE_STATUS] ({commit, state}, newState) {
    const url = `/person/${(newState ? 'arrive' : 'leave')}/`
    return this.$axios.$post(url).then((data) => {
      return data
    })
  }
}

export const mutations = {
  [SET_STATUS] (state, payload) {
    state.status = payload.payload.is_home
  }
}
