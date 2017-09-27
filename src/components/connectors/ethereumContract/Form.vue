<template>
  <div>
    <ContractSelector
      v-if="!contract"
      @selected="x => contract = x">
    </ContractSelector>

    <v-card flat v-else>
      <v-card-text>
        <p>{{ $t('selectEventText') }}</p>
        <EventSelector
          v-if="contract"
          :label="$t('labels.event')"
          :contract="contract"
          v-model="eventName"
          required>
        </EventSelector>
        <v-btn flat @click.stop="contract = null">
          {{ $t('change') }}
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<i18n>
  en:
    change: "Change contract"
    selectEventText: "Select the event you want to get notified. This event will be emited directly from the contract you've selected"
    labels:
      event: "Contract's event"
</i18n>

<script>
import EventSelector from '@/components/EventSelector'
import ContractSelector from '@/components/contracts/Selector'
export default {
  components: {
    EventSelector,
    ContractSelector
  },
  data () {
    return {
      contract: null,
      eventName: null
    }
  },
  watch: {
    eventName () {
      this.$emit('input', {
        contractId: this.contract.id,
        eventName: this.eventName
      })
    }
  }
}
</script>
