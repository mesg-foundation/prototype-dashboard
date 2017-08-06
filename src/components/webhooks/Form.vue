<template>
  <form @submit.prevent="submit()">
    <v-card flat>
      <WebhookFormHeader
        :webhook="webhook">
      </WebhookFormHeader>
      <v-divider></v-divider>
      <v-card-text>
        <EventSelector
          :label="$t('labels.event')"
          :contract="contract"
          v-model="eventName"
          @input="$v.eventName.$touch()"
          required>
        </EventSelector>

        <v-text-field
          :label="$t('labels.endpoint')"
          v-model="endpoint"
          @input="$v.endpoint.$touch()"
          type="url"
          required>
        </v-text-field>

        <template v-if="advanced">
          <v-text-field
            :label="$t('labels.secret')"
            :hint="$t('hints.secret', { variable: headerSecretValue })"
            v-model="secret"
            persistent-hint>
          </v-text-field>

          <v-select
            :label="$t('labels.authorizationType')"
            :items="authorizations"
            :hint="$t('hints.authorization')"
            v-model="authorizationType"
            @input="$v.authorizationType.$touch()"
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
          @click.stop="advanced = true">
          {{ $t('advanced') }}
        </v-btn>
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
    submit: "Sauvegarder"
    advanced: "Advanced"
    cancel: "Cancel"
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
  import { mapActions } from 'vuex'
  import withValidation from '@/mixins/withValidation'
  import { required, url, includedIn } from '@/validators'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import EventSelector from '@/components/EventSelector.vue'
  import WebhookFormHeader from '@/components/webhooks/FormHeader.vue'

  const AUTHORIZATIONS = [
    'NONE',
    'BASIC',
    'BEARER'
  ]

  export default {
    components: {
      EventSelector,
      WebhookFormHeader
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
      webhook: {
        type: Object,
        default: null
      },
      cancelable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      const webhook = this.webhook || {}
      return {
        advanced: webhook.authorizationValue && webhook.secret,
        eventName: webhook.eventName,
        endpoint: webhook.endpoint,
        authorizationType: webhook.authorizationType || 'NONE',
        authorizationValue: webhook.authorizationValue,
        secret: webhook.secret
      }
    },
    computed: {
      authorizations () {
        return AUTHORIZATIONS
      },
      headerSecretValue () { return process.env.HEADER_SECRET_KEY }
    },
    validations: {
      eventName: {
        required
      },
      endpoint: {
        required,
        url
      },
      authorizationType: {
        required,
        includedIn: includedIn(AUTHORIZATIONS)
      }
    },
    methods: {
      ...mapActions({
        createWebhook: 'webhooks/create',
        updateWebhook: 'webhooks/update'
      }),
      submit () {
        const method = (this.webhook || {}).id ? 'updateWebhook' : 'createWebhook'
        this[method]({
          id: (this.webhook || {}).id,
          endpoint: this.endpoint,
          eventName: this.eventName,
          contractId: this.contract.id,
          projectId: this.currentProjectId,
          authorizationType: this.authorizationType,
          authorizationValue: this.authorizationValue,
          secret: this.secret
        })
          .then(webhook => this.$emit('saved', webhook))
      }
    }
  }
</script>
