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
                   :disabled="disabled">
              <v-icon>skip_previous</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn block
                   small
                   :disabled="disabled"
                   :class="activeSignals[unit.slug] === 'dim' ? 'pulse': ''">
              <v-icon>fast_rewind</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn block
                   small
                   :disabled="disabled"
                   :class="activeSignals[unit.slug] === 'brt' ? 'pulse': ''">
              <v-icon>fast_forward</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn block
                   small
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
    ...mapMutations('messages', {
      setMessage: SET_MESSAGE
    }),
    click (unit, signal) {
      this.disabled = true

      this.sendSignal({slug: unit.slug, params: {action: signal}}).then(() => {
        this.disabled = false
        this.setMessage({text: `Sent command to ${unit.name}`, display: true})
      }, () => {
        this.disabled = false
        this.setMessage({
          text: `Failed to send command to ${unit.name}`,
          display: true,
          color: 'error'
        })
      })
    }
  }
}
</script>

<style>
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
