<template>
  <v-card flat>
    <v-toolbar card>
      <v-toolbar-title class="headline">
        {{ $t('title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-tabs light v-model="activeTab">
      <v-tabs-bar class="secondary" slot="activators">
        <v-tabs-item
          v-for="tab in tabs" :key="tab"
          router
          :to="tab.to"
          ripple>
          {{ tab.title }}
        </v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
    </v-tabs>
    <router-view></router-view>
  </v-card>
</template>

<i18n>
  en:
    title: "Settings"
    tabs:
      general: "General"
      team: "Team"
      billing: "Billing"
</i18n>

<script>
  import Utils from '@/utils'
  const TABS = [
    'general',
    'team',
    'billing'
  ]
  export default {
    props: {
      tab: {
        type: String,
        default: TABS[0]
      }
    },
    data () {
      return {
        activeTab: this.tab
      }
    },
    computed: {
      tabs () {
        return TABS
          .map(key => ({
            key,
            title: this.$t(`tabs.${key}`),
            to: { name: `Settings${Utils.toHuman(key)}` }
          }))
      }
    }
  }
</script>
