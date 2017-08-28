<template>
  <v-card flat>
    <form @submit.prevent="submit()">
      <v-toolbar card class="secondary">
        <MenuToggle></MenuToggle>
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
  import { mapGetters, mapActions } from 'vuex'
  import { required, minLength } from '@/validators'
  import withValidation from '@/mixins/withValidation'
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      MenuToggle
    },
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
        minLength: minLength(3)
      }
    },
    methods: {
      ...mapActions({
        createProject: 'projects/createAndSelect'
      }),
      submit () {
        this.createProject({ variables: {
          name: this.name,
          userId: this.currentUserId
        }})
          .then(project => this.$emit('saved', project))
      }
    }
  }
</script>
