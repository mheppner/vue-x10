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
                 @click="state = true"
                 :class="pulse ? 'pulse': ''">
            <v-icon>lightbulb_outline</v-icon>
            On
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn block
                 color="grey darken-3"
                 :outline="unit.state"
                 :disabled="disabled"
                 @click="state = false"
                 :class="pulse ? 'pulse': ''">
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
                   :disabled="disabled">
              <v-icon>fast_rewind</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn block
                   small
                   :disabled="disabled">
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
import {mapState, mapActions} from 'vuex'
import {FETCH_UNITS} from '~/store/units'

const STORE = 'units'

export default {
  data () {
    return {
      state: false,
      pulse: false,
      disabled: false
    }
  },
  computed: {
    ...mapState(STORE, [
      'units'
    ])
  },
  methods: {
    ...mapActions(STORE, {
      fetch: FETCH_UNITS
    })
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
