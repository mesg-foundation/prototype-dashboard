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
      <v-layout row wrap>
        <v-flex xs3
          v-for="service in services"
          :key="service.id">
          <v-card>
            <v-card-title class="subheading">{{ service.title }}</v-card-title>
            <v-card-text>
              {{ service.description }}
              <br>
            </v-card-text>
            <v-card-actions>
              <span v-for="i in 5" :key="i"><v-icon class="amber--text">star</v-icon></span>
              <v-spacer></v-spacer>
              <v-btn nuxt :to="`/services/${service.id}`">Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
    computed: {
      services () {
        return require('~/assets/services.json').data.allservices
      }
    }
  }
</script>
