<template>
  <v-layout justify-center align-center>
    <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
  </v-layout>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('session/logout')
    this.$router.go('/')
  }
}
</script>

