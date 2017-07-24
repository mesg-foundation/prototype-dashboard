<template>
  <table-listing
    :headers="headers"
    :items="projects"
    :title="$t('title')"
    :loading="loadingProjects">
    <template scope="contract">
      <td>
        {{ project.name }}
      </td>
      <td class="text-xs-right">
        <timeago :since="project.createdAt"></timeago>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Projects"
    header:
      name: "Name"
      createdAt: "Created at"
</i18n>

<script>
  import { mapGetters } from 'vuex'
  import collection from '@/mixins/collection'
  import TableListing from '@/components/layouts/TableListing.vue'
  export default {
    components: {
      TableListing
    },
    mixins: [
      collection('projects', component => ({
        userId: component.currentUserId
      }))
    ],
    computed: {
      ...mapGetters({
        currentUserId: 'session/currentUserId'
      }),
      headers () {
        return [
          { text: this.$t('header.name'), align: 'left', sortable: false, value: 'name' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
