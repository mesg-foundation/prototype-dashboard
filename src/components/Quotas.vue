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
      },
      quotas: {
        type: Array,
        default: () => [
          'executions',
          'contracts',
          'members'
        ]
      }
    },
    computed: {
      executions () {
        // TODO calculate executions with
        // query {
        //   _allTriggerResultsMeta {
        //     count
        //   }
        // }
        return parseInt(Math.random() * this.plan['executions'], 10)
      },
      contracts () {
        return this.project._contractsMeta.count
      },
      members () {
        return this.project._usersMeta.count
      },
      items () {
        return this.quotas
          .map(x => ({
            key: x,
            value: this[x],
            max: this.plan[x] ? this.plan[x] : this.$t('unlimited'),
            percent: this.plan[x] ? (this[x] / this.plan[x] * 100) : 0
          }))
      }
    }
  }
</script>
