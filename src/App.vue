<template>
  <v-app>
    <application-menu v-if="connected"></application-menu>
    <main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ApplicationMenu from '@/components/ApplicationMenu.vue'
  export default {
    components: {
      ApplicationMenu
    },
    computed: mapGetters({
      connected: 'session/connected'
    })
  }
</script>

<style lang="stylus">
  @import './main'
</style>
