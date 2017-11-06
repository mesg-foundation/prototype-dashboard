<template>
  <v-layout column fill-height>
    <v-toolbar card class="white">
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">
        Dashboard
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
        </Metrics>
        <p class="text-xs-right caption grey--text pr-3">{{ $t('interval') }}</p>
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
    interval: "Statistics for the last 24 hours"
</i18n>

<script>
import MenuToggle from '@/components/MenuToggle'
import client from '@/graphql'
import allLogs from '@/graphql/stats/logs.graphql'
import allLogsMeta from '@/graphql/stats/logsMeta.graphql'
import fetchAllPages from '@/utils/fetchAllPages'
import collection from '@/mixins/collection'
import withCurrentProject from '@/mixins/withCurrentProject'
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
    }
  },
  async mounted () {
    const variables = {
      projectId: this.currentProjectId,
      from: this.filter.from,
      to: this.filter.to
    }
    const { data: { _allTaskLogsMeta: { count } } } = await client().query({
      query: allLogsMeta,
      variables
    })
    const fetch = fetchAllPages(client(), { total: count })
    this.logs = await fetch(allLogs, variables)
  }
}
</script>
