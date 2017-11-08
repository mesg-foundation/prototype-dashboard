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
      <v-btn
        :to="{ name: 'NewTrigger' }"
        color="success" dark>
        <v-icon>add</v-icon>
        {{ $t('create') }}
      </v-btn>
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
          <TriggerTitle :trigger="trigger"></TriggerTitle>
        </router-link>
      </td>
      <td class="text-xs-right">
        <DateTime :value="trigger.createdAt"></DateTime>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Triggers"
    create: "Add Trigger"
    header:
      enable: "Active"
      title: "Title"
      createdAt: "Created at"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing'
  import TriggerSwitch from '@/components/triggers/Switch'
  import QuotaWarning from '@/components/QuotaWarning'
  import TriggerTitle from '@/components/triggers/Title'
  import DateTime from '@/components/DateTime'
  export default {
    components: {
      TableListing,
      QuotaWarning,
      TriggerSwitch,
      TriggerTitle,
      DateTime
    },
    mixins: [
      withCurrentProject,
      collection('triggers', { pagination: true, syncUrl: true })
    ],
    metaInfo () {
      return {
        title: this.$t('title')
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
          { text: this.$t('header.title'), align: 'left', sortable: false, value: 'title' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
