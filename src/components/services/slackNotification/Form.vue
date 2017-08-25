<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title') }}
    </v-card-title>
    <v-card-text>
      <v-text-field
        :label="$t('labels.webhookUrl')"
        v-model="webhookUrl"
        type="url">
      </v-text-field>
    </v-card-text>
    <v-btn flat href="https://my.slack.com/services/new/incoming-webhook" target="_blank">{{ $t('create') }}</v-btn>
  </v-card>
</template>

<i18n>
  en:
    title: "Slack Notification"
    create: "Create a new Webhook"
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
