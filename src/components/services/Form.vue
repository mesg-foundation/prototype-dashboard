<template>
  <VuetifySchemaForm
    :schema="service.data"
    :value="value"
    @input="x => $emit('input', x)">
  </VuetifySchemaForm>
</template>

<script>
import VuetifySchemaForm from '@/components/jsonSchemaForm/VuetifySchemaForm'
export default {
  components: {
    VuetifySchemaForm
  },
  props: {
    service: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
