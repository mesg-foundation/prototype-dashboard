<template>
  <v-card flat>
    <v-toolbar card class="secondary">
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">
        Dashboard
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <EventChart
        v-if="data"
        :height="100"
        :data="data"></EventChart>
    </v-card-text>
  </v-card>
</template>

<script>
import MenuToggle from '@/components/MenuToggle'
import EventChart from '@/components/charts/events'
import client from '@/graphql'
import allEvents from '@/graphql/events/queries/stats.graphql'
import withCurrentProject from '@/mixins/withCurrentProject'
import groupDataByTime from '@/utils/groupDataByTime'

export default {
  components: {
    MenuToggle,
    EventChart
  },
  mixins: [withCurrentProject],
  data () {
    return {
      data: null
    }
  },
  computed: {
    from () {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14)
    },
    to () {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), now.getDate())
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
