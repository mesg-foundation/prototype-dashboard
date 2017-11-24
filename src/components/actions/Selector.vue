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
          :rules="rules.selectedService"
          :complete="!!serviceId">
          {{ $t('service') }}
          <small>{{ (errors.selectedService || [])[0] }}</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="2"
          :rules="rules.data"
          :editable="!!serviceId"
          :complete="!!data">
          {{ $t('configuration') }}
          <small>{{ (errors.data || [])[0] }}</small>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="3"
          :editable="!!serviceId">
          {{ $t('advanced') }}
        </v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-layout row wrap justify-center align-center>
            <Service
              v-for="service in services" :key="service.id"
              class="ma-2 service-item"
              :service="service"
              v-model="serviceId"
              @input="step = '2'">
            </Service>
            </v-flex>
          </v-layout>
        </v-stepper-content>
        <v-stepper-content step="2" class="pa-0">
          <v-card flat v-if="selectedService">
            <v-card-title class="headline">
              {{ selectedService.name }}
            </v-card-title>
            <v-card-text>
              <p v-if="selectedService.description">{{ selectedService.description }}</p>
              <ServiceForm
                :service="selectedService"
                v-model="data"
                :displayAllErrors="displayAllErrors">
              </ServiceForm>
            </v-card-text>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="3" class="pa-0">
          <v-card flat v-if="selectedService">
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 md5>
                  <p>{{ $t('advancedText') }}</p>
                  <v-switch v-model="advanced" class="mt-3" :label="$t('advancedSwitch')"></v-switch>
                </v-flex>
                <v-flex xs12 md1></v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-for="meta in serviceMetas" :key="meta"
                    :label="meta"
                    disabled
                    hide-details
                    :value="(data || {})[meta]">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <template v-if="advanced">
                <CodeEditor
                  v-if="advanced"
                  :title="$t('preProcessing')"
                  :value="preProcessing || defaultPreProcessing"
                  @input="x => preProcessing = x">
                </CodeEditor>
              </template>
            </v-card-text>
          </v-card>
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
    title: "Connect an action to your connector"
    submit: "Select this action"
    service: "Select your service"
    configuration: "Configure your action"
    preProcessing: "Configuration function"
    advanced: "Advanced mode"
    advancedSwitch: "Activate advanced mode"
    advancedText: "You can add a dynamic configuration based on the data of the event. You can use Promises and so call a specific service if you need to. You just have to return an object with the definition configuration needed to configure the service. If a configuration is not present it will fallback to the static configuration you set previously"
</i18n>

<script>
import { required } from '@/validators'
import withValidation from '@/mixins/withValidation'
import collection from '@/mixins/collection'
import Service from '@/components/services/Item.vue'
import ServiceForm from '@/components/services/Form'
import CodeEditor from '@/components/CodeEditor'
export default {
  components: {
    Service,
    ServiceForm,
    CodeEditor
  },
  mixins: [
    withValidation,
    collection('services')
  ],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      step: this.value.data ? '2' : '1',
      data: this.value.data,
      serviceId: (this.value.service || {}).id || this.value.serviceId,
      displayAllErrors: false,
      advanced: !!this.value.metaPreProcessing,
      preProcessing: this.value.metaPreProcessing
    }
  },
  computed: {
    selectedService () {
      if (!this.serviceId) { return false }
      return this.services.find(x => x.id === this.serviceId)
    },
    serviceMetas () {
      if (!this.selectedService) { return [] }
      return Object.keys(this.selectedService.data.properties)
    },
    defaultPreProcessing () {
      return `module.exports = function (event) {
  return {
    ${this.serviceMetas.map(x => `${x}: "..."`).join(',\n\t\t')}
  }
}`
    }
  },
  validations: {
    selectedService: {
      required
    },
    data: {
      required
    }
  },
  methods: {
    submit () {
      if (!this.validate()) {
        this.displayAllErrors = true
        return
      }
      this.$emit('input', {
        serviceId: this.serviceId,
        service: this.selectedService,
        data: this.data,
        metaPreProcessing: this.advanced ? this.preProcessing : null
      })
    }
  }
}
</script>

<style scoped>
  .service-item {
    text-align: center;
    width: 318px;
  }
</style>
