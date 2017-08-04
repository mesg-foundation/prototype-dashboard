<template>
  <span>{{ $n(price, currency) }}</span>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        default: 'USD'
      }
    },
    computed: {
      price () { return this.value / 100 }
    }
  }
</script>
