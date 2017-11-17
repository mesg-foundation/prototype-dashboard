<template>
  <table-listing
    :headers="headers"
    :items="addresses"
    :title="$t('title')"
    :loading="loadingAddresses"
    :total="addressesTotal"
    @pageChanged="addressesChangePage"
    transparent>
    <template scope="address">
      <td>{{ address.address }}</td>
      <td>{{ address.chain }}</td>
      <td class="text-xs-right">
        <span v-if="balance[address.id] !== undefined">
          {{ balance[address.id].amount }} {{ balance[address.id].unit }}
        </span>
        <v-progress-circular v-else indeterminate size="20"></v-progress-circular>
      </td>
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
      balance: "Balance"
      createdAt: "Created at"
</i18n>

<script>
  import wallets from '@/mixins/wallets'
  import TableListing from '@/components/layouts/TableListing'
  import DateTime from '@/components/DateTime'
  export default {
    components: {
      TableListing,
      DateTime
    },
    mixins: [
      wallets
    ],
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    computed: {
      headers () {
        return [
          { text: this.$t('header.address'), align: 'left', sortable: false },
          { text: this.$t('header.chain'), align: 'left', sortable: false },
          { text: this.$t('header.balance'), align: 'right', sortable: false },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false }
        ]
      }
    }
  }
</script>
