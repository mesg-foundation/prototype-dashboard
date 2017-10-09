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
          <v-card flat>
            <v-card-title class="headline">
              {{ selectedService.name }}
            </v-card-title>
            <v-card-text>
              <p v-if="selectedService.description">{{ selectedService.description }}</p>
              <ServiceForm
                v-if="selectedService"
                :service="selectedService"
                v-model="data"
                :displayAllErrors="displayAllErrors">
              </ServiceForm>
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
</i18n>

<script>
import Service from '@/components/services/Item.vue'
import ServiceForm from '@/components/services/Form'
import { required } from '@/validators'
import withValidation from '@/mixins/withValidation'
import collection from '@/mixins/collection'
export default {
  components: {
    Service,
    ServiceForm
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
      displayAllErrors: false
    }
  },
  computed: {
    selectedService () {
      if (!this.serviceId) { return false }
      return this.services.find(x => x.id === this.serviceId)
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
        data: this.data
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
