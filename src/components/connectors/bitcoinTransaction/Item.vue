<template>
  <div class="truncate">
    <img class="mb-4" src="https://bitcoin.org/img/icons/opengraph.png" alt="Bitcoin">
    <br/>
    <span class="subheading">
      <strong>{{ config.address }}</strong> <br/>
      receive a transaction on <br/>
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
