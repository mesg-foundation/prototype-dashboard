<template>
  <ContractForm
    v-if="form"
    cancelable
    @saved="contractSaved"
    @cancel="form = false">
  </ContractForm>
  <v-card flat v-else>
    <v-toolbar card>
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">{{ $t('title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        primary dark outline
        @click.stop="form = true">
        {{ $t('create') }}
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list two-line>
      <!-- TODO: Add pagination -->
      <v-list-tile
        v-for="contract in contracts" :key="contract.id"
        @click.stop="select(contract)">
        <v-list-tile-content>
          <v-list-tile-title>
            {{ contract.name }}
          </v-list-tile-title>
          <v-list-tile-sub-title>
            {{ contract.address }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<i18n>
  en:
    title: "Select a contract"
    create: "Add new contract"
</i18n>

<script>
  import withCurrentProject from '@/mixins/withCurrentProject'
  import collection from '@/mixins/collection'
  import ContractForm from '@/components/contracts/Form.vue'
  import MenuToggle from '@/components/MenuToggle'
  export default {
    components: {
      ContractForm,
      MenuToggle
    },
    mixins: [
      withCurrentProject,
      collection('contracts', { pagination: true })
    ],
    data () {
      return {
        form: false
      }
    },
    computed: {
      contractsParams () {
        return {
          projectId: this.currentProjectId,
          ...this.contractsPagination
        }
      }
    },
    watch: {
      contracts () {
        if (this.contracts.length === 0) {
          this.createContract = true
        }
      }
    },
    methods: {
      select (contract) {
        this.$emit('selected', contract)
      },
      contractSaved (contract) {
        this.select(contract)
      }
    }
  }
</script>
