<template>
  <table-listing
    :headers="headers"
    :items="events"
    :title="title"
    :loading="loadingEvents"
    extended>
    <template v-if="webhook" slot="toolbar">
      <v-dialog
        lazy
        width="480"
        v-model="formModal">
        <v-btn slot="activator" primary outline>
          {{ $t('update') }}
        </v-btn>
        <WebhookForm
          :webhook="webhook"
          :contract="webhook.contract"
          @saved="closeFormModal()">
        </WebhookForm>
      </v-dialog>
      <v-dialog
        lazy
        width="480"
        v-model="testModal">
        <v-btn slot="activator" primary outline>
          {{ $t('test') }}
        </v-btn>
        <EventForm
          :webhook="webhook"
          @saved="closeTestModal()">
        </EventForm>
      </v-dialog>
    </template>
    <WebhookDetailList
      slot="extension"
      class="secondary"
      v-if="webhook"
      :webhook="webhook">
    </WebhookDetailList>
    <template scope="event">
      <td>
        <router-link :to="{ name: 'Event', params: { id: event.id, webhookId: webhook.id } }">
          <timeago :since="event.createdAt" :auto-update="10"></timeago>
        </router-link>
      </td>
      <td>
        {{ event.transactionId }}
      </td>
      <td>
        {{ event.payload }}
      </td>
      <td>
        {{ event._webhookResultsMeta.count }}
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    test: "Test"
    update: "Update"
    header:
      createdAt: "Created At"
      transactionId: "Transaction ID"
      payload: "Data"
      attempts: "Attempts"
</i18n>

<script>
  import item from '@/mixins/item'
  import collection from '@/mixins/collection'
  import TableListing from '@/components/layouts/TableListing.vue'
  import EventForm from '@/components/events/Form.vue'
  import WebhookForm from '@/components/webhooks/Form.vue'
  import WebhookDetailList from '@/components/webhooks/DetailList.vue'
  export default {
    components: {
      TableListing,
      EventForm,
      WebhookForm,
      WebhookDetailList
    },
    mixins: [
      item('webhook'),
      collection('events', component => ({
        webhookId: component.id
      }))
    ],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        formModal: false,
        testModal: false
      }
    },
    computed: {
      title () {
        if (!this.webhook) { return '' }
        return [
          this.webhook.eventName,
          this.webhook.contract.address
        ].join(' - ')
      },
      headers () {
        return [
          { text: this.$t('header.createdAt'), align: 'left', sortable: false, value: 'createdAt' },
          { text: this.$t('header.transactionId'), align: 'left', sortable: false, value: 'transactionId' },
          { text: this.$t('header.payload'), align: 'left', sortable: false, value: 'payload' },
          { text: this.$t('header.attempts'), align: 'left', sortable: false, value: '_webhookResultsMeta' }
        ]
      }
    },
    methods: {
      closeTestModal () {
        this.testModal = false
      },
      closeFormModal () {
        this.formModal = false
      }
    }
  }
</script>
