<template>
  <img :src="url" :alt="value">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 200
    }
  },
  computed: {
    url () {
      return `https://api.qrserver.com/v1/create-qr-code/?size=${this.size}x${this.size}&data=${this.value}`
    }
  }
}
</script>
