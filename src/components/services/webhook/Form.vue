<template>
  <v-card flat>
    <v-card-title class="headline">
      {{ $t('title') }}
    </v-card-title>
    <v-card-text>
      <slot name="errors"></slot>
      <v-text-field
        :label="$t('labels.endpoint')"
        :hint="$t('hints.endpoint')"
        v-model="endpoint"
        type="url">
      </v-text-field>
      <v-select
        :label="$t('labels.method')"
        :items="methodValues"
        persistent-hint
        :hint="method === 'GET' ? $t('hints.get') : ''"
        v-model="method">
      </v-select>
      <div>
        <v-list two-line subheader>
          <v-subheader>{{ $t('labels.headers') }}</v-subheader>
          <v-list-tile v-for="(value, key) in headers" :key="key">
            <v-list-tile-content>
              <v-list-tile-title>{{ key }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ value }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn @click="removeHeader(key)" icon ripple>
                <v-icon class="grey--text text--lighten-1">close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-dialog v-model="headerDialog">
          <v-btn slot="activator">
            <v-icon>add</v-icon>
            {{ $t('addHeader') }}
          </v-btn>
          <v-card>
            <v-card-title class="subheading secondary">
              {{ $t('addHeader') }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                :label="$t('labels.key')"
                :hint="$t('hints.key')"
                v-model="currentHeader.key">
              </v-text-field>
              <v-text-field
                :label="$t('labels.value')"
                v-model="currentHeader.value">
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn primary block @click="addHeader">{{ $t('addHeader') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-text>
  </v-card>
</template>

<i18n>
  en:
    title: "Webhook informations"
    addHeader: "Add a custom header"
    hints:
      endpoint: "You can use http://webhook.site/ to test your webhook"
      get: "Hum... you really have a webhook with a GET request... concider using POST method instead, but don't worry we will still execute the webhook"
      key: "By convention this should start with X-"
    labels:
      endpoint: "Enpoint"
      method: "HTTP Method"
      headers: "Custom headers"
      key: "Header key"
      value: "Header value"
</i18n>

<script>
  import service from '@/mixins/service'
  export default {
    mixins: [
      service
    ],
    data () {
      return {
        headerDialog: false,
        currentHeader: {
          key: null,
          value: null
        }
      }
    },
    computed: {
      methodValues () {
        return this.service.data
          .find(x => x.name === 'method')
          .values
      }
    },
    methods: {
      addHeader () {
        this.headers = {
          ...this.headers,
          [this.currentHeader.key]: this.currentHeader.value
        }
        this.currentHeader = {
          key: null,
          value: null
        }
        this.headerDialog = false
      },
      removeHeader (key) {
        const newHeaders = { ...this.headers }
        delete newHeaders[key]
        this.headers = newHeaders
      }
    }
  }
</script>
