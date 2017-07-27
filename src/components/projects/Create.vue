<template>
  <ProjectForm
    @saved="projectSaved">
  </ProjectForm>
</template>

<script>
  import { mapActions } from 'vuex'
  import ProjectForm from '@/components/projects/Form.vue'
  export default {
    components: {
      ProjectForm
    },
    methods: {
      ...mapActions({
        changeProject: 'session/changeProject'
      }),
      projectSaved (project) {
        // this.changeProject({ project })
        // .then(_ => {
        //   this.$router.push({ name: 'Webhooks' })
        // })
      }
    }
  }
</script>
