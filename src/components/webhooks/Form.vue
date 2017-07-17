<template>
  <form @submit.prevent="submit()">
    <v-card>
      <v-card-title>
        {{ $t('title') }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          :label="$t('labels.address')"
          v-model="address"
          placeholder="0x12345678901234567890123456789012"
          autofocus
          required>
        </v-text-field>

        <v-text-field
          :label="$t('labels.abi')"
          :rules="abiValidations"
          v-model="abi"
          :rows="6"
          multi-line
          required>
        </v-text-field>

        <EventSelector
          :label="$t('labels.event')"
          v-model="event"
          :abi="abiObject"
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
      address: "Contract address"
      abi: "ABI of the contract"
      event: "Event to connect for your webhook"
      endpoint: "Endpoint"
    errors:
      eventLength: "This ABI contains no events"
      parseError: "Cannot parse this ABI"
      eventsValid: "Some events are not valid, an event should contains a `name`, a `type` === 'event' and an array of `inputs`"
</i18n>
<script>
  import { mapActions } from 'vuex'
  import EventSelector from '@/components/EventSelector.vue'

  export default {
    components: {
      EventSelector
    },
    data () {
      return {
        address: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
        abi: '[{"type":"event", "inputs": [], "name": "hello"}]',
        event: 'hello',
        endpoint: 'http://webhook.site/8d7a21c2-8a05-4331-b213-514a5770096b',
        rules: {
          validABI: value => this.parseAbi(value)
            .length > 0 || this.$t('errors.parseError'),
          eventLength: value => this.extractEvents(this.parseAbi(value))
            .length > 0 || this.$t('errors.eventLength'),
          eventsValid: value => this.extractEvents(this.parseAbi(value))
            .filter(event => !event.name || !Array.isArray(event.inputs))
            .length === 0 || this.$t('errors.eventsValid')
        }
      }
    },
    computed: {
      abiObject () {
        return this.parseAbi(this.abi)
      },
      abiValidations () {
        return [
          this.rules.validABI,
          this.rules.eventLength,
          this.rules.eventsValid
        ]
      }
    },
    methods: {
      ...mapActions({
        createWebhook: 'webhooks/create'
      }),
      parseAbi (abi) {
        try {
          return JSON.parse(abi)
        } catch (e) {
          return []
        }
      },
      extractEvents (abiObject) {
        return abiObject.filter(e => e.type === 'event') || []
      },
      submit () {
        this.createWebhook({
          endpoint: this.endpoint,
          eventName: this.event,
          contractAddress: this.address,
          contractAbi: this.abi
        })
      }
    }
  }
</script>
