<template>
  <table-listing
    :headers="headers"
    :items="webhooks"
    :title="$t('title')"
    :loading="loading">
    <template slot="toolbar">
      <v-spacer></v-spacer>
      <v-btn
        success class="white--text"
        router :to="{ name: 'NewWebhook' }">
        <v-icon class="white--text">add</v-icon>
        {{ $t('create') }}
      </v-btn>
    </template>
    <template scope="webhook">
      <td>
        <v-switch v-model="webhook.enable"></v-switch>
      </td>
      <td>
        <router-link :to="{ name: 'Webhook', params: { id: webhook.id } }">
          {{ webhook.endpoint }}
        </router-link>
      </td>
      <td>{{ webhook.eventName }}</td>
      <td class="text-xs-right">
        <timeago :since="webhook.createdAt"></timeago>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Webhooks"
    create: "New Webhook"
    header:
      enable: " "
      endpoint: "Endpoint"
      eventName: "Event Name"
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
    mixins: [
      withProjectId,
      collection('webhooks', component => ({
        projectId: component.projectId
      }))
    ],
    computed: {
      headers () {
        return [
          { text: this.$t('header.enable'), align: 'left', sortable: false },
          { text: this.$t('header.endpoint'), align: 'left', sortable: true, value: 'endpoint' },
          { text: this.$t('header.eventName'), align: 'left', sortable: true, value: 'eventName' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: true, value: 'createdAt' }
        ]
      }
    }
  }
</script>
