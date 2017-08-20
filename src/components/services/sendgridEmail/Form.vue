<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title') }}
    </v-card-title>
    <v-card-text>
      <v-text-field
        :label="$t('labels.secret')"
        :hint="$t('hints.secret')"
        persistent-hint
        v-model="secret"
        single-line
        type="password">
      </v-text-field>
      <v-text-field
        :label="$t('labels.from')"
        :hint="$t('hints.email')"
        v-model="from"
        type="email">
      </v-text-field>
      <v-text-field
        :label="$t('labels.to')"
        :hint="$t('hints.email')"
        v-model="to"
        type="email">
      </v-text-field>
      <v-text-field
        :label="$t('labels.subject')"
        :hint="$t('hints.content')"
        v-model="subject"
        type="text">
      </v-text-field>
      <v-text-field
        :label="$t('labels.body')"
        :hint="$t('hints.content')"
        v-model="body"
        multi-line
        auto-grow
        textarea>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "Sendgrid informations"
    hints:
      email: "You can bind some data from your contract event like &laquo;{{ userEmail }}&raquo;"
      content: "You can bind some data from your contract event like &laquo;Hello {{ userName }}&raquo;"
      secret: "You can create a new secret here > https://app.sendgrid.com/settings/api_keys"
    labels:
      secret: "Sendgrid secret"
      from: "Email of the sender"
      to: "Email of the receiver"
      subject: "Subject"
      body: "Email body"
</i18n>

<script>
  import service from '@/mixins/service'
  export default {
    mixins: [
      service
    ]
  }
</script>
