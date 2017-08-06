<template>
  <v-card flat>
    <ToolbarWithContent card :title="signature">
      <template slot="toolbar">
        <v-btn
          success dark
          :to="{ name: 'NewWebhook', query }">
          {{ $t('connect') }}
        </v-btn>
      </template>
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
    connect: "Connect"
    name: "Name"
    inputs: "Inputs"
</i18n>

<script>
  import abiView from '@/mixins/abiView'
  export default {
    mixins: [abiView],
    computed: {
      query () {
        if (this.$route.name !== 'Contract') { return null }
        return {
          contractId: this.$route.params.id,
          event: this.value.name
        }
      }
    }
  }
</script>
