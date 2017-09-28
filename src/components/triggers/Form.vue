<template>
  <form novalidate @submit.prevent="submit()">
    <v-card flat>
      <TriggerFormHeader
        :trigger="trigger">
      </TriggerFormHeader>
      <v-divider></v-divider>
      <QuotaWarning feature="executions"></QuotaWarning>
      <v-card-text>
        <v-layout row justify-center align-center>
          <FormConnector v-model="connector"></FormConnector>
          <v-icon large class="ma-3">keyboard_arrow_right</v-icon>
          <FormAction v-model="action"></FormAction>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn
          primary dark block
          :loading="saving"
          type="submit">
          {{ $t('submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<i18n>
  en:
    submit: "Save"
</i18n>

<script>
  import Utils from '@/utils'
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
      withCurrentProject,
      updateOrCreate('Connector'),
      updateOrCreate('Action'),
      updateOrCreate('Trigger')
    ],
    props: {
      trigger: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        connector: this.trigger.connector || {},
        action: this.trigger.action || {},
        saving: false
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
          ...this.action
        }
      }
    },
    methods: {
      submit () {
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
              projectId: this.currentProjectId,
              connectorId: connector.id,
              actionId: action.id
            })
          })
          .then(trigger => {
            this.saving = false
            this.$emit('saved', trigger)
          })
          .catch(() => (this.saving = false))
      }
    }
  }
</script>
