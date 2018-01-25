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
            <p v-for="error in errors" class="red--text">{{error}}</p>
            <form v-on:submit.prevent="submit">
              <v-text-field label="Username"
                            name="username"
                            id="name"
                            autocomplete="username"
                            prepend-icon="person"
                            v-model.trim="username"
                            required>
              </v-text-field>
              <v-text-field label="Password"
                            name="password"
                            id="password"
                            prepend-icon="vpn_key"
                            type="password"
                            autocomplete="current-password"
                            v-model="password"
                            required>
              </v-text-field>
              <v-btn block
                     type="submit"
                     :disabled="!isValid || isLoading">
                Submit
              </v-btn>
            </form>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import {LOGIN, FETCH_USER} from '~/store/auth'

const STORE = 'auth'

export default {
  fetch ({store, redirect, error}) {
    // unauthenticated users don't belong here
    if (store.getters[STORE + '/isAuthenticated']) {
      return redirect('/')
    }
  },
  data () {
    return {
      pageTitle: 'Sign in',
      username: null,
      password: null,
      errors: [],
      isLoading: false
    }
  },
  head () {
    return {
      title: this.pageTitle
    }
  },
  computed: {
    isValid () {
      return !!this.username && !!this.password
    }
  },
  methods: {
    ...mapActions(STORE, {
      login: LOGIN,
      fetchUser: FETCH_USER
    }),
    submit () {
      this.errors = []
      this.isLoading = true

      this.login({
        username: this.username,
        password: this.password
      }).then((data) => {
        // TODO this doesn't work
        this.$router.replace({path: '/'})
      }).catch((e) => {
        if (e.response.status === 400) {
          this.errors = e.response.data.non_field_errors
        }
        this.isLoading = false
      })
    }
  }
}
</script>
