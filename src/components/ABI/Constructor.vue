<template>
  <v-card flat class="grey lighten-4">
    <ToolbarWithContent
      card
      :title="$t('constructor')">
      <h4 class="subheader">{{ $t('inputs') }} ({{ value.inputs.length }})</h4>
      <PayloadViewer :signature="value.inputs"></PayloadViewer>
    </ToolbarWithContent>
    <v-divider></v-divider>
  </v-card>
</template>

<i18n>
  en:
    constructor: "Constructor"
    inputs: "Inputs"
</i18n>

<script>
  import abiView from '@/mixins/abiView'
  export default {
    mixins: [abiView]
  }
</script>
