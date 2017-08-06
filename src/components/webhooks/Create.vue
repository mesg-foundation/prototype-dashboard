<template>
  <WebhookForm
    v-if="contract"
    :contract="contract"
    :event="event"
    :cancelable="!contractFromProps"
    @cancel="contract = null"
    @saved="webhookSaved">
  </WebhookForm>
  <ContractSelection
    v-else
    @selected="contractSelected">
  </ContractSelection>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ContractSelection from '@/components/contracts/Selector'
  import WebhookForm from './Form.vue'
  export default {
    components: {
      WebhookForm,
      ContractSelection
    },
    props: {
      contractId: {
        type: String,
        default: null
      },
      event: {
        type: String,
        default: null
      }
    },
    data () {
      return {
        contract: null
      }
    },
    computed: {
      ...mapGetters({
        contracts: 'contracts/collection'
      }),
      contractFromProps () {
        if (!this.contractId) { return null }
        return this.contracts[this.contractId]
      }
    },
    methods: {
      ...mapActions({
        fetch: 'contracts/fetch'
      }),
      contractSelected (contract) {
        this.contract = contract
      },
      webhookSaved (webhook) {
        this.$router.push({ name: 'Webhook', params: { id: webhook.id } })
      }
    },
    watch: {
      contractFromProps () {
        this.contract = this.contractFromProps
      }
    },
    mounted () {
      if (this.contractId && !this.contractFromProps) {
        this.fetch({ id: this.contractId })
      }
    }
  }
</script>
