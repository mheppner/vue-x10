<template>
  <v-chip outline
          small
          :color="isConnected ? 'success' : 'error'">
    Socket
  </v-chip>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
import {OPEN, CLOSE, SET_URL} from '~/store/socket'

export default {
  name: 'socket',
  computed: {
    ...mapState('socket', [
      'isConnected',
      'message'
    ]),
    ...mapGetters('auth', [
      'isAuthenticated'
    ])
  },
  methods: {
    ...mapActions('socket', {
      openSocket: OPEN,
      closeSocket: CLOSE
    }),
    ...mapMutations('socket', {
      setUrl: SET_URL
    })
  },
  mounted () {
    const baseUrl = this.$axios.defaults.baseURL.replace('http', 'ws')
    const url = `${baseUrl}status/`
    this.setUrl(url)

    if (this.isAuthenticated) {
      this.openSocket()
    }
  }
}
</script>
