<template>
  <v-list>
    <v-list-tile v-for="(item, i) in items" :key="i">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ item.key }}
        </v-list-tile-title>
        <v-list-tile-sub-title class="grey--text">
          {{ item.value }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<i18n>
  en:
    title: "Title"
    description: "Description"
    connector: "Connector"
    service: "Service"
    connectorType:
      ETHEREUM_CONTRACT: "Ethereum Contract"
      ETHEREUM_TRANSACTION: "Ethereum Transaction"
      ETHEREUM_TOKEN: "ERC20 Token"
</i18n>

<script>
  export default {
    props: {
      trigger: {
        type: Object,
        required: true
      }
    },
    computed: {
      items () {
        return [
          { key: this.$t('title'), value: this.trigger.title },
          { key: this.$t('description'), value: this.trigger.description },
          { key: this.$t('connector'), value: this.$t(`connectorType.${this.trigger.connector.connectorType}`) },
          { key: this.$t('service'), value: this.trigger.action.service.name }
        ]
      }
    }
  }
</script>
