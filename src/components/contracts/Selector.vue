<template>
  <v-list v-if="contracts.length" two-line>
    <v-list-tile
      v-for="contract in contracts" :key="contract.id"
      @click.stop="submit(contract)">
      <v-list-tile-avatar v-if="contract.picture" class="contract-image">
        <img :src="contract.picture">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ contract.name }}
          <span class="caption" v-if="!blockchainHidden"> - {{ contract.chain }}</span>
        </v-list-tile-title>
        <v-list-tile-sub-title>
          {{ contract.description || contract.address }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
  <v-layout v-else column fill-height justify-center align-center>
    <p class="mt-3">{{ $t('noContract') }}</p>
    <v-btn
      outline
      color="primary"
      router :to="{ name: 'NewContract' }">
      {{ $t('action') }}
    </v-btn>
  </v-layout>
</template>

<i18n>
  en:
    noContract: "You have no contracts yet"
    action: "Create a contract"
</i18n>

<script>
  export default {
    props: {
      contracts: {
        type: Array,
        required: true
      },
      blockchainHidden: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        contractId: null
      }
    },
    methods: {
      submit (contract) {
        this.$emit('selected', contract)
      }
    }
  }
</script>

<style scoped>
  .contract-image {
    width: 28px!important;
    height: 28px!important;
    justify-content: center;
  }
</style>
