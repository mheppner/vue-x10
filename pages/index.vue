<template>
  <section class="container">

    <h3 class="headline">Unit name</h3>
    <v-layout row wrap>
      <v-flex xs6>
        <v-btn block
               color="grey darken-2"
               :outline="!state"
               :disabled="disabled"
               @click="state = true">
          <v-icon>lightbulb_outline</v-icon>
          On
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn block
               color="grey darken-3"
               :outline="state"
               :disabled="disabled"
               @click="state = false"
               :class="pulse ? 'pulse': ''">
          <v-icon>visibility_off</v-icon>
          Off
        </v-btn>
      </v-flex>
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
    </v-layout>

  </section>
</template>

<script>
export default {
  data () {
    return {
      state: false,
      pulse: false
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

</style>
