// public actions
export const OPEN = 'OPEN'
export const CLOSE = 'CLOSE'
export const ERROR = 'ERROR'
// internal actions
const ONOPEN = 'ONOPEN'
const ONCLOSE = 'ONCLOSE'
const ONERROR = 'ONERROR'
const ONMESSAGE = 'ONMESSAGE'
const ONRECONNECT = 'ONRECONNECT'
// mutations
export const SET_URL = 'SET_URL'
export const SET_SOCKET = 'SET_SOCKET'
export const SET_IS_CONNECTED = 'SET_IS_CONNECTED'
export const SET_DATA = 'SET_DATA'
export const SET_MESSAGE = 'SET_MESSAGE'

export const state = () => ({
  url: '',
  socket: null,
  isConnected: false,
  message: '',
  data: null,
  reconnectSeconds: 3000
})

export const getters = {}

export const actions = {
  [OPEN] ({commit, state, dispatch}) {
    if (!state.url) {
      return
    }
    const socket = new WebSocket(state.url)

    socket.addEventListener('open', ev => {
      if (state.isConnected) {
        dispatch(CLOSE)
      }
      dispatch(ONOPEN, ev)
    })
    socket.addEventListener('close', ev => {
      if (ev.code === 1000) {
        // normal close
        dispatch(ONCLOSE, ev)
      } else {
        // abnormal, try to reconnect
        dispatch(ONRECONNECT)
      }
    })
    socket.addEventListener('error', ev => {
      if (ev.code === 'ECONNREFUSED') {
        console.log('con refused')
      }
      dispatch(ONERROR, ev)
    })
    socket.addEventListener('message', ev => {
      dispatch(ONMESSAGE, ev)
    })

    commit(SET_SOCKET, socket)
  },
  [CLOSE] ({commit, state}) {
    if (state.socket) {
      state.socket.close()
    }
  },
  [ONOPEN] ({commit, state}, event) {
    commit(SET_IS_CONNECTED, true)
  },
  [ONCLOSE] ({commit, state}, event) {
    commit(SET_IS_CONNECTED, false)
    commit(SET_SOCKET, null)
  },
  [ONERROR] ({commit, state}, event) {
    console.error(state, event, event.type)
  },
  [ONMESSAGE] ({commit, state, dispatch}, event) {
    let data
    try {
      data = JSON.parse(event.data)
    } catch (e) {
      console.error('invalid JSON body!', event.data)
    }

    if (data !== undefined) {
      if ('namespace' in data && 'action' in data) {
        dispatch(`${data.namespace}/${data.action}`, data, {root: true})
      }
      commit(SET_DATA, data)
    } else {
      commit(SET_DATA, null)
    }
    commit(SET_MESSAGE, event.data)
  },
  [ONRECONNECT] ({commit, state, dispatch}) {
    console.warn(`Reconnecting in ${state.reconnectSeconds}...`)
    setTimeout(() => {
      dispatch(OPEN)
    }, state.reconnectSeconds)
  }
}

export const mutations = {
  [SET_URL] (state, payload) {
    state.url = payload
  },
  [SET_SOCKET] (state, socket) {
    state.socket = socket
  },
  [SET_IS_CONNECTED] (state, payload) {
    state.isConnected = payload
  },
  [SET_MESSAGE] (state, message) {
    state.message = message
  },
  [SET_DATA] (state, data) {
    state.data = data
  }
}
