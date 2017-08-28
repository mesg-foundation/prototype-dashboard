<template>
  <div>
    <table-listing
      :headers="headers"
      :items="users"
      :title="$t('title')"
      :loading="loadingUsers"
      transparent>
      <template slot="toolbar">
        <PopupPageButton
          primary dark outline
          :title="$t('invite')"
          v-model="popup">
          <InvitationForm @saved="popup = false"></InvitationForm>
        </PopupPageButton>
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
  import PopupPageButton from '@/components/PopupPageButton'
  import InvitationForm from '@/components/invitations/Form'
  import InvitationList from '@/components/invitations/List'
  export default {
    components: {
      TableListing,
      PopupPageButton,
      InvitationForm,
      InvitationList
    },
    mixins: [
      withCurrentProject,
      collection('users', component => ({
        projectId: component.currentProjectId
      }))
    ],
    data () {
      return {
        popup: false
      }
    },
    computed: {
      headers () {
        return [
          { text: this.$t('header.email'), align: 'left', sortable: false },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false }
        ]
      }
    }
  }
</script>
