<template>
  <span v-if="trigger.title">{{ trigger.title }}</span>
  <span v-else>{{ defaultTitle }}</span>
</template>

<script>
export default {
  props: {
    trigger: {
      type: Object,
      required: true
    }
  },
  computed: {
    defaultTitle () {
      return [
        this.trigger.connector.connectorType,
        this.trigger.action.service.name
      ].join(' - ')
    }
  }
}
</script>
