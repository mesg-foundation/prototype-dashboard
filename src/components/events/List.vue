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
    <template slot="title" v-if="trigger">
      <TriggerSwitch class="trigger-switch" :trigger="trigger"></TriggerSwitch>
      <TriggerTitle :trigger="trigger"></TriggerTitle>
    </template>
    <template v-if="trigger" slot="toolbar">
      <v-btn
        :to="{ name: 'EditTrigger', params: { id: trigger.id } }"
        color="primary" outline>
        {{ $t('update') }}
      </v-btn>
      <v-btn
        :to="{ name: 'ExecuteTrigger', params: { triggerId: trigger.id } }"
        color="primary" outline>
        {{ $t('test') }}
      </v-btn>
    </template>
    <div v-if="trigger" slot="extension">
      <TriggerDetailList :trigger="trigger"></TriggerDetailList>
      <v-divider></v-divider>
      <v-toolbar flat class="transparent">
        <v-toolbar-title class="subheading">
          {{ $t('events') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-select
            solo auto
            v-model="eventType"
            :items="eventTypes"
            :label="$t('labels.eventType')"
            class="elevation-0">
          </v-select>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider></v-divider>
      <v-dialog :value="selectedEvent" @input="selectEvent" :width="640" lazy>
        <TaskLogList v-if="trigger && selectedEvent" :event="selectedEvent" :trigger="trigger"></TaskLogList>
      </v-dialog>
    </div>
    <template scope="event">
      <td>
        <DateTime :value="event.executedAt" advanced></DateTime>
      </td>
      <td>
        <a :href="blockLink(event)" target="_blank" :title="$t('etherscan')">
          {{ event.blockId }}
        </a>
      </td>
      <td>
        <a :href="transactionLink(event)" target="_blank" :title="$t('etherscan')">
          {{ event.transactionId }}
        </a>
      </td>
      <td class="text-xs-right">
        <template v-if="validEvents[event.id] !== null">
          <v-btn icon @click.stop="selectEvent(event)">
            <v-icon v-if="validEvents[event.id]" class="success--text">check</v-icon>
            <v-icon v-else class="error--text">close</v-icon>
          </v-btn>
        </template>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Trigger"
    test: "Test"
    update: "Edit"
    etherscan: "Look on Etherscan"
    events: "Events for this trigger"
    labels:
      eventType: "Type of event"
    header:
      executedAt: "Created At"
      blockId: "Block"
      transactionId: "Transaction ID"
      status: " "
    eventTypes:
      ALL: "All"
      VALID: "Valid"
      ERROR: "With error"
</i18n>

<script>
  import etherscan from '@/utils/etherscan'
  import item from '@/mixins/item'
  import collection from '@/mixins/collection'
  import TableListing from '@/components/layouts/TableListing'
  import TriggerDetailList from '@/components/triggers/DetailList'
  import TriggerTitle from '@/components/triggers/Title'
  import TriggerSwitch from '@/components/triggers/Switch'
  import TaskLogList from '@/components/taskLogs/List'
  import DateTime from '@/components/DateTime'
  export default {
    components: {
      TableListing,
      TriggerDetailList,
      TriggerTitle,
      TriggerSwitch,
      TaskLogList,
      DateTime
    },
    mixins: [
      item('trigger'),
      collection('events', { pagination: true, syncUrl: true })
    ],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        eventType: this.$route.query.eventType || 'ALL'
      }
    },
    metaInfo () {
      return {
        title: this.$t('title', this.trigger)
      }
    },
    computed: {
      eventTypes () {
        return ['ALL', 'VALID', 'ERROR']
          .map(x => ({ value: x, text: this.$t(`eventTypes.${x}`) }))
      },
      eventsFilter () {
        return {
          trigger: {
            id: this.id
          },
          ...(this.eventType === 'ERROR'
            ? { taskLogs_some: { error: true } }
            : {}),
          ...(this.eventType === 'VALID'
            ? { taskLogs_some: { error: false } }
            : {})
        }
      },
      eventsParams () {
        return {
          filter: {
            ...this.eventsFilter
          },
          ...this.eventsPagination
        }
      },
      headers () {
        return [
          { text: this.$t('header.executedAt'), align: 'left', sortable: false, value: 'executedAt' },
          { text: this.$t('header.blockId'), align: 'left', sortable: false, value: 'block' },
          { text: this.$t('header.transactionId'), align: 'left', sortable: false, value: 'transactionId' },
          { text: this.$t('header.status'), align: 'right', sortable: false }
        ]
      },
      validEvents () {
        return this.events.reduce((acc, event) => ({
          ...acc,
          [event.id]: this.validEvent(event)
        }), {})
      },
      etherscanInfo () {
        return etherscan(this.trigger) || {
          address: x => null,
          transaction: x => null,
          block: x => null
        }
      },
      selectedEvent () {
        return this.events
          .find(x => x.id === this.$route.query.id)
      }
    },
    methods: {
      selectEvent (eventOrStatus) {
        if (eventOrStatus === true) { return }
        this.$router.replace({
          ...this.$route,
          query: {
            ...this.$route.query,
            id: eventOrStatus ? eventOrStatus.id : ''
          }
        })
      },
      validEvent ({ taskLogs }) {
        if ((taskLogs || []).length === 0) { return null }
        return taskLogs
          .some(({ error }) => !error)
      },
      blockLink (event) {
        return this.etherscanInfo.block(event.blockId)
      },
      transactionLink (event) {
        return this.etherscanInfo.transaction(event.transactionId)
      }
    },
    watch: {
      eventType () {
        this.$router.replace({
          ...this.$route,
          query: {
            ...this.$route.query,
            eventType: this.eventType
          }
        })
      }
    }
  }
</script>

<style scoped>
  .trigger-switch {
    float: left;
    width: 36px;
    margin-right: .5em;
    margin-left: .25em;
  }
</style>
