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
          <v-dialog width="700" v-model="connectorPopup">
            <v-card slot="activator" hover class="selector">
              <v-layout column align-center justify-center>
                <span class="headline">{{ $t('when') }}</span>
                <v-card-text
                  v-if="connector && connector.connectorType"
                  class="text-xs-center">
                  <component
                    :is="connector[connector.connectorType].component"
                    :config="connector[connector.connectorType]">
                  </component>
                </v-card-text>
                <v-icon v-else x-large class="ma-4">schedule</v-icon>
              </v-layout>
            </v-card>
            <ConnectorSelector
              v-model="connector"
              @input="connectorPopup = false">
            </ConnectorSelector>
          </v-dialog>
          <v-icon large class="ma-3">keyboard_arrow_right</v-icon>
          <v-dialog width="700" v-model="actionPopup">
            <v-card slot="activator" hover class="selector">
              <v-layout column align-center justify-center>
                <span class="headline">{{ $t('then') }}</span>
                <v-card-text class="text-xs-center" v-if="action && action.service">
                  <img class="servicePicture mt-3 mb-3" v-if="action.service.picture" :src="action.service.picture" :alt="action.service.name">
                  <br/>
                  <span class="subheading">{{ action.service.name }}</span>
                </v-card-text>
                <v-icon v-else x-large class="ma-4">extension</v-icon>
              </v-layout>
            </v-card>
            <ActionSelector
              v-model="action"
              @input="actionPopup = false">
            </ActionSelector>
          </v-dialog>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn
          primary dark block
          type="submit">
          {{ $t('submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<i18n>
  en:
    when: "WHEN"
    then: "THEN"
    submit: "Save"
</i18n>
<script>
  import { mapActions } from 'vuex'
  import withValidation from '@/mixins/withValidation'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TriggerFormHeader from '@/components/triggers/FormHeader.vue'
  import QuotaWarning from '@/components/QuotaWarning'
  import ConnectorSelector from '@/components/connectors/Selector'
  import ActionSelector from '@/components/actions/Selector'

  export default {
    components: {
      TriggerFormHeader,
      QuotaWarning,
      ConnectorSelector,
      ActionSelector
    },
    mixins: [
      withValidation,
      withCurrentProject
    ],
    props: {
      trigger: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      const { connector, action } = this.trigger
      return {
        connectorPopup: false,
        actionPopup: false,
        connector,
        action
      }
    },
    methods: {
      ...mapActions({
        createTrigger: 'triggers/create',
        updateTrigger: 'triggers/update'
      }),
      submit () {
        const method = this.trigger.id ? 'updateTrigger' : 'createTrigger'
        if (!this.validate()) { return }
        this[method]({ variables: {
          id: this.trigger.id,
          projectId: this.currentProjectId,
          connector: this.connector,
          action: this.action
        }})
          .then(trigger => this.$emit('saved', trigger))
      }
    }
  }
</script>

<style scoped>
  .selector {
    width: 300px!important;
    height: 300px!important;
    margin: 2em;
  }

  .selector > div {
    height: 100%;
  }

  .servicePicture {
    height: 2em;
  }
</style>
