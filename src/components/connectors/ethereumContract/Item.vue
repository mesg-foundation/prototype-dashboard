<template>
  <div class="truncate">
    <img class="mb-4" src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png" alt="Ethereum">
    <br/>
    <span class="subheading">
      Contract <strong>{{ config.contract.name }}</strong> <br/>
      emits <strong>{{ config.eventName }}</strong>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
  img {
    width: 3em;
    vertical-align: middle;
  }
</style>

