<template>
  <ContractForm
    @saved="contractSaved">
  </ContractForm>
</template>

<script>
  import ContractForm from '@/components/contracts/Form.vue'
  export default {
    components: {
      ContractForm
    },
    methods: {
      contractSaved (contract) {
        this.$router.push({ name: 'Contract', params: { id: contract.id } })
      }
    }
  }
</script>
