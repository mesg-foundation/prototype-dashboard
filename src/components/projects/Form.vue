<template>
  <v-card flat>
    <form @submit.prevent="submit()">
      <v-toolbar card class="secondary">
        <v-toolbar-title class="headline">{{ $t('title') }}</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          :label="$t('labels.name')"
          :error-messages="errors.name"
          v-model="name"
          @input="$v.name.$touch()"
          autofocus
          required>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          primary dark
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
    title: "Create my project"
    submit: "Save this project"
    labels:
      name: "Name"
</i18n>

<script>
  import withValidation from '@/mixins/withValidation'
  import { mapGetters, mapActions } from 'vuex'
  import { required, alphaNum } from '@/validators'
  export default {
    mixins: [
      withValidation
    ],
    data () {
      return {
        name: 'Test project'
      }
    },
    computed: mapGetters({
      currentUserId: 'session/currentUserId'
    }),
    validations: {
      name: {
        required,
        alphaNum
      }
    },
    methods: {
      ...mapActions({
        createProject: 'projects/create'
      }),
      submit () {
        this.createProject({
          name: this.name,
          userId: this.currentUserId
        })
          .then(project => this.$emit('saved', project))
      }
    }
  }
</script>
