<template>
  <v-card flat>
    <v-card-text>
      <ChainSelector
        v-model="chain"
        @input="emit"
        :rules="rules.chain"
        :label="$t('labels.chain')">
      </ChainSelector>
      <v-text-field
        v-model="address"
        :rules="rules.address"
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
import { required, minLength, maxLength } from '@/validators'
import withValidation from '@/mixins/withValidation'
import ChainSelector from '@/components/ChainSelector'
export default {
  components: {
    ChainSelector
  },
  mixins: [
    withValidation
  ],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      address: this.value.address,
      chain: this.value.chain
    }
  },
  validations: {
    chain: {
      required
    },
    address: {
      required,
      minLength: minLength(42),
      maxLength: maxLength(42)
    }
  },
  methods: {
    emit () {
      if (!this.validate()) { return this.$emit('input', null) }
      this.$emit('input', {
        chain: this.chain,
        address: this.address
      })
    }
  }
}
</script>
