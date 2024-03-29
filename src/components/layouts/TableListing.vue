<template>
  <v-layout column>
    <div>
      <v-toolbar card :class="{ secondary: !transparent, transparent }">
        <MenuToggle v-if="withMenu"></MenuToggle>
        <v-toolbar-title class="headline">
          {{ title }}
          <slot name="title"></slot>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="searchable">
          <v-text-field
            class="hidden-sm-and-down"
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
      <v-divider></v-divider>
    </div>
    <div class="full-content-height scrollable">
      <slot name="extension"></slot>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="items"
        :loading="loading"
        :custom-sort="a => a"
        hideActions>
        <template slot="items" scope="props">
          <tr>
            <slot v-bind="props.item"></slot>
          </tr>
        </template>
      </v-data-table>
      <div
        v-if="displayPagination"
        class="pa-3 text-sm-center">
        <v-pagination
          :length="paginationLength"
          :value="pagination.page"
          @input="x => this.$emit('pageChanged', x)"
          :total-visible="9">
        </v-pagination>
      </div>
    </div>
  </v-layout>
</template>

<i18n>
  en:
    search: "Search"
</i18n>

<script>
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      MenuToggle
    },
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
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      },
      transparent: {
        type: Boolean,
        default: false
      },
      withMenu: {
        type: Boolean,
        default: false
      },
      searchable: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: Object,
        default: null
      },
      total: {
        type: Number,
        default: null
      }
    },
    data () {
      return {
        search: null
      }
    },
    computed: {
      displayPagination () {
        return this.pagination && this.total && this.total >= this.pagination.itemPerPage
      },
      paginationLength () {
        return Math.ceil(this.total / this.pagination.itemPerPage)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../variables"

  .table__overflow.secondary--header thead {
    background: $theme.secondary;
  }
</style>
