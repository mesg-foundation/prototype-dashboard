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
        type: String,
        required: true
      }
    },
    computed: {
      httpSucceed () { return !isNaN(parseInt(this.code, 10)) },
      success () { return this.httpSucceed && this.code < 300 },
      warning () { return this.httpSucceed && this.code >= 300 && this.code < 400 },
      error () { return !this.httpSucceed || this.code >= 400 }
    }
  }
</script>
