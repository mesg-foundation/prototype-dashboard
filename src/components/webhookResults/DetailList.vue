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
    address: "Contract address"
    endpoint: "Endpoint"
    chain: "Blockchain"
</i18n>

<script>
  export default {
    props: {
      webhook: {
        type: Object,
        required: true
      }
    },
    computed: {
      items () {
        return [
          { key: this.$t('address'), value: this.webhook.contract.address },
          { key: this.$t('chain'), value: this.webhook.contract.chain },
          { key: this.$t('endpoint'), value: this.webhook.endpoint }
        ]
      }
    }
  }
</script>
