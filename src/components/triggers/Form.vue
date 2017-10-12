<template>
  <form novalidate @submit.prevent="submit()">
    <v-card flat>
      <TriggerFormHeader
        :trigger="trigger">
      </TriggerFormHeader>
      <v-divider></v-divider>
      <QuotaWarning feature="executions"></QuotaWarning>
      <v-layout>
        <v-flex lg8 offset-lg2>
          <v-card-text class="mt-4">
            <v-text-field
              :label="$t('title')"
              required
              :error-messages="errors.title"
              v-model="title">
            </v-text-field>
            <v-text-field
              :label="$t('description')"
              v-model="description"
              multi-line auto-grow :rows="1">
            </v-text-field>
            <v-layout row wrap justify-center align-center>
              <FormConnector v-model="connector">
                <span v-for="error in errors.connector" :key="error" class="error--text">{{ error }}</span>
              </FormConnector>
              <v-icon large class="ma-3">keyboard_arrow_right</v-icon>
              <FormAction v-model="action">
                <span v-for="error in errors.action" :key="error" class="error--text">{{ error }}</span>
              </FormAction>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary" dark block
              :loading="saving"
              type="submit">
              {{ $t('submit') }}
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="trigger.id">
            <v-btn
              block flat
              :to="{ name: 'Trigger', params: trigger }">
              {{ $t('cancel') }}
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="trigger.id">
            <v-btn
              :loading="removing"
              color="error" block flat
              @click.stop="remove()">
              {{ $t('delete') }}
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </form>
</template>

<i18n>
  en:
    submit: "Save"
    cancel: "Cancel"
    delete: "Delete"
    title: "Title of your trigger"
    description: "Describe your trigger"
    confirmation: "Are you sure to want to delete this trigger ?"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import Utils from '@/utils'
  import { required, minLength } from '@/validators'
  import withValidation from '@/mixins/withValidation'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import updateOrCreate from '@/mixins/updateOrCreate'
  import TriggerFormHeader from '@/components/triggers/FormHeader.vue'
  import QuotaWarning from '@/components/QuotaWarning'
  import FormAction from './form/Action'
  import FormConnector from './form/Connector'

  export default {
    components: {
      TriggerFormHeader,
      QuotaWarning,
      FormAction,
      FormConnector
    },
    mixins: [
      withValidation,
      withCurrentProject,
      updateOrCreate('Connector'),
      updateOrCreate('Action'),
      updateOrCreate('Trigger')
    ],
    props: {
      trigger: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        connector: this.trigger.connector || {},
        action: this.trigger.action || {},
        title: this.trigger.title,
        description: this.trigger.description,
        saving: false,
        removing: false
      }
    },
    computed: {
      connectorVariables () {
        return {
          id: this.connector.id,
          projectId: this.currentProjectId,
          connectorType: this.connector.connectorType,
          [this.connector.field]: Utils.flattenGraphQlData(this.connector[this.connector.field])
        }
      },
      actionVariables () {
        return {
          projectId: this.currentProjectId,
          ...Utils.flattenGraphQlData(this.action, ['data'])
        }
      }
    },
    validations: {
      title: {
        required,
        minLength: minLength(3)
      },
      connector: {
        required
      },
      action: {
        required
      }
    },
    methods: {
      ...mapActions({
        deleteTrigger: 'triggers/delete'
      }),
      submit () {
        if (!this.validate()) { return }
        this.saving = true
        Promise.all([
          this.updateOrCreateConnector(this.connectorVariables),
          this.updateOrCreateAction(this.actionVariables)
        ])
          .then(([connector, action]) => {
            this.connector = { ...this.connector, ...connector }
            this.action = { ...this.action, ...action }
            return this.updateOrCreateTrigger({
              id: this.trigger.id,
              title: this.title,
              description: this.description,
              projectId: this.currentProjectId,
              connectorId: connector.id,
              actionId: action.id
            })
          })
          .then(trigger => {
            this.saving = false
            this.$emit('saved', trigger)
          })
          .catch(e => {
            this.saving = false
            throw e
          })
      },
      remove () {
        this.removing = true
        if (!confirm(this.$t('confirmation'))) { return }
        this.deleteTrigger({ variables: { id: this.trigger.id } })
          .then(trigger => {
            this.removing = false
            this.$emit('saved', null)
          })
          .catch(e => {
            this.removing = false
            throw e
          })
      }
    }
  }
</script>
