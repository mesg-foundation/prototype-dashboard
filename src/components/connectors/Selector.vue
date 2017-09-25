<template>
  <v-card flat>
    <v-toolbar card>
      <v-toolbar-title class="subheading">
        {{ $t('title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-stepper
      non-linear
      v-model="step"
      class="scrollable elevation-0">
      <v-stepper-header>
        <v-stepper-step
          step="1"
          editable
          :complete="!!connectorType">
          {{ $t('connector') }}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="2"
          :editable="!!connectorType"
          :complete="!!currentData">
          {{ $t('configuration') }}
        </v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>
      <v-stepper-content step="1">
        <p>{{ $t('connectorText') }}</p>
        <v-select
          :items="connectors"
          v-model="connectorType"
          @input="step = '2'">
        </v-select>
      </v-stepper-content>
      <v-stepper-content step="2">
        <component
          v-if="connectorComponent"
          :value="currentData"
          @input="updateCurrentData"
          :is="connectorComponent">
        </component>
      </v-stepper-content>
    </v-stepper>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        primary block
        @click.stop="submit">
        {{ $t('submit') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<i18n>
  en:
    title: "Select a connector"
    connector: "Choose your connector"
    configuration: "Configure your connector"
    connectorText: "The connector will connect an event from the blockchain of your choice"
    submit: "Select this connector"
    connectors:
      ethereumContract: "Ethereum Contract"
</i18n>

<script>
import { camel } from 'change-case'
export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      step: '1',
      connectorType: null,
      ethereumContract: {
        contractId: null,
        eventName: null
      }
    }
  },
  computed: {
    connectors () {
      return process.env.CONNECTORS
        .map(value => ({
          text: this.$t(`connectors.${value}`),
          value: value
        }))
    },
    fieldName () {
      return camel(this.connectorType)
    },
    currentData () {
      return this.$data[this.fieldName]
    },
    connectorComponent () {
      if (!this.connectorType) { return null }
      return {
        ethereumContract: () => import('@/components/connectors/ethereumContract/Form')
      }[this.fieldName]
    }
  },
  methods: {
    updateCurrentData (data) {
      this.$data[this.fieldName] = { ...data }
    },
    submit () {
      this.$emit('input', {
        connectorType: this.connectorType,
        [this.fieldName]: this.currentData
      })
    }
  }
}
</script>
