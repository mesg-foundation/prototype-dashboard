<template>
  <TriggerForm
    :trigger="trigger"
    :contract="trigger.contract"
    :title="$t('title')"
    @saved="triggerSaved">
  </TriggerForm>
</template>

<i18n>
  en:
    title: "Edit trigger"
</i18n>

<script>
  import item from '@/mixins/item'
  import TriggerForm from '@/components/triggers/Form.vue'
  export default {
    components: {
      TriggerForm
    },
    mixins: [
      item('trigger')
    ],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    methods: {
      triggerSaved (trigger) {
        this.$router.push({ name: 'Trigger', params: { id: trigger.id } })
      }
    }
  }
</script>
