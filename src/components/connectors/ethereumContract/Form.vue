<template>
  <div>
    <ContractSelector
      class="mt-3 mb-3"
      @selected="contractSelected">
    </ContractSelector>

    <v-card ref="event" flat height="450px" class="mt-5">
      <template v-if="contract">
        <p>{{ $t('selectEventText') }}</p>
        <EventSelector
          v-if="contract"
          :label="$t('labels.event')"
          :contract="contract"
          v-model="eventName"
          required>
        </EventSelector>
      </template>
    </v-card>
  </div>
</template>

<i18n>
  en:
    selectEventText: "Select the event you want to get notified. This event will be emited directly from the contract you've selected"
    labels:
      event: "Contract's event"
</i18n>

<script>
import EventSelector from '@/components/EventSelector.vue'
import ContractSelector from '@/components/contracts/Selector.vue'
export default {
  components: {
    EventSelector,
    ContractSelector
  },
  data () {
    return {
      contract: null,
      eventName: null,
      eventCard: null
    }
  },
  methods: {
    contractSelected (contract) { this.contract = contract },
    emit () {
      this.$emit('input', {
        contractId: (this.contract || {}).id,
        eventName: this.eventName
      })
    }
  },
  watch: {
    contract () {
      this.emit()
      this.$refs.event.scrollIntoView()
    },
    eventName () { this.emit() }
  }
}
</script>
