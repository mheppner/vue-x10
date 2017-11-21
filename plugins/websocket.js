import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

if (process.browser) {
  window.onNuxtReady(({$store}) => {
    Vue.use(VueNativeSock, 'ws://localhost:8000/status/', {
      format: 'json',
      store: $store,
      reconnection: true,
      reconnectionDelay: 2000
    })
  })
}
