<template>
  <table-listing
    :headers="headers"
    :items="triggers"
    :title="$t('title')"
    :loading="loadingTriggers"
    :pagination="triggersPagination"
    :total="triggersTotal"
    @pageChanged="triggersChangePage"
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
    <template slot="extension">
      <QuotaWarning feature="executions"></QuotaWarning>
    </template>
    <template scope="trigger">
      <td>
        <TriggerSwitch :trigger="trigger"></TriggerSwitch>
      </td>
      <td>
        <router-link :to="{ name: 'Trigger', params: trigger }">
          {{ trigger.action.service.name }}
        </router-link>
      </td>
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
      service: "Service"
      contractName: "Contract"
      createdAt: "Created at"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing'
  import PopupPageButton from '@/components/PopupPageButton'
  import NewTrigger from '@/components/triggers/Create'
  import TriggerSwitch from '@/components/triggers/Switch'
  import QuotaWarning from '@/components/QuotaWarning'
  export default {
    components: {
      TableListing,
      PopupPageButton,
      NewTrigger,
      QuotaWarning,
      TriggerSwitch
    },
    mixins: [
      withCurrentProject,
      collection('triggers', { pagination: true })
    ],
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    data () {
      return {
        popup: false
      }
    },
    computed: {
      triggersParams () {
        return {
          projectId: this.currentProjectId,
          ...this.triggersPagination
        }
      },
      headers () {
        return [
          { text: this.$t('header.enable'), align: 'left', sortable: false },
          { text: this.$t('header.service'), align: 'left', sortable: false, value: 'service.name' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
