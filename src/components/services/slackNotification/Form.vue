<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title') }}
    </v-card-title>
    <v-card-text>
      <slot name="errors"></slot>
      <v-text-field
        :label="$t('labels.webhookUrl')"
        v-model="webhookUrl"
        type="url">
      </v-text-field>
      <p v-html="$t('hint')"></p>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "Slack Notification"
    create: "Create a new Webhook"
    hint: "To create a new Slack webhook you can <a href='https://my.slack.com/services/new/incoming-webhook' target='_blank'>click here</a> and when created copy your <strong>Webhook URL</strong>"
    labels:
      webhookUrl: "Enpoint"
</i18n>

<script>
  import service from '@/mixins/service'
  export default {
    mixins: [
      service
    ]
  }
</script>
