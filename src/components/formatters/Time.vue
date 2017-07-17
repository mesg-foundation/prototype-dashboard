<template>
  <time>{{ $d(date, format) }}</time>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Date],
        required: true
      },
      format: {
        type: String,
        default: 'long'
      }
    },
    computed: {
      date () {
        return new Date(this.value)
      }
    }
  }
</script>
