<template>
  <table-listing
    :headers="headers"
    :items="events"
    :loading="loadingEvents"
    :pagination="eventsPagination"
    :total="eventsTotal"
    @pageChanged="eventsChangePage"
    extended
    withMenu>
    <template slot="title">
      <TriggerTitle v-if="trigger" :trigger="trigger"></TriggerTitle>
    </template>
    <template v-if="trigger" slot="toolbar">
      <v-btn
        :to="{ name: 'EditTrigger', params: { id: trigger.id } }"
        primary outline>
        {{ $t('update') }}
      </v-btn>
      <v-btn
        :to="{ name: 'ExecuteTrigger', params: { triggerId: trigger.id } }"
        primary outline
        v-model="testModal">
        {{ $t('test') }}
      </v-btn>
    </template>
    <TriggerDetailList
      slot="extension"
      class="secondary"
      v-if="trigger"
      :trigger="trigger">
    </TriggerDetailList>
    <template scope="event">
      <td>
        <router-link :to="{ name: 'Event', params: { id: event.id, triggerId: trigger.id } }">
          <timeago :since="event.createdAt" :auto-update="10"></timeago>
        </router-link>
      </td>
      <td>
        {{ event.transactionId }}
      </td>
      <td>
        {{ event.payload }}
      </td>
      <td>
        {{ event._taskLogsMeta.count }}
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Trigger"
    test: "Test"
    update: "Update"
    header:
      createdAt: "Created At"
      transactionId: "Transaction ID"
      payload: "Data"
      attempts: "Attempts"
</i18n>

<script>
  import item from '@/mixins/item'
  import collection from '@/mixins/collection'
  import TableListing from '@/components/layouts/TableListing'
  import TriggerDetailList from '@/components/triggers/DetailList'
  import TriggerTitle from '@/components/triggers/Title'
  export default {
    components: {
      TableListing,
      TriggerDetailList,
      TriggerTitle
    },
    mixins: [
      item('trigger'),
      collection('events', { pagination: true })
    ],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    metaInfo () {
      return {
        title: this.$t('title', this.trigger)
      }
    },
    data () {
      return {
        testModal: false
      }
    },
    computed: {
      eventsParams () {
        return {
          triggerId: this.id,
          ...this.eventsPagination
        }
      },
      headers () {
        return [
          { text: this.$t('header.createdAt'), align: 'left', sortable: false, value: 'createdAt' },
          { text: this.$t('header.transactionId'), align: 'left', sortable: false, value: 'transactionId' },
          { text: this.$t('header.payload'), align: 'left', sortable: false, value: 'payload' },
          { text: this.$t('header.attempts'), align: 'left', sortable: false, value: '_taskLogsMeta' }
        ]
      }
    }
  }
</script>
