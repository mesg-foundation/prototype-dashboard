<template>
  <v-card flat>
    <v-card-text>
      <ChainSelector
        v-model="chain"
        @input="emit"
        :rules="rules.chain"
        :label="$t('labels.chain')">
      </ChainSelector>
      <v-select
        v-model="matchType"
        :items="matchTypes"
        :rules="rules.matchType"
        @input="emit"
        :label="$t('labels.matchType')">
      </v-select>
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
      matchType: "Filter on the address"
      address: "Address you want to listen for transactions"
    matchTypes:
      ANY: "Receiver or sender"
      FROM: "Sender"
      TO: "Receiver"
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
      chain: this.value.chain,
      matchType: this.value.matchType
    }
  },
  computed: {
    matchTypes () {
      return ['ANY', 'FROM', 'TO']
        .map(value => ({
          value,
          text: this.$t(`matchTypes.${value}`)
        }))
    }
  },
  validations: {
    chain: {
      required
    },
    address: {
      required,
      minLength: minLength(process.env.CONTRACT_ADDRESS_LENGTH),
      maxLength: maxLength(process.env.CONTRACT_ADDRESS_LENGTH)
    }
  },
  methods: {
    emit () {
      if (!this.validate()) { return this.$emit('input', null) }
      this.$emit('input', {
        chain: this.chain,
        address: this.address,
        matchType: this.matchType
      })
    }
  }
}
</script>
