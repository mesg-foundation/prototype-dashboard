<template>
  <v-card flat>
    <form @submit.prevent="submit()">
      <v-toolbar card class="secondary">
        <MenuToggle></MenuToggle>
        <v-toolbar-title class="headline">{{ $t('title') }}</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <WebhookDetailList
        :webhook="webhook">
      </WebhookDetailList>
      <v-divider></v-divider>
      <PayloadViewer
        :signature="eventInputs()"
        @input="$v.payload.$touch()"
        v-model="payload"
        editable>
      </PayloadViewer>
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
  import WebhookDetailList from '@/components/webhooks/DetailList'
  import PayloadViewer from '@/components/PayloadViewer'
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      WebhookDetailList,
      PayloadViewer,
      MenuToggle
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
        payload: ''
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
        this.createEvent({ variables: {
          webhookId: this.webhook.id,
          payload: this.payload,
          transactionId: '0x0000000000000000000000000000000000000000'
        }})
          .then(event => this.$emit('saved', event))
      }
    }
  }
</script>
