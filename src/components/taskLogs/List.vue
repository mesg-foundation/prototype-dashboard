<template>
  <table-listing
    :headers="headers"
    :items="taskLogs"
    :title="$t('title')"
    :loading="loadingTaskLogs"
    searchable
    withMenu>
    <template slot="toolbar">
      <v-btn
        v-if="event"
        primary outline
        :to="{ name: 'Trigger', params: { id: event.trigger.id } }">
        {{ $t('action') }}
      </v-btn>
    </template>
    <template scope="result">
      <td>
        <StatusCode :code="result.code"></StatusCode>
      </td>
      <td>{{ result.body || $t('empty') }}</td>
      <td class="text-xs-right">
        {{ result.duration || $t('empty') }}ms
      </td>
      <td class="text-xs-right">
        <timeago :since="result.createdAt" :auto-update="10"></timeago>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Trigger Event Results"
    action: "Go to trigger"
    empty: "Empty"
    header:
      code: "HTTP Status Code"
      body: "Body Result"
      duration: "Duration"
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
      triggerId: {
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
      collection('taskLogs', component => ({
        eventId: component.id
      }))
    ],
    computed: {
      headers () {
        return [
          { text: this.$t('header.code'), align: 'left', sortable: false, value: 'code' },
          { text: this.$t('header.body'), align: 'left', sortable: false, value: 'body' },
          { text: this.$t('header.duration'), align: 'right', sortable: false, value: 'duration' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
