<template>
  <form @submit.prevent="submit()">
    <v-card flat>
      <TriggerFormHeader
        :trigger="trigger">
      </TriggerFormHeader>
      <v-divider></v-divider>
      <v-card-text>
        <EventSelector
          :label="$t('labels.event')"
          :contract="contract"
          v-model="eventName"
          @input="$v.eventName.$touch()"
          required>
        </EventSelector>

        <v-layout row wrap>
          <v-flex
            v-for="service in services" :key="service.id"
            xs12 sm6 md4 lg3>
            <Service
              class="ma-1"
              :service="service"
              v-model="serviceId">
            </Service>
          </v-flex>
        </v-layout>
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
          :disabled="!isValid"
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
    labels:
      event: "Event to connect for your trigger"
</i18n>
<script>
  import { mapActions } from 'vuex'
  import { required } from '@/validators'
  import withValidation from '@/mixins/withValidation'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import collection from '@/mixins/collection'
  import EventSelector from '@/components/EventSelector.vue'
  import TriggerFormHeader from '@/components/triggers/FormHeader.vue'
  import Service from '@/components/services/Item.vue'

  export default {
    components: {
      EventSelector,
      TriggerFormHeader,
      Service
    },
    mixins: [
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
      }
    },
    methods: {
      ...mapActions({
        createTrigger: 'triggers/create',
        updateTrigger: 'triggers/update'
      }),
      submit () {
        const method = (this.trigger || {}).id ? 'updateTrigger' : 'createTrigger'
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
