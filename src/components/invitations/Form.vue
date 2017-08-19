<template>
  <v-card flat>
    <form @submit.prevent="submit()">
      <v-toolbar card class="secondary">
        <v-toolbar-title class="headline">{{ $t('title') }}</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          :label="$t('labels.email')"
          :error-messages="errors.email"
          v-model="email"
          type="email"
          @input="$v.email.$touch()"
          autofocus
          required>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          primary dark block
          :disabled="!isValid"
          type="submit">
          {{ $t('submit') }}
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<i18n>
  en:
    title: "Invite a member"
    submit: "Invite"
    labels:
      email: "Email"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import withValidation from '@/mixins/withValidation'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import { required, email } from '@/validators'
  export default {
    mixins: [
      withCurrentProject,
      withValidation
    ],
    data () {
      return {
        email: null
      }
    },
    validations: {
      email: {
        required,
        email
      }
    },
    methods: {
      ...mapActions({
        create: 'invitations/create'
      }),
      submit () {
        this.create({ variables: {
          email: this.email,
          projectId: this.currentProjectId
        }})
          .then(invitation => this.$emit('saved', invitation))
      }
    }
  }
</script>
