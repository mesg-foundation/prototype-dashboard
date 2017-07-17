<template>
  <v-app>
    <application-menu></application-menu>
    <main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import ApplicationMenu from '@/components/ApplicationMenu.vue'
  export default {
    components: {
      ApplicationMenu
    }
  }
</script>

<style lang="stylus">
  @import './main'
</style>
