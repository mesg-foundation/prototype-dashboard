<script>
  export default {
    props: {
      value: {
        type: [Date, String, Number],
        required: true
      }
    },
    computed: {
      date () {
        return new Date(this.value)
      }
    },
    render (h) {
      return h('time', this.date.toLocaleDateString())
    }
  }
</script>
