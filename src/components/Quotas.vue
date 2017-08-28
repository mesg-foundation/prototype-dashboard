<template>
  <v-list two-line>
    <v-list-tile v-for="item in items" :key="item.key">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ $t(`titles.${item.key}`) }}
        </v-list-tile-title>
        <v-list-tile-sub-title>
          {{ $n(item.value) }} / {{ typeof item.max === 'number' ? $n(item.max) : item.max }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <QuotaProgress :value="item.percent"></QuotaProgress>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<i18n>
  en:
    unlimited: '∞'
    titles:
      executions: "Trigger executions"
      members: "Team members"
      contracts: "Contracts"
</i18n>

<script>
  import { mapGetters } from 'vuex'
  import QuotaProgress from '@/components/QuotaProgress'
  export default {
    components: {
      QuotaProgress
    },
    props: {
      project: {
        type: Object,
        required: true
      },
      plan: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapGetters({
        quotas: 'session/quotas'
      }),
      items () {
        return Object.keys(this.quotas)
          .map(x => ({
            key: x,
            value: this.quotas[x],
            max: this.plan[x] ? this.plan[x] : this.$t('unlimited'),
            percent: this.plan[x] ? (this.quotas[x] / this.plan[x] * 100) : 0
          }))
      }
    }
  }
</script>
