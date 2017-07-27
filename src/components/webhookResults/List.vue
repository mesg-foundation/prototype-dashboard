<template>
  <div>
    <table-listing
      :headers="headers"
      :items="webhookResults"
      :title="$t('title')"
      :loading="loadingWebhookResults"
      searchable>
      <template scope="result">
        <td>{{ result.code }}</td>
        <td>{{ result.body }}</td>
        <td class="text-xs-right">
          <timeago :since="result.createdAt"></timeago>
        </td>
      </template>
    </table-listing>
  </div>
</template>

<i18n>
  en:
    title: "Webhook Event Results"
    header:
      code: "HTTP Status Code"
      body: "Body Result"
      createdAt: "Created at"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withProjectId from '@/mixins/withProjectId'
  import TableListing from '@/components/layouts/TableListing.vue'
  export default {
    components: {
      TableListing
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    mixins: [
      withProjectId,
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
