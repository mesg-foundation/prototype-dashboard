<template>
  <v-list two-line>
    <v-list-tile
      v-for="contract in contracts" :key="contract.id"
      @click.stop="submit(contract)">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ contract.name }}
          <span class="caption"> - {{ contract.chain }}</span>
        </v-list-tile-title>
        <v-list-tile-sub-title>
          {{ contract.address }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import withCurrentProject from '@/mixins/withCurrentProject'
  import collection from '@/mixins/collection'
  export default {
    mixins: [
      withCurrentProject,
      collection('contracts', { pagination: true })
    ],
    data () {
      return {
        contractId: null
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
    methods: {
      submit (contract) {
        this.$emit('selected', contract)
      }
    }
  }
</script>
