<template>
  <v-layout column fill-height>
    <v-toolbar card class="secondary">
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">
        Dashboard
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-layout fill-height>
      <v-flex sm9 style="border-right: solid 1px rgba(0,0,0,0.12)">
        <v-layout column>
          <Metrics :chartSize="250" :data="logs"></Metrics>
          <v-divider></v-divider>
          <v-card-text>
            News
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-flex sm3>
        <notification-list fill-height :notifications="notifications"></notification-list>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

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
  data () {
    return {
      logs: null
    }
  },
  computed: {
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
      from: this.from,
      to: this.to
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
