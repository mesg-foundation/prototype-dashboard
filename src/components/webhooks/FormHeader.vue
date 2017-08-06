<template>
  <v-toolbar card class="secondary">
    <v-toolbar-title class="headline">
      {{ webhook ? $t('update') : $t('title') }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="webhook">
      <v-switch
        class="mr-3"
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
  import { mapActions } from 'vuex'
  export default {
    props: {
      webhook: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        enable: this.webhook ? this.webhook.enable : false
      }
    },
    watch: {
      enable () {
        if (!this.webhook) { return }
        this.updateWebhook({
          id: this.webhook.id,
          enable: this.enable
        })
      }
    },
    methods: mapActions({
      updateWebhook: 'webhooks/update'
    })
  }
</script>
