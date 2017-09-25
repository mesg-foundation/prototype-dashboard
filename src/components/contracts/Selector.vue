<template>
  <v-layout row wrap justify-center align-center>
    <Contract
      v-for="contract in contracts" :key="contract.id"
      class="ma-2"
      :contract="contract"
      v-model="contractId"
      @input="submit(contract)">
    </Contract>
  </v-layout>
</template>

<script>
  import withCurrentProject from '@/mixins/withCurrentProject'
  import collection from '@/mixins/collection'
  import Contract from '@/components/contracts/Card'
  export default {
    components: {
      Contract
    },
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
