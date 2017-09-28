<template>
  <TriggerForm
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
        contract: null
      }
    },
    methods: {
      triggerSaved (trigger) {
        this.$router.push({ name: 'Trigger', params: { id: trigger.id } })
      }
    }
  }
</script>
