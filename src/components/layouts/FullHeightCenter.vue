<template>
  <v-layout justify-center align-center class="full-height-center">
    <v-flex xs12 sm7 md4 lg3>
      <slot></slot>
    </v-flex>
  </v-layout>
</template>

<style scoped>
  .full-height-center {
    height: 100vh;
  }
</style>
