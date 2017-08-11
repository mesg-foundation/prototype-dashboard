<template>
  <v-chip
    label small
    class="white--text"
    :class="{ success, error, warning }">
    {{ code }}
  </v-chip>
</template>

<script>
  export default {
    props: {
      code: {
        type: Number,
        required: true
      }
    },
    computed: {
      success () { return this.code < 300 },
      warning () { return this.code >= 300 && this.code < 400 },
      error () { return this.code >= 400 || isNaN(parseInt(this.code, 10)) }
    }
  }
</script>
