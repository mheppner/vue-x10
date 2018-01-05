import {CLOSE as CLOSE_SOCKET, OPEN as OPEN_SOCKET} from './socket'

export const FETCH_USER = 'FETCH_USER'
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_CONFIRM = 'RESET_PASSWORD_CONFIRM'
export const SET_RESET_UID = 'SET_RESET_UID'
export const SET_RESET_TOKEN = 'SET_RESET_TOKEN'
export const CONFIRM_REGISTRATION = 'CONFIRM_REGISTRATION'
export const SET_REGISTRATION_KEY = 'SET_REGISTRATION_KEY'
export const LOGIN = 'FETCH_LOGIN'
export const LOGOUT = 'FETCH_LOGOUT'
export const REGISTER = 'REGISTER'

export const state = () => ({
  user: null,
  reset_token: null,
  reset_uid: null,
  registration_key: null
})

export const getters = {
  isAuthenticated: state => {
    return !!(state.user && state.user.pk)
  }
}

export const actions = {
  [FETCH_USER] ({commit, state, dispatch}) {
    return this.$axios.$get('/auth/user/').then((response) => {
      commit(SET_USER, response)
      dispatch(`socket/${OPEN_SOCKET}`, null, {root: true})
      return response
    }).catch((e) => {
      commit(SET_USER, null)
      dispatch(`socket/${CLOSE_SOCKET}`, null, {root: true})
      return e
    })
  },
  [UPDATE_USER] ({commit, state}, data) {
    return this.$axios.$put('/auth/user/', data).then((response) => {
      commit(SET_USER, response)
      return response
    })
  },
  [CHANGE_PASSWORD] ({commit, state}, data) {
    return this.$axios.$post('/auth/password/change/', data)
  },
  [RESET_PASSWORD] ({commit, state}, data) {
    return this.$axios.$post('/auth/password/reset/', data)
  },
  [RESET_PASSWORD_CONFIRM] ({commit, state}, data) {
    data.uid = state.reset_uid
    data.token = state.reset_token
    return this.$axios.$post('/auth/password/reset/confirm/')
  },
  [REGISTER] ({commit, state}, data) {
    return this.$axios.$post('/auth/registration/', data)
  },
  [CONFIRM_REGISTRATION] ({commit, state}) {
    return this.$axios.$post('/auth/registration/verify-email/', {key: state.registration_key})
  },
  [LOGIN] ({state, dispatch}, data) {
    return this.$axios.$post('/auth/login/', data).then((response) => {
      return dispatch(FETCH_USER)
    })
  },
  [LOGOUT] ({commit, state, dispatch}) {
    return this.$axios.$post('/auth/logout/').then((response) => {
      commit(SET_USER, null)
      dispatch(`socket/${CLOSE_SOCKET}`, null, {root: true})
      return response
    })
  }
}

export const mutations = {
  [SET_USER] (state, payload) {
    state.user = payload
  },
  [SET_RESET_UID] (state, payload) {
    state.reset_uid = payload
  },
  [SET_RESET_TOKEN] (state, payload) {
    state.reset_token = payload
  },
  [SET_REGISTRATION_KEY] (state, payload) {
    state.registration_key = payload
  }
}
