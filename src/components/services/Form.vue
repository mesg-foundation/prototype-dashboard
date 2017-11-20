<template>
  <component
    v-bind="$attrs"
    :is="component"
    :schema="service.data"
    :value="value"
    @input="x => $emit('input', x)">
  </component>
</template>

<script>
import VuetifySchemaForm from '@/components/jsonSchemaForm/VuetifySchemaForm'
import EthereumContract from '@/components/services/advanced/EthereumContract'
export default {
  props: {
    service: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    component () {
      return {
        EthereumContract
      }[this.service.key] || VuetifySchemaForm
    }
  }
}
</script>
