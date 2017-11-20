<template>
  <ContractSelector
    v-if="!contract"
    :contracts="contracts"
    @selected="x => contractId = x.id">
  </ContractSelector>

  <v-card flat v-else>
    <v-card-text>
      <v-card class="mb-4">
        <v-card-text>
          <h2 class="subheading black--text">
            {{ contract.name }} - {{ contract.chain }}
          </h2>
          <span class="md-caption">{{ contract.address }}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="contractId = null">
            {{ $t('change') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>{{ $t('selectEventText') }}</p>
      <AbiSelector
        type="event"
        :label="$t('labels.event')"
        :contract="contract"
        v-model="eventName"
        :rules="rules.eventName"
        required>
      </AbiSelector>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    change: "Change contract"
    selectEventText: "Select the event you want to get notified. This event will be emited directly from the contract you've selected"
    labels:
      event: "Contract's event"
</i18n>

<script>
import { required } from '@/validators'
import withValidation from '@/mixins/withValidation'
import withCurrentProject from '@/mixins/withCurrentProject'
import collection from '@/mixins/collection'
import item from '@/mixins/item'
import AbiSelector from '@/components/abi/Selector'
import ContractSelector from '@/components/contracts/Selector'
export default {
  components: {
    AbiSelector,
    ContractSelector
  },
  mixins: [
    withValidation,
    withCurrentProject,
    collection('contracts', { pagination: true }),
    item('contract', x => x.contractId)
  ],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      contractId: (this.value.contract || {}).id || this.value.contractId,
      eventName: this.value.eventName
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
  validations: {
    eventName: {
      required
    }
  },
  watch: {
    eventName () {
      if (!this.validate()) { return this.$emit('input', null) }
      this.$emit('input', {
        contractId: this.contract.id,
        eventName: this.eventName
      })
    }
  }
}
</script>
