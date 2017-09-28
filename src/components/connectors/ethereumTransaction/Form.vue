<template>
  <v-card flat>
    <v-card-text>
      <ChainSelector
        v-model="chain"
        @input="emit"
        :label="$t('labels.chain')">
      </ChainSelector>
      <v-text-field
        v-model="address"
        @input="emit"
        :label="$t('labels.address')">
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    labels:
      chain: "Select the blockchain you want to connect to"
      address: "Address you want to listen for transactions"
</i18n>

<script>
import ChainSelector from '@/components/ChainSelector'
export default {
  components: {
    ChainSelector
  },
  data () {
    return {
      address: null,
      chain: null
    }
  },
  methods: {
    emit () {
      this.$emit('input', {
        chain: this.chain,
        address: this.address
      })
    }
  }
}
</script>
