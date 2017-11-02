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
          <v-layout row wrap>
            <v-flex md6>
              <div>
                <v-card-title class="subheading">Events per day</v-card-title>
                <v-card-text>
                  <EventChart
                    v-if="data"
                    :height="200"
                    :data="data">
                  </EventChart>
                </v-card-text>
              </div>
            </v-flex>
            <v-flex md6>
              <div>
                <v-card-title class="subheading">Average time execution</v-card-title>
                <v-card-text>
                  <EventChart
                    v-if="data"
                    :height="200"
                    :data="data">
                  </EventChart>
                </v-card-text>
              </div>
            </v-flex>
            <v-flex md6>
              <div>
                <v-card-title class="subheading">Error per day</v-card-title>
                <v-card-text>
                  <EventChart
                    v-if="data"
                    :height="200"
                    :data="data">
                  </EventChart>
                </v-card-text>
              </div>
            </v-flex>
            <v-flex md6>
              <div>
                <v-card-title class="subheading">Min/Max time execution</v-card-title>
                <v-card-text>
                  <EventChart
                    v-if="data"
                    :height="200"
                    :data="data">
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
          <v-list two-line>
            <template v-for="(notification, i) in notifications">
              <v-divider v-if="i !== 0" :key="notification.id"></v-divider>
              <v-list-tile :key="notification.id">
                <v-list-tile-avatar>
                  <v-icon :class="`${error[notification.kind].level}--text`">{{ error[notification.kind].icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ notification.kind }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ notification.trigger.title }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import MenuToggle from '@/components/MenuToggle'
import EventChart from '@/components/charts/events'
import client from '@/graphql'
import allEvents from '@/graphql/events/queries/stats.graphql'
import collection from '@/mixins/collection'
import withCurrentProject from '@/mixins/withCurrentProject'
import groupDataByTime from '@/utils/groupDataByTime'

export default {
  components: {
    MenuToggle,
    EventChart
  },
  mixins: [
    withCurrentProject,
    collection('notifications', { pagination: true })
  ],
  data () {
    return {
      data: null
    }
  },
  computed: {
    error () {
      return {
        TRIGGER_ERROR: { level: 'warning', icon: 'warning' },
        TRIGGER_DISABLED: { level: 'error', icon: 'error' }
      }
    },
    from () {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14)
    },
    to () {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    },
    notificationsParams () {
      return {
        projectId: this.currentProjectId,
        ...this.notificationsPagination
      }
    }
  },
  mounted () {
    client().query({
      query: allEvents,
      variables: {
        projectId: this.currentProjectId,
        from: this.from,
        to: this.to
      }
    })
      .then(({ data }) => {
        this.data = groupDataByTime(data.allEvents, {
          from: this.from,
          to: this.to
        })
      })
  }
}
</script>
