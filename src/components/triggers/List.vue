<template>
  <table-listing
    :headers="headers"
    :items="triggers"
    :title="$t('title')"
    :loading="loadingTriggers"
    searchable
    withMenu>
    <template slot="toolbar">
      <PopupPageButton
        :to="{ name: 'NewTrigger' }"
        success dark icon="add"
        :title="$t('create')"
        v-model="popup">
        <NewTrigger @saved="popup = false"></NewTrigger>
      </PopupPageButton>
    </template>
    <template scope="trigger">
      <td>
        <v-switch v-model="trigger.enable"></v-switch>
      </td>
      <td>
        <router-link :to="{ name: 'Contract', params: trigger.contract }">
          {{ trigger.contract.name }}
        </router-link>
      </td>
      <td>{{ trigger.eventName }}</td>
      <td class="text-xs-right">
        <timeago :since="trigger.createdAt" :auto-update="10"></timeago>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Triggers"
    create: "New Trigger"
    header:
      enable: " "
      contractName: "Contract"
      eventName: "Event Name"
      createdAt: "Created at"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing'
  import PopupPageButton from '@/components/PopupPageButton'
  import NewTrigger from '@/components/triggers/Create'
  export default {
    components: {
      TableListing,
      PopupPageButton,
      NewTrigger
    },
    mixins: [
      withCurrentProject,
      collection('triggers', component => ({
        projectId: component.currentProjectId
      }))
    ],
    data () {
      return {
        popup: false
      }
    },
    computed: {
      headers () {
        return [
          { text: this.$t('header.enable'), align: 'left', sortable: false },
          { text: this.$t('header.contractName'), align: 'left', sortable: false, value: 'contract.name' },
          { text: this.$t('header.eventName'), align: 'left', sortable: false, value: 'eventName' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>