<template>
  <v-app>
    <template v-if="connected && currentProjectId">
      <application-menu></application-menu>
      <main>
        <v-container fluid class="pa-0">
          <router-view></router-view>
        </v-container>
      </main>
    </template>
    <template v-else>
      <FullHeightCenter class="primary">
        <router-view></router-view>
      </FullHeightCenter>
    </template>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import ApplicationMenu from '@/components/ApplicationMenu.vue'
  import FullHeightCenter from '@/components/layouts/FullHeightCenter.vue'
  export default {
    components: {
      ApplicationMenu,
      FullHeightCenter
    },
    mixins: [withCurrentProject],
    computed: mapGetters({
      connected: 'session/connected'
    })
  }
</script>

<style lang="stylus">
  @import './main'
</style>
