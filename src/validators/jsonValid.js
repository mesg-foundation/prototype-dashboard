import { withParams } from 'vuelidate/lib/validators/common'

export default withParams(
  { type: 'jsonValid' },
  value => {
    try {
      JSON.parse(value)
      return true
    } catch (e) {
      return false
    }
  }
)
