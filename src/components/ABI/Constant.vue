<template>
  <v-card flat class="grey lighten-4">
    <v-toolbar card>
      <v-toolbar-title class="heading">
        {{ value.name }}
      </v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        required: true
      }
    }
  }
</script>
