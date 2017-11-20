<template>
  <div class="truncate">
    <img class="mb-4" src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png" alt="Ethereum">
    <br/>
    <span class="subheading" v-if="contract">
      Contract <strong>{{ contract.name }}</strong> <br/>
      emits <strong>{{ config.eventName }}</strong>
    </span>
  </div>
</template>

<script>
import item from '@/mixins/item'
export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  mixins: [
    item('contract', x => x.config.contractId || (x.config.contract || {}).id)
  ]
}
</script>

<style scoped>
  img {
    width: 3em;
    vertical-align: middle;
  }
</style>

