<template>
  <v-navigation-drawer
    persistent enable-resize-watcher
    :value="menu"
    @input="value => updateMenu(value)"
    dark
    :class="{ 'alternate': showProjects }">
    <v-list class="pa-1 header">
      <v-list-tile avatar tag="div" v-if="currentProject">
        <v-list-tile-avatar>
          <img class="blue darken-2" src="/static/img/logo-light.svg">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ currentProject.name }}
          </v-list-tile-title>
          <v-list-tile-sub-title :class="{ 'grey--text': !showProjects }">
            <v-icon :class="{ 'grey--text': !showProjects }">supervisor_account</v-icon>
            <span class="caption">
              {{ currentProject._usersMeta.count }}
              {{ $t('members') }}
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon dark @click.native.stop="showProjects = !showProjects">
            <v-icon v-if="showProjects">arrow_drop_up</v-icon>
            <v-icon v-else>arrow_drop_down</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile
        router :to="{ name: 'Settings' }"
        v-if="showProjects">
        <v-list-tile-action>
          <v-icon dark>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ $t('settings') }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <div v-if="showProjects">
      <v-list>
        <v-subheader class="grey--text">{{ $t('projects') }}</v-subheader>
        <v-list-tile
          v-for="project in projects" :key="project.id"
          :class="{ 'active': project.id === currentProjectId }">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ project.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div v-else>
      <v-list>
        <v-list-tile
          v-for="item in items" :key="item.key"
          router :to="item.to">
          <v-list-tile-action>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content v-ripple="{ class: 'primary--text' }">
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="item.count">
            {{ item.count }}
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<i18n>
  en:
    projects: "Projects"
    members: "Members"
    settings: "Settings"
    menu:
      webhooks: "Webhooks"
      contracts: "Contracts"
</i18n>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import withCurrentProject from '@/mixins/withCurrentProject'
  export default {
    mixins: [withCurrentProject],
    data () {
      return {
        showProjects: false
      }
    },
    computed: {
      ...mapGetters({
        menu: 'menu'
      }),
      items () {
        return [
          { key: 'contracts', to: { name: 'Contracts' }, icon: 'functions', count: this.currentProject._contractsMeta.count },
          { key: 'webhooks', to: { name: 'Webhooks' }, icon: 'http', count: this.currentProject._webhooksMeta.count }
        ].map(e => ({
          ...e,
          title: this.$t(`menu.${e.key}`)
        }))
      }
    },
    methods: mapMutations({
      updateMenu: 'updateMenu'
    })
  }
</script>

<style lang="stylus" scoped>
  @import "../variables"

  img {
    position: fixed;
    top: 0;
    left: 0;
    height: 64px;
    width: 64px;
    border-radius: 0;
  }
  .subheader {
    text-transform: uppercase;
  }
</style>

<style lang="stylus">
  @import "../variables"

  .navigation-drawer .list__tile {
    position: relative;

    &::before {
      transition: width 300ms;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 0px;
    }
  }

  .application .navigation-drawer .list.header {
    background: $material-dark.app-bar;
  }

  .navigation-drawer:not(.alternate) .list__tile--active {
    background-color: $material-dark.app-bar;

    &::before  {
      width: 6px;
      background-color: $theme.primary;
    }
  }
  .navigation-drawer li.active > .list__tile::before {
    width: 6px;
    background-color: white;
  }

  .application .theme--dark.navigation-drawer.alternate {
    &, .list, .divider {
      background-color: $blue.darken-3;
    }
    .header {
      background-color: $blue.darken-2;
    }
  }
</style>

