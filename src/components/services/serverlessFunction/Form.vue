<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title') }}
    </v-card-title>
    <v-card-text>
      <v-text-field
        :label="$t('labels.code')"
        :hint="$t('hints.code')"
        v-model="code"
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
      code: "Let's code !!"
    labels:
      code: "Function definition"
</i18n>

<script>
  import service from '@/mixins/service'
  export default {
    mixins: [
      service
    ]
  }
</script>
