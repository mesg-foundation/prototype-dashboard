<template>
  <div class="truncate">
    <img class="mb-4" src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png" alt="Ethereum">
    <br/>
    <span class="subheading">
      there is a transaction with <br/>
      <strong>{{ config.address }}</strong> <br/>
      on <br/>
      <strong>{{ config.chain }}</strong> <br/>
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
