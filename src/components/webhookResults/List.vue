<template>
  <table-listing
    :headers="headers"
    :items="webhookResults"
    :title="$t('title')"
    :loading="loadingWebhookResults"
    searchable
    withMenu>
    <template slot="toolbar">
      <v-btn
        v-if="event"
        primary outline
        :to="{ name: 'Webhook', params: { id: event.webhook.id } }">
        {{ $t('action') }}
      </v-btn>
    </template>
    <template scope="result">
      <td>
        <StatusCode :code="result.code"></StatusCode>
      </td>
      <td>{{ result.body || $t('empty') }}</td>
      <td class="text-xs-right">
        <timeago :since="result.createdAt" :auto-update="10"></timeago>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Webhook Event Results"
    action: "Go to webhook"
    empty: "Empty"
    header:
      code: "HTTP Status Code"
      body: "Body Result"
      createdAt: "Created at"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import item from '@/mixins/item'
  import TableListing from '@/components/layouts/TableListing.vue'
  import StatusCode from '@/components/StatusCode.vue'
  export default {
    components: {
      TableListing,
      StatusCode
    },
    props: {
      webhookId: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    mixins: [
      item('event'),
      collection('webhookResults', component => ({
        eventId: component.id
      }))
    ],
    computed: {
      headers () {
        return [
          { text: this.$t('header.code'), align: 'left', sortable: false, value: 'code' },
          { text: this.$t('header.body'), align: 'left', sortable: false, value: 'body' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
