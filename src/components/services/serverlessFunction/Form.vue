<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title') }}
    </v-card-title>
    <v-card-text>
      <v-text-field
        :label="$t('labels.body')"
        :hint="$t('hints.body')"
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
    title: "Serverless function"
    hints:
      body: "Let's code !!"
    labels:
      body: "Function definition"
</i18n>

<script>
  import service from '@/mixins/service'
  export default {
    mixins: [
      service
    ]
  }
</script>
