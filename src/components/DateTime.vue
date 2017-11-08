<template>
  <v-tooltip top>
    <span v-if="advanced" slot="activator">{{ date.toLocaleString() }}</span>
    <timeago v-else slot="activator" :since="date" :auto-update="10"></timeago>
    <span>{{ date.toGMTString() }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    value: {
      type: [Date, String, Number],
      required: true
    },
    advanced: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    date () {
      return new Date(this.value)
    }
  }
}
</script>
