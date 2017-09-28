<template>
  <v-dialog width="700" v-model="popup">
    <v-card slot="activator" hover class="selector-card">
      <v-layout column align-center justify-center>
        <span class="headline">{{ $t('when') }}</span>
        <v-card-text
          v-if="value && value.component"
          class="text-xs-center">
          <component
            :is="value.component"
            :config="value[value.field]">
          </component>
        </v-card-text>
        <v-icon v-else x-large class="ma-4">schedule</v-icon>
      </v-layout>
    </v-card>
    <ConnectorSelector
      :value="value"
      @input="update">
    </ConnectorSelector>
  </v-dialog>
</template>

<i18n>
  en:
    when: "WHEN"
</i18n>

<script>
import ConnectorSelector from '@/components/connectors/Selector'
export default {
  components: {
    ConnectorSelector
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      popup: false
    }
  },
  methods: {
    update (value) {
      this.$emit('input', value)
      this.popup = false
    }
  }
}
</script>
