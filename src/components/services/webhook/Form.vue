<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title') }}
    </v-card-title>
    <v-card-text>
      <v-text-field
        :label="$t('label.endpoint')"
        :hint="$t('hints.endpoint')"
        v-model="endpoint"
        type="url">
      </v-text-field>
      <v-select
        :label="$t('label.method')"
        :items="methodValues"
        persistent-hint
        :hint="method === 'GET' && $t('hints.get')"
        v-model="method">
      </v-select>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "Webhook informations"
    hints:
      endpoint: "You can use http://webhook.site/ to test your webhook"
      get: "Hum... you really have a webhook with a GET request... concider using POST method instead, but don't worry we will still execute the webhook"
    label:
      endpoint: "Enpoint"
      method: "HTTP Method"
</i18n>

<script>
  import service from '@/mixins/service'
  export default {
    mixins: [
      service
    ],
    computed: {
      methodValues () {
        return this.service.data
          .find(x => x.name === 'method')
          .values
      }
    }
  }
</script>
