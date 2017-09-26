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
        <v-layout row wrap justify-center align-center>
          <Connector
            v-for="connector in connectors" :key="connector.id"
            class="ma-2 connector-item"
            :connector="connector"
            v-model="connectorType"
            @input="step = '2'">
          </Connector>
          </v-flex>
        </v-layout>
      </v-stepper-content>
      <v-stepper-content step="2" class="pa-0">
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
    submit: "Select this connector"
</i18n>

<script>
import Connector from './Item'
export default {
  components: {
    Connector
  },
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
      connectorData: process.env.CONNECTORS.reduce((acc, connector) => ({
        ...acc,
        [connector.id]: {}
      }), {})
    }
  },
  computed: {
    connectors () {
      return process.env.CONNECTORS
    },
    currentData () {
      return this.connectorData[this.connectorType]
    },
    connectorComponent () {
      if (!this.connectorType) { return null }
      return {
        ethereumContract: () => import('@/components/connectors/ethereumContract/Form'),
        ethereumTransaction: () => import('@/components/connectors/ethereumTransaction/Form'),
        bitcoinTransaction: () => import('@/components/connectors/bitcoinTransaction/Form')
      }[this.connectorType]
    }
  },
  methods: {
    updateCurrentData (data) {
      this.connectorData[this.connectorType] = { ...data }
    },
    submit () {
      this.$emit('input', {
        connectorType: this.connectorType,
        [this.connectorType]: this.currentData
      })
    }
  }
}
</script>

<style scoped>
  .connector-item {
    text-align: center;
    width: 320px;
  }
</style>
