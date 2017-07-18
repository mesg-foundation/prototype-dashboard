<template>
  <v-card flat>
    <v-toolbar card class="grey lighten-3">
      <v-toolbar-title class="headline">{{ title }}</v-toolbar-title>
      <slot name="toolbar"></slot>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      hide-actions>
      <template slot="items" scope="props">
        <slot v-bind="props.item"></slot>
      </template>
    </v-data-table>
  </v-card>
</template>

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
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../variables"

  nav.grey.lighten-3 + .table__overflow thead {
    background: $grey.lighten-3;
  }
</style>
