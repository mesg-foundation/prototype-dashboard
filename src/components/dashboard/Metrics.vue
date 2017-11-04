<template>
  <v-layout row wrap>
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
      events: "Events per day"
      duration: "Average time execution (ms)"
      errors: "Errors per day"
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
          method: 'avg'
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
