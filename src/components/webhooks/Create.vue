<template>
  <WebhookForm
    v-if="contract"
    :contract="contract"
    cancelable
    @cancel="contract = null"
    @saved="webhookSaved">
  </WebhookForm>
  <ContractSelection
    v-else
    @selected="contractSelected">
  </ContractSelection>
</template>

<script>
  import ContractSelection from '@/components/contracts/Selector'
  import WebhookForm from './Form.vue'
  export default {
    components: {
      WebhookForm,
      ContractSelection
    },
    data () {
      return {
        contract: null
      }
    },
    methods: {
      contractSelected (contract) {
        this.contract = contract
      },
      webhookSaved (webhook) {
        this.$router.push({ name: 'Webhook', params: { id: webhook.id } })
      }
    }
  }
</script>
