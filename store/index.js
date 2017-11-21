import createLogger from 'vuex/dist/logger'

export const plugins = [
  createLogger()
]

export const state = () => ({
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false
  }
})

export const getters = {

}

export const actions = {
  nuxtServerInit ({dispatch}, context) {
    return Promise.all([

    ])
  }
}

export const mutations = {
  SOCKET_ONOPEN (state, event) {
    state.socket.isConnected = true
    state.socket.reconnectError = false
  },
  SOCKET_ONCLOSE (state, event) {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR (state, event) {
    console.error(state, event)
  },
  SOCKET_ONMESSAGE (state, message) {
    state.message = message
  },
  SOCKET_RECONNECT (state, count) {
    console.info(state, count)
  },
  SOCKET_RECONNECT_ERROR (state) {
    state.socket.reconnectError = true
  }
}
