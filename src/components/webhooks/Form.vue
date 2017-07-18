<template>
  <form @submit.prevent="submit()">
    <v-card>
      <v-card-title>
        {{ $t('title') }}
      </v-card-title>
      <v-card-text>
        <EventSelector
          :label="$t('labels.event')"
          v-model="event"
          :contract="contract"
          required>
        </EventSelector>

        <v-text-field
          :label="$t('labels.endpoint')"
          v-model="endpoint"
          type="url"
          required>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          primary dark
          type="submit">
          {{ $t('submit') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<i18n>
  en:
    title: "Create a webhook"
    submit: "Sauvegarder"
    labels:
      event: "Event to connect for your webhook"
      endpoint: "Endpoint"
</i18n>
<script>
  import { mapActions } from 'vuex'
  import EventSelector from '@/components/EventSelector.vue'

  export default {
    components: {
      EventSelector
    },
    props: {
      contract: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        event: 'hello',
        endpoint: 'http://webhook.site/8d7a21c2-8a05-4331-b213-514a5770096b'
      }
    },
    methods: {
      ...mapActions({
        createWebhook: 'webhooks/create'
      }),
      submit () {
        this.createWebhook({
          endpoint: this.endpoint,
          eventName: this.event,
          contractId: this.contract.id
        })
          .then(webhook => this.$emit('saved', webhook))
      }
    }
  }
</script>
