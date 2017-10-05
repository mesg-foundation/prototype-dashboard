import { required, includedIn, regex } from '@/validators'
import withValidation from '@/mixins/withValidation'
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
  mixins: [
    withValidation
  ],
  data () {
    return this.service.data.reduce((acc, data) => ({
      ...acc,
      [data.name]: (this.value || {})[data.name] || data.default
    }), {})
  },
  validations () {
    return this.service.data
      .reduce((acc, x) => ({
        ...acc,
        [x.name]: this.createValidationsFor(x)
      }), {})
  },
  methods: {
    emit () {
      if (!this.validate()) { return this.$emit('input', null) }
      this.$emit('input', this.service.data.reduce((acc, data) => ({
        ...acc,
        [data.name]: this[data.name]
      }), {}))
    },
    createValidationsFor (data) {
      const validation = {}
      if (data.required) { validation.required = required }
      if (data.values) { validation.includedIn = includedIn(data.values) }
      debugger
      if (data.regexp) { validation.regex = regex(data.name, new RegExp(data.regexp)) }
      return validation
    }
  },
  mounted () {
    this.service.data
      .map(x => x.name)
      .forEach(name => this.$watch(name, () => this.emit()))
  }
}
