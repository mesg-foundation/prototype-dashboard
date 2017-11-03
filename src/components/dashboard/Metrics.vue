<template>
  <v-layout row wrap>
    <v-flex xs12 md6 v-for="(chart, i) in charts" :key="i">
      <Chart
        :title="chart.title"
        v-bind="chartConfig"
        :filter="chart.filter">
      </Chart>
    </v-flex>
  </v-layout>
</template>

<i18n>
  en:
    charts:
      events: "Events per day"
      duration: "Average time execution (ms)"
      errors: "Errors per day"
</i18n>

<script>
import Chart from '@/components/charts/Chart'
export default {
  components: {
    Chart
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    chartSize: {
      type: Number,
      default: 250
    }
  },
  computed: {
    chartConfig () {
      return {
        interval: this.interval,
        height: this.chartSize,
        rawData: this.data
      }
    },
    defaultFilter () {
      const now = new Date()
      return {
        from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30),
        to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
        groupBy: 'day'
      }
    },
    charts () {
      return [{
        title: this.$t('charts.events'),
        filter: {
          ...this.defaultFilter,
          method: 'count'
        }
      }, {
        title: this.$t('charts.duration'),
        filter: {
          ...this.defaultFilter,
          attribute: 'duration',
          method: 'count'
        }
      }, {
        title: this.$t('charts.errors'),
        filter: {
          ...this.defaultFilter,
          attribute: 'code',
          method: list => list.filter(x => !x.startsWith('20')).length
        }
      }]
    }
  }
}
</script>
