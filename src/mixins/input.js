
export default {
  props: {
    value: {
      type: [String, Object],
      default: ''
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
