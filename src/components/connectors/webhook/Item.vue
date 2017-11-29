<template>
  <div class="truncate">
    <img class="mb-4" src="https://files.graph.cool/cj7ri5z8d0x5m0149sskbwe15/cja9uv49u03th0133knbxq9uz" alt="Webhook">
    <br/>
    <span class="subheading">
      POST on {{ endpoint }}
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
  },
  computed: {
    endpoint () {
      return `${process.env.WEBHOOK_BASE_ADDRESS}/${this.config.key}`
    }
  }
}
</script>

<style scoped>
  img {
    width: 13em;
    vertical-align: middle;
  }
</style>
