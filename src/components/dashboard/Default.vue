<template>
  <v-layout column fill-height>
    <v-toolbar card class="white">
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">
        {{ $t('title') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-layout fill-height row wrap>
      <v-flex sm9 class="scrollable full-content-height" style="border-right: solid 1px rgba(0,0,0,0.12)">
        <Metrics
          :chartSize="250"
          :data="logs"
          :defaultFilter="filter">
          <v-flex xs12 md6>
            <v-card flat height="100%">
              <v-card-title class="subheading">{{ $t('wallets') }}</v-card-title>
              <v-card-text>
                <v-list two-line>
                  <v-list-tile v-for="wallet in wallets" :key="wallet.id">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ wallet.chain }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ wallet.address }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <span v-if="balance[wallet.id] !== undefined">
                        {{ balance[wallet.id].amount }} {{ balance[wallet.id].unit }}
                      </span>
                      <v-progress-circular v-else indeterminate size="20"></v-progress-circular>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </Metrics>
      </v-flex>
      <v-flex sm3 class="scrollable full-content-height">
        <notification-list :notifications="notifications"></notification-list>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<i18n>
  en:
    title: "Dashboard"
    wallets: "Wallets"
</i18n>

<script>
import MenuToggle from '@/components/MenuToggle'
import client from '@/graphql'
import allLogs from '@/graphql/stats/logs.graphql'
import allLogsMeta from '@/graphql/stats/logsMeta.graphql'
import fetchAllPages from '@/utils/fetchAllPages'
import collection from '@/mixins/collection'
import withCurrentProject from '@/mixins/withCurrentProject'
import wallets from '@/mixins/wallets'
import NotificationList from '@/components/notifications/List'
import Metrics from './Metrics'

export default {
  components: {
    MenuToggle,
    Metrics,
    NotificationList
  },
  mixins: [
    withCurrentProject,
    wallets,
    collection('notifications', { pagination: true })
  ],
  metaInfo () {
    return {
      title: this.$t('title')
    }
  },
  data () {
    return {
      logs: null
    }
  },
  computed: {
    filter () {
      const now = new Date()
      return {
        from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, now.getHours()),
        to: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1),
        groupBy: 'hour'
      }
    },
    notificationsParams () {
      return {
        projectId: this.currentProjectId,
        ...this.notificationsPagination
      }
    },
    statsParams () {
      return {
        projectId: this.currentProjectId,
        from: this.filter.from,
        to: this.filter.to
      }
    }
  },
  methods: {
    async reloadStats () {
      this.logs = null
      const { data: { _allTaskLogsMeta: { count } } } = await client().query({
        query: allLogsMeta,
        variables: this.statsParams
      })
      const fetch = fetchAllPages(client(), { total: count })
      this.logs = await fetch(allLogs, this.statsParams)
    }
  },
  watch: {
    statsParams () { this.reloadStats() }
  },
  mounted () {
    this.reloadStats()
  }
}
</script>
