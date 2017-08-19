import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentProjectId: 'session/currentProjectId',
      projects: 'projects/collection'
    }),
    currentProject () {
      return this.projects[this.currentProjectId]
    }
  },
  methods: mapActions({
    changeProject: 'session/changeProject'
  })
}
