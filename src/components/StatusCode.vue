<template>
  <v-chip
    label small
    class="white--text"
    :class="{ success: !error, error: error }">
    {{ error ? $t('error') : $t('success') }}
  </v-chip>
</template>

<i18n>
  en:
    error: "Error"
    success: "Success"
</i18n>

<script>
  export default {
    props: {
      error: {
        type: Boolean,
        required: true
      }
    }
  }
</script>
