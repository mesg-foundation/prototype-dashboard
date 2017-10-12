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
          :rules="rules.connectorType"
          :complete="!!connectorType">
          {{ $t('connector') }}
          <small>{{ (errors.connectorType || [])[0] }}</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="2"
          :rules="rules.currentData"
          :editable="!!connectorType"
          :complete="!!currentData">
          {{ $t('configuration') }}
          <small>{{ (errors.currentData || [])[0] }}</small>
        </v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>
      <v-stepper-items>
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
            :value="currentData || {}"
            @input="updateCurrentData"
            :is="connectorComponent">
          </component>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        color="primary" block
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
import { required } from '@/validators'
import withValidation from '@/mixins/withValidation'
export default {
  components: {
    Connector
  },
  mixins: [
    withValidation
  ],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    const connectorData = process.env.CONNECTORS
      .reduce((acc, connector) => ({
        ...acc,
        [connector.id]: this.value[connector.fieldName]
      }), {})
    return {
      step: connectorData[this.value.connectorType] ? '2' : '1',
      connectorType: this.value.connectorType,
      connectorData
    }
  },
  computed: {
    connectors () {
      return process.env.CONNECTORS
    },
    fieldName () {
      return this.connectors
        .filter(x => x.id === this.connectorType)
        .map(x => x.fieldName)[[0]]
    },
    currentData () {
      return this.connectorData[this.connectorType]
    },
    connectorComponent () {
      if (!this.connectorType) { return null }
      return {
        ETHEREUM_CONTRACT: () => import('@/components/connectors/ethereumContract/Form'),
        ETHEREUM_TRANSACTION: () => import('@/components/connectors/ethereumTransaction/Form'),
        BITCOIN_TRANSACTION: () => import('@/components/connectors/bitcoinTransaction/Form')
      }[this.connectorType]
    },
    itemComponent () {
      if (!this.connectorType) { return null }
      return {
        ETHEREUM_CONTRACT: () => import('@/components/connectors/ethereumContract/Item'),
        ETHEREUM_TRANSACTION: () => import('@/components/connectors/ethereumTransaction/Item'),
        BITCOIN_TRANSACTION: () => import('@/components/connectors/bitcoinTransaction/Item')
      }[this.connectorType]
    }
  },
  validations: {
    connectorType: {
      required
    },
    currentData: {
      required
    }
  },
  methods: {
    updateCurrentData (data) {
      this.connectorData[this.connectorType] = { ...data }
    },
    submit () {
      if (!this.validate()) { return }
      this.$emit('input', {
        field: this.fieldName,
        connectorType: this.connectorType,
        component: this.itemComponent,
        [this.fieldName]: this.currentData
      })
    }
  },
  mounted () {
    // Submit again like that if the data are valide (from an already created trigger or
    // from data from the UI) we will like that send back the fieldName and the componenent
    // necessary to render the item component
    this.submit()
  }
}
</script>

<style scoped>
  .connector-item {
    text-align: center;
    width: 318px;
  }
</style>
