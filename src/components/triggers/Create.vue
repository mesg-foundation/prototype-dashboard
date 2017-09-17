<template>
  <TriggerForm
    v-if="contract"
    :contract="contract"
    :event="event"
    :cancelable="!contractFromProps"
    @cancel="contract = null"
    @saved="triggerSaved">
  </TriggerForm>
  <ContractSelection
    v-else
    @selected="contractSelected">
  </ContractSelection>
</template>

<i18n>
  en:
    title: "New Trigger"
</i18n>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ContractSelection from '@/components/contracts/Selector'
  import TriggerForm from './Form.vue'
  export default {
    components: {
      TriggerForm,
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
    metaInfo () {
      return {
        title: this.$t('title')
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
      triggerSaved (trigger) {
        this.$router.push({ name: 'Trigger', params: { id: trigger.id } })
      }
    },
    watch: {
      contractFromProps () {
        this.contract = this.contractFromProps
      }
    },
    mounted () {
      if (this.contractId && !this.contractFromProps) {
        this.fetch({ variables: { id: this.contractId } })
      }
    }
  }
</script>
