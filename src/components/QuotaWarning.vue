<template>
  <v-alert
    v-if="reached || almost"
    :error="reached"
    :warning="almost"
    class="ma-0" value="true">
    <v-layout align-center>
      {{ $t(`${reached ? 'reached' : 'almost'}.title`, { feature, percent: warningLimit }) }}
      <v-spacer></v-spacer>
      <v-btn router :to="{ name: 'Plans' }">
        {{ $t('action') }}
      </v-btn>
    </v-layout>
  </v-alert>

</template>

<i18n>
  en:
    action: "Upgrade my plan"
    reached:
      title: "You have reach your limit of {feature}"
    almost:
      title: "You reached {percent}% of your {feature}'s limit"
</i18n>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    feature: {
      type: String
    },
    warningLimit: {
      type: Number,
      default: 75
    }
  },
  computed: {
    ...mapGetters({
      quotas: 'session/quotas'
    }),
    currentQuota () {
      return this.quotas[this.feature]
    },
    reached () {
      return this.currentQuota.reached
    },
    almost () {
      return this.currentQuota.percent >= this.warningLimit
    }
  }
}
</script>
