<template>
  <ProjectForm
    @saved="projectSaved">
  </ProjectForm>
</template>

<i18n>
  en:
    title: "Create a project"
</i18n>

<script>
  import { mapActions } from 'vuex'
  import ProjectForm from '@/components/projects/Form.vue'
  export default {
    components: {
      ProjectForm
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    methods: {
      ...mapActions({
        changeProject: 'session/changeProject'
      }),
      projectSaved (project) {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>
