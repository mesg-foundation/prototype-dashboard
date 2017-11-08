<template>
  <v-app>
    <template v-if="connected && currentProjectId && currentUser.betaUser">
      <application-menu></application-menu>
      <main>
        <v-content>
          <v-container fill-height fluid class="pa-0">
            <router-view></router-view>
          </v-container>
        </v-content>
      </main>
    </template>
    <template v-else>
      <FullHeightCenter class="full-page">
        <router-view></router-view>
      </FullHeightCenter>
    </template>
    <v-tooltip left>
      <v-btn fab fixed bottom right
        slot="activator"
        target="_blank" href="mailto:incoming+etherstellar/support@gitlab.com">
        <v-icon>mail_outline</v-icon>
      </v-btn>
      <span>{{ $t('contact') }}</span>
    </v-tooltip>
  </v-app>
</template>

<i18n>
  en:
    contact: "Contact us / Report a bug"
</i18n>

<script>
  import { mapGetters } from 'vuex'
  import withCurrentProject from '@/mixins/withCurrentProject'
  import ApplicationMenu from '@/components/menu/Application.vue'
  import FullHeightCenter from '@/components/layouts/FullHeightCenter.vue'
  export default {
    components: {
      ApplicationMenu,
      FullHeightCenter
    },
    mixins: [withCurrentProject],
    metaInfo () {
      return {
        titleTemplate: '%s - Etherstellar'
      }
    },
    computed: mapGetters({
      connected: 'session/connected',
      currentUser: 'session/currentUser'
    })
  }
</script>

<style lang="stylus">
  @import './main'

  .full-page {
    background-color: $material-dark.cards;
  }
</style>
