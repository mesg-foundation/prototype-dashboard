
export default {
  props: {
    value: {
      type: [String, Object, Boolean],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    errorMessages: {
      type: Array,
      default: () => []
    }
  }
}
