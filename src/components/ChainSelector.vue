<template>
  <v-select
    :label="label"
    :items="chains"
    :required="required"
    :error-messages="errorMessages"
    :input="chain"
    @input="e => $emit('input', e)"
    item-text="name"
    item-value="key"
    autocomplete>
  </v-select>
</template>

<script>
  import input from '@/mixins/input'
  export default {
    mixins: [input],
    props: {
      chains: {
        type: Array,
        default: () => process.env.CHAINS
      }
    },
    data () {
      return {
        chain: this.input
      }
    }
  }
</script>
