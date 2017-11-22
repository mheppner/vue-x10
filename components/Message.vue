<template>
  <v-snackbar
    :timeout="timeout"
    :color="color"
    v-model="displayProxy"
  >
    {{text}}
    <v-btn dark flat @click.native="close()">Close</v-btn>
  </v-snackbar>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {SET_MESSAGE} from '~/store/messages'

const STORE = 'messages'

export default {
  name: 'message',
  computed: {
    ...mapState(STORE, [
      'display',
      'color',
      'text',
      'timeout'
    ]),
    displayProxy: {
      get () {
        return this.display
      },
      set (value) {
        this.setMessage({display: value})
      }
    }
  },
  methods: {
    ...mapMutations(STORE, {
      'setMessage': SET_MESSAGE
    }),
    close () {
      this.setMessage({display: false})
    }
  }
}
</script>
