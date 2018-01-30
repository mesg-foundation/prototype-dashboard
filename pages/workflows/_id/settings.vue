<template>
  <v-card>
    <v-card-title class="headline">
      Settings
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout class="ma-4 mb-5" row wrap justify-center align-center>
        <v-flex xs12 md6 class="text-xs-center">
          <h3 class="subheading mb-2">Workflow status</h3>
          <p>This workflow is actually up and running</p>
          <v-btn color="error">
            Disable this workflow
          </v-btn>
          <br/>
          <span class="caption">You can enable it again anytime</span>
        </v-flex>
        <v-flex xs12 md6 class="text-xs-center">
          <h3 class="subheading mb-2">Workflow wallet</h3>
          <h4 class="headline">{{ 30 }} MESG</h4>
          <v-btn color="primary">
            Topup
          </v-btn>
        </v-flex>
      </v-layout>
      <v-text-field label="Title" :value="workflow.title"></v-text-field>
      <v-text-field label="Description" :value="workflow.description" auto-grow multi-line></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn class="error">Destroy this workflow</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="primary">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    workflow () {
      return require('~/assets/workflows.json').data.workflows
        .find(x => x.id === this.$route.params.id)
    }
  }
}
</script>
