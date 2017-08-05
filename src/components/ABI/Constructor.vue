<template>
  <v-card flat class="grey lighten-4">
    <v-toolbar card>
      <v-toolbar-title class="heading">
        {{ $t('constructor') }}
      </v-toolbar-title>
    </v-toolbar>
    <h4 class="subheader">{{ $t('inputs') }} ({{ value.inputs.length }})</h4>
    <PayloadViewer :signature="value.inputs"></PayloadViewer>
    <v-divider></v-divider>
  </v-card>
</template>

<i18n>
  en:
    constructor: "Constructor"
    inputs: "Inputs"
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
