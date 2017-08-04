<template>
  <v-card flat class="grey lighten-4">
    <v-toolbar card>
      <v-toolbar-title class="heading">
        <v-chip
          v-if="value.payable"
          small
          class="error white--text">
          {{ $t('payable') }}
        </v-chip>
        {{ value.name }}
      </v-toolbar-title>
    </v-toolbar>
    <h4 class="subheader">{{ $t('inputs') }} ({{ value.inputs.length }})</h4>
    <PayloadViewer :signature="value.inputs"></PayloadViewer>
    <h4 class="subheader">{{ $t('outputs') }} ({{ value.outputs.length }})</h4>
    <PayloadViewer :signature="value.outputs"></PayloadViewer>
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
  import PayloadViewer from '@/components/PayloadViewer'
  export default {
    components: {
      PayloadViewer
    },
    props: {
      value: {
        type: Object,
        required: true
      }
    }
  }
</script>
