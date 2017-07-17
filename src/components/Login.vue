<template>
  <FullHeightCenter class="primary">
    <v-card>
      <form @submit.prevent="submit()">
        <v-card-title>
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
            primary dark
            type="submit">
            {{ $t('submit') }}
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </FullHeightCenter>
</template>

<i18n>
  en:
    title: "Signin"
    submit: "Signin"
    labels:
      email: "Email"
      password: "Password"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import FullHeightCenter from '@/components/layouts/FullHeightCenter.vue'
  export default {
    components: {
      FullHeightCenter
    },
    data () {
      return {
        email: null,
        password: null
      }
    },
    methods: {
      ...mapActions({
        login: 'session/signin'
      }),
      submit () {
        this.login({
          email: this.email,
          password: this.password
        })
          .then(_ => this.$router.replace({ path: this.$route.query.redirect || '/' }))
      }
    }
  }
</script>
