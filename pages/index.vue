<template>
  <section class="container">

    <template v-for="unit in units">
      <h3 class="headline">{{unit.name}}</h3>
      <v-layout row wrap>
        <v-flex xs6>
          <v-btn block
                 color="grey darken-2"
                 :outline="!unit.state"
                 :disabled="disabled"
                 @click="click(unit, 'on')"
                 :class="activeSignals[unit.slug] === 'on' ? 'pulse': ''">
            <v-icon>lightbulb_outline</v-icon>
            On
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn block
                 color="grey darken-3"
                 :outline="unit.state"
                 :disabled="disabled"
                 @click="click(unit, 'off')"
                 :class="activeSignals[unit.slug] === 'off' ? 'pulse': ''">
            <v-icon>visibility_off</v-icon>
            Off
          </v-btn>
        </v-flex>
        <template v-if="unit.dimmable">
          <v-flex xs3>
            <v-btn block
                   small
                   @click="click(unit, 'dim', 5)"
                   :disabled="disabled">
              <v-icon>skip_previous</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn block
                   small
                   :disabled="disabled"
                   @click="click(unit, 'dim')"
                   :class="activeSignals[unit.slug] === 'dim' ? 'pulse': ''">
              <v-icon>fast_rewind</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn block
                   small
                   :disabled="disabled"
                   @click="click(unit, 'brt')"
                   :class="activeSignals[unit.slug] === 'brt' ? 'pulse': ''">
              <v-icon>fast_forward</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn block
                   small
                   @click="click(unit, 'brt', 5)"
                   :disabled="disabled">
              <v-icon>skip_next</v-icon>
            </v-btn>
          </v-flex>
        </template>
      </v-layout>
    </template>

  </section>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import {SEND_SIGNAL} from '~/store/units'
import {SET_MESSAGE} from '~/store/messages'
import {SET_USER} from '~/store/auth'
import {CLOSE} from '~/store/socket'

const STORE = 'units'

export default {
  middleware: [
    'isAuthenticated'
  ],
  data () {
    return {
      disabled: false
    }
  },
  computed: {
    ...mapState(STORE, [
      'activeSignals'
    ]),
    ...mapGetters(STORE, {
      units: 'unitsOrdered'
    })
  },
  methods: {
    ...mapActions(STORE, {
      sendSignal: SEND_SIGNAL
    }),
    ...mapActions('socket', {
      closeSocket: CLOSE
    }),
    ...mapMutations('auth', {
      setUser: SET_USER
    }),
    ...mapMutations('messages', {
      setMessage: SET_MESSAGE
    }),
    click (unit, signal, multiplier) {
      this.disabled = true

      this.sendSignal({
        slug: unit.slug,
        params: {
          action: signal,
          multiplier: multiplier
        }
      }).then(() => {
        this.disabled = false
        this.setMessage({text: `Sent command to ${unit.name}`, display: true})
      }, (err) => {
        this.disabled = false
        this.setMessage({
          text: `Failed to send command to ${unit.name}`,
          display: true,
          color: 'error'
        })

        if (err.response.status === 403) {
          this.setUser(null)
          this.closeSocket()
          this.$router.replace({ name: 'auth-login' })
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btn {
  transition: box-shadow 0.1s ease-in-out;
}
.btn.pulse {
  box-shadow: 0 0 3px 0 #ffa726;
}
</style>
