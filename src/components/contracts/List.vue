<template>
  <table-listing
    :headers="headers"
    :items="contracts"
    :title="$t('title')"
    :loading="loadingContracts"
    searchable
    withMenu>
    <template slot="toolbar">
      <PopupPageButton
        :to="{ name: 'NewContract' }"
        success dark icon="add"
        :title="$t('create')">
        <NewContract></NewContract>
      </PopupPageButton>
    </template>
    <template scope="contract">
      <td>
        <v-icon class="mr-2">{{ contract.public ? 'public' : 'vpn_lock' }}</v-icon>
        <router-link :to="{ name: 'Contract', params: { id: contract.id } }">
          {{ contract.address }}
        </router-link>
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
  export default {
    components: {
      TableListing,
      NewContract,
      PopupPageButton
    },
    mixins: [
      withCurrentProject,
      collection('contracts', component => ({
        projectId: component.currentProjectId
      }))
    ],
    computed: {
      headers () {
        return [
          { text: this.$t('header.address'), align: 'left', sortable: false, value: 'address' },
          { text: this.$t('header.chain'), align: 'left', sortable: false, value: 'chain' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
