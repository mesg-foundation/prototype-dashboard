<template>
  <table-listing
    :headers="headers"
    :items="contracts"
    :title="$t('title')"
    :loading="loadingContracts"
    :pagination="contractsPagination"
    :total="contractsTotal"
    @pageChanged="contractsChangePage"
    searchable
    withMenu>
    <template slot="toolbar">
      <PopupPageButton
        :to="{ name: 'NewContract' }"
        success dark icon="add"
        :title="$t('create')"
        v-model="popup">
        <NewContract @saved="popup = false"></NewContract>
      </PopupPageButton>
    </template>
    <template slot="extension">
      <QuotaWarning feature="contracts"></QuotaWarning>
    </template>
    <template scope="contract">
      <td>
        <router-link :to="{ name: 'Contract', params: { id: contract.id } }">
          <v-icon class="mr-2">{{ contract.public ? 'public' : 'vpn_lock' }}</v-icon>
          {{ contract.name }}
        </router-link>
      </td>
      <td>
        {{ contract.address }}
      </td>
      <td>
        {{ contract.chain }}
      </td>
      <td class="text-xs-right">
        <timeago :since="contract.createdAt" :auto-update="10"></timeago>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Contracts"
    create: "Add contract"
    header:
      name: "Name"
      address: "Address"
      chain: "Blockchain"
      createdAt: "Created at"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing'
  import PopupPageButton from '@/components/PopupPageButton'
  import NewContract from '@/components/contracts/Create'
  import QuotaWarning from '@/components/QuotaWarning'
  export default {
    components: {
      TableListing,
      NewContract,
      PopupPageButton,
      QuotaWarning
    },
    mixins: [
      withCurrentProject,
      collection('contracts', { pagination: true })
    ],
    data () {
      return {
        popup: false
      }
    },
    computed: {
      contractsParams () {
        return {
          projectId: this.currentProjectId,
          ...this.contractsPagination
        }
      },
      headers () {
        return [
          { text: this.$t('header.name'), align: 'left', sortable: false, value: 'name' },
          { text: this.$t('header.address'), align: 'left', sortable: false, value: 'address' },
          { text: this.$t('header.chain'), align: 'left', sortable: false, value: 'chain' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
