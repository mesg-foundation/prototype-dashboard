<template>
  <table-listing
    :headers="headers"
    :items="addresses"
    :title="$t('title')"
    :loading="loadingAddresses"
    :pagination="addressesPagination"
    :total="addressesTotal"
    @pageChanged="addressesChangePage"
    transparent>
    <template scope="address">
      <td>{{ address.address }}</td>
      <td>{{ address.chain }}</td>
      <td>{{ address.publicKey }}</td>
      <td class="text-xs-right">
        <DateTime :value="address.createdAt"></DateTime>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Addresses"
    header:
      chain: "Blockchain"
      address: "Address"
      public: "Public key"
      createdAt: "Created at"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing'
  import DateTime from '@/components/DateTime'
  export default {
    components: {
      TableListing,
      DateTime
    },
    mixins: [
      withCurrentProject,
      collection('addresses', { pagination: true })
    ],
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    computed: {
      addressesParams () {
        return {
          projectId: this.currentProjectId,
          ...this.addressesPagination
        }
      },
      headers () {
        return [
          { text: this.$t('header.address'), align: 'left', sortable: false },
          { text: this.$t('header.chain'), align: 'left', sortable: false },
          { text: this.$t('header.public'), align: 'left', sortable: false },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false }
        ]
      }
    }
  }
</script>
