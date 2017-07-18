export default {
  computed: {
    errors () {
      return Object.keys(this.$v.$params)
        .filter(x => this.$v[x].$dirty)
        .reduce((acc, x) => ({
          ...acc,
          [x]: this.errorsFor(x)
        }), {})
    },
    errorsCount () {
      return Object.keys(this.errors)
        .reduce((sum, x) => sum + this.errors[x].length, 0)
    },
    isValid () {
      return this.errorsCount === 0
    }
  },
  methods: {
    errorsFor (key) {
      return Object
        .keys(this.$v[key].$params)
        .filter(type => !this.$v[key][type])
    }
  }
}
