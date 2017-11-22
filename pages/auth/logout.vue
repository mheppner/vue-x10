<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{pageTitle}}</div>
            </div>
          </v-card-title>
          <v-card-text class="text-center">
            <h4>You have been signed out</h4>
            <v-btn large tag="a" :to="{name: 'auth-login'}">
              Sign in
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {LOGOUT} from '~/store/auth'
const STORE = 'auth'

export default {
  data () {
    return {
      pageTitle: 'Sign out'
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  },
  fetch ({store, redirect, error}) {
    // unauthenticated users don't belong here
    if (!store.getters[STORE + '/isAuthenticated']) {
      return redirect('/')
    }

    return store.dispatch(STORE + '/' + LOGOUT).catch((e) => {
      error({statusCode: e.response.status, message: e.response.statusText})
    })
  }
}
</script>
