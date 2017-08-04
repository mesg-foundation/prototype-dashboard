<template>
  <v-card hover>
    <v-toolbar card>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">
        {{ plan.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="text-xs-center">
      <Price
        class="display-1"
        :value="plan.price"
        :currency="plan.currency">
      </Price>
      <sub>{{ $t('perMonth') }}</sub>
    </v-card-text>
    <v-divider></v-divider>
    <table class="table">
      <tbody>
        <tr>
          <td>{{ $t('features.requests') }}</td>
          <td class="text-xs-right" v-if="plan.requests">{{ $n(plan.requests) }} {{ $t('units.requests') }}</td>
          <td class="text-xs-right" v-else>{{ $t('unlimited') }}</td>
        </tr>
        <tr>
          <td>{{ $t('features.privateContracts') }}</td>
          <td class="text-xs-right" v-if="plan.privateContracts">{{ $n(plan.privateContracts) }}</td>
          <td class="text-xs-right" v-else>{{ $t('unlimited') }}</td>
        </tr>
        <tr>
          <td>{{ $t('features.publicContracts') }}</td>
          <td class="text-xs-right">{{ $t('unlimited') }}</td>
        </tr>
        <tr>
          <td>{{ $t('features.seats') }}</td>
          <td class="text-xs-right" v-if="plan.seats">{{ $n(plan.seats) }}</td>
          <td class="text-xs-right" v-else>{{ $t('unlimited') }}</td>
        </tr>
      </tbody>
    </table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn v-if="isCurrentPlan" block flat disabled>{{ $t('current') }}</v-btn>
      <v-btn v-else success block>{{ $t('choose') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<i18n>
  en:
    unlimited: "Unlimited"
    perMonth: "/ month"
    choose: "Choose plan"
    current: "Current plan"
    features:
      seats: "Team member"
      requests: "Webhook executions"
      privateContracts: "Private contracts"
      publicContracts: "Public contracts"
    units:
      requests: "/ month"
</i18n>

<script>
  import Price from '@/components/Price'
  import withCurrentProject from '@/mixins/withCurrentProject'
  export default {
    components: {
      Price
    },
    props: {
      plan: {
        type: Object,
        required: true
      }
    },
    mixins: [withCurrentProject],
    computed: {
      features () {
        return ['requests', 'privateContracts', 'seats']
          .map(x => ({
            feature: x,
            value: this.plan[x]
          }))
      },
      isCurrentPlan () {
        return this.currentProject.plan.id === this.plan.id
      }
    }
  }
</script>
