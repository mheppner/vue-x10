<template>
  <span v-if="isAuthenticated && status !== null">
    <template v-if="status">
      <v-btn small
             round
             :disabled="disabled"
             @click="click()"
             color="grey darken-3">
        <v-icon>person</v-icon>
        Home
      </v-btn>
    </template>
    <template v-else>
      <v-btn outline
             small
             round
             :disabled="disabled"
             @click="click()">
        <v-icon>person_outline</v-icon>
        Away
      </v-btn>
    </template>
  </span>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'
import {TOGGLE_STATUS} from '~/store/person'
import {SET_MESSAGE} from '~/store/messages'

const STORE = 'person'

export default {
  name: 'real-person',
  computed: {
    ...mapState(STORE, [
      'status'
    ]),
    ...mapGetters('auth', [
      'isAuthenticated'
    ])
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    ...mapActions(STORE, {
      toggle: TOGGLE_STATUS
    }),
    ...mapMutations('messages', {
      setMessage: SET_MESSAGE
    }),
    click () {
      this.disabled = true

      this.toggle().then((data) => {
        this.disabled = false
        this.setMessage({text: data.message, display: true})
      }, () => {
        this.disabled = false
        this.setMessage({
          text: 'Failed to set status',
          color: 'error',
          display: true
        })
      })
    }
  }
}
</script>
