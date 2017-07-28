<template>
  <form @submit.prevent="submit()">
    <v-card>
      <WebhookFormHeader
        :webhook="webhook">
      </WebhookFormHeader>
      <v-divider></v-divider>
      <v-card-text>
        <EventSelector
          :label="$t('labels.event')"
          v-model="eventName"
          :contract="contract"
          required>
        </EventSelector>

        <v-text-field
          :label="$t('labels.endpoint')"
          v-model="endpoint"
          type="url"
          required>
        </v-text-field>

        <template v-if="advanced">
          <v-text-field
            :label="$t('labels.secret')"
            v-model="secret"
            :hint="$t('hints.secret', { variable: headerSecretValue })"
            persistent-hint>
          </v-text-field>

          <v-select
            :label="$t('labels.authorizationType')"
            :items="authorizations"
            v-model="authorizationType"
            :hint="$t('hints.authorization')"
            persistent-hint>
          </v-select>

          <v-text-field
            v-if="authorizationType !== 'NONE'"
            :label="$t('labels.authorizationValue')"
            v-model="authorizationValue">
          </v-text-field>
        </template>
        <v-btn
          v-else
          flat primary
          class="ma-0"
          @click.native.stop="advanced = true">
          {{ $t('advanced') }}
        </v-btn>
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
    submit: "Sauvegarder"
    advanced: "Advanced"
    hints:
      secret: "This secret can help you to verify the validity of the webhook. This secret is sent throw the header variable `{variable}`"
      authorization: "This is usefull if your webhook needs some authentification"
    labels:
      event: "Event to connect for your webhook"
      endpoint: "Endpoint"
      secret: "Secret"
      authorizationType: "Authorization type"
      authorizationValue: "Authorization value"
</i18n>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import EventSelector from '@/components/EventSelector.vue'
  import WebhookFormHeader from '@/components/webhooks/FormHeader.vue'

  export default {
    components: {
      EventSelector,
      WebhookFormHeader
    },
    props: {
      contract: {
        type: Object,
        required: true
      },
      webhook: {
        type: Object,
        default: null
      }
    },
    data () {
      const webhook = this.webhook || {}
      return {
        advanced: webhook.authorizationValue && webhook.secret,
        eventName: webhook.eventName,
        endpoint: webhook.endpoint,
        authorizationType: webhook.authorizationType,
        authorizationValue: webhook.authorizationValue,
        secret: webhook.secret
      }
    },
    computed: {
      ...mapGetters({
        currentProjectId: 'session/currentProjectId'
      }),
      authorizations () {
        return [
          'NONE',
          'BASIC',
          'BEARER'
        ]
      },
      headerSecretValue () { return process.env.HEADER_SECRET_KEY }
    },
    methods: {
      ...mapActions({
        createWebhook: 'webhooks/create'
      }),
      submit () {
        this.createWebhook({
          endpoint: this.endpoint,
          eventName: this.eventName,
          contractId: this.contract.id,
          projectId: this.currentProjectId
        })
          .then(webhook => this.$emit('saved', webhook))
      }
    }
  }
</script>
