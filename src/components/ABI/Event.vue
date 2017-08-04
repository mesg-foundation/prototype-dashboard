<template>
  <v-card flat class="grey lighten-4">
    <v-toolbar card>
      <v-toolbar-title class="heading">
        {{ value.name }}
      </v-toolbar-title>
    </v-toolbar>
    <h4 class="subheader">{{ $t('inputs') }} ({{ value.inputs.length }})</h4>
    <PayloadViewer :signature="value.inputs"></PayloadViewer>
    <v-divider></v-divider>
  </v-card>
</template>

<i18n>
  en:
    name: "Name"
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
