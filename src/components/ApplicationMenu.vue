<template>
  <v-navigation-drawer permanent dark>
    <v-list class="pa-1">
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img class="primary" src="/static/img/logo-light.svg">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ currentProject.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon dark @click.native.stop="showProjects = !showProjects">
            <v-icon v-if="showProjects">arrow_drop_up</v-icon>
            <v-icon v-else>arrow_drop_down</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <div v-if="showProjects">
      <v-list>
        <v-subheader class="grey--text">{{ $t('projects') }}</v-subheader>
        <v-list-tile
          v-for="project in projects" :key="project.id">
          <v-list-tile-content>
            <v-list-tile-title>{{ project.name }}</v-list-tile-title>
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
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<i18n>
  en:
    projects: "Projects"
    menu:
      webhooks: "Webhooks"
      contracts: "Contracts"
</i18n>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        showProjects: false
      }
    },
    computed: {
      ...mapGetters({
        projects: 'projects/collection',
        currentProject: 'session/currentProject'
      }),
      items () {
        return [
          { key: 'webhooks', to: { name: 'Webhooks' }, icon: 'http' },
          { key: 'contracts', to: { name: 'Contracts' }, icon: 'functions' }
        ].map(e => ({
          ...e,
          title: this.$t(`menu.${e.key}`)
        }))
      }
    }
  }
</script>

<style scoped>
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
