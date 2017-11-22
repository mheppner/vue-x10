<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      v-if="isAuthenticated"
    >
      <v-list dense>
        <v-list-tile nuxt :to="{name: 'index'}" exact>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Units</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'scenes'}">
          <v-list-tile-action>
            <v-icon>group_work</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Scenes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :href="adminUrl">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile nuxt :to="{name: 'auth-logout'}">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"
                           v-if="isAuthenticated">
      </v-toolbar-side-icon>
      <v-toolbar-title>X10</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <v-chip outline
              small
              :color="socket.isConnected ? 'success' : 'error'">
        Socket
      </v-chip>
      <v-spacer />
      <RealPerson />
    </v-footer>

    <Message />

  </v-app>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import RealPerson from '~/components/RealPerson'
import Message from '~/components/Message'

export default {
  components: {
    RealPerson,
    Message
  },
  data: () => ({
    drawer: true
  }),
  computed: {
    ...mapState([
      'socket'
    ]),
    ...mapGetters('auth', [
      'isAuthenticated'
    ]),
    adminUrl () {
      return `${this.$axios.defaults.baseURL}admin/`
    }
  }
}
</script>
