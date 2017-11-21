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

    <v-snackbar
      :timeout="msgTimeout"
      :color="msgColor"
      v-model="msg"
    >
      {{msgText}}
      <v-btn dark flat @click.native="msg = false">Close</v-btn>
    </v-snackbar>

  </section>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import {FETCH_UNITS, SEND_SIGNAL} from '~/store/units'

const STORE = 'units'

export default {
  data () {
    return {
      msg: false,
      msgTimeout: 3000,
      msgText: '',
      msgColor: '',
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
      fetch: FETCH_UNITS,
      sendSignal: SEND_SIGNAL
    }),
    click (unit, signal) {
      this.disabled = true
      this.msg = false

      this.sendSignal({slug: unit.slug, params: {action: signal}}).then(() => {
        this.disabled = false
        this.msgColor = ''
        this.msgText = `Sent command to ${unit.name}`
        this.msg = true
      }, () => {
        this.disabled = false
        this.msgColor = 'error'
        this.msgText = `Failed to send command to ${unit.name}`
        this.msg = true
      })
    }
  },
  mounted () {
    this.fetch()
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
