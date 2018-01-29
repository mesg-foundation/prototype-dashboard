<script>
import { Line } from 'vue-chartjs'
import Color from 'color'

export default {
  extends: Line,
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {
      dataLength: 20
    }
  },
  computed: {
    labels () {
      return [...new Array(this.dataLength)]
        .map((x, i) => Date.now() - (i * 1000 * 60))
        .map(x => new Date(x))
        .reverse()
    },
    data () {
      // https://codepen.io/Qvcool/pen/XdqYbb?editors=0010
      // eslint-disable-next-line
      const expand = (oldArray, variance) => { const newArray = [oldArray[0]]; for (let i = 1; i < oldArray.length; i++) { newArray.push(Math.floor((oldArray[i - 1] + oldArray[i]) / 2 + ((Math.random() - 0.5) * variance))); newArray.push(oldArray[i]) }; return newArray; }
      // eslint-disable-next-line
      const generate = (width, height, variance = height, varianceChange = 0.5) => { let terrain = [Math.floor(Math.random() * variance), Math.floor(Math.random() * variance)]; while (terrain.length < width) { variance *= varianceChange; terrain = expand(terrain, variance) }; return terrain.slice(0, width) }
      return generate(this.dataLength, 100)
    },
    options () {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            title: this.title,
            type: 'time'
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.title
            }
          }]
        }
      }
    }
  },
  mounted () {
    const color = Color(this.$vuetify.theme.primary)
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          backgroundColor: color.lighten(0.5).toString(),
          borderColor: color.lighten(0.3).toString(),
          label: 'Time execution',
          data: this.data
        }
      ]
    }, this.options)
  }
}
</script>
