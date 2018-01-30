<template>
  <v-layout row>
    <v-flex xs12 md8>
      <v-card class="ma-4">
        <v-card-title class="subheading">
          {{ service.title }}
          <v-spacer></v-spacer>
          <span v-for="i in 5" :key="i"><v-icon class="amber--text">star</v-icon></span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          {{ service.description }}
        </v-card-text>
      </v-card>
      <v-card class="ma-4">
        <v-card-title class="subheading">Events</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <ActionsDetail :actions="service.events" paramKey="data"></ActionsDetail>
        </v-card-text>
      </v-card>
      <v-card class="ma-4">
        <v-card-title class="subheading">Tasks</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <ActionsDetail include-price :actions="service.tasks" paramKey="arguments"></ActionsDetail>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 md4>
      <v-card class="ma-4">
        <v-card-title>Active Runners</v-card-title>
        <v-card-text>
          <WorkflowTimeChart title="Active runners" style="height: 150px;"></WorkflowTimeChart>
        </v-card-text>
      </v-card>
      <v-card class="ma-4">
        <v-card-title>Average task time</v-card-title>
        <v-card-text>
          <WorkflowTimeChart title="Avg task time (ms)" style="height: 150px;"></WorkflowTimeChart>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ActionsDetail from '~/components/ActionsDetail'
import WorkflowTimeChart from '~/components/WorkflowTimeChart'
export default {
  computed: {
    service () {
      return require('~/assets/services.json').data.allservices
        .find(x => x.id === this.$route.params.id)
    }
  },
  components: {
    ActionsDetail,
    WorkflowTimeChart
  }
}
</script>
