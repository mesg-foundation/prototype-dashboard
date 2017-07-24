<template>
  <div>
    <v-card>
      <form @submit.prevent="submit()">
        <v-card-title class="headline">
          {{ $t('title') }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            :label="$t('labels.email')"
            v-model="email"
            type="email"
            autofocus
            required>
          </v-text-field>

          <v-text-field
            :label="$t('labels.password')"
            v-model="password"
            type="password"
            required>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            primary dark block
            type="submit">
            {{ $t('submit') }}
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <v-btn
      class="ma-0 mt-2"
      secondary flat dark block
      router :to="{ name: 'Login' }">
      {{ $t('login') }}
    </v-btn>
  </div>
</template>

<i18n>
  en:
    title: "Signup"
    submit: "Signup now"
    login: "I already have an account"
    labels:
      email: "Email"
      password: "Password"
</i18n>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      ...mapActions({
        createUser: 'session/createUser'
      }),
      submit () {
        this.createUser({
          email: this.email,
          password: this.password
        })
          .then(_ => this.$router.replace({ path: this.$route.query.redirect || '/' }))
      }
    }
  }
</script>
