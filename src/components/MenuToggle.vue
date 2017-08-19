<template>
  <v-toolbar-side-icon
    class="hidden-md-and-up"
    light
    @click.stop="updateMenu(true)">
  </v-toolbar-side-icon>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    methods: mapMutations({
      updateMenu: 'updateMenu'
    })
  }
</script>
