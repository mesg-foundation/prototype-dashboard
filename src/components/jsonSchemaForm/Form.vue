<script>
import fieldExtractor from './mixins/field-extractor'
export default {
  mixins: [
    fieldExtractor
  ],
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: this.extractFields(this.schema)
        .reduce((acc, field) => ({
          ...acc,
          [field.key]: field
        }), {})
    }
  },
  computed: {
    fields () {
      return Object.keys(this.form)
        .map(x => this.form[x])
        .sort((a, b) => b.validations.length - a.validations.length)
    }
  },
  methods: {
    onUpdate (key) {
      return value => {
        this.form = {
          ...this.form,
          [key]: {
            ...this.form[key],
            value
          }
        }
      }
    }
  },
  watch: {
    schema () {
      this.form = this.extractFields(this.schema)
        .reduce((acc, field) => ({
          ...acc,
          [field.key]: field
        }), {})
    },
    form () {
      this.$emit('input', this.fields.reduce((acc, field) => ({
        ...acc,
        [field.key]: field.value
      }), {}))
    }
  },
  render (createComponent) {
    if (!this.$scopedSlots.default) {
      throw new Error('Scope to display input not present, please add <template slot="string" scope="field"></template>')
    }
    return createComponent('div', this.fields.map(field => this.$scopedSlots.default(field)))
  }
}
</script>
