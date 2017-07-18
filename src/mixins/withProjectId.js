import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    projectId: 'session/currentProjectId'
  })
}
