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
      <v-card-text>
        <v-text-field
          :label="$t('labels.payload')"
          :error-messages="errors.payload"
          v-model="payload"
          @input="$v.payload.$touch()"
          multi-line
          :hint="$t('hint')"
          persistent-hint
          hide-details
          :rows="6"
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
    title: "Test the webhook"
    submit: "Send test event"
    hint: "A JSON with the data from your Ethereum contract's event"
    labels:
      payload: "Parameters"
</i18n>

<script>
  import withValidation from '@/mixins/withValidation'
  import { mapActions } from 'vuex'
  import { required, jsonValid } from '@/validators'
  import WebhookDetailList from '@/components/webhooks/DetailList.vue'
  export default {
    components: {
      WebhookDetailList
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
        payload: this.defaultPayload() ? JSON.stringify(this.defaultPayload(), null, 2) : null
      }
    },
    validations: {
      payload: {
        required,
        jsonValid
      }
    },
    methods: {
      ...mapActions({
        createEvent: 'events/create'
      }),
      defaultPayload () {
        const event = this.webhook.contract.abi
          .filter(e => e.type === 'event')
          .filter(e => e.name === this.webhook.eventName)[0]
        if (!event) { return null }
        return event.inputs
          .reduce((acc, e) => ({
            ...acc,
            [e.name]: ''
          }), {})
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
