<template>
  <v-layout column>
    <div>
      <v-toolbar card>
        <MenuToggle></MenuToggle>
        <v-toolbar-title class="headline">
          {{ $t('title') }}
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
    </div>
    <div class="full-content-height scrollable">
      <v-tabs light v-model="activeTab">
        <v-tabs-bar class="secondary">
          <v-tabs-item
            v-for="tab in tabs" :key="tab.key"
            :to="tab.to"
            ripple>
            {{ tab.title }}
          </v-tabs-item>
          <v-tabs-slider></v-tabs-slider>
        </v-tabs-bar>
      </v-tabs>
      <v-divider></v-divider>
      <router-view></router-view>
    </div>
  </v-layout>
</template>

<i18n>
  en:
    title: "Settings"
    tabs:
      general: "General"
      address: "Addresses"
      team: "Team"
      billing: "Billing"
</i18n>

<script>
  import Utils from '@/utils'
  import MenuToggle from '@/components/MenuToggle'
  const TABS = [
    'general',
    'address',
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
