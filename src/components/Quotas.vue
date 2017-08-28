<template>
  <v-list two-line>
    <v-list-tile v-for="item in items" :key="item.key">
      <v-list-tile-content>
        <v-list-tile-title>
          {{ $t(`titles.${item.key}`) }}
        </v-list-tile-title>
        <v-list-tile-sub-title>
          {{ $n(item.value) }} / {{ typeof item.maximum === 'number' ? $n(item.maximum) : $t('unlimited') }}
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
            ...this.quotas[x],
            key: x
          }))
      }
    }
  }
</script>
