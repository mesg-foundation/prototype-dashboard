import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    labels () {
      return this.data.map(x => x[0])
    },
    datasets () {
      return [
        {
          backgroundColor: '#1976d2',
          data: this.data.map(x => x[1])
        }
      ]
    }
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets
    })
  }
}
