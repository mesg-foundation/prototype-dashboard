<template>
  <div class="truncate">
    <img class="mb-4" :src="ethToken.picture" alt="Ethereum">
    <br/>
    <span class="subheading">
      <strong>{{ ethToken.name }}</strong> <br/>
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
    item('ethToken', x => x.config.contractId || (x.config.contract || {}).id)
  ]
}
</script>

<style scoped>
  img {
    width: 28px;
    vertical-align: middle;
  }
</style>

