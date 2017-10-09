<script>
import fieldExtractor from './mixins/field-extractor'
import { validate } from 'jsonschema'
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
    },
    inline: {
      type: Boolean,
      default: false
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
    },
    returnValue () {
      return this.fields.reduce((acc, field) => ({
        ...acc,
        [field.key]: field.value
      }), {})
    },
    validation () {
      return validate(this.returnValue, this.schema)
    },
    errors () {
      return this.validation.errors
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
      this.errors.length === 0
        ? this.$emit('input', this.returnValue)
        : this.$emit('input', { errors: this.errors })
    }
  },
  render (createComponent) {
    if (!this.$scopedSlots.default) {
      throw new Error('Scope to display input not present, please add <template slot="string" scope="field"></template>')
    }
    const style = {
      display: 'flex',
      flexDirection: this.inline ? 'row' : 'column'
    }
    return createComponent('div', { style }, [
      ...this.fields.map(field => this.$scopedSlots.default(field))
    ])
  }
}
</script>
