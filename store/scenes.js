import Vue from 'vue'

export const FETCH_SCENES = 'FETCH_SCENES'
export const SET_SCENES = 'SET_SCENES'
export const UPDATE_SCENE = 'UPDATE_SCENE'
export const ADD_SCENE = 'ADD_SCENE'
export const SEND_SIGNAL = 'SEND_SIGNAL'

// websocket signals
export const POST_SAVE = 'post_save'
export const RECEIVE_SCENES = 'set'

export const state = () => ({
  scenes: []
})

export const getters = {}

export const actions = {
  [FETCH_SCENES] ({commit, state}, params) {
    return this.$axios.$get('/scenes/', {params}).then((data) => {
      commit(SET_SCENES, data)
      return data
    })
  },
  [POST_SAVE] ({commit, state}, params) {
    if (params.created) {
      commit(ADD_SCENE, params)
    } else {
      commit(UPDATE_SCENE, params)
    }
  },
  [SEND_SIGNAL] ({commit, state}, {slug, params}) {
    return this.$axios.$post(`/scenes/${slug}/signal/`, params).then((data) => {
      return data
    })
  },
  [RECEIVE_SCENES] ({commit, state}, payload) {
    commit(SET_SCENES, payload.payload)
  }
}

export const mutations = {
  [SET_SCENES] (state, payload) {
    state.scenes = payload
  },
  [UPDATE_SCENE] (state, payload) {
    if (payload.id) {
      for (let i = 0; i < state.scenes.length; i++) {
        if (state.scenes[i].slug === payload.id) {
          Vue.set(state.scenes, i, payload.payload)
          break
        }
      }
    }
  },
  [ADD_SCENE] (state, payload) {
    state.scenes.push(payload.payload)
  }
}
