<template>
  <v-card>
    <v-toolbar card>
      <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" router :to="{ name: 'NewProject' }">
        <v-icon class="mr-3">add_circle_outline</v-icon>
        {{ $t('create') }}
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list two-line class="scrollable">
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
  </v-card>
</template>

<i18n>
  en:
    title: "Projects"
    create: "New Project"
</i18n>

<script>
  import withCurrentProject from '@/mixins/withCurrentProject'
  export default {
    mixins: [withCurrentProject]
  }
</script>
