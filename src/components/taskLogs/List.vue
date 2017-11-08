<template>
  <v-layout column>
    <v-card v-if="loadingTaskLogs">
      <v-layout row justify-center align-center>
        <v-progress-circular color="primary" class="ma-3" indeterminate></v-progress-circular>
      </v-layout>
    </v-card>
    <v-card v-else flat v-for="log in taskLogs" :key="log.id">
      <v-card-title class="subheading">
        <StatusCode class="mr-3" :error="log.error"></StatusCode>
        <DateTime :value="log.createdAt" advanced></DateTime>
        <v-spacer></v-spacer>
        <v-icon class="mr-2">timer</v-icon>
        {{ log.duration }}ms
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="grey lighten-3">
        <h4 class="subheading">{{ $t('result') }}</h4>
        <code>
{{ JSON.stringify(result(log), null, 2) }}
        </code>
        <h4 class="mt-3 subheading">{{ $t('event') }}</h4>
        <v-list class="secondary">
          <v-list-tile v-for="(item, i) in eventItems" :key="i">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.value }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.url">
              <v-btn icon :href="item.url" target="_blank">
                <v-icon>open_in_new</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('payload') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <code>
{{ JSON.stringify(event.payload, null, 2) }}<br/>
        </code>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<i18n>
  en:
    title: "Event's logs"
    result: "Result"
    event: "Event details"
    block: "Block"
    transaction: "Transaction"
    from: "From"
    to: "To"
    fees: "Fees"
    value: "Value"
    executedAt: "Executed at"
    payload: "Arguments"
</i18n>

<script>
  import etherscan from '@/utils/etherscan'
  import collection from '@/mixins/collection'
  import StatusCode from '@/components/StatusCode.vue'
  import DateTime from '@/components/DateTime'
  export default {
    components: {
      StatusCode,
      DateTime
    },
    props: {
      trigger: {
        type: Object,
        required: true
      },
      event: {
        type: Object,
        required: true
      }
    },
    mixins: [
      collection('taskLogs', { pagination: true })
    ],
    computed: {
      taskLogsParams () {
        return {
          eventId: this.event.id,
          ...this.taskLogsPagination
        }
      },
      externalLink () {
        return etherscan(this.trigger)
      },
      eventItems () {
        return [
          { title: this.$t('block'), value: this.event.blockId, url: this.externalLink.block(this.event.blockId) },
          { title: this.$t('transaction'), value: this.event.transactionId, url: this.externalLink.transaction(this.event.transactionId) },
          { title: this.$t('from'), value: this.event.from, url: this.externalLink.address(this.event.from) },
          { title: this.$t('to'), value: this.event.to, url: this.externalLink.address(this.event.to) },
          { title: this.$t('value'), value: this.event.value },
          { title: this.$t('fees'), value: this.event.fees }
        ]
      }
    },
    methods: {
      result (log) {
        try {
          return JSON.parse(log.result)
        } catch (e) {
          return log.result
        }
      }
    }
  }
</script>
