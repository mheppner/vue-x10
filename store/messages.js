export const SET_MESSAGE = 'SET_MESSAGE'

export const state = () => ({
  display: false,
  text: '',
  timeout: 3500,
  color: ''
})

export const getters = {}

export const actions = {}

export const mutations = {
  [SET_MESSAGE] (state, payload) {
    state.display = payload.display || false
    state.text = payload.text || ''
    state.timeout = payload.timeout || 3500
    state.color = payload.color || ''
  }
}
