<template>
  <v-layout column>
    <v-toolbar color="white">
      <v-text-field
        type="text"
        prepend-icon="search"
        name="search"
        label="Search"
        clearable full-width hide-details single-line>
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon><v-icon>filter_list</v-icon></v-btn>
    </v-toolbar>
    <v-container fluid grid-list-md class="pa-4">
      <h2 class="headline mb-4">My workflows</h2>
      <v-layout row wrap class="mb-4">
        <v-flex xs2>
          <v-card hover class="ma-2" nuxt :to="`/workflows/new`">
            <v-card-text style="height:156px">
              <v-layout class="text-xs-center" column justify-center alin-center fill-height>
                <h3 class="subheading">Create a new workflow</h3>
                <v-icon class="mt-4" x-large>add</v-icon>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs2
          v-for="workflow in workflows"
          :key="workflow.id">
          <v-card hover class="ma-2" nuxt :to="`/workflows/${workflow.id}`">
            <v-card-title class="subheading">{{ workflow.title }}</v-card-title>
            <v-card-text style="height:100px">
              {{ workflow.description }}
              <br>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      workflows () {
        return require('~/assets/workflows.json').data.workflows
      }
    }
  }
</script>
