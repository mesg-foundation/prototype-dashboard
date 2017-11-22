<template>
  <v-dialog width="960" v-model="popup">
    <v-card slot="activator" hover class="selector-card">
      <v-layout column align-center justify-center>
        <span class="headline">{{ $t('then') }}</span>
        <v-card-text class="text-xs-center" v-if="value && value.service">
          <img class="servicePicture mt-3 mb-3" v-if="value.service.picture" :src="value.service.picture" :alt="value.service.name">
          <br/>
          <span class="subheading">{{ value.service.name }}</span>
        </v-card-text>
        <v-icon v-else x-large class="ma-4">extension</v-icon>
        <slot></slot>
      </v-layout>
    </v-card>
    <ActionSelector
      :value="value"
      @input="update">
    </ActionSelector>
  </v-dialog>
</template>

<i18n>
  en:
    then: "THEN"
</i18n>

<script>
import ActionSelector from '@/components/actions/Selector'
export default {
  components: {
    ActionSelector
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
