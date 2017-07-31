<template>
  <table-listing
    :headers="headers"
    :items="users"
    :title="$t('title')"
    :loading="loadingUsers"
    transparent>
    <template scope="user">
      <td>{{ user.email }}</td>
      <td>{{ $t(`role.${role(user)}`) }}</td>
      <td class="text-xs-right">
        <timeago :since="user.createdAt" :auto-update="10"></timeago>
      </td>
    </template>
  </table-listing></template>

<i18n>
  en:
    title: "Team"
    header:
      email: "Email"
      role: "Role"
      createdAt: "Created at"
    role:
      admin: "Admin"
      other: "Developper"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing.vue'
  export default {
    components: {
      TableListing
    },
    mixins: [
      withCurrentProject,
      collection('users', component => ({
        projectId: component.currentProjectId
      }))
    ],
    computed: {
      headers () {
        return [
          { text: this.$t('header.email'), align: 'left', sortable: false },
          { text: this.$t('header.role'), align: 'left', sortable: false },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false }
        ]
      }
    },
    methods: {
      role (user) {
        return user.id === this.currentProject.creator.id ? 'admin' : 'other'
      }
    }
  }
</script>
