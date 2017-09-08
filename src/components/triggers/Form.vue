<template>
  <form novalidate @submit.prevent="submit()">
    <v-card flat>
      <TriggerFormHeader
        :trigger="trigger">
      </TriggerFormHeader>
      <v-divider></v-divider>
      <QuotaWarning feature="executions"></QuotaWarning>
      <v-card-text>
        <EventSelector
          :label="$t('labels.event')"
          :contract="contract"
          :error-messages="errors.eventName"
          v-model="eventName"
          @input="$v.eventName.$touch()"
          required>
        </EventSelector>

        <p>{{ $t('servicesText') }}</p>

        <v-layout row wrap>
          <v-flex
            v-for="service in services" :key="service.id"
            :class="{ 'xs12 sm6': inDialog, 'xs12 sm6 md4 lg3': !inDialog }">
            <Service
              class="ma-1"
              :service="service"
              v-model="serviceId"
              @input="$v.serviceId.$touch()">
            </Service>
          </v-flex>
        </v-layout>
        <span v-if="errors.serviceId" class="error--text">{{ errors.serviceId[0] }}</span>

        <component
          v-if="serviceForm"
          :is="serviceForm"
          :service="selectedService"
          v-model="serviceData"
          @input="$v.serviceData.$touch()">
          <span slot="errors" v-if="errors.serviceData" class="error--text">{{ errors.serviceData[0] }}</span>
        </component>

      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="cancelable"
          light flat block
          @click="$emit('cancel')">
          {{ $t('cancel') }}
        </v-btn>
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
    submit: "Save"
    advanced: "Advanced"
    cancel: "Cancel"
    servicesText: "Connect the event to any of the services bellow."
    labels:
      event: "Event to connect for your trigger"
</i18n>
<script>
  import { mapActions } from 'vuex'
  import { required } from '@/validators'
  import inDialog from '@/mixins/inDialog'
  import withValidation from '@/mixins/withValidation'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import collection from '@/mixins/collection'
  import EventSelector from '@/components/EventSelector.vue'
  import TriggerFormHeader from '@/components/triggers/FormHeader.vue'
  import Service from '@/components/services/Item.vue'
  import QuotaWarning from '@/components/QuotaWarning'

  export default {
    components: {
      EventSelector,
      TriggerFormHeader,
      Service,
      QuotaWarning
    },
    mixins: [
      inDialog,
      withValidation,
      withCurrentProject,
      collection('services')
    ],
    props: {
      contract: {
        type: Object,
        required: true
      },
      trigger: {
        type: Object,
        default: null
      },
      cancelable: {
        type: Boolean,
        default: false
      },
      event: {
        type: String,
        default: null
      }
    },
    data () {
      const trigger = this.trigger || {}
      return {
        eventName: trigger.eventName || this.event,
        serviceId: (trigger.service || {}).id,
        serviceData: trigger.serviceData
      }
    },
    validations: {
      eventName: {
        required
      },
      serviceId: {
        required
      },
      serviceData: {
        required
      }
    },
    computed: {
      selectedService () {
        if (!this.serviceId) { return false }
        return this.services.find(x => x.id === this.serviceId)
      },
      serviceForm () {
        if (!this.selectedService) { return null }
        return {
          Webhook: () => import('@/components/services/webhook/Form'),
          SendgridEmail: () => import('@/components/services/sendgridEmail/Form'),
          ServerlessFunction: () => import('@/components/services/serverlessFunction/Form'),
          SlackNotification: () => import('@/components/services/slackNotification/Form')
        }[this.selectedService.key]
      }
    },
    methods: {
      ...mapActions({
        createTrigger: 'triggers/create',
        updateTrigger: 'triggers/update'
      }),
      submit () {
        const method = (this.trigger || {}).id ? 'updateTrigger' : 'createTrigger'
        if (!this.validate()) { return }
        this[method]({ variables: {
          id: (this.trigger || {}).id,
          eventName: this.eventName,
          contractId: this.contract.id,
          projectId: this.currentProjectId,
          serviceId: this.serviceId,
          serviceData: this.serviceData
        }})
          .then(trigger => this.$emit('saved', trigger))
      }
    }
  }
</script>
