export default {
  props: {
    service: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return this.service.data.reduce((acc, data) => ({
      ...acc,
      [data.name]: (this.value || {})[data.name] || data.default
    }), {})
  },
  computed: {
    dataValid () {
      return [
        /* required */ { filter: x => x.required, test: x => !!this[x.name] },
        /* included */ { filter: x => x.values, test: x => x.values.indexOf(this[x.name]) >= 0 },
        /* regexp   */ { filter: x => x.regexp, test: x => this[x.name].match(new RegExp(x.regexp)) }
      ].every(validation => this.service.data
        .filter(validation.filter)
        .every(validation.test)
      )
    }
  },
  methods: {
    emit () {
      if (!this.dataValid) {
        return this.$emit('input', null)
      }
      this.$emit('input', this.service.data.reduce((acc, data) => ({
        ...acc,
        [data.name]: this[data.name]
      }), {}))
    }
  },
  mounted () {
    this.service.data
      .map(x => x.name)
      .forEach(name => this.$watch(name, () => this.emit()))
  }
}
