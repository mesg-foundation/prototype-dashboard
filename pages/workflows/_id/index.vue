<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="ma-2 text-xs-center">
          <v-layout row wrap align-center justify-center>
            <v-flex xs12 md4>
              <v-card-text>
                <h3 class="subheading">Average price</h3>
                <div class="title pa-5">40 MESG</div>
              </v-card-text>
            </v-flex>

            <v-flex xs12 md4>
              <v-card-text>
                <h3 class="subheading">Average duration</h3>
                <div class="title pa-5">50 ms</div>
              </v-card-text>
            </v-flex>

            <v-flex xs12 md4>
              <v-card-text>
                <h3 class="subheading">Error percentage</h3>
                <div class="title pa-5">2.34%</div>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs12 md4>
        <v-card class="ma-2">
          <v-card-title class="subheading">Executions over time</v-card-title>
          <v-card-text>
            <WorkflowTimeChart :height="200" title="executions"></WorkflowTimeChart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="ma-2">
          <v-card-title class="subheading">Price</v-card-title>
          <v-card-text>
            <WorkflowTimeChart :height="200" title="price (MESG)"></WorkflowTimeChart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md4>
        <v-card class="ma-2">
          <v-card-title class="subheading">Tasks / minutes</v-card-title>
          <v-card-text>
            <WorkflowTimeChart :height="200" title="tasks/min"></WorkflowTimeChart>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import WorkflowTimeChart from '~/components/WorkflowTimeChart'
export default {
  computed: {
    workflow () {
      return require('~/assets/workflows.json').data.workflows
        .find(x => x.id === this.$route.params.id)
    }
  },
  components: {
    WorkflowTimeChart
  }
}
</script>
