<template>
  <div>
    <QuotaWarning feature="members"></QuotaWarning>
    <table-listing
      :headers="headers"
      :items="users"
      :title="$t('title')"
      :loading="loadingUsers"
      :pagination="usersPagination"
      :total="usersTotal"
      @pageChanged="usersChangePage"
      transparent>
      <template slot="toolbar">
        <v-dialog v-model="popup" width="640">
          <v-btn slot="activator" color="primary" dark outline>
            {{ $t('invite') }}
          </v-btn>
          <InvitationForm @saved="popup = false"></InvitationForm>
        </v-dialog>
      </template>
      <template scope="user">
        <td>{{ user.email }}</td>
        <td class="text-xs-right">
          <timeago :since="user.createdAt" :auto-update="10"></timeago>
        </td>
      </template>
    </table-listing>
    <InvitationList></InvitationList>
  </div>
</template>

<i18n>
  en:
    title: "Team"
    invite: "Invite"
    header:
      email: "Email"
      createdAt: "Created at"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing'
  import InvitationForm from '@/components/invitations/Form'
  import InvitationList from '@/components/invitations/List'
  import QuotaWarning from '@/components/QuotaWarning'
  export default {
    components: {
      TableListing,
      InvitationForm,
      InvitationList,
      QuotaWarning
    },
    mixins: [
      withCurrentProject,
      collection('users', { pagination: true })
    ],
    data () {
      return {
        popup: false
      }
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    computed: {
      usersParams () {
        return {
          projectId: this.currentProjectId,
          ...this.usersPagination
        }
      },
      headers () {
        return [
          { text: this.$t('header.email'), align: 'left', sortable: false },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false }
        ]
      }
    }
  }
</script>
