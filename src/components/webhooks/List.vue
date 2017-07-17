<template>
  <v-card flat>
    <v-toolbar card class="grey lighten-3">
      <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        success class="white--text"
        router :to="{ name: 'NewWebhook' }">
        <v-icon class="white--text">add</v-icon>
        {{ $t('create') }}
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="webhooks"
      hide-actions>
      <template slot="items" scope="props">
        <td>
          <v-switch v-model="props.item.enable"></v-switch>
        </td>
        <td>
          <router-link :to="{ name: 'Webhook', params: { id: props.item.id } }">
            {{ props.item.endpoint }}
          </router-link>
        </td>
        <td>{{ props.item.eventName }}</td>
        <td class="text-xs-right">
          <time-formatter :value="props.item.createdAt"></time-formatter>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<i18n>
  en:
    title: "Webhooks"
    create: "New Webhook"
    header:
      enable: " "
      endpoint: "Endpoint"
      eventName: "Event Name"
      createdAt: "Created at"
</i18n>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import TimeFormatter from '@/components/formatters/Time.vue'
  export default {
    components: {
      TimeFormatter
    },
    methods: mapActions({
      fetchWebhooks: 'webhooks/fetchAll'
    }),
    computed: {
      ...mapGetters({
        webhooks: 'webhooks/collectionList',
        projectId: 'session/currentProjectId'
      }),
      headers () {
        return [
          { text: this.$t('header.enable'), align: 'left', sortable: false },
          { text: this.$t('header.endpoint'), align: 'left', sortable: true, value: 'endpoint' },
          { text: this.$t('header.eventName'), align: 'left', sortable: true, value: 'eventName' },
          { text: this.$t('header.createdAt'), align: 'right', sortable: true, value: 'createdAt' }
        ]
      }
    },
    mounted () {
      this.fetchWebhooks({ projectId: this.projectId })
    }
  }
</script>

<style lang="stylus">
  @import "../../variables"

  nav.grey.lighten-3 + .table__overflow thead {
    background: $grey.lighten-3;
  }
</style>
