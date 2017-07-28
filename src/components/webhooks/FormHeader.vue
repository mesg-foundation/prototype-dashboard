<template>
  <v-toolbar card class="secondary">
    <v-toolbar-title class="headline">
      {{ webhook.id ? $t('update') : $t('title') }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-switch
        class="mr-3"
        v-if="webhook.id"
        v-model="enable">
      </v-switch>
    </v-toolbar-items>
  </v-toolbar>
</template>

<i18n>
  en:
    title: "Create a webhook"
    update: "Update webhook"
</i18n>

<script>
  export default {
    props: {
      webhook: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        enable: this.webhook.enable
      }
    }
  }
</script>
