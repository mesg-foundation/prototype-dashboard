<template>
  <v-list>
    <v-subheader class="grey--text">{{ $t('projects') }}</v-subheader>
    <v-list-tile
      router
      :to="{ name: 'NewProject' }">
      <v-list-tile-action>
        <v-icon dark>add_circle_outline</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ $t('create') }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile
      v-for="project in projects" :key="project.id"
      :class="{ 'active': project.id === currentProjectId }"
      @click.stop="changeProject({ project })">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ project.name }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<i18n>
  en:
    create: "New Project"
    projects: "PROJECTS"
</i18n>

<script>
  import withCurrentProject from '@/mixins/withCurrentProject'
  export default {
    mixins: [withCurrentProject]
  }
</script>
