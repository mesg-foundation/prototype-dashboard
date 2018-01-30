<template>
  <v-layout column>
    <v-toolbar color="white" flat>
      <v-toolbar-title class="headline">{{ workflow.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          30 MESG
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-tabs v-model="active">
      <v-tabs-bar color="white">
        <v-tabs-item
          v-for="tab in tabs"
          :key="tab"
          nuxt :to="`/workflows/${workflow.id}/${tab}`"
          ripple>
          {{ tab }}
        </v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-divider></v-divider>
      <v-container>
        <nuxt />
      </v-container>
    </v-tabs>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        tabs: ['overview', 'executions', 'details', 'settings'],
        active: 'overview'
      }
    },
    computed: {
      workflow () {
        return require('~/assets/workflows.json').data.workflows
          .find(x => x.id === this.$route.params.id)
      }
    }
  }
</script>
