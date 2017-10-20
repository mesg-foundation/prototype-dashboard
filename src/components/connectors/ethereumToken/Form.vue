<template>
  <ContractSelector
    v-if="!ethToken"
    :contracts="ethTokens"
    blockchainHidden
    @selected="x => contractId = x.id">
  </ContractSelector>

  <v-card flat v-else>
    <v-card-text>
      <v-card class="mb-4">
        <v-card-text>
          <h2 class="subheading black--text">
            <img :src="ethToken.picture" class="mr-2">
            {{ ethToken.name }}
          </h2>
          <span class="md-caption">{{ ethToken.description || ethToken.address }}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.stop="contractId = null">
            {{ $t('change') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>{{ $t('selectEventText') }}</p>
      <EventSelector
        :label="$t('labels.event')"
        :contract="ethToken"
        v-model="eventName"
        :rules="rules.eventName"
        required>
      </EventSelector>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    change: "Select another ERC20 Token"
    selectEventText: "Select the event you want to get notified. This event will be emited directly from the contract you've selected"
    labels:
      event: "Token event"
</i18n>

<script>
import { required } from '@/validators'
import withValidation from '@/mixins/withValidation'
import item from '@/mixins/item'
import collection from '@/mixins/collection'
import EventSelector from '@/components/EventSelector'
import ContractSelector from '@/components/contracts/Selector'
export default {
  components: {
    EventSelector,
    ContractSelector
  },
  mixins: [
    withValidation,
    collection('ethTokens', { pagination: true }),
    item('ethToken', x => x.contractId)
  ],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      contractId: (this.value.ethToken || {}).id || this.value.contractId,
      eventName: this.value.eventName
    }
  },
  validations: {
    eventName: {
      required
    }
  },
  computed: {
    ethTokensParams () {
      return {
        ...this.ethTokensPagination
      }
    }
  },
  watch: {
    eventName () {
      if (!this.validate()) { return this.$emit('input', null) }
      this.$emit('input', {
        contractId: this.ethToken.id,
        eventName: this.eventName
      })
    }
  }
}
</script>
