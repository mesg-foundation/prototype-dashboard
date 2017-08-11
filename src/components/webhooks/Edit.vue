<template>
  <WebhookForm
    :webhook="webhook"
    :contract="webhook.contract"
    :title="$t('title')"
    @saved="webhookSaved">
  </WebhookForm>
</template>

<i18n>
  en:
    title: "Edit webhook"
</i18n>

<script>
  import item from '@/mixins/item'
  import WebhookForm from '@/components/webhooks/Form.vue'
  export default {
    components: {
      WebhookForm
    },
    mixins: [
      item('webhook')
    ],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    methods: {
      webhookSaved (webhook) {
        this.$router.push({ name: 'Webhook', params: { id: webhook.id } })
      }
    }
  }
</script>
