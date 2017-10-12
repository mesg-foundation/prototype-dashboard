<template>
  <TriggerForm
    :trigger="trigger"
    @saved="triggerSaved">
  </TriggerForm>
</template>

<i18n>
  en:
    title: "New Trigger"
</i18n>

<script>
  import TriggerForm from './Form.vue'
  export default {
    components: {
      TriggerForm
    },
    metaInfo () {
      return {
        title: this.$t('title')
      }
    },
    data () {
      return {
        trigger: this.$route.query
      }
    },
    methods: {
      triggerSaved (trigger) {
        this.$router.push({ name: 'Trigger', params: { id: trigger.id } })
      }
    }
  }
</script>
