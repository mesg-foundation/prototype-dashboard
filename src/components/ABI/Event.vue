<template>
  <v-list-tile>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ signature }}
      </v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn
        color="success" dark
        :to="{ name: 'NewTrigger', query }">
        {{ $t('connect') }}
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<i18n>
  en:
    connect: "Connect"
</i18n>

<script>
  import abiView from '@/mixins/abiView'
  export default {
    mixins: [abiView],
    computed: {
      query () {
        if (this.$route.name !== 'Contract') { return null }
        return {
          connector: {
            connectorType: 'ETHEREUM_CONTRACT',
            ethereumContract: {
              contractId: this.$route.params.id,
              eventName: this.value.name
            }
          }
        }
      }
    }
  }
</script>
