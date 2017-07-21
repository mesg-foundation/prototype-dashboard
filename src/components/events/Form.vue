<template>
  <v-card flat>
    <form @submit.prevent="submit()">
      <v-toolbar card class="secondary">
        <v-toolbar-title class="headline">{{ $t('title') }}</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <WebhookDetailList
        :webhook="webhook">
      </WebhookDetailList>
      <v-divider></v-divider>
      <PayloadCreator
        :signature="eventInputs()"
        @input="$v.payload.$touch()"
        v-model="payload">
      </PayloadCreator>
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
    title: "Test the webhook"
    submit: "Send test event"
</i18n>

<script>
  import withValidation from '@/mixins/withValidation'
  import { mapActions } from 'vuex'
  import { required } from '@/validators'
  import WebhookDetailList from '@/components/webhooks/DetailList.vue'
  import PayloadCreator from '@/components/PayloadCreator.vue'
  export default {
    components: {
      WebhookDetailList,
      PayloadCreator
    },
    mixins: [
      withValidation
    ],
    props: {
      webhook: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        payload: null
      }
    },
    validations: {
      payload: {
        required
      }
    },
    methods: {
      ...mapActions({
        createEvent: 'events/create'
      }),
      eventInputs () {
        const event = this.webhook.contract.abi
          .filter(e => e.type === 'event')
          .filter(e => e.name === this.webhook.eventName)[0]
        if (!event) { return [] }
        return event.inputs
      },
      submit () {
        this.createEvent({
          webhookId: this.webhook.id,
          payload: this.payload,
          transactionId: '0x0000000000000000000000000000000000000000'
        })
          .then(event => this.$emit('saved', event))
      }
    }
  }
</script>
