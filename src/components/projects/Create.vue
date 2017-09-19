<template>
  <ProjectForm></ProjectForm>
</template>

<i18n>
  en:
    title: "Create a project"
</i18n>

<script>
  import ProjectForm from '@/components/projects/Form.vue'
  export default {
    components: {
      ProjectForm
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    }
  }
</script>
