<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ signature }}
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  import abiView from '@/mixins/abiView'
  export default {
    mixins: [abiView]
  }
</script>
