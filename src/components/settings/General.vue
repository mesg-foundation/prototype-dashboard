<template>
  <v-layout column>
    <v-card flat>
      <v-toolbar card class="transparent">
        <v-toolbar-title class="headline">
          {{ $t('title') }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          :label="$t('labels.name')"
          :value="currentProject.name"
          @input="x => name = x">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.stop="save()">
          {{ $t('save') }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card flat>
      <v-card-title class="headline">
        {{ $t('delete') }}
      </v-card-title>
      <v-card-text>
        <p>{{ $t('warning') }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click.stop="deleteProjectWithConfirmation">{{ $t('deleteAction') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<i18n>
  en:
    title: "General settings"
    delete: "Delete this project"
    warning: "Every data of this project will be lost"
    deleteAction: "Delete project"
    sure: "Are you sure to want to delete this project ?"
    save: "Save"
    admin: "Administrator: "
    cannot: "You cannot delete this project"
    labels:
      name: "Project name"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import withCurrentProject from '@/mixins/withCurrentProject'
  export default {
    mixins: [withCurrentProject],
    data () {
      return {
        name: null
      }
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    methods: {
      ...mapActions({
        updateProject: 'projects/update',
        deleteProject: 'projects/delete'
      }),
      save () {
        this.updateProject({ variables: {
          id: this.currentProjectId,
          name: this.name || this.currentProject.name
        }})
      },
      deleteProjectWithConfirmation () {
        if (!confirm(this.$t('sure'))) { return }
        if (Object.keys(this.projects).length <= 1) {
          alert(this.$t('cannot'))
          return
        }
        this.deleteProject({ variables: {
          id: this.currentProjectId
        }})
          .then(() => this.$router.push({ path: '/' }))
      }
    }
  }
</script>
