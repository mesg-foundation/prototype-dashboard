import { Line } from 'vue-chartjs'
import groupDataByTime from '@/utils/groupDataByTime'
import options from './timeChartOptions'

export default {
  extends: Line,
  props: {
    rawData: {
      type: Array,
      default: null
    },
    filter: {
      type: Object,
      default: null
    },
    labels: {
      type: Array,
      default: null
    },
    data: {
      type: Array,
      default: null
    },
    interval: {
      type: String,
      default: 'day'
    }
  },
  methods: {
    updateChart (labels, data) {
      this.renderChart({
        labels,
        datasets: [
          { data }
        ]
      }, options(this.interval))
    }
  },
  mounted () {
    if (this.rawData) {
      const { labels, data } = groupDataByTime(this.rawData, this.filter)
      this.updateChart(labels, data)
    } else {
      this.updateChart(this.labels, this.data)
    }
  }
}
