<template>
  <table-listing
    :headers="headers"
    :items="contracts"
    :title="$t('title')">
    <template scope="contract">
      <td>
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
  import { mapGetters, mapActions } from 'vuex'
  import TableListing from '@/components/layouts/TableListing.vue'
  export default {
    components: {
      TableListing
    },
    methods: mapActions({
      fetchContracts: 'contracts/fetchAll'
    }),
    computed: {
      ...mapGetters({
        contracts: 'contracts/collectionList',
        projectId: 'session/currentProjectId'
      }),
      headers () {
        return [
          { text: this.$t('header.address'), align: 'left', sortable: true, value: 'address' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: true, value: 'createdAt' }
        ]
      }
    },
    mounted () {
      this.fetchContracts({ projectId: this.projectId })
    }
  }
</script>

<style lang="stylus">
  @import "../../variables"

  nav.grey.lighten-3 + .table__overflow thead {
    background: $grey.lighten-3;
  }
</style>
