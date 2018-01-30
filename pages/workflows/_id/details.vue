<template>
  <v-card>
    <v-card-title class="headline">Workflow details</v-card-title>
    <v-divider></v-divider>
    <code class="pa-2" style="width: 100%">{{ workflow }}</code>
  </v-card>
</template>

<script>
export default {
  computed: {
    workflow () {
      return require('~/assets/workflows.json').data.workflows
        .find(x => x.id === this.$route.params.id)
    }
  }
}
</script>
