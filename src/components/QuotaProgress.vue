<template>
  <v-progress-circular
    :size="20"
    :width="4"
    :rotate="-90"
    :value="value"
    :class="state">
  </v-progress-circular>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        default: 0
      },
      warningLimit: {
        type: Number,
        default: 50
      },
      criticalLimit: {
        type: Number,
        default: 85
      }
    },
    computed: {
      state () {
        if (this.value < this.warningLimit) { return 'success--text' }
        if (this.value < this.criticalLimit) { return 'warning--text' }
        return 'error--text'
      }
    }
  }
</script>
