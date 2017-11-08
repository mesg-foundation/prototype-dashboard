<template>
  <table-listing
    :headers="headers"
    :items="invitations"
    :title="$t('title')"
    :loading="loadingInvitations"
    :pagination="invitationsPagination"
    :total="invitationsTotal"
    @pageChanged="invitationsChangePage"
    transparent>
    <template scope="invitation">
      <td>
        {{ invitation.email }}
      </td>
      <td class="text-xs-right">
        <DateTime :value="invitation.createdAt"></DateTime>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Invitations"
    header:
      email: "Email"
      createdAt: "Sent"
</i18n>

<script>
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing'
  import DateTime from '@/components/DateTime'
  export default {
    components: {
      TableListing,
      DateTime
    },
    mixins: [
      withCurrentProject,
      collection('invitations', { pagination: true })
    ],
    computed: {
      invitationsParams () {
        return {
          projectId: this.currentProjectId,
          ...this.invitationsPagination
        }
      },
      headers () {
        return [
          { text: this.$t('header.email'), align: 'left', sortable: false, value: 'email' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false, value: 'createdAt' }
        ]
      }
    }
  }
</script>
