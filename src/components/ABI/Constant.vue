<template>
  <v-card flat>
    <ToolbarWithContent card :title="value.name">
      <h4 class="subheader">{{ $t('inputs') }} ({{ value.inputs.length }})</h4>
      <PayloadViewer :signature="value.inputs"></PayloadViewer>
      <h4 class="subheader">{{ $t('outputs') }} ({{ value.outputs.length }})</h4>
      <PayloadViewer :signature="value.outputs"></PayloadViewer>
      <v-divider></v-divider>
    </ToolbarWithContent>
  </v-card>
</template>

<i18n>
  en:
    payable: "Payable"
    name: "Name"
    inputs: "Inputs"
    outputs: "Outputs"
</i18n>

<script>
  import abiView from '@/mixins/abiView'
  export default {
    mixins: [abiView]
  }
</script>
