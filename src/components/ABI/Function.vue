<template>
  <v-card flat class="grey lighten-4">
    <ToolbarWithContent card>
      <template slot="title">
        <v-chip
          v-if="value.payable"
          small
          class="error white--text">
          {{ $t('payable') }}
        </v-chip>
        {{ value.name }}
      </template>
      <h4 class="subheader">{{ $t('inputs') }} ({{ value.inputs.length }})</h4>
      <PayloadViewer :signature="value.inputs"></PayloadViewer>
      <h4 class="subheader">{{ $t('outputs') }} ({{ value.outputs.length }})</h4>
      <PayloadViewer :signature="value.outputs"></PayloadViewer>
    </ToolbarWithContent>
    <v-divider></v-divider>
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
