<template>
  <ContractForm
    @saved="contractSaved">
  </ContractForm>
</template>

<i18n>
  en:
    title: "New contract"
</i18n>

<script>
  import ContractForm from '@/components/contracts/Form.vue'
  export default {
    components: {
      ContractForm
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    methods: {
      contractSaved (contract) {
        this.$router.push({ name: 'Contract', params: { id: contract.id } })
      }
    }
  }
</script>
