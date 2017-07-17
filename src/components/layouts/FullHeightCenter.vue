<template>
  <v-layout justify-center align-center class="full-height-center">
    <v-flex xs12 md6 lg4>
      <slot></slot>
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .full-height-center {
    height: 100vh;
  }
</style>
