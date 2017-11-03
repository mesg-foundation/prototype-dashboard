<template>
  <v-layout row wrap>
    <v-flex xs12 md6>
      <Chart
        title="Events per day"
        v-bind="chartConfig"
        :filter="totalPerDay">
      </Chart>
    </v-flex>
    <v-flex xs12 md6>
      <Chart
        title="Average time execution (ms)"
        v-bind="chartConfig"
        :filter="durationAverage">
      </Chart>
      </v-card>
    </v-flex>
    <v-flex xs12 md6>
      <Chart
        title="Error per day"
        v-bind="chartConfig"
        :filter="errorsPerDay">
      </Chart>
    </v-flex>
  </v-layout>
</template>

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
    totalPerDay () {
      return {
        ...this.defaultFilter,
        method: 'count'
      }
    },
    durationAverage () {
      return {
        ...this.defaultFilter,
        attribute: 'duration',
        method: 'avg'
      }
    },
    errorsPerDay () {
      return {
        ...this.defaultFilter,
        attribute: 'code',
        method: list => list.filter(x => !x.startsWith('20')).length
      }
    }
  }
}
</script>
