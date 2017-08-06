<template>
  <v-card flat>
    <ToolbarWithContent card :title="signature">
      <template v-if="value.inputs.length">
        <h4 class="subheader">{{ $t('inputs') }} ({{ value.inputs.length }})</h4>
        <PayloadViewer :signature="value.inputs"></PayloadViewer>
      </template>
      <v-divider></v-divider>
    </ToolbarWithContent>
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
