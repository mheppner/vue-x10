import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

if (process.browser) {
  window.onNuxtReady(({$store, $axios}) => {
    const baseUrl = $axios.defaults.baseURL.replace('http', 'ws')
    const url = `${baseUrl}status/`

    Vue.use(VueNativeSock, url, {
      format: 'json',
      store: $store,
      reconnection: true,
      reconnectionDelay: 2000
    })
  })
}
