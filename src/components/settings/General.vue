<template>
  <div>
    <v-card flat>
      <v-toolbar card class="transparent">
        <v-toolbar-title class="headline">
          {{ $t('title') }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <label>
          {{ $t('admin') }}
          {{ currentProject.creator.email }}
        </label>

        <v-text-field
          :label="$t('labels.name')"
          :value="currentProject.name"
          @input="x => name = x">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn primary @click.native.stop="save()">
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
        <v-btn @click.native.stop="deleteProject()" error>{{ $t('deleteAction') }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
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
    methods: {
      ...mapActions({
        updateProject: 'projects/update'
      }),
      save () {
        this.updateProject({
          id: this.currentProjectId,
          name: this.name || this.currentProject.name
        })
      },
      deleteProject () {
        if (!confirm(this.$t('sure'))) { return }
        // TODO
        alert('You cannot yet delete a project, this is comming soon, but you can stay with us :)')
      }
    }
  }
</script>
