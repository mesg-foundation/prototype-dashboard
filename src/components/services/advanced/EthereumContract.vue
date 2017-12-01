<template>
  <section>
    <ContractSelector
      v-if="!contractId"
      :contracts="contracts"
      @selected="x => contractId = x.id">
    </ContractSelector>
    <template v-else-if="contract">
      <v-btn color="primary" flat @click.stop="contractId = method = payload =  null">
        <v-icon class="mr-2">keyboard_arrow_left</v-icon>
        {{ $t('change') }}
      </v-btn>
      <AbiSelector
        type="function"
        :label="$t('labels.function')"
        :contract="contract"
        v-model="method"
        required>
      </AbiSelector>
      <PayloadViewer
        v-if="method"
        :contractId="contractId"
        type="function"
        :name="method"
        v-model="payload"
        editable>
      </PayloadViewer>
      <v-text-field
        v-if="selectedAbi && selectedAbi.payable"
        prefix="Ξ"
        v-model.number="amount"
        :type="schema.properties.amount.type"
        :label="schema.properties.amount.title"
        :hint="schema.properties.amount.description">
      </v-text-field>
    </template>
  </section>
</template>

<i18n>
  en:
    change: "Change the contract"
    labels:
      function: "Select a function from your contract"
</i18n>

<script>
import withCurrentProject from '@/mixins/withCurrentProject'
import collection from '@/mixins/collection'
import item from '@/mixins/item'
import ContractSelector from '@/components/contracts/Selector'
import AbiSelector from '@/components/ABI/Selector'
import PayloadViewer from '@/components/PayloadViewer'
export default {
  components: {
    AbiSelector,
    ContractSelector,
    PayloadViewer
  },
  mixins: [
    withCurrentProject,
    collection('contracts', { pagination: true }),
    item('contract', x => x.contractId)
  ],
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      contractId: this.value.contractId,
      method: (this.value.abi || {}).name,
      payload: this.value.payload,
      amount: this.value.amount
    }
  },
  computed: {
    contractsParams () {
      return {
        projectId: this.currentProjectId,
        ...this.contractsPagination
      }
    },
    selectedAbi () {
      if (!this.contract) { return null }
      return this.contract.abi
        .filter(x => x.type === 'function')
        .filter(x => x.name === this.method)[0]
    },
    outputs () {
      if (!this.contractId) { return null }
      if (!this.selectedAbi) { return null }
      return {
        contractId: this.contractId,
        abi: this.selectedAbi,
        payload: this.payload,
        amount: this.amount
      }
    }
  },
  methods: {
    submit () {
      if (!this.outputs) { return }
      this.$emit('input', this.outputs)
    }
  },
  watch: {
    contractId () { this.submit() },
    method () { this.submit() },
    payload () { this.submit() },
    amount () { this.submit() }
  }
}
</script>
