<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title') }}
    </v-card-title>
    <v-card-text>
      <slot name="errors"></slot>
      <CodeEditor
        :title="$t('labels.code')"
        :rules="rules.code"
        v-model="code">
      </CodeEditor>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "Serverless function"
    labels:
      code: "Code to execute"
</i18n>

<script>
  import service from '@/mixins/service'
  import CodeEditor from '@/components/CodeEditor'
  export default {
    components: {
      CodeEditor
    },
    mixins: [
      service
    ]
  }
</script>
