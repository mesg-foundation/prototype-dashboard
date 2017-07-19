<template>
  <v-card flat>
    <v-toolbar card class="secondary">
      <v-toolbar-title class="headline">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="searchable">
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search">
        </v-text-field>
        <v-spacer></v-spacer>
      </template>
      <slot name="toolbar"></slot>
    </v-toolbar>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="items"
      :loading="loading"
      :custom-sort="a => a"
      hide-actions>
      <template slot="items" scope="props">
        <slot v-bind="props.item"></slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<i18n>
  en:
    search: "Search"
</i18n>

<script>
  export default {
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      searchable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        search: null
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../variables"

  nav.secondary + .table__overflow thead {
    background: $theme.secondary;
  }
</style>
