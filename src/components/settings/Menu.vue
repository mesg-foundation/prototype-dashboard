<template>
  <v-card flat>
    <v-toolbar card>
      <MenuToggle></MenuToggle>
      <v-toolbar-title class="headline">
        {{ $t('title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-tabs light v-model="activeTab">
      <v-tabs-bar class="secondary" slot="activators">
        <v-tabs-item
          v-for="tab in tabs" :key="tab"
          :to="tab.to"
          ripple>
          {{ tab.title }}
        </v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
    </v-tabs>
    <v-divider></v-divider>
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
  import MenuToggle from '@/components/MenuToggle'
  const TABS = [
    'general',
    'team',
    'billing'
  ]
  export default {
    components: {
      MenuToggle
    },
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
