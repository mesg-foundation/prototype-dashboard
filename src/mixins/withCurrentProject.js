import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentProjectId: 'session/currentProjectId',
      projects: 'projects/collection'
    }),
    currentProject () {
      return this.projects[this.currentProjectId]
    }
  }
}
