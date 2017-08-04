<template>
  <v-card>
    <v-toolbar card>
      <v-toolbar-title class="headline">
        {{ plan.title }}
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
      :items="features"
      :custom-sort="a => a"
      hide-actions>
      <template slot="items" scope="props">
        <td>{{ $t(`features.${props.item.feature}`) }}</td>
        <td>{{ props.item.value || $t('unlimited') }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<i18n>
  en:
    unlimited: "Unlimited"
    features:
      seats: "Seats"
      requests: "Resquests number"
      privateContracts: "Private contracts"
</i18n>

<script>
  export default {
    props: {
      plan: {
        type: Object,
        required: true
      }
    },
    computed: {
      features () {
        return ['requests', 'privateContracts', 'seats']
          .map(x => ({
            feature: x,
            value: this.plan[x]
          }))
      }
    }
  }
</script>
