<template>
  <section class="container">

    <template v-for="scene in scenes">
      <h3 class="headline">{{scene.name}}</h3>
      <v-layout row wrap>
        <v-flex xs6>
          <v-btn block
                 color="grey darken-2"
                 :outline="!isAllOn(scene)"
                 @click="click(scene, 'on')"
                 :disabled="disabled">
            <v-icon>lightbulb_outline</v-icon>
            On
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn block
                 color="grey darken-3"
                 :outline="!isAllOff(scene)"
                 @click="click(scene, 'off')"
                 :disabled="disabled">
            <v-icon>visibility_off</v-icon>
            Off
          </v-btn>
        </v-flex>
      </v-layout>
    </template>

  </section>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {map, filter} from 'lodash'
import {SEND_SIGNAL} from '~/store/scenes'
import {SET_MESSAGE} from '~/store/messages'

const STORE = 'scenes'

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
      'scenes'
    ]),
    ...mapState('units', [
      'units'
    ])
  },
  methods: {
    ...mapActions(STORE, {
      sendSignal: SEND_SIGNAL
    }),
    ...mapMutations('messages', {
      setMessage: SET_MESSAGE
    }),
    sceneUnits (scene) {
      // returns actual unit instances belonging to the scene
      return filter(this.units, u => {
        return scene.units.indexOf(u.slug) !== -1
      })
    },
    isAllOn (scene) {
      // checks that all units in the scene are on
      return map(this.sceneUnits(scene), 'state').every(state => {
        return state === true
      })
    },
    isAllOff (scene) {
      // checks that all units in the scene are off
      return map(this.sceneUnits(scene), 'state').every(state => {
        return state === false
      })
    },
    click (scene, signal, multiplier) {
      this.disabled = true

      this.sendSignal({
        slug: scene.slug,
        params: {
          action: signal,
          multiplier: multiplier
        }
      }).then(() => {
        this.disabled = false
        this.setMessage({text: `Sent command to ${scene.name}`, display: true})
      }, () => {
        this.disabled = false
        this.setMessage({
          text: `Failed to send command to ${scene.name}`,
          display: true,
          color: 'error'
        })
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
</style>
