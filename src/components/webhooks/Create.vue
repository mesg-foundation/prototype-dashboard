<template>
  <ContractForm
    v-if="!contract"
    submitLabel="Next ->"
    @saved="contractSaved">
  </ContractForm>
  <WebhookForm
    v-else
    :contract="contract"
    @saved="webhookSaved">
  </WebhookForm>
</template>

<script>
  import ContractForm from '@/components/contracts/Form.vue'
  import WebhookForm from './Form.vue'
  export default {
    components: {
      ContractForm,
      WebhookForm
    },
    data () {
      return {
        contract: null
      }
    },
    methods: {
      contractSaved (contract) {
        this.contract = contract
      },
      webhookSaved (webhook) {
        this.$router.push({ name: 'Webhook', params: { id: webhook.id } })
      }
    }
  }
</script>
