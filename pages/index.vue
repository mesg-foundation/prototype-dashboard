<template>
  <v-layout column>
    <v-card class="ma-3">
      <v-card-title>My Workflows</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex
            v-for="chart in charts.workflows" :key="chart"
            xs4>
            <v-card flat tile>
              <v-card-text>
                <WorkflowTimeChart :title="chart" :style="style"></WorkflowTimeChart>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-card class="ma-3">
      <v-card-title>My Runners</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex
            v-for="chart in charts.runners" :key="chart"
            xs4>
            <v-card flat tile>
              <v-card-text>
                <WorkflowTimeChart :title="chart" :style="style"></WorkflowTimeChart>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import WorkflowTimeChart from '~/components/WorkflowTimeChart'
export default {
  components: {
    WorkflowTimeChart
  },
  computed: {
    charts () {
      return {
        workflows: [
          'Workflow executions',
          'Task duration (ms)',
          'Total price (MESG)'
        ],
        runners: [
          'Task processed',
          'Task duration (ms)',
          'Reward received (MESG)'
        ]
      }
    },
    style () {
      return {
        height: '200px'
      }
    }
  }
}
</script>
