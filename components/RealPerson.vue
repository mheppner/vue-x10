<template>
  <span>
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
import {mapState, mapActions, mapMutations} from 'vuex'
import {FETCH_STATUS, TOGGLE_STATUS} from '~/store/person'
import {SET_MESSAGE} from '~/store/messages'

const STORE = 'person'

export default {
  name: 'real-person',
  computed: {
    ...mapState(STORE, [
      'status'
    ])
  },
  data () {
    return {
      disabled: false
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    ...mapActions(STORE, {
      fetch: FETCH_STATUS,
      toggle: TOGGLE_STATUS
    }),
    ...mapMutations('messages', {
      setMessage: SET_MESSAGE
    }),
    click () {
      this.disabled = true

      this.toggle().then(() => {
        this.disabled = false
        this.setMessage({text: 'Welcome home', display: true})
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
