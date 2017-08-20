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
  import withValidation from '@/mixins/withValidation'
  import { required } from '@/validators'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import EventSelector from '@/components/EventSelector.vue'
  import TriggerFormHeader from '@/components/triggers/FormHeader.vue'

  export default {
    components: {
      EventSelector,
      TriggerFormHeader
    },
    mixins: [
      withValidation,
      withCurrentProject
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
        eventName: trigger.eventName || this.event
      }
    },
    validations: {
      eventName: {
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
          projectId: this.currentProjectId
        }})
          .then(trigger => this.$emit('saved', trigger))
      }
    }
  }
</script>
