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

          <span
            v-for="error in errors" :key="error.requestId"
            class="caption error--text">
            {{ error.functionError || error.message }}
          </span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary" dark block
            :loading="loading"
            type="submit">
            {{ $t('submit') }}
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <v-btn
      class="ma-0 mt-2"
      color="secondary" flat dark block
      :to="{ name: 'Signup' }">
      {{ $t('signup') }}
    </v-btn>
  </div>
</template>

<i18n>
  en:
    title: "Signin"
    submit: "Signin"
    signup: "I don't have account"
    labels:
      email: "Email"
      password: "Password"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import loading from '@/mixins/loading'
  export default {
    mixins: [
      loading()
    ],
    data () {
      return {
        email: null,
        password: null,
        errors: []
      }
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    methods: {
      ...mapActions({
        login: 'session/signin'
      }),
      submit () {
        this.commitLoading(() => this.login({ variables: {
          email: this.email,
          password: this.password
        }}))
          .then(_ => this.$router.replace({ path: this.$route.query.redirect || '/' }))
          .catch(x => (this.errors = x.graphQLErrors))
      }
    }
  }
</script>
