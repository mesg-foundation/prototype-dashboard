<template>
  <v-layout row wrap>
    <v-flex xs12 md4 v-for="(metric, i) in metrics" :key="i">
      <v-card class="ma-3 stat">
        <v-card-title>{{ metric.title }}</v-card-title>
        <v-card-text class="headline">{{ metric.value }}</v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 v-for="(chart, i) in charts" :key="i">
      <v-card flat>
        <v-card-title class="subheading">{{ chart.title }}</v-card-title>
        <v-card-text>
          <v-layout v-if="loading" :style="`height:${chartSize}px`" justify-center align-center>
            <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
          </v-layout>
          <TimeChart v-else
            :interval="interval"
            :height="chartSize"
            :rawData="data"
            :filter="chart.filter">
          </TimeChart>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<i18n>
  en:
    charts:
      events: "Events per hours"
      duration: "Average time execution (ms)"
      errors: "Errors per hours"
    metrics:
      events: "Total events"
      duration: "Average time execution (ms)"
      errors: "Total errors"
</i18n>

<script>
import TimeChart from '@/components/charts/timeChart'
export default {
  components: {
    TimeChart
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    defaultFilter: {
      type: Object,
      required: true
    },
    chartSize: {
      type: Number,
      default: 250
    }
  },
  computed: {
    loading () {
      return !this.data
    },
    chartConfig () {
      return {
        interval: this.interval,
        height: this.chartSize,
        rawData: this.data
      }
    },
    interval () {
      return this.defaultFilter.groupBy || 'day'
    },
    metrics () {
      if (!this.data) { return [] }
      return [{
        title: this.$t('metrics.events'),
        value: this.data.length
      }, {
        title: this.$t('metrics.duration'),
        value: Math.floor(this.data.reduce((sum, { duration }) => sum + duration, 0) / this.data.length)
      }, {
        title: this.$t('metrics.errors'),
        value: this.data.filter(({ code }) => !code.startsWith('20')).length
      }]
    },
    charts () {
      return [{
        title: this.$t('charts.events'),
        filter: {
          ...this.defaultFilter,
          dateAttribute: x => x.event.executedAt,
          method: 'count'
        }
      }, {
        title: this.$t('charts.duration'),
        filter: {
          ...this.defaultFilter,
          attribute: 'duration',
          dateAttribute: x => x.event.executedAt,
          method: 'avg'
        }
      }, {
        title: this.$t('charts.errors'),
        filter: {
          ...this.defaultFilter,
          attribute: 'code',
          dateAttribute: x => x.event.executedAt,
          method: list => list.filter(x => !x.startsWith('20')).length
        }
      }]
    }
  }
}
</script>

<style scoped>
.stat {
  text-align: center;
}
.stat .card__title { display: block; }
</style>
