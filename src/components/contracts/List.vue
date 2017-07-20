<template>
  <table-listing
    :headers="headers"
    :items="contracts"
    :title="$t('title')"
    :loading="loadingContracts"
    searchable>
    <template scope="contract">
      <td>
        <v-icon class="mr-2">{{ contract.public ? 'public' : 'vpn_lock' }}</v-icon>
        <router-link :to="{ name: 'Contract', params: { id: contract.id } }">
          {{ contract.address }}
        </router-link>
      </td>
      <td class="text-xs-right">
        <timeago :since="contract.createdAt"></timeago>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Contracts"
    header:
      address: "Address"
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
      collection('contracts', component => ({
        projectId: component.projectId
      }))
    ],
    computed: {
      headers () {
        return [
          { text: this.$t('header.address'), align: 'left', sortable: false, value: 'address' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
