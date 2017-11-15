<template>
  <table-listing
    :headers="headers"
    :items="keys"
    :title="$t('title')"
    :loading="loadingKeys"
    :pagination="keysPagination"
    :total="keysTotal"
    @pageChanged="keysChangePage"
    transparent>
    <template slot="toolbar">
      <v-dialog v-model="popup" width="640">
        <v-btn slot="activator" color="primary" dark outline>
          {{ $t('add') }}
        </v-btn>
        <v-card>
          <v-card-title>{{ $t('add') }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              :label="$t('labels.name')"
              v-model="name"/>
            <v-text-field
            <ChainSelector
              v-model="chain"
              :label="$t('labels.chain')">
            </ChainSelector>
            <v-text-field
              :label="$t('labels.publicKey')"
              v-model="publicKey"
              required
              multi-line />
            <v-text-field
              :label="$t('labels.privateKey')"
              v-model="privateKey"
              required
              multi-line />
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="primary" dark block
              @click.stop="submit()">
              {{ $t('add') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template scope="key">
      <td>{{ key.name }}</td>
      <td>{{ key.chain }}</td>
      <td>{{ key.public }}</td>
      <td class="text-xs-right">
        <DateTime :value="key.createdAt"></DateTime>
      </td>
    </template>
  </table-listing>
</template>

<i18n>
  en:
    title: "Keys"
    add: "Add a key"
    header:
      name: "Name"
      chain: "Blockchain"
      public: "Public key"
      createdAt: "Created at"
    labels:
      name: "Name"
      privateKey: "Private key"
      publicKey: "Public key"
      chain: "Blockchain"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import collection from '@/mixins/collection'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import TableListing from '@/components/layouts/TableListing'
  import DateTime from '@/components/DateTime'
  import ChainSelector from '@/components/ChainSelector'
  export default {
    components: {
      TableListing,
      DateTime,
      ChainSelector
    },
    mixins: [
      withCurrentProject,
      collection('keys', { pagination: true })
    ],
    data () {
      return {
        popup: false,
        privateKey: null,
        publicKey: null,
        chain: null,
        name: null
      }
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    computed: {
      keysParams () {
        return {
          projectId: this.currentProjectId,
          ...this.keysPagination
        }
      },
      headers () {
        return [
          { text: this.$t('header.name'), align: 'left', sortable: false },
          { text: this.$t('header.chain'), align: 'left', sortable: false },
          { text: this.$t('header.public'), align: 'left', sortable: false },
          { text: this.$t('header.createdAt'), align: 'right', sortable: false }
        ]
      }
    },
    methods: {
      ...mapActions({
        createKey: 'keys/create'
      }),
      async submit () {
        await this.createKey({ variables: {
          public: this.publicKey,
          private: this.privateKey,
          projectId: this.currentProjectId,
          chain: this.chain,
          name: this.name
        } })
        this.publicKey = this.privateKey = this.chain = this.name = null
        this.popup = false
      }
    }
  }
</script>
