<template>
  <ContractForm
    :contract="contract"
    :title="$t('title')"
    @saved="contractSaved">
  </ContractForm>
</template>

<i18n>
  en:
    title: "Edit contract"
</i18n>

<script>
  import item from '@/mixins/item'
  import ContractForm from '@/components/contracts/Form.vue'
  export default {
    components: {
      ContractForm
    },
    mixins: [
      item('contract')
    ],
    props: {
      id: {
        type: String,
        required: true
      }
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
