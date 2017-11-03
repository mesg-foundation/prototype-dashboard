<template>
  <v-layout fill-height column>
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
          <v-layout row wrap v-if="logs">
            <v-flex md6>
              <div>
                <v-card-title class="subheading">Events per day</v-card-title>
                <v-card-text>
                  <EventChart
                    :interval="interval"
                    :height="250"
                    :labels="totalPerDay.labels"
                    :data="totalPerDay.data">
                  </EventChart>
                </v-card-text>
              </div>
            </v-flex>
            <v-flex md6>
              <div>
                <v-card-title class="subheading">Average time execution (ms)</v-card-title>
                <v-card-text>
                  <EventChart
                    :interval="interval"
                    :height="250"
                    :labels="durationAverage.labels"
                    :data="durationAverage.data">
                  </EventChart>
                </v-card-text>
              </div>
            </v-flex>
            <v-flex md6>
              <div>
                <v-card-title class="subheading">Error per day</v-card-title>
                <v-card-text>
                  <EventChart
                    :interval="interval"
                    :height="250"
                    :labels="errorsPerDay.labels"
                    :data="errorsPerDay.data">
                  </EventChart>
                </v-card-text>
              </div>
            </v-flex>
          </v-layout>
          <v-card-text style="height:200px; border-top: solid 1px rgba(0,0,0,0.12)">
            News
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-flex sm3>
        <v-layout fill-height column>
          <notification-list :notifications="notifications"></notification-list>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import MenuToggle from '@/components/MenuToggle'
import EventChart from '@/components/charts/events'
import client from '@/graphql'
import allLogs from '@/graphql/stats/logs.graphql'
import allLogsMeta from '@/graphql/stats/logsMeta.graphql'
import collection from '@/mixins/collection'
import withCurrentProject from '@/mixins/withCurrentProject'
import groupDataByTime from '@/utils/groupDataByTime'
import fetchAllPages from '@/utils/fetchAllPages'
import NotificationList from '@/components/notifications/List'

export default {
  components: {
    MenuToggle,
    EventChart,
    NotificationList
  },
  mixins: [
    withCurrentProject,
    collection('notifications', { pagination: true })
  ],
  props: {
    interval: {
      type: String,
      default: 'day'
    }
  },
  data () {
    return {
      logs: null
    }
  },
  computed: {
    from () {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)
    },
    to () {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    },
    totalPerDay () {
      return groupDataByTime(this.logs, {
        from: this.from,
        to: this.to,
        groupBy: this.interval,
        method: 'count'
      })
    },
    durationAverage () {
      return groupDataByTime(this.logs, {
        from: this.from,
        to: this.to,
        attribute: 'duration',
        groupBy: this.interval,
        method: 'avg'
      })
    },
    errorsPerDay () {
      return groupDataByTime(this.logs, {
        from: this.from,
        to: this.to,
        groupBy: this.interval,
        attribute: 'code',
        method: list => list.filter(x => !x.startsWith('20')).length
      })
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
